import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import Landing from "@/pages/Landing";
import ModalProvider from "@/components/ModalProvider";

function App() {
  return (
    <div className="App font-body">
      <BrowserRouter>
        <ModalProvider>
          <Routes>
            <Route path="/" element={<Landing />} />
          </Routes>
        </ModalProvider>
      </BrowserRouter>
      <Toaster richColors theme="dark" position="bottom-right" />
    </div>
  );
}

export default App;
