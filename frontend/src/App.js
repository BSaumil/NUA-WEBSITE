import "@/App.css";
import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import ModalProvider from "@/components/ModalProvider";
import ScrollToTop from "@/components/ScrollToTop";
import RouteLoader from "@/components/RouteLoader";

const Landing = lazy(() => import("@/pages/Landing"));
const Features = lazy(() => import("@/pages/Features"));
const Platform = lazy(() => import("@/pages/Platform"));
const AiAgent = lazy(() => import("@/pages/AiAgent"));
const Solutions = lazy(() => import("@/pages/Solutions"));
const SolutionDetail = lazy(() => import("@/pages/SolutionDetail"));
const VerticalLanding = lazy(() => import("@/pages/VerticalLanding"));
const PricingPage = lazy(() => import("@/pages/PricingPage"));
const IntegrationsPage = lazy(() => import("@/pages/IntegrationsPage"));
const Resources = lazy(() => import("@/pages/Resources"));
const Docs = lazy(() => import("@/pages/Docs"));
const DocDetail = lazy(() => import("@/pages/DocDetail"));
const PrivacyPolicy = lazy(() => import("@/pages/PrivacyPolicy"));
const TermsConditions = lazy(() => import("@/pages/TermsConditions"));
const Savings = lazy(() => import("@/pages/Savings"));
const About = lazy(() => import("@/pages/About"));
const Customers = lazy(() => import("@/pages/Customers"));
const Careers = lazy(() => import("@/pages/Careers"));
const Blog = lazy(() => import("@/pages/Blog"));
const BlogPost = lazy(() => import("@/pages/BlogPost"));
const Press = lazy(() => import("@/pages/Press"));
const Contact = lazy(() => import("@/pages/Contact"));
const Gallery = lazy(() => import("@/pages/Gallery"));
const Security = lazy(() => import("@/pages/Security"));
const Status = lazy(() => import("@/pages/Status"));
const Compare = lazy(() => import("@/pages/Compare"));
const CompareDetail = lazy(() => import("@/pages/CompareDetail"));
const NotFound = lazy(() => import("@/pages/NotFound"));

function App() {
  return (
    <div className="App font-body">
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <ModalProvider>
          <ScrollToTop />
          <Suspense fallback={<RouteLoader />}>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/features" element={<Features />} />
              <Route path="/platform" element={<Platform />} />
              <Route path="/ai-agent" element={<AiAgent />} />
              <Route path="/solutions" element={<Solutions />} />
              <Route path="/solutions/:slug" element={<SolutionDetail />} />
              {/* High-intent vertical landing pages, kept at the root so the
                  URL reads as the category term itself. */}
              <Route path="/restaurant-pos" element={<VerticalLanding />} />
              <Route path="/cafe-pos" element={<VerticalLanding />} />
              <Route path="/bar-pos" element={<VerticalLanding />} />
              <Route path="/hospitality-pos" element={<VerticalLanding />} />
              <Route path="/pricing" element={<PricingPage />} />
              <Route path="/integrations" element={<IntegrationsPage />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/docs" element={<Docs />} />
              <Route path="/docs/:slug" element={<DocDetail />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<TermsConditions />} />
              <Route path="/savings" element={<Savings />} />
              <Route path="/about" element={<About />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/press" element={<Press />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/security" element={<Security />} />
              <Route path="/status" element={<Status />} />
              <Route path="/compare" element={<Compare />} />
              <Route path="/compare/:slug" element={<CompareDetail />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </ModalProvider>
      </BrowserRouter>
      <Toaster richColors theme="dark" position="bottom-right" />
    </div>
  );
}

export default App;
