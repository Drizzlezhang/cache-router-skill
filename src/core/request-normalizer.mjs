function normalizeRole(role) {
  const v = (role || "").toLowerCase();
  if (v === "assistant" || v === "system" || v === "developer" || v === "user" || v === "tool") return v;
  return "user";
}

function normalizeContent(content) {
  if (typeof content === "string") return content.trim();
  if (content == null) return "";
  return JSON.stringify(content);
}

function stableSortObjectKeys(obj) {
  if (Array.isArray(obj)) return obj.map(stableSortObjectKeys);
  if (obj && typeof obj === "object") {
    return Object.keys(obj)
      .sort()
      .reduce((acc, k) => {
        acc[k] = stableSortObjectKeys(obj[k]);
        return acc;
      }, {});
  }
  return obj;
}

export function normalizeRequest(request = {}) {
  const messages = Array.isArray(request.messages) ? request.messages : [];
  const normalizedMessages = messages.map((m) => ({
    role: normalizeRole(m?.role),
    content: normalizeContent(m?.content)
  }));

  const tools = Array.isArray(request.tools) ? stableSortObjectKeys(request.tools) : [];

  return {
    provider: request.provider || "",
    baseUrl: request.baseUrl || "",
    model: request.model || "",
    messages: normalizedMessages,
    tools,
    metadata: stableSortObjectKeys(request.metadata || {})
  };
}

export function splitCacheBlocks(normalized = {}) {
  const messages = normalized.messages || [];

  const staticBlocks = messages.filter((m) => m.role === "system" || m.role === "developer");
  const userMessages = messages.filter((m) => m.role === "user");

  const semiStaticBlocks = userMessages.slice(0, 1);
  const dynamicBlocks = userMessages.slice(1).concat(messages.filter((m) => m.role === "assistant" || m.role === "tool"));

  return {
    staticBlocks,
    semiStaticBlocks,
    dynamicBlocks
  };
}
