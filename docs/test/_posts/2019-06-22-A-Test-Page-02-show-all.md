---
categories: ["erro rforo   o", ""]
---
{% toc %}

---

site time {{ site.time }}

site {{ site }}

{{ site.github-button }}

{{ site.github-corner }}

---

---

pages {{ site.pages.size }}

posts {{ site.posts.size }} 

# see <https://jekyllrb.com/docs/step-by-step/08-blogging/>
<h1>Latest Posts</h1>
<ul>
  {% for post in site.posts %}
    <li>
      <h2><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h2>
      {{ post.excerpt }}
    </li>
  {% endfor %}
</ul>

collections {{ site.collections }}

---

# see <https://jekyllrb.com/docs/collections/>

{% for collection in site.collections %}
  <h2>{{ collection.label }}</h2>
  <ul>
  {% for item in site[collection.label] %}
    <li>
      <h2><a href="{{ item.url | relative_url }}">{{ item.title }}</a></h2>
      {{ item.excerpt }}
    </li>
  {% endfor %}
  </ul>
{% endfor %}

---


