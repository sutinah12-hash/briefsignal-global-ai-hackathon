# 选题与参赛方案

核实日期：2026-11-16。项目：BriefSignal。选择 Theme：**Tavily Research Agent**。

## 为什么选择这个题

这是基于首次参赛、完整交付和清楚演示的工程判断，不是对获奖概率的保证。

- **会前研究助手：首选。** 输入、30 天窗口、一页报告、来源和讨论问题都可直接验收。Tavily 是关键数据来源，能展示完整的真实功能。难点集中在证据质量，而不是大量基础设施。
- **过期答案检测：第二选择。** 前后对比容易展示，但赛题要求 Tavily 与 Bifrost 同时集成；“看起来过期”和“证实过期”很容易混淆，需更好的标注评测集。
- **Agent 评测平台：后续进阶。** 必须支持不同框架、相同任务的重复执行、失效注入和详细轨迹，容易把时间花在适配器和测量公平性上。
- **Bifrost 扩展：有明确上游需求时适合。** 需要理解扩展点、兼容标准安装并达到可提 PR 的质量。单独包装一个前端不足以满足要求。
- **低 token 编程 Agent：本次不选。** 同时覆盖正确性、成本、故障恢复、本地模型和高风险操作审批，完整闭环较大。
- **自主渗透 Agent：本次不选。** 需要隔离靶场、真实工具执行、范围控制、恢复和证据报告，演示稳定性与评测成本较高。

## 我们的差异化

不是只有一个摘要框。核心展示是“事实 → 原文证据 → 会议相关性 → 可问的问题”，同时把没有使用的来源保留下来。

1. 会议时间决定前 30 天窗口；未来会议只能使用研究当时已经存在的信息。
2. 过旧、未来、日期缺失、边界日期不确定的来源会被排除，保留具体原因。
3. 每条事实需引用已接收的来源和可定位的原文片段。
4. 会议建议与报道事实分开显示。可追溯引用不等于事实已经独立核实。
5. 一页可打印简报、证据列表、研究轨迹和结构化导出，方便评委逐项验证。

## 时间与规则核实

最新官方活动页的 Schedule 显示原型提交结束于 **2026-11-21 23:59 IST**，对应 **北京时间 2026-11-22 02:29**。同页顶部和较早赛题 PDF 仍保留 11 月 15 日 / 29 日等旧日期；本记录采用已渲染页面的最新 Schedule，最终以登录后的表单及官方 Discord 公告为准。

用户提供的新版提交说明允许 Tavily 单独参赛，因此选择 Tavily Research Agent；当前实现不申报 Bifrost，也不勾选合并赛题。

- [官方活动与最新日程](https://hackculture.io/hackathons/ai-global-hackathon)
- [会前研究助手赛题 PDF](https://hackcultureplatform.blob.core.windows.net/event-assets/hackathons/6ac5c8240037f69fb28e23ec/problem_explanation_a1nx56ua55u.pdf)
- [官方 Discord](https://discord.gg/STHG8YQdd)

## 完成提交还需要

- 真实 Tavily 与模型调用成功，核对来源和调用额度。
- 公开 GitHub 仓库和可访问的路演文件。
- 在登录后的比赛表单逐项填入内容，确认保存/提交成功回执。
- 参与者自行确认已加入官方 Discord；不要替参与者虚构身份、团队信息或完成状态。

## 不额外付费的配置原则

Tavily 免费 Researcher 计划每月有 1,000 credits，官方说明不开启 pay-as-you-go 就不会收费。符合条件的 ChatGPT Pro 订阅可在 Billing 激活 API 额度，实际到账金额、有效期及所属 API organization 必须在账户页面核实。不要购买额度或启用自动充值。

应用只显示供应商返回的用量，不知道账户是否还有免费额度；应用内显示的数字不能替代账户账单。

- [Tavily 免费计划](https://help.tavily.com/articles/8298987937-billing-credits-usage-limits)
- [Pro API credits benefit](https://help.openai.com/en/articles/20001626-api-credits-benefit-for-eligible-chatgpt-subscriptions)
