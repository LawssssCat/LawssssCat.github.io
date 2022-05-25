(function(utils) {
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
})({
});