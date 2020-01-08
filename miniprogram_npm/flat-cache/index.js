module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1578386726384, function(require, module, exports) {
var path = require( 'path' );
var fs = require( 'fs' );
var utils = require( './utils' );
var del = require( './del' );
var writeJSON = utils.writeJSON;

var cache = {
  /**
   * Load a cache identified by the given Id. If the element does not exists, then initialize an empty
   * cache storage. If specified `cacheDir` will be used as the directory to persist the data to. If omitted
   * then the cache module directory `./cache` will be used instead
   *
   * @method load
   * @param docId {String} the id of the cache, would also be used as the name of the file cache
   * @param [cacheDir] {String} directory for the cache entry
   */
  load: function ( docId, cacheDir ) {
    var me = this;

    me._visited = { };
    me._persisted = { };
    me._pathToFile = cacheDir ? path.resolve( cacheDir, docId ) : path.resolve( __dirname, './.cache/', docId );

    if ( fs.existsSync( me._pathToFile ) ) {
      me._persisted = utils.tryParse( me._pathToFile, { } );
    }
  },

  /**
   * Load the cache from the provided file
   * @method loadFile
   * @param  {String} pathToFile the path to the file containing the info for the cache
   */
  loadFile: function ( pathToFile ) {
    var me = this;
    var dir = path.dirname( pathToFile );
    var fName = path.basename( pathToFile );

    me.load( fName, dir );
  },

  /**
   * Returns the entire persisted object
   * @method all
   * @returns {*}
   */
  all: function () {
    return this._persisted;
  },

  keys: function () {
    return Object.keys( this._persisted );
  },
  /**
   * sets a key to a given value
   * @method setKey
   * @param key {string} the key to set
   * @param value {object} the value of the key. Could be any object that can be serialized with JSON.stringify
   */
  setKey: function ( key, value ) {
    this._visited[ key ] = true;
    this._persisted[ key ] = value;
  },
  /**
   * remove a given key from the cache
   * @method removeKey
   * @param key {String} the key to remove from the object
   */
  removeKey: function ( key ) {
    delete this._visited[ key ]; // esfmt-ignore-line
    delete this._persisted[ key ]; // esfmt-ignore-line
  },
  /**
   * Return the value of the provided key
   * @method getKey
   * @param key {String} the name of the key to retrieve
   * @returns {*} the value from the key
   */
  getKey: function ( key ) {
    this._visited[ key ] = true;
    return this._persisted[ key ];
  },

  /**
   * Remove keys that were not accessed/set since the
   * last time the `prune` method was called.
   * @method _prune
   * @private
   */
  _prune: function () {
    var me = this;
    var obj = { };

    var keys = Object.keys( me._visited );

    // no keys visited for either get or set value
    if ( keys.length === 0 ) {
      return;
    }

    keys.forEach( function ( key ) {
      obj[ key ] = me._persisted[ key ];
    } );

    me._visited = { };
    me._persisted = obj;
  },

  /**
   * Save the state of the cache identified by the docId to disk
   * as a JSON structure
   * @param [noPrune=false] {Boolean} whether to remove from cache the non visited files
   * @method save
   */
  save: function ( noPrune ) {
    var me = this;

    (!noPrune) && me._prune();
    writeJSON( me._pathToFile, me._persisted );
  },

  /**
   * remove the file where the cache is persisted
   * @method removeCacheFile
   * @return {Boolean} true or false if the file was successfully deleted
   */
  removeCacheFile: function () {
    return del( this._pathToFile );
  },
  /**
   * Destroy the file cache and cache content.
   * @method destroy
   */
  destroy: function () {
    var me = this;
    me._visited = { };
    me._persisted = { };

    me.removeCacheFile();
  }
};

module.exports = {
  /**
   * Alias for create. Should be considered depreacted. Will be removed in next releases
   *
   * @method load
   * @param docId {String} the id of the cache, would also be used as the name of the file cache
   * @param [cacheDir] {String} directory for the cache entry
   * @returns {cache} cache instance
   */
  load: function ( docId, cacheDir ) {
    return this.create( docId, cacheDir );
  },

  /**
  * Load a cache identified by the given Id. If the element does not exists, then initialize an empty
  * cache storage.
  *
  * @method create
  * @param docId {String} the id of the cache, would also be used as the name of the file cache
  * @param [cacheDir] {String} directory for the cache entry
  * @returns {cache} cache instance
  */
  create: function ( docId, cacheDir ) {
    var obj = Object.create( cache );
    obj.load( docId, cacheDir );
    return obj;
  },

  createFromFile: function ( filePath ) {
    var obj = Object.create( cache );
    obj.loadFile( filePath );
    return obj;
  },
  /**
   * Clear the cache identified by the given id. Caches stored in a different cache directory can be deleted directly
   *
   * @method clearCache
   * @param docId {String} the id of the cache, would also be used as the name of the file cache
   * @param cacheDir {String} the directory where the cache file was written
   * @returns {Boolean} true if the cache folder was deleted. False otherwise
   */
  clearCacheById: function ( docId, cacheDir ) {
    var filePath = cacheDir ? path.resolve( cacheDir, docId ) : path.resolve( __dirname, './.cache/', docId );
    return del( filePath );
  },
  /**
   * Remove all cache stored in the cache directory
   * @method clearAll
   * @returns {Boolean} true if the cache folder was deleted. False otherwise
   */
  clearAll: function ( cacheDir ) {
    var filePath = cacheDir ? path.resolve( cacheDir ) : path.resolve( __dirname, './.cache/' );
    return del( filePath );
  }
};

}, function(modId) {var map = {"./utils":1578386726385,"./del":1578386726386}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1578386726385, function(require, module, exports) {
var fs = require( 'fs' );
var write = require( 'write' );
var flatted = require( 'flatted' );

module.exports = {
  tryParse: function ( filePath, defaultValue ) {
    var result;
    try {
      result = this.readJSON( filePath );
    } catch (ex) {
      result = defaultValue;
    }
    return result;
  },

  /**
   * Read json file synchronously using flatted
   *
   * @method readJSON
   * @param  {String} filePath Json filepath
   * @returns {*} parse result
   */
  readJSON: function ( filePath ) {
    return flatted.parse( fs.readFileSync( filePath, {
      encoding: 'utf8'
    } ) );
  },

  /**
   * Write json file synchronously using circular-json
   *
   * @method writeJSON
   * @param  {String} filePath Json filepath
   * @param  {*} data Object to serialize
   */
  writeJSON: function ( filePath, data ) {
    write.sync( filePath, flatted.stringify( data ) );
  }
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1578386726386, function(require, module, exports) {
var rimraf = require( 'rimraf' ).sync;
var fs = require( 'fs' );

module.exports = function del( file ) {
  if ( fs.existsSync( file ) ) {
    //if rimraf doesn't throw then the file has been deleted or didn't exist
    rimraf( file, {
      glob: false
    } );
    return true;
  }
  return false;
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1578386726384);
})()
//# sourceMappingURL=index.js.map