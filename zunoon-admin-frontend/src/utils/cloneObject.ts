export default function cloneObject(source) {
  if (Object.prototype.toString.call(source) === "[object Array]") {
    const clone: object[] = [];
    for (let i = 0; i < source.length; i++) {
      clone[i] = cloneObject(source[i]);
    }
    return clone;
  } else if (typeof source == "object") {
    const clone = {};
    for (const prop in source) {
      if (source.hasOwnProperty(prop)) {
        clone[prop] = cloneObject(source[prop]);
      }
    }
    return clone;
  } else {
    return source;
  }
}
