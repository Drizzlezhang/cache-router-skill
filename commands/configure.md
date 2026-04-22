# Configure cache-router-skill

## Global Configuration

### 1. npm Registry Setup

Edit or create `~/.npmrc`:

```ini
@drizzlezhang:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=ghp_xxxxxxxxxxxxxxxxxxxx
```

Get your token from: https://github.com/settings/tokens

### 2. Provider Configuration

The tool auto-detects providers based on:
- `baseUrl` (e.g., `api.anthropic.com`)
- `model` prefix (e.g., `kimi-`, `qwen-`)
- Explicit `provider` field

### 3. Usage Examples

Generate execution plan:
```bash
cache-router-skill --plan --provider anthropic --model claude-3
cache-router-skill --plan --provider openai --model gpt-4o
cache-router-skill --plan --provider vertex --model gemini-pro
```

## Project-Specific Configuration

For project-level usage, create a `.npmrc` in your project root:

```ini
@drizzlezhang:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

Then install locally:
```bash
npm i @drizzlezhang/cache-router-skill
```
