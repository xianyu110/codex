随着 Anthropic 全面禁止 Claude 模型在中国渠道使用，Codex Cli 或将是你下一个 AI 编程新宠。

![图片](https://restname.oss-cn-hangzhou.aliyuncs.com/640-20250907095035262.png)

**原因如下：**

1、GPT-5 的编程能力绝对是当前第一梯队的。

2、Codex 几乎每天都会发布更新，OpenAI 官方高度重视。

3、Codex 最好的一点是，你可以以每月 20 美元的价格使用 gpt-5-thinking-high，而且很少达到使用上限 。

4、越来越多的开发者开始转向 Codex，越来越多的好评，会促进官方投入更多的资源和精力，形成正反馈。



**启动教程：**

1、网络：

终端执行 `curl -I https://chatgpt.com`，确保可以正常访问 ChatGPT。

![图片](https://restname.oss-cn-hangzhou.aliyuncs.com/640-20250907095035369.png)

```
如果卡在这一步，比如下图：
```

![图片](https://restname.oss-cn-hangzhou.aliyuncs.com/640-20250907095035501.png)

```
原因可能是，没有将代理命令复制到终端。
首先确保 curl ipinfo.io 输出的结果符合预期，然后继续尝试解决curl -I https://chatgpt.com 的连通性问题。
```



2、账号：

请确保开通每月 20 美元的 ChatGPT Plus服务。自助充值链接：https://717ka.com/p/9ezez0xoho8qe7u2w6q1roul

![图片](https://restname.oss-cn-hangzhou.aliyuncs.com/640-20250907095035731.png)

以目前的使用情况来看，每月20美元的套餐足够应付日常开发。至少对我来说，还很少会出现提示额度不足的情况。所以暂时不需要开通200美元套餐，毕竟使用的模型都是GPT-5，即使200美元套餐当前也不能在 Codex 里面使用 GPT-5 Pro。



而且这里的次数消耗，丝毫不影响 ChatGPT 官方其他服务的使用，所以还是非常划算的。就算自己没有代码需求，用它来写文档也是非常划算的，该薅的羊毛就得薅。



3、CLI安装：

地址：https://github.com/openai/codex

可以使用以下三种方式完成安装：

- `npm install -g @openai/codex`
- `brew install codex`
- 直接下载 GitHub Releases。

**定期，最好是每天，重新执行下上述命令，确保使用最新版本。**

如果你对版本（尤其是希望第一时间体验内测alpha版本），更推荐的是直接下载 GitHub Releases。

![图片](https://restname.oss-cn-hangzhou.aliyuncs.com/640-20250907095035856.png)

点击下面的链接，会自动跳转到版本的 release 页面。

https://github.com/openai/codex/releases

找到你希望使用的版本，然后选择机器对应的可执行文件：

![图片](https://restname.oss-cn-hangzhou.aliyuncs.com/640-20250907095035983.png)

- `aarch64` → Apple M 系列芯片
- `x86_64` → Intel/AMD 64 位 CPU
- `darwin` → macOS
- `pc-windows-msvc` → Windows
- `unknown-linux-gnu/musl` → Linux

下载、解压后，将可执行文件移动到 PATH 路径。

以Apple M 系列为例，执行如下命令：

- ```
  gh release download --repo openai/codex --pattern 'codex-aarch64-apple-darwin.tar.gz'
  ```

- ```
  tar -xzf codex-aarch64-apple-darwin.tar.gz
  ```

- ```
  mv codex-aarch64-apple-darwin codex
  ```

- ```
  sudo mv codex /usr/local/bin/
  ```



虽然这种方式稍微有点繁琐，现在有 AI 其实很好解决... 封装一个快捷键即可。

![图片](https://restname.oss-cn-hangzhou.aliyuncs.com/640-20250907095040148.png)

简直丝滑！

![图片](https://restname.oss-cn-hangzhou.aliyuncs.com/640-20250907095040415.png)



4、启动：

输入 `codex`，选择使用 ChatGPT 账户登录。

![图片](https://restname.oss-cn-hangzhou.aliyuncs.com/640-20250907095040757.png)

完成授权之后即可登录。

![图片](https://restname.oss-cn-hangzhou.aliyuncs.com/640-20250907095041207.png)

5、测试：

输入一个最简单的"hello"，如果收到回复，说明启动成功！

![图片](https://restname.oss-cn-hangzhou.aliyuncs.com/640-20250907095041466.png)
