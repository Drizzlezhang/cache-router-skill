import { planCache } from "./cache-planner.mjs";
import { toAnthropicPayload } from "../providers/anthropic/adapter.mjs";
import { toOpenAIPayload } from "../providers/openai/adapter.mjs";
import { toVertexPayload } from "../providers/vertex/adapter.mjs";
import { toArkPayload } from "../providers/ark/adapter.mjs";
import { toKimiPayload } from "../providers/kimi/adapter.mjs";
import { toSiliconFlowPayload } from "../providers/siliconflow/adapter.mjs";
import { toDeepSeekPayload } from "../providers/deepseek/adapter.mjs";
import { toOpenRouterPayload } from "../providers/openrouter/adapter.mjs";
import { toQwenPayload } from "../providers/qwen/adapter.mjs";
import { toGlmPayload } from "../providers/glm/adapter.mjs";

function toNeutralPayload(plan, request) {
  return {
    model: request.model,
    messages: [...plan.blocks.staticBlocks, ...plan.blocks.semiStaticBlocks, ...plan.blocks.dynamicBlocks],
    metadata: request.metadata || {},
    _cacheRouter: {
      provider: "neutral",
      strategy: plan.strategy
    }
  };
}

export function mapRequestToProviderPayload(request = {}) {
  const plan = planCache(request);

  switch (plan.provider) {
    case "anthropic":
      return { plan, payload: toAnthropicPayload(plan, request) };
    case "openai":
      return { plan, payload: toOpenAIPayload(plan, request) };
    case "vertex":
      return { plan, payload: toVertexPayload(plan, request) };
    case "ark":
      return { plan, payload: toArkPayload(plan, request) };
    case "kimi":
      return { plan, payload: toKimiPayload(plan, request) };
    case "siliconflow":
      return { plan, payload: toSiliconFlowPayload(plan, request) };
    case "deepseek":
      return { plan, payload: toDeepSeekPayload(plan, request) };
    case "openrouter":
      return { plan, payload: toOpenRouterPayload(plan, request) };
    case "qwen":
      return { plan, payload: toQwenPayload(plan, request) };
    case "glm":
      return { plan, payload: toGlmPayload(plan, request) };
    default:
      return { plan, payload: toNeutralPayload(plan, request) };
  }
}
