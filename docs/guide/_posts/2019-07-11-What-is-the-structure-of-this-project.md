---
tags: ["this project structure", 'rules for this project ðï¸']
---

## é»è®¤çç®å½ç»æ

```bash
.
âââ _config.yml
âââ _data
â   âââ members.yml
âââ _drafts
â   âââ begin-with-the-crazy-ideas.md
â   âââ on-simplicity-in-technology.md
âââ _includes
â   âââ footer.html
â   âââ header.html
âââ _layouts
â   âââ default.html
â   âââ post.html
âââ _posts
â   âââ 2007-10-29-why-every-programmer-should-play-nethack.md
â   âââ 2009-04-26-barcamp-boston-4-roundup.md
âââ _sass
â   âââ _base.scss
â   âââ _layout.scss
âââ _site
âââ .jekyll-cache
â   âââ Jekyll
â       âââ Cache
â           âââ [...]
âââ .jekyll-metadata
âââ index.html # can also be an 'index.md' with valid front matter
```

æä»¬åªéè¦å³æ³¨å ä¸ªæ ¸å¿çç®å½ç»æå¦ä¸ï¼å¯ä»¥èªå·±åå»ºï¼ï¼

+ `_config.yml` ï¼å¨å±éç½®æä»¶ï¼
+ `_layouts` ï¼å­æ¾é¡µé¢æ¨¡æ¿ï¼mdæhtmlæä»¶çåå®¹ä¼å¡«åæ¨¡æ¿ï¼

    æç« å¤´æ·»å ä¸é¢æ è¯åºç¨æ¨¡æ¿

    ```bash
    ---
    layout: default
    ---
    ```

+ `_data` ï¼æ ¼å¼è¯å¥½çç«ç¹æ°æ®åºæ¾å¨æ­¤å¤ï¼

    Jekyll å¼æå°èªå¨å è½½æ­¤ç®å½ä¸­çæææ°æ®æä»¶ï¼ä½¿ç¨ `.yml`ã `.yaml`ã`.json`ã `.csv`æ `.tsv` æ ¼å¼åæ©å±åï¼ï¼å¹¶ä¸å¯ä»¥éè¿ `site.data` è®¿é®å®ä»¬ã
    
    ä¾å¦ç®å½ä¸ææä»¶ `members.yml`ï¼åå¯ä»¥éè¿ `site.data.members` è®¿é®ã

+ `_includes` ï¼å¯ä»¥å¤ç¨å¨å¶å®é¡µé¢è¢«includeçhtmlé¡µé¢ï¼

    {% raw %}`{% include head.html %}`{% endraw %}

+ ~~`_posts`ï¼åå®¢æç« é¡µé¢ï¼~~
+ `assets`ï¼åççèµæºæä»¶ï¼
+ `_sass`ï¼å­æ¾æ ·å¼è¡¨ï¼
+ `js`
+ `css`
+ `image`
+ `index.html`, `index.md`, `README.md` ï¼é¦é¡µindex.htmlä¼åçº§æé«ï¼å¦ææ²¡æindexï¼é»è®¤å¯ç¨README.mdæä»¶ï¼

æ´å¤é»è®¤çç®å½ç»æåçjekyllå®ç½ï¼<https://jekyllrb.com/docs/structure/>

## æ ·å¼

```bash
assets
âââ css
    âââ common.scss
_include
âââ css
    âââ xx-theme.scss.liquid
_sass
âââ color_schemes
âââ support
âââ modules
âââ custom
```

è°ç¨é¡ºåº

common.scss ã xx-theme.scss.liquid ã _sass/*

+ `color_schemes` - æå¤å±çæ ·å¼ï¼
+ `support` - æåºå±æ ·å¼ï¼åºæ¬ä¸è¦å¨ï¼
+ `modules` - theme ä¸åç»ä»¶æ ·å¼
+ `custom` - èªå®ä¹