export function toOpenRouterPayload(plan, request) {
  const messages = [...plan.blocks.staticBlocks, ...plan.blocks.semiStaticBlocks, ...plan.blocks.dynamicBlocks].map((m) => ({
    role: m.role === "developer" ? "system" : m.role,
    content: m.content
  }));

  return {
    model: request.model,
    messages,
    metadata: request.metadata || {},
    provider_options: {
      openrouter: {
        conservative: true,
        safe_pass_through_only: true,
        openai_compatible: true
      }
    },
    _cacheRouter: {
      provider: "openrouter",
      strategy: plan.strategy
    }
  };
}
