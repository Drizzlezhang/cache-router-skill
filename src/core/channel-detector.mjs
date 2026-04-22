import { PROVIDERS } from "./capability-matrix.mjs";

function norm(v) {
  return (v || "").toLowerCase();
}

export function detectChannel({ baseUrl = "", model = "", provider = "" } = {}) {
  const explicit = norm(provider);
  if (explicit && PROVIDERS[explicit]) return PROVIDERS[explicit];

  const url = norm(baseUrl);
  const modelName = norm(model);

  if (url.includes("anthropic")) return PROVIDERS.anthropic;
  if (url.includes("openai")) return PROVIDERS.openai;
  if (url.includes("googleapis") || url.includes("vertexai")) return PROVIDERS.vertex;
  if (url.includes("moonshot") || modelName.startsWith("kimi")) return PROVIDERS.kimi;
  if (url.includes("volces") || url.includes("ark")) return PROVIDERS.ark;
  if (url.includes("siliconflow")) return PROVIDERS.siliconflow;
  if (url.includes("deepseek") || modelName.startsWith("deepseek")) return PROVIDERS.deepseek;
  if (url.includes("openrouter")) return PROVIDERS.openrouter;
  if (url.includes("dashscope") || modelName.startsWith("qwen")) return PROVIDERS.qwen;
  if (url.includes("bigmodel") || modelName.startsWith("glm")) return PROVIDERS.glm;

  return PROVIDERS.neutral;
}
