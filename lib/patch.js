/*
 * Mods negative numbers correctly
 */
Number.prototype.mod = function(n) {
  return ((this % n) + n) % n;
};

/*
 * Flattens nested array
 */
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

/*
 * Rotates rectangular matrix
 */
Array.prototype.rotate = function() {
  const originalWidth = this[0].length;
  const originalHeight = this.length;

  const array = [];
  for (let oj = originalWidth - 1; oj >= 0; oj--) {
    const row = [];
    for (let oi = 0; oi < originalHeight; oi++) {
      row.push(this[oi][oj]);
    }
    array.push(row);
  }

  return array;
};

/*
 * In-place concatenation
 */
Array.prototype.pushAll = function(other) {
  other.forEach(el => this.push(el));
};
