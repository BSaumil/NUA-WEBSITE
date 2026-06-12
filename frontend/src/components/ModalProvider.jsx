import React, { createContext, useCallback, useContext, useState } from "react";
import LeadDialog from "@/components/dialogs/LeadDialog";
import VideoDialog from "@/components/dialogs/VideoDialog";

const ModalContext = createContext({
  openLead: () => {},
  openVideo: () => {},
});

export const useModals = () => useContext(ModalContext);

export default function ModalProvider({ children }) {
  const [leadState, setLeadState] = useState({ open: false, type: "demo", plan: null });
  const [videoOpen, setVideoOpen] = useState(false);

  const openLead = useCallback((opts = {}) => {
    setLeadState({ open: true, type: opts.type || "demo", plan: opts.plan || null });
  }, []);
  const closeLead = useCallback(() => setLeadState((s) => ({ ...s, open: false })), []);

  const openVideo = useCallback(() => setVideoOpen(true), []);
  const closeVideo = useCallback(() => setVideoOpen(false), []);

  return (
    <ModalContext.Provider value={{ openLead, openVideo }}>
      {children}
      <LeadDialog
        open={leadState.open}
        onOpenChange={(v) => (v ? null : closeLead())}
        type={leadState.type}
        plan={leadState.plan}
      />
      <VideoDialog open={videoOpen} onOpenChange={(v) => (v ? null : closeVideo())} />
    </ModalContext.Provider>
  );
}
