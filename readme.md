## ZxwyWebSite/onedrive-vercel-index
forked from [spencerwooo/onedrive-vercel-index](https://github.com/spencerwooo/onedrive-vercel-index)
### 简介
+ Onedrive目录列表程序
+ 添加一些实用功能
### 修改
+ 配置文件 *config/site.config.js* 新增以下功能
   1. redisUrl独立配置
   2. 下载链接代理
   3. 本地字体
+ *下载链接代理* 使用方法
   - 适用于部分地区无法访问和想用来加速的用户  
   原理：将生成的链接进行关键词替换
   0. 预览文件, F12抓取下载链接, 反代或使用CDN
   ```
   E5: xxx-my.sharepoint.com
   个人版: public.ch.files.1drv.com
   ```
   1. 在配置文件启用 *Download Link Proxy*
   ```
   downProxy: true,
   ```
   2. 填写URL
   ```
   downLink_old: '下载链接',
   downLink_new: '替换链接',
   ```
   3. 修改配置后不要忘了重新构建
   ```
   $ pnpm build
   ```
+ *本地字体* 使用方法
   - 适用于无法访问 *Google Fonts* 的用户  
   原理：从本地服务器加载字体文件
   0. 找到这一行
   ```
   // If you want to use local fonts, comment out the previous line↑ and uncomment the next line↓.
   ```
   1. 注释掉上一行的链接并取消注释下一行
   ```
   googleFontLinks: ['/fonts/css2.css'],
   ```
   2. 重构
   ```
   $ pnpm build
   ```
### 使用
+ 参考文档：[Getting started](https://ovi.swo.moe/docs/getting-started)
0. 准备环境：Node >= 16, pnpm包管理器, Git
   ```
   # Node版本
   $ node -v
   v16.20.0

   # 安装pnpm
   $ npm install pnpm -g
   ```
1. 克隆存储库
   ```
   $ git clone https://github.com/ZxwyWebSite/onedrive-vercel-index.git
   ```
2. 在Azure注册应用，然后替换 *config/api.config.js* 中的 **应用ID** 和 **应用密钥**  
   注：使用 [此工具](https://ovi.swo.moe/docs/advanced#modify-configs-in-apiconfigjs) 加密你的**应用密钥**, 世纪互联版还需修改Api地址
   ```
   clientId: 应用ID
   obfuscatedClientSecret: 加密后的应用密钥
   ```
3. 修改 *config/site.config.js* 的以下参数
   ```
   # 必填
   userPrincipalName: Onedrive账户邮箱
   redisUrl: Redis连接(redis://:密码@地址:端口)or(redis://地址:端口)

   # 选填
   title: 站点标题
   description: 站点描述
   baseDirectory: 分享目录
   footer: 页脚代码
   ...
   ```
4. 构建 (要求服务器空闲内存>=400M, 依赖约占500M)
   ```
   # 进入项目根目录
   root@MK31LCZDN:/www/wwwroot/onedrive-vercel-index#
   # 安装依赖
   $ pnpm install
   # 构建项目
   $ pnpm build
   # 运行项目 (-p 指定端口)
   $ pnpm start
   ```
