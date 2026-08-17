import React from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Clock, ArrowLeft } from "lucide-react";
import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";
import SEO from "@/components/SEO";
import { useModals } from "@/components/ModalProvider";
import { LEAD_CAPTURE_ENABLED, TRIAL_DAYS, SUPPORT_EMAIL } from "@/config/siteConfig";
import posts from "@/data/blogData";

function ContentBlock({ block }) {
  switch (block.type) {
    case "h2":
      return (
        <h2 className="mt-12 font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
          {block.text}
        </h2>
      );
    case "h3":
      return (
        <h3 className="mt-8 font-display text-lg font-semibold text-white">
          {block.text}
        </h3>
      );
    case "ul":
      return (
        <ul className="mt-4 space-y-2.5">
          {block.items.map((item) => (
            <li key={item} className="flex items-start gap-2.5 text-[15px] text-[#d4d4d8] leading-relaxed">
              <span className="mt-2.5 w-1.5 h-1.5 rounded-full flex-shrink-0 bg-[#8b5cf6]" />
              {item}
            </li>
          ))}
        </ul>
      );
    case "stat":
      return (
        <div className="my-8 rounded-2xl bg-[#15151d] border border-white/5 p-6 sm:p-8 flex flex-col items-center text-center">
          <div className="font-display text-4xl sm:text-5xl font-bold text-white">{block.value}</div>
          <div className="mt-1 font-mono text-[11px] uppercase tracking-wider text-[#a1a1aa] max-w-[280px]">
            {block.label}
          </div>
        </div>
      );
    case "callout":
      return (
        <div className="my-8 rounded-2xl border border-[#8b5cf6]/30 bg-[#8b5cf6]/[0.08] p-5 sm:p-6">
          <div className="font-mono text-[10px] uppercase tracking-widest text-[#c4b5fd]">{block.title}</div>
          <p className="mt-2 text-[15px] text-[#eaeaea] leading-relaxed">{block.text}</p>
        </div>
      );
    case "p":
    default:
      return <p className="mt-4 text-[15px] text-[#d4d4d8] leading-relaxed">{block.text}</p>;
  }
}

export default function BlogPost() {
  const { slug } = useParams();
  const { openLead } = useModals();
  const post = posts.find((post) => post.slug === slug);

  if (!post) return <Navigate to="/blog" replace />;

  const related = posts.filter((p) => post.relatedSlugs.includes(p.slug));
  const canonical = `https://nuapos.com.au/blog/${post.slug}`;

  const jsonLd = post.faqs?.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: post.faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      }
    : undefined;

  return (
    <PageShell testId="blog-post-page">
      <SEO title={`${post.title}: NUA`} description={post.metaDescription} canonical={canonical} jsonLd={jsonLd} />
      <PageHero
        eyebrow={`Blog · ${post.pillar}`}
        title={post.title}
        subtitle={post.excerpt}
        accent="#8b5cf6"
        crumb={post.title}
      />

      <div className="relative max-w-3xl mx-auto px-6 lg:px-10 pb-24 lg:pb-32">
        <div className="flex items-center gap-4 font-mono text-[11px] text-[#71717a]">
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            {post.readTime}
          </span>
          <span>·</span>
          <span>{post.publishDate}</span>
        </div>

        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          data-testid="blog-post-content"
        >
          {post.content.map((block, i) => (
            <ContentBlock key={i} block={block} />
          ))}
        </motion.article>

        {post.faqs?.length > 0 && (
          <div className="mt-16">
            <h2 className="font-display text-2xl font-bold text-white tracking-tight">Frequently asked</h2>
            <div className="mt-6 space-y-4">
              {post.faqs.map((f) => (
                <div key={f.q} className="rounded-2xl bg-[#15151d] border border-white/5 p-5 sm:p-6">
                  <div className="font-display font-semibold text-white text-sm">{f.q}</div>
                  <p className="mt-2 text-[14px] text-[#a1a1aa] leading-relaxed">{f.a}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="mt-16 flex flex-col sm:flex-row items-center justify-between gap-6 rounded-2xl border border-white/5 bg-white/[0.02] p-6 sm:p-8">
          <div>
            <div className="font-display text-lg font-semibold text-white">See NUA running a venue like yours.</div>
            <div className="text-sm text-[#a1a1aa] mt-1">
              {LEAD_CAPTURE_ENABLED ? `${TRIAL_DAYS}-day free trial · no card required` : "Email us and we'll walk you through it."}
            </div>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            {LEAD_CAPTURE_ENABLED ? (
              <button
                type="button"
                onClick={() => openLead({ type: "demo" })}
                data-testid="blog-post-book-demo-btn"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#f58c14] hover:bg-[#d87b10] text-white text-sm font-medium transition-all duration-200"
              >
                Book a Demo
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <a
                href={`mailto:${SUPPORT_EMAIL}`}
                data-testid="blog-post-email-support"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#f58c14] hover:bg-[#d87b10] text-white text-sm font-medium transition-all duration-200"
              >
                {SUPPORT_EMAIL}
              </a>
            )}
            <Link
              to="/blog"
              data-testid="blog-post-back-link"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-white/10 text-white text-sm font-medium hover:bg-white/5 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              All articles
            </Link>
          </div>
        </div>

        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="font-display text-2xl font-bold text-white tracking-tight">Related reading</h2>
            <div className="mt-6 grid sm:grid-cols-2 gap-4">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  to={`/blog/${r.slug}`}
                  data-testid={`blog-post-related-${r.slug}`}
                  className="rounded-2xl bg-[#15151d] border border-white/5 p-5 hover:-translate-y-1 hover:border-white/10 transition-all duration-300"
                >
                  <span className="px-2 py-0.5 rounded-full bg-[#8b5cf6]/15 text-[#c4b5fd] font-mono text-[10px] uppercase tracking-wider">
                    {r.pillar}
                  </span>
                  <h3 className="mt-3 font-display font-semibold text-white text-sm leading-snug">{r.title}</h3>
                  <p className="mt-2 text-[13px] text-[#a1a1aa] leading-relaxed line-clamp-2">{r.excerpt}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </PageShell>
  );
}
