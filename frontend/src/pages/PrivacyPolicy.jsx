import React from "react";
import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";
import SEO from "@/components/SEO";
import LegalSection from "@/components/LegalSection";

const LAST_UPDATED = "25 July 2026";

export default function PrivacyPolicy() {
  return (
    <PageShell testId="privacy-policy-page">
      <SEO
        title="Privacy Policy: NUA"
        description="How NUA collects, uses, stores and protects guest, staff and business data."
        canonical="https://nuapos.com.au/privacy"
      />
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        subtitle={`Last updated: ${LAST_UPDATED}`}
        accent="#8b5cf6"
        crumb="Privacy"
      />

      <div className="relative max-w-3xl mx-auto px-6 lg:px-10 pb-24 lg:pb-32">
        <p className="text-[15px] text-[#a1a1aa] leading-relaxed">
          NUA AUS PTY LTD (ABN <span className="font-mono text-[#eaeaea]">54 299 131 653</span>) ("<strong>NUA</strong>", "<strong>we</strong>", "<strong>us</strong>" or "<strong>our</strong>")
          provides an AI-powered hospitality operating system, including point of sale ("<strong>POS</strong>"), reservations,
          kitchen display, loyalty and wallet, inventory and purchasing, staff management, analytics, marketing automation, voice
          ordering, and related AI agent features (together, the "<strong>Services</strong>" or the "<strong>Platform</strong>").
          This Privacy Policy explains how we collect, use, disclose and protect personal information in connection with the
          Services, and the choices available to you.
        </p>
        <p className="mt-3 text-[15px] text-[#a1a1aa] leading-relaxed">
          We are committed to handling personal information in accordance with the <em>Privacy Act 1988</em> (Cth) and the
          Australian Privacy Principles ("<strong>APPs</strong>"). By using the Platform, you acknowledge that you have read and
          understood this Privacy Policy.
        </p>

        <LegalSection number={1} title="Who this policy applies to">
          <p>This Privacy Policy applies to three broad groups of people, and we've tried to be clear about which sections apply to whom:</p>
          <ul>
            <li><strong>Visitors</strong> to our website who browse our Platform, request a demo, or start a free trial.</li>
            <li><strong>Merchants</strong>, the venues, restaurants, cafés and hospitality groups that hold a NUA account and use the Services to run their business (in this Policy, "<strong>you</strong>" generally refers to a Merchant unless the context otherwise requires).</li>
            <li><strong>Guests</strong>, the customers of a Merchant whose information is processed through the Platform (for example, through the POS, Reservations, or Loyalty Engine). Where we process Guest information, we generally do so on behalf of, and under the instructions of, the relevant Merchant, who is responsible for their own compliance with privacy law in respect of their Guests.</li>
          </ul>
        </LegalSection>

        <LegalSection number={2} title="Information we collect">
          <p><strong>Information you give us directly</strong>, for example, when you:</p>
          <ul>
            <li>request a demo, start a free trial, or otherwise enquire about the Services, including your name, work email, business name, phone number, number of venues, and any message you send us;</li>
            <li>create or manage a Merchant account, including business details, billing information, and the names, emails and roles of staff members you invite to the Platform;</li>
            <li>contact our support team, including the content of any correspondence and attachments.</li>
          </ul>
          <p><strong>Information collected automatically</strong>: when you visit our website or use the Platform, we (and our service providers) may automatically collect:</p>
          <ul>
            <li>device and usage information, such as IP address, browser type, operating system, pages viewed, and referring URLs;</li>
            <li>analytics and interaction data collected through tools such as PostHog, used to understand how our website and Platform are used so we can improve them; and</li>
            <li>cookies and similar technologies, as described in section 5 below.</li>
          </ul>
          <p><strong>Information processed on behalf of Merchants</strong>, as part of operating the Services, we process information that Merchants input or that is generated through use of the Platform, including:</p>
          <ul>
            <li>Guest information such as names, contact details, order history, reservation details, table preferences, loyalty point balances and tier, and wallet pass identifiers (for the NUA Wallet, including Apple Wallet and Google Wallet passes);</li>
            <li>transaction and order data processed through the POS, Kitchen Display System, and Voice POS features;</li>
            <li>staff scheduling, rostering and performance data entered through Staff Management;</li>
            <li>inventory, supplier and purchasing records entered through Inventory & Purchasing;</li>
            <li>usage signals that feed the AI Command Center ("NUA" agent), such as demand forecasts, anomaly flags, and the resulting suggestions, approvals and executed actions, together with the associated audit trail.</li>
          </ul>
        </LegalSection>

        <LegalSection number={3} title="How we use information">
          <p>We use personal information to:</p>
          <ul>
            <li>provide, operate, maintain and improve the Platform and its individual modules (POS, Reservations, Loyalty, Inventory, Staff, Analytics, Marketing Automation, Voice POS, and the AI Command Center);</li>
            <li>process demo and free trial requests, set up and administer Merchant accounts, and provide customer support;</li>
            <li>process payments and manage billing for paid subscriptions;</li>
            <li>generate the forecasts, recommendations and automated decisions that power features such as demand forecasting, smart reordering, AI rostering, and marketing automation;</li>
            <li>issue and maintain NUA Wallet loyalty passes, including syncing balances to Apple Wallet and Google Wallet;</li>
            <li>send Merchants operational and transactional communications, and: where permitted and where a Merchant has enabled marketing automation, send Guests offers and communications on the Merchant's behalf;</li>
            <li>monitor, detect and prevent fraud, abuse, and security incidents;</li>
            <li>comply with our legal obligations, and to establish, exercise or defend legal claims.</li>
          </ul>
        </LegalSection>

        <LegalSection number={4} title="How we share information">
          <p>We do not sell personal information. We may share personal information with:</p>
          <ul>
            <li><strong>Service providers and subprocessors</strong> who help us deliver the Services, such as cloud hosting providers, payment processors (for example, Stripe, Square, PayPal, Apple Pay), messaging and communications providers (for example, Twilio, Mailchimp), delivery platform integrations (for example, Uber Eats, DoorDash, Deliveroo), accounting integrations (for example, Xero, QuickBooks), and analytics providers (for example, PostHog);</li>
            <li><strong>Merchants</strong>, where a Guest's information is collected through that Merchant's use of the Platform;</li>
            <li><strong>professional advisers</strong>, such as our auditors, lawyers and insurers, where reasonably required;</li>
            <li><strong>a purchaser or prospective purchaser</strong>, in connection with an actual or proposed merger, acquisition, restructuring, or sale of assets; and</li>
            <li><strong>regulators, law enforcement or other third parties</strong>, where required or authorised by law, or to protect the rights, property or safety of NUA, our Merchants, Guests, or others.</li>
          </ul>
        </LegalSection>

        <LegalSection number={5} title="Cookies and similar technologies">
          <p>
            Our website and Platform use cookies and similar technologies (such as local storage and analytics scripts) to keep
            you signed in, remember your preferences, understand how our website is used, and improve the performance and
            content of our Services. Most browsers allow you to control cookies through their settings, including blocking or
            deleting them. Please note that disabling cookies may affect the functionality of our website or Platform.
          </p>
        </LegalSection>

        <LegalSection number={6} title="Payment information">
          <p>
            We do not store full payment card numbers. Payments made through the Platform, whether for a Merchant's NUA
            subscription or for transactions processed through the POS. Are handled by our third-party payment processors,
            who are responsible for the security of payment card data in accordance with the Payment Card Industry Data
            Security Standard (PCI DSS). We may receive limited transaction metadata (such as amount, date, and payment
            status) from these providers in order to operate the Services.
          </p>
        </LegalSection>

        <LegalSection number={7} title="Data storage, security and overseas transfers">
          <p>
            We use administrative, technical and physical safeguards designed to protect personal information from loss,
            misuse, and unauthorised access, disclosure, alteration or destruction. No method of transmission or storage is
            completely secure, and we cannot guarantee absolute security.
          </p>
          <p>
            Because we use cloud infrastructure and service providers that may operate outside Australia, personal information
            may be stored or processed overseas. Where this occurs, we take reasonable steps to ensure that overseas recipients
            handle personal information consistently with the APPs, including through contractual protections with our service
            providers.
          </p>
        </LegalSection>

        <LegalSection number={8} title="Data retention">
          <p>
            We retain personal information for as long as reasonably necessary to provide the Services, comply with our legal
            obligations (including tax and accounting requirements), resolve disputes, and enforce our agreements. When a
            Merchant closes its account, we will delete or de-identify personal information within a reasonable period, except
            where we are required or permitted by law to retain it for longer (for example, transaction records required for
            tax purposes).
          </p>
        </LegalSection>

        <LegalSection number={9} title="Your privacy rights">
          <p>Subject to applicable exceptions under the Privacy Act, you have the right to:</p>
          <ul>
            <li>ask us whether we hold personal information about you, and request access to it;</li>
            <li>ask us to correct personal information that is inaccurate, out of date, incomplete, irrelevant or misleading;</li>
            <li>ask us to delete personal information we hold about you, subject to our legal and legitimate business retention needs;</li>
            <li>opt out of receiving marketing communications, using the unsubscribe link included in those communications or by contacting us directly; and</li>
            <li>lodge a complaint about how we have handled your personal information (see section 15 below).</li>
          </ul>
          <p>
            If your information is held by a NUA Merchant as part of their Guest records (for example, your loyalty account
            with a particular venue), you may need to direct your request to that Merchant in the first instance, as they are
            generally the party responsible for that information.
          </p>
        </LegalSection>

        <LegalSection number={10} title="Children's privacy">
          <p>
            Our Services are intended for use by businesses and their authorised personnel, and are not directed to children.
            We do not knowingly collect personal information from children. If you believe a child has provided us with
            personal information, please contact us using the details below so we can take appropriate action.
          </p>
        </LegalSection>

        <LegalSection number={11} title="Third-party links and integrations">
          <p>
            The Platform integrates with, and our website may link to, third-party services (such as payment processors,
            delivery platforms, accounting software, and messaging providers). This Privacy Policy does not cover the privacy
            practices of those third parties, and we encourage you to review their respective privacy policies.
          </p>
        </LegalSection>

        <LegalSection number={12} title="Changes to this policy">
          <p>
            We may update this Privacy Policy from time to time to reflect changes to our practices, the Services, or legal
            requirements. We will post the updated version on this page with a revised "Last updated" date, and where changes
            are material, we will take reasonable steps to notify Merchants (for example, by email).
          </p>
        </LegalSection>

        <LegalSection number={13} title="Contact us and complaints">
          <p>
            If you have a question about this Privacy Policy, wish to exercise a privacy right, or want to make a complaint
            about how we've handled your personal information, please contact our Privacy Officer at:
          </p>
          <p>
            NUA AUS PTY LTD<br />
            ABN: <span className="font-mono">54 299 131 653</span><br />
            Attn: Privacy Officer<br />
            Email: <a href="mailto:info@nuapos.com.au">info@nuapos.com.au</a><br />
            Address: <span className="font-mono">[Insert registered business address]</span>
          </p>
          <p>
            We will acknowledge your complaint and aim to respond within a reasonable time. If you are not satisfied with our
            response, you may lodge a complaint with the Office of the Australian Information Commissioner (OAIC) at{" "}
            <a href="https://www.oaic.gov.au" target="_blank" rel="noreferrer">www.oaic.gov.au</a>.
          </p>
        </LegalSection>
      </div>
    </PageShell>
  );
}
