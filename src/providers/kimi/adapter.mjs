export function toKimiPayload(plan, request) {
  const messages = [...plan.blocks.staticBlocks, ...plan.blocks.semiStaticBlocks, ...plan.blocks.dynamicBlocks].map((m) => ({
    role: m.role === "developer" ? "system" : m.role,
    content: m.content
  }));

  return {
    model: request.model,
    messages,
    metadata: request.metadata || {},
    provider_options: {
      kimi: {
        conservative: true,
        safe_pass_through_only: true
      }
    },
    _cacheRouter: {
      provider: "kimi",
      strategy: plan.strategy
    }
  };
}
