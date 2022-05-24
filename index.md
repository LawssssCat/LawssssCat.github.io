---
layout: page
title: 
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
          {% if site.data.categories[category_id].show != false %}
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
                <td><a href="{{ post.url | relative_url}}" class="post-title">{% include tools/get_post_attribute attribute='title' post=post %}</a></td>
                <td>
                  <ul class="category-list">
                      {% for category_id in post.categories %}
                        {% if site.data.categories[category_id].show != false %}
                          {% capture category_description %}{% include tools/get_category_attribute attribute='description' category_id=category_id %}{% endcapture %}
                          {% capture category_label %}{% include tools/get_category_attribute attribute='label' category_id=category_id %}{% endcapture %}
                          <li><a href="#+{{ category_label | downcase }}" 
                          data-description="{{ category_description }}">{{ category_label }}</a></li>
                        {% endif %}
                      {% endfor %}
                  </ul>
                </td>
            </tr>
            {% endfor %}
        </tbody>
        <tfoot>
            <tr><td id="search-message-no-result" colspan="2">No post matches...</td></tr>
        </tfoot>
    </table>
</div>

<!--posts filter js-->
<script>
  function filter(query) {
    var queryArray = query.toLowerCase().trim().split(/ *(\+|\*)/);
    var postPattern = queryArray[0];
    var categoryPatterns = [];
    var mode;
    queryArray.splice(1).forEach((item) => {
      switch(item) {
        case '+': mode = '+'; break;
        case '*': mode = '*'; break;
        default:
          switch (mode) {
              case '+': categoryPatterns.push(item);break;
              default:console.log('error');break;
          }
          mode = '';
          break;
      }
    });

    // filter rows
    var noResults = true;
    document.querySelectorAll('#post-table tbody tr').forEach(function (row) {
        var show = true;

        var postName = row.getElementsByClassName('post-title')[0].innerHTML.toLowerCase();
        if (postName.indexOf(postPattern) == -1) {
            show = false;
        }

        if (show) { 
            var categoryElems = Array.from(row.getElementsByClassName('category-list')[0].children);
            categoryPatterns.forEach((pattern) => {
                // skip empty filters
                if (!pattern) {
                    return;
                }
                // check against the pattern
                var match = false;
                categoryElems.forEach((item) => {
                    if (item.innerText.trim().toLowerCase().startsWith(pattern.trim().toLowerCase())) {
                        item.classList.add('match');
                        match = true;
                    } else {
                        item.classList.remove('match');
                    }
                });
                // pattern against
                if(!match) {
                  show = false;
                }
            });
        }

        if (show) {
            row.style.display = '';
            noResults = false;
        } else {
            row.style.display = 'none';
        }
    });

    // update the search message visibility
    var searchMessage = document.getElementById('search-message-no-result');
    searchMessage.style.display = noResults ? 'table-cell' : 'none';
  }

  function applyFilter() {
    // filter on load according to the URL
    var searchBox = document.getElementById('post-search');
    var query = decodeURIComponent(location.hash.slice(1).split('?')[0]);
    filter(query);
    if (query) {
        searchBox.value = query;
    }
  }

  function setup() {
    // handle user input
    var searchBox = document.getElementById('post-search');
    searchBox.addEventListener('input', function () {
        var query = searchBox.value;
        history.replaceState(null, null, encodeURI('#' + query));
        applyFilter();
    });

    // handle shortcuts
    addEventListener('keydown', function (event) {
        // focus search box on valid keydown
        if (event.key.toLowerCase().match(/^[+a-z]$/) &&
            !(event.ctrlKey || event.altKey || event.metaKey)) {
            searchBox.focus();
            searchBox.parentElement.scrollIntoView();
        }
        // clear filter on escape
        else if (event.key === 'Escape') {
            location.hash = searchBox.value = '';
            searchBox.focus();
            searchBox.parentElement.scrollIntoView();
        }
    });

    // handle URL changes
    window.onhashchange = applyFilter;

    // trigger filter on page load
    applyFilter();
  }

 setup();
</script>
