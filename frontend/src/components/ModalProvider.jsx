import React, { createContext, useCallback, useContext, useState } from "react";
import LeadDialog from "@/components/dialogs/LeadDialog";

const ModalContext = createContext({
  openLead: () => {},
});

export const useModals = () => useContext(ModalContext);

export default function ModalProvider({ children }) {
  const [leadState, setLeadState] = useState({ open: false, type: "demo", plan: null });

  const openLead = useCallback((opts = {}) => {
    setLeadState({ open: true, type: opts.type || "demo", plan: opts.plan || null });
  }, []);
  const closeLead = useCallback(() => setLeadState((s) => ({ ...s, open: false })), []);

  return (
    <ModalContext.Provider value={{ openLead }}>
      {children}
      <LeadDialog
        open={leadState.open}
        onOpenChange={(v) => (v ? null : closeLead())}
        type={leadState.type}
        plan={leadState.plan}
      />
    </ModalContext.Provider>
  );
}
