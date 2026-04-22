import test from "node:test";
import assert from "node:assert/strict";

import { detectChannel } from "../src/core/channel-detector.mjs";
import { planCache } from "../src/core/cache-planner.mjs";
import { normalizeRequest, splitCacheBlocks } from "../src/core/request-normalizer.mjs";

test("detectChannel by explicit provider", () => {
  assert.equal(detectChannel({ provider: "openai" }), "openai");
});

test("detectChannel by baseUrl/model", () => {
  assert.equal(detectChannel({ baseUrl: "https://api.deepseek.com/v1" }), "deepseek");
  assert.equal(detectChannel({ model: "qwen-max" }), "qwen");
  assert.equal(detectChannel({ model: "glm-4" }), "glm");
});

test("detectChannel fallback neutral", () => {
  assert.equal(detectChannel({ baseUrl: "https://unknown.vendor/v1", model: "x1" }), "neutral");
});

test("planCache neutral fallback", () => {
  const out = planCache({
    baseUrl: "https://unknown.vendor/v1",
    model: "x1",
    messages: [{ role: "system", content: "policy" }, { role: "user", content: "hi" }]
  });

  assert.equal(out.mode, "neutral");
  assert.equal(out.optimize.injectProviderPrivateFields, false);
  assert.equal(out.optimize.safePassThroughOnly, true);
  assert.equal(out.prefix.length, 2);
});

test("planCache provider specific", () => {
  const out = planCache({
    baseUrl: "https://api.anthropic.com",
    model: "claude-sonnet-4-6",
    messages: [{ role: "system", content: "policy" }, { role: "user", content: "task" }]
  });

  assert.equal(out.provider, "anthropic");
  assert.equal(out.mode, "provider-specific");
  assert.equal(out.optimize.stablePrefix, true);
  assert.equal(out.strategy, "explicit-block-cache");
});

test("normalizeRequest should normalize role/content/tools", () => {
  const out = normalizeRequest({
    model: "x",
    messages: [{ role: "SYSTEM", content: "  keep  " }, { role: "unknown", content: { a: 1, b: 2 } }],
    tools: [{ z: 1, a: 2 }],
    metadata: { z: 1, a: 2 }
  });

  assert.equal(out.messages[0].role, "system");
  assert.equal(out.messages[0].content, "keep");
  assert.equal(out.messages[1].role, "user");
  assert.equal(typeof out.messages[1].content, "string");
  assert.deepEqual(Object.keys(out.tools[0]), ["a", "z"]);
  assert.deepEqual(Object.keys(out.metadata), ["a", "z"]);
});

test("splitCacheBlocks should split static/semi-static/dynamic", () => {
  const normalized = normalizeRequest({
    messages: [
      { role: "system", content: "s" },
      { role: "developer", content: "d" },
      { role: "user", content: "u1" },
      { role: "user", content: "u2" },
      { role: "assistant", content: "a1" }
    ]
  });

  const blocks = splitCacheBlocks(normalized);
  assert.equal(blocks.staticBlocks.length, 2);
  assert.equal(blocks.semiStaticBlocks.length, 1);
  assert.equal(blocks.dynamicBlocks.length, 2);
});
