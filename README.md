<p align="right">
<!--
[![Gem Version](https://img.shields.io/gem/v/jekyll-text-theme.svg)](https://github.com/LawssssCat/lawsssscat.github.io/releases)
-->
<!--[![license](https://img.shields.io/github/license/LawssssCat/lawsssscat.github.io.svg)](https://github.com/LawssssCat/lawsssscat.github.io/master/LICENSE)-->
<!--
[![Travis](https://img.shields.io/travis/kitian616/jekyll-TeXt-theme.svg)](https://github.com/LawssssCat/LawssssCat.github.io/actions)
-->
    <a href="https://github.com/LawssssCat/LawssssCat.github.io/master/LICENSE">
        <img src="https://img.shields.io/github/license/LawssssCat/lawsssscat.github.io.svg" alt="LICENSE">
    </a>
    <a href="https://LawssssCat.github.io">
        <img src="https://shields-staging.herokuapp.com/github/deployments/LawssssCat/LawssssCat.github.io/github-pages.svg?logo=github&label=github%20pages%20deploy" alt="github pages status">
    </a>
</p>
<br><br>
<p align="center">
    <h1 align="center">LawssssCat's Blog</h1>
    <p align="center">用 jekyll 搭建的静态博客</p>
    <p align="center">
    <img src="https://img.shields.io/github/repo-size/LawssssCat/LawssssCat.github.io" alt="GitHub repo size">
    <img src="https://img.shields.io/github/commit-activity/m/LawssssCat/LawssssCat.github.io" alt="GitHub commit activity">
    <img src="https://img.shields.io/github/last-commit/LawssssCat/LawssssCat.github.io" alt="GitHub last commit (branch)">
    </p>
    <!--
    <p align="center"><strong><a href="https://just-the-docs.github.io/just-the-docs/">See it in action!</a></strong></p>
    -->
    <br><br><br>
</p>

### 开始

环境

```bash
# 安装 ruby（语言环境）
sudo apt-get install ruby-full build-essential zlib1g-dev
# 安装 jekyll（博客项目构建工具）、bundler（运行环境）
gem install bundler jekyll
# 下载依赖
bundle install
```

运行

```bash
cd docs
# 构建项目并启动
bundle exec jekyll serve
```

（可选）生成搜索索引 

```bash
# 生成搜索索引 
# (可选)
# 创建 assets/js/zzzz-search-data.json
# 
# 如果您使用 Just the Docs 作为远程主题，则不需要运行
# 如果您将主题用作 gem，则必须通过运行
bundle exec just-the-docs rake search:init
```

demo: <https://LawssssCat.github.io>



### 目录结构

```bash
./docs
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

更多更详细的目录结构参看jekyll官网：<https://jekyllrb.com/docs/structure/>

### 自定义样式

文档：<https://just-the-docs.github.io/just-the-docs/docs/customization/>


添加文件 `_sass/color_schemes/foo.scss`

```bash
$link-color: $blue-000;
```
> 不要修改 `_sass/support/variables.scss`。否则，会引起其他错误。

**指定样式（静态）**：修改文件 `_config.yml`

```bash
color_scheme: foo
```

**指定样式（动态）**：加载样式，并用js调用

页面加载样式

```bash
---
---
{% include css/just-the-docs.scss.liquid color_scheme="foo" %}
```

```js
jtd.setTheme("foo")
```

### Front Matter

文档：<https://jekyllrb.com/docs/front-matter/>

### 测边栏

文档：<https://just-the-docs.github.io/just-the-docs/docs/navigation-structure/#excluding-pages>

```bash
+-- ..
|-- (Jekyll files)
|
|-- docs
|   |-- ui-components
|   |   |-- index.md  (parent page)
|   |   |-- buttons.md
|   |   |-- code.md
|   |   |-- labels.md
|   |   |-- tables.md
|   |   +-- typography.md
|   |
|   |-- utilities
|   |   |-- index.md      (parent page)
|   |   |-- color.md
|   |   |-- layout.md
|   |   |-- responsive-modifiers.md
|   |   +-- typography.md
|   |
|   |-- (other md files, pages with no children)
|   +-- ..
|
|-- (Jekyll files)
+-- ..
```

`.../ui-components/index.md`
```bash
---
# layout: default
title: a title
# nav_exclude: true 排除被视为侧边栏节点
nav_order: 2
parent: UI Components
has_children: true
has_toc: false

search_exclude: true
---

nav_order 同一级别下的顺序
has_children true 告诉我们这是一个父页面
has_toc false 不生成子页面表格

search_exclude true 从搜索中隐藏页面
```

`.../ui-components/buttons.md`
```bash
---
title: buttons.md
nav_order: 2
parent: UI Components
---

parent 指定父节点
```

### 目录（可折叠）

文档：<https://just-the-docs.github.io/just-the-docs/docs/navigation-structure/#in-page-navigation-with-table-of-contents>

```bash
<details open markdown="block">
  <summary>
    Table of contents
  </summary>
  {: .text-delta }
1. TOC
{:toc}
</details>

## title1 show

## title2 no show 
{: .no_toc }
```

### 更多效果

<https://just-the-docs.github.io/just-the-docs/docs/index-test/>

### 感谢

+ [Github Pages](https://docs.github.com/categories/github-pages-basics/) - 提供项目运行环境
+ [jekyll](https://jekyllrb.com/) - 提供一键式静态博客搭建程序
+ ~~[TeXt Theme](https://github.com/kitian616/jekyll-TeXt-theme) - 提供 jekyll 主题~~
+ [Just the Docs](https://github.com/just-the-docs/just-the-docs) - 提供 jekyll 主题
