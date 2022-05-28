---
layout: home
title: 
---

<style type='text/css'>
{%- assign style_logo_margin = '20px' -%}
#index_logo {
  float: right;
  width: 100px;
  height: 100px;
  margin-left: {{style_logo_margin}};
  margin-bottom: {{style_logo_margin}};
}
</style>

<img id='index_logo' src='{{ site.favicon | relative_url }}'/>

Welcome to my Blog. Below are some of my articles.

<img id='' src='{%- include tools/get_site_url.liquid file_name='coderman.gif' type='assets/images' -%}'/>