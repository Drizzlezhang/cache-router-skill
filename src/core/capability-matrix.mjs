export const PROVIDERS = {
  anthropic: "anthropic",
  openai: "openai",
  vertex: "vertex",
  kimi: "kimi",
  ark: "ark",
  siliconflow: "siliconflow",
  deepseek: "deepseek",
  openrouter: "openrouter",
  qwen: "qwen",
  glm: "glm",
  neutral: "neutral"
};

const HIGH = "high";
const LOW = "low";

export const capabilityMatrix = {
  [PROVIDERS.anthropic]: {
    confidence: HIGH,
    capabilities: { autoPrefix: false, explicitBlock: true, contextResource: false, ttlControl: true }
  },
  [PROVIDERS.openai]: {
    confidence: HIGH,
    capabilities: { autoPrefix: true, explicitBlock: false, contextResource: false, ttlControl: false }
  },
  [PROVIDERS.vertex]: {
    confidence: HIGH,
    capabilities: { autoPrefix: false, explicitBlock: false, contextResource: true, ttlControl: true }
  },
  [PROVIDERS.kimi]: {
    confidence: LOW,
    capabilities: { autoPrefix: false, explicitBlock: false, contextResource: false, ttlControl: false }
  },
  [PROVIDERS.ark]: {
    confidence: HIGH,
    capabilities: { autoPrefix: true, explicitBlock: false, contextResource: true, ttlControl: true }
  },
  [PROVIDERS.siliconflow]: {
    confidence: LOW,
    capabilities: { autoPrefix: false, explicitBlock: false, contextResource: false, ttlControl: false }
  },
  [PROVIDERS.deepseek]: {
    confidence: LOW,
    capabilities: { autoPrefix: false, explicitBlock: false, contextResource: false, ttlControl: false }
  },
  [PROVIDERS.openrouter]: {
    confidence: LOW,
    capabilities: { autoPrefix: false, explicitBlock: false, contextResource: false, ttlControl: false }
  },
  [PROVIDERS.qwen]: {
    confidence: LOW,
    capabilities: { autoPrefix: false, explicitBlock: false, contextResource: false, ttlControl: false }
  },
  [PROVIDERS.glm]: {
    confidence: LOW,
    capabilities: { autoPrefix: false, explicitBlock: false, contextResource: false, ttlControl: false }
  },
  [PROVIDERS.neutral]: {
    confidence: LOW,
    capabilities: { autoPrefix: false, explicitBlock: false, contextResource: false, ttlControl: false }
  }
};

export function getProviderCapabilities(provider) {
  return capabilityMatrix[provider] ?? capabilityMatrix[PROVIDERS.neutral];
}
