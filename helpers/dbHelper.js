function values(valueArray) {
    const cols = [];
    const vals = [];
    let key;
    for (key in valueArray) {
      if (valueArray[key]) {
        cols.push(key);
        vals.push(`'${valueArray[key]}'`);
      }
    }
    return `(${cols.join(" , ")}) VALUES (${vals.join(" , ")})`;
  }

  module.exports = { values};