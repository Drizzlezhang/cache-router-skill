# Setup cache-router-skill

This command helps you set up cache-router-skill on your machine.

## Quick Setup

Run this command to install cache-router-skill globally and configure it:

```bash
npm i -g @drizzlezhang/cache-router-skill
```

## Verification

After installation, verify it works:

```bash
cache-router-skill --help
```

## What This Tool Does

cache-router-skill is a CLI tool that optimizes LLM API requests for caching across multiple providers:

- **Anthropic** - Explicit block caching with cache_control
- **OpenAI** - Automatic prefix caching
- **Google Vertex AI** - Context resource caching
- **Volcengine Ark** - Prefix/context caching
- **Kimi, SiliconFlow, DeepSeek, OpenRouter, Qwen, GLM** - Conservative safe pass-through

## Next Steps

1. Configure npm for GitHub Packages (see README.md)
2. Run `cache-router-skill --plan` to see an example execution plan
3. Integrate with your project (see Project Installation in README.md)
