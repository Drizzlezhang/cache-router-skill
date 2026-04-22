function toVertexRole(role) {
  if (role === "assistant") return "model";
  return "user";
}

export function toVertexPayload(plan, request) {
  const staticText = plan.blocks.staticBlocks.map((m) => m.content).join("\n\n");

  const contents = [...plan.blocks.semiStaticBlocks, ...plan.blocks.dynamicBlocks].map((m) => ({
    role: toVertexRole(m.role),
    parts: [{ text: m.content }]
  }));

  return {
    model: request.model,
    systemInstruction: staticText ? { parts: [{ text: staticText }] } : undefined,
    contents,
    metadata: request.metadata || {},
    _cacheRouter: {
      provider: "vertex",
      strategy: plan.strategy
    }
  };
}
