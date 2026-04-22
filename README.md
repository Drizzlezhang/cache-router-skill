# @drizzlezhang/cache-router-skill

[![中文](https://img.shields.io/badge/中文-README-blue)](README.zh-CN.md)

Provider-aware cache router CLI for multi-channel LLM API optimization.

## Installation

This package is published to GitHub Packages. To install it globally:

### 1. Configure npm for GitHub Packages

Create or edit `~/.npmrc` with your GitHub token:

```ini
@drizzlezhang:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=YOUR_GITHUB_TOKEN
```

> **Note**: Your GitHub token needs at least `read:packages` scope. To publish, you need `write:packages`.

### 2. Install globally

```bash
npm i -g @drizzlezhang/cache-router-skill
```

### 3. Verify installation

```bash
cache-router-skill --help
```

## Usage

```bash
cache-router-skill [options]
```

### Options

- `--help`, `-h` - Show help message

## Supported Providers

This tool supports the following LLM API providers:

| Provider | Caching Strategy | Status |
|----------|------------------|--------|
| **Anthropic** | Explicit block cache (cache_control) | ✅ High confidence |
| **OpenAI** | Auto prefix cache | ✅ High confidence |
| **Google Vertex AI** | Context resource cache | ✅ High confidence |
| **Volcengine Ark** | Prefix / Context cache | ✅ High confidence |
| **Kimi (Moonshot)** | Conservative (safe pass-through) | ⚠️ Low confidence |
| **SiliconFlow** | Conservative (safe pass-through) | ⚠️ Low confidence |
| **DeepSeek** | Conservative (safe pass-through) | ⚠️ Low confidence |
| **OpenRouter** | Conservative (OpenAI compatible) | ⚠️ Low confidence |
| **Qwen (Aliyun)** | Conservative (safe pass-through) | ⚠️ Low confidence |
| **GLM (Zhipu)** | Conservative (safe pass-through) | ⚠️ Low confidence |

### Channel Detection

The tool automatically detects the provider based on:
- `baseUrl` patterns (e.g., `api.anthropic.com`, `api.openai.com`)
- `model` name prefixes (e.g., `kimi-`, `qwen-`, `glm-`)
- Explicit `provider` configuration

Unknown providers fall back to **neutral mode** (safe pass-through only).

## Configuration File

Copy the example configuration:

```bash
cp node_modules/@drizzlezhang/cache-router-skill/.npmrc.example ~/.npmrc
```

Then replace `YOUR_GITHUB_TOKEN` with your actual GitHub personal access token.

## Development

### Prerequisites

- Node.js >= 18.18.0
- npm

### Setup

```bash
git clone https://github.com/Drizzlezhang/cache-router-skill.git
cd cache-router-skill
npm install
```

### Build

```bash
npm run build
```

### Test

```bash
npm test
```

### Local execution

```bash
npm start
```

## Publishing

To publish a new version to GitHub Packages:

1. Update version in `package.json`
2. Ensure you have `write:packages` scope in your GitHub token
3. Run:

```bash
npm publish
```

## Changelog

### v0.1.1
- Bump version for GitHub Packages distribution
- Verified publish workflow

### v0.1.0
- Initial CLI scaffold
- GitHub Packages publish configuration
- Basic TypeScript setup with tests

## Repository

https://github.com/Drizzlezhang/cache-router-skill

## License

ISC
