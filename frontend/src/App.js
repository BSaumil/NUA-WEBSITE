import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import Landing from "@/pages/Landing";
import Features from "@/pages/Features";
import Platform from "@/pages/Platform";
import AiAgent from "@/pages/AiAgent";
import Solutions from "@/pages/Solutions";
import PricingPage from "@/pages/PricingPage";
import IntegrationsPage from "@/pages/IntegrationsPage";
import Resources from "@/pages/Resources";
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
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/integrations" element={<IntegrationsPage />} />
            <Route path="/resources" element={<Resources />} />
          </Routes>
        </ModalProvider>
      </BrowserRouter>
      <Toaster richColors theme="dark" position="bottom-right" />
    </div>
  );
}

export default App;
