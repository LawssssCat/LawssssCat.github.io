import common_url from '../common_url.js';

var env = {
  search_input_id: 'post-search',
  category_list_class: 'category-list',
  category_item_class: 'category-item',
  patternMode: { // core env
    category: '+',
    tag: '*',
  },
  patternModePostName: 'post',
  // ====================================
  search: {
    patternKey: 'search_text',
    inputBox: document.getElementById('post-search'),
  },

  category: {
    listClass: 'category-list',
    itemClass: 'category-item',
    dataAttribute: 'data-label',
    mode: '+',
  } ,

  tag: '-'
}

var tools = function() {
  var _TOOL = {};

  _TOOL.getRegx4parseQuery = function() {
    // see https://c.runoob.com/front-end/854/?optionGlobl=global
    // regx /(\+|\*)\((.*?)\)/gi
    // new RegExp(`\(\\\+\|\\\*\)\\\(\(\.\*\?\)\\\)`, 'gi')
    // e.g.
    // aaaa+aaaa*aa+(bb+bbb#bbbb) *(c*cccc?ccc)dd *(zzzzzz z[]zzz【zzz)ee ff=】ffff gggg hh iiiiiiiiiii             +(jjjjjj)kkkkkkk+()kkkkkk
    // result 
    // aaaa+aaaa*aa   dd s ee ff=】ffff gggg hh iiiiiiiiiii              kkkkkkk kkkkkk
    var regx = '\(';
    var back = false;
    for(var key in env.patternMode) {
      regx+='\\'+env.patternMode[key]+'\|';
      back=true;
    }
    if(back) regx = regx.slice(0, regx.length-1);
    regx+='\)\\\(\(\.\*\?\)\\\)';
    // console.log(regx);
    return new RegExp(regx, 'gi');
  }

  _TOOL.classifyPattern4parseQuery = function(split) {
    var result = {}; 
    for(var key in env.patternMode) {
      result[key] = [];
    }
    result[env.patternModePostName] = [];

    var patternMode = '';
    split.forEach(pattern => {
      // add as match pattern if pre step save patternMode
      if(patternMode) {
        for(var key in env.patternMode) {
          if(env.patternMode[key] === patternMode) {
            result[key].push(pattern);
            patternMode = '';
            return ;
          }
        }
        throw new Error('error patternMode['+patternMode+'] with query['+query+'].');
      }
      // check if is patternMode
      for(var key in env.patternMode) {
        if(env.patternMode[key] === pattern) {
          patternMode = pattern;
          return ;
        }
      }
      // add 
      result[env.patternModePostName].push(pattern);
    });
    return result;
  }

  _TOOL.parseQuery = function(query) {
    // before split:
    // aaaa+aaaa*aa+(bb+bbb#bbbb) *(c*cccc?ccc)dd *(zzzzzz z[]zzz【zzz)ee ff=】ffff gggg hh iiiiiiiiiii             +(jjjjjj)kkkkkkk+()kkkkkk
    // after split:
    // 0: "aaaa+aaaa*aa" ==> post pattern
    // 1: "+"
    // 2: "bb+bbb#bbbb" ==> category pattern
    // 3: " "           ==> post pattern
    // 4: "*"
    // 5: "c*cccc?ccc"  ==> tag pattern
    // 6: "dd "         ==> post pattern
    // 7: "*"
    // 8: "zzzzzz z[]zzz【zzz"     ==> tag pattern
    // 9: "ee ff=】ffff gggg hh iiiiiiiiiii             "   ==> post pattern
    // 10: "+"
    // 11: "jjjjjj"     ==> category pattern
    // 12: "kkkkkkk"    ==> post pattern
    // 13: "+"
    // 14: ""           ==> category pattern
    // 15: "kkkkkk"     ==> post pattern
    var split = query.split(_TOOL.getRegx4parseQuery());
    return _TOOL.classifyPattern4parseQuery(split);
  }

  _TOOL.filterByClassifiedPatterns = function(classifiedPatterns) {
    var rows = Array.from(document.querySelectorAll('#post-table tbody tr'));
    rows.forEach(row => row.style.display = '');
    // classifiedPatterns 
    // e.g.
    // '{"category":["bb+bbb#bbbb","jjjjjj",""],"tag":["c*cccc?ccc","zzzzzz z[]zzz【zzz"],"post":["aaaa+aaaa*aa+"," ","dd ","ee ff=】ffff gggg hh iiiiiiiiiii             ","kkkkkkk","kkkkkk"]}'
    for(var key in classifiedPatterns) {
        try{
        var patterns =  classifiedPatterns[key];
        var handler = patternModeHandlers[key];
        handler(patterns);
      } catch(err) {
        console.error(err);
      }
    }
    // detect table if empty 
    var empty = true;
    rows.every(row => {
        if(row.style.display === 'none') {
          return true;
        } else {
          empty =false;
          return false;
        }
    });
    // update the search message visibility
    var searchMessage = document.getElementById('search-message-no-result');
    searchMessage.style.display = empty ? 'table-cell' : 'none';
  }

  return _TOOL;
}();

var patternModeHandlers =  function() {
  function handle2filterByPost(patterns) {
    var rows = document.querySelectorAll('#post-table tbody tr');
    patterns.every(pattern => {
      rows.forEach(row => {
        if(row.style.display == 'none') return true;
        var postName = row.getElementsByClassName('post-title')[0].innerHTML.toLowerCase();
        if (postName.indexOf(pattern.toLowerCase()) == -1) {
          row.style.display = 'none';
          return false;
        } 
        return true;
      });
    });
  }
  return {
    category: handle2filterByPost, // todo
    tag: handle2filterByPost, // todo
    post: handle2filterByPost,
  }
}();

// two-way-binding 
// search box
(function() {
  var _SB = {
    key_searchPattern: 'key_searchPattern',
    searchInput: null,
  }

  _SB.filter = function() {
    var queryPattern = _SB.getSearchPattern();
    var classifiedPatterns = tools.parseQuery(queryPattern);
    tools.filterByClassifiedPatterns(classifiedPatterns);
  }

  _SB.initSearchPattern = function() {
    _SB.setSearchPattern(_SB.getSearchPattern());
  }

  _SB.getSearchPattern = function() {
    return sessionStorage.getItem(_SB.key_searchPattern);
  }

  _SB.setSearchPattern = function(value) {
    _SB.searchInput.value=value;
    sessionStorage.setItem(_SB.key_searchPattern, value);
    _SB.filter();
  }

  _SB.setup = function () {
    console.debug("search setting up");
    // handle user input
    _SB.searchInput.addEventListener("keyup", (event) => {
      _SB.setSearchPattern(event.target.value);
    });
    // handle shortcuts
    addEventListener("keydown", function (event) {
      // focus search box on valid keydown
      if (event.key.toLowerCase().match(/^[+a-z]$/) &&
        !(event.ctrlKey || event.altKey || event.metaKey)) {
          _SB.searchInput.focus();
          _SB.searchInput.parentElement.scrollIntoView();
      }
      // clear filter on escape
      else if (event.key === "Escape") {
        _SB.setSearchPattern(''); // clear pattern
        _SB.searchInput.focus();
        _SB.searchInput.parentElement.scrollIntoView();
      }
    });

    // filter once on load
    _SB.filter();
  }

  _SB.init = function () {
    _SB.searchInput = document.getElementById(env.search_input_id);
    _SB.initSearchPattern();
    return _SB;
  }

  return _SB;
}()
.init()
.setup());
