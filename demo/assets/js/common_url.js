//获取QueryString的数组
function getQueryString(){
  var result = location.search.match(new RegExp("[\?\&][^\?\&]+=[^\?\&]+","g"));
  for(var i = 0; i < result.length; i++){
    result[i] = result[i].substring(1);
  }
  return result;
}
//根据QueryString参数名称获取值
function getQueryStringByName(name) {
  var result = location.search.match(new RegExp("[\?\&]" + name + "=([^\&]+)", "i"));
  if (result == null || result.length < 1) {
    return "";
  }
  return result[1];
}
//根据QueryString参数索引获取值
function getQueryStringByIndex(index) {
  if (index == null) {
    return "";
  }
  var queryStringList = getQueryString();
  if (index >= queryStringList.length) {
    return "";
  }
  var result = queryStringList[index];
  var startIndex = result.indexOf("=") + 1;
  result = result.substring(startIndex);
  return result;
}

// e.g.
// http://www.cnblogs.com/page.aspx?id=6&c=7&d=8#asfasdf
// replace C=7 to c=9
var regularUrl = function (url,key,value) {
    var fragPos = url.lastIndexOf("#");
    var fragment="";
    if(fragPos > -1) {
      fragment = url.substring(fragPos);
      url = url.substring(0,fragPos);
    }
    var querystart = url.indexOf("?");
    if(querystart < 0) {
      url += "?"+key+"="+value;
    } else if (querystart==url.length-1) {
      url += key+"="+value;
    } else {
        var Re = new RegExp(key+"=[^\\s&#]*","gi");
        if (Re.test(url))
          url=url.replace(Re,key+"="+value);
        else
          url += "&"+key+"="+value;
    }
    return url+fragment;
}

var appendQueryString = function(key, value) {
  var reglaredUrl = regularUrl(location.href, key, value);
  history.replaceState(null, null, reglaredUrl);
  // history.pushState(null, null, reglaredUrl);
}

export default {
  regularUrl,appendQueryString,getQueryStringByName
}