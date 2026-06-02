# 学术主题选型

## 首选：Astro Scholar

Astro Scholar 是目前最适合作为本项目起点的主题。

链接：

- GitHub: [shravanngoswamii/astro-scholar](https://github.com/shravanngoswamii/astro-scholar)
- Demo: [shravangoswami.com/astro-scholar](https://shravangoswami.com/astro-scholar/)

适合原因：

- 面向学术个人主页。
- 包含 Blog、Publications、Projects、Team 等结构。
- Publications 可从 BibTeX 生成。
- 支持 Pagefind 搜索。
- 支持暗色模式。
- 支持自动 OG 图。
- 支持 RSS。
- 与当前希望保留的 CV / Publications / Blog 结构接近。

推荐使用方式：

```text
先 fork / clone 主题
  -> 跑通本地开发
  -> 替换个人信息和配置
  -> 迁移 Publications
  -> 迁移 Projects
  -> 迁移 Blog / Notes
  -> 增加自定义 MDX 组件
```

## 备选：Astro Academia

Astro Academia 更简洁，适合更轻量的学术个人站。

链接：

- GitHub: [maiobarbero/astro_academia](https://github.com/maiobarbero/astro_academia)
- Demo: [astro-academia.pages.dev](https://astro-academia.pages.dev/)

适合原因：

- 结构轻。
- 页面简洁。
- 更容易做二次设计。
- 适合内容量较少或希望保持极简风格的学术站。

## 选型建议

推荐优先级：

1. **Astro Scholar**：更适合作为 `liyihan.net` 的正式起点。
2. **Astro Academia**：适合作为备选或极简方案参考。

如果目标是替代现有个人主页，并保留 Publications、Projects、CV、Blog 等完整结构，应优先选择 Astro Scholar。

如果目标只是快速上线一个非常简洁的个人页，可以考虑 Astro Academia。

## 主题改造原则

无论选择哪个主题，都建议遵循以下原则：

- 优先保留主题已有目录结构。
- 先替换配置和内容，不急于重写布局。
- 对重复展示需求创建组件，例如论文卡片、视频嵌入、项目 demo。
- 对长期内容使用 Markdown / MDX，不把正文硬编码进 `.astro` 页面。
- 自定义样式尽量集中管理，避免每个页面零散覆盖。

## 初始页面建议

首批页面建议包括：

```text
Home
About
CV
Publications
Projects
Blog
Notes
```

其中 Publications 应优先通过 BibTeX 自动生成，Projects 和 Blog 则用 Markdown / MDX 管理。

