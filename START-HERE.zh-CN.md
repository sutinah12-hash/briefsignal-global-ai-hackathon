# 从这里开始

当前方向是 **Tavily Research Agent**，项目名 **BriefSignal**。选题分析在 `docs/HACKATHON-STRATEGY.zh-CN.md`。

公开仓库：[sutinah12-hash/briefsignal-global-ai-hackathon](https://github.com/sutinah12-hash/briefsignal-global-ai-hackathon)。[GitHub 自动检查](https://github.com/sutinah12-hash/briefsignal-global-ai-hackathon/actions/workflows/ci.yml)覆盖核心测试、类型检查和构建。

## 打开项目

Windows 双击根目录的 `启动项目.cmd`，等待出现地址后打开 <http://127.0.0.1:5173>。也可以在该文件夹打开终端执行 `npm run dev`。

默认示例是虚构的 Northstar Robotics，不会消耗 API 额度。可以切换证据列表、点 S1 查看原文、查看排除原因、导出和保存。

## 免费额度与真实调用

密钥填在本机的 `.dev.vars`，不要发到聊天或上传 GitHub。

1. [Tavily 控制台](https://app.tavily.com/home)：使用免费 Researcher 计划，保持 pay-as-you-go 关闭，取得 API Key，填写 `TAVILY_API_KEY`。
2. [ChatGPT 设置](https://chatgpt.com/#settings)：Billing 中查看 API credits benefit。符合条件的 Pro 需要主动激活，核实关联的 API organization、已到账额度和有效期。
3. 在正确的 API organization 创建项目 API Key，填写 `LLM_API_KEY`。不要启用自动充值，也不要购买额度。
4. 默认 `LLM_BASE_URL` 和 `LLM_MODEL` 使用 OpenAI 兼容配置；如使用其他服务，需同时更改。
5. 重启项目。页面右上角 Connections 显示服务已配置后，输入真实对象生成简报。

API Key 是调用凭据，不代表必然扣现金。实际费用取决于账户额度和计费设置。这个应用不能读取你的免费余额，因此需要先在账户页面确认。

2026-11-16 已登录核查 ChatGPT 和 API Platform：当前账号没有显示 API 额度领取入口，也没有已到账赠送额度。不要为了这个原型充值。正在核查的替代方案是 Gemini 3.1 Flash-Lite 免费层；[官方价格](https://ai.google.dev/gemini-api/docs/pricing#gemini-3.1-flash-lite)列出免费输入和输出，但账号配额和项目联调尚未验证。免费层内容可能用于改进 Google 产品，演示只使用公开或虚构的会议信息。

## 提交材料

- `submission/BriefSignal-demo.webm`：56 秒实际界面操作演示，英文字幕、无声，明确标注虚构示例，零 API 调用。
- `submission/BriefSignal-pitch.pptx`：8 页可编辑路演稿。
- `submission/BriefSignal-pitch.pdf`：便于上传的 PDF 版本。
- `submission/BriefSignal-sample-brief.pdf`：一页输出示例，明确标注为虚构演示。
- `submission/SUBMISSION.md`：英文填表文案。
- `submission/DEMO-SCRIPT.zh-CN.md`：3 分钟演示讲稿。
- `submission/repository.json`：已核实的公开 GitHub 地址。

比赛表单先选 Theme **AI Agents & Intelligent Systems**，再在出现的 Problem Statement 中选 **Tavily Research Agent**。额外 Tavily 集成项留空，第二项目选 **NA (not applied)**。当前不申报 Bifrost 集成。必须如实保留“尚待真实 API 联调”等状态，只有真实调用核实后才能更新。表单核对记录在 `submission/FORM-STATUS.md`；目前尚未保存比赛提交。

## 登录页面里的两个保存按钮

TinyFish 外层的 **Save profile** 保存浏览器登录状态，便于自动化读取你已登录的页面。HackCulture 内层的保存/提交保存比赛材料。前者不需要先上传项目材料。

如果看不到外层按钮，提供当前登录窗口的完整画面（包含顶部和底部），不要提供密码、验证码或 API Key。
