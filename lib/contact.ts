/**
 * Contact + social config, and the AI stack Prateek orchestrates.
 * linkedin is a best-guess vanity URL — confirm/adjust before launch.
 */

export const contact = {
  bookUrl: "https://cal.com/prateek-jha",
  email: "masters.prateek@gmail.com",
  github: "https://github.com/schuligan",
  linkedin: "https://www.linkedin.com/in/prateek-jha", // TODO confirm vanity URL
  resumePath: "/resumes/Prateek_Jha_CV.pdf", // Prateek adds the vetted PDF before launch
};

/** Models + tools orchestrated — positions AI fluency, not programming stacks. */
export const aiStack: { label: string; detail: string }[] = [
  { label: "Claude", detail: "Opus · Sonnet · Haiku" },
  { label: "GPT", detail: "OpenAI models + Codex" },
  { label: "Local models", detail: "Llama · Ollama · LM Studio" },
  { label: "MCP", detail: "tool + data connectors" },
  { label: "Agentic loops", detail: "orchestration, gates, verification" },
  { label: "Cursor & CLI", detail: "AI-native build harnesses" },
];
