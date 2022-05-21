---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

# layout: home
nav_exclude: true

---

# H1
## h2
### h3
#### h4
##### h5
###### h6

line1
line2

line3

```bash
echo haha
```

```json
{
    b: ['a', 'b'],
    "oo": function() {
        console.log("bb");
    }
}
```







Body text


Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.


Inline elements


Text can be **bold**, _italic_, or ~~strikethrough~~.

[Link to another page](another-page).








a | b | c
--- | --- | :---
aa | bb | cc





This paragraph will have a margin bottom of 1rem/16px at large screens.
{: .mb-lg-4 , mx-auto}

This paragraph will have a margin bottom of 1rem/16px at large screens.
{: .mx-auto}

This paragraph will have 2rem/32px of padding on the right and left at all screen sizes.
{: .px-6 }



This button will be hidden until medium screen sizes:

[ A button ](#url)
{: .d-none .d-md-inline-block }

These headings will be `inline-block`:

### heading 3
{: .d-inline-block }

### heading 3
{: .d-inline-block }

End

In Markdown, use the `{: }` wrapper to apply custom classes:

Font size 1
{: .fs-1 }
Font size 2
{: .fs-2 }
Font size 3
{: .fs-3 }
Font size 4
{: .fs-4 }
Font size 5
{: .fs-5 }
Font size 6
{: .fs-6 }
Font size 7
{: .fs-7 }
Font size 8
{: .fs-8 }
Font size 9
{: .fs-9 }
Font size 10
{: .fs-10 }

In Markdown, use the `{: }` wrapper to apply custom classes:

Font weight 300
{: .fw-300 }
Font weight 400
{: .fw-400 }
Font weight 500
{: .fw-500 }
Font weight 700
{: .fw-700 }

In Markdown, use the `{: }` wrapper to apply custom classes:

No Line height
No Line height
{: .lh-0 }

Tight line height
Tight line height
{: .lh-tight }

Default line height
Default line height
{: .fh-default }


Default label
{: .label }

Blue label
{: .label .label-blue }

Stable
{: .label .label-green }

New release
{: .label .label-purple }

Coming soon
{: .label .label-yellow }

Deprecated
{: .label .label-red }


| head1        | head two          | three |
|:-------------|:------------------|:------|
| ok           | good swedish fish | nice  |
| out of stock | good and plenty   | nice  |
| ok           | good `oreos`      | hmm   |
| ok           | good `zoute` drop | yumm  |


- Item 1
- Item 2
- Item 3

_or_

* Item 1
* Item 2
* Item 3

1. Item 1
1. Item 2
1. Item 3

- [ ] hello, this is a todo item
- [ ] hello, this is another todo item
- [x] goodbye, this item is done

<dl>
  <dt>Name</dt>
  <dd>Godzilla</dd>
  <dt>Born</dt>
  <dd>1952</dd>
  <dt>Birthplace</dt>
  <dd>Japan</dd>
  <dt>Color</dt>
  <dd>Green</dd>
</dl>

Lorem ipsum dolor sit amet, `<inline code snippet>` adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

## Heading with `<inline code snippet>` in it.

```js
// Javascript code with syntax highlighting.
var fun = function lang(l) {
  dateformat.i18n = require('./lang/' + l)
  return true;
}
```

Code blocks with rendered examples
To demonstrate front end code, sometimes it’s useful to show a rendered example of that code. After including the styles from your project that you’ll need to show the rendering, you can use a <div> with the code-example class, followed by the code block syntax. If you want to render your output with Markdown instead of HTML, use the markdown="1" attribute to tell Jekyll that the code you are rendering will be in Markdown format… This is about to get meta…

<div class="code-example" markdown="1">

[Link button](http://example.com/){: .btn }

</div>
```markdown
[Link button](http://example.com/){: .btn }
```

{% highlight some_language %}
Some code
{% endhighlight %}

解决方法
要将 HTML 压缩与行号一起使用，所有突出显示的代码都需要使用以下解决方法之一进行包装。some_var（可以更改变量名以避免冲突；也可以将其替换为code- 但请注意code=code不能删除）。

代码围栏（三个反引号）

{% capture some_var %}
```some_language
Some code
```
{% endcapture %}
{% assign some_var = some_var | markdownify %}
{% include fix_linenos.html code=some_var %}

液体高亮
{% capture some_var %}
{% highlight some_language linenos %}
Some code
{% endhighlight %}
{% endcapture %}
{% include fix_linenos.html code=some_var %}

信用：上述解决方法的原始版本由 Dmitry Hrabrov 在<https://github.com/penibelst/jekyll-compress-html/issues/71#issuecomment-188144901>建议。