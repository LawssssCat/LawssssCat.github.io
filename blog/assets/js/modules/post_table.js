import common from '../common.js';
import common_url from '../common_url.js';

var env = {
  search_input_id: 'post-search',
  patternMode: { // core env
    category: '+',
    tag: '*',
  },
  patternModePostName: 'post',
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
      pattern = pattern.trim();
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
      pattern.split(/\s+/g).forEach(spattern => {
        if(spattern!='')
          result[env.patternModePostName].push(spattern);
      });
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
        var handlerMatter = patternModeHandlers[key];
        // handleMatter.force means that it will run the handler unless whether patterns is empty.
        if(patterns.length>0 || (handlerMatter && handlerMatter.force)) {
          var handler = handlerMatter.handler;
          if(handler) 
            handler(patterns);
          else console.error('lack handler for ['+key+']');
        }
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
  var rows = document.querySelectorAll('#post-table tbody tr');

  function handle(patterns, hook_01, hook_02, hook_03) {
    if(hook_03) hook_03(patterns);
    patterns.forEach(pattern => {
      if(hook_02) hook_02(pattern, rows);
      rows.forEach(row => {
        if(row.style.display == 'none') return true;
        if(hook_01) hook_01(pattern, row);
      });
    });
  }

  function handle2filterByPost(patterns) {
    handle(patterns, (pattern, row) => { // func01
      var postName = row.getElementsByClassName('post-title')[0].innerHTML.toLowerCase();
      if (postName.indexOf(pattern.toLowerCase()) == -1) {
        row.style.display = 'none';
      } 
    });
  }

  function handle2FilterByCategory(patterns) {
    handle(patterns, 
      (pattern, row) => { // func01
        var match = false;
        row.querySelectorAll('.category-list .category-item').forEach(cat => {
          if(cat.getAttribute('data-label')===pattern) {
            match = true;
          }
        })
        if(!match) row.style.display = 'none';
      }, 
      (pattern, rows) => { // func02
        document.querySelectorAll('.category-list .category-item-'+pattern).forEach(cat => {
          cat.classList.remove('match');
          cat.classList.add('match');
        });
      }, 
      (patterns) => { // func03
        document.querySelectorAll('.category-list .category-item').forEach(cat => {
          cat.classList.remove('match');
        });
      });
  }

  function handle2FilterByTags(patterns) {
    handle(patterns, 
      (pattern, row) => { // func01
        var match = false;
        row.querySelectorAll('.tag-list .tag-item').forEach(tag => {
          if(tag.getAttribute('data-label')==pattern) {
            match = true;
          }
        })
        if(!match) row.style.display = 'none';
      }, 
      (pattern, rows) => { // func02
        debugger
        document.querySelectorAll('.tag-list .tag-item-'+pattern).forEach(cat => {
          cat.classList.remove('match');
          cat.classList.add('match');
        });
      }, 
      (patterns) => { // func03
        document.querySelectorAll('.tag-list .tag-item').forEach(cat => {
          cat.classList.remove('match');
        });
      });
  }

  return {
    category: {
      handler: handle2FilterByCategory,
      force: true
    },
    tag: {
      handler: handle2FilterByTags,
      force: true
    }, 
    post: {
      handler: handle2filterByPost,
    }
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
    var pattern = sessionStorage.getItem(_SB.key_searchPattern); 
    if(common.in(pattern, [null, 'null'])) pattern = '';
    return pattern;
  }

  _SB.setSearchPattern = function(value) {
    if(value) value = value.trim();
    _SB.searchInput.value=value;
    sessionStorage.setItem(_SB.key_searchPattern, value);
    _SB.filter();
  }

  _SB.existSearchPattern = function(value) {
    var pattern = _SB.getSearchPattern();
    return pattern.indexOf(value)>-1;
  }

  _SB.appendSearchPattern = function(value) {
    // exist => delete | no exist => add 
    if(_SB.existSearchPattern(value)) {
      var pattern = _SB.getSearchPattern().replaceAll(value, ' ');
      _SB.setSearchPattern(pattern);
    } else {
      var pattern = _SB.getSearchPattern();
      _SB.setSearchPattern(pattern.trim() + ' ' + value);
    }
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
    // handle user click 
    function addClickListener4(selectStr, patternModeStr) {
      document.querySelectorAll(selectStr).forEach((item) => {
        item.addEventListener('click', () => {
          var label = patternModeStr +'('+item.getAttribute('data-label')+')';
          _SB.appendSearchPattern(label);
        })
      });
    }
    addClickListener4(".category-list .category-item", env.patternMode.category);
    addClickListener4(".tag-list .tag-item", env.patternMode.tag);
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

// css
// ensure height during filtering
var tableWrapper = document.getElementById('post-table-wrapper');
tableWrapper.style.height = tableWrapper.clientHeight + 'px';