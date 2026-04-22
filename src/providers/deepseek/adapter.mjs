export function toDeepSeekPayload(plan, request) {
  const messages = [...plan.blocks.staticBlocks, ...plan.blocks.semiStaticBlocks, ...plan.blocks.dynamicBlocks].map((m) => ({
    role: m.role === "developer" ? "system" : m.role,
    content: m.content
  }));

  return {
    model: request.model,
    messages,
    metadata: request.metadata || {},
    provider_options: {
      deepseek: {
        conservative: true,
        safe_pass_through_only: true
      }
    },
    _cacheRouter: {
      provider: "deepseek",
      strategy: plan.strategy
    }
  };
}
