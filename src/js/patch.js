Object.prototype.withDefault = function (value) {
  return new Proxy(this, {
    get: (target, name) => target.hasOwnProperty(name) ? target[name] : value
  });
};
