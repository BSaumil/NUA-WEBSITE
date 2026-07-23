import {
  Calculator, CalendarRange, ChefHat, Gift, Boxes, Users,
  BrainCircuit, BarChart3, Megaphone, Mic,
} from "lucide-react";

const featuresData = [
  {
    id: "pos",
    icon: Calculator,
    color: "#f58c14",
    title: "Point of Sale",
    tagline: "Checkout that never stops.",
    description: "A lightning-fast checkout that runs on iOS, Android and kiosks — and keeps taking orders even when the internet doesn't cooperate.",
    capabilities: ["Offline-first order queue", "Split bills & tab management", "Instant loyalty point award", "Auto-sync to Kitchen Display"],
    pseudocode: `function processOrder(cart, table) {
  order = new Order(table, cart.items)
  order.subtotal = sum(item.price * item.qty for item in cart.items)
  order.tax = order.subtotal * taxRate(table.region)
  order.total = order.subtotal + order.tax

  if (network.isOffline()) {
    queueForSync(order)          // local-first, no dropped sales
  } else {
    pushToKitchenDisplay(order)
    chargePayment(order.total)
  }

  loyalty.awardPoints(order.customer, order.total)
  return printReceipt(order)
}`,
  },
  {
    id: "reservations",
    icon: CalendarRange,
    color: "#8b5cf6",
    title: "Reservations",
    tagline: "The floor, visible & alive.",
    description: "Table management, waitlists and booking portal in one flow — Ash ranks tables by predicted turn-time and flags VIPs before they arrive.",
    capabilities: ["Live floor plan + waitlist", "VIP guest tagging", "Turn-time prediction", "Busy-time heatmaps"],
    pseudocode: `function seatGuest(party, floorPlan) {
  candidates = floorPlan.tables.filter(t =>
    t.capacity >= party.size && t.status == "available"
  )
  ranked = ash.rankByTurnTime(candidates, party, demandHistory)

  if (party.isVIP) {
    ranked = ash.prioritise(ranked, preference: party.pastTables)
  }

  best = ranked[0]
  best.assign(party)
  notify(host, "Seat " + party.name + " at " + best.label)
  return best
}`,
  },
  {
    id: "kds",
    icon: ChefHat,
    color: "#ec4899",
    title: "Kitchen Display System",
    tagline: "Smart routing, zero ticket drift.",
    description: "Orders route to the right station automatically, with live ticket aging so nothing sits too long on the pass.",
    capabilities: ["Station-aware routing", "Live ticket-age warnings", "Auto-bump on completion", "Course pacing across stations"],
    pseudocode: `function routeTicket(order) {
  for (item of order.items) {
    station = menu.stationFor(item)      // grill, pass, bar...
    station.queue.push(item, firedAt: now())
  }

  watchAging(order, thresholds: { warn: 8*60, late: 12*60 })
  on(order.allItemsReady, () => bump(order, status: "ready"))
}`,
  },
  {
    id: "loyalty",
    icon: Gift,
    color: "#ec4899",
    title: "Loyalty Engine",
    tagline: "Turn every guest into a regular.",
    description: "Points, tiers, multipliers, gift cards and referrals — wired directly into POS, app and Ash's marketing brain.",
    capabilities: ["Category point multipliers", "Instant checkout redemption", "Auto tier recalculation", "Referral + winback rewards"],
    pseudocode: `function onOrderComplete(order) {
  base = order.total * pointsPerDollar
  multiplier = tierMultiplier(order.customer.tier)
             * categoryMultiplier(order.items)
  points = round(base * multiplier)

  order.customer.points += points
  order.customer.tier = recalculateTier(order.customer.points)

  if (order.customer.points >= nextReward.threshold) {
    issueReward(order.customer, nextReward)
  }
  return order.customer
}`,
  },
  {
    id: "inventory",
    icon: Boxes,
    color: "#8b5cf6",
    title: "Inventory & Purchasing",
    tagline: "Smart Pantry that orders for you.",
    description: "Recipe-level costing, supplier comparison and demand forecasting — Ash recommends the exact buy at the exact time.",
    capabilities: ["Recipe-level food costing", "Supplier price comparison", "Auto purchase-order drafts", "Waste + anomaly detection"],
    pseudocode: `function dailyPantryScan(inventory, forecast) {
  for (sku of inventory.skus) {
    demand = forecast.predict(sku, horizonDays: 7)
    daysOfCover = sku.onHand / demand.dailyAvg

    if (daysOfCover < sku.leadTime + safetyBuffer) {
      supplier = compareSuppliers(sku, criteria: [price, leadTime, reliability])
      suggestPurchaseOrder(sku, supplier, qty: demand.recommendedQty)
    }
    if (sku.wasteRate > sku.wasteThreshold) {
      flagWasteAlert(sku)
    }
  }
}`,
  },
  {
    id: "staff",
    icon: Users,
    color: "#f58c14",
    title: "Staff Management",
    tagline: "The roster that runs itself.",
    description: "AI rostering matches forecast demand to skills and certifications — shift swaps, payroll and tips built right in.",
    capabilities: ["Demand-matched AI rostering", "One-tap shift swaps", "Smart tip distribution", "Labour-cost forecasting"],
    pseudocode: `function generateRoster(week, staff, forecast) {
  demandCurve = forecast.coversByHour(week)
  shifts = solveOptimalShifts(demandCurve, staff, constraints: {
    certifications, maxHours, availability, laborBudget
  })

  for (gap of shifts.uncoveredSlots) {
    candidate = rankBySkillFit(staff, gap)
    suggestSwap(candidate, gap)          // needs human approval
  }
  return shifts
}`,
  },
  {
    id: "ash",
    icon: BrainCircuit,
    color: "#8b5cf6",
    title: "AI Command Center",
    tagline: "Ash runs ops, autonomously.",
    description: "Every signal — guests, stock, staff, margins — flows through one decision loop that suggests, approves, or auto-executes.",
    capabilities: ["Continuous signal monitoring", "Confidence-scored actions", "Full audit trail", "Human-in-the-loop approvals"],
    pseudocode: `function ashDecisionLoop(signals) {
  for (signal of signals.stream()) {     // guests, stock, staff, margins
    context = enrich(signal, history, benchmarks)
    action = model.evaluate(context)

    if (action.confidence >= 0.95) {
      execute(action); log(action, "executed")
    } else if (action.confidence >= 0.75) {
      propose(action); log(action, "approved-pending")
    } else {
      suggest(action); log(action, "suggested")
    }
  }
}`,
  },
  {
    id: "analytics",
    icon: BarChart3,
    color: "#f58c14",
    title: "Analytics Dashboard",
    tagline: "See the venue like never before.",
    description: "Live revenue streams, menu engineering, retention heatmaps and forecasting — one executive dashboard, always current.",
    capabilities: ["Menu engineering matrix", "Live revenue streaming", "Retention heatmaps", "30-day revenue forecasting"],
    pseudocode: `function computeMenuEngineering(menu, salesHistory) {
  for (item of menu.items) {
    popularity = percentileRank(item.unitsSold, menu.items)
    margin = percentileRank(item.contributionMargin, menu.items)

    item.category = classify(popularity, margin)
    // → Star, Plowhorse, Puzzle, or Dog
  }
  return forecastRevenue(salesHistory, horizonDays: 30)
}`,
  },
  {
    id: "marketing",
    icon: Megaphone,
    color: "#ec4899",
    title: "Marketing Automation",
    tagline: "Campaigns that trigger themselves.",
    description: "Segmented campaigns fire automatically off guest behaviour — no marketer required to hit send.",
    capabilities: ["Behaviour-triggered segments", "AI-personalised offers", "Multi-channel send", "Conversion tracking"],
    pseudocode: `function runAutomation(segmentRules, customers) {
  segment = customers.filter(segmentRules)  // e.g. "no visit in 21 days"

  for (guest of segment) {
    offer = ash.personaliseOffer(guest.history, guest.tier)
    campaign.send(guest, channel: guest.preferredChannel, offer)
  }
  trackConversion(campaign, windowDays: 14)
}`,
  },
  {
    id: "voice",
    icon: Mic,
    color: "#f58c14",
    title: "Voice POS",
    tagline: "Run your venue by voice.",
    description: "Hands full at the pass? Just speak. Ash understands intent, context and your menu — instantly.",
    capabilities: ["Real-time speech-to-text", "Intent classification", "Context-aware execution", "Voice-confirmed actions"],
    pseudocode: `function handleVoiceCommand(audioStream) {
  transcript = speechToText(audioStream)
  intent = classifyIntent(transcript, context: currentOrder)

  if (intent.type == "add_item") {
    cart.add(intent.item, intent.qty)
  } else if (intent.type == "apply_discount") {
    pos.applyDiscount(intent.pct, intent.target)
  } else if (intent.type == "run_report") {
    reports.generate(intent.reportType, intent.range)
  } else {
    askForClarification(intent)
  }
  return confirmVoice(intent.summary)
}`,
  },
];

export default featuresData;
