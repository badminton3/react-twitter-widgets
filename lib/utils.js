"use strict";

exports.__esModule = true;
exports.canUseDOM = void 0;
exports.cloneShallow = cloneShallow;
exports.removeChildrenWithAttribute = removeChildrenWithAttribute;
exports.twLoad = twLoad;
exports.twWidgetFactory = twWidgetFactory;
exports.useShallowCompareMemoize = useShallowCompareMemoize;

var _loadjs = _interopRequireDefault(require("loadjs"));

var _react = require("react");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var twScriptUrl = "https://platform.twitter.com/widgets.js";
var twScriptWindowFieldName = "twttr";
var twScriptName = twScriptWindowFieldName;
var canUseDOM = !!(typeof window !== "undefined" && window.document && window.document.createElement);
exports.canUseDOM = canUseDOM;

function twLoad() {
  (0, _loadjs["default"])(twScriptUrl, twScriptName);
}

function twWidgetFactory() {
  return new Promise(function (resolve, reject) {
    var rejectWithError = function rejectWithError() {
      return reject(new Error("Could not load remote twitter widgets js"));
    };

    _loadjs["default"].ready(twScriptName, {
      success: function success() {
        // Ensure loaded
        var twttr = window[twScriptWindowFieldName];

        if (!twttr || !twttr.widgets) {
          rejectWithError();
        }

        resolve(twttr.widgets);
      },
      error: rejectWithError
    });
  });
}

function removeChildrenWithAttribute(node, attribute) {
  if (node) {
    node.querySelectorAll("*").forEach(function (child) {
      if (child.hasAttribute(attribute)) {
        child.remove();
      }
    });
  }
}

function is(x, y) {
  if (x === y) {
    return x !== 0 || y !== 0 || 1 / x === 1 / y;
  } else {
    return x !== x && y !== y;
  }
}

function isShallowEqual(objA, objB) {
  if (is(objA, objB)) {
    return true;
  }

  if (typeof objA !== "object" || objA === null || typeof objB !== "object" || objB === null) {
    return false;
  }

  var keysA = Object.keys(objA);
  var keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  for (var i = 0; i < keysA.length; i++) {
    if (!Object.prototype.hasOwnProperty.call(objB, keysA[i]) || !is(objA[keysA[i]], objB[keysA[i]])) {
      return false;
    }
  }

  return true;
}

function useShallowCompareMemoize(value) {
  var ref = (0, _react.useRef)();

  if (!isShallowEqual(value, ref.current)) {
    ref.current = value;
  }

  return ref.current;
}

function cloneShallow(value) {
  return typeof value === "object" ? _extends({}, value) : value;
}