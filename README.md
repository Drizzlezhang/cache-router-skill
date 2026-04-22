# @drizzlezhang/cache-router-skill

[![中文](https://img.shields.io/badge/中文-README-blue)](README.zh-CN.md)

Provider-aware cache router CLI for multi-channel LLM API optimization.

## Installation

### Option 1: Install via Claude Code (Recommended)

If you're using Claude Code, you can install this tool conversationally:

```bash
# In Claude Code, run:
/claude install cache-router-skill

# Or directly via npm with GitHub Packages:
npm i -g @drizzlezhang/cache-router-skill
```

Claude Code will automatically:
1. Configure npm for GitHub Packages
2. Install the CLI globally
3. Verify the installation

### Option 2: Manual Installation

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

## Using with Claude Code

### Install as a Local Skill (Recommended for Claude Code Users)

To use this tool as a Claude Code skill (visible in `/skills`):

```bash
# Create the skill directory
mkdir -p ~/.claude/skills/cache-router-skill

# Clone into the skill directory
git clone https://github.com/Drizzlezhang/cache-router-skill.git ~/.claude/skills/cache-router-skill

# Or if you already have the repo cloned
cp -r /path/to/cache-router-skill/* ~/.claude/skills/cache-router-skill/
```

Then in Claude Code, run:
```
/skills
```

You should see `cache-router-skill` in the list.

### Interactive Commands

Once installed as a skill, you can use:

```bash
# Setup the tool interactively
/claude setup cache-router-skill

# Get installation help
/claude install cache-router-skill

# Configure providers
/claude configure cache-router-skill
```

Or start a conversation with Claude:
- "Install cache-router-skill"
- "Configure cache-router for Anthropic"
- "Show me a cache execution plan"

## Usage

```bash
cache-router-skill [options]
```

### Options

- `--help`, `-h` - Show help message

## Supported Providers

This tool supports the following LLM API providers:

| Provider | Caching Strategy |
|----------|------------------|
| **Anthropic** | Explicit block cache (cache_control) |
| **OpenAI** | Auto prefix cache |
| **Google Vertex AI** | Context resource cache |
| **Volcengine Ark** | Prefix / Context cache |
| **Kimi (Moonshot)** | Conservative (safe pass-through) |
| **SiliconFlow** | Conservative (safe pass-through) |
| **DeepSeek** | Conservative (safe pass-through) |
| **OpenRouter** | Conservative (OpenAI compatible) |
| **Qwen (Aliyun)** | Conservative (safe pass-through) |
| **GLM (Zhipu)** | Conservative (safe pass-through) |

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
