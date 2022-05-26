import common from '../common.js';
const key_theme_css_cur = 'theme_css_cur';
const key_common_css_id = 'common_css';

var herf_raw = document.getElementById(key_common_css_id).href;
function changeTheme(color) {
  if(color==='reset') {
    document.getElementById(key_common_css_id).href = herf_raw;
    sessionStorage.removeItem(key_theme_css_cur);
  } else {
    var _color;
    if (!common.in(color, [null, '', 'null'])) {
      _color='-'+color;
    } else {
      _color='';
    }
    var href = `/blog/assets/css/common${_color}.css`;
    // document.getElementById(key_common_css_id).href = href; // 页面抖动
    var a = document.getElementById(key_common_css_id);
    var b = a.cloneNode();
    b.href=href;
    a.after(b);
    var t = setTimeout(function(event) {
      a.remove();
    }, 100);
    sessionStorage.setItem(key_theme_css_cur, color);
  }
}

// add click handle
document.querySelectorAll(".theme_button").forEach((item) => {
  item.addEventListener('click', function() {
    var color = item.getAttribute('theme-color'); 
    changeTheme(color);
  })
})

var color_cur = sessionStorage.getItem(key_theme_css_cur);
changeTheme(color_cur);