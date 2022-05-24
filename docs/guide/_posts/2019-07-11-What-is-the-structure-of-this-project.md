---
tags: ["this project structure", "guide"]
---

## 默认的目录结构

```bash
.
├── _config.yml
├── _data
│   └── members.yml
├── _drafts
│   ├── begin-with-the-crazy-ideas.md
│   └── on-simplicity-in-technology.md
├── _includes
│   ├── footer.html
│   └── header.html
├── _layouts
│   ├── default.html
│   └── post.html
├── _posts
│   ├── 2007-10-29-why-every-programmer-should-play-nethack.md
│   └── 2009-04-26-barcamp-boston-4-roundup.md
├── _sass
│   ├── _base.scss
│   └── _layout.scss
├── _site
├── .jekyll-cache
│   └── Jekyll
│       └── Cache
│           └── [...]
├── .jekyll-metadata
└── index.html # can also be an 'index.md' with valid front matter
```

我们只需要关注几个核心的目录结构如下（可以自己创建）：

+ `_config.yml` （全局配置文件）
+ `_layouts` （存放页面模板，md或html文件的内容会填充模板）

    文章头添加下面标识应用模板

    ```bash
    ---
    layout: default
    ---
    ```

+ `_data` （格式良好的站点数据应放在此处）

    Jekyll 引擎将自动加载此目录中的所有数据文件（使用 `.yml`、 `.yaml`、`.json`、 `.csv`或 `.tsv` 格式和扩展名），并且可以通过 `site.data` 访问它们。
    
    例如目录下有文件 `members.yml`，则可以通过 `site.data.members` 访问。

+ `_includes` （可以复用在其它页面被include的html页面）

    `{% include head.html %}`

+ ~~`_posts`（博客文章页面）~~
+ `assets`（原生的资源文件）
+ `_sass`（存放样式表）
+ `js`
+ `css`
+ `image`
+ `index.html`, `index.md`, `README.md` （首页index.html优先级最高，如果没有index，默认启用README.md文件）

更多默认的目录结构参看jekyll官网：<https://jekyllrb.com/docs/structure/>

## 样式

```bash
assets
└── css
    └── common.scss
_include
└── css
    └── xx-theme.scss.liquid
_sass
├── color_schemes
├── support
├── modules
└── custom
```

调用顺序

common.scss 》 xx-theme.scss.liquid 》 _sass/*

+ `color_schemes` - 最外层的样式，
+ `support` - 最底层样式（基本不要动）
+ `modules` - theme 不同组件样式
+ `custom` - 自定义