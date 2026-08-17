"""Backend API tests for NUA lead-capture endpoints (Iteration 2).

Covers POST /api/leads (demo + trial), validation errors, and
GET /api/leads (list + type filter, sort desc by created_at).
"""
import os
import uuid
from datetime import datetime

import pytest
import requests

BASE_URL = os.environ['REACT_APP_BACKEND_URL'].rstrip('/') if os.environ.get('REACT_APP_BACKEND_URL') else None
if not BASE_URL:
    # Fallback: read frontend/.env directly
    from pathlib import Path
    env_path = Path('/app/frontend/.env')
    for line in env_path.read_text().splitlines():
        if line.startswith('REACT_APP_BACKEND_URL='):
            BASE_URL = line.split('=', 1)[1].strip().rstrip('/')

LEADS_URL = f"{BASE_URL}/api/leads"

UNIQUE = uuid.uuid4().hex[:8]
# Note: pydantic EmailStr (via email-validator) rejects reserved TLDs like `.test`.
# Use `example.com` (RFC 2606 reserved-for-docs but accepted by email-validator).
DOMAIN = "example.com"


ADMIN_API_KEY = os.environ.get("ADMIN_API_KEY")


@pytest.fixture(scope="module")
def session():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


@pytest.fixture(scope="module")
def admin_session():
    if not ADMIN_API_KEY:
        pytest.skip("ADMIN_API_KEY not set in test environment; skipping admin-gated GET /api/leads tests")
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json", "X-Admin-Api-Key": ADMIN_API_KEY})
    return s


# ---------- POST /api/leads ----------
class TestCreateLead:
    def test_root_alive(self, session):
        r = session.get(f"{BASE_URL}/api/", timeout=15)
        assert r.status_code == 200
        assert "operational" in r.json().get("message", "").lower()

    def test_create_demo_lead_full_payload(self, session):
        payload = {
            "name": f"TEST_QA_{UNIQUE}",
            "email": f"qa_demo_{UNIQUE}@example.com",
            "business": "TEST_BusinessOne",
            "phone": "+61 400 000 001",
            "venues": "2–10 venues",
            "message": "Please demo",
            "type": "demo",
        }
        r = session.post(LEADS_URL, json=payload, timeout=15)
        assert r.status_code == 201, r.text
        body = r.json()
        assert "id" in body and isinstance(body["id"], str) and len(body["id"]) > 0
        assert "created_at" in body and body["created_at"]
        # created_at must be ISO parseable
        datetime.fromisoformat(body["created_at"].replace("Z", "+00:00"))
        assert body["type"] == "demo"
        assert body["source"] == "landing"
        assert body["name"] == payload["name"]
        assert body["email"] == payload["email"]
        assert body["business"] == payload["business"]
        assert body["venues"] == payload["venues"]

    def test_create_trial_lead_with_plan(self, session):
        payload = {
            "name": f"TEST_Trial_{UNIQUE}",
            "email": f"qa_trial_{UNIQUE}@example.com",
            "type": "trial",
            "plan": "Starter",
        }
        r = session.post(LEADS_URL, json=payload, timeout=15)
        assert r.status_code == 201, r.text
        body = r.json()
        assert body["type"] == "trial"
        assert body["plan"] == "Starter"
        assert body["source"] == "landing"

    def test_missing_email_returns_422(self, session):
        r = session.post(LEADS_URL, json={"name": "NoEmail"}, timeout=15)
        assert r.status_code == 422, r.text

    def test_invalid_email_returns_422(self, session):
        r = session.post(LEADS_URL, json={"name": "BadEmail", "email": "not-an-email"}, timeout=15)
        assert r.status_code == 422, r.text

    def test_missing_name_returns_422(self, session):
        r = session.post(LEADS_URL, json={"email": "x@y.test"}, timeout=15)
        assert r.status_code == 422, r.text


# ---------- GET /api/leads ----------
class TestListLeadsAuth:
    def test_list_without_admin_key_returns_401(self, session):
        r = session.get(LEADS_URL, timeout=15)
        assert r.status_code == 401, r.text

    def test_list_with_wrong_admin_key_returns_401(self, session):
        r = session.get(LEADS_URL, headers={"X-Admin-Api-Key": "not-the-real-key"}, timeout=15)
        assert r.status_code == 401, r.text


class TestListLeads:
    def test_list_includes_created_and_sorted_desc(self, admin_session):
        r = admin_session.get(LEADS_URL, timeout=15)
        assert r.status_code == 200, r.text
        leads = r.json()
        assert isinstance(leads, list)
        emails = [lead.get("email") for lead in leads]
        assert f"qa_demo_{UNIQUE}@example.com" in emails
        assert f"qa_trial_{UNIQUE}@example.com" in emails

        # Sort check: created_at descending
        parsed = []
        for lead in leads:
            ts = lead.get("created_at")
            if isinstance(ts, str):
                parsed.append(datetime.fromisoformat(ts.replace("Z", "+00:00")))
        # at least 2 leads exist; verify monotonic non-increasing
        for i in range(len(parsed) - 1):
            assert parsed[i] >= parsed[i + 1], f"Not sorted desc at index {i}: {parsed[i]} < {parsed[i+1]}"

    def test_filter_by_type_demo(self, admin_session):
        r = admin_session.get(f"{LEADS_URL}?type=demo", timeout=15)
        assert r.status_code == 200
        leads = r.json()
        assert isinstance(leads, list)
        assert len(leads) >= 1
        for lead in leads:
            assert lead.get("type") == "demo"
        assert any(lead.get("email") == f"qa_demo_{UNIQUE}@example.com" for lead in leads)

    def test_filter_by_type_trial(self, admin_session):
        r = admin_session.get(f"{LEADS_URL}?type=trial", timeout=15)
        assert r.status_code == 200
        leads = r.json()
        for lead in leads:
            assert lead.get("type") == "trial"
        assert any(lead.get("email") == f"qa_trial_{UNIQUE}@example.com" for lead in leads)

    def test_no_mongo_id_leaked(self, admin_session):
        r = admin_session.get(LEADS_URL, timeout=15)
        assert r.status_code == 200
        for lead in r.json():
            assert "_id" not in lead
