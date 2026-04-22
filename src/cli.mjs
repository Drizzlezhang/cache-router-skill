#!/usr/bin/env node

import { mapRequestToProviderPayload } from "./core/provider-adapter.mjs";

const args = process.argv.slice(2);

if (args.includes("--help") || args.includes("-h")) {
  console.log("cache-router-skill CLI");
  console.log("Usage: cache-router-skill [--help] [--version]");
  console.log("");
  console.log("Options:");
  console.log("  --help, -h     Show help message");
  console.log("  --version, -v  Show version");
  console.log("  --plan         Show execution plan for a sample request");
  console.log("");
  console.log("Examples:");
  console.log('  cache-router-skill --plan --provider anthropic --model claude-3');
  process.exit(0);
}

if (args.includes("--version") || args.includes("-v")) {
  console.log("0.1.1");
  process.exit(0);
}

if (args.includes("--plan")) {
  const providerIdx = args.indexOf("--provider");
  const provider = providerIdx >= 0 ? args[providerIdx + 1] : "openai";

  const modelIdx = args.indexOf("--model");
  const model = modelIdx >= 0 ? args[modelIdx + 1] : "gpt-4o";

  const baseUrls = {
    anthropic: "https://api.anthropic.com",
    openai: "https://api.openai.com/v1",
    vertex: "https://us-central1-aiplatform.googleapis.com",
    ark: "https://ark.volces.com/api/v3",
    kimi: "https://api.moonshot.cn/v1",
    siliconflow: "https://api.siliconflow.cn/v1",
    deepseek: "https://api.deepseek.com/v1",
    openrouter: "https://openrouter.ai/api/v1",
    qwen: "https://dashscope.aliyuncs.com/compatible-mode/v1",
    glm: "https://open.bigmodel.cn/api/paas/v4"
  };

  const request = {
    baseUrl: baseUrls[provider] || "https://unknown.vendor/v1",
    model: model,
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      { role: "user", content: "Hello!" }
    ]
  };

  const result = mapRequestToProviderPayload(request);

  console.log("Execution Plan:");
  console.log("===============");
  console.log(`Provider: ${result.plan.provider}`);
  console.log(`Mode: ${result.plan.mode}`);
  console.log(`Strategy: ${result.plan.strategy}`);
  console.log("");
  console.log("Payload Preview:");
  console.log(JSON.stringify(result.payload, null, 2));

  process.exit(0);
}

console.log("cache-router-skill initialized");
console.log("Use --help for usage information");
