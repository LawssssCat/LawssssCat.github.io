---
title: How to write Markdown in site
tags: ["markdown 📓", 'rules for this project 🏘️']
---

## How to write markdown

markdown base grammar.

see <https://learn-the-web.algonquindesign.ca/topics/markdown-yaml-cheat-sheet/#markdown>

Jekyll's smartify filter uses kramdown as a processor.

see:
+ kramdown offical website - <https://kramdown.gettalong.org/options.html>
+ 《kramdown基本语法》 - <https://zhuanlan.zhihu.com/p/60838339>

## ~~toc~~

see <https://github.com/toshimaru/jekyll-toc>

{% raw %}
```liquid
{% toc %}
```
{% endraw %}

## Front Matter :star:

see <https://jekyllrb.com/docs/step-by-step/03-front-matter/><br>
see <https://jekyllrb.com/docs/configuration/front-matter-defaults/>

In addition to `_posts` , you need to add Front Matter to the front of the md, with at least `---`, so it can be compiled and publish to `_site`. Otherwise, it will be publish as `.md` and cannot be accessed. (this just is a phenomenon i found in jekyll)

e.g. 

```liquid
---

or 

---
title: balabala
---
```

## Tags and Categories

see <https://jekyllrb.com/docs/posts/#tags-and-categories>

e.g. 

```bash
---
tags: ["classic", "hollywood"]

categories: classic hollywood
---
```

> According to my habit of managing articles, there is only one category for a thing, and there can be multiple tags. Therefore, category is what it is and the labels are used to suggest related properties. For example, the category of mysql is `mysql` and the label can be `operation`, `database` and so on.

```bash
docs
├─guide
│  └─_posts
│    └─2019-05-21-How-to-write-Markdown-in-site.md
└─test
    └─_posts
     │ 2019-06-21-A-Test-Page-01.md
     └─2019-06-22-A-Test-Page-02-show-all.md
```

## Variables 

this site use template language "liquid"(see <http://shopify.github.io/liquid/>), there are variables(see <https://jekyllrb.com/docs/variables/#site-variables>) we can use.

e.g. 

```liquid
{% raw %}{{ page.title }}{% endraw %}
```

## Include

you can include other html that is in your site into this html.

see <https://jekyllrb.com/docs/includes/#passing-parameter-variables-to-includes>

e.g. 

{% raw %}```liquid
## include _include/note.html
{% include note.html content="This is my sample note." %}
## in the include html you can use the variable that you deliver .
{{ include.content }}

## You can alse include content not within the _includes directory
{% include_relative _posts/2014-09-03-my-file.markdown %}
```{% endraw %}


## Raw 

In liquid, we can use "raw ... endraw" to prevent paragraphs from being parsed.

e.g.

```bash
{% raw %}{% {% endraw %}raw %}
{% raw %}In Handlebars, {{ this }} will be HTML-escaped, but {{{ that }}} will not.{% endraw %}
{% raw %}{% {% endraw %}endraw %} 
```