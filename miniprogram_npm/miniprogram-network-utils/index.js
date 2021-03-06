module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1578386726498, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
/// <reference lib="es5"/>
/// <reference lib="es2015.core"/>
// tslint:disable-next-line:no-import-side-effect
require("./promise.finally");
/**
 * 构建url参数
 * /users/{id} ==> /users/123
 * @param url - url 相对地址或者绝对地址
 * @param params - Obejct 键值对 替换的参数列表
 * @param baseUrl - 根目录，当url以https://或者http://开头忽略此参数
 * @returns 完整参数URL
 */
function buildParams(url, params, baseUrl) {
    if (url && params) {
        Object.keys(params)
            .forEach(function (key) {
            // tslint:disable-next-line:no-parameter-reassignment prefer-type-cast
            url = url.replace(new RegExp("{" + key + "}", 'g'), params[key]);
        });
    }
    // tslint:disable-next-line:no-http-string
    if (url && (url.startsWith('https://') || url.startsWith('http://'))) {
        return url;
    }
    else {
        return (baseUrl || '') + url;
    }
}
exports.buildParams = buildParams;
/**
 * 合并公共配置
 * @param data - new configuration for wechat operation
 * @param options - default global configuration
 * @param extendKeys - key need copy to data
 */
function getCommonOptions(data, options, extendKeys) {
    ['expire'].concat(extendKeys).forEach(function (v) {
        if (options[v] !== undefined) {
            // tslint:disable-next-line: no-unsafe-any
            data[v] = options[v];
        }
    });
    return data;
}
exports.getCommonOptions = getCommonOptions;
//# sourceMappingURL=index.js.map
}, function(modId) {var map = {"./promise.finally":1578386726499}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1578386726499, function(require, module, exports) {

if (!Promise.prototype.finally) {
    Promise.prototype.finally = function (onfinally) {
        if (onfinally) {
            var P_1 = this.constructor;
            // tslint:disable
            return this.then(function (value) { return P_1.resolve(onfinally()).then(function () { return value; }); }, function (reason) { return P_1.resolve(onfinally()).then(function () { throw reason; }); });
        }
        else {
            return this;
        }
    };
}
//# sourceMappingURL=promise.finally.js.map
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1578386726498);
})()
//# sourceMappingURL=index.js.map