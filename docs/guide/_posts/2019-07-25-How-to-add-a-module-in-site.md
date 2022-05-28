---
tags: ['rules for this project 🏘️']
---

step: code 

1. `./_include/modules/` - write the `html code` of modules.
3. `./_sass/modules/` - write the `scss code` of modules. (first, you should `@import(...)` the new sass file in `./_sass/modules/modules-list.scss`)
4. `./assets/js/modules/` - write the `js code` of modules.

step: use

1. if you plan to use the html of the module, you should just use `{% raw %}{%- include your_module.html -%}{% endraw %}`.

    if you alse plan to use `js/css`, you should add a front matter with the name equals layout name and the value equals the name that the module name that you plan to use append `_modules`. And then add the layout name into `_data/layout.yml`.

e.g. 

you can take the module `post_table` as an example.

the module `post_table` is used in `home` layout 

```
{% raw %}---
.... other front matter ....
home_modules: ["post_table"]
.... other front matter ....
---

.... other content ....
{%- include modules/post_table.html -%}
.... other content ....{% endraw %}
```

and add `home` into `_data/layout.yml`

```
name:
...........other
  - home
...........other
```