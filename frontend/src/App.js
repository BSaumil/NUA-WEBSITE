import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import Landing from "@/pages/Landing";
import Features from "@/pages/Features";
import Platform from "@/pages/Platform";
import AiAgent from "@/pages/AiAgent";
import Solutions from "@/pages/Solutions";
import SolutionDetail from "@/pages/SolutionDetail";
import PricingPage from "@/pages/PricingPage";
import IntegrationsPage from "@/pages/IntegrationsPage";
import Resources from "@/pages/Resources";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import TermsConditions from "@/pages/TermsConditions";
import Savings from "@/pages/Savings";
import About from "@/pages/About";
import Customers from "@/pages/Customers";
import Careers from "@/pages/Careers";
import Blog from "@/pages/Blog";
import Press from "@/pages/Press";
import Contact from "@/pages/Contact";
import Gallery from "@/pages/Gallery";
import ModalProvider from "@/components/ModalProvider";
import ScrollToTop from "@/components/ScrollToTop";

function App() {
  return (
    <div className="App font-body">
      <BrowserRouter>
        <ModalProvider>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/features" element={<Features />} />
            <Route path="/platform" element={<Platform />} />
            <Route path="/ai-agent" element={<AiAgent />} />
            <Route path="/solutions" element={<Solutions />} />
            <Route path="/solutions/:slug" element={<SolutionDetail />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/integrations" element={<IntegrationsPage />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsConditions />} />
            <Route path="/savings" element={<Savings />} />
            <Route path="/about" element={<About />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/press" element={<Press />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/gallery" element={<Gallery />} />
          </Routes>
        </ModalProvider>
      </BrowserRouter>
      <Toaster richColors theme="dark" position="bottom-right" />
    </div>
  );
}

export default App;
