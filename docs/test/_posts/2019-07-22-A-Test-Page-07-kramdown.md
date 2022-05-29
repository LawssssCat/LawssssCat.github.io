

# atx 风格标题 {#header}
```
#         一级
##
###
####
#####
######    六级
```


# 指定标头ID（{#head_id}）

###### I can help you  {#head_1}

HTML 内代码：
<h6 id="head_1">I can help you</h6>

# 引用 {#Blockquotes}

#### kramdown中 | 会被渲染，需要转义

> 引用文本\|单行

> 使用 `<br>` or 两个空格可  
> 以换行

# 空行 {# blank_line}


`<br>` or 两个空格

# Code {#code}

# Code

> 若Code内含有 "~" 符号，则只需要将 三个 **启动符号 "~"** 号多写几个就可以：


# 清单 {#Definition_Lists}

* kram
+ down
- now

1. kram
2. down
3. now

# 表格 {#Tables}


| Header One     | Header Two     |
| :------------- | :------------- |
| Item One       | Item Two       |

# 分割线 {#Horizontal_Rules}

* * *

---

  _  _  _  _

---------------

# HTML块 {#html_blocks}


> 如果HTML标记具有属性markdown="0"，则标记将被解析为原始HTML块。  
> 如果HTML标记具有属性markdown="1"，则使用此标记中用于解析语法的默认机制。  
> 如果HTML标记具有属性markdown="block"，则标记的内容将被解析为块级元素。  
> 如果HTML标记具有属性markdown="span"，则标记的内容将被解析为span级别元素


<div markdown="1">This is the first part of a para,
which is continued here.
</div>




<div markdown="2">This is the first part of a para,
which is continued here.
</div>

<div markdown="block">This is the first part of a para,
which is continued here.
</div>

<div markdown="span">This is the first part of a para,
which is continued here.
</div>

# 链接和图像 {#link_img}


![Image to icon]({%- include tools/get_site_url.liquid file_name='octo.gif' type='assets/images' -%}){:height="36px" width="36px"}

# 重点 {#Emphasis}


*some text*
_some text_
**some text**
__some text__

# 与代码块一样，可以使用IAL设置代码范围的语言

This is a Ruby code fragment `x = Class.new`{:.language-ruby}

# 单行代码 {#line_code}

与代码块一样，可以使用IAL设置代码范围的语言

This is a Ruby code fragment `x = Class.new`{:.language-ruby}

`import re`{:.language-python}

# 脚注 {#Footnotes}

人有悲欢离合，月有阴晴圆缺.[^1]

[^1]: 《水调歌头》

# 缩略语 {#Abbreviations}

[another language] another language

*[another language]: It's called Markdown

*[WTF]: What the fuck

# 属性列表定义 {#Attribute-List-Definitions}

see:
+ kramdown offical website - <https://kramdown.gettalong.org/options.html>
+ 《kramdown基本语法》 - <https://zhuanlan.zhihu.com/p/60838339>

