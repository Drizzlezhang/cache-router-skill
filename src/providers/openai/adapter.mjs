export function toOpenAIPayload(plan, request) {
  const messages = [
    ...plan.blocks.staticBlocks,
    ...plan.blocks.semiStaticBlocks,
    ...plan.blocks.dynamicBlocks
  ].map((m) => ({ role: m.role === "developer" ? "system" : m.role, content: m.content }));

  return {
    model: request.model,
    messages,
    metadata: request.metadata || {},
    _cacheRouter: {
      provider: "openai",
      strategy: plan.strategy,
      hint: "stable-prefix-first"
    }
  };
}
