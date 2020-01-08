module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1578386726648, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "table", {
  enumerable: true,
  get: function get() {
    return _table.default;
  }
});
Object.defineProperty(exports, "createStream", {
  enumerable: true,
  get: function get() {
    return _createStream.default;
  }
});
Object.defineProperty(exports, "getBorderCharacters", {
  enumerable: true,
  get: function get() {
    return _getBorderCharacters.default;
  }
});

var _table = _interopRequireDefault(require("./table"));

var _createStream = _interopRequireDefault(require("./createStream"));

var _getBorderCharacters = _interopRequireDefault(require("./getBorderCharacters"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//# sourceMappingURL=index.js.map
}, function(modId) {var map = {"./table":1578386726649,"./createStream":1578386726670,"./getBorderCharacters":1578386726655}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1578386726649, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _drawTable = _interopRequireDefault(require("./drawTable"));

var _calculateCellWidthIndex = _interopRequireDefault(require("./calculateCellWidthIndex"));

var _makeConfig = _interopRequireDefault(require("./makeConfig"));

var _calculateRowHeightIndex = _interopRequireDefault(require("./calculateRowHeightIndex"));

var _mapDataUsingRowHeightIndex = _interopRequireDefault(require("./mapDataUsingRowHeightIndex"));

var _alignTableData = _interopRequireDefault(require("./alignTableData"));

var _padTableData = _interopRequireDefault(require("./padTableData"));

var _validateTableData = _interopRequireDefault(require("./validateTableData"));

var _stringifyTableData = _interopRequireDefault(require("./stringifyTableData"));

var _truncateTableData = _interopRequireDefault(require("./truncateTableData"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @typedef {string} table~cell
 */

/**
 * @typedef {table~cell[]} table~row
 */

/**
 * @typedef {Object} table~columns
 * @property {string} alignment Cell content alignment (enum: left, center, right) (default: left).
 * @property {number} width Column width (default: auto).
 * @property {number} truncate Number of characters are which the content will be truncated (default: Infinity).
 * @property {boolean} wrapWord When true the text is broken at the nearest space or one of the special characters
 * @property {number} paddingLeft Cell content padding width left (default: 1).
 * @property {number} paddingRight Cell content padding width right (default: 1).
 */

/**
 * @typedef {Object} table~border
 * @property {string} topBody
 * @property {string} topJoin
 * @property {string} topLeft
 * @property {string} topRight
 * @property {string} bottomBody
 * @property {string} bottomJoin
 * @property {string} bottomLeft
 * @property {string} bottomRight
 * @property {string} bodyLeft
 * @property {string} bodyRight
 * @property {string} bodyJoin
 * @property {string} joinBody
 * @property {string} joinLeft
 * @property {string} joinRight
 * @property {string} joinJoin
 */

/**
 * Used to tell whether to draw a horizontal line.
 * This callback is called for each non-content line of the table.
 * The default behavior is to always return true.
 *
 * @typedef {Function} drawHorizontalLine
 * @param {number} index
 * @param {number} size
 * @returns {boolean}
 */

/**
 * @typedef {Object} table~config
 * @property {table~border} border
 * @property {table~columns[]} columns Column specific configuration.
 * @property {table~columns} columnDefault Default values for all columns. Column specific settings overwrite the default values.
 * @property {table~drawHorizontalLine} drawHorizontalLine
 * @property {table~singleLine} singleLine Horizontal lines inside the table are not drawn.
 */

/**
 * Generates a text table.
 *
 * @param {table~row[]} data
 * @param {table~config} userConfig
 * @returns {string}
 */
const table = (data, userConfig = {}) => {
  let rows;
  (0, _validateTableData.default)(data);
  rows = (0, _stringifyTableData.default)(data);
  const config = (0, _makeConfig.default)(rows, userConfig);
  rows = (0, _truncateTableData.default)(data, config);
  const rowHeightIndex = (0, _calculateRowHeightIndex.default)(rows, config);
  rows = (0, _mapDataUsingRowHeightIndex.default)(rows, rowHeightIndex, config);
  rows = (0, _alignTableData.default)(rows, config);
  rows = (0, _padTableData.default)(rows, config);
  const cellWidthIndex = (0, _calculateCellWidthIndex.default)(rows[0]);
  return (0, _drawTable.default)(rows, config.border, cellWidthIndex, rowHeightIndex, config.drawHorizontalLine, config.singleLine);
};

var _default = table;
exports.default = _default;
//# sourceMappingURL=table.js.map
}, function(modId) { var map = {"./drawTable":1578386726650,"./calculateCellWidthIndex":1578386726653,"./makeConfig":1578386726654,"./calculateRowHeightIndex":1578386726658,"./mapDataUsingRowHeightIndex":1578386726663,"./alignTableData":1578386726664,"./padTableData":1578386726666,"./validateTableData":1578386726667,"./stringifyTableData":1578386726668,"./truncateTableData":1578386726669}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1578386726650, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _drawBorder = require("./drawBorder");

var _drawRow = _interopRequireDefault(require("./drawRow"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @param {Array} rows
 * @param {Object} border
 * @param {Array} columnSizeIndex
 * @param {Array} rowSpanIndex
 * @param {Function} drawHorizontalLine
 * @param {boolean} singleLine
 * @returns {string}
 */
const drawTable = (rows, border, columnSizeIndex, rowSpanIndex, drawHorizontalLine, singleLine) => {
  let output;
  let realRowIndex;
  let rowHeight;
  const rowCount = rows.length;
  realRowIndex = 0;
  output = '';

  if (drawHorizontalLine(realRowIndex, rowCount)) {
    output += (0, _drawBorder.drawBorderTop)(columnSizeIndex, border);
  }

  rows.forEach((row, index0) => {
    output += (0, _drawRow.default)(row, border);

    if (!rowHeight) {
      rowHeight = rowSpanIndex[realRowIndex];
      realRowIndex++;
    }

    rowHeight--;

    if (!singleLine && rowHeight === 0 && index0 !== rowCount - 1 && drawHorizontalLine(realRowIndex, rowCount)) {
      output += (0, _drawBorder.drawBorderJoin)(columnSizeIndex, border);
    }
  });

  if (drawHorizontalLine(realRowIndex, rowCount)) {
    output += (0, _drawBorder.drawBorderBottom)(columnSizeIndex, border);
  }

  return output;
};

var _default = drawTable;
exports.default = _default;
//# sourceMappingURL=drawTable.js.map
}, function(modId) { var map = {"./drawBorder":1578386726651,"./drawRow":1578386726652}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1578386726651, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.drawBorderTop = exports.drawBorderJoin = exports.drawBorderBottom = exports.drawBorder = void 0;

/**
 * @typedef drawBorder~parts
 * @property {string} left
 * @property {string} right
 * @property {string} body
 * @property {string} join
 */

/**
 * @param {number[]} columnSizeIndex
 * @param {drawBorder~parts} parts
 * @returns {string}
 */
const drawBorder = (columnSizeIndex, parts) => {
  const columns = columnSizeIndex.map(size => {
    return parts.body.repeat(size);
  }).join(parts.join);
  return parts.left + columns + parts.right + '\n';
};
/**
 * @typedef drawBorderTop~parts
 * @property {string} topLeft
 * @property {string} topRight
 * @property {string} topBody
 * @property {string} topJoin
 */

/**
 * @param {number[]} columnSizeIndex
 * @param {drawBorderTop~parts} parts
 * @returns {string}
 */


exports.drawBorder = drawBorder;

const drawBorderTop = (columnSizeIndex, parts) => {
  const border = drawBorder(columnSizeIndex, {
    body: parts.topBody,
    join: parts.topJoin,
    left: parts.topLeft,
    right: parts.topRight
  });

  if (border === '\n') {
    return '';
  }

  return border;
};
/**
 * @typedef drawBorderJoin~parts
 * @property {string} joinLeft
 * @property {string} joinRight
 * @property {string} joinBody
 * @property {string} joinJoin
 */

/**
 * @param {number[]} columnSizeIndex
 * @param {drawBorderJoin~parts} parts
 * @returns {string}
 */


exports.drawBorderTop = drawBorderTop;

const drawBorderJoin = (columnSizeIndex, parts) => {
  return drawBorder(columnSizeIndex, {
    body: parts.joinBody,
    join: parts.joinJoin,
    left: parts.joinLeft,
    right: parts.joinRight
  });
};
/**
 * @typedef drawBorderBottom~parts
 * @property {string} topLeft
 * @property {string} topRight
 * @property {string} topBody
 * @property {string} topJoin
 */

/**
 * @param {number[]} columnSizeIndex
 * @param {drawBorderBottom~parts} parts
 * @returns {string}
 */


exports.drawBorderJoin = drawBorderJoin;

const drawBorderBottom = (columnSizeIndex, parts) => {
  return drawBorder(columnSizeIndex, {
    body: parts.bottomBody,
    join: parts.bottomJoin,
    left: parts.bottomLeft,
    right: parts.bottomRight
  });
};

exports.drawBorderBottom = drawBorderBottom;
//# sourceMappingURL=drawBorder.js.map
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1578386726652, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * @typedef {Object} drawRow~border
 * @property {string} bodyLeft
 * @property {string} bodyRight
 * @property {string} bodyJoin
 */

/**
 * @param {number[]} columns
 * @param {drawRow~border} border
 * @returns {string}
 */
const drawRow = (columns, border) => {
  return border.bodyLeft + columns.join(border.bodyJoin) + border.bodyRight + '\n';
};

var _default = drawRow;
exports.default = _default;
//# sourceMappingURL=drawRow.js.map
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1578386726653, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _stringWidth = _interopRequireDefault(require("string-width"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Calculates width of each cell contents.
 *
 * @param {string[]} cells
 * @returns {number[]}
 */
const calculateCellWidthIndex = cells => {
  return cells.map(value => {
    return Math.max(...value.split('\n').map(line => {
      return (0, _stringWidth.default)(line);
    }));
  });
};

var _default = calculateCellWidthIndex;
exports.default = _default;
//# sourceMappingURL=calculateCellWidthIndex.js.map
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1578386726654, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _cloneDeep2 = _interopRequireDefault(require("lodash/cloneDeep"));

var _isUndefined2 = _interopRequireDefault(require("lodash/isUndefined"));

var _times2 = _interopRequireDefault(require("lodash/times"));

var _getBorderCharacters = _interopRequireDefault(require("./getBorderCharacters"));

var _validateConfig = _interopRequireDefault(require("./validateConfig"));

var _calculateMaximumColumnWidthIndex = _interopRequireDefault(require("./calculateMaximumColumnWidthIndex"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Merges user provided border characters with the default border ("honeywell") characters.
 *
 * @param {Object} border
 * @returns {Object}
 */
const makeBorder = (border = {}) => {
  return Object.assign({}, (0, _getBorderCharacters.default)('honeywell'), border);
};
/**
 * Creates a configuration for every column using default
 * values for the missing configuration properties.
 *
 * @param {Array[]} rows
 * @param {Object} columns
 * @param {Object} columnDefault
 * @returns {Object}
 */


const makeColumns = (rows, columns = {}, columnDefault = {}) => {
  const maximumColumnWidthIndex = (0, _calculateMaximumColumnWidthIndex.default)(rows);
  (0, _times2.default)(rows[0].length, index => {
    if ((0, _isUndefined2.default)(columns[index])) {
      columns[index] = {};
    }

    columns[index] = Object.assign({
      alignment: 'left',
      paddingLeft: 1,
      paddingRight: 1,
      truncate: Infinity,
      width: maximumColumnWidthIndex[index],
      wrapWord: false
    }, columnDefault, columns[index]);
  });
  return columns;
};
/**
 * Makes a new configuration object out of the userConfig object
 * using default values for the missing configuration properties.
 *
 * @param {Array[]} rows
 * @param {Object} userConfig
 * @returns {Object}
 */


const makeConfig = (rows, userConfig = {}) => {
  (0, _validateConfig.default)('config.json', userConfig);
  const config = (0, _cloneDeep2.default)(userConfig);
  config.border = makeBorder(config.border);
  config.columns = makeColumns(rows, config.columns, config.columnDefault);

  if (!config.drawHorizontalLine) {
    /**
         * @returns {boolean}
         */
    config.drawHorizontalLine = () => {
      return true;
    };
  }

  if (config.singleLine === undefined) {
    config.singleLine = false;
  }

  return config;
};

var _default = makeConfig;
exports.default = _default;
//# sourceMappingURL=makeConfig.js.map
}, function(modId) { var map = {"./getBorderCharacters":1578386726655,"./validateConfig":1578386726656,"./calculateMaximumColumnWidthIndex":1578386726657}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1578386726655, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/* eslint-disable sort-keys */

/**
 * @typedef border
 * @property {string} topBody
 * @property {string} topJoin
 * @property {string} topLeft
 * @property {string} topRight
 * @property {string} bottomBody
 * @property {string} bottomJoin
 * @property {string} bottomLeft
 * @property {string} bottomRight
 * @property {string} bodyLeft
 * @property {string} bodyRight
 * @property {string} bodyJoin
 * @property {string} joinBody
 * @property {string} joinLeft
 * @property {string} joinRight
 * @property {string} joinJoin
 */

/**
 * @param {string} name
 * @returns {border}
 */
const getBorderCharacters = name => {
  if (name === 'honeywell') {
    return {
      topBody: '═',
      topJoin: '╤',
      topLeft: '╔',
      topRight: '╗',
      bottomBody: '═',
      bottomJoin: '╧',
      bottomLeft: '╚',
      bottomRight: '╝',
      bodyLeft: '║',
      bodyRight: '║',
      bodyJoin: '│',
      joinBody: '─',
      joinLeft: '╟',
      joinRight: '╢',
      joinJoin: '┼'
    };
  }

  if (name === 'norc') {
    return {
      topBody: '─',
      topJoin: '┬',
      topLeft: '┌',
      topRight: '┐',
      bottomBody: '─',
      bottomJoin: '┴',
      bottomLeft: '└',
      bottomRight: '┘',
      bodyLeft: '│',
      bodyRight: '│',
      bodyJoin: '│',
      joinBody: '─',
      joinLeft: '├',
      joinRight: '┤',
      joinJoin: '┼'
    };
  }

  if (name === 'ramac') {
    return {
      topBody: '-',
      topJoin: '+',
      topLeft: '+',
      topRight: '+',
      bottomBody: '-',
      bottomJoin: '+',
      bottomLeft: '+',
      bottomRight: '+',
      bodyLeft: '|',
      bodyRight: '|',
      bodyJoin: '|',
      joinBody: '-',
      joinLeft: '|',
      joinRight: '|',
      joinJoin: '|'
    };
  }

  if (name === 'void') {
    return {
      topBody: '',
      topJoin: '',
      topLeft: '',
      topRight: '',
      bottomBody: '',
      bottomJoin: '',
      bottomLeft: '',
      bottomRight: '',
      bodyLeft: '',
      bodyRight: '',
      bodyJoin: '',
      joinBody: '',
      joinLeft: '',
      joinRight: '',
      joinJoin: ''
    };
  }

  throw new Error('Unknown border template "' + name + '".');
};

var _default = getBorderCharacters;
exports.default = _default;
//# sourceMappingURL=getBorderCharacters.js.map
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1578386726656, function(require, module, exports) {

var equal = require('ajv/lib/compile/equal');
var validate = (function() {
  var pattern0 = new RegExp('^[0-9]+$');
  var refVal = [];
  var refVal1 = (function() {
    var pattern0 = new RegExp('^[0-9]+$');
    return function validate(data, dataPath, parentData, parentDataProperty, rootData) {
      
      var vErrors = null;
      var errors = 0;
      if (rootData === undefined) rootData = data;
      if ((data && typeof data === "object" && !Array.isArray(data))) {
        var errs__0 = errors;
        var valid1 = true;
        for (var key0 in data) {
          var isAdditional0 = !(false || validate.schema.properties.hasOwnProperty(key0));
          if (isAdditional0) {
            valid1 = false;
            var err = {
              keyword: 'additionalProperties',
              dataPath: (dataPath || '') + "",
              schemaPath: '#/additionalProperties',
              params: {
                additionalProperty: '' + key0 + ''
              },
              message: 'should NOT have additional properties'
            };
            if (vErrors === null) vErrors = [err];
            else vErrors.push(err);
            errors++;
          }
        }
        if (data.topBody !== undefined) {
          var errs_1 = errors;
          if (!refVal2(data.topBody, (dataPath || '') + '.topBody', data, 'topBody', rootData)) {
            if (vErrors === null) vErrors = refVal2.errors;
            else vErrors = vErrors.concat(refVal2.errors);
            errors = vErrors.length;
          }
          var valid1 = errors === errs_1;
        }
        if (data.topJoin !== undefined) {
          var errs_1 = errors;
          if (!refVal[2](data.topJoin, (dataPath || '') + '.topJoin', data, 'topJoin', rootData)) {
            if (vErrors === null) vErrors = refVal[2].errors;
            else vErrors = vErrors.concat(refVal[2].errors);
            errors = vErrors.length;
          }
          var valid1 = errors === errs_1;
        }
        if (data.topLeft !== undefined) {
          var errs_1 = errors;
          if (!refVal[2](data.topLeft, (dataPath || '') + '.topLeft', data, 'topLeft', rootData)) {
            if (vErrors === null) vErrors = refVal[2].errors;
            else vErrors = vErrors.concat(refVal[2].errors);
            errors = vErrors.length;
          }
          var valid1 = errors === errs_1;
        }
        if (data.topRight !== undefined) {
          var errs_1 = errors;
          if (!refVal[2](data.topRight, (dataPath || '') + '.topRight', data, 'topRight', rootData)) {
            if (vErrors === null) vErrors = refVal[2].errors;
            else vErrors = vErrors.concat(refVal[2].errors);
            errors = vErrors.length;
          }
          var valid1 = errors === errs_1;
        }
        if (data.bottomBody !== undefined) {
          var errs_1 = errors;
          if (!refVal[2](data.bottomBody, (dataPath || '') + '.bottomBody', data, 'bottomBody', rootData)) {
            if (vErrors === null) vErrors = refVal[2].errors;
            else vErrors = vErrors.concat(refVal[2].errors);
            errors = vErrors.length;
          }
          var valid1 = errors === errs_1;
        }
        if (data.bottomJoin !== undefined) {
          var errs_1 = errors;
          if (!refVal[2](data.bottomJoin, (dataPath || '') + '.bottomJoin', data, 'bottomJoin', rootData)) {
            if (vErrors === null) vErrors = refVal[2].errors;
            else vErrors = vErrors.concat(refVal[2].errors);
            errors = vErrors.length;
          }
          var valid1 = errors === errs_1;
        }
        if (data.bottomLeft !== undefined) {
          var errs_1 = errors;
          if (!refVal[2](data.bottomLeft, (dataPath || '') + '.bottomLeft', data, 'bottomLeft', rootData)) {
            if (vErrors === null) vErrors = refVal[2].errors;
            else vErrors = vErrors.concat(refVal[2].errors);
            errors = vErrors.length;
          }
          var valid1 = errors === errs_1;
        }
        if (data.bottomRight !== undefined) {
          var errs_1 = errors;
          if (!refVal[2](data.bottomRight, (dataPath || '') + '.bottomRight', data, 'bottomRight', rootData)) {
            if (vErrors === null) vErrors = refVal[2].errors;
            else vErrors = vErrors.concat(refVal[2].errors);
            errors = vErrors.length;
          }
          var valid1 = errors === errs_1;
        }
        if (data.bodyLeft !== undefined) {
          var errs_1 = errors;
          if (!refVal[2](data.bodyLeft, (dataPath || '') + '.bodyLeft', data, 'bodyLeft', rootData)) {
            if (vErrors === null) vErrors = refVal[2].errors;
            else vErrors = vErrors.concat(refVal[2].errors);
            errors = vErrors.length;
          }
          var valid1 = errors === errs_1;
        }
        if (data.bodyRight !== undefined) {
          var errs_1 = errors;
          if (!refVal[2](data.bodyRight, (dataPath || '') + '.bodyRight', data, 'bodyRight', rootData)) {
            if (vErrors === null) vErrors = refVal[2].errors;
            else vErrors = vErrors.concat(refVal[2].errors);
            errors = vErrors.length;
          }
          var valid1 = errors === errs_1;
        }
        if (data.bodyJoin !== undefined) {
          var errs_1 = errors;
          if (!refVal[2](data.bodyJoin, (dataPath || '') + '.bodyJoin', data, 'bodyJoin', rootData)) {
            if (vErrors === null) vErrors = refVal[2].errors;
            else vErrors = vErrors.concat(refVal[2].errors);
            errors = vErrors.length;
          }
          var valid1 = errors === errs_1;
        }
        if (data.joinBody !== undefined) {
          var errs_1 = errors;
          if (!refVal[2](data.joinBody, (dataPath || '') + '.joinBody', data, 'joinBody', rootData)) {
            if (vErrors === null) vErrors = refVal[2].errors;
            else vErrors = vErrors.concat(refVal[2].errors);
            errors = vErrors.length;
          }
          var valid1 = errors === errs_1;
        }
        if (data.joinLeft !== undefined) {
          var errs_1 = errors;
          if (!refVal[2](data.joinLeft, (dataPath || '') + '.joinLeft', data, 'joinLeft', rootData)) {
            if (vErrors === null) vErrors = refVal[2].errors;
            else vErrors = vErrors.concat(refVal[2].errors);
            errors = vErrors.length;
          }
          var valid1 = errors === errs_1;
        }
        if (data.joinRight !== undefined) {
          var errs_1 = errors;
          if (!refVal[2](data.joinRight, (dataPath || '') + '.joinRight', data, 'joinRight', rootData)) {
            if (vErrors === null) vErrors = refVal[2].errors;
            else vErrors = vErrors.concat(refVal[2].errors);
            errors = vErrors.length;
          }
          var valid1 = errors === errs_1;
        }
        if (data.joinJoin !== undefined) {
          var errs_1 = errors;
          if (!refVal[2](data.joinJoin, (dataPath || '') + '.joinJoin', data, 'joinJoin', rootData)) {
            if (vErrors === null) vErrors = refVal[2].errors;
            else vErrors = vErrors.concat(refVal[2].errors);
            errors = vErrors.length;
          }
          var valid1 = errors === errs_1;
        }
      } else {
        var err = {
          keyword: 'type',
          dataPath: (dataPath || '') + "",
          schemaPath: '#/type',
          params: {
            type: 'object'
          },
          message: 'should be object'
        };
        if (vErrors === null) vErrors = [err];
        else vErrors.push(err);
        errors++;
      }
      validate.errors = vErrors;
      return errors === 0;
    };
  })();
  refVal1.schema = {
    "type": "object",
    "properties": {
      "topBody": {
        "$ref": "#/definitions/border"
      },
      "topJoin": {
        "$ref": "#/definitions/border"
      },
      "topLeft": {
        "$ref": "#/definitions/border"
      },
      "topRight": {
        "$ref": "#/definitions/border"
      },
      "bottomBody": {
        "$ref": "#/definitions/border"
      },
      "bottomJoin": {
        "$ref": "#/definitions/border"
      },
      "bottomLeft": {
        "$ref": "#/definitions/border"
      },
      "bottomRight": {
        "$ref": "#/definitions/border"
      },
      "bodyLeft": {
        "$ref": "#/definitions/border"
      },
      "bodyRight": {
        "$ref": "#/definitions/border"
      },
      "bodyJoin": {
        "$ref": "#/definitions/border"
      },
      "joinBody": {
        "$ref": "#/definitions/border"
      },
      "joinLeft": {
        "$ref": "#/definitions/border"
      },
      "joinRight": {
        "$ref": "#/definitions/border"
      },
      "joinJoin": {
        "$ref": "#/definitions/border"
      }
    },
    "additionalProperties": false
  };
  refVal1.errors = null;
  refVal[1] = refVal1;
  var refVal2 = (function() {
    var pattern0 = new RegExp('^[0-9]+$');
    return function validate(data, dataPath, parentData, parentDataProperty, rootData) {
      
      var vErrors = null;
      var errors = 0;
      if (typeof data !== "string") {
        var err = {
          keyword: 'type',
          dataPath: (dataPath || '') + "",
          schemaPath: '#/type',
          params: {
            type: 'string'
          },
          message: 'should be string'
        };
        if (vErrors === null) vErrors = [err];
        else vErrors.push(err);
        errors++;
      }
      validate.errors = vErrors;
      return errors === 0;
    };
  })();
  refVal2.schema = {
    "type": "string"
  };
  refVal2.errors = null;
  refVal[2] = refVal2;
  var refVal3 = (function() {
    var pattern0 = new RegExp('^[0-9]+$');
    return function validate(data, dataPath, parentData, parentDataProperty, rootData) {
      
      var vErrors = null;
      var errors = 0;
      if (rootData === undefined) rootData = data;
      if ((data && typeof data === "object" && !Array.isArray(data))) {
        var errs__0 = errors;
        var valid1 = true;
        for (var key0 in data) {
          var isAdditional0 = !(false || pattern0.test(key0));
          if (isAdditional0) {
            valid1 = false;
            var err = {
              keyword: 'additionalProperties',
              dataPath: (dataPath || '') + "",
              schemaPath: '#/additionalProperties',
              params: {
                additionalProperty: '' + key0 + ''
              },
              message: 'should NOT have additional properties'
            };
            if (vErrors === null) vErrors = [err];
            else vErrors.push(err);
            errors++;
          }
        }
        for (var key0 in data) {
          if (pattern0.test(key0)) {
            var errs_1 = errors;
            if (!refVal4(data[key0], (dataPath || '') + '[\'' + key0 + '\']', data, key0, rootData)) {
              if (vErrors === null) vErrors = refVal4.errors;
              else vErrors = vErrors.concat(refVal4.errors);
              errors = vErrors.length;
            }
            var valid1 = errors === errs_1;
          }
        }
      } else {
        var err = {
          keyword: 'type',
          dataPath: (dataPath || '') + "",
          schemaPath: '#/type',
          params: {
            type: 'object'
          },
          message: 'should be object'
        };
        if (vErrors === null) vErrors = [err];
        else vErrors.push(err);
        errors++;
      }
      validate.errors = vErrors;
      return errors === 0;
    };
  })();
  refVal3.schema = {
    "type": "object",
    "patternProperties": {
      "^[0-9]+$": {
        "$ref": "#/definitions/column"
      }
    },
    "additionalProperties": false
  };
  refVal3.errors = null;
  refVal[3] = refVal3;
  var refVal4 = (function() {
    var pattern0 = new RegExp('^[0-9]+$');
    return function validate(data, dataPath, parentData, parentDataProperty, rootData) {
      
      var vErrors = null;
      var errors = 0;
      if ((data && typeof data === "object" && !Array.isArray(data))) {
        var errs__0 = errors;
        var valid1 = true;
        for (var key0 in data) {
          var isAdditional0 = !(false || key0 == 'alignment' || key0 == 'width' || key0 == 'wrapWord' || key0 == 'truncate' || key0 == 'paddingLeft' || key0 == 'paddingRight');
          if (isAdditional0) {
            valid1 = false;
            var err = {
              keyword: 'additionalProperties',
              dataPath: (dataPath || '') + "",
              schemaPath: '#/additionalProperties',
              params: {
                additionalProperty: '' + key0 + ''
              },
              message: 'should NOT have additional properties'
            };
            if (vErrors === null) vErrors = [err];
            else vErrors.push(err);
            errors++;
          }
        }
        var data1 = data.alignment;
        if (data1 !== undefined) {
          var errs_1 = errors;
          if (typeof data1 !== "string") {
            var err = {
              keyword: 'type',
              dataPath: (dataPath || '') + '.alignment',
              schemaPath: '#/properties/alignment/type',
              params: {
                type: 'string'
              },
              message: 'should be string'
            };
            if (vErrors === null) vErrors = [err];
            else vErrors.push(err);
            errors++;
          }
          var schema1 = validate.schema.properties.alignment.enum;
          var valid1;
          valid1 = false;
          for (var i1 = 0; i1 < schema1.length; i1++)
            if (equal(data1, schema1[i1])) {
              valid1 = true;
              break;
            } if (!valid1) {
            var err = {
              keyword: 'enum',
              dataPath: (dataPath || '') + '.alignment',
              schemaPath: '#/properties/alignment/enum',
              params: {
                allowedValues: schema1
              },
              message: 'should be equal to one of the allowed values'
            };
            if (vErrors === null) vErrors = [err];
            else vErrors.push(err);
            errors++;
          }
          var valid1 = errors === errs_1;
        }
        if (data.width !== undefined) {
          var errs_1 = errors;
          if (typeof data.width !== "number") {
            var err = {
              keyword: 'type',
              dataPath: (dataPath || '') + '.width',
              schemaPath: '#/properties/width/type',
              params: {
                type: 'number'
              },
              message: 'should be number'
            };
            if (vErrors === null) vErrors = [err];
            else vErrors.push(err);
            errors++;
          }
          var valid1 = errors === errs_1;
        }
        if (data.wrapWord !== undefined) {
          var errs_1 = errors;
          if (typeof data.wrapWord !== "boolean") {
            var err = {
              keyword: 'type',
              dataPath: (dataPath || '') + '.wrapWord',
              schemaPath: '#/properties/wrapWord/type',
              params: {
                type: 'boolean'
              },
              message: 'should be boolean'
            };
            if (vErrors === null) vErrors = [err];
            else vErrors.push(err);
            errors++;
          }
          var valid1 = errors === errs_1;
        }
        if (data.truncate !== undefined) {
          var errs_1 = errors;
          if (typeof data.truncate !== "number") {
            var err = {
              keyword: 'type',
              dataPath: (dataPath || '') + '.truncate',
              schemaPath: '#/properties/truncate/type',
              params: {
                type: 'number'
              },
              message: 'should be number'
            };
            if (vErrors === null) vErrors = [err];
            else vErrors.push(err);
            errors++;
          }
          var valid1 = errors === errs_1;
        }
        if (data.paddingLeft !== undefined) {
          var errs_1 = errors;
          if (typeof data.paddingLeft !== "number") {
            var err = {
              keyword: 'type',
              dataPath: (dataPath || '') + '.paddingLeft',
              schemaPath: '#/properties/paddingLeft/type',
              params: {
                type: 'number'
              },
              message: 'should be number'
            };
            if (vErrors === null) vErrors = [err];
            else vErrors.push(err);
            errors++;
          }
          var valid1 = errors === errs_1;
        }
        if (data.paddingRight !== undefined) {
          var errs_1 = errors;
          if (typeof data.paddingRight !== "number") {
            var err = {
              keyword: 'type',
              dataPath: (dataPath || '') + '.paddingRight',
              schemaPath: '#/properties/paddingRight/type',
              params: {
                type: 'number'
              },
              message: 'should be number'
            };
            if (vErrors === null) vErrors = [err];
            else vErrors.push(err);
            errors++;
          }
          var valid1 = errors === errs_1;
        }
      } else {
        var err = {
          keyword: 'type',
          dataPath: (dataPath || '') + "",
          schemaPath: '#/type',
          params: {
            type: 'object'
          },
          message: 'should be object'
        };
        if (vErrors === null) vErrors = [err];
        else vErrors.push(err);
        errors++;
      }
      validate.errors = vErrors;
      return errors === 0;
    };
  })();
  refVal4.schema = {
    "type": "object",
    "properties": {
      "alignment": {
        "type": "string",
        "enum": ["left", "right", "center"]
      },
      "width": {
        "type": "number"
      },
      "wrapWord": {
        "type": "boolean"
      },
      "truncate": {
        "type": "number"
      },
      "paddingLeft": {
        "type": "number"
      },
      "paddingRight": {
        "type": "number"
      }
    },
    "additionalProperties": false
  };
  refVal4.errors = null;
  refVal[4] = refVal4;
  return function validate(data, dataPath, parentData, parentDataProperty, rootData) {
     /*# sourceURL=config.json */
    var vErrors = null;
    var errors = 0;
    if (rootData === undefined) rootData = data;
    if ((data && typeof data === "object" && !Array.isArray(data))) {
      var errs__0 = errors;
      var valid1 = true;
      for (var key0 in data) {
        var isAdditional0 = !(false || key0 == 'border' || key0 == 'columns' || key0 == 'columnDefault' || key0 == 'drawHorizontalLine');
        if (isAdditional0) {
          valid1 = false;
          var err = {
            keyword: 'additionalProperties',
            dataPath: (dataPath || '') + "",
            schemaPath: '#/additionalProperties',
            params: {
              additionalProperty: '' + key0 + ''
            },
            message: 'should NOT have additional properties'
          };
          if (vErrors === null) vErrors = [err];
          else vErrors.push(err);
          errors++;
        }
      }
      if (data.border !== undefined) {
        var errs_1 = errors;
        if (!refVal1(data.border, (dataPath || '') + '.border', data, 'border', rootData)) {
          if (vErrors === null) vErrors = refVal1.errors;
          else vErrors = vErrors.concat(refVal1.errors);
          errors = vErrors.length;
        }
        var valid1 = errors === errs_1;
      }
      if (data.columns !== undefined) {
        var errs_1 = errors;
        if (!refVal3(data.columns, (dataPath || '') + '.columns', data, 'columns', rootData)) {
          if (vErrors === null) vErrors = refVal3.errors;
          else vErrors = vErrors.concat(refVal3.errors);
          errors = vErrors.length;
        }
        var valid1 = errors === errs_1;
      }
      if (data.columnDefault !== undefined) {
        var errs_1 = errors;
        if (!refVal[4](data.columnDefault, (dataPath || '') + '.columnDefault', data, 'columnDefault', rootData)) {
          if (vErrors === null) vErrors = refVal[4].errors;
          else vErrors = vErrors.concat(refVal[4].errors);
          errors = vErrors.length;
        }
        var valid1 = errors === errs_1;
      }
      if (data.drawHorizontalLine !== undefined) {
        var errs_1 = errors;
        var errs__1 = errors;
        var valid1;
        valid1 = typeof data.drawHorizontalLine == "function";
        if (!valid1) {
          if (errs__1 == errors) {
            var err = {
              keyword: 'typeof',
              dataPath: (dataPath || '') + '.drawHorizontalLine',
              schemaPath: '#/properties/drawHorizontalLine/typeof',
              params: {
                keyword: 'typeof'
              },
              message: 'should pass "typeof" keyword validation'
            };
            if (vErrors === null) vErrors = [err];
            else vErrors.push(err);
            errors++;
          } else {
            for (var i1 = errs__1; i1 < errors; i1++) {
              var ruleErr1 = vErrors[i1];
              if (ruleErr1.dataPath === undefined) ruleErr1.dataPath = (dataPath || '') + '.drawHorizontalLine';
              if (ruleErr1.schemaPath === undefined) {
                ruleErr1.schemaPath = "#/properties/drawHorizontalLine/typeof";
              }
            }
          }
        }
        var valid1 = errors === errs_1;
      }
    } else {
      var err = {
        keyword: 'type',
        dataPath: (dataPath || '') + "",
        schemaPath: '#/type',
        params: {
          type: 'object'
        },
        message: 'should be object'
      };
      if (vErrors === null) vErrors = [err];
      else vErrors.push(err);
      errors++;
    }
    validate.errors = vErrors;
    return errors === 0;
  };
})();
validate.schema = {
  "$id": "config.json",
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "properties": {
    "border": {
      "$ref": "#/definitions/borders"
    },
    "columns": {
      "$ref": "#/definitions/columns"
    },
    "columnDefault": {
      "$ref": "#/definitions/column"
    },
    "drawHorizontalLine": {
      "typeof": "function"
    }
  },
  "additionalProperties": false,
  "definitions": {
    "columns": {
      "type": "object",
      "patternProperties": {
        "^[0-9]+$": {
          "$ref": "#/definitions/column"
        }
      },
      "additionalProperties": false
    },
    "column": {
      "type": "object",
      "properties": {
        "alignment": {
          "type": "string",
          "enum": ["left", "right", "center"]
        },
        "width": {
          "type": "number"
        },
        "wrapWord": {
          "type": "boolean"
        },
        "truncate": {
          "type": "number"
        },
        "paddingLeft": {
          "type": "number"
        },
        "paddingRight": {
          "type": "number"
        }
      },
      "additionalProperties": false
    },
    "borders": {
      "type": "object",
      "properties": {
        "topBody": {
          "$ref": "#/definitions/border"
        },
        "topJoin": {
          "$ref": "#/definitions/border"
        },
        "topLeft": {
          "$ref": "#/definitions/border"
        },
        "topRight": {
          "$ref": "#/definitions/border"
        },
        "bottomBody": {
          "$ref": "#/definitions/border"
        },
        "bottomJoin": {
          "$ref": "#/definitions/border"
        },
        "bottomLeft": {
          "$ref": "#/definitions/border"
        },
        "bottomRight": {
          "$ref": "#/definitions/border"
        },
        "bodyLeft": {
          "$ref": "#/definitions/border"
        },
        "bodyRight": {
          "$ref": "#/definitions/border"
        },
        "bodyJoin": {
          "$ref": "#/definitions/border"
        },
        "joinBody": {
          "$ref": "#/definitions/border"
        },
        "joinLeft": {
          "$ref": "#/definitions/border"
        },
        "joinRight": {
          "$ref": "#/definitions/border"
        },
        "joinJoin": {
          "$ref": "#/definitions/border"
        }
      },
      "additionalProperties": false
    },
    "border": {
      "type": "string"
    }
  }
};
validate.errors = null;
module.exports = validate;
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1578386726657, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _calculateCellWidthIndex = _interopRequireDefault(require("./calculateCellWidthIndex"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Produces an array of values that describe the largest value length (width) in every column.
 *
 * @param {Array[]} rows
 * @returns {number[]}
 */
const calculateMaximumColumnWidthIndex = rows => {
  if (!rows[0]) {
    throw new Error('Dataset must have at least one row.');
  }

  const columns = new Array(rows[0].length).fill(0);
  rows.forEach(row => {
    const columnWidthIndex = (0, _calculateCellWidthIndex.default)(row);
    columnWidthIndex.forEach((valueWidth, index0) => {
      if (columns[index0] < valueWidth) {
        columns[index0] = valueWidth;
      }
    });
  });
  return columns;
};

var _default = calculateMaximumColumnWidthIndex;
exports.default = _default;
//# sourceMappingURL=calculateMaximumColumnWidthIndex.js.map
}, function(modId) { var map = {"./calculateCellWidthIndex":1578386726653}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1578386726658, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _max2 = _interopRequireDefault(require("lodash/max"));

var _isBoolean2 = _interopRequireDefault(require("lodash/isBoolean"));

var _isNumber2 = _interopRequireDefault(require("lodash/isNumber"));

var _calculateCellHeight = _interopRequireDefault(require("./calculateCellHeight"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Calculates the vertical row span index.
 *
 * @param {Array[]} rows
 * @param {Object} config
 * @returns {number[]}
 */
const calculateRowHeightIndex = (rows, config) => {
  const tableWidth = rows[0].length;
  const rowSpanIndex = [];
  rows.forEach(cells => {
    const cellHeightIndex = new Array(tableWidth).fill(1);
    cells.forEach((value, index1) => {
      if (!(0, _isNumber2.default)(config.columns[index1].width)) {
        throw new TypeError('column[index].width must be a number.');
      }

      if (!(0, _isBoolean2.default)(config.columns[index1].wrapWord)) {
        throw new TypeError('column[index].wrapWord must be a boolean.');
      }

      cellHeightIndex[index1] = (0, _calculateCellHeight.default)(value, config.columns[index1].width, config.columns[index1].wrapWord);
    });
    rowSpanIndex.push((0, _max2.default)(cellHeightIndex));
  });
  return rowSpanIndex;
};

var _default = calculateRowHeightIndex;
exports.default = _default;
//# sourceMappingURL=calculateRowHeightIndex.js.map
}, function(modId) { var map = {"./calculateCellHeight":1578386726659}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1578386726659, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _isString2 = _interopRequireDefault(require("lodash/isString"));

var _wrapCell = _interopRequireDefault(require("./wrapCell"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @param {string} value
 * @param {number} columnWidth
 * @param {boolean} useWrapWord
 * @returns {number}
 */
const calculateCellHeight = (value, columnWidth, useWrapWord = false) => {
  if (!(0, _isString2.default)(value)) {
    throw new TypeError('Value must be a string.');
  }

  if (!Number.isInteger(columnWidth)) {
    throw new TypeError('Column width must be an integer.');
  }

  if (columnWidth < 1) {
    throw new Error('Column width must be greater than 0.');
  }

  return (0, _wrapCell.default)(value, columnWidth, useWrapWord).length;
};

var _default = calculateCellHeight;
exports.default = _default;
//# sourceMappingURL=calculateCellHeight.js.map
}, function(modId) { var map = {"./wrapCell":1578386726660}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1578386726660, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _wrapString = _interopRequireDefault(require("./wrapString"));

var _wrapWord = _interopRequireDefault(require("./wrapWord"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Wrap a single cell value into a list of lines
 *
 * Always wraps on newlines, for the remainder uses either word or string wrapping
 * depending on user configuration.
 *
 * @param {string} cellValue
 * @param {number} columnWidth
 * @param {boolean} useWrapWord
 * @returns {Array}
 */
const wrapCell = (cellValue, columnWidth, useWrapWord) => {
  // First split on literal newlines
  const cellLines = cellValue.split('\n'); // Then iterate over the list and word-wrap every remaining line if necessary.

  for (let lineNr = 0; lineNr < cellLines.length;) {
    let lineChunks;

    if (useWrapWord) {
      lineChunks = (0, _wrapWord.default)(cellLines[lineNr], columnWidth);
    } else {
      lineChunks = (0, _wrapString.default)(cellLines[lineNr], columnWidth);
    } // Replace our original array element with whatever the wrapping returned


    cellLines.splice(lineNr, 1, ...lineChunks);
    lineNr += lineChunks.length;
  }

  return cellLines;
};

var _default = wrapCell;
exports.default = _default;
//# sourceMappingURL=wrapCell.js.map
}, function(modId) { var map = {"./wrapString":1578386726661,"./wrapWord":1578386726662}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1578386726661, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _sliceAnsi = _interopRequireDefault(require("slice-ansi"));

var _stringWidth = _interopRequireDefault(require("string-width"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Creates an array of strings split into groups the length of size.
 * This function works with strings that contain ASCII characters.
 *
 * wrapText is different from would-be "chunk" implementation
 * in that whitespace characters that occur on a chunk size limit are trimmed.
 *
 * @param {string} subject
 * @param {number} size
 * @returns {Array}
 */
const wrapString = (subject, size) => {
  let subjectSlice;
  subjectSlice = subject;
  const chunks = [];

  do {
    chunks.push((0, _sliceAnsi.default)(subjectSlice, 0, size));
    subjectSlice = (0, _sliceAnsi.default)(subjectSlice, size).trim();
  } while ((0, _stringWidth.default)(subjectSlice));

  return chunks;
};

var _default = wrapString;
exports.default = _default;
//# sourceMappingURL=wrapString.js.map
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1578386726662, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _sliceAnsi = _interopRequireDefault(require("slice-ansi"));

var _stringWidth = _interopRequireDefault(require("string-width"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @param {string} input
 * @param {number} size
 * @returns {Array}
 */
const wrapWord = (input, size) => {
  let subject;
  subject = input;
  const chunks = []; // https://regex101.com/r/gY5kZ1/1

  const re = new RegExp('(^.{1,' + size + '}(\\s+|$))|(^.{1,' + (size - 1) + '}(\\\\|/|_|\\.|,|;|-))');

  do {
    let chunk;
    chunk = subject.match(re);

    if (chunk) {
      chunk = chunk[0];
      subject = (0, _sliceAnsi.default)(subject, (0, _stringWidth.default)(chunk));
      chunk = chunk.trim();
    } else {
      chunk = (0, _sliceAnsi.default)(subject, 0, size);
      subject = (0, _sliceAnsi.default)(subject, size);
    }

    chunks.push(chunk);
  } while ((0, _stringWidth.default)(subject));

  return chunks;
};

var _default = wrapWord;
exports.default = _default;
//# sourceMappingURL=wrapWord.js.map
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1578386726663, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _flatten2 = _interopRequireDefault(require("lodash/flatten"));

var _times2 = _interopRequireDefault(require("lodash/times"));

var _wrapCell = _interopRequireDefault(require("./wrapCell"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @param {Array} unmappedRows
 * @param {number[]} rowHeightIndex
 * @param {Object} config
 * @returns {Array}
 */
const mapDataUsingRowHeightIndex = (unmappedRows, rowHeightIndex, config) => {
  const tableWidth = unmappedRows[0].length;
  const mappedRows = unmappedRows.map((cells, index0) => {
    const rowHeight = (0, _times2.default)(rowHeightIndex[index0], () => {
      return new Array(tableWidth).fill('');
    }); // rowHeight
    //     [{row index within rowSaw; index2}]
    //     [{cell index within a virtual row; index1}]

    cells.forEach((value, index1) => {
      const cellLines = (0, _wrapCell.default)(value, config.columns[index1].width, config.columns[index1].wrapWord);
      cellLines.forEach((cellLine, index2) => {
        rowHeight[index2][index1] = cellLine;
      });
    });
    return rowHeight;
  });
  return (0, _flatten2.default)(mappedRows);
};

var _default = mapDataUsingRowHeightIndex;
exports.default = _default;
//# sourceMappingURL=mapDataUsingRowHeightIndex.js.map
}, function(modId) { var map = {"./wrapCell":1578386726660}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1578386726664, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _stringWidth = _interopRequireDefault(require("string-width"));

var _alignString = _interopRequireDefault(require("./alignString"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @param {table~row[]} rows
 * @param {Object} config
 * @returns {table~row[]}
 */
const alignTableData = (rows, config) => {
  return rows.map(cells => {
    return cells.map((value, index1) => {
      const column = config.columns[index1];

      if ((0, _stringWidth.default)(value) === column.width) {
        return value;
      } else {
        return (0, _alignString.default)(value, column.width, column.alignment);
      }
    });
  });
};

var _default = alignTableData;
exports.default = _default;
//# sourceMappingURL=alignTableData.js.map
}, function(modId) { var map = {"./alignString":1578386726665}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1578386726665, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _isNumber2 = _interopRequireDefault(require("lodash/isNumber"));

var _isString2 = _interopRequireDefault(require("lodash/isString"));

var _stringWidth = _interopRequireDefault(require("string-width"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const alignments = ['left', 'right', 'center'];
/**
 * @param {string} subject
 * @param {number} width
 * @returns {string}
 */

const alignLeft = (subject, width) => {
  return subject + ' '.repeat(width);
};
/**
 * @param {string} subject
 * @param {number} width
 * @returns {string}
 */


const alignRight = (subject, width) => {
  return ' '.repeat(width) + subject;
};
/**
 * @param {string} subject
 * @param {number} width
 * @returns {string}
 */


const alignCenter = (subject, width) => {
  let halfWidth;
  halfWidth = width / 2;

  if (halfWidth % 2 === 0) {
    return ' '.repeat(halfWidth) + subject + ' '.repeat(halfWidth);
  } else {
    halfWidth = Math.floor(halfWidth);
    return ' '.repeat(halfWidth) + subject + ' '.repeat(halfWidth + 1);
  }
};
/**
 * Pads a string to the left and/or right to position the subject
 * text in a desired alignment within a container.
 *
 * @param {string} subject
 * @param {number} containerWidth
 * @param {string} alignment One of the valid options (left, right, center).
 * @returns {string}
 */


const alignString = (subject, containerWidth, alignment) => {
  if (!(0, _isString2.default)(subject)) {
    throw new TypeError('Subject parameter value must be a string.');
  }

  if (!(0, _isNumber2.default)(containerWidth)) {
    throw new TypeError('Container width parameter value must be a number.');
  }

  const subjectWidth = (0, _stringWidth.default)(subject);

  if (subjectWidth > containerWidth) {
    // console.log('subjectWidth', subjectWidth, 'containerWidth', containerWidth, 'subject', subject);
    throw new Error('Subject parameter value width cannot be greater than the container width.');
  }

  if (!(0, _isString2.default)(alignment)) {
    throw new TypeError('Alignment parameter value must be a string.');
  }

  if (!alignments.includes(alignment)) {
    throw new Error('Alignment parameter value must be a known alignment parameter value (left, right, center).');
  }

  if (subjectWidth === 0) {
    return ' '.repeat(containerWidth);
  }

  const availableWidth = containerWidth - subjectWidth;

  if (alignment === 'left') {
    return alignLeft(subject, availableWidth);
  }

  if (alignment === 'right') {
    return alignRight(subject, availableWidth);
  }

  return alignCenter(subject, availableWidth);
};

var _default = alignString;
exports.default = _default;
//# sourceMappingURL=alignString.js.map
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1578386726666, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * @param {table~row[]} rows
 * @param {Object} config
 * @returns {table~row[]}
 */
const padTableData = (rows, config) => {
  return rows.map(cells => {
    return cells.map((value, index1) => {
      const column = config.columns[index1];
      return ' '.repeat(column.paddingLeft) + value + ' '.repeat(column.paddingRight);
    });
  });
};

var _default = padTableData;
exports.default = _default;
//# sourceMappingURL=padTableData.js.map
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1578386726667, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * @typedef {string} cell
 */

/**
 * @typedef {cell[]} validateData~column
 */

/**
 * @param {column[]} rows
 * @returns {undefined}
 */
const validateTableData = rows => {
  if (!Array.isArray(rows)) {
    throw new TypeError('Table data must be an array.');
  }

  if (rows.length === 0) {
    throw new Error('Table must define at least one row.');
  }

  if (rows[0].length === 0) {
    throw new Error('Table must define at least one column.');
  }

  const columnNumber = rows[0].length;
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = rows[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      const cells = _step.value;

      if (!Array.isArray(cells)) {
        throw new TypeError('Table row data must be an array.');
      }

      if (cells.length !== columnNumber) {
        throw new Error('Table must have a consistent number of cells.');
      }

      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = cells[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          const cell = _step2.value;

          // eslint-disable-next-line no-control-regex
          if (/[\u0001-\u0006\u0008-\u0009\u000B-\u001A]/.test(cell)) {
            throw new Error('Table data must not contain control characters.');
          }
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return != null) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
};

var _default = validateTableData;
exports.default = _default;
//# sourceMappingURL=validateTableData.js.map
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1578386726668, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * Casts all cell values to a string.
 *
 * @param {table~row[]} rows
 * @returns {table~row[]}
 */
const stringifyTableData = rows => {
  return rows.map(cells => {
    return cells.map(String);
  });
};

var _default = stringifyTableData;
exports.default = _default;
//# sourceMappingURL=stringifyTableData.js.map
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1578386726669, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _truncate2 = _interopRequireDefault(require("lodash/truncate"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @todo Make it work with ASCII content.
 * @param {table~row[]} rows
 * @param {Object} config
 * @returns {table~row[]}
 */
const truncateTableData = (rows, config) => {
  return rows.map(cells => {
    return cells.map((content, index) => {
      return (0, _truncate2.default)(content, {
        length: config.columns[index].truncate
      });
    });
  });
};

var _default = truncateTableData;
exports.default = _default;
//# sourceMappingURL=truncateTableData.js.map
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1578386726670, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mapValues2 = _interopRequireDefault(require("lodash/mapValues"));

var _values2 = _interopRequireDefault(require("lodash/values"));

var _trimEnd2 = _interopRequireDefault(require("lodash/trimEnd"));

var _makeStreamConfig = _interopRequireDefault(require("./makeStreamConfig"));

var _drawRow = _interopRequireDefault(require("./drawRow"));

var _drawBorder = require("./drawBorder");

var _stringifyTableData = _interopRequireDefault(require("./stringifyTableData"));

var _truncateTableData = _interopRequireDefault(require("./truncateTableData"));

var _mapDataUsingRowHeightIndex = _interopRequireDefault(require("./mapDataUsingRowHeightIndex"));

var _alignTableData = _interopRequireDefault(require("./alignTableData"));

var _padTableData = _interopRequireDefault(require("./padTableData"));

var _calculateRowHeightIndex = _interopRequireDefault(require("./calculateRowHeightIndex"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @param {Array} data
 * @param {Object} config
 * @returns {Array}
 */
const prepareData = (data, config) => {
  let rows;
  rows = (0, _stringifyTableData.default)(data);
  rows = (0, _truncateTableData.default)(data, config);
  const rowHeightIndex = (0, _calculateRowHeightIndex.default)(rows, config);
  rows = (0, _mapDataUsingRowHeightIndex.default)(rows, rowHeightIndex, config);
  rows = (0, _alignTableData.default)(rows, config);
  rows = (0, _padTableData.default)(rows, config);
  return rows;
};
/**
 * @param {string[]} row
 * @param {number[]} columnWidthIndex
 * @param {Object} config
 * @returns {undefined}
 */


const create = (row, columnWidthIndex, config) => {
  const rows = prepareData([row], config);
  const body = rows.map(literalRow => {
    return (0, _drawRow.default)(literalRow, config.border);
  }).join('');
  let output;
  output = '';
  output += (0, _drawBorder.drawBorderTop)(columnWidthIndex, config.border);
  output += body;
  output += (0, _drawBorder.drawBorderBottom)(columnWidthIndex, config.border);
  output = (0, _trimEnd2.default)(output);
  process.stdout.write(output);
};
/**
 * @param {string[]} row
 * @param {number[]} columnWidthIndex
 * @param {Object} config
 * @returns {undefined}
 */


const append = (row, columnWidthIndex, config) => {
  const rows = prepareData([row], config);
  const body = rows.map(literalRow => {
    return (0, _drawRow.default)(literalRow, config.border);
  }).join('');
  let output = '';
  const bottom = (0, _drawBorder.drawBorderBottom)(columnWidthIndex, config.border);

  if (bottom !== '\n') {
    output = '\r\u001B[K';
  }

  output += (0, _drawBorder.drawBorderJoin)(columnWidthIndex, config.border);
  output += body;
  output += bottom;
  output = (0, _trimEnd2.default)(output);
  process.stdout.write(output);
};
/**
 * @param {Object} userConfig
 * @returns {Object}
 */


const createStream = (userConfig = {}) => {
  const config = (0, _makeStreamConfig.default)(userConfig); // @todo Use 'Object.values' when Node.js v6 support is dropped.

  const columnWidthIndex = (0, _values2.default)((0, _mapValues2.default)(config.columns, column => {
    return column.width + column.paddingLeft + column.paddingRight;
  }));
  let empty;
  empty = true;
  return {
    /**
     * @param {string[]} row
     * @returns {undefined}
     */
    write: row => {
      if (row.length !== config.columnCount) {
        throw new Error('Row cell count does not match the config.columnCount.');
      }

      if (empty) {
        empty = false;
        return create(row, columnWidthIndex, config);
      } else {
        return append(row, columnWidthIndex, config);
      }
    }
  };
};

var _default = createStream;
exports.default = _default;
//# sourceMappingURL=createStream.js.map
}, function(modId) { var map = {"./makeStreamConfig":1578386726671,"./drawRow":1578386726652,"./drawBorder":1578386726651,"./stringifyTableData":1578386726668,"./truncateTableData":1578386726669,"./mapDataUsingRowHeightIndex":1578386726663,"./alignTableData":1578386726664,"./padTableData":1578386726666,"./calculateRowHeightIndex":1578386726658}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1578386726671, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _cloneDeep2 = _interopRequireDefault(require("lodash/cloneDeep"));

var _isUndefined2 = _interopRequireDefault(require("lodash/isUndefined"));

var _times2 = _interopRequireDefault(require("lodash/times"));

var _getBorderCharacters = _interopRequireDefault(require("./getBorderCharacters"));

var _validateConfig = _interopRequireDefault(require("./validateConfig"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Merges user provided border characters with the default border ("honeywell") characters.
 *
 * @param {Object} border
 * @returns {Object}
 */
const makeBorder = (border = {}) => {
  return Object.assign({}, (0, _getBorderCharacters.default)('honeywell'), border);
};
/**
 * Creates a configuration for every column using default
 * values for the missing configuration properties.
 *
 * @param {number} columnCount
 * @param {Object} columns
 * @param {Object} columnDefault
 * @returns {Object}
 */


const makeColumns = (columnCount, columns = {}, columnDefault = {}) => {
  (0, _times2.default)(columnCount, index => {
    if ((0, _isUndefined2.default)(columns[index])) {
      columns[index] = {};
    }

    columns[index] = Object.assign({
      alignment: 'left',
      paddingLeft: 1,
      paddingRight: 1,
      truncate: Infinity,
      wrapWord: false
    }, columnDefault, columns[index]);
  });
  return columns;
};
/**
 * @typedef {Object} columnConfig
 * @property {string} alignment
 * @property {number} width
 * @property {number} truncate
 * @property {number} paddingLeft
 * @property {number} paddingRight
 */

/**
 * @typedef {Object} streamConfig
 * @property {columnConfig} columnDefault
 * @property {Object} border
 * @property {columnConfig[]}
 * @property {number} columnCount Number of columns in the table (required).
 */

/**
 * Makes a new configuration object out of the userConfig object
 * using default values for the missing configuration properties.
 *
 * @param {streamConfig} userConfig
 * @returns {Object}
 */


const makeStreamConfig = (userConfig = {}) => {
  (0, _validateConfig.default)('streamConfig.json', userConfig);
  const config = (0, _cloneDeep2.default)(userConfig);

  if (!config.columnDefault || !config.columnDefault.width) {
    throw new Error('Must provide config.columnDefault.width when creating a stream.');
  }

  if (!config.columnCount) {
    throw new Error('Must provide config.columnCount.');
  }

  config.border = makeBorder(config.border);
  config.columns = makeColumns(config.columnCount, config.columns, config.columnDefault);
  return config;
};

var _default = makeStreamConfig;
exports.default = _default;
//# sourceMappingURL=makeStreamConfig.js.map
}, function(modId) { var map = {"./getBorderCharacters":1578386726655,"./validateConfig":1578386726656}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1578386726648);
})()
//# sourceMappingURL=index.js.map