# Install cache-router-skill

## Global Installation

```bash
npm i -g @drizzlezhang/cache-router-skill
```

## Requirements

- Node.js >= 18.18.0
- npm
- GitHub token with `read:packages` scope (for GitHub Packages)

## Configuration

Create `~/.npmrc`:

```ini
@drizzlezhang:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=YOUR_GITHUB_TOKEN
```

## Verify Installation

```bash
cache-router-skill --version
```

Expected output: `0.1.1`
