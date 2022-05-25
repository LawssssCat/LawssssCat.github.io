import common_url from '../common_url.js';

var searchBox = document.getElementById('post-search');
document.querySelectorAll("category-list category-item")
var searchPatternKey = 'search_text';

function searchBoxUpdate(query) {
  searchBox.value = query;
  applyFilter(searchBox.value);
}

function parseQuery(query) {
  var queryArray = query.toLowerCase().trim().split(/ *(\+|\*)/);
  var postPattern = queryArray[0];
  var categoryPatterns = [];
  var mode;
  queryArray.splice(1).forEach((item) => {
    switch(item) {
      case '+': mode = '+'; break;
      // case '*': mode = '*'; break; // todo 
      default:
        switch (mode) {
            case '+': categoryPatterns.push(item);break;
            default:throw Error("Cannot find mode: "+mode);
        }
        mode = '';
        break;
    }
  });
  return {
    postPattern,categoryPatterns
  }
}

function existPattern(str) {
  str = str.toLowerCase().trim();
  var mode = str.slice(0,1);
  var newPattern = str.slice(1);
  var {categoryPatterns} = parseQuery(searchBox.value);
  var existPatternArray;
  switch(mode) {
    case '+': existPatternArray = categoryPatterns; break;
    // case '*': mode = '*'; break; // todo 
    default:throw Error("Cannot find mode: "+mode);
  }
  var exist = false;
  existPatternArray.every((existPattern) => {
    if(existPattern === newPattern) {
      exist = true;
      return false;
    }
      return true;
  });
  return exist;
}

function filter(query) {
  var {postPattern,categoryPatterns} = parseQuery(query);
  
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

function applyFilter(query) {
  common_url.appendQueryString(searchPatternKey, encodeURIComponent(query));
  filter(query);
}

function setup() {
  // handle user click 
  document.querySelectorAll(".category-list .category-item").forEach((item) => {
    item.addEventListener('click', () => {
      var label = item.getAttribute('data-label');
      // exist => delete | no exist => add 
      if(existPattern(label)) {
        var pattern = searchBox.value.replaceAll(label, '');
        searchBoxUpdate(pattern);
      } else {
        searchBoxUpdate(searchBox.value + label);
      }
    })
  });

  // handle user input
  searchBox.addEventListener('input', function (event) {
    applyFilter(searchBox.value);
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
          searchBoxUpdate('');
          searchBox.focus();
          searchBox.parentElement.scrollIntoView();
      }
  });
  
  // trigger filter on page load
  var pattern = common_url.getQueryStringByName(searchPatternKey);
  pattern = decodeURIComponent(pattern);
  searchBoxUpdate(pattern);

  // trigger filter on history popstate
  // window.addEventListener("popstate", function (evt) {
  //   var pattern = common_url.getQueryStringByName(searchPatternKey);
  //   pattern = decodeURIComponent(pattern);
  //   searchBoxUpdate(pattern);
  // })
}

setup();