"use client";

import { useState } from "react";
import { Container } from "@/components/layout/Container";
import { HiCheckCircle } from "react-icons/hi2";

const CATALOG_PRICE = 9000;
const GST_RATE = 0.09;

const FUNDING_TIERS = [
  {
    id: "sg-above-40",
    label: "Singaporean ≥ 40 yrs",
    sublabel: "Mid-Career Enhanced Subsidy",
    funding: 70,
  },
  {
    id: "sg-below-40",
    label: "Singaporean < 40 yrs",
    sublabel: "Standard WSQ Funding",
    funding: 50,
  },
  {
    id: "pr",
    label: "Singapore PR",
    sublabel: "Standard WSQ Funding",
    funding: 50,
  },
  {
    id: "sme",
    label: "SME Sponsored (SG/PR)",
    sublabel: "Enhanced Training Support",
    funding: 70,
  },
  {
    id: "non-sg",
    label: "Non-Singaporean",
    sublabel: "Full Fee (No Subsidy)",
    funding: 0,
  },
];

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-SG", {
    style: "currency",
    currency: "SGD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function FundingCalculator() {
  const [selectedTier, setSelectedTier] = useState("sg-above-40");

  const tier = FUNDING_TIERS.find((t) => t.id === selectedTier)!;
  const subsidyAmount = CATALOG_PRICE * (tier.funding / 100);
  const netFee = CATALOG_PRICE - subsidyAmount;
  const netFeeGst = netFee * (1 + GST_RATE);

  return (
    <section id="funding" className="relative py-20 overflow-hidden">
      <div
        className="glow-blob"
        style={{
          top: "10%",
          left: "50%",
          width: 500,
          height: 500,
          background: "radial-gradient(circle, #5C00E5 0%, transparent 60%)",
          opacity: 0.1,
        }}
      />

      <Container className="relative">
        <div className="text-center mb-12">
          <div className="kicker mb-4">[ COURSE FEES & FUNDING ]</div>
          <h2 className="font-display text-[clamp(2rem,4.5vw,3.25rem)] font-extrabold leading-[1.05]">
            WSQ Funding <span className="gradient-text">Calculator</span>
          </h2>
          <p className="mt-4 text-(--color-muted) text-lg max-w-2xl mx-auto">
            All four modules are eligible for WSQ funding of up to 70%. Remaining fees can be claimed
            using SkillsFuture Credit.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-8 max-w-5xl mx-auto">
          {/* Tier selector */}
          <div className="space-y-3">
            <div className="text-sm font-mono uppercase tracking-wider text-(--color-muted) mb-4">
              Select your residency status
            </div>
            {FUNDING_TIERS.map((t) => (
              <button
                key={t.id}
                onClick={() => setSelectedTier(t.id)}
                className={`funding-option ${t.id === selectedTier ? "funding-active" : ""}`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-display font-bold text-white text-sm">{t.label}</div>
                    <div className="text-xs text-(--color-muted) mt-0.5">{t.sublabel}</div>
                  </div>
                  <span className={`font-mono font-bold text-sm ${t.funding > 0 ? "text-(--color-green)" : "text-(--color-muted)"}`}>
                    {t.funding > 0 ? `${t.funding}%` : "—"}
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* Price breakdown */}
          <div className="pricing-card p-8">
            <div className="text-center mb-8">
              <div className="text-sm font-mono uppercase tracking-wider text-(--color-muted) mb-3">
                Your Net Course Fee
              </div>
              <div className="font-display font-extrabold text-5xl md:text-6xl text-white mb-1">
                {formatCurrency(netFee)}
              </div>
              <div className="text-sm text-(--color-muted)">
                {formatCurrency(netFeeGst)} (GST-inclusive)
              </div>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-center justify-between py-3 border-b border-white/8">
                <span className="text-sm text-(--color-muted)">Full Course Fee</span>
                <span className="text-white font-medium font-mono">{formatCurrency(CATALOG_PRICE)}</span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-white/8">
                <span className="text-sm text-(--color-muted)">WSQ Subsidy ({tier.funding}%)</span>
                <span className="text-(--color-green) font-medium font-mono">
                  {subsidyAmount > 0 ? `−${formatCurrency(subsidyAmount)}` : "—"}
                </span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-white/8">
                <span className="text-sm text-(--color-muted)">Net Fee (before GST)</span>
                <span className="text-white font-bold font-mono">{formatCurrency(netFee)}</span>
              </div>
              <div className="flex items-center justify-between py-3">
                <span className="text-sm text-(--color-muted)">Net Fee (after 9% GST)</span>
                <span className="text-white font-medium font-mono">{formatCurrency(netFeeGst)}</span>
              </div>
            </div>

            <div className="space-y-2.5">
              {[
                "SkillsFuture Credit claimable for remaining fees",
                "SFEC eligible for Singapore-registered companies",
                "UTAP subsidy for NTUC members (up to $250/yr)",
                "No upfront payment required to register interest",
                "100% refund if course is cancelled",
              ].map((note) => (
                <div key={note} className="flex items-start gap-2.5 text-sm">
                  <HiCheckCircle className="w-4 h-4 text-(--color-cyan) shrink-0 mt-0.5" />
                  <span className="text-white/75">{note}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
