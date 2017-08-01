Number.prototype.mod = function(n) {
  return ((this % n) + n) % n;
};

Array.prototype.flatten = function() {
  let result = [];
  
  this.forEach(el => {
    if (el instanceof Array) {
      result = result.concat(el.flatten());
    } else {
      result.push(el);
    }
  });

  return result;
};
