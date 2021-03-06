var ArrayWrapper = {
  count: function() {
    return this.__value.length;
  },

  map: function(callback) {
    return this.__wrappers.map(callback);
  },

  filter: function(callback, thisArg) {
    return this.__wrappers.filter(callback, thisArg);
  },

  find: function(callback) {
    for(var index = 0, length = this.__wrappers.length;index < length;index++) {
      if(callback(this.__wrappers[index], index, this.__wrappers)) {
        return this.__wrappers[index];
      }
    }
    return null;
  },

  findIndex: function(callback) {
    for(var index = 0, length = this.__wrappers.length;index < length;index++) {
      if(callback(this.__wrappers[index], index, this.__wrappers)) {
        return index;
      }
    }
    return -1;
  },

  findIndices: function(callback) {
    var indices = [];
    for(var index = 0, length = this.__wrappers.length;index < length;index++) {
      if(callback(this.__wrappers[index], index, this.__wrappers)) {
        indices.push(index);
      }
    }
    return indices;
  },

  push: function(value) {
    var length = this.__value.push(value);
    this.__forceUpdate();
    return length;
  },

  pop: function() {
    var last = this.__value.pop();
    this.__forceUpdate();
    return last;
  },

  unshift: function(value) {
    var length = this.__value.unshift(value);
    this.__forceUpdate();
    return length;
  },

  shift: function() {
    var last = this.__value.shift();
    this.__forceUpdate();
    return last;
  },

  insertAt: function(index, value) {
    var args = [index, 0].concat(value);
    Array.prototype.splice.apply(this.__value, args);
    this.__forceUpdate();
  },

  removeAt: function(index, howMany) {
    if(isNaN(howMany) || howMany <= 0) {
      howMany = 1;
    }
    var removed = this.__value.splice(index, howMany);
    this.__forceUpdate();
    return removed;
  },

  removeSeveral: function(indices) {
    var removed = []
    for(var i = indices.length-1;i >= 0;i--) {
      // go backwards to ensure that the array is mutated properly
      removed.push(this.__value.splice(indices[i], 1));
    }
    this.__forceUpdate();
    return removed;
  }
};

module.exports = ArrayWrapper;
