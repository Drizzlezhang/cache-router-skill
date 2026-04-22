export function toArkPayload(plan, request) {
  const messages = [
    ...plan.blocks.staticBlocks,
    ...plan.blocks.semiStaticBlocks,
    ...plan.blocks.dynamicBlocks
  ].map((m) => ({ role: m.role === "developer" ? "system" : m.role, content: m.content }));

  return {
    model: request.model,
    messages,
    cache_options: {
      mode: plan.strategy === "context-resource-cache" ? "context" : "prefix"
    },
    metadata: request.metadata || {},
    _cacheRouter: {
      provider: "ark",
      strategy: plan.strategy
    }
  };
}
