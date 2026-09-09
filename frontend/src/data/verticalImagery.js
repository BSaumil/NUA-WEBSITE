/**
 * Photography for the four hospitality landing pages.
 *
 * Kept separate from verticalsData so the image choices can be reviewed on
 * their own: which scene backs which claim is an editorial decision, and it
 * changes when the asset pack changes, whereas the copy does not.
 *
 * Alt text describes what is in the frame and why it is on this page. It is
 * not the filename restated — a screen reader user gets the same information a
 * sighted reader takes from the photo, and search engines get a real
 * description rather than a slug.
 *
 * KNOWN GAP — bar-pos. The pack contains no bar, pub or beverage-service
 * scenes at all (checked across all eleven folders). The scenes used below are
 * genuinely generic hospitality moments — a tab being settled, stock being
 * counted, a roster — rather than restaurant-specific ones, so nothing on the
 * page shows a dining room and calls it a bar. It is still the weakest of the
 * four sets, and a bar batch is the single most useful addition to the pack.
 */
const verticalImagery = {
  "restaurant-pos": {
    hero: {
      group: "hospitality",
      id: "live-restaurant-floor-map-dashboard",
      alt: "A live floor plan on a restaurant terminal, each table showing its current course and how long it has been seated.",
    },
    scenes: [
      {
        group: "hospitality",
        id: "nua-table-ordering-experience",
        alt: "A server taking an order at the table on a handheld device.",
        caption: "Orders taken at the table, not carried back to a terminal.",
      },
      {
        group: "hospitality",
        id: "real-time-kitchen-clarity",
        alt: "A kitchen display screen on the pass showing open tickets grouped by course.",
        caption: "Every item fires to its own station, with course timing held.",
      },
      {
        group: "hospitality",
        id: "smart-pantry-inventory-dashboard",
        alt: "A stockroom shelf alongside an inventory screen showing current counts.",
        caption: "Recipe-level stock drops as each dish sells.",
      },
      {
        group: "hospitality",
        id: "nua-s-smarter-shared-dining",
        alt: "Guests at a shared table settling a bill split across several cards.",
        caption: "Splitting a bill without recalculating the table.",
      },
    ],
  },

  "cafe-pos": {
    hero: {
      group: "hospitality",
      id: "built-for-cafe-service",
      alt: "A cafe counter mid-morning, with an order being taken while coffee is made behind.",
    },
    scenes: [
      {
        group: "hospitality",
        id: "voice-powered-cafe-service",
        alt: "A barista working the machine with both hands while placing an order by voice.",
        caption: "Hands stay on the machine through the morning rush.",
      },
      {
        group: "hospitality",
        id: "turn-every-guest-into-a-regular",
        alt: "A returning customer at the counter, their usual order shown on the terminal.",
        caption: "The regular's usual comes up before they ask for it.",
      },
      {
        group: "hospitality",
        id: "smart-reordering-for-brighter-kitchens",
        alt: "A cafe stockroom with a reorder list on screen showing what is running low.",
        caption: "Reordering prompted by what actually sold.",
      },
      {
        group: "hospitality",
        id: "keep-every-shift-in-sync",
        alt: "A roster on screen showing the week's shifts against expected trade.",
        caption: "Rosters built against demand, not last week's guess.",
      },
    ],
  },

  "bar-pos": {
    hero: {
      group: "hospitality",
      id: "payments-made-simple-at-nua",
      alt: "A tab being settled at the counter on a card terminal at the end of the night.",
    },
    scenes: [
      {
        group: "hospitality",
        id: "orders-from-every-channel",
        alt: "A single order queue on screen collecting orders arriving from several channels.",
        caption: "Every order lands in one queue, wherever it came from.",
      },
      {
        group: "hospitality",
        id: "smart-pantry-inventory-dashboard",
        alt: "A stockroom alongside a screen showing current stock levels by item.",
        caption: "Pour-level stock tracked as it is sold.",
      },
      {
        group: "hospitality",
        id: "keep-every-shift-in-sync",
        alt: "A roster on screen showing staffing across the night's trading hours.",
        caption: "Staffed to the night, not to a fixed template.",
      },
      {
        group: "reliability-offline-hardware",
        id: "keep-selling-even-offline",
        alt: "A terminal continuing to take orders while showing it is working without a connection.",
        caption: "Trading continues when the connection does not.",
      },
    ],
  },

  "retail-pos": {
    hero: {
      group: "retail",
      id: "sell-beautifully-boutique-pos-experience",
      alt: "A boutique counter mid-sale, with the terminal showing the item being rung up and stock behind.",
    },
    scenes: [
      {
        group: "retail",
        id: "boutique-barcode-scanning-experience",
        alt: "A barcode being scanned at the counter, the product's size and colour variant shown on screen.",
        caption: "Size and colour are variants of one product, not a dozen items.",
      },
      {
        group: "retail",
        id: "from-online-order-to-pickup",
        alt: "An online order being handed over at a collection point in store.",
        caption: "Online and shop floor draw on the same stock number.",
      },
      {
        group: "retail",
        id: "effortless-returns-happier-customers",
        alt: "A return being processed at the counter, the original sale shown on screen.",
        caption: "Returns run through the original record, so stock and money reconcile.",
      },
      {
        group: "retail",
        id: "ai-powered-retail-reorder-insights",
        alt: "A replenishment screen proposing reorder quantities against recent sell-through.",
        caption: "Reorders proposed from what sold, for you to approve.",
      },
    ],
  },

  "hospitality-pos": {
    hero: {
      group: "enterprise-multi-location",
      id: "scale-every-venue-with-clarity",
      alt: "A multi-venue dashboard comparing several sites side by side on one screen.",
    },
    scenes: [
      {
        group: "enterprise-multi-location",
        id: "every-store-one-view",
        alt: "One screen listing every venue with its current trading position.",
        caption: "Every venue in one view, live.",
      },
      {
        group: "hospitality",
        id: "modern-restaurant-host-stand-dashboard",
        alt: "A host stand terminal showing the evening's bookings and floor state.",
        caption: "Each venue keeps its own floor, service and brand.",
      },
      {
        group: "hospitality",
        id: "protect-margins-automatically",
        alt: "A margin dashboard flagging items whose cost has moved against their price.",
        caption: "Cost movement surfaced per venue, not at month end.",
      },
      {
        group: "hospitality",
        id: "forecasting-tomorrow-in-hospitality",
        alt: "A forecast screen projecting tomorrow's trade against staffing and stock.",
        caption: "Tomorrow forecast from what every venue actually did.",
      },
    ],
  },
};

export default verticalImagery;
