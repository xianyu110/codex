# FAQ

这里整理新手最常问的问题。更完整的路线请先读 [Codex 完整实战教程](../docs/guide/full-course.md)。

## 我不会写代码，能用 Codex 吗？

能。先把 Codex 当成“会读文件、改文件、跑检查的执行型助手”。从 README 变网页、整理 Obsidian、生成 PPT、做资料调研这种任务开始，不要一上来挑战大型代码重构。

## 我应该先用 App 还是 CLI？

小白先用桌面 App。App 更容易看到 Thread、计划、文件改动、终端输出和 Diff。开发者可以直接用 CLI，因为 CLI 更贴近真实仓库工作流。

## 官方订阅和第三方中转有什么区别？

官方订阅是 OpenAI / ChatGPT 官方账号套餐。第三方中转是第三方接入方案，价值是降低访问、支付和配置门槛。教程保留第三方中转入口，但不会把它说成官方订阅。

## 原来的购买和中转链接还保留吗？

保留。教程改造的原则是内容变完整，原来的国内站、备用入口、套餐购买、中转 API、飞书教程链接不丢。

关键链接包括：

- `https://codex.chatgpt-plus.top/login`
- `https://codex2.chatgpt-plus.top/login`
- `https://maynorai.jichiyun.sbs/buy/30`
- `https://maynorai.jichiyun.sbs/buy/13`
- `https://maynorai.jichiyun.sbs/buy/7`
- `https://momoai.czvip.cn/products/codex`

## Plan Mode 必须开吗？

不是。小任务不用开。复杂、多文件、有风险、不确定范围的任务建议先开。判断标准很简单：如果你需要 Codex 先理解项目再决定怎么改，就开 Plan Mode。

## 一条 Thread 可以做很多事吗？

不建议。一条 Thread 做一件事，结果更稳，也更容易 review。比如“补教程主线”和“改首页视觉设计”最好分成两条 Thread。

## Full Access 要不要一直开？

不要。默认 Workspace write。只有跨目录、系统配置、部署、本机自动化等明确需要更高权限的任务，才考虑 Full Access。

## Codex 改完就算完成了吗？

不算。至少要检查：

- 改了哪些文件。
- 是否符合要求。
- 是否保留关键链接。
- 是否跑过相关验证。
- 是否有剩余风险。

让 Codex 收尾时可以这样说：

```text
请总结目标是否完成、改动文件、验证命令、验证结果、剩余风险。
```

## Codex 会不会误删文件？

可能，所以要用 Git 和权限边界保护自己。

建议：

- 陌生项目先只读。
- 重要任务先开 Plan Mode。
- 提交前看 `git diff`。
- 不让 Codex 随意运行 `rm -rf`、`git reset --hard`、`git clean -fd`。

## 我可以把 API Key 发给 Codex 吗？

不要。让 Codex 把代码改成从环境变量读取，并告诉你要设置哪个环境变量。排查错误时提供错误信息，不提供完整密钥。

## AGENTS.md 和 Skills 有什么区别？

`AGENTS.md` 是仓库长期规则，适合写项目结构、命令、风格、安全边界。Skills 是可复用工作流，适合公众号排版、PPT 生成、PDF 审阅、README 变网页这类反复做的任务。

## MCP 是不是越多越好？

不是。MCP 连接外部系统，越多代表能力越强，也代表风险越大。只启用当前任务需要的 MCP，并确认它能读什么、能写什么。

## 什么时候适合做自动化？

当流程已经人工跑通过、输入输出稳定、失败能定位时，才适合自动化。不要把还在探索的需求直接做成定时任务。

## Codex 搜索网页可靠吗？

网页内容要当作外部资料，不要当成绝对真相。涉及官方产品、价格、规则、API、法律、医疗、金融等内容，应该查官方来源并标注不确定性。

## 教程站本地怎么预览？

在仓库根目录运行：

```bash
python3 -m http.server 8765
```

然后打开：

```text
http://127.0.0.1:8765/
```

## 怎么判断这个教程站是否完整？

至少满足：

- 首页能进入 `docs/`、`recipes/`、`reference/`。
- `docs/guide/full-course.md` 提供完整主线。
- `docs/guide/00-14` 分章齐全。
- `recipes/index.md` 有案例分类和选择路径。
- `reference` 有命令、设置、安全、FAQ。
- 原有国内站、购买、中转、飞书链接保留。
- 本地预览和 reader 页面能打开。

## 我下一步应该看什么？

按这个顺序：

1. [Codex 完整实战教程](../docs/guide/full-course.md)
2. [第一个可验证任务](../docs/guide/14-first-task.md)
3. [README 变网页](../recipes/readme-to-web.md)
4. [实战案例库](../recipes/index.md)
