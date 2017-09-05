/**
 * Module dependencies
 */

var _ = require('@sailshq/lodash');
var validator = require('validator');

/**
 * Type rules
 */

var rules = {

  //  ┬┌─┐┌┐┌┌─┐┬─┐┌─┐  ┌┐┌┬ ┬┬  ┬  
  //  ││ ┬││││ │├┬┘├┤   ││││ ││  │  
  //  ┴└─┘┘└┘└─┘┴└─└─┘  ┘└┘└─┘┴─┘┴─┘
  'isBoolean': {
    fn: function(x) {
      return typeof x === 'boolean';
    },
    defaultErrorMessage: '需要一个bool型值.',
    expectedTypes: ['json', 'ref']
  },
  'isNotEmptyString': {
    fn: function(x) {
      return x !== '';
    },
    defaultErrorMessage: '不能为空字符串.',
    expectedTypes: ['json', 'ref', 'string']
  },
  'isInteger': {
    fn: function(x) {
      return typeof x === 'number' && (parseInt(x) === x);
    },
    defaultErrorMessage: '需要一个整数.',
    expectedTypes: ['json', 'ref', 'number']
  },
  'isNumber': {
    fn: function(x) {
      return typeof x === 'number';
    },
    defaultErrorMessage: '需要一个数字.',
    expectedTypes: ['json', 'ref']
  },
  'isString': {
    fn: function(x) {
      return typeof x === 'string';
    },
    defaultErrorMessage: '需要一个字符串.',
    expectedTypes: ['json', 'ref']
  },
  'max': {
    fn: function(x, val) {
      if (typeof x !== 'number') { throw new Error ('需要一个数字.'); }
      return x <= val;
    },
    defaultErrorMessage: function(x, val) { return '超过了允许的最大值 (' + val + ')'; },
    expectedTypes: ['json', 'ref', 'number']
  },
  'min': {
    fn: function(x, val) {
      if (typeof x !== 'number') { throw new Error ('需要一个数字.'); }
      return x >= val;
    },
    defaultErrorMessage: function(x, val) { return '超过了允许的最小值 (' + val + ')'; },
    expectedTypes: ['json', 'ref', 'number']
  },


  //  ┬┌─┐┌┐┌┌─┐┬─┐┌─┐  ┌┐┌┬ ┬┬  ┬    ┌─┐┌┐┌┌┬┐  ┌─┐┌┬┐┌─┐┌┬┐┬ ┬  ┌─┐┌┬┐┬─┐┬┌┐┌┌─┐
  //  ││ ┬││││ │├┬┘├┤   ││││ ││  │    ├─┤│││ ││  ├┤ │││├─┘ │ └┬┘  └─┐ │ ├┬┘│││││ ┬
  //  ┴└─┘┘└┘└─┘┴└─└─┘  ┘└┘└─┘┴─┘┴─┘  ┴ ┴┘└┘─┴┘  └─┘┴ ┴┴   ┴  ┴   └─┘ ┴ ┴└─┴┘└┘└─┘
  'isAfter': {
    fn: validator.isAfter,
    expectedTypes: ['json', 'ref', 'string', 'number'],
    defaultErrorMessage: function(x, val) { return '超过了允许的最小时间 (' + val + ')'; },
    ignoreEmptyString: true
  },
  'isBefore': {
    fn: validator.isBefore,
    expectedTypes: ['json', 'ref', 'string', 'number'],
    defaultErrorMessage: function(x, val) { return '超过了允许的最大时间 (' + val + ')'; },
    ignoreEmptyString: true
  },
  'isCreditCard': {
    fn: validator.isCreditCard,
    expectedTypes: ['json', 'ref', 'string'],
    defaultErrorMessage: '需要正确的银行卡号.',
    ignoreEmptyString: true
  },
  'isEmail': {
    fn: validator.isEmail,
    expectedTypes: ['json', 'ref', 'string'],
    defaultErrorMessage: '需要正确的邮箱地址.',
    ignoreEmptyString: true
  },
  'isHexColor': {
    fn: validator.isHexColor,
    expectedTypes: ['json', 'ref', 'string'],
    defaultErrorMessage: '需要正确的16进制颜色.',
    ignoreEmptyString: true
  },
  'isIn': {
    fn: validator.isIn,
    expectedTypes: ['json', 'ref', 'string', 'number'],
    defaultErrorMessage: function(x, val) { return '需要以下范围的内容 (' + val.join(', ') + ')'; },
    ignoreEmptyString: true
  },
  'isIP': {
    fn: validator.isIP,
    expectedTypes: ['json', 'ref', 'string'],
    defaultErrorMessage: '需要正确的ip地址.',
    ignoreEmptyString: true
  },
  'isNotIn': {
    fn: function(x, arrayOrString) {
      return !validator.isIn(x, arrayOrString);
    },
    expectedTypes: ['json', 'ref', 'string', 'number'],
    defaultErrorMessage: function(x, val) { return '不能使用以下内容 (' + val.join(', ') + ')'; },
    ignoreEmptyString: true
  },
  'isURL': {
    fn: function(x, opt) {
      return validator.isURL(x, opt === true ? undefined : opt);
    },
    expectedTypes: ['json', 'ref', 'string'],
    defaultErrorMessage: '需要正确的url.',
    ignoreEmptyString: true
  },
  'isUUID': {
    fn: validator.isUUID,
    expectedTypes: ['json', 'ref', 'string'],
    defaultErrorMessage: '需要正确的 UUID.',
    ignoreEmptyString: true
  },

  'minLength': {
    fn: function(x, min) {
      if (typeof x !== 'string') { throw new Error ('需要一个字符串.'); }
      return validator.isLength(x, min);
    },
    expectedTypes: ['json', 'ref', 'string'],
    defaultErrorMessage: function(x, val) { return '超过了允许的最小长度 (' + val + ') 个字符'; },
    ignoreEmptyString: true
  },
  'maxLength': {
    fn: function(x, max) {
      if (typeof x !== 'string') { throw new Error ('需要一个字符串.'); }
      return validator.isLength(x, 0, max);
    },
    expectedTypes: ['json', 'ref', 'string'],
    defaultErrorMessage: function(x, val) { return '超过了允许的最大长度 (' + val + ')'; },
    ignoreEmptyString: true
  },

  'regex': {
    fn: function(x, regex) {
      if (!_.isRegExp(regex)) {
        throw new Error('需要正确的正则表达式，但却获得了 ' + typeof regex + ' `' + util.inspect(regex) + '`.');
      }
      return validator.matches(x, regex);
    },
    defaultErrorMessage: function(x, val) { return '不符合以下规则 (' + val + ')'; },
    expectedTypes: ['json', 'ref', 'string'],
    ignoreEmptyString: true
  },
  // //  ┬─┐┌─┐ ┬┌─┐┌─┐┌┬┐  ┌┐┌┬ ┬┬  ┬  
  // //  ├┬┘├┤  │├┤ │   │   ││││ ││  │  
  // //  ┴└─└─┘└┘└─┘└─┘ ┴   ┘└┘└─┘┴─┘┴─┘  
  // 'isNotNull': {
  //   fn: function(x) {
  //     return !_.isNull(x);
  //   },
  //   expectedTypes: ['json', 'ref']
  // },

  //  ┌─┐┬ ┬┌─┐┌┬┐┌─┐┌┬┐
  //  │  │ │└─┐ │ │ ││││
  //  └─┘└─┘└─┘ ┴ └─┘┴ ┴
  // Custom rule function.
  'custom': {
    fn: function(x, fn) {
      return fn(x);
    },
    expectedTypes: ['json', 'ref', 'string', 'number', 'boolean'],
    defaultErrorMessage: '验证失败.',
  }

};

