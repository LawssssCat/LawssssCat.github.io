---
layout: page
title: home page
---

![logo]({{ site.favicon | relative_url }}){:.logo}

Welcome to my Blog. Below are some of my articles.

<!--posts filter-->
<div id="search-wrapper">
    <ul id="category-list" class="category-list">
        {% for category in site.categories %}
          {% assign category_id = category[0] %}
          {% assign category = category[1] %}
          {% capture category_label %}{% include tools/get_category_attribute attribute='label' category_id=category_id %}{% endcapture %}
          {% capture category_description %}{% include tools/get_category_attribute attribute='description' category_id=category_id %}{% endcapture %}
          {% if category_data and category_data.show != false %}
            <li><a href="#+{{ category_label | downcase }}" 
            data-description="{{ category_description }}">
            {{ category_label }}</a></li>
          {% endif %}
        {% endfor %}
    </ul>
    <input id="post-search" type="text" placeholder="Search among {{ site.posts | size }} posts: <title> +<category> ..."/>
</div>

<!--posts shower-->
<div id="post-table-wrapper">
    <table id="post-table">
        <thead>
            <tr>
                <th>Title</th>
                <th>Category</th>
            </tr>
        </thead>
        <tbody>
            {% for post in site.posts %}
            <tr>
                <td><a href="{{ post.url | relative_url}}" class="post-name">{% include tools/get_post_attribute attribute='name'%}</a></td>
                <td>
                  <ul class="category-list">
                      {% for category_id in post.categories %}
                        {% capture category_description %}{% include tools/get_category_attribute attribute='description' category_id=category_id %}{% endcapture %}
                        {% capture category_label %}{% include tools/get_category_attribute attribute='label' category_id=category_id %}{% endcapture %}
                        <li><a href="#+{{ category_label | downcase }}" 
                        data-description="{{ category_description }}">{{ category_label }}</a></li>
                      {% endfor %}
                  </ul>
                </td>
            </tr>
            {% endfor %}
        </tbody>
        <tfoot>
            <tr><td id="search-message" colspan="2">No post matches...</td></tr>
        </tfoot>
    </table>
</div>

<!--todo js -->
