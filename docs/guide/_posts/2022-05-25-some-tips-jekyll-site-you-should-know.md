---
tags: ['jekyll', "markdown ð", 'tips ð¡']
---


## å³äº jekyll

### _config.yml

_config.yml æ¯æ´ä¸ªç«ç¹çæ´ä½éç½®ï¼ä»¥ä¸æ¯ææéç½®é¡¹åé»è®¤å¼

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

## å³äº markdown

### æå® style

è¿ä¸ªæ¯ kramdown çè¯­æ³å `{:height="36px" width="36px"}` ã
ä½ å¯ä»¥ææ ·å¼å å¨å¾çåé¢ï¼e.g.

```
![smiley](http://xxx/1.img){:height="36px" width="36px"}
```

ä¹å¯ä»¥éè¿è¿ä¸ªæå® css çç±»ï¼e.g. 

```
`import re`{:.language-python}
```

#### å±æ§åè¡¨å®ä¹ {#Attribute-List-Definitions}

ALDè¡å·æä»¥ä¸ç»æï¼

å·¦æ¬å·ï¼å¯éåé¢æå¤ä¸ä¸ªç©ºæ ¼ï¼
ç¶åæ¯åå·ï¼å¼ç¨åç§°åå¦ä¸ä¸ªåå·ï¼
ç¶åæ¯å±æ§å®ä¹ï¼åè®¸çå­ç¬¦æ¯åææ è½¬ä¹å³é­æ¬å·æé¤äºæªè½¬ä¹çå³æ¬å·ä¹å¤çä»»ä½å­ç¬¦ï¼ï¼
ç¶åæ¯ä¸ä¸ªå³æ¬å·åå¯éç©ºæ ¼ï¼ç´å°è¡å°¾

> å¼ç¨åç§°éè¦ä»¥åè¯å­ç¬¦ææ°å­å¼å¤´ï¼å¯éå°åè·å¶ä»åè¯å­ç¬¦ï¼æ°å­æç­åçº¿  
> æåç§ä¸åç±»åçå±æ§å®ä¹ï¼å¿é¡»ç¨ä¸ä¸ªæå¤ä¸ªç©ºæ ¼åé

> å¦æä¸å­å¨å·ææ­¤å¼ç¨åç§°çå±æ§å®ä¹åè¡¨ï¼åå¨æ¶éå±æ§æ¶å°å¿½ç¥å¼ç¨åç§°


```
{:ref-name: #myid .my-class}
{:other: ref-name #id-of-other title="hallo you"}
{:test: key="value \" with quote" and other='quote brace \}'}
```
```
# ä»¥ä¸ALDé½æ¯ç­æçï¼

{:id: .cls1 .cls2}
{:id: class="cls1" .cls2}
{:id: class="something" class="cls1" .cls2}
{:id: class="cls1 cls2"}
```

#### åèå±æ§åè¡¨ {#Inline-Attribute-Lists}

> æ­¤åçº§åç´ ç¨äºå°å±æ§éå å°å¦ä¸ä¸ªåçº§åç´   
> ååèå±æ§åè¡¨ï¼åIALï¼å·æä¸ALDç¸åçç»æ

> åIALï¼æä¸¤ä¸ªæå¤ä¸ªåIALï¼å¿é¡»ç´æ¥æ¾å¨å±æ§åºéå å°çåçº§åç´ ä¹åæä¹åã  
> å¦æåIALç´æ¥å¨åçº§åç´ ä¹ååä¹åï¼åå°å¶åºç¨äºåä¸åç´ ãå¨ææå¶ä»æåµ  
> ä¸ï¼åIALè¢«å¿½ç¥ï¼ä¾å¦ï¼å½åIALè¢«ç©ºè¡åå´æ¶

> å¨å¼ç¨çALDä¸­ï¼IALçé®å¼å¯¹ **ä¼åäºååçé®å¼å¯¹**


~~~
# ä»¥ä¸æ¯åIALçä¸äºç¤ºä¾ï¼

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


#### Span åèå±æ§åè¡¨ {#span_ial}
> span çº§åç´ çååèå±æ§åè¡¨çä¸ä¸ªçæ¬

> å®å·æä¸åIALç¸åçç»æï¼é¤äºä¸åè®¸åå¯¼åå°¾éç©ºæ ¼  
> è·¨åº¦IALï¼æä¸¤ä¸ªææ´å¤è·¨åº¦IALï¼å¿é¡»ç´æ¥æ¾å¨åºè¯¥åº  
> ç¨å®çspan-levelåç´ ä¹åï¼ä¹é´ä¸åè®¸æå¶ä»å­ç¬¦ï¼å¦åå®å°è¢«å¿½ç¥å¹¶ä»ä»è¾åºä¸­å é¤