// Wrap a rule in a function that handles nulls and empty strings as requested,
// and adds an `acceptedTypes` array that users of the rule can check to see
// if their value is of a type that the rule is designed to handle.  Note that
// this list of types is not necessarily validated in the rule itself; that is,
// just because it lists "json, ref, string" doesn't necessarily mean that it
// will automatically kick out numbers (it might stringify them).  It's up to
// you to decide whether to run the validation based on its `acceptedTypes`.
module.exports = _.reduce(rules, function createRule(memo, rule, ruleName) {

  // Wrap the original rule in a function that kicks out null and empty string if necessary.
  var wrappedRule = function(x) {

    // Never allow null or undefined.
    if (_.isNull(x) || _.isUndefined(x)) {
      return 'Got invalid value `' + x + '`!';
    }

    // Don't allow empty strings unless we're explicitly ignoring them.
    if (x === '' && rule.ignoreEmptyString) {
      return false;
    }

    var passed;
    // Run the original rule function.
    try {
      passed = rule.fn.apply(rule, arguments);
    } catch (e) {
      return e.message;
    }

    if (passed) { return false; }
    return _.isFunction(rule.defaultErrorMessage) ? rule.defaultErrorMessage.apply(rule, arguments) : rule.defaultErrorMessage;

  };

  // Set the `acceptedTypes` property of the wrapped function.
  wrappedRule.expectedTypes = rule.expectedTypes;

  // Return the wrapped function.
  memo[ruleName] = wrappedRule;

  return memo;

}, {});