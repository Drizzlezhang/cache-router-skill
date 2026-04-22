function toAnthropicRole(role) {
  if (role === "assistant") return "assistant";
  return "user";
}

export function toAnthropicPayload(plan, request) {
  const messageBlocks = [
    ...plan.blocks.semiStaticBlocks,
    ...plan.blocks.dynamicBlocks
  ];

  const messages = messageBlocks.map((m) => ({
    role: toAnthropicRole(m.role),
    content: m.content
  }));

  const systemBlocks = plan.blocks.staticBlocks.map((m) => ({
    type: "text",
    text: m.content,
    cache_control: plan.strategy === "explicit-block-cache" ? { type: "ephemeral" } : undefined
  }));

  return {
    model: request.model,
    system: systemBlocks,
    messages,
    metadata: request.metadata || {},
    _cacheRouter: {
      provider: "anthropic",
      strategy: plan.strategy
    }
  };
}