~~~
This *is*{:.underline} some `code`{:#id}{:.class}.
A [link](test.html){:rel='something'} and some **tools**{:.tools}.
~~~

#### æ©å± {#Extensions}
> æ©å±æä¾äºå¶ä»åè½ï¼ä½ä½¿ç¨ç¸åçè¯­æ³ãå®ä»¬æ¢å¯ä»¥ä½ä¸ºåä¹å¯ä»¥ä½ä¸ºè·¨åº¦çº§åç´ ä½¿ç¨   
>æ©å±çè¯­æ³ä¸ALDçè¯­æ³éå¸¸ç¸ä¼¼

~~~
# ç¤ºä¾

{::comment}
This text is completely ignored by kramdown - a comment in the text.
{:/comment}

Do you see {::comment}this text{:/comment}?
{::comment}some other comment{:/}

{::options key="val" /}
~~~

- ä¸ä¸ªå·¦å¤§æ¬å·ï¼
- æ¥çæ¯ä¸¤ä¸ªåå·åæ©å±åï¼
- å¯éå°åè·ç©ºæ ¼åå±æ§å®ä¹ï¼åè®¸çå­ç¬¦æ¯åææ è½¬ä¹å³é­æ¬å·æé¤äºæªè½¬ä¹çå³æ¬å·ä¹å¤çä»»ä½å­ç¬¦|åALD
- ç¶åæ¯æçº¿åå³å¤§æ¬å·ï¼å¦ææ©å±æ²¡ææ­£æï¼æåªæå³å¤§æ¬å·ï¼å¦ææ©å±ææ­£æï¼

~~~
# kramdownå¯ä»¥ä½¿ç¨ä»¥ä¸æ©å±åï¼

comment
å°æ­£æææ¬è§ä¸ºæªå¨è¾åºä¸­æ¾ç¤ºçæ³¨é

nomarkdown
ä¸è¦ä½¿ç¨kramdownå¤çä¸»ä½ï¼èæ¯æåæ ·è¾åºãè¯¥å±æ§typeæå®åªäºè½¬æ¢å¨åºè¾åºæ­£æï¼å¦æç¼ºå°è¯¥å±æ§ï¼åææè½¬æ¢å¨é½åºè¾åºè¯¥å±æ§ãå¦åï¼å±æ§å¼å¿é¡»æ¯ä»¥ç©ºæ ¼åéçè½¬æ¢å¨åç§°åè¡¨ï¼å¹¶ä¸è¿äºè½¬æ¢å¨åºè¾åºæ­£æã

options
ç±äºæ­£æè¢«å¿½ç¥ï¼åºè¯¥å¨æ²¡ææ­£æçæåµä¸ä½¿ç¨ãç¨äºè®¾ç½®kramdownå¤çå¨çå¨å±éé¡¹ï¼ä¾å¦ï¼ç¦ç¨èªå¨æ å¤´IDçæï¼ãè¯·æ³¨æï¼è§£æå¨ä½¿ç¨çéé¡¹ç«å³çæï¼èææå¶ä»éé¡¹é½ä¸æ¯ï¼è¿æå³çï¼ä¾å¦ï¼ä¸è½ä»ä¸ºkramdownææ¡£çæäºé¨åè®¾ç½®è½¬æ¢å¨éé¡¹
~~~

{::comment}
This text is completely ignored by kramdown - a comment in the text.
{:/comment}

Do you see {::comment}this text{:/comment}?
{::comment}some other comment{:/}

{::options key="val" /}

### èæ³¨ {#Footnotes}

~~~
äººææ²æ¬¢ç¦»åï¼ææé´æ´åç¼º.[^1]

[^1]: ãæ°´è°æ­å¤´ã
~~~

### ç¼©ç¥è¯­ {#Abbreviations}

~~~
*[another language]: It's called Markdown

*[WTF]: What the fuck
~~~

another language

*[another language]: It's called Markdown

.md

*[.md]: suffix of `markdown file`

other see 
+ ã48 ä¸ªä½ éè¦ç¥éç Jekyll ä½¿ç¨æå·§ã - <https://crispgm.com/page/48-tips-for-jekyll-you-should-know.html>
