var core = {
  notIn: function(value, array) {
    var notIn = true;
    array.every(element => {
      if(value===element) {
        notIn = false;
        return false;
      }
      return true;
    });
    return notIn;
  }
}

export default core;