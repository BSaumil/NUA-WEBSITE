import React from "react";
import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";
import SEO from "@/components/SEO";
import LegalSection from "@/components/LegalSection";

const LAST_UPDATED = "25 July 2026";

export default function TermsConditions() {
  return (
    <PageShell testId="terms-page">
      <SEO
        title="Terms & Conditions: NUA"
        description="The terms governing use of the NUA platform, subscriptions, trials and billing."
        canonical="https://nuapos.com.au/terms"
      />
      <PageHero
        eyebrow="Legal"
        title="Terms & Conditions"
        subtitle={`Last updated: ${LAST_UPDATED}`}
        accent="#f58c14"
        crumb="Terms"
      />

      <div className="relative max-w-3xl mx-auto px-6 lg:px-10 pb-24 lg:pb-32">
        <p className="text-[15px] text-[#a1a1aa] leading-relaxed">
          These Terms and Conditions ("<strong>Terms</strong>") are entered into between NUA AUS PTY LTD
          (ABN <span className="font-mono text-[#eaeaea]">54 299 131 653</span>) ("<strong>NUA</strong>", "<strong>we</strong>", "<strong>us</strong>" or "<strong>our</strong>")
          and the person or entity that registers for, accesses, or uses the Services ("<strong>you</strong>", "<strong>your</strong>" or
          "<strong>Merchant</strong>"). By creating an account, starting a free trial, or otherwise accessing or using the Services, you agree
          to be bound by these Terms. If you do not agree, you must not access or use the Services.
        </p>
        <p className="mt-3 text-[15px] text-[#a1a1aa] leading-relaxed">
          If you are entering into these Terms on behalf of a company or other legal entity, you represent that you have the
          authority to bind that entity, in which case "you" refers to that entity.
        </p>

        <LegalSection number={1} title="Definitions">
          <ul>
            <li><strong>"Services"</strong> or <strong>"Platform"</strong> means NUA's hospitality operating system, including Point of Sale, Reservations, Kitchen Display System, Loyalty Engine and NUA Wallet, Inventory & Purchasing, Staff Management, Analytics Dashboard, Marketing Automation, Voice POS, the AI Command Center ("NUA" agent), and any related websites, applications and support services.</li>
            <li><strong>"Merchant Content"</strong> means all data, text, images, menus, pricing, and other content that a Merchant or its authorised users upload, input, or generate through use of the Services, and all Guest information collected through the Services.</li>
            <li><strong>"Guest"</strong> means an end customer of a Merchant whose information is processed through the Services.</li>
            <li><strong>"Subscription Term"</strong> means the period for which a Merchant has subscribed to a paid plan, as set out in the applicable order or plan selection.</li>
          </ul>
        </LegalSection>

        <LegalSection number={2} title="About the services">
          <p>
            NUA provides a unified, AI-assisted operating system for hospitality venues. Depending on the plan selected, the
            Services may include: point-of-sale checkout (online and offline); table and reservation management; kitchen
            display and ticket routing; a loyalty engine with points, tiers and a digital wallet pass compatible with Apple
            Wallet and Google Wallet; inventory forecasting and purchase order suggestions; AI-assisted staff rostering;
            executive analytics and menu engineering; automated marketing campaigns; voice-driven order entry; and the "NUA"
            AI agent, which observes signals across these modules and suggests, proposes, or (where configured) automatically
            executes certain actions.
          </p>
          <p>
            We may add, change, or discontinue features of the Services from time to time. We will use reasonable efforts to
            notify Merchants of material changes that significantly and adversely affect their use of the Services.
          </p>
        </LegalSection>

        <LegalSection number={3} title="Eligibility and account registration">
          <p>
            To use the Services, you must be at least 18 years old and capable of forming a binding contract, and you must
            operate a genuine hospitality business or be authorised to act on its behalf. You agree to provide accurate,
            current and complete information when registering, and to keep that information up to date. You are responsible
            for maintaining the confidentiality of your account credentials and for all activity that occurs under your
            account, whether by you or by staff you invite to the Platform.
          </p>
        </LegalSection>

        <LegalSection number={4} title="Subscription plans, free trial and billing">
          <p>
            The Services are offered on a subscription basis under the plans described on our pricing page from time to
            time (currently Starter, Growth, Enterprise, and a one-time Lifetime plan), and may be billed per venue, per
            month, or as otherwise stated at the time of purchase. Where offered, a free trial (currently 7 days, no
            payment card required) allows you to evaluate the Services before committing to a paid subscription. We may
            change trial terms, or end a free trial offer, at any time.
          </p>
          <p>
            By subscribing to a paid plan, you authorise us (or our payment processor) to charge the applicable fees to your
            nominated payment method on a recurring basis for the Subscription Term, plus any applicable taxes (including
            GST). Fees are generally non-refundable except as expressly stated in these Terms, as required by the Australian
            Consumer Law, or as otherwise agreed by us in writing. Unless you cancel before the end of a billing period,
            your subscription will automatically renew for successive periods of the same length.
          </p>
          <p>
            We may change our fees on reasonable notice (for example, by email or in-app notice), and any fee changes will
            take effect from your next renewal or billing cycle, unless otherwise stated.
          </p>
        </LegalSection>

        <LegalSection number={5} title="Your responsibilities and acceptable use">
          <p>You agree that you will not, and will not permit any user of your account to:</p>
          <ul>
            <li>use the Services for any unlawful purpose, or in a way that infringes the rights of any third party;</li>
            <li>attempt to gain unauthorised access to the Services, other accounts, or any related systems or networks;</li>
            <li>reverse engineer, decompile, or attempt to extract the source code of the Platform, except to the extent this restriction is prohibited by law;</li>
            <li>use the Services to transmit any virus, malware, or other harmful code, or to interfere with the integrity or performance of the Platform;</li>
            <li>resell, sublicense, or provide access to the Services to any third party otherwise than as contemplated by your plan (for example, inviting your own staff); or</li>
            <li>use the AI Command Center or any automated features in a manner intended to circumvent applicable consumer protection, pricing, or food safety laws.</li>
          </ul>
          <p>
            You are responsible for ensuring that your use of the Services (including menu pricing, discounting, and
            marketing communications sent to Guests) complies with applicable laws, including the Australian Consumer Law
            and applicable spam and privacy legislation.
          </p>
        </LegalSection>

        <LegalSection number={6} title="Merchant content and guest data">
          <p>
            As between you and NUA, you retain ownership of all Merchant Content, including your menus, pricing, business
            data, and Guest information. You grant NUA a non-exclusive, worldwide licence to host, store, process, and
            display Merchant Content solely to the extent necessary to provide, maintain and improve the Services (including
            training and improving the features that power forecasts and recommendations, in de-identified or aggregated
            form where reasonably practicable).
          </p>
          <p>
            You are responsible for ensuring you have all necessary rights and consents to provide Guest information to us
            for processing through the Platform, and for responding to any requests from Guests in relation to their
            personal information, consistent with our <a href="/privacy">Privacy Policy</a>.
          </p>
        </LegalSection>

        <LegalSection number={7} title="Intellectual property">
          <p>
            NUA and its licensors own all right, title and interest in and to the Platform, including all software,
            designs, text, graphics, trademarks (including the NUA name and logo) and other intellectual property, excluding
            Merchant Content. Nothing in these Terms grants you any right to use our trademarks, logos, or branding without
            our prior written consent.
          </p>
        </LegalSection>

        <LegalSection number={8} title="Third-party services and integrations">
          <p>
            The Platform integrates with third-party services, including payment processors (such as Stripe, Square, PayPal
            and Apple Pay), delivery platforms (such as Uber Eats, DoorDash and Deliveroo), accounting software (such as
            Xero and QuickBooks), and messaging providers (such as Twilio and Mailchimp). Your use of these integrations may
            be subject to the third party's own terms and privacy policy, and NUA is not responsible for the acts, omissions,
            or availability of any third-party service.
          </p>
        </LegalSection>

        <LegalSection number={9} title="Service availability and support">
          <p>
            We aim to make the Services available on a continuous basis, but we do not guarantee uninterrupted or error-free
            operation. The Services may be unavailable from time to time due to scheduled maintenance, third-party service
            outages (including payment processors or internet service providers), or circumstances beyond our reasonable
            control. Enterprise Merchants may be offered a separate service level agreement, which will take precedence over
            this section to the extent of any inconsistency.
          </p>
        </LegalSection>

        <LegalSection number={10} title="Suspension and termination">
          <p>
            We may suspend or terminate your access to the Services if: (a) you breach these Terms and fail to remedy the
            breach within a reasonable time of being notified; (b) your account is overdue for payment; (c) we reasonably
            believe your use of the Services poses a security, legal, or reputational risk to NUA, other Merchants, or
            Guests; or (d) we cease to offer the Services generally, on reasonable notice.
          </p>
          <p>
            You may cancel your subscription at any time through your account settings or by contacting us; cancellation
            will take effect at the end of your current billing period unless otherwise required by law. On termination, we
            will make reasonable efforts to allow you to export your Merchant Content for a limited period, after which we
            may delete it in accordance with our data retention practices.
          </p>
        </LegalSection>

        <LegalSection number={11} title="Disclaimers">
          <p>
            To the maximum extent permitted by law, the Services are provided "as is" and "as available", without
            warranties of any kind, whether express or implied, including any implied warranties of merchantability, fitness
            for a particular purpose, or non-infringement. Nothing in these Terms excludes, restricts or modifies any
            guarantee, right or remedy that cannot lawfully be excluded, restricted or modified, including under the
            Australian Consumer Law. Where permitted by law, our liability for a breach of a non-excludable guarantee is
            limited, at our option, to re-supplying the Services or paying the cost of having the Services re-supplied.
          </p>
        </LegalSection>

        <LegalSection number={12} title="Limitation of liability">
          <p>
            To the maximum extent permitted by law, NUA's total aggregate liability arising out of or in connection with
            these Terms or the Services, whether in contract, tort (including negligence), or otherwise, will not exceed the
            total fees paid by you to NUA in the twelve (12) months preceding the event giving rise to the liability. NUA
            will not be liable for any indirect, special, incidental, or consequential loss, or loss of profits, revenue,
            goodwill, or data, even if advised of the possibility of such loss.
          </p>
        </LegalSection>

        <LegalSection number={13} title="Indemnity">
          <p>
            You agree to indemnify and hold NUA, its officers, employees and agents harmless from and against any claims,
            losses, liabilities, damages, and expenses (including reasonable legal fees) arising out of or in connection
            with: (a) your breach of these Terms; (b) your Merchant Content or your use of the Services in breach of
            applicable law; or (c) your violation of any rights of a third party, including a Guest.
          </p>
        </LegalSection>

        <LegalSection number={14} title="Confidentiality">
          <p>
            Each party agrees to keep confidential any non-public information disclosed by the other party in connection
            with the Services that is designated as confidential or would reasonably be understood to be confidential, and
            to use it only for the purposes of these Terms, except where disclosure is required by law.
          </p>
        </LegalSection>

        <LegalSection number={15} title="Changes to these terms">
          <p>
            We may update these Terms from time to time to reflect changes to the Services, our business, or applicable law.
            We will post the updated Terms on this page with a revised "Last updated" date and, where changes are material,
            provide reasonable notice (for example, by email or in-app notice). Your continued use of the Services after the
            updated Terms take effect constitutes your acceptance of the updated Terms.
          </p>
        </LegalSection>

        <LegalSection number={16} title="Governing law and dispute resolution">
          <p>
            These Terms are governed by the laws of <span className="font-mono">[Insert State/Territory]</span>, Australia,
            and each party submits to the non-exclusive jurisdiction of the courts of that State or Territory. Before
            commencing formal legal proceedings (other than for urgent injunctive relief), the parties agree to first
            attempt in good faith to resolve any dispute through direct negotiation between senior representatives.
          </p>
        </LegalSection>

        <LegalSection number={17} title="General">
          <p>
            If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions will continue
            in full force and effect. Our failure to enforce any right or provision of these Terms will not be considered a
            waiver of that right or provision. You may not assign or transfer these Terms without our prior written consent;
            we may assign these Terms in connection with a merger, acquisition, or sale of assets. These Terms, together
            with our <a href="/privacy">Privacy Policy</a> and any order or plan confirmation, constitute the entire
            agreement between you and NUA regarding the Services.
          </p>
        </LegalSection>

        <LegalSection number={18} title="Contact us">
          <p>
            If you have any questions about these Terms, please contact us at:
          </p>
          <p>
            NUA AUS PTY LTD<br />
            ABN: <span className="font-mono">54 299 131 653</span><br />
            Email: <a href="mailto:info@nuapos.com.au">info@nuapos.com.au</a><br />
            Address: <span className="font-mono">[Insert registered business address]</span>
          </p>
        </LegalSection>
      </div>
    </PageShell>
  );
}
