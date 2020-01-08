module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1578386726358, function(require, module, exports) {
/**
 * @fileoverview Main Espree file that converts Acorn into Esprima output.
 *
 * This file contains code from the following MIT-licensed projects:
 * 1. Acorn
 * 2. Babylon
 * 3. Babel-ESLint
 *
 * This file also contains code from Esprima, which is BSD licensed.
 *
 * Acorn is Copyright 2012-2015 Acorn Contributors (https://github.com/marijnh/acorn/blob/master/AUTHORS)
 * Babylon is Copyright 2014-2015 various contributors (https://github.com/babel/babel/blob/master/packages/babylon/AUTHORS)
 * Babel-ESLint is Copyright 2014-2015 Sebastian McKenzie <sebmck@gmail.com>
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * * Redistributions of source code must retain the above copyright
 *   notice, this list of conditions and the following disclaimer.
 * * Redistributions in binary form must reproduce the above copyright
 *   notice, this list of conditions and the following disclaimer in the
 *   documentation and/or other materials provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
 * THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 * Esprima is Copyright (c) jQuery Foundation, Inc. and Contributors, All Rights Reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *   * Redistributions of source code must retain the above copyright
 *     notice, this list of conditions and the following disclaimer.
 *   * Redistributions in binary form must reproduce the above copyright
 *     notice, this list of conditions and the following disclaimer in the
 *     documentation and/or other materials provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
 * THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
/* eslint no-undefined:0, no-use-before-define: 0 */



const acorn = require("acorn");
const jsx = require("acorn-jsx");
const astNodeTypes = require("./lib/ast-node-types");
const espree = require("./lib/espree");

// To initialize lazily.
const parsers = {
    _regular: null,
    _jsx: null,

    get regular() {
        if (this._regular === null) {
            this._regular = acorn.Parser.extend(espree());
        }
        return this._regular;
    },

    get jsx() {
        if (this._jsx === null) {
            this._jsx = acorn.Parser.extend(jsx(), espree());
        }
        return this._jsx;
    },

    get(options) {
        const useJsx = Boolean(
            options &&
            options.ecmaFeatures &&
            options.ecmaFeatures.jsx
        );

        return useJsx ? this.jsx : this.regular;
    }
};

//------------------------------------------------------------------------------
// Tokenizer
//------------------------------------------------------------------------------

/**
 * Tokenizes the given code.
 * @param {string} code The code to tokenize.
 * @param {Object} options Options defining how to tokenize.
 * @returns {Token[]} An array of tokens.
 * @throws {SyntaxError} If the input code is invalid.
 * @private
 */
function tokenize(code, options) {
    const Parser = parsers.get(options);

    // Ensure to collect tokens.
    if (!options || options.tokens !== true) {
        options = Object.assign({}, options, { tokens: true }); // eslint-disable-line no-param-reassign
    }

    return new Parser(options, code).tokenize();
}

//------------------------------------------------------------------------------
// Parser
//------------------------------------------------------------------------------

/**
 * Parses the given code.
 * @param {string} code The code to tokenize.
 * @param {Object} options Options defining how to tokenize.
 * @returns {ASTNode} The "Program" AST node.
 * @throws {SyntaxError} If the input code is invalid.
 */
function parse(code, options) {
    const Parser = parsers.get(options);

    return new Parser(options, code).parse();
}

//------------------------------------------------------------------------------
// Public
//------------------------------------------------------------------------------

exports.version = require("./package.json").version;

exports.tokenize = tokenize;

exports.parse = parse;

// Deep copy.
/* istanbul ignore next */
exports.Syntax = (function() {
    let name,
        types = {};

    if (typeof Object.create === "function") {
        types = Object.create(null);
    }

    for (name in astNodeTypes) {
        if (astNodeTypes.hasOwnProperty(name)) {
            types[name] = astNodeTypes[name];
        }
    }

    if (typeof Object.freeze === "function") {
        Object.freeze(types);
    }

    return types;
}());

/* istanbul ignore next */
exports.VisitorKeys = (function() {
    return require("eslint-visitor-keys").KEYS;
}());

}, function(modId) {var map = {"./lib/ast-node-types":1578386726359,"./lib/espree":1578386726360,"./package.json":1578386726362}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1578386726359, function(require, module, exports) {
/**
 * @fileoverview The AST node types produced by the parser.
 * @author Nicholas C. Zakas
 */



//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

// None!

//------------------------------------------------------------------------------
// Public
//------------------------------------------------------------------------------

module.exports = {
    AssignmentExpression: "AssignmentExpression",
    AssignmentPattern: "AssignmentPattern",
    ArrayExpression: "ArrayExpression",
    ArrayPattern: "ArrayPattern",
    ArrowFunctionExpression: "ArrowFunctionExpression",
    AwaitExpression: "AwaitExpression",
    BlockStatement: "BlockStatement",
    BinaryExpression: "BinaryExpression",
    BreakStatement: "BreakStatement",
    CallExpression: "CallExpression",
    CatchClause: "CatchClause",
    ClassBody: "ClassBody",
    ClassDeclaration: "ClassDeclaration",
    ClassExpression: "ClassExpression",
    ConditionalExpression: "ConditionalExpression",
    ContinueStatement: "ContinueStatement",
    DoWhileStatement: "DoWhileStatement",
    DebuggerStatement: "DebuggerStatement",
    EmptyStatement: "EmptyStatement",
    ExpressionStatement: "ExpressionStatement",
    ForStatement: "ForStatement",
    ForInStatement: "ForInStatement",
    ForOfStatement: "ForOfStatement",
    FunctionDeclaration: "FunctionDeclaration",
    FunctionExpression: "FunctionExpression",
    Identifier: "Identifier",
    IfStatement: "IfStatement",
    Literal: "Literal",
    LabeledStatement: "LabeledStatement",
    LogicalExpression: "LogicalExpression",
    MemberExpression: "MemberExpression",
    MetaProperty: "MetaProperty",
    MethodDefinition: "MethodDefinition",
    NewExpression: "NewExpression",
    ObjectExpression: "ObjectExpression",
    ObjectPattern: "ObjectPattern",
    Program: "Program",
    Property: "Property",
    RestElement: "RestElement",
    ReturnStatement: "ReturnStatement",
    SequenceExpression: "SequenceExpression",
    SpreadElement: "SpreadElement",
    Super: "Super",
    SwitchCase: "SwitchCase",
    SwitchStatement: "SwitchStatement",
    TaggedTemplateExpression: "TaggedTemplateExpression",
    TemplateElement: "TemplateElement",
    TemplateLiteral: "TemplateLiteral",
    ThisExpression: "ThisExpression",
    ThrowStatement: "ThrowStatement",
    TryStatement: "TryStatement",
    UnaryExpression: "UnaryExpression",
    UpdateExpression: "UpdateExpression",
    VariableDeclaration: "VariableDeclaration",
    VariableDeclarator: "VariableDeclarator",
    WhileStatement: "WhileStatement",
    WithStatement: "WithStatement",
    YieldExpression: "YieldExpression",
    JSXIdentifier: "JSXIdentifier",
    JSXNamespacedName: "JSXNamespacedName",
    JSXMemberExpression: "JSXMemberExpression",
    JSXEmptyExpression: "JSXEmptyExpression",
    JSXExpressionContainer: "JSXExpressionContainer",
    JSXElement: "JSXElement",
    JSXClosingElement: "JSXClosingElement",
    JSXOpeningElement: "JSXOpeningElement",
    JSXAttribute: "JSXAttribute",
    JSXSpreadAttribute: "JSXSpreadAttribute",
    JSXText: "JSXText",
    ExportDefaultDeclaration: "ExportDefaultDeclaration",
    ExportNamedDeclaration: "ExportNamedDeclaration",
    ExportAllDeclaration: "ExportAllDeclaration",
    ExportSpecifier: "ExportSpecifier",
    ImportDeclaration: "ImportDeclaration",
    ImportSpecifier: "ImportSpecifier",
    ImportDefaultSpecifier: "ImportDefaultSpecifier",
    ImportNamespaceSpecifier: "ImportNamespaceSpecifier"
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1578386726360, function(require, module, exports) {


/* eslint-disable no-param-reassign*/
const acorn = require("acorn");
const jsx = require("acorn-jsx");
const TokenTranslator = require("./token-translator");

const DEFAULT_ECMA_VERSION = 5;
const STATE = Symbol("espree's internal state");
const ESPRIMA_FINISH_NODE = Symbol("espree's esprimaFinishNode");
const tokTypes = Object.assign({}, acorn.tokTypes, jsx.tokTypes);

/**
 * Normalize ECMAScript version from the initial config
 * @param {number} ecmaVersion ECMAScript version from the initial config
 * @returns {number} normalized ECMAScript version
 */
function normalizeEcmaVersion(ecmaVersion) {
    if (typeof ecmaVersion === "number") {
        let version = ecmaVersion;

        // Calculate ECMAScript edition number from official year version starting with
        // ES2015, which corresponds with ES6 (or a difference of 2009).
        if (version >= 2015) {
            version -= 2009;
        }

        switch (version) {
            case 3:
            case 5:
            case 6:
            case 7:
            case 8:
            case 9:
            case 10:
                return version;

            default:
                throw new Error("Invalid ecmaVersion.");
        }
    } else {
        return DEFAULT_ECMA_VERSION;
    }
}

/**
 * Converts an Acorn comment to a Esprima comment.
 * @param {boolean} block True if it's a block comment, false if not.
 * @param {string} text The text of the comment.
 * @param {int} start The index at which the comment starts.
 * @param {int} end The index at which the comment ends.
 * @param {Location} startLoc The location at which the comment starts.
 * @param {Location} endLoc The location at which the comment ends.
 * @returns {Object} The comment object.
 * @private
 */
function convertAcornCommentToEsprimaComment(block, text, start, end, startLoc, endLoc) {
    const comment = {
        type: block ? "Block" : "Line",
        value: text
    };

    if (typeof start === "number") {
        comment.start = start;
        comment.end = end;
        comment.range = [start, end];
    }

    if (typeof startLoc === "object") {
        comment.loc = {
            start: startLoc,
            end: endLoc
        };
    }

    return comment;
}

module.exports = () => Parser => class Espree extends Parser {
    constructor(options, code) {
        if (typeof options !== "object" || options === null) {
            options = {};
        }
        if (typeof code !== "string" && !(code instanceof String)) {
            code = String(code);
        }

        const ecmaFeatures = options.ecmaFeatures || {};
        const ecmaVersion = normalizeEcmaVersion(options.ecmaVersion);
        const isModule = options.sourceType === "module";
        const tokenTranslator =
            options.tokens === true
                ? new TokenTranslator(tokTypes, code)
                : null;

        // Initialize acorn parser.
        super({
            ecmaVersion: isModule ? Math.max(6, ecmaVersion) : ecmaVersion,
            sourceType: isModule ? "module" : "script",
            ranges: options.range === true,
            locations: options.loc === true,

            // Truthy value is true for backward compatibility.
            allowReturnOutsideFunction: Boolean(ecmaFeatures.globalReturn),

            // Collect tokens
            onToken: token => {
                if (tokenTranslator) {

                    // Use `tokens`, `ecmaVersion`, and `jsxAttrValueToken` in the state.
                    tokenTranslator.onToken(token, this[STATE]);
                }
                if (token.type !== tokTypes.eof) {
                    this[STATE].lastToken = token;
                }
            },

            // Collect comments
            onComment: (block, text, start, end, startLoc, endLoc) => {
                if (this[STATE].comments) {
                    const comment = convertAcornCommentToEsprimaComment(block, text, start, end, startLoc, endLoc);

                    this[STATE].comments.push(comment);
                }
            }
        }, code);

        // Initialize internal state.
        this[STATE] = {
            tokens: tokenTranslator ? [] : null,
            comments: options.comment === true ? [] : null,
            impliedStrict: ecmaFeatures.impliedStrict === true && this.options.ecmaVersion >= 5,
            ecmaVersion: this.options.ecmaVersion,
            jsxAttrValueToken: false,
            lastToken: null
        };
    }

    tokenize() {
        do {
            this.next();
        } while (this.type !== tokTypes.eof);

        const extra = this[STATE];
        const tokens = extra.tokens;

        if (extra.comments) {
            tokens.comments = extra.comments;
        }

        return tokens;
    }

    finishNode(...args) {
        const result = super.finishNode(...args);

        return this[ESPRIMA_FINISH_NODE](result);
    }

    finishNodeAt(...args) {
        const result = super.finishNodeAt(...args);

        return this[ESPRIMA_FINISH_NODE](result);
    }

    parse() {
        const extra = this[STATE];
        const program = super.parse();

        program.sourceType = this.options.sourceType;

        if (extra.comments) {
            program.comments = extra.comments;
        }
        if (extra.tokens) {
            program.tokens = extra.tokens;
        }

        /*
         * Adjust opening and closing position of program to match Esprima.
         * Acorn always starts programs at range 0 whereas Esprima starts at the
         * first AST node's start (the only real difference is when there's leading
         * whitespace or leading comments). Acorn also counts trailing whitespace
         * as part of the program whereas Esprima only counts up to the last token.
         */
        if (program.range) {
            program.range[0] = program.body.length ? program.body[0].range[0] : program.range[0];
            program.range[1] = extra.lastToken ? extra.lastToken.range[1] : program.range[1];
        }
        if (program.loc) {
            program.loc.start = program.body.length ? program.body[0].loc.start : program.loc.start;
            program.loc.end = extra.lastToken ? extra.lastToken.loc.end : program.loc.end;
        }

        return program;
    }

    parseTopLevel(node) {
        if (this[STATE].impliedStrict) {
            this.strict = true;
        }
        return super.parseTopLevel(node);
    }

    /**
     * Overwrites the default raise method to throw Esprima-style errors.
     * @param {int} pos The position of the error.
     * @param {string} message The error message.
     * @throws {SyntaxError} A syntax error.
     * @returns {void}
     */
    raise(pos, message) {
        const loc = acorn.getLineInfo(this.input, pos);
        const err = new SyntaxError(message);

        err.index = pos;
        err.lineNumber = loc.line;
        err.column = loc.column + 1; // acorn uses 0-based columns
        throw err;
    }

    /**
     * Overwrites the default raise method to throw Esprima-style errors.
     * @param {int} pos The position of the error.
     * @param {string} message The error message.
     * @throws {SyntaxError} A syntax error.
     * @returns {void}
     */
    raiseRecoverable(pos, message) {
        this.raise(pos, message);
    }

    /**
     * Overwrites the default unexpected method to throw Esprima-style errors.
     * @param {int} pos The position of the error.
     * @throws {SyntaxError} A syntax error.
     * @returns {void}
     */
    unexpected(pos) {
        let message = "Unexpected token";

        if (pos !== null && pos !== void 0) {
            this.pos = pos;

            if (this.options.locations) {
                while (this.pos < this.lineStart) {
                    this.lineStart = this.input.lastIndexOf("\n", this.lineStart - 2) + 1;
                    --this.curLine;
                }
            }

            this.nextToken();
        }

        if (this.end > this.start) {
            message += ` ${this.input.slice(this.start, this.end)}`;
        }

        this.raise(this.start, message);
    }

    /*
     * Esprima-FB represents JSX strings as tokens called "JSXText", but Acorn-JSX
     * uses regular tt.string without any distinction between this and regular JS
     * strings. As such, we intercept an attempt to read a JSX string and set a flag
     * on extra so that when tokens are converted, the next token will be switched
     * to JSXText via onToken.
     */
    jsx_readString(quote) { // eslint-disable-line camelcase
        const result = super.jsx_readString(quote);

        if (this.type === tokTypes.string) {
            this[STATE].jsxAttrValueToken = true;
        }
        return result;
    }

    /**
     * Performs last-minute Esprima-specific compatibility checks and fixes.
     * @param {ASTNode} result The node to check.
     * @returns {ASTNode} The finished node.
     */
    [ESPRIMA_FINISH_NODE](result) {

        // Acorn doesn't count the opening and closing backticks as part of templates
        // so we have to adjust ranges/locations appropriately.
        if (result.type === "TemplateElement") {

            // additional adjustment needed if ${ is the last token
            const terminalDollarBraceL = this.input.slice(result.end, result.end + 2) === "${";

            if (result.range) {
                result.range[0]--;
                result.range[1] += (terminalDollarBraceL ? 2 : 1);
            }

            if (result.loc) {
                result.loc.start.column--;
                result.loc.end.column += (terminalDollarBraceL ? 2 : 1);
            }
        }

        if (result.type.indexOf("Function") > -1 && !result.generator) {
            result.generator = false;
        }

        return result;
    }
};

}, function(modId) { var map = {"./token-translator":1578386726361}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1578386726361, function(require, module, exports) {
/**
 * @fileoverview Translates tokens between Acorn format and Esprima format.
 * @author Nicholas C. Zakas
 */
/* eslint no-underscore-dangle: 0 */



//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

// none!

//------------------------------------------------------------------------------
// Private
//------------------------------------------------------------------------------


// Esprima Token Types
const Token = {
    Boolean: "Boolean",
    EOF: "<end>",
    Identifier: "Identifier",
    Keyword: "Keyword",
    Null: "Null",
    Numeric: "Numeric",
    Punctuator: "Punctuator",
    String: "String",
    RegularExpression: "RegularExpression",
    Template: "Template",
    JSXIdentifier: "JSXIdentifier",
    JSXText: "JSXText"
};

/**
 * Converts part of a template into an Esprima token.
 * @param {AcornToken[]} tokens The Acorn tokens representing the template.
 * @param {string} code The source code.
 * @returns {EsprimaToken} The Esprima equivalent of the template token.
 * @private
 */
function convertTemplatePart(tokens, code) {
    const firstToken = tokens[0],
        lastTemplateToken = tokens[tokens.length - 1];

    const token = {
        type: Token.Template,
        value: code.slice(firstToken.start, lastTemplateToken.end)
    };

    if (firstToken.loc) {
        token.loc = {
            start: firstToken.loc.start,
            end: lastTemplateToken.loc.end
        };
    }

    if (firstToken.range) {
        token.start = firstToken.range[0];
        token.end = lastTemplateToken.range[1];
        token.range = [token.start, token.end];
    }

    return token;
}

/**
 * Contains logic to translate Acorn tokens into Esprima tokens.
 * @param {Object} acornTokTypes The Acorn token types.
 * @param {string} code The source code Acorn is parsing. This is necessary
 *      to correct the "value" property of some tokens.
 * @constructor
 */
function TokenTranslator(acornTokTypes, code) {

    // token types
    this._acornTokTypes = acornTokTypes;

    // token buffer for templates
    this._tokens = [];

    // track the last curly brace
    this._curlyBrace = null;

    // the source code
    this._code = code;

}

TokenTranslator.prototype = {
    constructor: TokenTranslator,

    /**
     * Translates a single Esprima token to a single Acorn token. This may be
     * inaccurate due to how templates are handled differently in Esprima and
     * Acorn, but should be accurate for all other tokens.
     * @param {AcornToken} token The Acorn token to translate.
     * @param {Object} extra Espree extra object.
     * @returns {EsprimaToken} The Esprima version of the token.
     */
    translate(token, extra) {

        const type = token.type,
            tt = this._acornTokTypes;

        if (type === tt.name) {
            token.type = Token.Identifier;

            // TODO: See if this is an Acorn bug
            if (token.value === "static") {
                token.type = Token.Keyword;
            }

            if (extra.ecmaVersion > 5 && (token.value === "yield" || token.value === "let")) {
                token.type = Token.Keyword;
            }

        } else if (type === tt.semi || type === tt.comma ||
                 type === tt.parenL || type === tt.parenR ||
                 type === tt.braceL || type === tt.braceR ||
                 type === tt.dot || type === tt.bracketL ||
                 type === tt.colon || type === tt.question ||
                 type === tt.bracketR || type === tt.ellipsis ||
                 type === tt.arrow || type === tt.jsxTagStart ||
                 type === tt.incDec || type === tt.starstar ||
                 type === tt.jsxTagEnd || type === tt.prefix ||
                 (type.binop && !type.keyword) ||
                 type.isAssign) {

            token.type = Token.Punctuator;
            token.value = this._code.slice(token.start, token.end);
        } else if (type === tt.jsxName) {
            token.type = Token.JSXIdentifier;
        } else if (type.label === "jsxText" || type === tt.jsxAttrValueToken) {
            token.type = Token.JSXText;
        } else if (type.keyword) {
            if (type.keyword === "true" || type.keyword === "false") {
                token.type = Token.Boolean;
            } else if (type.keyword === "null") {
                token.type = Token.Null;
            } else {
                token.type = Token.Keyword;
            }
        } else if (type === tt.num) {
            token.type = Token.Numeric;
            token.value = this._code.slice(token.start, token.end);
        } else if (type === tt.string) {

            if (extra.jsxAttrValueToken) {
                extra.jsxAttrValueToken = false;
                token.type = Token.JSXText;
            } else {
                token.type = Token.String;
            }

            token.value = this._code.slice(token.start, token.end);
        } else if (type === tt.regexp) {
            token.type = Token.RegularExpression;
            const value = token.value;

            token.regex = {
                flags: value.flags,
                pattern: value.pattern
            };
            token.value = `/${value.pattern}/${value.flags}`;
        }

        return token;
    },

    /**
     * Function to call during Acorn's onToken handler.
     * @param {AcornToken} token The Acorn token.
     * @param {Object} extra The Espree extra object.
     * @returns {void}
     */
    onToken(token, extra) {

        const that = this,
            tt = this._acornTokTypes,
            tokens = extra.tokens,
            templateTokens = this._tokens;

        /**
         * Flushes the buffered template tokens and resets the template
         * tracking.
         * @returns {void}
         * @private
         */
        function translateTemplateTokens() {
            tokens.push(convertTemplatePart(that._tokens, that._code));
            that._tokens = [];
        }

        if (token.type === tt.eof) {

            // might be one last curlyBrace
            if (this._curlyBrace) {
                tokens.push(this.translate(this._curlyBrace, extra));
            }

            return;
        }

        if (token.type === tt.backQuote) {

            // if there's already a curly, it's not part of the template
            if (this._curlyBrace) {
                tokens.push(this.translate(this._curlyBrace, extra));
                this._curlyBrace = null;
            }

            templateTokens.push(token);

            // it's the end
            if (templateTokens.length > 1) {
                translateTemplateTokens();
            }

            return;
        }
        if (token.type === tt.dollarBraceL) {
            templateTokens.push(token);
            translateTemplateTokens();
            return;
        }
        if (token.type === tt.braceR) {

            // if there's already a curly, it's not part of the template
            if (this._curlyBrace) {
                tokens.push(this.translate(this._curlyBrace, extra));
            }

            // store new curly for later
            this._curlyBrace = token;
            return;
        }
        if (token.type === tt.template || token.type === tt.invalidTemplate) {
            if (this._curlyBrace) {
                templateTokens.push(this._curlyBrace);
                this._curlyBrace = null;
            }

            templateTokens.push(token);
            return;
        }

        if (this._curlyBrace) {
            tokens.push(this.translate(this._curlyBrace, extra));
            this._curlyBrace = null;
        }

        tokens.push(this.translate(token, extra));
    }
};

//------------------------------------------------------------------------------
// Public
//------------------------------------------------------------------------------

module.exports = TokenTranslator;

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1578386726362, function(require, module, exports) {
module.exports = {
  "_from": "espree@^5.0.1",
  "_id": "espree@5.0.1",
  "_inBundle": false,
  "_integrity": "sha512-qWAZcWh4XE/RwzLJejfcofscgMc9CamR6Tn1+XRXNzrvUSSbiAjGOI/fggztjIi7y9VLPqnICMIPiGyr8JaZ0A==",
  "_location": "/espree",
  "_phantomChildren": {},
  "_requested": {
    "type": "range",
    "registry": true,
    "raw": "espree@^5.0.1",
    "name": "espree",
    "escapedName": "espree",
    "rawSpec": "^5.0.1",
    "saveSpec": null,
    "fetchSpec": "^5.0.1"
  },
  "_requiredBy": [
    "/eslint"
  ],
  "_resolved": "https://registry.npmjs.org/espree/-/espree-5.0.1.tgz",
  "_shasum": "5d6526fa4fc7f0788a5cf75b15f30323e2f81f7a",
  "_spec": "espree@^5.0.1",
  "_where": "E:\\1-safe\\safety-vx\\node_modules\\eslint",
  "author": {
    "name": "Nicholas C. Zakas",
    "email": "nicholas+npm@nczconsulting.com"
  },
  "bugs": {
    "url": "http://github.com/eslint/espree.git"
  },
  "bundleDependencies": false,
  "dependencies": {
    "acorn": "^6.0.7",
    "acorn-jsx": "^5.0.0",
    "eslint-visitor-keys": "^1.0.0"
  },
  "deprecated": false,
  "description": "An Esprima-compatible JavaScript parser built on Acorn",
  "devDependencies": {
    "browserify": "^7.0.0",
    "chai": "^1.10.0",
    "eslint": "^5.7.0",
    "eslint-config-eslint": "^5.0.1",
    "eslint-plugin-node": "^8.0.0",
    "eslint-release": "^1.0.0",
    "esprima": "latest",
    "esprima-fb": "^8001.2001.0-dev-harmony-fb",
    "json-diff": "~0.3.1",
    "leche": "^1.0.1",
    "mocha": "^2.0.1",
    "nyc": "^13.0.1",
    "regenerate": "~0.5.4",
    "shelljs": "^0.3.0",
    "shelljs-nodecli": "^0.1.1",
    "unicode-6.3.0": "~0.1.0"
  },
  "engines": {
    "node": ">=6.0.0"
  },
  "files": [
    "lib",
    "espree.js"
  ],
  "homepage": "https://github.com/eslint/espree",
  "keywords": [
    "ast",
    "ecmascript",
    "javascript",
    "parser",
    "syntax",
    "acorn"
  ],
  "license": "BSD-2-Clause",
  "main": "espree.js",
  "name": "espree",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/eslint/espree.git"
  },
  "scripts": {
    "browserify": "node Makefile.js browserify",
    "generate-alpharelease": "eslint-generate-prerelease alpha",
    "generate-betarelease": "eslint-generate-prerelease beta",
    "generate-rcrelease": "eslint-generate-prerelease rc",
    "generate-regex": "node tools/generate-identifier-regex.js",
    "generate-release": "eslint-generate-release",
    "lint": "node Makefile.js lint",
    "publish-release": "eslint-publish-release",
    "test": "npm run-script lint && node Makefile.js test"
  },
  "version": "5.0.1"
}

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1578386726358);
})()
//# sourceMappingURL=index.js.map