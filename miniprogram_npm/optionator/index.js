module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1578386726510, function(require, module, exports) {
// Generated by LiveScript 1.6.0
(function(){
  var VERSION, ref$, id, map, compact, any, groupBy, partition, chars, isItNaN, keys, Obj, camelize, deepIs, closestString, nameToRaw, dasherize, naturalJoin, generateHelp, generateHelpForOption, parsedTypeCheck, parseType, parseLevn, camelizeKeys, parseString, main, toString$ = {}.toString, slice$ = [].slice, arrayFrom$ = Array.from || function(x){return slice$.call(x);};
  VERSION = '0.8.3';
  ref$ = require('prelude-ls'), id = ref$.id, map = ref$.map, compact = ref$.compact, any = ref$.any, groupBy = ref$.groupBy, partition = ref$.partition, chars = ref$.chars, isItNaN = ref$.isItNaN, keys = ref$.keys, Obj = ref$.Obj, camelize = ref$.camelize;
  deepIs = require('deep-is');
  ref$ = require('./util'), closestString = ref$.closestString, nameToRaw = ref$.nameToRaw, dasherize = ref$.dasherize, naturalJoin = ref$.naturalJoin;
  ref$ = require('./help'), generateHelp = ref$.generateHelp, generateHelpForOption = ref$.generateHelpForOption;
  ref$ = require('type-check'), parsedTypeCheck = ref$.parsedTypeCheck, parseType = ref$.parseType;
  parseLevn = require('levn').parsedTypeParse;
  camelizeKeys = function(obj){
    var key, value, resultObj$ = {};
    for (key in obj) {
      value = obj[key];
      resultObj$[camelize(key)] = value;
    }
    return resultObj$;
  };
  parseString = function(string){
    var assignOpt, regex, replaceRegex, result;
    assignOpt = '--?[a-zA-Z][-a-z-A-Z0-9]*=';
    regex = RegExp('(?:' + assignOpt + ')?(?:\'(?:\\\\\'|[^\'])+\'|"(?:\\\\"|[^"])+")|[^\'"\\s]+', 'g');
    replaceRegex = RegExp('^(' + assignOpt + ')?[\'"]([\\s\\S]*)[\'"]$');
    result = map(function(it){
      return it.replace(replaceRegex, '$1$2');
    }, string.match(regex) || []);
    return result;
  };
  main = function(libOptions){
    var opts, defaults, required, traverse, getOption, parse;
    opts = {};
    defaults = {};
    required = [];
    if (toString$.call(libOptions.stdout).slice(8, -1) === 'Undefined') {
      libOptions.stdout = process.stdout;
    }
    libOptions.positionalAnywhere == null && (libOptions.positionalAnywhere = true);
    libOptions.typeAliases == null && (libOptions.typeAliases = {});
    libOptions.defaults == null && (libOptions.defaults = {});
    if (libOptions.concatRepeatedArrays != null) {
      libOptions.defaults.concatRepeatedArrays = libOptions.concatRepeatedArrays;
    }
    if (libOptions.mergeRepeatedObjects != null) {
      libOptions.defaults.mergeRepeatedObjects = libOptions.mergeRepeatedObjects;
    }
    traverse = function(options){
      var i$, len$, option, name, k, ref$, v, type, that, e, parsedPossibilities, parsedType, j$, len1$, possibility, rawDependsType, dependsOpts, dependsType, cra, alias, shortNames, longNames;
      if (toString$.call(options).slice(8, -1) !== 'Array') {
        throw new Error('No options defined.');
      }
      for (i$ = 0, len$ = options.length; i$ < len$; ++i$) {
        option = options[i$];
        if (option.heading == null) {
          name = option.option;
          if (opts[name] != null) {
            throw new Error("Option '" + name + "' already defined.");
          }
          for (k in ref$ = libOptions.defaults) {
            v = ref$[k];
            option[k] == null && (option[k] = v);
          }
          if (option.type === 'Boolean') {
            option.boolean == null && (option.boolean = true);
          }
          if (option.parsedType == null) {
            if (!option.type) {
              throw new Error("No type defined for option '" + name + "'.");
            }
            try {
              type = (that = libOptions.typeAliases[option.type]) != null
                ? that
                : option.type;
              option.parsedType = parseType(type);
            } catch (e$) {
              e = e$;
              throw new Error("Option '" + name + "': Error parsing type '" + option.type + "': " + e.message);
            }
          }
          if (option['default']) {
            try {
              defaults[name] = parseLevn(option.parsedType, option['default']);
            } catch (e$) {
              e = e$;
              throw new Error("Option '" + name + "': Error parsing default value '" + option['default'] + "' for type '" + option.type + "': " + e.message);
            }
          }
          if (option['enum'] && !option.parsedPossiblities) {
            parsedPossibilities = [];
            parsedType = option.parsedType;
            for (j$ = 0, len1$ = (ref$ = option['enum']).length; j$ < len1$; ++j$) {
              possibility = ref$[j$];
              try {
                parsedPossibilities.push(parseLevn(parsedType, possibility));
              } catch (e$) {
                e = e$;
                throw new Error("Option '" + name + "': Error parsing enum value '" + possibility + "' for type '" + option.type + "': " + e.message);
              }
            }
            option.parsedPossibilities = parsedPossibilities;
          }
          if (that = option.dependsOn) {
            if (that.length) {
              ref$ = [].concat(option.dependsOn), rawDependsType = ref$[0], dependsOpts = slice$.call(ref$, 1);
              dependsType = rawDependsType.toLowerCase();
              if (dependsOpts.length) {
                if (dependsType === 'and' || dependsType === 'or') {
                  option.dependsOn = [dependsType].concat(arrayFrom$(dependsOpts));
                } else {
                  throw new Error("Option '" + name + "': If you have more than one dependency, you must specify either 'and' or 'or'");
                }
              } else {
                if ((ref$ = dependsType.toLowerCase()) === 'and' || ref$ === 'or') {
                  option.dependsOn = null;
                } else {
                  option.dependsOn = ['and', rawDependsType];
                }
              }
            } else {
              option.dependsOn = null;
            }
          }
          if (option.required) {
            required.push(name);
          }
          opts[name] = option;
          if (option.concatRepeatedArrays != null) {
            cra = option.concatRepeatedArrays;
            if ('Boolean' === toString$.call(cra).slice(8, -1)) {
              option.concatRepeatedArrays = [cra, {}];
            } else if (cra.length === 1) {
              option.concatRepeatedArrays = [cra[0], {}];
            } else if (cra.length !== 2) {
              throw new Error("Invalid setting for concatRepeatedArrays");
            }
          }
          if (option.alias || option.aliases) {
            if (name === 'NUM') {
              throw new Error("-NUM option can't have aliases.");
            }
            if (option.alias) {
              option.aliases == null && (option.aliases = [].concat(option.alias));
            }
            for (j$ = 0, len1$ = (ref$ = option.aliases).length; j$ < len1$; ++j$) {
              alias = ref$[j$];
              if (opts[alias] != null) {
                throw new Error("Option '" + alias + "' already defined.");
              }
              opts[alias] = option;
            }
            ref$ = partition(fn$, option.aliases), shortNames = ref$[0], longNames = ref$[1];
            option.shortNames == null && (option.shortNames = shortNames);
            option.longNames == null && (option.longNames = longNames);
          }
          if ((!option.aliases || option.shortNames.length === 0) && option.type === 'Boolean' && option['default'] === 'true') {
            option.negateName = true;
          }
        }
      }
      function fn$(it){
        return it.length === 1;
      }
    };
    traverse(libOptions.options);
    getOption = function(name){
      var opt, possiblyMeant;
      opt = opts[name];
      if (opt == null) {
        possiblyMeant = closestString(keys(opts), name);
        throw new Error("Invalid option '" + nameToRaw(name) + "'" + (possiblyMeant ? " - perhaps you meant '" + nameToRaw(possiblyMeant) + "'?" : '.'));
      }
      return opt;
    };
    parse = function(input, arg$){
      var slice, obj, positional, restPositional, overrideRequired, prop, setValue, setDefaults, checkRequired, mutuallyExclusiveError, checkMutuallyExclusive, checkDependency, checkDependencies, checkProp, args, key, value, option, ref$, i$, len$, arg, that, result, short, argName, usingAssign, val, flags, len, j$, len1$, i, flag, opt, name, valPrime, negated, noedName;
      slice = (arg$ != null
        ? arg$
        : {}).slice;
      obj = {};
      positional = [];
      restPositional = false;
      overrideRequired = false;
      prop = null;
      setValue = function(name, value){
        var opt, val, cra, e, currentType;
        opt = getOption(name);
        if (opt.boolean) {
          val = value;
        } else {
          try {
            cra = opt.concatRepeatedArrays;
            if (cra != null && cra[0] && cra[1].oneValuePerFlag && opt.parsedType.length === 1 && opt.parsedType[0].structure === 'array') {
              val = [parseLevn(opt.parsedType[0].of, value)];
            } else {
              val = parseLevn(opt.parsedType, value);
            }
          } catch (e$) {
            e = e$;
            throw new Error("Invalid value for option '" + name + "' - expected type " + opt.type + ", received value: " + value + ".");
          }
          if (opt['enum'] && !any(function(it){
            return deepIs(it, val);
          }, opt.parsedPossibilities)) {
            throw new Error("Option " + name + ": '" + val + "' not one of " + naturalJoin(opt['enum']) + ".");
          }
        }
        currentType = toString$.call(obj[name]).slice(8, -1);
        if (obj[name] != null) {
          if (opt.concatRepeatedArrays != null && opt.concatRepeatedArrays[0] && currentType === 'Array') {
            obj[name] = obj[name].concat(val);
          } else if (opt.mergeRepeatedObjects && currentType === 'Object') {
            import$(obj[name], val);
          } else {
            obj[name] = val;
          }
        } else {
          obj[name] = val;
        }
        if (opt.restPositional) {
          restPositional = true;
        }
        if (opt.overrideRequired) {
          overrideRequired = true;
        }
      };
      setDefaults = function(){
        var name, ref$, value;
        for (name in ref$ = defaults) {
          value = ref$[name];
          if (obj[name] == null) {
            obj[name] = value;
          }
        }
      };
      checkRequired = function(){
        var i$, ref$, len$, name;
        if (overrideRequired) {
          return;
        }
        for (i$ = 0, len$ = (ref$ = required).length; i$ < len$; ++i$) {
          name = ref$[i$];
          if (!obj[name]) {
            throw new Error("Option " + nameToRaw(name) + " is required.");
          }
        }
      };
      mutuallyExclusiveError = function(first, second){
        throw new Error("The options " + nameToRaw(first) + " and " + nameToRaw(second) + " are mutually exclusive - you cannot use them at the same time.");
      };
      checkMutuallyExclusive = function(){
        var rules, i$, len$, rule, present, j$, len1$, element, k$, len2$, opt;
        rules = libOptions.mutuallyExclusive;
        if (!rules) {
          return;
        }
        for (i$ = 0, len$ = rules.length; i$ < len$; ++i$) {
          rule = rules[i$];
          present = null;
          for (j$ = 0, len1$ = rule.length; j$ < len1$; ++j$) {
            element = rule[j$];
            if (toString$.call(element).slice(8, -1) === 'Array') {
              for (k$ = 0, len2$ = element.length; k$ < len2$; ++k$) {
                opt = element[k$];
                if (opt in obj) {
                  if (present != null) {
                    mutuallyExclusiveError(present, opt);
                  } else {
                    present = opt;
                    break;
                  }
                }
              }
            } else {
              if (element in obj) {
                if (present != null) {
                  mutuallyExclusiveError(present, element);
                } else {
                  present = element;
                }
              }
            }
          }
        }
      };
      checkDependency = function(option){
        var dependsOn, type, targetOptionNames, i$, len$, targetOptionName, targetOption;
        dependsOn = option.dependsOn;
        if (!dependsOn || option.dependenciesMet) {
          return true;
        }
        type = dependsOn[0], targetOptionNames = slice$.call(dependsOn, 1);
        for (i$ = 0, len$ = targetOptionNames.length; i$ < len$; ++i$) {
          targetOptionName = targetOptionNames[i$];
          targetOption = obj[targetOptionName];
          if (targetOption && checkDependency(targetOption)) {
            if (type === 'or') {
              return true;
            }
          } else if (type === 'and') {
            throw new Error("The option '" + option.option + "' did not have its dependencies met.");
          }
        }
        if (type === 'and') {
          return true;
        } else {
          throw new Error("The option '" + option.option + "' did not meet any of its dependencies.");
        }
      };
      checkDependencies = function(){
        var name;
        for (name in obj) {
          checkDependency(opts[name]);
        }
      };
      checkProp = function(){
        if (prop) {
          throw new Error("Value for '" + prop + "' of type '" + getOption(prop).type + "' required.");
        }
      };
      switch (toString$.call(input).slice(8, -1)) {
      case 'String':
        args = parseString(input.slice(slice != null ? slice : 0));
        break;
      case 'Array':
        args = input.slice(slice != null ? slice : 2);
        break;
      case 'Object':
        obj = {};
        for (key in input) {
          value = input[key];
          if (key !== '_') {
            option = getOption(dasherize(key));
            if (parsedTypeCheck(option.parsedType, value)) {
              obj[option.option] = value;
            } else {
              throw new Error("Option '" + option.option + "': Invalid type for '" + value + "' - expected type '" + option.type + "'.");
            }
          }
        }
        checkMutuallyExclusive();
        checkDependencies();
        setDefaults();
        checkRequired();
        return ref$ = camelizeKeys(obj), ref$._ = input._ || [], ref$;
      default:
        throw new Error("Invalid argument to 'parse': " + input + ".");
      }
      for (i$ = 0, len$ = args.length; i$ < len$; ++i$) {
        arg = args[i$];
        if (arg === '--') {
          restPositional = true;
        } else if (restPositional) {
          positional.push(arg);
        } else {
          if (that = arg.match(/^(--?)([a-zA-Z][-a-zA-Z0-9]*)(=)?(.*)?$/)) {
            result = that;
            checkProp();
            short = result[1].length === 1;
            argName = result[2];
            usingAssign = result[3] != null;
            val = result[4];
            if (usingAssign && val == null) {
              throw new Error("No value for '" + argName + "' specified.");
            }
            if (short) {
              flags = chars(argName);
              len = flags.length;
              for (j$ = 0, len1$ = flags.length; j$ < len1$; ++j$) {
                i = j$;
                flag = flags[j$];
                opt = getOption(flag);
                name = opt.option;
                if (restPositional) {
                  positional.push(flag);
                } else if (i === len - 1) {
                  if (usingAssign) {
                    valPrime = opt.boolean ? parseLevn([{
                      type: 'Boolean'
                    }], val) : val;
                    setValue(name, valPrime);
                  } else if (opt.boolean) {
                    setValue(name, true);
                  } else {
                    prop = name;
                  }
                } else if (opt.boolean) {
                  setValue(name, true);
                } else {
                  throw new Error("Can't set argument '" + flag + "' when not last flag in a group of short flags.");
                }
              }
            } else {
              negated = false;
              if (that = argName.match(/^no-(.+)$/)) {
                negated = true;
                noedName = that[1];
                opt = getOption(noedName);
              } else {
                opt = getOption(argName);
              }
              name = opt.option;
              if (opt.boolean) {
                valPrime = usingAssign ? parseLevn([{
                  type: 'Boolean'
                }], val) : true;
                if (negated) {
                  setValue(name, !valPrime);
                } else {
                  setValue(name, valPrime);
                }
              } else {
                if (negated) {
                  throw new Error("Only use 'no-' prefix for Boolean options, not with '" + noedName + "'.");
                }
                if (usingAssign) {
                  setValue(name, val);
                } else {
                  prop = name;
                }
              }
            }
          } else if (that = arg.match(/^-([0-9]+(?:\.[0-9]+)?)$/)) {
            opt = opts.NUM;
            if (!opt) {
              throw new Error('No -NUM option defined.');
            }
            setValue(opt.option, that[1]);
          } else {
            if (prop) {
              setValue(prop, arg);
              prop = null;
            } else {
              positional.push(arg);
              if (!libOptions.positionalAnywhere) {
                restPositional = true;
              }
            }
          }
        }
      }
      checkProp();
      checkMutuallyExclusive();
      checkDependencies();
      setDefaults();
      checkRequired();
      return ref$ = camelizeKeys(obj), ref$._ = positional, ref$;
    };
    return {
      parse: parse,
      parseArgv: function(it){
        return parse(it, {
          slice: 2
        });
      },
      generateHelp: generateHelp(libOptions),
      generateHelpForOption: generateHelpForOption(getOption, libOptions)
    };
  };
  main.VERSION = VERSION;
  module.exports = main;
  function import$(obj, src){
    var own = {}.hasOwnProperty;
    for (var key in src) if (own.call(src, key)) obj[key] = src[key];
    return obj;
  }
}).call(this);

}, function(modId) {var map = {"./util":1578386726511,"./help":1578386726512}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1578386726511, function(require, module, exports) {
// Generated by LiveScript 1.6.0
(function(){
  var prelude, map, sortBy, fl, closestString, nameToRaw, dasherize, naturalJoin;
  prelude = require('prelude-ls'), map = prelude.map, sortBy = prelude.sortBy;
  fl = require('fast-levenshtein');
  closestString = function(possibilities, input){
    var distances, ref$, string, distance;
    if (!possibilities.length) {
      return;
    }
    distances = map(function(it){
      var ref$, longer, shorter;
      ref$ = input.length > it.length
        ? [input, it]
        : [it, input], longer = ref$[0], shorter = ref$[1];
      return {
        string: it,
        distance: fl.get(longer, shorter)
      };
    })(
    possibilities);
    ref$ = sortBy(function(it){
      return it.distance;
    }, distances)[0], string = ref$.string, distance = ref$.distance;
    return string;
  };
  nameToRaw = function(name){
    if (name.length === 1 || name === 'NUM') {
      return "-" + name;
    } else {
      return "--" + name;
    }
  };
  dasherize = function(string){
    if (/^[A-Z]/.test(string)) {
      return string;
    } else {
      return prelude.dasherize(string);
    }
  };
  naturalJoin = function(array){
    if (array.length < 3) {
      return array.join(' or ');
    } else {
      return array.slice(0, -1).join(', ') + ", or " + array[array.length - 1];
    }
  };
  module.exports = {
    closestString: closestString,
    nameToRaw: nameToRaw,
    dasherize: dasherize,
    naturalJoin: naturalJoin
  };
}).call(this);

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1578386726512, function(require, module, exports) {
// Generated by LiveScript 1.6.0
(function(){
  var ref$, id, find, sort, min, max, map, unlines, nameToRaw, dasherize, naturalJoin, wordWrap, wordwrap, getPreText, setHelpStyleDefaults, generateHelpForOption, generateHelp;
  ref$ = require('prelude-ls'), id = ref$.id, find = ref$.find, sort = ref$.sort, min = ref$.min, max = ref$.max, map = ref$.map, unlines = ref$.unlines;
  ref$ = require('./util'), nameToRaw = ref$.nameToRaw, dasherize = ref$.dasherize, naturalJoin = ref$.naturalJoin;
  wordWrap = require('word-wrap');
  wordwrap = function(a, b){
    var ref$, indent, width;
    ref$ = b === undefined
      ? ['', a - 1]
      : [repeatString$(' ', a), b - a - 1], indent = ref$[0], width = ref$[1];
    return function(text){
      return wordWrap(text, {
        indent: indent,
        width: width,
        trim: true
      });
    };
  };
  getPreText = function(option, arg$, maxWidth){
    var mainName, shortNames, ref$, longNames, type, description, aliasSeparator, typeSeparator, initialIndent, names, namesString, namesStringLen, typeSeparatorString, typeSeparatorStringLen, wrap;
    mainName = option.option, shortNames = (ref$ = option.shortNames) != null
      ? ref$
      : [], longNames = (ref$ = option.longNames) != null
      ? ref$
      : [], type = option.type, description = option.description;
    aliasSeparator = arg$.aliasSeparator, typeSeparator = arg$.typeSeparator, initialIndent = arg$.initialIndent;
    if (option.negateName) {
      mainName = "no-" + mainName;
      if (longNames) {
        longNames = map(function(it){
          return "no-" + it;
        }, longNames);
      }
    }
    names = mainName.length === 1
      ? [mainName].concat(shortNames, longNames)
      : shortNames.concat([mainName], longNames);
    namesString = map(nameToRaw, names).join(aliasSeparator);
    namesStringLen = namesString.length;
    typeSeparatorString = mainName === 'NUM' ? '::' : typeSeparator;
    typeSeparatorStringLen = typeSeparatorString.length;
    if (maxWidth != null && !option.boolean && initialIndent + namesStringLen + typeSeparatorStringLen + type.length > maxWidth) {
      wrap = wordwrap(initialIndent + namesStringLen + typeSeparatorStringLen, maxWidth);
      return namesString + "" + typeSeparatorString + wrap(type).replace(/^\s+/, '');
    } else {
      return namesString + "" + (option.boolean
        ? ''
        : typeSeparatorString + "" + type);
    }
  };
  setHelpStyleDefaults = function(helpStyle){
    helpStyle.aliasSeparator == null && (helpStyle.aliasSeparator = ', ');
    helpStyle.typeSeparator == null && (helpStyle.typeSeparator = ' ');
    helpStyle.descriptionSeparator == null && (helpStyle.descriptionSeparator = '  ');
    helpStyle.initialIndent == null && (helpStyle.initialIndent = 2);
    helpStyle.secondaryIndent == null && (helpStyle.secondaryIndent = 4);
    helpStyle.maxPadFactor == null && (helpStyle.maxPadFactor = 1.5);
  };
  generateHelpForOption = function(getOption, arg$){
    var stdout, helpStyle, ref$;
    stdout = arg$.stdout, helpStyle = (ref$ = arg$.helpStyle) != null
      ? ref$
      : {};
    setHelpStyleDefaults(helpStyle);
    return function(optionName){
      var maxWidth, wrap, option, e, pre, defaultString, restPositionalString, description, fullDescription, that, preDescription, descriptionString, exampleString, examples, seperator;
      maxWidth = stdout != null && stdout.isTTY ? stdout.columns - 1 : null;
      wrap = maxWidth ? wordwrap(maxWidth) : id;
      try {
        option = getOption(dasherize(optionName));
      } catch (e$) {
        e = e$;
        return e.message;
      }
      pre = getPreText(option, helpStyle);
      defaultString = option['default'] && !option.negateName ? "\ndefault: " + option['default'] : '';
      restPositionalString = option.restPositional ? 'Everything after this option is considered a positional argument, even if it looks like an option.' : '';
      description = option.longDescription || option.description && sentencize(option.description);
      fullDescription = description && restPositionalString
        ? description + " " + restPositionalString
        : (that = description || restPositionalString) ? that : '';
      preDescription = 'description:';
      descriptionString = !fullDescription
        ? ''
        : maxWidth && fullDescription.length - 1 - preDescription.length > maxWidth
          ? "\n" + preDescription + "\n" + wrap(fullDescription)
          : "\n" + preDescription + " " + fullDescription;
      exampleString = (that = option.example) ? (examples = [].concat(that), examples.length > 1
        ? "\nexamples:\n" + unlines(examples)
        : "\nexample: " + examples[0]) : '';
      seperator = defaultString || descriptionString || exampleString ? "\n" + repeatString$('=', pre.length) : '';
      return pre + "" + seperator + defaultString + descriptionString + exampleString;
    };
  };
  generateHelp = function(arg$){
    var options, prepend, append, helpStyle, ref$, stdout, aliasSeparator, typeSeparator, descriptionSeparator, maxPadFactor, initialIndent, secondaryIndent;
    options = arg$.options, prepend = arg$.prepend, append = arg$.append, helpStyle = (ref$ = arg$.helpStyle) != null
      ? ref$
      : {}, stdout = arg$.stdout;
    setHelpStyleDefaults(helpStyle);
    aliasSeparator = helpStyle.aliasSeparator, typeSeparator = helpStyle.typeSeparator, descriptionSeparator = helpStyle.descriptionSeparator, maxPadFactor = helpStyle.maxPadFactor, initialIndent = helpStyle.initialIndent, secondaryIndent = helpStyle.secondaryIndent;
    return function(arg$){
      var ref$, showHidden, interpolate, maxWidth, output, out, data, optionCount, totalPreLen, preLens, i$, len$, item, that, pre, descParts, desc, preLen, sortedPreLens, maxPreLen, preLenMean, x, padAmount, descSepLen, fullWrapCount, partialWrapCount, descLen, totalLen, initialSpace, wrapAllFull, i, wrap;
      ref$ = arg$ != null
        ? arg$
        : {}, showHidden = ref$.showHidden, interpolate = ref$.interpolate;
      maxWidth = stdout != null && stdout.isTTY ? stdout.columns - 1 : null;
      output = [];
      out = function(it){
        return output.push(it != null ? it : '');
      };
      if (prepend) {
        out(interpolate ? interp(prepend, interpolate) : prepend);
        out();
      }
      data = [];
      optionCount = 0;
      totalPreLen = 0;
      preLens = [];
      for (i$ = 0, len$ = (ref$ = options).length; i$ < len$; ++i$) {
        item = ref$[i$];
        if (showHidden || !item.hidden) {
          if (that = item.heading) {
            data.push({
              type: 'heading',
              value: that
            });
          } else {
            pre = getPreText(item, helpStyle, maxWidth);
            descParts = [];
            if ((that = item.description) != null) {
              descParts.push(that);
            }
            if (that = item['enum']) {
              descParts.push("either: " + naturalJoin(that));
            }
            if (item['default'] && !item.negateName) {
              descParts.push("default: " + item['default']);
            }
            desc = descParts.join(' - ');
            data.push({
              type: 'option',
              pre: pre,
              desc: desc,
              descLen: desc.length
            });
            preLen = pre.length;
            optionCount++;
            totalPreLen += preLen;
            preLens.push(preLen);
          }
        }
      }
      sortedPreLens = sort(preLens);
      maxPreLen = sortedPreLens[sortedPreLens.length - 1];
      preLenMean = initialIndent + totalPreLen / optionCount;
      x = optionCount > 2 ? min(preLenMean * maxPadFactor, maxPreLen) : maxPreLen;
      for (i$ = sortedPreLens.length - 1; i$ >= 0; --i$) {
        preLen = sortedPreLens[i$];
        if (preLen <= x) {
          padAmount = preLen;
          break;
        }
      }
      descSepLen = descriptionSeparator.length;
      if (maxWidth != null) {
        fullWrapCount = 0;
        partialWrapCount = 0;
        for (i$ = 0, len$ = data.length; i$ < len$; ++i$) {
          item = data[i$];
          if (item.type === 'option') {
            pre = item.pre, desc = item.desc, descLen = item.descLen;
            if (descLen === 0) {
              item.wrap = 'none';
            } else {
              preLen = max(padAmount, pre.length) + initialIndent + descSepLen;
              totalLen = preLen + descLen;
              if (totalLen > maxWidth) {
                if (descLen / 2.5 > maxWidth - preLen) {
                  fullWrapCount++;
                  item.wrap = 'full';
                } else {
                  partialWrapCount++;
                  item.wrap = 'partial';
                }
              } else {
                item.wrap = 'none';
              }
            }
          }
        }
      }
      initialSpace = repeatString$(' ', initialIndent);
      wrapAllFull = optionCount > 1 && fullWrapCount + partialWrapCount * 0.5 > optionCount * 0.5;
      for (i$ = 0, len$ = data.length; i$ < len$; ++i$) {
        i = i$;
        item = data[i$];
        if (item.type === 'heading') {
          if (i !== 0) {
            out();
          }
          out(item.value + ":");
        } else {
          pre = item.pre, desc = item.desc, descLen = item.descLen, wrap = item.wrap;
          if (maxWidth != null) {
            if (wrapAllFull || wrap === 'full') {
              wrap = wordwrap(initialIndent + secondaryIndent, maxWidth);
              out(initialSpace + "" + pre + "\n" + wrap(desc));
              continue;
            } else if (wrap === 'partial') {
              wrap = wordwrap(initialIndent + descSepLen + max(padAmount, pre.length), maxWidth);
              out(initialSpace + "" + pad(pre, padAmount) + descriptionSeparator + wrap(desc).replace(/^\s+/, ''));
              continue;
            }
          }
          if (descLen === 0) {
            out(initialSpace + "" + pre);
          } else {
            out(initialSpace + "" + pad(pre, padAmount) + descriptionSeparator + desc);
          }
        }
      }
      if (append) {
        out();
        out(interpolate ? interp(append, interpolate) : append);
      }
      return unlines(output);
    };
  };
  function pad(str, num){
    var len, padAmount;
    len = str.length;
    padAmount = num - len;
    return str + "" + repeatString$(' ', padAmount > 0 ? padAmount : 0);
  }
  function sentencize(str){
    var first, rest, period;
    first = str.charAt(0).toUpperCase();
    rest = str.slice(1);
    period = /[\.!\?]$/.test(str) ? '' : '.';
    return first + "" + rest + period;
  }
  function interp(string, object){
    return string.replace(/{{([a-zA-Z$_][a-zA-Z$_0-9]*)}}/g, function(arg$, key){
      var ref$;
      return (ref$ = object[key]) != null
        ? ref$
        : "{{" + key + "}}";
    });
  }
  module.exports = {
    generateHelp: generateHelp,
    generateHelpForOption: generateHelpForOption
  };
  function repeatString$(str, n){
    for (var r = ''; n > 0; (n >>= 1) && (str += str)) if (n & 1) r += str;
    return r;
  }
}).call(this);

}, function(modId) { var map = {"./util":1578386726511}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1578386726510);
})()
//# sourceMappingURL=index.js.map