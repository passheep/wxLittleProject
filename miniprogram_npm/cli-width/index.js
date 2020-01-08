module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1578386725989, function(require, module, exports) {


exports = module.exports = cliWidth;

function normalizeOpts(options) {
  var defaultOpts = {
    defaultWidth: 0,
    output: process.stdout,
    tty: require('tty')
  };

  if (!options) {
    return defaultOpts;
  } else {
    Object.keys(defaultOpts).forEach(function (key) {
      if (!options[key]) {
        options[key] = defaultOpts[key];
      }
    });

    return options;
  }
}

function cliWidth(options) {
  var opts = normalizeOpts(options);

  if (opts.output.getWindowSize) {
    return opts.output.getWindowSize()[0] || opts.defaultWidth;
  } else {
    if (opts.tty.getWindowSize) {
      return opts.tty.getWindowSize()[1] || opts.defaultWidth;
    } else {
      if (opts.output.columns) {
        return opts.output.columns;
      } else {
        if (process.env.CLI_WIDTH) {
          var width = parseInt(process.env.CLI_WIDTH, 10);

          if (!isNaN(width) && width !== 0) {
            return width;
          }
        }
      }

      return opts.defaultWidth;
    }
  }
};

}, function(modId) {var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1578386725989);
})()
//# sourceMappingURL=index.js.map