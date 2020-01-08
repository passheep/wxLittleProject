module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1578386726426, function(require, module, exports) {

/**
 * Inquirer.js
 * A collection of common interactive command line user interfaces.
 */

var inquirer = module.exports;

/**
 * Client interfaces
 */

inquirer.prompts = {};

inquirer.Separator = require('./objects/separator');

inquirer.ui = {
  BottomBar: require('./ui/bottom-bar'),
  Prompt: require('./ui/prompt')
};

/**
 * Create a new self-contained prompt module.
 */
inquirer.createPromptModule = function(opt) {
  var promptModule = function(questions) {
    var ui = new inquirer.ui.Prompt(promptModule.prompts, opt);
    var promise = ui.run(questions);

    // Monkey patch the UI on the promise object so
    // that it remains publicly accessible.
    promise.ui = ui;

    return promise;
  };

  promptModule.prompts = {};

  /**
   * Register a prompt type
   * @param {String} name     Prompt type name
   * @param {Function} prompt Prompt constructor
   * @return {inquirer}
   */

  promptModule.registerPrompt = function(name, prompt) {
    promptModule.prompts[name] = prompt;
    return this;
  };

  /**
   * Register the defaults provider prompts
   */

  promptModule.restoreDefaultPrompts = function() {
    this.registerPrompt('list', require('./prompts/list'));
    this.registerPrompt('input', require('./prompts/input'));
    this.registerPrompt('number', require('./prompts/number'));
    this.registerPrompt('confirm', require('./prompts/confirm'));
    this.registerPrompt('rawlist', require('./prompts/rawlist'));
    this.registerPrompt('expand', require('./prompts/expand'));
    this.registerPrompt('checkbox', require('./prompts/checkbox'));
    this.registerPrompt('password', require('./prompts/password'));
    this.registerPrompt('editor', require('./prompts/editor'));
  };

  promptModule.restoreDefaultPrompts();

  return promptModule;
};

/**
 * Public CLI helper interface
 * @param  {Array|Object|Rx.Observable} questions - Questions settings array
 * @param  {Function} cb - Callback being passed the user answers
 * @return {inquirer.ui.Prompt}
 */

inquirer.prompt = inquirer.createPromptModule();

// Expose helper functions on the top level for easiest usage by common users
inquirer.registerPrompt = function(name, prompt) {
  inquirer.prompt.registerPrompt(name, prompt);
};

inquirer.restoreDefaultPrompts = function() {
  inquirer.prompt.restoreDefaultPrompts();
};

}, function(modId) {var map = {"./objects/separator":1578386726427,"./ui/bottom-bar":1578386726428,"./ui/prompt":1578386726431,"./prompts/list":1578386726433,"./prompts/input":1578386726440,"./prompts/number":1578386726441,"./prompts/confirm":1578386726442,"./prompts/rawlist":1578386726443,"./prompts/expand":1578386726444,"./prompts/checkbox":1578386726445,"./prompts/password":1578386726446,"./prompts/editor":1578386726447}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1578386726427, function(require, module, exports) {

var chalk = require('chalk');
var figures = require('figures');

/**
 * Separator object
 * Used to space/separate choices group
 * @constructor
 * @param {String} line   Separation line content (facultative)
 */

class Separator {
  constructor(line) {
    this.type = 'separator';
    this.line = chalk.dim(line || new Array(15).join(figures.line));
  }

  /**
   * Stringify separator
   * @return {String} the separator display string
   */
  toString() {
    return this.line;
  }
}

/**
 * Helper function returning false if object is a separator
 * @param  {Object} obj object to test against
 * @return {Boolean}    `false` if object is a separator
 */

Separator.exclude = function(obj) {
  return obj.type !== 'separator';
};

module.exports = Separator;

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1578386726428, function(require, module, exports) {

/**
 * Sticky bottom bar user interface
 */

var through = require('through');
var Base = require('./baseUI');
var rlUtils = require('../utils/readline');
var _ = require('lodash');

class BottomBar extends Base {
  constructor(opt) {
    opt = opt || {};

    super(opt);

    this.log = through(this.writeLog.bind(this));
    this.bottomBar = opt.bottomBar || '';
    this.render();
  }

  /**
   * Render the prompt to screen
   * @return {BottomBar} self
   */

  render() {
    this.write(this.bottomBar);
    return this;
  }

  clean() {
    rlUtils.clearLine(this.rl, this.bottomBar.split('\n').length);
    return this;
  }

  /**
   * Update the bottom bar content and rerender
   * @param  {String} bottomBar Bottom bar content
   * @return {BottomBar}           self
   */

  updateBottomBar(bottomBar) {
    rlUtils.clearLine(this.rl, 1);
    this.rl.output.unmute();
    this.clean();
    this.bottomBar = bottomBar;
    this.render();
    this.rl.output.mute();
    return this;
  }

  /**
   * Write out log data
   * @param {String} data - The log data to be output
   * @return {BottomBar} self
   */

  writeLog(data) {
    this.rl.output.unmute();
    this.clean();
    this.rl.output.write(this.enforceLF(data.toString()));
    this.render();
    this.rl.output.mute();
    return this;
  }

  /**
   * Make sure line end on a line feed
   * @param  {String} str Input string
   * @return {String}     The input string with a final line feed
   */

  enforceLF(str) {
    return str.match(/[\r\n]$/) ? str : str + '\n';
  }

  /**
   * Helper for writing message in Prompt
   * @param {BottomBar} prompt  - The Prompt object that extends tty
   * @param {String} message - The message to be output
   */
  write(message) {
    var msgLines = message.split(/\n/);
    this.height = msgLines.length;

    // Write message to screen and setPrompt to control backspace
    this.rl.setPrompt(_.last(msgLines));

    if (this.rl.output.rows === 0 && this.rl.output.columns === 0) {
      /* When it's a tty through serial port there's no terminal info and the render will malfunction,
         so we need enforce the cursor to locate to the leftmost position for rendering. */
      rlUtils.left(this.rl, message.length + this.rl.line.length);
    }

    this.rl.output.write(message);
  }
}

module.exports = BottomBar;

}, function(modId) { var map = {"./baseUI":1578386726429,"../utils/readline":1578386726430}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1578386726429, function(require, module, exports) {

var _ = require('lodash');
var MuteStream = require('mute-stream');
var readline = require('readline');

/**
 * Base interface class other can inherits from
 */

class UI {
  constructor(opt) {
    // Instantiate the Readline interface
    // @Note: Don't reassign if already present (allow test to override the Stream)
    if (!this.rl) {
      this.rl = readline.createInterface(setupReadlineOptions(opt));
    }

    this.rl.resume();

    this.onForceClose = this.onForceClose.bind(this);

    // Make sure new prompt start on a newline when closing
    process.on('exit', this.onForceClose);

    // Terminate process on SIGINT (which will call process.on('exit') in return)
    this.rl.on('SIGINT', this.onForceClose);
  }

  /**
   * Handle the ^C exit
   * @return {null}
   */

  onForceClose() {
    this.close();
    process.kill(process.pid, 'SIGINT');
    console.log('');
  }

  /**
   * Close the interface and cleanup listeners
   */

  close() {
    // Remove events listeners
    this.rl.removeListener('SIGINT', this.onForceClose);
    process.removeListener('exit', this.onForceClose);

    this.rl.output.unmute();

    if (this.activePrompt && typeof this.activePrompt.close === 'function') {
      this.activePrompt.close();
    }

    // Close the readline
    this.rl.output.end();
    this.rl.pause();
    this.rl.close();
  }
}

function setupReadlineOptions(opt) {
  opt = opt || {};

  // Default `input` to stdin
  var input = opt.input || process.stdin;

  // Add mute capabilities to the output
  var ms = new MuteStream();
  ms.pipe(opt.output || process.stdout);
  var output = ms;

  return _.extend(
    {
      terminal: true,
      input: input,
      output: output
    },
    _.omit(opt, ['input', 'output'])
  );
}

module.exports = UI;

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1578386726430, function(require, module, exports) {

var ansiEscapes = require('ansi-escapes');

/**
 * Move cursor left by `x`
 * @param  {Readline} rl - Readline instance
 * @param  {Number}   x  - How far to go left (default to 1)
 */

exports.left = function(rl, x) {
  rl.output.write(ansiEscapes.cursorBackward(x));
};

/**
 * Move cursor right by `x`
 * @param  {Readline} rl - Readline instance
 * @param  {Number}   x  - How far to go left (default to 1)
 */

exports.right = function(rl, x) {
  rl.output.write(ansiEscapes.cursorForward(x));
};

/**
 * Move cursor up by `x`
 * @param  {Readline} rl - Readline instance
 * @param  {Number}   x  - How far to go up (default to 1)
 */

exports.up = function(rl, x) {
  rl.output.write(ansiEscapes.cursorUp(x));
};

/**
 * Move cursor down by `x`
 * @param  {Readline} rl - Readline instance
 * @param  {Number}   x  - How far to go down (default to 1)
 */

exports.down = function(rl, x) {
  rl.output.write(ansiEscapes.cursorDown(x));
};

/**
 * Clear current line
 * @param  {Readline} rl  - Readline instance
 * @param  {Number}   len - number of line to delete
 */
exports.clearLine = function(rl, len) {
  rl.output.write(ansiEscapes.eraseLines(len));
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1578386726431, function(require, module, exports) {

var _ = require('lodash');
var { defer, empty, from, of } = require('rxjs');
var { concatMap, filter, publish, reduce } = require('rxjs/operators');
var runAsync = require('run-async');
var utils = require('../utils/utils');
var Base = require('./baseUI');

/**
 * Base interface class other can inherits from
 */

class PromptUI extends Base {
  constructor(prompts, opt) {
    super(opt);
    this.prompts = prompts;
  }

  run(questions) {
    // Keep global reference to the answers
    this.answers = {};

    // Make sure questions is an array.
    if (_.isPlainObject(questions)) {
      questions = [questions];
    }

    // Create an observable, unless we received one as parameter.
    // Note: As this is a public interface, we cannot do an instanceof check as we won't
    // be using the exact same object in memory.
    var obs = _.isArray(questions) ? from(questions) : questions;

    this.process = obs.pipe(
      concatMap(this.processQuestion.bind(this)),
      publish() // Creates a hot Observable. It prevents duplicating prompts.
    );

    this.process.connect();

    return this.process
      .pipe(
        reduce((answers, answer) => {
          _.set(this.answers, answer.name, answer.answer);
          return this.answers;
        }, {})
      )
      .toPromise(Promise)
      .then(this.onCompletion.bind(this));
  }

  /**
   * Once all prompt are over
   */

  onCompletion() {
    this.close();

    return this.answers;
  }

  processQuestion(question) {
    question = _.clone(question);
    return defer(() => {
      var obs = of(question);

      return obs.pipe(
        concatMap(this.setDefaultType.bind(this)),
        concatMap(this.filterIfRunnable.bind(this)),
        concatMap(() =>
          utils.fetchAsyncQuestionProperty(question, 'message', this.answers)
        ),
        concatMap(() =>
          utils.fetchAsyncQuestionProperty(question, 'default', this.answers)
        ),
        concatMap(() =>
          utils.fetchAsyncQuestionProperty(question, 'choices', this.answers)
        ),
        concatMap(this.fetchAnswer.bind(this))
      );
    });
  }

  fetchAnswer(question) {
    var Prompt = this.prompts[question.type];
    this.activePrompt = new Prompt(question, this.rl, this.answers);
    return defer(() =>
      from(
        this.activePrompt.run().then(answer => ({ name: question.name, answer: answer }))
      )
    );
  }

  setDefaultType(question) {
    // Default type to input
    if (!this.prompts[question.type]) {
      question.type = 'input';
    }

    return defer(() => of(question));
  }

  filterIfRunnable(question) {
    if (question.when === false) {
      return empty();
    }

    if (!_.isFunction(question.when)) {
      return of(question);
    }

    var answers = this.answers;
    return defer(() =>
      from(
        runAsync(question.when)(answers).then(shouldRun => {
          if (shouldRun) {
            return question;
          }
        })
      ).pipe(filter(val => val != null))
    );
  }
}

module.exports = PromptUI;

}, function(modId) { var map = {"../utils/utils":1578386726432,"./baseUI":1578386726429}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1578386726432, function(require, module, exports) {

var _ = require('lodash');
var { from, of } = require('rxjs');
var runAsync = require('run-async');

/**
 * Resolve a question property value if it is passed as a function.
 * This method will overwrite the property on the question object with the received value.
 * @param  {Object} question - Question object
 * @param  {String} prop     - Property to fetch name
 * @param  {Object} answers  - Answers object
 * @return {Rx.Observable}   - Observable emitting once value is known
 */

exports.fetchAsyncQuestionProperty = function(question, prop, answers) {
  if (!_.isFunction(question[prop])) {
    return of(question);
  }

  return from(
    runAsync(question[prop])(answers).then(value => {
      question[prop] = value;
      return question;
    })
  );
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1578386726433, function(require, module, exports) {

/**
 * `list` type prompt
 */

var _ = require('lodash');
var chalk = require('chalk');
var figures = require('figures');
var cliCursor = require('cli-cursor');
var runAsync = require('run-async');
var { flatMap, map, take, takeUntil } = require('rxjs/operators');
var Base = require('./base');
var observe = require('../utils/events');
var Paginator = require('../utils/paginator');

class ListPrompt extends Base {
  constructor(questions, rl, answers) {
    super(questions, rl, answers);

    if (!this.opt.choices) {
      this.throwParamError('choices');
    }

    this.firstRender = true;
    this.selected = 0;

    var def = this.opt.default;

    // If def is a Number, then use as index. Otherwise, check for value.
    if (_.isNumber(def) && def >= 0 && def < this.opt.choices.realLength) {
      this.selected = def;
    } else if (!_.isNumber(def) && def != null) {
      let index = _.findIndex(this.opt.choices.realChoices, ({ value }) => value === def);
      this.selected = Math.max(index, 0);
    }

    // Make sure no default is set (so it won't be printed)
    this.opt.default = null;

    this.paginator = new Paginator(this.screen);
  }

  /**
   * Start the Inquiry session
   * @param  {Function} cb      Callback when prompt is done
   * @return {this}
   */

  _run(cb) {
    this.done = cb;

    var self = this;

    var events = observe(this.rl);
    events.normalizedUpKey.pipe(takeUntil(events.line)).forEach(this.onUpKey.bind(this));
    events.normalizedDownKey
      .pipe(takeUntil(events.line))
      .forEach(this.onDownKey.bind(this));
    events.numberKey.pipe(takeUntil(events.line)).forEach(this.onNumberKey.bind(this));
    events.line
      .pipe(
        take(1),
        map(this.getCurrentValue.bind(this)),
        flatMap(value => runAsync(self.opt.filter)(value).catch(err => err))
      )
      .forEach(this.onSubmit.bind(this));

    // Init the prompt
    cliCursor.hide();
    this.render();

    return this;
  }

  /**
   * Render the prompt to screen
   * @return {ListPrompt} self
   */

  render() {
    // Render question
    var message = this.getQuestion();

    if (this.firstRender) {
      message += chalk.dim('(Use arrow keys)');
    }

    // Render choices or answer depending on the state
    if (this.status === 'answered') {
      message += chalk.cyan(this.opt.choices.getChoice(this.selected).short);
    } else {
      var choicesStr = listRender(this.opt.choices, this.selected);
      var indexPosition = this.opt.choices.indexOf(
        this.opt.choices.getChoice(this.selected)
      );
      message +=
        '\n' + this.paginator.paginate(choicesStr, indexPosition, this.opt.pageSize);
    }

    this.firstRender = false;

    this.screen.render(message);
  }

  /**
   * When user press `enter` key
   */

  onSubmit(value) {
    this.status = 'answered';

    // Rerender prompt
    this.render();

    this.screen.done();
    cliCursor.show();
    this.done(value);
  }

  getCurrentValue() {
    return this.opt.choices.getChoice(this.selected).value;
  }

  /**
   * When user press a key
   */
  onUpKey() {
    var len = this.opt.choices.realLength;
    this.selected = this.selected > 0 ? this.selected - 1 : len - 1;
    this.render();
  }

  onDownKey() {
    var len = this.opt.choices.realLength;
    this.selected = this.selected < len - 1 ? this.selected + 1 : 0;
    this.render();
  }

  onNumberKey(input) {
    if (input <= this.opt.choices.realLength) {
      this.selected = input - 1;
    }

    this.render();
  }
}

/**
 * Function for rendering list choices
 * @param  {Number} pointer Position of the pointer
 * @return {String}         Rendered content
 */
function listRender(choices, pointer) {
  var output = '';
  var separatorOffset = 0;

  choices.forEach((choice, i) => {
    if (choice.type === 'separator') {
      separatorOffset++;
      output += '  ' + choice + '\n';
      return;
    }

    if (choice.disabled) {
      separatorOffset++;
      output += '  - ' + choice.name;
      output += ' (' + (_.isString(choice.disabled) ? choice.disabled : 'Disabled') + ')';
      output += '\n';
      return;
    }

    var isSelected = i - separatorOffset === pointer;
    var line = (isSelected ? figures.pointer + ' ' : '  ') + choice.name;
    if (isSelected) {
      line = chalk.cyan(line);
    }

    output += line + ' \n';
  });

  return output.replace(/\n$/, '');
}

module.exports = ListPrompt;

}, function(modId) { var map = {"./base":1578386726434,"../utils/events":1578386726438,"../utils/paginator":1578386726439}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1578386726434, function(require, module, exports) {

/**
 * Base prompt implementation
 * Should be extended by prompt types.
 */

var _ = require('lodash');
var chalk = require('chalk');
var runAsync = require('run-async');
var { filter, flatMap, share, take, takeUntil } = require('rxjs/operators');
var Choices = require('../objects/choices');
var ScreenManager = require('../utils/screen-manager');

class Prompt {
  constructor(question, rl, answers) {
    // Setup instance defaults property
    _.assign(this, {
      answers: answers,
      status: 'pending'
    });

    // Set defaults prompt options
    this.opt = _.defaults(_.clone(question), {
      validate: () => true,
      filter: val => val,
      when: () => true,
      suffix: '',
      prefix: chalk.green('?')
    });

    // Make sure name is present
    if (!this.opt.name) {
      this.throwParamError('name');
    }

    // Set default message if no message defined
    if (!this.opt.message) {
      this.opt.message = this.opt.name + ':';
    }

    // Normalize choices
    if (Array.isArray(this.opt.choices)) {
      this.opt.choices = new Choices(this.opt.choices, answers);
    }

    this.rl = rl;
    this.screen = new ScreenManager(this.rl);
  }

  /**
   * Start the Inquiry session and manage output value filtering
   * @return {Promise}
   */

  run() {
    return new Promise(resolve => {
      this._run(value => resolve(value));
    });
  }

  // Default noop (this one should be overwritten in prompts)
  _run(cb) {
    cb();
  }

  /**
   * Throw an error telling a required parameter is missing
   * @param  {String} name Name of the missing param
   * @return {Throw Error}
   */

  throwParamError(name) {
    throw new Error('You must provide a `' + name + '` parameter');
  }

  /**
   * Called when the UI closes. Override to do any specific cleanup necessary
   */
  close() {
    this.screen.releaseCursor();
  }

  /**
   * Run the provided validation method each time a submit event occur.
   * @param  {Rx.Observable} submit - submit event flow
   * @return {Object}        Object containing two observables: `success` and `error`
   */
  handleSubmitEvents(submit) {
    var self = this;
    var validate = runAsync(this.opt.validate);
    var asyncFilter = runAsync(this.opt.filter);
    var validation = submit.pipe(
      flatMap(value =>
        asyncFilter(value, self.answers).then(
          filteredValue =>
            validate(filteredValue, self.answers).then(
              isValid => ({ isValid: isValid, value: filteredValue }),
              err => ({ isValid: err })
            ),
          err => ({ isValid: err })
        )
      ),
      share()
    );

    var success = validation.pipe(
      filter(state => state.isValid === true),
      take(1)
    );
    var error = validation.pipe(
      filter(state => state.isValid !== true),
      takeUntil(success)
    );

    return {
      success: success,
      error: error
    };
  }

  /**
   * Generate the prompt question string
   * @return {String} prompt question string
   */

  getQuestion() {
    var message =
      this.opt.prefix +
      ' ' +
      chalk.bold(this.opt.message) +
      this.opt.suffix +
      chalk.reset(' ');

    // Append the default if available, and if question isn't answered
    if (this.opt.default != null && this.status !== 'answered') {
      // If default password is supplied, hide it
      if (this.opt.type === 'password') {
        message += chalk.italic.dim('[hidden] ');
      } else {
        message += chalk.dim('(' + this.opt.default + ') ');
      }
    }

    return message;
  }
}

module.exports = Prompt;

}, function(modId) { var map = {"../objects/choices":1578386726435,"../utils/screen-manager":1578386726437}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1578386726435, function(require, module, exports) {

var assert = require('assert');
var _ = require('lodash');
var Separator = require('./separator');
var Choice = require('./choice');

/**
 * Choices collection
 * Collection of multiple `choice` object
 * @constructor
 * @param {Array} choices  All `choice` to keep in the collection
 */

module.exports = class Choices {
  constructor(choices, answers) {
    this.choices = choices.map(val => {
      if (val.type === 'separator') {
        if (!(val instanceof Separator)) {
          val = new Separator(val.line);
        }

        return val;
      }

      return new Choice(val, answers);
    });

    this.realChoices = this.choices
      .filter(Separator.exclude)
      .filter(item => !item.disabled);

    Object.defineProperty(this, 'length', {
      get() {
        return this.choices.length;
      },
      set(val) {
        this.choices.length = val;
      }
    });

    Object.defineProperty(this, 'realLength', {
      get() {
        return this.realChoices.length;
      },
      set() {
        throw new Error('Cannot set `realLength` of a Choices collection');
      }
    });
  }

  /**
   * Get a valid choice from the collection
   * @param  {Number} selector  The selected choice index
   * @return {Choice|Undefined} Return the matched choice or undefined
   */

  getChoice(selector) {
    assert(_.isNumber(selector));
    return this.realChoices[selector];
  }

  /**
   * Get a raw element from the collection
   * @param  {Number} selector  The selected index value
   * @return {Choice|Undefined} Return the matched choice or undefined
   */

  get(selector) {
    assert(_.isNumber(selector));
    return this.choices[selector];
  }

  /**
   * Match the valid choices against a where clause
   * @param  {Object} whereClause Lodash `where` clause
   * @return {Array}              Matching choices or empty array
   */

  where(whereClause) {
    return _.filter(this.realChoices, whereClause);
  }

  /**
   * Pluck a particular key from the choices
   * @param  {String} propertyName Property name to select
   * @return {Array}               Selected properties
   */

  pluck(propertyName) {
    return _.map(this.realChoices, propertyName);
  }

  // Expose usual Array methods
  indexOf() {
    return this.choices.indexOf.apply(this.choices, arguments);
  }

  forEach() {
    return this.choices.forEach.apply(this.choices, arguments);
  }

  filter() {
    return this.choices.filter.apply(this.choices, arguments);
  }

  find(func) {
    return _.find(this.choices, func);
  }

  push() {
    var objs = _.map(arguments, val => new Choice(val));
    this.choices.push.apply(this.choices, objs);
    this.realChoices = this.choices.filter(Separator.exclude);
    return this.choices;
  }
};

}, function(modId) { var map = {"./separator":1578386726427,"./choice":1578386726436}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1578386726436, function(require, module, exports) {

var _ = require('lodash');

/**
 * Choice object
 * Normalize input as choice object
 * @constructor
 * @param {Number|String|Object} val  Choice value. If an object is passed, it should contains
 *                                    at least one of `value` or `name` property
 */

module.exports = class Choice {
  constructor(val, answers) {
    // Don't process Choice and Separator object
    if (val instanceof Choice || val.type === 'separator') {
      return val;
    }

    if (_.isString(val) || _.isNumber(val)) {
      this.name = String(val);
      this.value = val;
      this.short = String(val);
    } else {
      _.extend(this, val, {
        name: val.name || val.value,
        value: 'value' in val ? val.value : val.name,
        short: val.short || val.name || val.value
      });
    }

    if (_.isFunction(val.disabled)) {
      this.disabled = val.disabled(answers);
    } else {
      this.disabled = val.disabled;
    }
  }
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1578386726437, function(require, module, exports) {

var _ = require('lodash');
var util = require('./readline');
var cliWidth = require('cli-width');
var stripAnsi = require('strip-ansi');
var stringWidth = require('string-width');

function height(content) {
  return content.split('\n').length;
}

function lastLine(content) {
  return _.last(content.split('\n'));
}

class ScreenManager {
  constructor(rl) {
    // These variables are keeping information to allow correct prompt re-rendering
    this.height = 0;
    this.extraLinesUnderPrompt = 0;

    this.rl = rl;
  }

  render(content, bottomContent) {
    this.rl.output.unmute();
    this.clean(this.extraLinesUnderPrompt);

    /**
     * Write message to screen and setPrompt to control backspace
     */

    var promptLine = lastLine(content);
    var rawPromptLine = stripAnsi(promptLine);

    // Remove the rl.line from our prompt. We can't rely on the content of
    // rl.line (mainly because of the password prompt), so just rely on it's
    // length.
    var prompt = rawPromptLine;
    if (this.rl.line.length) {
      prompt = prompt.slice(0, -this.rl.line.length);
    }

    this.rl.setPrompt(prompt);

    // SetPrompt will change cursor position, now we can get correct value
    var cursorPos = this.rl._getCursorPos();
    var width = this.normalizedCliWidth();

    content = this.forceLineReturn(content, width);
    if (bottomContent) {
      bottomContent = this.forceLineReturn(bottomContent, width);
    }

    // Manually insert an extra line if we're at the end of the line.
    // This prevent the cursor from appearing at the beginning of the
    // current line.
    if (rawPromptLine.length % width === 0) {
      content += '\n';
    }

    var fullContent = content + (bottomContent ? '\n' + bottomContent : '');
    this.rl.output.write(fullContent);

    /**
     * Re-adjust the cursor at the correct position.
     */

    // We need to consider parts of the prompt under the cursor as part of the bottom
    // content in order to correctly cleanup and re-render.
    var promptLineUpDiff = Math.floor(rawPromptLine.length / width) - cursorPos.rows;
    var bottomContentHeight =
      promptLineUpDiff + (bottomContent ? height(bottomContent) : 0);
    if (bottomContentHeight > 0) {
      util.up(this.rl, bottomContentHeight);
    }

    // Reset cursor at the beginning of the line
    util.left(this.rl, stringWidth(lastLine(fullContent)));

    // Adjust cursor on the right
    if (cursorPos.cols > 0) {
      util.right(this.rl, cursorPos.cols);
    }

    /**
     * Set up state for next re-rendering
     */
    this.extraLinesUnderPrompt = bottomContentHeight;
    this.height = height(fullContent);

    this.rl.output.mute();
  }

  clean(extraLines) {
    if (extraLines > 0) {
      util.down(this.rl, extraLines);
    }

    util.clearLine(this.rl, this.height);
  }

  done() {
    this.rl.setPrompt('');
    this.rl.output.unmute();
    this.rl.output.write('\n');
  }

  releaseCursor() {
    if (this.extraLinesUnderPrompt > 0) {
      util.down(this.rl, this.extraLinesUnderPrompt);
    }
  }

  normalizedCliWidth() {
    var width = cliWidth({
      defaultWidth: 80,
      output: this.rl.output
    });
    return width;
  }

  breakLines(lines, width) {
    // Break lines who're longer than the cli width so we can normalize the natural line
    // returns behavior across terminals.
    width = width || this.normalizedCliWidth();
    var regex = new RegExp('(?:(?:\\033[[0-9;]*m)*.?){1,' + width + '}', 'g');
    return lines.map(line => {
      var chunk = line.match(regex);
      // Last match is always empty
      chunk.pop();
      return chunk || '';
    });
  }

  forceLineReturn(content, width) {
    width = width || this.normalizedCliWidth();
    return _.flatten(this.breakLines(content.split('\n'), width)).join('\n');
  }
}

module.exports = ScreenManager;

}, function(modId) { var map = {"./readline":1578386726430}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1578386726438, function(require, module, exports) {

var { fromEvent } = require('rxjs');
var { filter, map, share } = require('rxjs/operators');

function normalizeKeypressEvents(value, key) {
  return { value: value, key: key || {} };
}

module.exports = function(rl) {
  var keypress = fromEvent(rl.input, 'keypress', normalizeKeypressEvents)
    // Ignore `enter` key. On the readline, we only care about the `line` event.
    .pipe(filter(({ key }) => key.name !== 'enter' && key.name !== 'return'));

  return {
    line: fromEvent(rl, 'line'),
    keypress: keypress,

    normalizedUpKey: keypress.pipe(
      filter(
        ({ key }) =>
          key.name === 'up' || key.name === 'k' || (key.name === 'p' && key.ctrl)
      ),
      share()
    ),

    normalizedDownKey: keypress.pipe(
      filter(
        ({ key }) =>
          key.name === 'down' || key.name === 'j' || (key.name === 'n' && key.ctrl)
      ),
      share()
    ),

    numberKey: keypress.pipe(
      filter(e => e.value && '123456789'.indexOf(e.value) >= 0),
      map(e => Number(e.value)),
      share()
    ),

    spaceKey: keypress.pipe(
      filter(({ key }) => key && key.name === 'space'),
      share()
    ),
    aKey: keypress.pipe(
      filter(({ key }) => key && key.name === 'a'),
      share()
    ),
    iKey: keypress.pipe(
      filter(({ key }) => key && key.name === 'i'),
      share()
    )
  };
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1578386726439, function(require, module, exports) {


var _ = require('lodash');
var chalk = require('chalk');

/**
 * The paginator keeps track of a pointer index in a list and returns
 * a subset of the choices if the list is too long.
 */

class Paginator {
  constructor(screen) {
    this.pointer = 0;
    this.lastIndex = 0;
    this.screen = screen;
  }

  paginate(output, active, pageSize) {
    pageSize = pageSize || 7;
    var middleOfList = Math.floor(pageSize / 2);
    var lines = output.split('\n');

    if (this.screen) {
      lines = this.screen.breakLines(lines);
      active = _.sum(lines.map(lineParts => lineParts.length).splice(0, active));
      lines = _.flatten(lines);
    }

    // Make sure there's enough lines to paginate
    if (lines.length <= pageSize) {
      return output;
    }

    // Move the pointer only when the user go down and limit it to the middle of the list
    if (
      this.pointer < middleOfList &&
      this.lastIndex < active &&
      active - this.lastIndex < pageSize
    ) {
      this.pointer = Math.min(middleOfList, this.pointer + active - this.lastIndex);
    }

    this.lastIndex = active;

    // Duplicate the lines so it give an infinite list look
    var infinite = _.flatten([lines, lines, lines]);
    var topIndex = Math.max(0, active + lines.length - this.pointer);

    var section = infinite.splice(topIndex, pageSize).join('\n');
    return section + '\n' + chalk.dim('(Move up and down to reveal more choices)');
  }
}

module.exports = Paginator;

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1578386726440, function(require, module, exports) {

/**
 * `input` type prompt
 */

var chalk = require('chalk');
var { map, takeUntil } = require('rxjs/operators');
var Base = require('./base');
var observe = require('../utils/events');

class InputPrompt extends Base {
  /**
   * Start the Inquiry session
   * @param  {Function} cb      Callback when prompt is done
   * @return {this}
   */

  _run(cb) {
    this.done = cb;

    // Once user confirm (enter key)
    var events = observe(this.rl);
    var submit = events.line.pipe(map(this.filterInput.bind(this)));

    var validation = this.handleSubmitEvents(submit);
    validation.success.forEach(this.onEnd.bind(this));
    validation.error.forEach(this.onError.bind(this));

    events.keypress
      .pipe(takeUntil(validation.success))
      .forEach(this.onKeypress.bind(this));

    // Init
    this.render();

    return this;
  }

  /**
   * Render the prompt to screen
   * @return {InputPrompt} self
   */

  render(error) {
    var bottomContent = '';
    var appendContent = '';
    var message = this.getQuestion();
    var transformer = this.opt.transformer;
    var isFinal = this.status === 'answered';

    if (isFinal) {
      appendContent = this.answer;
    } else {
      appendContent = this.rl.line;
    }

    if (transformer) {
      message += transformer(appendContent, this.answers, { isFinal });
    } else {
      message += isFinal ? chalk.cyan(appendContent) : appendContent;
    }

    if (error) {
      bottomContent = chalk.red('>> ') + error;
    }

    this.screen.render(message, bottomContent);
  }

  /**
   * When user press `enter` key
   */

  filterInput(input) {
    if (!input) {
      return this.opt.default == null ? '' : this.opt.default;
    }

    return input;
  }

  onEnd(state) {
    this.answer = state.value;
    this.status = 'answered';

    // Re-render prompt
    this.render();

    this.screen.done();
    this.done(state.value);
  }

  onError(state) {
    this.rl.line += state.value;
    this.rl.cursor += state.value.length;
    this.render(state.isValid);
  }

  /**
   * When user press a key
   */

  onKeypress() {
    // If user press a key, just clear the default value
    if (this.opt.default) {
      this.opt.default = undefined;
    }

    this.render();
  }
}

module.exports = InputPrompt;

}, function(modId) { var map = {"./base":1578386726434,"../utils/events":1578386726438}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1578386726441, function(require, module, exports) {

/**
 * `input` type prompt
 */

var Input = require('./input');

/**
 * Extention of the Input prompt specifically for use with number inputs.
 */

class NumberPrompt extends Input {
  filterInput(input) {
    if (input && typeof input === 'string') {
      input = input.trim();
      // Match a number in the input
      let numberMatch = input.match(/(^-?\d+|^\d+\.\d*|^\d*\.\d+)(e\d+)?$/);
      // If a number is found, return that input.
      if (numberMatch) {
        return Number(numberMatch[0]);
      }
    }

    // If the input was invalid return the default value.
    return this.opt.default == null ? NaN : this.opt.default;
  }
}

module.exports = NumberPrompt;

}, function(modId) { var map = {"./input":1578386726440}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1578386726442, function(require, module, exports) {

/**
 * `confirm` type prompt
 */

var _ = require('lodash');
var chalk = require('chalk');
var { take, takeUntil } = require('rxjs/operators');
var Base = require('./base');
var observe = require('../utils/events');

class ConfirmPrompt extends Base {
  constructor(questions, rl, answers) {
    super(questions, rl, answers);

    var rawDefault = true;

    _.extend(this.opt, {
      filter: function(input) {
        var value = rawDefault;
        if (input != null && input !== '') {
          value = /^y(es)?/i.test(input);
        }

        return value;
      }
    });

    if (_.isBoolean(this.opt.default)) {
      rawDefault = this.opt.default;
    }

    this.opt.default = rawDefault ? 'Y/n' : 'y/N';

    return this;
  }

  /**
   * Start the Inquiry session
   * @param  {Function} cb   Callback when prompt is done
   * @return {this}
   */

  _run(cb) {
    this.done = cb;

    // Once user confirm (enter key)
    var events = observe(this.rl);
    events.keypress.pipe(takeUntil(events.line)).forEach(this.onKeypress.bind(this));

    events.line.pipe(take(1)).forEach(this.onEnd.bind(this));

    // Init
    this.render();

    return this;
  }

  /**
   * Render the prompt to screen
   * @return {ConfirmPrompt} self
   */

  render(answer) {
    var message = this.getQuestion();

    if (typeof answer === 'boolean') {
      message += chalk.cyan(answer ? 'Yes' : 'No');
    } else {
      message += this.rl.line;
    }

    this.screen.render(message);

    return this;
  }

  /**
   * When user press `enter` key
   */

  onEnd(input) {
    this.status = 'answered';

    var output = this.opt.filter(input);
    this.render(output);

    this.screen.done();
    this.done(output);
  }

  /**
   * When user press a key
   */

  onKeypress() {
    this.render();
  }
}

module.exports = ConfirmPrompt;

}, function(modId) { var map = {"./base":1578386726434,"../utils/events":1578386726438}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1578386726443, function(require, module, exports) {

/**
 * `rawlist` type prompt
 */

var _ = require('lodash');
var chalk = require('chalk');
var { map, takeUntil } = require('rxjs/operators');
var Base = require('./base');
var Separator = require('../objects/separator');
var observe = require('../utils/events');
var Paginator = require('../utils/paginator');

class RawListPrompt extends Base {
  constructor(questions, rl, answers) {
    super(questions, rl, answers);

    if (!this.opt.choices) {
      this.throwParamError('choices');
    }

    this.opt.validChoices = this.opt.choices.filter(Separator.exclude);

    this.selected = 0;
    this.rawDefault = 0;

    _.extend(this.opt, {
      validate: function(val) {
        return val != null;
      }
    });

    var def = this.opt.default;
    if (_.isNumber(def) && def >= 0 && def < this.opt.choices.realLength) {
      this.selected = def;
      this.rawDefault = def;
    } else if (!_.isNumber(def) && def != null) {
      let index = _.findIndex(this.opt.choices.realChoices, ({ value }) => value === def);
      let safeIndex = Math.max(index, 0);
      this.selected = safeIndex;
      this.rawDefault = safeIndex;
    }

    // Make sure no default is set (so it won't be printed)
    this.opt.default = null;

    this.paginator = new Paginator();
  }

  /**
   * Start the Inquiry session
   * @param  {Function} cb      Callback when prompt is done
   * @return {this}
   */

  _run(cb) {
    this.done = cb;

    // Once user confirm (enter key)
    var events = observe(this.rl);
    var submit = events.line.pipe(map(this.getCurrentValue.bind(this)));

    var validation = this.handleSubmitEvents(submit);
    validation.success.forEach(this.onEnd.bind(this));
    validation.error.forEach(this.onError.bind(this));

    events.keypress
      .pipe(takeUntil(validation.success))
      .forEach(this.onKeypress.bind(this));
    events.normalizedUpKey.pipe(takeUntil(events.line)).forEach(this.onUpKey.bind(this));
    events.normalizedDownKey
      .pipe(takeUntil(events.line))
      .forEach(this.onDownKey.bind(this));

    // Init the prompt
    this.render();

    return this;
  }

  /**
   * Render the prompt to screen
   * @return {RawListPrompt} self
   */

  render(error) {
    // Render question
    var message = this.getQuestion();
    var bottomContent = '';

    if (this.status === 'answered') {
      message += chalk.cyan(this.answer);
    } else {
      var choicesStr = renderChoices(this.opt.choices, this.selected);
      message +=
        '\n' + this.paginator.paginate(choicesStr, this.selected, this.opt.pageSize);
      message += '\n  Answer: ';
    }

    message += this.rl.line;

    if (error) {
      bottomContent = '\n' + chalk.red('>> ') + error;
    }

    this.screen.render(message, bottomContent);
  }

  /**
   * When user press `enter` key
   */

  getCurrentValue(index) {
    if (index == null || index === '') {
      index = this.rawDefault;
    } else {
      index -= 1;
    }

    var choice = this.opt.choices.getChoice(index);
    return choice ? choice.value : null;
  }

  onEnd(state) {
    this.status = 'answered';
    this.answer = state.value;

    // Re-render prompt
    this.render();

    this.screen.done();
    this.done(state.value);
  }

  onError() {
    this.render('Please enter a valid index');
  }

  /**
   * When user press a key
   */

  onKeypress() {
    var index = this.rl.line.length ? Number(this.rl.line) - 1 : 0;

    if (this.opt.choices.getChoice(index)) {
      this.selected = index;
    } else {
      this.selected = undefined;
    }

    this.render();
  }

  /**
   * When user press up key
   */

  onUpKey() {
    this.onArrowKey('up');
  }

  /**
   * When user press down key
   */

  onDownKey() {
    this.onArrowKey('down');
  }

  /**
   * When user press up or down key
   * @param {String} type Arrow type: up or down
   */

  onArrowKey(type) {
    var index = this.rl.line.length ? Number(this.rl.line) - 1 : 0;
    if (type === 'up') index = index === 0 ? this.opt.choices.length - 1 : index - 1;
    else index = index === this.opt.choices.length - 1 ? 0 : index + 1;
    this.rl.line = String(index + 1);
    this.onKeypress();
  }
}

/**
 * Function for rendering list choices
 * @param  {Number} pointer Position of the pointer
 * @return {String}         Rendered content
 */

function renderChoices(choices, pointer) {
  var output = '';
  var separatorOffset = 0;

  choices.forEach(function(choice, i) {
    output += '\n  ';

    if (choice.type === 'separator') {
      separatorOffset++;
      output += ' ' + choice;
      return;
    }

    var index = i - separatorOffset;
    var display = index + 1 + ') ' + choice.name;
    if (index === pointer) {
      display = chalk.cyan(display);
    }

    output += display;
  });

  return output;
}

module.exports = RawListPrompt;

}, function(modId) { var map = {"./base":1578386726434,"../objects/separator":1578386726427,"../utils/events":1578386726438,"../utils/paginator":1578386726439}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1578386726444, function(require, module, exports) {

/**
 * `rawlist` type prompt
 */

var _ = require('lodash');
var chalk = require('chalk');
var { map, takeUntil } = require('rxjs/operators');
var Base = require('./base');
var Separator = require('../objects/separator');
var observe = require('../utils/events');
var Paginator = require('../utils/paginator');

class ExpandPrompt extends Base {
  constructor(questions, rl, answers) {
    super(questions, rl, answers);

    if (!this.opt.choices) {
      this.throwParamError('choices');
    }

    this.validateChoices(this.opt.choices);

    // Add the default `help` (/expand) option
    this.opt.choices.push({
      key: 'h',
      name: 'Help, list all options',
      value: 'help'
    });

    this.opt.validate = choice => {
      if (choice == null) {
        return 'Please enter a valid command';
      }

      return choice !== 'help';
    };

    // Setup the default string (capitalize the default key)
    this.opt.default = this.generateChoicesString(this.opt.choices, this.opt.default);

    this.paginator = new Paginator(this.screen);
  }

  /**
   * Start the Inquiry session
   * @param  {Function} cb      Callback when prompt is done
   * @return {this}
   */

  _run(cb) {
    this.done = cb;

    // Save user answer and update prompt to show selected option.
    var events = observe(this.rl);
    var validation = this.handleSubmitEvents(
      events.line.pipe(map(this.getCurrentValue.bind(this)))
    );
    validation.success.forEach(this.onSubmit.bind(this));
    validation.error.forEach(this.onError.bind(this));
    this.keypressObs = events.keypress
      .pipe(takeUntil(validation.success))
      .forEach(this.onKeypress.bind(this));

    // Init the prompt
    this.render();

    return this;
  }

  /**
   * Render the prompt to screen
   * @return {ExpandPrompt} self
   */

  render(error, hint) {
    var message = this.getQuestion();
    var bottomContent = '';

    if (this.status === 'answered') {
      message += chalk.cyan(this.answer);
    } else if (this.status === 'expanded') {
      var choicesStr = renderChoices(this.opt.choices, this.selectedKey);
      message += this.paginator.paginate(choicesStr, this.selectedKey, this.opt.pageSize);
      message += '\n  Answer: ';
    }

    message += this.rl.line;

    if (error) {
      bottomContent = chalk.red('>> ') + error;
    }

    if (hint) {
      bottomContent = chalk.cyan('>> ') + hint;
    }

    this.screen.render(message, bottomContent);
  }

  getCurrentValue(input) {
    if (!input) {
      input = this.rawDefault;
    }

    var selected = this.opt.choices.where({ key: input.toLowerCase().trim() })[0];
    if (!selected) {
      return null;
    }

    return selected.value;
  }

  /**
   * Generate the prompt choices string
   * @return {String}  Choices string
   */

  getChoices() {
    var output = '';

    this.opt.choices.forEach(choice => {
      output += '\n  ';

      if (choice.type === 'separator') {
        output += ' ' + choice;
        return;
      }

      var choiceStr = choice.key + ') ' + choice.name;
      if (this.selectedKey === choice.key) {
        choiceStr = chalk.cyan(choiceStr);
      }

      output += choiceStr;
    });

    return output;
  }

  onError(state) {
    if (state.value === 'help') {
      this.selectedKey = '';
      this.status = 'expanded';
      this.render();
      return;
    }

    this.render(state.isValid);
  }

  /**
   * When user press `enter` key
   */

  onSubmit(state) {
    this.status = 'answered';
    var choice = this.opt.choices.where({ value: state.value })[0];
    this.answer = choice.short || choice.name;

    // Re-render prompt
    this.render();
    this.screen.done();
    this.done(state.value);
  }

  /**
   * When user press a key
   */

  onKeypress() {
    this.selectedKey = this.rl.line.toLowerCase();
    var selected = this.opt.choices.where({ key: this.selectedKey })[0];
    if (this.status === 'expanded') {
      this.render();
    } else {
      this.render(null, selected ? selected.name : null);
    }
  }

  /**
   * Validate the choices
   * @param {Array} choices
   */

  validateChoices(choices) {
    var formatError;
    var errors = [];
    var keymap = {};
    choices.filter(Separator.exclude).forEach(choice => {
      if (!choice.key || choice.key.length !== 1) {
        formatError = true;
      }

      if (keymap[choice.key]) {
        errors.push(choice.key);
      }

      keymap[choice.key] = true;
      choice.key = String(choice.key).toLowerCase();
    });

    if (formatError) {
      throw new Error(
        'Format error: `key` param must be a single letter and is required.'
      );
    }

    if (keymap.h) {
      throw new Error(
        'Reserved key error: `key` param cannot be `h` - this value is reserved.'
      );
    }

    if (errors.length) {
      throw new Error(
        'Duplicate key error: `key` param must be unique. Duplicates: ' +
          _.uniq(errors).join(', ')
      );
    }
  }

  /**
   * Generate a string out of the choices keys
   * @param  {Array}  choices
   * @param  {Number|String} default - the choice index or name to capitalize
   * @return {String} The rendered choices key string
   */
  generateChoicesString(choices, defaultChoice) {
    var defIndex = choices.realLength - 1;
    if (_.isNumber(defaultChoice) && this.opt.choices.getChoice(defaultChoice)) {
      defIndex = defaultChoice;
    } else if (_.isString(defaultChoice)) {
      let index = _.findIndex(
        choices.realChoices,
        ({ value }) => value === defaultChoice
      );
      defIndex = index === -1 ? defIndex : index;
    }

    var defStr = this.opt.choices.pluck('key');
    this.rawDefault = defStr[defIndex];
    defStr[defIndex] = String(defStr[defIndex]).toUpperCase();
    return defStr.join('');
  }
}

/**
 * Function for rendering checkbox choices
 * @param  {String} pointer Selected key
 * @return {String}         Rendered content
 */

function renderChoices(choices, pointer) {
  var output = '';

  choices.forEach(choice => {
    output += '\n  ';

    if (choice.type === 'separator') {
      output += ' ' + choice;
      return;
    }

    var choiceStr = choice.key + ') ' + choice.name;
    if (pointer === choice.key) {
      choiceStr = chalk.cyan(choiceStr);
    }

    output += choiceStr;
  });

  return output;
}

module.exports = ExpandPrompt;

}, function(modId) { var map = {"./base":1578386726434,"../objects/separator":1578386726427,"../utils/events":1578386726438,"../utils/paginator":1578386726439}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1578386726445, function(require, module, exports) {

/**
 * `list` type prompt
 */

var _ = require('lodash');
var chalk = require('chalk');
var cliCursor = require('cli-cursor');
var figures = require('figures');
var { map, takeUntil } = require('rxjs/operators');
var Base = require('./base');
var observe = require('../utils/events');
var Paginator = require('../utils/paginator');

class CheckboxPrompt extends Base {
  constructor(questions, rl, answers) {
    super(questions, rl, answers);

    if (!this.opt.choices) {
      this.throwParamError('choices');
    }

    if (_.isArray(this.opt.default)) {
      this.opt.choices.forEach(function(choice) {
        if (this.opt.default.indexOf(choice.value) >= 0) {
          choice.checked = true;
        }
      }, this);
    }

    this.pointer = 0;

    // Make sure no default is set (so it won't be printed)
    this.opt.default = null;

    this.paginator = new Paginator(this.screen);
  }

  /**
   * Start the Inquiry session
   * @param  {Function} cb      Callback when prompt is done
   * @return {this}
   */

  _run(cb) {
    this.done = cb;

    var events = observe(this.rl);

    var validation = this.handleSubmitEvents(
      events.line.pipe(map(this.getCurrentValue.bind(this)))
    );
    validation.success.forEach(this.onEnd.bind(this));
    validation.error.forEach(this.onError.bind(this));

    events.normalizedUpKey
      .pipe(takeUntil(validation.success))
      .forEach(this.onUpKey.bind(this));
    events.normalizedDownKey
      .pipe(takeUntil(validation.success))
      .forEach(this.onDownKey.bind(this));
    events.numberKey
      .pipe(takeUntil(validation.success))
      .forEach(this.onNumberKey.bind(this));
    events.spaceKey
      .pipe(takeUntil(validation.success))
      .forEach(this.onSpaceKey.bind(this));
    events.aKey.pipe(takeUntil(validation.success)).forEach(this.onAllKey.bind(this));
    events.iKey.pipe(takeUntil(validation.success)).forEach(this.onInverseKey.bind(this));

    // Init the prompt
    cliCursor.hide();
    this.render();
    this.firstRender = false;

    return this;
  }

  /**
   * Render the prompt to screen
   * @return {CheckboxPrompt} self
   */

  render(error) {
    // Render question
    var message = this.getQuestion();
    var bottomContent = '';

    if (!this.spaceKeyPressed) {
      message +=
        '(Press ' +
        chalk.cyan.bold('<space>') +
        ' to select, ' +
        chalk.cyan.bold('<a>') +
        ' to toggle all, ' +
        chalk.cyan.bold('<i>') +
        ' to invert selection)';
    }

    // Render choices or answer depending on the state
    if (this.status === 'answered') {
      message += chalk.cyan(this.selection.join(', '));
    } else {
      var choicesStr = renderChoices(this.opt.choices, this.pointer);
      var indexPosition = this.opt.choices.indexOf(
        this.opt.choices.getChoice(this.pointer)
      );
      message +=
        '\n' + this.paginator.paginate(choicesStr, indexPosition, this.opt.pageSize);
    }

    if (error) {
      bottomContent = chalk.red('>> ') + error;
    }

    this.screen.render(message, bottomContent);
  }

  /**
   * When user press `enter` key
   */

  onEnd(state) {
    this.status = 'answered';

    // Rerender prompt (and clean subline error)
    this.render();

    this.screen.done();
    cliCursor.show();
    this.done(state.value);
  }

  onError(state) {
    this.render(state.isValid);
  }

  getCurrentValue() {
    var choices = this.opt.choices.filter(function(choice) {
      return Boolean(choice.checked) && !choice.disabled;
    });

    this.selection = _.map(choices, 'short');
    return _.map(choices, 'value');
  }

  onUpKey() {
    var len = this.opt.choices.realLength;
    this.pointer = this.pointer > 0 ? this.pointer - 1 : len - 1;
    this.render();
  }

  onDownKey() {
    var len = this.opt.choices.realLength;
    this.pointer = this.pointer < len - 1 ? this.pointer + 1 : 0;
    this.render();
  }

  onNumberKey(input) {
    if (input <= this.opt.choices.realLength) {
      this.pointer = input - 1;
      this.toggleChoice(this.pointer);
    }

    this.render();
  }

  onSpaceKey() {
    this.spaceKeyPressed = true;
    this.toggleChoice(this.pointer);
    this.render();
  }

  onAllKey() {
    var shouldBeChecked = Boolean(
      this.opt.choices.find(function(choice) {
        return choice.type !== 'separator' && !choice.checked;
      })
    );

    this.opt.choices.forEach(function(choice) {
      if (choice.type !== 'separator') {
        choice.checked = shouldBeChecked;
      }
    });

    this.render();
  }

  onInverseKey() {
    this.opt.choices.forEach(function(choice) {
      if (choice.type !== 'separator') {
        choice.checked = !choice.checked;
      }
    });

    this.render();
  }

  toggleChoice(index) {
    var item = this.opt.choices.getChoice(index);
    if (item !== undefined) {
      this.opt.choices.getChoice(index).checked = !item.checked;
    }
  }
}

/**
 * Function for rendering checkbox choices
 * @param  {Number} pointer Position of the pointer
 * @return {String}         Rendered content
 */

function renderChoices(choices, pointer) {
  var output = '';
  var separatorOffset = 0;

  choices.forEach(function(choice, i) {
    if (choice.type === 'separator') {
      separatorOffset++;
      output += ' ' + choice + '\n';
      return;
    }

    if (choice.disabled) {
      separatorOffset++;
      output += ' - ' + choice.name;
      output += ' (' + (_.isString(choice.disabled) ? choice.disabled : 'Disabled') + ')';
    } else {
      var line = getCheckbox(choice.checked) + ' ' + choice.name;
      if (i - separatorOffset === pointer) {
        output += chalk.cyan(figures.pointer + line);
      } else {
        output += ' ' + line;
      }
    }

    output += '\n';
  });

  return output.replace(/\n$/, '');
}

/**
 * Get the checkbox
 * @param  {Boolean} checked - add a X or not to the checkbox
 * @return {String} Composited checkbox string
 */

function getCheckbox(checked) {
  return checked ? chalk.green(figures.radioOn) : figures.radioOff;
}

module.exports = CheckboxPrompt;

}, function(modId) { var map = {"./base":1578386726434,"../utils/events":1578386726438,"../utils/paginator":1578386726439}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1578386726446, function(require, module, exports) {

/**
 * `password` type prompt
 */

var chalk = require('chalk');
var { map, takeUntil } = require('rxjs/operators');
var Base = require('./base');
var observe = require('../utils/events');

function mask(input, maskChar) {
  input = String(input);
  maskChar = typeof maskChar === 'string' ? maskChar : '*';
  if (input.length === 0) {
    return '';
  }

  return new Array(input.length + 1).join(maskChar);
}

class PasswordPrompt extends Base {
  /**
   * Start the Inquiry session
   * @param  {Function} cb      Callback when prompt is done
   * @return {this}
   */

  _run(cb) {
    this.done = cb;

    var events = observe(this.rl);

    // Once user confirm (enter key)
    var submit = events.line.pipe(map(this.filterInput.bind(this)));

    var validation = this.handleSubmitEvents(submit);
    validation.success.forEach(this.onEnd.bind(this));
    validation.error.forEach(this.onError.bind(this));

    events.keypress
      .pipe(takeUntil(validation.success))
      .forEach(this.onKeypress.bind(this));

    // Init
    this.render();

    return this;
  }

  /**
   * Render the prompt to screen
   * @return {PasswordPrompt} self
   */

  render(error) {
    var message = this.getQuestion();
    var bottomContent = '';

    if (this.status === 'answered') {
      message += this.opt.mask
        ? chalk.cyan(mask(this.answer, this.opt.mask))
        : chalk.italic.dim('[hidden]');
    } else if (this.opt.mask) {
      message += mask(this.rl.line || '', this.opt.mask);
    } else {
      message += chalk.italic.dim('[input is hidden] ');
    }

    if (error) {
      bottomContent = '\n' + chalk.red('>> ') + error;
    }

    this.screen.render(message, bottomContent);
  }

  /**
   * When user press `enter` key
   */

  filterInput(input) {
    if (!input) {
      return this.opt.default == null ? '' : this.opt.default;
    }

    return input;
  }

  onEnd(state) {
    this.status = 'answered';
    this.answer = state.value;

    // Re-render prompt
    this.render();

    this.screen.done();
    this.done(state.value);
  }

  onError(state) {
    this.render(state.isValid);
  }

  onKeypress() {
    // If user press a key, just clear the default value
    if (this.opt.default) {
      this.opt.default = undefined;
    }

    this.render();
  }
}

module.exports = PasswordPrompt;

}, function(modId) { var map = {"./base":1578386726434,"../utils/events":1578386726438}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1578386726447, function(require, module, exports) {

/**
 * `editor` type prompt
 */

var chalk = require('chalk');
var editAsync = require('external-editor').editAsync;
var Base = require('./base');
var observe = require('../utils/events');
var { Subject } = require('rxjs');

class EditorPrompt extends Base {
  /**
   * Start the Inquiry session
   * @param  {Function} cb      Callback when prompt is done
   * @return {this}
   */

  _run(cb) {
    this.done = cb;

    this.editorResult = new Subject();

    // Open Editor on "line" (Enter Key)
    var events = observe(this.rl);
    this.lineSubscription = events.line.subscribe(this.startExternalEditor.bind(this));

    // Trigger Validation when editor closes
    var validation = this.handleSubmitEvents(this.editorResult);
    validation.success.forEach(this.onEnd.bind(this));
    validation.error.forEach(this.onError.bind(this));

    // Prevents default from being printed on screen (can look weird with multiple lines)
    this.currentText = this.opt.default;
    this.opt.default = null;

    // Init
    this.render();

    return this;
  }

  /**
   * Render the prompt to screen
   * @return {EditorPrompt} self
   */

  render(error) {
    var bottomContent = '';
    var message = this.getQuestion();

    if (this.status === 'answered') {
      message += chalk.dim('Received');
    } else {
      message += chalk.dim('Press <enter> to launch your preferred editor.');
    }

    if (error) {
      bottomContent = chalk.red('>> ') + error;
    }

    this.screen.render(message, bottomContent);
  }

  /**
   * Launch $EDITOR on user press enter
   */

  startExternalEditor() {
    // Pause Readline to prevent stdin and stdout from being modified while the editor is showing
    this.rl.pause();
    editAsync(this.currentText, this.endExternalEditor.bind(this));
  }

  endExternalEditor(error, result) {
    this.rl.resume();
    if (error) {
      this.editorResult.error(error);
    } else {
      this.editorResult.next(result);
    }
  }

  onEnd(state) {
    this.editorResult.unsubscribe();
    this.lineSubscription.unsubscribe();
    this.answer = state.value;
    this.status = 'answered';
    // Re-render prompt
    this.render();
    this.screen.done();
    this.done(this.answer);
  }

  onError(state) {
    this.render(state.isValid);
  }
}

module.exports = EditorPrompt;

}, function(modId) { var map = {"./base":1578386726434,"../utils/events":1578386726438}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1578386726426);
})()
//# sourceMappingURL=index.js.map