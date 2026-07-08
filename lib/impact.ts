import type { ImpactCard } from "./types";

/**
 * Impact — metrics-as-arrows. Every number is Prateek-vetted and scrubbed of
 * client/employer names (generic descriptors only). The number is the brag.
 */
export const impactCards: ImpactCard[] = [
  {
    id: "aml-false-positives",
    headline: "63% fewer false positives",
    context:
      "Migrated a global bank's AML/sanctions screening off a legacy engine — a phased, zero-breach cutover.",
  },
  {
    id: "ach-migration",
    headline: "1M+ ACH transactions migrated, zero incidents",
    context:
      "Ran a tokenization cutover in a live payments environment, protecting the firm's largest revenue stream.",
  },
  {
    id: "ai-operating-model",
    headline: "2 weeks → same-day",
    context:
      "Rebuilt an operations function as an AI-first operating model — documentation, UAT prep and QA cycles collapsed from weeks to hours, with human and compliance review intact.",
  },
  {
    id: "kyc-refresh",
    headline: "~4 hours → under 30 minutes a day",
    context:
      "Stood up an LLM-driven KYC/KYB refresh across 700+ merchants with agentic triage and human-in-the-loop review — audit-ready under FINTRAC.",
  },
  {
    id: "payments-go-live",
    headline: "~$6M go-live, forecast >$20M",
    context:
      "Shipped a real-time payments and loan-disbursement integration for a fintech scale-up through a controlled, UAT-gated change process — defect-free at launch.",
  },
  {
    id: "subsidiary",
    headline: "50+ people, 3 continents, $6M+ won",
    context:
      "Built and scaled an enterprise-services subsidiary from scratch — 100% on-time across US, UAE and India teams.",
  },
  {
    id: "telehealth",
    headline: "Patient wait times −75%, 100K+ served",
    context:
      "Delivered a multilingual telehealth platform under pandemic urgency — zero P0 defects, HIPAA-equivalent compliance.",
  },
  {
    id: "cpq",
    headline: "Quote accuracy +37%, deal cycles −41%",
    context:
      "Overhauled a Salesforce CPQ and ERP pricing architecture across an enterprise sales org, clearing audits with zero non-conformities.",
  },
];
