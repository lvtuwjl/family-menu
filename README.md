# 好好吃饭 · 全家阶段营养菜单

一个覆盖备孕、孕期、产后、宝宝辅食和全家餐的家庭菜单网站。家人可以按阶段挑菜并下单，大厨可以接单、买菜、做饭并通知开饭。

## 当前功能

- 41 道带详细食材和烹饪步骤的阶段菜谱
- 备孕、孕期、产后、宝宝和全家 5 个一级栏目
- 按家庭阶段分组，并按孕期阶段、宝宝月龄、菜名、营养亮点和食材筛选
- 默认不辣模式、菜谱辣度标识与下单口味提醒
- 菜谱适用阶段、营养亮点、过敏原、食物质地和安全提示
- 点菜篮、人数、开饭时间和口味备注
- 点单记录和进度查看
- 大厨工作台：接单、买菜中、烹饪中、开饭啦、完成
- SQLite 数据持久化，首次运行自动建表和写入示例菜谱
- 手机、平板和桌面自适应
- Docker Compose、Caddy 自动 HTTPS 和家庭密码保护

## 本地运行

需要 Node.js 22.13 或更高版本。

```bash
npm install
npm run dev
```

默认访问 `http://localhost:3000`，数据库保存在 `data/family-menu.db`。

本地按生产模式预览：

```bash
npm run build
npm run start
```

构建完成后会自动把 CSS、JavaScript 和 `public` 资源复制到 standalone 目录。

## 部署到自己的服务器

服务器需要安装 Docker、Docker Compose，并开放 80、443 端口。

1. 将 `.env.example` 复制为 `.env`。
2. 把 `DOMAIN` 和 `SITE_URL` 换成自己的域名。
3. 生成家庭访问密码：

```bash
docker run --rm caddy:2-alpine caddy hash-password --plaintext '你的家庭密码'
```

4. 将输出填入 `.env` 的 `BASIC_AUTH_HASH`。
5. 确认域名的 DNS 已指向服务器后启动：

```bash
docker compose up -d --build
```

Caddy 会自动申请并续期 HTTPS 证书。访问用户名固定为 `family`，密码是上一步设置的家庭密码。

## 数据与备份

- 数据库文件：`data/family-menu.db`
- 菜谱种子：`db/seed.ts`
- 数据表定义：`db/schema.ts`
- 数据库启动逻辑：`db/index.ts`

备份前建议短暂停止应用，再复制整个 `data` 目录：

```bash
docker compose stop app
cp -R data data-backup
docker compose start app
```

恢复时停止应用，用备份目录中的数据库文件替换 `data/family-menu.db` 后再启动。

## 项目结构

```text
app/                 页面、交互组件和 API
db/                  SQLite 表结构、初始化和示例菜谱
lib/                 数据查询与共享类型
public/              分享封面等静态资源
data/                运行时数据库（不提交到版本库）
Dockerfile           应用镜像
docker-compose.yml   应用和 HTTPS 网关
Caddyfile            域名、HTTPS 和密码保护
```

## 下一步建议

1. 由注册营养师或儿科专业人员逐道审核阶段菜谱。
2. 增加菜谱管理页面、营养数据维护和图片上传。
3. 将家庭密码登录改成独立家庭成员账号。
4. 增加收藏、周计划、采购清单、PWA 和新订单通知。
