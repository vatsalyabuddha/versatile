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

  function where(colName, params, operator= false, empty = false) {
    let sql = "";
    const operation = (operator === undefined) ? "=" : operator;
    let value;
    if (typeof params === "object" && params[colName] !== undefined) {
        value = (typeof params[colName] === "string") ? params[colName].trim() : params[colName];

        if (!params[colName] && empty !== true) {
            return this;
        }
        if (operation === "like") {
          sql +=` WHERE ${colName.trim()} ${operation} '%${value}%'` ;
        } else if (operation === "endlike") {
          sql +=` WHERE ${colName.trim()} LIKE '${value}%'`;
        } else if (operation === "intr") {
          sql +=` WHERE ${colName.trim()} < NOW() - INTERVAL ${value} MINUTE`;
        } else if (operation === "in") {
          sql +=` WHERE ${colName.trim()} ${operation} (${value})` ;
        } else if (operation === "between") {
          sql +=` WHERE ( ${colName.trim()} >= ${params[0]}  AND ${colName.trim()} <= ${params[1]} )` ;
        } else if (operation === "null") {
          sql +=` WHERE ${colName.trim()} IS NULL ` ;
        } else if (operation === "notnull") {
          sql +=` WHERE ${colName.trim()} IS NOT NULL ` ;
        } else {
          value = (value && typeof(value) === "number") ? value : `"${value}"`;
          sql +=` WHERE ${colName.trim()} ${operation} ${value}` ;
        }
    } else if (typeof params === "object" && operation === "between" && params[0] && params[1]) {
      sql +=` WHERE ( ${colName.trim()} >= '${params[0]}'  AND ${colName.trim()} <= '${params[1]}' )` ;
    } else {
        if (typeof params !== "object") {
            if (!params && empty !== true) {
                return this;
            }
            value = (typeof params === "string") ? params.trim() : params;

            if (operation === "in") {
              sql +=` WHERE ${colName.trim()} ${operation} (${value})` ;
            } else if (operation === "like") {
              sql +=` WHERE ${colName.trim()} ${operation} '%${value}%'` ;
            } else if (operation === "endlike") {
              sql +=` WHERE ${colName.trim()} '${value}%'` ;
            } else if (operation === "intr") {
              sql +=` WHERE ${colName.trim()} < NOW() - INTERVAL ${value} MINUTE`;
            } else if (operation === "notin" || operation === "not in") {
              sql +=` WHERE ${colName.trim()} NOT IN (${value})` ;
            } else if (operation === "null") {
              sql +=` WHERE ${colName.trim()} IS NULL ` ;
            } else if (operation === "notnull") {
              sql +=` WHERE ${colName.trim()} IS NOT NULL ` ;
            } else {
              value = (value && typeof(value) === "number") ? value : `"${value}"`;
              sql +=` WHERE ${colName.trim()} ${operation} ${value}` ;
            }

        }
    }
    return sql;
  }

  function andWhere(colName, params, operator = false, empty= false) {
    let sql = "";
    const operation = (operator === undefined) ? "=" : operator;
    let value;
    if (typeof params === "object" && params[colName] !== undefined) {
      value = (typeof params[colName] === "string") ? params[colName].trim() : params[colName];
      if (!params[colName] && empty !== true) {
          return this;
      }
      if (operation === "like") {
          sql +=` AND ${colName.trim()} ${operation} '%${value}%'` ;
      } else if (operation === "endlike") {
          sql +=` AND ${colName.trim()} LIKE '${value}%'`;
      } else if (operation === "intr") {
        sql +=` AND ${colName.trim()} < NOW() - INTERVAL ${value} MINUTE`;
      } else if (operation === "in") {
          sql +=` AND ${colName.trim()} ${operation} (${value})` ;
      } else if (operation === "between") {
          sql +=` AND ( ${colName.trim()} >= ${params[0]}  AND ${colName.trim()} <= ${params[1]} )` ;
      } else if (operation === "null" || operation === "is null") {
          sql +=` AND ${colName.trim()} IS NULL` ;
      } else if (operation === "null") {
        sql +=` AND ${colName.trim()} IS NULL ` ;
      } else if (operation === "notnull") {
        sql +=` AND ${colName.trim()} IS NOT NULL ` ;
      } else {
          value = (value && typeof(value) === "number") ? value : `"${value}"`;
          sql +=` AND ${colName.trim()} ${operation} ${value}` ;
      }
    } else if (typeof params === "object" && operation === "between" && params[0] && params[1]) {
        sql +=` AND ( ${colName.trim()} >= '${params[0]}'  AND ${colName.trim()} <= '${params[1]}' )` ;
    } else if ((typeof params === "number" || typeof params === "string") && operation === "FIND_IN_SET") {
        sql +=` AND ${operation}(${params},${colName.trim()})`;
    } else {
        if (typeof params !== "object") {
            if (!params && empty !== true) {
                return this;
            }
            value = (typeof params === "string") ? params.trim() : params;
            if (operation === "in") {
                sql +=` AND ${colName.trim()} ${operation} (${value})` ;
            } else if (operation === "like") {
                sql +=` AND ${colName.trim()} ${operation} '%${value}%'` ;
            } else if (operation === "endlike") {
              sql +=` AND ${colName.trim()} LIKE '${value}%'`;
            } else if (operation === "intr") {
              sql +=` AND ${colName.trim()} < NOW() - INTERVAL ${value} MINUTE`;
            } else if (operation === "notin" || operation === "not in") {
                sql +=` AND ${colName.trim()} NOT IN (${value})` ;
            } else if (operation === "null" || operation === "is null") {
                sql +=` AND ${colName.trim()} IS NULL` ;
            } else if (operation === "null") {
              sql +=` AND ${colName.trim()} IS NULL ` ;
            } else if (operation === "notnull") {
              sql +=` AND ${colName.trim()} IS NOT NULL ` ;
            } else {
              value = (value && typeof(value) === "number") ? value : `"${value}"`;
              sql +=` AND ${colName.trim()} ${operation} ${value}` ;
            }
        }
    }
    return sql;
  }

  module.exports = { values, where , andWhere};