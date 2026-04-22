export function toSiliconFlowPayload(plan, request) {
  const messages = [...plan.blocks.staticBlocks, ...plan.blocks.semiStaticBlocks, ...plan.blocks.dynamicBlocks].map((m) => ({
    role: m.role === "developer" ? "system" : m.role,
    content: m.content
  }));

  return {
    model: request.model,
    messages,
    metadata: request.metadata || {},
    provider_options: {
      siliconflow: {
        conservative: true,
        safe_pass_through_only: true
      }
    },
    _cacheRouter: {
      provider: "siliconflow",
      strategy: plan.strategy
    }
  };
}
