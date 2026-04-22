import test from "node:test";
import assert from "node:assert/strict";

import { mapRequestToProviderPayload } from "../src/core/provider-adapter.mjs";

function baseMessages() {
  return [
    { role: "system", content: "policy" },
    { role: "developer", content: "rules" },
    { role: "user", content: "task" },
    { role: "user", content: "extra" }
  ];
}

test("map anthropic payload should include system blocks and valid message roles", () => {
  const { plan, payload } = mapRequestToProviderPayload({
    baseUrl: "https://api.anthropic.com",
    model: "claude-sonnet-4-6",
    messages: [
      ...baseMessages(),
      { role: "tool", content: "tool-output" },
      { role: "assistant", content: "assistant-msg" }
    ]
  });

  assert.equal(plan.provider, "anthropic");
  assert.equal(payload._cacheRouter.provider, "anthropic");
  assert.equal(Array.isArray(payload.system), true);
  assert.equal(payload.system.length, 2);
  assert.equal(payload.system[0].cache_control.type, "ephemeral");
  assert.equal(payload.messages.every((m) => m.role === "user" || m.role === "assistant"), true);
});

test("map openai payload should keep stable-prefix-first hint", () => {
  const { plan, payload } = mapRequestToProviderPayload({
    baseUrl: "https://api.openai.com/v1",
    model: "gpt-4o",
    messages: baseMessages()
  });

  assert.equal(plan.provider, "openai");
  assert.equal(payload._cacheRouter.hint, "stable-prefix-first");
  assert.equal(payload.messages[0].role, "system");
});

test("map vertex payload should use systemInstruction and valid roles", () => {
  const { plan, payload } = mapRequestToProviderPayload({
    baseUrl: "https://us-central1-aiplatform.googleapis.com",
    model: "gemini-2.5-pro",
    messages: [...baseMessages(), { role: "assistant", content: "prior" }]
  });

  assert.equal(plan.provider, "vertex");
  assert.equal(payload.systemInstruction?.parts?.length > 0, true);
  assert.equal(Array.isArray(payload.contents), true);
  assert.equal(payload.contents.length, 3);
  assert.equal(payload.contents.every((m) => m.role === "user" || m.role === "model"), true);
});

test("map ark payload should carry cache_options", () => {
  const { plan, payload } = mapRequestToProviderPayload({
    baseUrl: "https://ark.volces.com/api/v3",
    model: "doubao-pro",
    messages: baseMessages()
  });

  assert.equal(plan.provider, "ark");
  assert.equal(payload.cache_options.mode, "context");
});

test("map kimi payload should keep conservative options", () => {
  const { plan, payload } = mapRequestToProviderPayload({
    baseUrl: "https://api.moonshot.cn/v1",
    model: "kimi-k2",
    messages: baseMessages()
  });

  assert.equal(plan.provider, "kimi");
  assert.equal(payload.provider_options.kimi.conservative, true);
});

test("map siliconflow payload should keep conservative options", () => {
  const { plan, payload } = mapRequestToProviderPayload({
    baseUrl: "https://api.siliconflow.cn/v1",
    model: "Qwen/Qwen3-32B",
    messages: baseMessages()
  });

  assert.equal(plan.provider, "siliconflow");
  assert.equal(payload.provider_options.siliconflow.safe_pass_through_only, true);
});

test("map deepseek payload should keep conservative options", () => {
  const { plan, payload } = mapRequestToProviderPayload({
    baseUrl: "https://api.deepseek.com/v1",
    model: "deepseek-chat",
    messages: baseMessages()
  });

  assert.equal(plan.provider, "deepseek");
  assert.equal(payload.provider_options.deepseek.conservative, true);
});

test("map openrouter payload should keep compatibility flags", () => {
  const { plan, payload } = mapRequestToProviderPayload({
    baseUrl: "https://openrouter.ai/api/v1",
    model: "openai/gpt-4o-mini",
    messages: baseMessages()
  });

  assert.equal(plan.provider, "openrouter");
  assert.equal(payload.provider_options.openrouter.openai_compatible, true);
});

test("map qwen payload should keep conservative options", () => {
  const { plan, payload } = mapRequestToProviderPayload({
    baseUrl: "https://dashscope.aliyuncs.com/compatible-mode/v1",
    model: "qwen-max",
    messages: baseMessages()
  });

  assert.equal(plan.provider, "qwen");
  assert.equal(payload.provider_options.qwen.conservative, true);
});

test("map glm payload should keep conservative options", () => {
  const { plan, payload } = mapRequestToProviderPayload({
    baseUrl: "https://open.bigmodel.cn/api/paas/v4",
    model: "glm-4",
    messages: baseMessages()
  });

  assert.equal(plan.provider, "glm");
  assert.equal(payload.provider_options.glm.safe_pass_through_only, true);
});

test("map unknown provider should fallback to neutral payload", () => {
  const { plan, payload } = mapRequestToProviderPayload({
    baseUrl: "https://unknown.vendor/v1",
    model: "x1",
    messages: baseMessages()
  });

  assert.equal(plan.provider, "neutral");
  assert.equal(payload._cacheRouter.provider, "neutral");
  assert.equal(Array.isArray(payload.messages), true);
  assert.equal(payload.messages.length, 4);
});
