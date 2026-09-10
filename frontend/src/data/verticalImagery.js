/**
 * Photography for the vertical landing pages.
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
 * bar-pos originally borrowed generic hospitality scenes because the pack
 * contained no bar, pub or beverage-service photography at all. A dedicated bar
 * batch has since been supplied, so it now shows its own trade: a cocktail bar,
 * a pub, a wine bar and a neighbourhood bar, rather than a dining room standing
 * in for one.
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
      group: "bar",
      id: "nua-cocktail-bar-service-hero",
      alt: "A bartender finishing a cocktail at a busy bar, tickets and tabs running behind the counter.",
    },
    scenes: [
      {
        group: "bar",
        id: "nua-modern-pub-service-hero",
        alt: "A pub bar mid-service, beer poured to order while the floor keeps moving.",
        caption: "Tabs opened and found fast, however loud the room gets.",
      },
      {
        group: "bar",
        id: "nua-wine-bar-service-hero",
        alt: "A wine bar counter with bottles by the glass and a terminal at the pass.",
        caption: "Pour-level stock tracked as it is sold, not counted after close.",
      },
      {
        group: "bar",
        id: "nua-neighbourhood-bar-hero",
        alt: "A neighbourhood bar at service, staff working the counter and the floor together.",
        caption: "Staffed to the night, not to a fixed weekly template.",
      },
      {
        group: "bar",
        id: "nua-bar-service-square",
        alt: "A tab being settled at the bar at the end of the night.",
        caption: "Settled cleanly, with every transfer and void on the record.",
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
