module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1578386726419, function(require, module, exports) {

const path = require('path');
const resolveFrom = require('resolve-from');
const parentModule = require('parent-module');

module.exports = moduleId => {
	if (typeof moduleId !== 'string') {
		throw new TypeError('Expected a string');
	}

	const parentPath = parentModule(__filename);

	const filePath = resolveFrom(path.dirname(parentPath), moduleId);

	const oldModule = require.cache[filePath];
	// Delete itself from module parent
	if (oldModule && oldModule.parent) {
		let i = oldModule.parent.children.length;

		while (i--) {
			if (oldModule.parent.children[i].id === filePath) {
				oldModule.parent.children.splice(i, 1);
			}
		}
	}

	delete require.cache[filePath]; // Delete module from cache

	const parent = require.cache[parentPath]; // If `filePath` and `parentPath` are the same, cache will already be deleted so we won't get a memory leak in next step

	return parent === undefined ? require(filePath) : parent.require(filePath); // In case cache doesn't have parent, fall back to normal require
};

}, function(modId) {var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1578386726419);
})()
//# sourceMappingURL=index.js.map