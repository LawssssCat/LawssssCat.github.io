---
---
// add permalink on headings
// document.querySelectorAll('h2, h3, h4, h5, h5').forEach((heading) => {
//     const link = document.createElement('a');
//     link.className = 'permalink';
//     link.href = `#${heading.id}`;
//     heading.appendChild(link);
// });

(function (cnjs, methods) {

// Event handling
cnjs.onReady = function(ready) {
  // in case the document is already rendered
  if (document.readyState!='loading') ready();
  // modern browsers
  else if (document.addEventListener) document.addEventListener('DOMContentLoaded', ready);
  // IE <= 8
  else document.attachEvent('onreadystatechange', function(){
      if (document.readyState=='complete') ready();
  });
}

// set modules

cnjs.setMethods = function(methods) {
  cnjs.methods = methods;
}

// Document ready

cnjs.onReady(function(){
  cnjs.setMethods(methods);
});

})(window.cnjs = window.cnjs || {}, {
  url: require('./common-url'),
});