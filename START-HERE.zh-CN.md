# 从这里开始

当前方向是 **Tavily Research Agent**，项目名 **BriefSignal**。选题分析在 `docs/HACKATHON-STRATEGY.zh-CN.md`。

公开仓库：[sutinah12-hash/briefsignal-global-ai-hackathon](https://github.com/sutinah12-hash/briefsignal-global-ai-hackathon)。[GitHub 自动检查](https://github.com/sutinah12-hash/briefsignal-global-ai-hackathon/actions/workflows/ci.yml)覆盖核心测试、类型检查和构建。

## 打开项目

Windows 双击根目录的 `启动项目.cmd`，等待出现地址后打开 <http://127.0.0.1:5173>。也可以在该文件夹打开终端执行 `npm run dev`。

默认示例是虚构的 Northstar Robotics，不会消耗 API 额度。可以切换证据列表、点 S1 查看原文、查看排除原因、导出和保存。

## 免费额度与真实调用

密钥填在本机的 `.dev.vars`，不要发到聊天或上传 GitHub。

1. [Tavily 控制台](https://app.tavily.com/home)：使用免费 Researcher 计划，保持 pay-as-you-go 关闭，取得 API Key，填写 `TAVILY_API_KEY`。
2. 本项目已使用 [Google AI Studio](https://aistudio.google.com/apikey) 的 Gemini 免费项目。新安装者需要自己的密钥，并核实项目未关联付费账单。
3. 设置 `LLM_API_KEY`、`LLM_MODEL="gemini-3.1-flash-lite"`，直连时 `LLM_BASE_URL="https://generativelanguage.googleapis.com/v1beta/openai"`。不要购买额度或启用自动充值。
4. 本机 VPN 代理方案见下文；其他 OpenAI 兼容服务也可配置，但需独立核实其免费额度和参数兼容性。
5. 重启项目。页面右上角 Connections 显示服务已配置后，输入真实对象生成简报。

API Key 是调用凭据，不代表必然扣现金。实际费用取决于账户额度和计费设置。这个应用不能读取你的免费余额，因此需要先在账户页面确认。

2026-11-16 已登录核查 ChatGPT 和 API Platform：当前账号没有显示 API 额度领取入口，也没有已到账赠送额度。项目已改用 Gemini 3.1 Flash-Lite，核实所用项目为免费层、未关联付费账单，并完成真实调用。免费层内容可能用于改进 Google 产品，演示只使用公开或虚构的会议信息。

本机 Tavily 和 Gemini 密钥都已配置。Tavily 自动升级和按量付费均已关闭并复查。OpenAI 公司与 Sam Altman 人物两个完整浏览器场景均已成功：最新实测约 12.1 秒和 9.0 秒，分别由 Tavily 报告 3 和 4 credits。这只是两次实例，不保证每次速度；也遇到过模型超时和 HTTP 503。引用仍需人工核对语义与日期，详细记录在 `docs/LIVE-VALIDATION.md`。

已在本机发现可用 HTTP 代理 `127.0.0.1:7892`。忽略上传的 `.briefsignal.local.json` 保存代理配置，`npm run dev` 或双击启动脚本会自动启动本机 Gemini 桥接。请保持现有 VPN 开启；代理端口变更时修改该文件。项目没有修改系统代理或 VPN 设置。

## 提交材料

- `submission/BriefSignal-demo.webm`：56 秒实际界面操作演示，英文字幕、无声，明确标注虚构示例，零 API 调用。
- `submission/BriefSignal-pitch.pptx`：8 页可编辑路演稿。
- `submission/BriefSignal-pitch.pdf`：便于上传的 PDF 版本。
- `submission/BriefSignal-sample-brief.pdf`：一页输出示例，明确标注为虚构演示。
- `submission/BriefSignal-live-company.pdf`：真实公司场景的一页输出，保留模型实际生成结果和来源，使用前核查具体事实。
- `submission/SUBMISSION.md`：英文填表文案。
- `submission/DEMO-SCRIPT.zh-CN.md`：3 分钟演示讲稿。
- `submission/repository.json`：已核实的公开 GitHub 地址。

比赛表单先选 Theme **AI Agents & Intelligent Systems**，再在出现的 Problem Statement 中选 **Tavily Research Agent**。额外 Tavily 集成项留空，第二项目选 **NA (not applied)**。当前不申报 Bifrost 集成。表单核对与实际保存状态记录在 `submission/FORM-STATUS.md`；公开仓库和演示文件本身不等于比赛提交回执。

## 登录页面里的两个保存按钮

TinyFish 外层的 **Save profile** 保存浏览器登录状态，便于自动化读取你已登录的页面。HackCulture 内层的保存/提交保存比赛材料。前者不需要先上传项目材料。

如果看不到外层按钮，提供当前登录窗口的完整画面（包含顶部和底部），不要提供密码、验证码或 API Key。
