---
title: /post_file_name/g
tags: ['jekyll', "markdown 📓", 'tips 💡']
---


## 关于 jekyll

### _config.yml

_config.yml 是整个站点的整体配置，以下是所有配置项和默认值

```yml
# Where things are
source:       .
destination:  ./_site
plugins_dir:  _plugins
layouts_dir:  _layouts
data_dir:     _data
includes_dir: _includes
collections:
  posts:
    output:   true

# Handling Reading
safe:         false
include:      [".htaccess"]
exclude:      ["node_modules", "vendor/bundle/", "vendor/cache/", "vendor/gems/", "vendor/ruby/"]
keep_files:   [".git", ".svn"]
encoding:     "utf-8"
markdown_ext: "markdown,mkdown,mkdn,mkd,md"

# Filtering Content
show_drafts: null
limit_posts: 0
future:      false
unpublished: false

# Plugins
whitelist: []
gems:      []

# Conversion
markdown:    kramdown
highlighter: rouge
lsi:         false
excerpt_separator: "\n\n"
incremental: false

# Serving
detach:  false
port:    4000
host:    127.0.0.1
baseurl: "" # does not include hostname
show_dir_listing: false

# Outputting
permalink:     date
paginate_path: /page:num
timezone:      null

quiet:    false
verbose:  false
defaults: []

liquid:
  error_mode: warn

# Markdown Processors
rdiscount:
  extensions: []

redcarpet:
  extensions: []

kramdown:
  auto_ids:       true
  footnote_nr:    1
  entity_output:  as_char
  toc_levels:     1..6
  smart_quotes:   lsquo,rsquo,ldquo,rdquo
  input:          GFM
  hard_wrap:      false
  footnote_nr:    1
```

## 关于 markdown

### 指定 style

这个是 kramdown 的语法像 `{:height="36px" width="36px"}` 。
你可以把样式加在图片后面，e.g.

```
![smiley](http://xxx/1.img){:height="36px" width="36px"}
```

也可以通过这个指定 css 的类，e.g. 

```
`import re`{:.language-python}
```

#### 属性列表定义 {#Attribute-List-Definitions}

ALD行具有以下结构：

左括号，可选前面最多三个空格，
然后是冒号，引用名称和另一个冒号，
然后是属性定义（允许的字符是反斜杠转义关闭括号或除了未转义的右括号之外的任何字符），
然后是一个右括号和可选空格，直到行尾

> 引用名称需要以单词字符或数字开头，可选地后跟其他单词字符，数字或短划线  
> 有四种不同类型的属性定义，必须用一个或多个空格分隔

> 如果不存在具有此引用名称的属性定义列表，则在收集属性时将忽略引用名称


```
{:ref-name: #myid .my-class}
{:other: ref-name #id-of-other title="hallo you"}
{:test: key="value \" with quote" and other='quote brace \}'}
```
```
# 以下ALD都是等效的：

{:id: .cls1 .cls2}
{:id: class="cls1" .cls2}
{:id: class="something" class="cls1" .cls2}
{:id: class="cls1 cls2"}
```

#### 内联属性列表 {#Inline-Attribute-Lists}

> 此块级元素用于将属性附加到另一个块级元素  
> 块内联属性列表（块IAL）具有与ALD相同的结构

> 块IAL（或两个或多个块IAL）必须直接放在属性应附加到的块级元素之前或之后。  
> 如果块IAL直接在块级元素之后和之前，则将其应用于前一元素。在所有其他情况  
> 下，块IAL被忽略，例如，当块IAL被空行包围时

> 在引用的ALD中，IAL的键值对 **优先于同名的键值对**


~~~
# 以下是块IAL的一些示例：

A simple paragraph with an ID attribute.
{: #para-one}

> A blockquote with a title
{:title="The blockquote title"}
{: #myid}

{:.ruby}
    Some code here
~~~

e.g. 
{:.ruby}


#### Span 内联属性列表 {#span_ial}
> span 级元素的块内联属性列表的一个版本

> 它具有与块IAL相同的结构，除了不允许前导和尾随空格  
> 跨度IAL（或两个或更多跨度IAL）必须直接放在应该应  
> 用它的span-level元素之后，之间不允许有其他字符，否则它将被忽略并仅从输出中删除


~~~
This *is*{:.underline} some `code`{:#id}{:.class}.
A [link](test.html){:rel='something'} and some **tools**{:.tools}.
~~~

#### 扩展 {#Extensions}
> 扩展提供了其他功能，但使用相同的语法。它们既可以作为块也可以作为跨度级元素使用   
>扩展的语法与ALD的语法非常相似

~~~
# 示例

{::comment}
This text is completely ignored by kramdown - a comment in the text.
{:/comment}

Do you see {::comment}this text{:/comment}?
{::comment}some other comment{:/}

{::options key="val" /}
~~~

- 一个左大括号，
- 接着是两个冒号和扩展名，
- 可选地后跟空格和属性定义（允许的字符是反斜杠转义关闭括号或除了未转义的右括号之外的任何字符|同ALD
- 然后是斜线和右大括号（如果扩展没有正文）或只有右大括号（如果扩展有正文）

~~~
# kramdown可以使用以下扩展名：

comment
将正文文本视为未在输出中显示的注释

nomarkdown
不要使用kramdown处理主体，而是按原样输出。该属性type指定哪些转换器应输出正文：如果缺少该属性，则所有转换器都应输出该属性。否则，属性值必须是以空格分隔的转换器名称列表，并且这些转换器应输出正文。

options
由于正文被忽略，应该在没有正文的情况下使用。用于设置kramdown处理器的全局选项（例如，禁用自动标头ID生成）。请注意，解析器使用的选项立即生效，而所有其他选项都不是！这意味着，例如，不能仅为kramdown文档的某些部分设置转换器选项
~~~

{::comment}
This text is completely ignored by kramdown - a comment in the text.
{:/comment}

Do you see {::comment}this text{:/comment}?
{::comment}some other comment{:/}

{::options key="val" /}

### 脚注 {#Footnotes}

~~~
人有悲欢离合，月有阴晴圆缺.[^1]

[^1]: 《水调歌头》
~~~

### 缩略语 {#Abbreviations}

~~~
*[another language]: It's called Markdown

*[WTF]: What the fuck
~~~

another language

*[another language]: It's called Markdown

.md

*[.md]: suffix of `markdown file`

other see 
+ 《48 个你需要知道的 Jekyll 使用技巧》 - <https://crispgm.com/page/48-tips-for-jekyll-you-should-know.html>
