# 命令 / 斜杠速查

这页是 Codex 教程站的随手查表。不同版本的 Codex App、CLI、IDE 扩展可用命令会有差异，最终以当前界面的 `/help`、命令面板或设置页为准。

## App 常用操作

| 操作 | 快捷键 / 入口 | 用途 |
| --- | --- | --- |
| 打开命令面板 | `Cmd + Shift + P` 或 `Cmd + K` | 搜索命令、打开设置、重载技能 |
| 打开设置 | `Cmd + ,` | 配置权限、MCP、外观、个性化 |
| 新建 Thread | `Cmd + N` 或界面按钮 | 为新任务开独立上下文 |
| 搜索 Threads | `Cmd + G` | 找回历史任务 |
| 当前 Thread 内查找 | `Cmd + F` | 在当前对话中找关键词 |
| 打开文件夹 | `Cmd + O` | 添加项目目录 |
| 切换终端 | `Cmd + J` | 查看命令输出或运行检查 |
| 切换 Diff 面板 | `Cmd + Option + B` | 审查文件改动 |

## App 斜杠命令

| 命令 | 作用 | 什么时候用 |
| --- | --- | --- |
| `/plan` | 切换到规划模式 | 多文件、模糊、有风险任务开始前 |
| `/status` | 查看 Thread ID、上下文、限制等状态 | 长任务中途或收尾审计 |
| `/goal` | 设置持续目标 | 想让 Codex 持续推进大目标 |
| `/init` | 生成 `AGENTS.md` 草稿 | 新仓库初始化代理规则 |
| `/mcp` | 查看 MCP 连接状态 | 外部工具连不上或要确认权限 |
| `/review` | 进入代码审查模式 | 提交前检查 diff |
| `/feedback` | 提交反馈和日志 | 遇到 App 或产品问题 |

常用组合：

```text
/plan
请先检查仓库结构，列出要改的文件、验证方式和风险，暂时不要改文件。
```

```text
/status
```

```text
请按计划执行第一步。改文件前先说明本次会修改哪些文件。
```

## CLI 常用命令

| 命令 | 用途 |
| --- | --- |
| `codex` | 在当前目录启动交互式 CLI |
| `codex "解释这个项目"` | 用一条 prompt 快速启动 |
| `codex resume` | 恢复历史会话 |
| `codex resume --last` | 恢复当前目录最近会话 |
| `codex exec "修复 CI 失败"` | 非交互模式执行任务 |
| `codex login` | 登录 Codex |
| `codex login --device-auth` | 使用设备码登录，适合浏览器登录不方便时 |
| `codex mcp --help` | 查看 MCP 管理命令 |
| `codex features list` | 查看功能开关 |
| `codex completion zsh` | 生成 shell 补全脚本 |

## CLI 斜杠命令

| 命令 | 作用 | 常见场景 |
| --- | --- | --- |
| `/plan` | 进入 Plan Mode | 先规划再执行 |
| `/status` | 查看模型、权限、上下文、工作区 | 排查配置和上下文 |
| `/model` | 切换模型或推理设置 | 复杂任务升模型，简单任务降成本 |
| `/permissions` | 调整权限 | Read-only、Auto、Full Access 切换 |
| `/review` | 审查工作区 diff | 提交前找严重问题 |
| `/diff` | 查看当前改动 | 快速检查 Codex 改了什么 |
| `/mcp` | 查看 MCP 工具 | GitHub、Figma、浏览器等工具排查 |
| `/skills` | 浏览和使用 Skills | 选择可复用工作流 |
| `/init` | 生成 `AGENTS.md` | 新项目写代理规则 |
| `/clear` | 清空终端并开始新对话 | 想重开当前 CLI 上下文 |
| `/resume` | 恢复会话 | 接着之前任务做 |
| `/quit` 或 `/exit` | 退出 CLI | 收尾后离开 |

## 本地项目检查命令

这些命令适合让 Codex 在收尾时运行。

```bash
git status --short
```

查看当前工作区是否还有未提交改动。

```bash
git diff --check
```

检查空白错误和基础 diff 问题。

```bash
git diff -- README.md
```

只查看某个文件的改动。

```bash
rg "关键词"
```

快速搜索仓库内容。

```bash
find docs recipes reference -maxdepth 2 -type f | sort
```

检查教程文件是否齐全。

```bash
python3 -m http.server 8765
```

预览静态站，然后打开 `http://127.0.0.1:8765/`。

## 教程站专项检查

检查完整教程是否存在：

```bash
test -f docs/guide/full-course.md && echo OK
```

检查关键入口：

```bash
for f in index.html docs/index.html recipes/index.html reference/index.html reader.html reader.js; do test -f "$f" && echo "OK $f"; done
```

检查原有中转和购买链接是否还在：

```bash
for s in \
  'https://codex.chatgpt-plus.top/login' \
  'https://codex2.chatgpt-plus.top/login' \
  'https://maynorai.jichiyun.sbs/buy/30' \
  'https://maynorai.jichiyun.sbs/buy/13' \
  'https://maynorai.jichiyun.sbs/buy/7'; do
  git grep -F "$s" -- README.md index.html docs recipes reference >/dev/null && echo "FOUND $s" || echo "MISSING $s"
done
```

## 给 Codex 的常用提示词

只读审计：

```text
先只读检查项目结构，不要改文件。请告诉我你会改哪些文件、为什么改、怎么验证。
```

保留链接：

```text
请保留所有原有国内站、备用网址、购买、中转 API、飞书教程链接，只改教程内容和导航。
```

提交前检查：

```text
请做提交前检查：git status、git diff --check、关键链接保留检查、本地页面访问检查。然后总结改动文件和剩余风险。
```

排查失败：

```text
请按“假设 -> 实验 -> 结果 -> 最小修复”的格式排查，不要扩大改动范围。
```
