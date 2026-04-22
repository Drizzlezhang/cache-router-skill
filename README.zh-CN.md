# @drizzlezhang/cache-router-skill

多厂商 LLM API 缓存优化路由工具。

## 安装

本包发布在 GitHub Packages。要全局安装：

### 1. 配置 npm 使用 GitHub Packages

创建或编辑 `~/.npmrc`，添加你的 GitHub token：

```ini
@drizzlezhang:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=你的_GITHUB_TOKEN
```

> **注意**：GitHub token 至少需要 `read:packages` 权限。如果要发布，需要 `write:packages`。

### 2. 全局安装

```bash
npm i -g @drizzlezhang/cache-router-skill
```

### 3. 验证安装

```bash
cache-router-skill --help
```

## 使用

```bash
cache-router-skill [选项]
```

### 选项

- `--help`, `-h` - 显示帮助信息

## 支持的渠道

本工具支持以下 LLM API 渠道：

| 渠道 | 缓存策略 | 状态 |
|------|----------|------|
| **Anthropic** | 显式缓存块 (cache_control) | ✅ 高置信度 |
| **OpenAI** | 自动前缀缓存 | ✅ 高置信度 |
| **Google Vertex AI** | 上下文资源缓存 | ✅ 高置信度 |
| **火山引擎 (Ark)** | 前缀 / 上下文缓存 | ✅ 高置信度 |
| **Kimi (Moonshot)** | 保守模式（安全透传） | ⚠️ 低置信度 |
| **硅基流动** | 保守模式（安全透传） | ⚠️ 低置信度 |
| **DeepSeek** | 保守模式（安全透传） | ⚠️ 低置信度 |
| **OpenRouter** | 保守模式（OpenAI 兼容） | ⚠️ 低置信度 |
| **千问 (阿里云)** | 保守模式（安全透传） | ⚠️ 低置信度 |
| **GLM (智谱)** | 保守模式（安全透传） | ⚠️ 低置信度 |

### 渠道识别

工具基于以下信息自动识别渠道：
- `baseUrl` 模式（如 `api.anthropic.com`、`api.openai.com`）
- `model` 名称前缀（如 `kimi-`、`qwen-`、`glm-`）
- 显式 `provider` 配置

未知渠道自动回退到**中立模式**（仅安全透传）。

## 配置文件

复制示例配置：

```bash
cp node_modules/@drizzlezhang/cache-router-skill/.npmrc.example ~/.npmrc
```

然后将 `YOUR_GITHUB_TOKEN` 替换为你的 GitHub 个人访问令牌。

## 开发

### 环境要求

- Node.js >= 18.18.0
- npm

### 设置

```bash
git clone https://github.com/Drizzlezhang/cache-router-skill.git
cd cache-router-skill
npm install
```

### 构建

```bash
npm run build
```

### 测试

```bash
npm test
```

### 本地运行

```bash
npm start
```

## 发布

发布新版本到 GitHub Packages：

1. 更新 `package.json` 中的版本号
2. 确保 GitHub token 有 `write:packages` 权限
3. 执行：

```bash
npm publish
```

## 更新日志

### v0.1.1
- 更新版本以支持 GitHub Packages 分发
- 验证发布流程

### v0.1.0
- 初始 CLI 脚手架
- GitHub Packages 发布配置
- 基础 TypeScript 设置和测试

## 仓库

https://github.com/Drizzlezhang/cache-router-skill

## 许可证

ISC
