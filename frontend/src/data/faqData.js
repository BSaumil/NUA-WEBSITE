const faqData = [
  {
    q: "What exactly is NUA?",
    a: "NUA is an AI-driven restaurant operating system: POS, Kitchen Display, Bookings, Loyalty, Inventory, Staff and Analytics all in one platform, with an AI Agent that watches those modules together and can act on what it sees. It's built to replace a stack of disconnected tools with one system that shares a single source of truth.",
  },
  {
    q: "How long is the free trial, and do I need a card to start?",
    a: "7 days, and no payment card is required to start. You can explore the full platform before deciding on a plan.",
  },
  {
    q: "Is the pricing on the website final?",
    a: "Pricing shown across the site (Starter, Growth, Enterprise and the Lifetime plan) is indicative and may vary by region, add-ons or promotional offers. We recommend confirming a formal, written quote for your venue before purchase.",
  },
  {
    q: "What does the Lifetime plan actually include?",
    a: "A one-time payment for lifetime access to everything in the Growth plan, up to 10 locations, with free updates going forward and no recurring monthly fee. It's positioned for founding members and is limited, not a permanent fixture of the pricing page.",
  },
  {
    q: "How long does it take to migrate from our current POS?",
    a: "Most single-venue migrations complete within a day once your menu is ready to import: NUA reads a spreadsheet or PDF export and maps items, modifiers and prices automatically, flagging anything it isn't confident about for you to confirm. Multi-location migrations typically take longer depending on menu variance across venues.",
  },
  {
    q: "Does NUA work if the internet goes down?",
    a: "The POS supports offline checkout, so you can keep taking orders and payments through an outage; data syncs back once connectivity returns. Some AI Agent features that depend on live cloud data are paused until you're back online.",
  },
  {
    q: "How is guest and payment data secured?",
    a: "Data moving between a terminal and NUA's cloud is encrypted over TLS, and stored data (menus, guest records, sales history) is encrypted at rest. Card details are never stored on the terminal or in NUA's own database; payments route through PCI-DSS compliant processors built for that purpose. See the Security page for the full breakdown.",
  },
  {
    q: "Can NUA run multiple venues or locations from one account?",
    a: "Yes. Starter covers a single location; Growth and the Lifetime plan support up to 10 locations; Enterprise supports unlimited locations with franchise dashboards and role-based access for multi-site teams.",
  },
  {
    q: "Is the AI Agent fully autonomous, or can we control what it does?",
    a: "You choose. NUA starts new venues in Suggest mode, where the AI Agent recommends and a human approves, and you can move individual automations to fully autonomous once you trust them. Spend-affecting actions can be capped with guardrails, and every autonomous decision is logged in an audit trail.",
  },
  {
    q: "Can I cancel, and what happens to my data if I do?",
    a: "You can cancel a subscription at any time through account settings or by contacting us; cancellation takes effect at the end of your current billing period rather than immediately. There's no long-term lock-in beyond the billing period you're currently in.",
  },
  {
    q: "Does NUA integrate with other tools we already use?",
    a: "Growth and Enterprise plans include custom integrations and API access for connecting accounting, payroll or supplier systems. If you need something specific, tell us during onboarding and we'll confirm what's possible for your stack.",
  },
  {
    q: "What hardware do we need to run NUA?",
    a: "NUA runs on standard POS terminals and tablets; the Kitchen Display System runs on any KDS-compatible screen or tablet per station. Voice POS works with a supported headset or a device's built-in microphone. We can advise on specific hardware during onboarding.",
  },
  {
    q: "How do we get help if we're stuck during setup?",
    a: "Every module has a step-by-step setup guide in Documentation. If you're still stuck, email info@nuapos.com.au and a real person on the team will help you through it.",
  },
];

export default faqData;
