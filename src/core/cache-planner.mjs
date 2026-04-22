import { getProviderCapabilities, PROVIDERS } from "./capability-matrix.mjs";
import { detectChannel } from "./channel-detector.mjs";
import { normalizeRequest, splitCacheBlocks } from "./request-normalizer.mjs";

function buildExecutionPlan({ provider, profile, blocks }) {
  const optimize = {
    stablePrefix: true,
    injectProviderPrivateFields: provider !== PROVIDERS.neutral && profile.confidence === "high",
    safePassThroughOnly: provider === PROVIDERS.neutral || profile.confidence !== "high"
  };

  const strategy = provider === PROVIDERS.neutral
    ? "neutral-safe"
    : profile.capabilities.explicitBlock
      ? "explicit-block-cache"
      : profile.capabilities.contextResource
        ? "context-resource-cache"
        : profile.capabilities.autoPrefix
          ? "auto-prefix-cache"
          : "conservative";

  return {
    provider,
    mode: provider === PROVIDERS.neutral ? "neutral" : "provider-specific",
    strategy,
    optimize,
    profile,
    blocks,
    prefix: [...blocks.staticBlocks, ...blocks.semiStaticBlocks]
  };
}

export function planCache(request = {}) {
  const normalized = normalizeRequest(request);
  const provider = detectChannel({
    baseUrl: normalized.baseUrl,
    model: normalized.model,
    provider: normalized.provider
  });

  const profile = getProviderCapabilities(provider);
  const blocks = splitCacheBlocks(normalized);

  return buildExecutionPlan({ provider, profile, blocks });
}
