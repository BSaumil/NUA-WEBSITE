from fastapi import FastAPI, APIRouter, HTTPException, Security
from fastapi.security import APIKeyHeader
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import secrets
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr, ConfigDict
from typing import List, Optional, Literal
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI()
api_router = APIRouter(prefix="/api")

# Protects read access to captured lead PII (name/email/phone/business).
# Submitting a lead (POST) stays public: that's the site's contact form.
_admin_api_key_header = APIKeyHeader(name="X-Admin-Api-Key", auto_error=False)


async def require_admin_key(key: str = Security(_admin_api_key_header)):
    expected = os.environ.get("ADMIN_API_KEY")
    if not expected or not key or not secrets.compare_digest(key, expected):
        raise HTTPException(status_code=401, detail="Missing or invalid admin API key")


# ---------- Status (kept) ----------
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class StatusCheckCreate(BaseModel):
    client_name: str


# ---------- Leads ----------
LeadType = Literal["demo", "trial"]


class LeadCreate(BaseModel):
    name: str = Field(min_length=1, max_length=120)
    email: EmailStr
    business: Optional[str] = Field(default=None, max_length=160)
    phone: Optional[str] = Field(default=None, max_length=40)
    venues: Optional[str] = Field(default=None, max_length=80)
    plan: Optional[str] = Field(default=None, max_length=40)
    message: Optional[str] = Field(default=None, max_length=1000)
    type: LeadType = "demo"
    source: Optional[str] = Field(default="landing")


class Lead(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    business: Optional[str] = None
    phone: Optional[str] = None
    venues: Optional[str] = None
    plan: Optional[str] = None
    message: Optional[str] = None
    type: LeadType = "demo"
    source: Optional[str] = "landing"
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


# ---------- Routes ----------
@api_router.get("/")
async def root():
    return {"message": "NUA API · operational"}


@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    await db.status_checks.insert_one(doc)
    return status_obj


@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    return status_checks


@api_router.post("/leads", response_model=Lead, status_code=201)
async def create_lead(payload: LeadCreate):
    lead = Lead(**payload.model_dump())
    doc = lead.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    try:
        await db.leads.insert_one(doc)
    except Exception as e:
        logger.exception("Failed to persist lead")
        raise HTTPException(status_code=500, detail="Could not save your request. Please try again.") from e
    return lead


@api_router.get("/leads", response_model=List[Lead], dependencies=[Security(require_admin_key)])
async def list_leads(limit: int = 100, type: Optional[LeadType] = None):
    query = {}
    if type:
        query['type'] = type
    clamped_limit = min(max(limit, 1), 500)
    cursor = db.leads.find(query, {"_id": 0}).sort("created_at", -1).limit(clamped_limit)
    leads = await cursor.to_list(length=clamped_limit)
    for lead in leads:
        if isinstance(lead.get('created_at'), str):
            lead['created_at'] = datetime.fromisoformat(lead['created_at'])
    return leads


app.include_router(api_router)

_cors_origins = os.environ.get('CORS_ORIGINS', '*').split(',')
app.add_middleware(
    CORSMiddleware,
    # allow_credentials + a wildcard origin is invalid per the CORS spec (browsers
    # reject it outright), and nothing in this API relies on cookies: every
    # protected route uses an explicit X-Admin-Api-Key header instead. Only turn
    # credentials on if CORS_ORIGINS is set to specific, non-wildcard origins.
    allow_credentials=_cors_origins != ['*'],
    allow_origins=_cors_origins,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
