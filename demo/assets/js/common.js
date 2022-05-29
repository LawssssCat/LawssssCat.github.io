var core = {
  in: function(value, array) {
    var flag = false;
    array.every(element => {
      if(value===element) {
        flag = true;
        return false;
      }
      return true;
    });
    return flag;
  }
}

export default core;