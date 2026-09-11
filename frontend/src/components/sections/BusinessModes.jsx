import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, UtensilsCrossed, ShoppingBag, CalendarCheck } from "lucide-react";
import Figure from "@/components/Figure";

/**
 * The three business types NUA runs, immediately below the hero.
 *
 * §41 asks that NUA not be defined permanently as restaurant software, and §11
 * asks for a business-mode switch near the top of the homepage. This is that
 * switch: rather than a toggle that hides two thirds of the answer, all three
 * are shown at once, because a visitor deciding whether NUA is "for them" is
 * answering a yes/no question and should not have to hunt for their own
 * category.
 *
 * Each card is a real photograph of that trade and links to the vertical page
 * that already ranks for its category terms, so this section also does the
 * internal-linking job §30 asks for.
 */
const modes = [
  {
    slug: "hospitality-pos",
    icon: UtensilsCrossed,
    colour: "#A45D0D",
    eyebrow: "Hospitality",
    title: "Restaurants, cafés and bars",
    body: "Floor, kitchen, bookings and stock on one system, so a service runs without anyone reconciling it afterwards.",
    image: { group: "hospitality", id: "live-restaurant-floor-map-dashboard" },
    alt: "A live floor plan on a restaurant terminal, each table showing its current course.",
  },
  {
    slug: "retail-pos",
    icon: ShoppingBag,
    colour: "#0A76A7",
    eyebrow: "Retail",
    title: "Boutiques and multi-store",
    body: "Counter and online drawing on the same stock number, with replenishment proposed from what actually sold.",
    image: { group: "retail", id: "sell-beautifully-boutique-pos-experience" },
    alt: "A boutique counter mid-sale, with the terminal showing the item being rung up.",
  },
  {
    slug: "services-pos",
    icon: CalendarCheck,
    colour: "#0D7B6F",
    eyebrow: "Services",
    title: "Salons, spas and studios",
    body: "Appointments, client history, memberships and payment on one record, so rebooking is prompted rather than remembered.",
    image: { group: "professional-services", id: "warm-spa-reception-with-smart-booking-ui" },
    alt: "A calm reception desk with the day's appointments shown on screen as a client arrives.",
  },
];

export default function BusinessModes() {
  return (
    <section
      id="business-modes"
      data-testid="business-modes-section"
      className="relative py-20 lg:py-28 bg-nua-bg"
    >
      <div className="absolute inset-0 bg-grid-dark opacity-20 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />

      <div className="relative max-w-6xl mx-auto px-6 lg:px-10">
        <div className="max-w-2xl">
          <span className="font-mono text-[11px] uppercase tracking-widest text-nua-ink2">
            One system, three trades
          </span>
          <h2 className="font-display mt-3 text-3xl sm:text-4xl font-bold text-nua-ink tracking-tight leading-[1.05]">
            Built for businesses that
            <br />
            <span className="text-nua-burgundy">serve people in person.</span>
          </h2>
          <p className="mt-4 text-nua-ink2 leading-relaxed">
            The same modules underneath. What changes is the language, the workflow and
            what the screen puts in front of your staff.
          </p>
        </div>

        <div className="mt-10 grid md:grid-cols-3 gap-5">
          {modes.map((mode, i) => (
            <motion.div
              key={mode.slug}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.07 }}
            >
              <Link
                to={`/${mode.slug}`}
                data-testid={`business-mode-${mode.slug}`}
                className="group block h-full rounded-2xl overflow-hidden bg-nua-surface border border-nua-border hover:border-nua-border hover:-translate-y-1 transition-all duration-300"
              >
                <Figure
                  group={mode.image.group}
                  id={mode.image.id}
                  alt={mode.alt}
                  rounded=""
                  sizes="(min-width: 768px) 380px, 100vw"
                />
                <div className="p-6">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center border"
                    style={{ background: '#750D280D', borderColor: '#E8DED4' }}
                  >
                    <mode.icon className="w-4 h-4 text-nua-burgundy"  />
                  </div>
                  <span
                    className="mt-4 block font-mono text-[10px] uppercase tracking-widest text-nua-burgundy"
                    
                  >
                    {mode.eyebrow}
                  </span>
                  <h3 className="mt-1.5 font-display text-lg font-semibold text-nua-ink tracking-tight">
                    {mode.title}
                  </h3>
                  <p className="mt-2 text-[13px] text-nua-ink2 leading-relaxed">{mode.body}</p>
                  <span
                    className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-medium transition-colors text-nua-burgundy"
                    
                  >
                    See how it works
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
