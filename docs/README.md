# 文档目录

本目录用于记录 `liyihan.net` 的网站架构、内容模型和部署方式。

推荐阅读顺序：

1. [architecture.md](architecture.md)：先理解整体技术路线和框架分层。
2. [content-model.md](content-model.md)：再理解内容如何用 Markdown / MDX / 组件组织。
3. [themes.md](themes.md)：选择合适的学术主题作为起点。
4. [deployment.md](deployment.md)：最后看 Docker 和 Nginx 部署方式。

## 总体结论

当前实现是：

```text
Astro + MDX + React + Pagefind + Docker + GitHub Actions
```

这个组合适合个人学术网站，因为它同时满足：

- 内容可长期维护。
- 支持比 Markdown 更强的交互和展示能力。
- 主页、CV、Publications、Projects、Blog、Search 已有可运行实现。
- 构建结果是纯静态站点。
- 部署方式简单、稳定、成本低。

## 文档边界

这些文档描述的是当前项目源码的维护方式。后续可以继续补充：

- 内容迁移规范。
- 服务器和域名配置。
