// ==UserScript==
// @name okjike-ui
// @description 即刻网页版用户脚本。
// @author qzda
// @version 0.0.4
// @match https://web.okjike.com/*
// @namespace https://github.com/qzda/okjike-ui/
// @supportURL https://github.com/qzda/okjike-ui/issues/new
// @downloadURL https://raw.githubusercontent.com/qzda/okjike-ui/main/dist/okjike-ui.user.js
// @updateURL https://raw.githubusercontent.com/qzda/okjike-ui/main/dist/okjike-ui.user.js
// @icon https://raw.githubusercontent.com/qzda/okjike-ui/refs/heads/main/image/okjike-logo.png
// @copyright MIT
// @run-at document-start
// @connect raw.githubusercontent.com
// @connect github.com
// @grant unsafeWindow
// @grant window.onurlchange
// @grant GM_addStyle
// @grant GM_addElement
// @grant GM_registerMenuCommand
// ==/UserScript==

var __create = Object.create;
var __getProtoOf = Object.getPrototypeOf;
var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __toESM = (mod, isNodeMode, target) => {
  target = mod != null ? __create(__getProtoOf(mod)) : {};
  const to = isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target;
  for (let key of __getOwnPropNames(mod))
    if (!__hasOwnProp.call(to, key))
      __defProp(to, key, {
        get: () => mod[key],
        enumerable: true
      });
  return to;
};
var __commonJS = (cb, mod) => () => (mod || cb((mod = { exports: {} }).exports, mod), mod.exports);

// ../node_modules/ev-emitter/ev-emitter.js
var require_ev_emitter = __commonJS((exports, module) => {
  (function(global, factory) {
    if (typeof define == "function" && define.amd) {
      define(factory);
    } else if (typeof module == "object" && module.exports) {
      module.exports = factory();
    } else {
      global.EvEmitter = factory();
    }
  })(typeof window != "undefined" ? window : exports, function() {
    function EvEmitter() {
    }
    var proto = EvEmitter.prototype;
    proto.on = function(eventName, listener) {
      if (!eventName || !listener) {
        return;
      }
      var events = this._events = this._events || {};
      var listeners = events[eventName] = events[eventName] || [];
      if (listeners.indexOf(listener) == -1) {
        listeners.push(listener);
      }
      return this;
    };
    proto.once = function(eventName, listener) {
      if (!eventName || !listener) {
        return;
      }
      this.on(eventName, listener);
      var onceEvents = this._onceEvents = this._onceEvents || {};
      var onceListeners = onceEvents[eventName] = onceEvents[eventName] || {};
      onceListeners[listener] = true;
      return this;
    };
    proto.off = function(eventName, listener) {
      var listeners = this._events && this._events[eventName];
      if (!listeners || !listeners.length) {
        return;
      }
      var index = listeners.indexOf(listener);
      if (index != -1) {
        listeners.splice(index, 1);
      }
      return this;
    };
    proto.emitEvent = function(eventName, args) {
      var listeners = this._events && this._events[eventName];
      if (!listeners || !listeners.length) {
        return;
      }
      listeners = listeners.slice(0);
      args = args || [];
      var onceListeners = this._onceEvents && this._onceEvents[eventName];
      for (var i = 0;i < listeners.length; i++) {
        var listener = listeners[i];
        var isOnce = onceListeners && onceListeners[listener];
        if (isOnce) {
          this.off(eventName, listener);
          delete onceListeners[listener];
        }
        listener.apply(this, args);
      }
      return this;
    };
    proto.allOff = function() {
      delete this._events;
      delete this._onceEvents;
    };
    return EvEmitter;
  });
});

// ../node_modules/get-size/get-size.js
var require_get_size = __commonJS((exports, module) => {
  /*!
   * getSize v2.0.3
   * measure size of elements
   * MIT license
   */
  (function(window2, factory) {
    if (typeof define == "function" && define.amd) {
      define(factory);
    } else if (typeof module == "object" && module.exports) {
      module.exports = factory();
    } else {
      window2.getSize = factory();
    }
  })(window, function factory() {
    function getStyleSize(value) {
      var num = parseFloat(value);
      var isValid = value.indexOf("%") == -1 && !isNaN(num);
      return isValid && num;
    }
    function noop() {
    }
    var logError2 = typeof console == "undefined" ? noop : function(message) {
      console.error(message);
    };
    var measurements = [
      "paddingLeft",
      "paddingRight",
      "paddingTop",
      "paddingBottom",
      "marginLeft",
      "marginRight",
      "marginTop",
      "marginBottom",
      "borderLeftWidth",
      "borderRightWidth",
      "borderTopWidth",
      "borderBottomWidth"
    ];
    var measurementsLength = measurements.length;
    function getZeroSize() {
      var size = {
        width: 0,
        height: 0,
        innerWidth: 0,
        innerHeight: 0,
        outerWidth: 0,
        outerHeight: 0
      };
      for (var i = 0;i < measurementsLength; i++) {
        var measurement = measurements[i];
        size[measurement] = 0;
      }
      return size;
    }
    function getStyle(elem) {
      var style = getComputedStyle(elem);
      if (!style) {
        logError2("Style returned " + style + ". Are you running this code in a hidden iframe on Firefox? " + "See https://bit.ly/getsizebug1");
      }
      return style;
    }
    var isSetup = false;
    var isBoxSizeOuter;
    function setup() {
      if (isSetup) {
        return;
      }
      isSetup = true;
      var div = document.createElement("div");
      div.style.width = "200px";
      div.style.padding = "1px 2px 3px 4px";
      div.style.borderStyle = "solid";
      div.style.borderWidth = "1px 2px 3px 4px";
      div.style.boxSizing = "border-box";
      var body = document.body || document.documentElement;
      body.appendChild(div);
      var style = getStyle(div);
      isBoxSizeOuter = Math.round(getStyleSize(style.width)) == 200;
      getSize.isBoxSizeOuter = isBoxSizeOuter;
      body.removeChild(div);
    }
    function getSize(elem) {
      setup();
      if (typeof elem == "string") {
        elem = document.querySelector(elem);
      }
      if (!elem || typeof elem != "object" || !elem.nodeType) {
        return;
      }
      var style = getStyle(elem);
      if (style.display == "none") {
        return getZeroSize();
      }
      var size = {};
      size.width = elem.offsetWidth;
      size.height = elem.offsetHeight;
      var isBorderBox = size.isBorderBox = style.boxSizing == "border-box";
      for (var i = 0;i < measurementsLength; i++) {
        var measurement = measurements[i];
        var value = style[measurement];
        var num = parseFloat(value);
        size[measurement] = !isNaN(num) ? num : 0;
      }
      var paddingWidth = size.paddingLeft + size.paddingRight;
      var paddingHeight = size.paddingTop + size.paddingBottom;
      var marginWidth = size.marginLeft + size.marginRight;
      var marginHeight = size.marginTop + size.marginBottom;
      var borderWidth = size.borderLeftWidth + size.borderRightWidth;
      var borderHeight = size.borderTopWidth + size.borderBottomWidth;
      var isBorderBoxSizeOuter = isBorderBox && isBoxSizeOuter;
      var styleWidth = getStyleSize(style.width);
      if (styleWidth !== false) {
        size.width = styleWidth + (isBorderBoxSizeOuter ? 0 : paddingWidth + borderWidth);
      }
      var styleHeight = getStyleSize(style.height);
      if (styleHeight !== false) {
        size.height = styleHeight + (isBorderBoxSizeOuter ? 0 : paddingHeight + borderHeight);
      }
      size.innerWidth = size.width - (paddingWidth + borderWidth);
      size.innerHeight = size.height - (paddingHeight + borderHeight);
      size.outerWidth = size.width + marginWidth;
      size.outerHeight = size.height + marginHeight;
      return size;
    }
    return getSize;
  });
});

// ../node_modules/desandro-matches-selector/matches-selector.js
var require_matches_selector = __commonJS((exports, module) => {
  (function(window2, factory) {
    if (typeof define == "function" && define.amd) {
      define(factory);
    } else if (typeof module == "object" && module.exports) {
      module.exports = factory();
    } else {
      window2.matchesSelector = factory();
    }
  })(window, function factory() {
    var matchesMethod = function() {
      var ElemProto = window.Element.prototype;
      if (ElemProto.matches) {
        return "matches";
      }
      if (ElemProto.matchesSelector) {
        return "matchesSelector";
      }
      var prefixes = ["webkit", "moz", "ms", "o"];
      for (var i = 0;i < prefixes.length; i++) {
        var prefix = prefixes[i];
        var method = prefix + "MatchesSelector";
        if (ElemProto[method]) {
          return method;
        }
      }
    }();
    return function matchesSelector(elem, selector) {
      return elem[matchesMethod](selector);
    };
  });
});

// ../node_modules/fizzy-ui-utils/utils.js
var require_utils = __commonJS((exports, module) => {
  (function(window2, factory) {
    if (typeof define == "function" && define.amd) {
      define([
        "desandro-matches-selector/matches-selector"
      ], function(matchesSelector) {
        return factory(window2, matchesSelector);
      });
    } else if (typeof module == "object" && module.exports) {
      module.exports = factory(window2, require_matches_selector());
    } else {
      window2.fizzyUIUtils = factory(window2, window2.matchesSelector);
    }
  })(window, function factory(window2, matchesSelector) {
    var utils = {};
    utils.extend = function(a, b) {
      for (var prop in b) {
        a[prop] = b[prop];
      }
      return a;
    };
    utils.modulo = function(num, div) {
      return (num % div + div) % div;
    };
    var arraySlice = Array.prototype.slice;
    utils.makeArray = function(obj) {
      if (Array.isArray(obj)) {
        return obj;
      }
      if (obj === null || obj === undefined) {
        return [];
      }
      var isArrayLike = typeof obj == "object" && typeof obj.length == "number";
      if (isArrayLike) {
        return arraySlice.call(obj);
      }
      return [obj];
    };
    utils.removeFrom = function(ary, obj) {
      var index = ary.indexOf(obj);
      if (index != -1) {
        ary.splice(index, 1);
      }
    };
    utils.getParent = function(elem, selector) {
      while (elem.parentNode && elem != document.body) {
        elem = elem.parentNode;
        if (matchesSelector(elem, selector)) {
          return elem;
        }
      }
    };
    utils.getQueryElement = function(elem) {
      if (typeof elem == "string") {
        return document.querySelector(elem);
      }
      return elem;
    };
    utils.handleEvent = function(event) {
      var method = "on" + event.type;
      if (this[method]) {
        this[method](event);
      }
    };
    utils.filterFindElements = function(elems, selector) {
      elems = utils.makeArray(elems);
      var ffElems = [];
      elems.forEach(function(elem) {
        if (!(elem instanceof HTMLElement)) {
          return;
        }
        if (!selector) {
          ffElems.push(elem);
          return;
        }
        if (matchesSelector(elem, selector)) {
          ffElems.push(elem);
        }
        var childElems = elem.querySelectorAll(selector);
        for (var i = 0;i < childElems.length; i++) {
          ffElems.push(childElems[i]);
        }
      });
      return ffElems;
    };
    utils.debounceMethod = function(_class, methodName, threshold) {
      threshold = threshold || 100;
      var method = _class.prototype[methodName];
      var timeoutName = methodName + "Timeout";
      _class.prototype[methodName] = function() {
        var timeout = this[timeoutName];
        clearTimeout(timeout);
        var args = arguments;
        var _this = this;
        this[timeoutName] = setTimeout(function() {
          method.apply(_this, args);
          delete _this[timeoutName];
        }, threshold);
      };
    };
    utils.docReady = function(callback) {
      var readyState = document.readyState;
      if (readyState == "complete" || readyState == "interactive") {
        setTimeout(callback);
      } else {
        document.addEventListener("DOMContentLoaded", callback);
      }
    };
    utils.toDashed = function(str) {
      return str.replace(/(.)([A-Z])/g, function(match, $1, $2) {
        return $1 + "-" + $2;
      }).toLowerCase();
    };
    var console2 = window2.console;
    utils.htmlInit = function(WidgetClass, namespace) {
      utils.docReady(function() {
        var dashedNamespace = utils.toDashed(namespace);
        var dataAttr = "data-" + dashedNamespace;
        var dataAttrElems = document.querySelectorAll("[" + dataAttr + "]");
        var jsDashElems = document.querySelectorAll(".js-" + dashedNamespace);
        var elems = utils.makeArray(dataAttrElems).concat(utils.makeArray(jsDashElems));
        var dataOptionsAttr = dataAttr + "-options";
        var jQuery = window2.jQuery;
        elems.forEach(function(elem) {
          var attr = elem.getAttribute(dataAttr) || elem.getAttribute(dataOptionsAttr);
          var options;
          try {
            options = attr && JSON.parse(attr);
          } catch (error) {
            if (console2) {
              console2.error("Error parsing " + dataAttr + " on " + elem.className + ": " + error);
            }
            return;
          }
          var instance = new WidgetClass(elem, options);
          if (jQuery) {
            jQuery.data(elem, namespace, instance);
          }
        });
      });
    };
    return utils;
  });
});

// ../node_modules/outlayer/item.js
var require_item = __commonJS((exports, module) => {
  (function(window2, factory) {
    if (typeof define == "function" && define.amd) {
      define([
        "ev-emitter/ev-emitter",
        "get-size/get-size"
      ], factory);
    } else if (typeof module == "object" && module.exports) {
      module.exports = factory(require_ev_emitter(), require_get_size());
    } else {
      window2.Outlayer = {};
      window2.Outlayer.Item = factory(window2.EvEmitter, window2.getSize);
    }
  })(window, function factory(EvEmitter, getSize) {
    function isEmptyObj(obj) {
      for (var prop in obj) {
        return false;
      }
      prop = null;
      return true;
    }
    var docElemStyle = document.documentElement.style;
    var transitionProperty = typeof docElemStyle.transition == "string" ? "transition" : "WebkitTransition";
    var transformProperty = typeof docElemStyle.transform == "string" ? "transform" : "WebkitTransform";
    var transitionEndEvent = {
      WebkitTransition: "webkitTransitionEnd",
      transition: "transitionend"
    }[transitionProperty];
    var vendorProperties = {
      transform: transformProperty,
      transition: transitionProperty,
      transitionDuration: transitionProperty + "Duration",
      transitionProperty: transitionProperty + "Property",
      transitionDelay: transitionProperty + "Delay"
    };
    function Item(element, layout) {
      if (!element) {
        return;
      }
      this.element = element;
      this.layout = layout;
      this.position = {
        x: 0,
        y: 0
      };
      this._create();
    }
    var proto = Item.prototype = Object.create(EvEmitter.prototype);
    proto.constructor = Item;
    proto._create = function() {
      this._transn = {
        ingProperties: {},
        clean: {},
        onEnd: {}
      };
      this.css({
        position: "absolute"
      });
    };
    proto.handleEvent = function(event) {
      var method = "on" + event.type;
      if (this[method]) {
        this[method](event);
      }
    };
    proto.getSize = function() {
      this.size = getSize(this.element);
    };
    proto.css = function(style) {
      var elemStyle = this.element.style;
      for (var prop in style) {
        var supportedProp = vendorProperties[prop] || prop;
        elemStyle[supportedProp] = style[prop];
      }
    };
    proto.getPosition = function() {
      var style = getComputedStyle(this.element);
      var isOriginLeft = this.layout._getOption("originLeft");
      var isOriginTop = this.layout._getOption("originTop");
      var xValue = style[isOriginLeft ? "left" : "right"];
      var yValue = style[isOriginTop ? "top" : "bottom"];
      var x = parseFloat(xValue);
      var y = parseFloat(yValue);
      var layoutSize = this.layout.size;
      if (xValue.indexOf("%") != -1) {
        x = x / 100 * layoutSize.width;
      }
      if (yValue.indexOf("%") != -1) {
        y = y / 100 * layoutSize.height;
      }
      x = isNaN(x) ? 0 : x;
      y = isNaN(y) ? 0 : y;
      x -= isOriginLeft ? layoutSize.paddingLeft : layoutSize.paddingRight;
      y -= isOriginTop ? layoutSize.paddingTop : layoutSize.paddingBottom;
      this.position.x = x;
      this.position.y = y;
    };
    proto.layoutPosition = function() {
      var layoutSize = this.layout.size;
      var style = {};
      var isOriginLeft = this.layout._getOption("originLeft");
      var isOriginTop = this.layout._getOption("originTop");
      var xPadding = isOriginLeft ? "paddingLeft" : "paddingRight";
      var xProperty = isOriginLeft ? "left" : "right";
      var xResetProperty = isOriginLeft ? "right" : "left";
      var x = this.position.x + layoutSize[xPadding];
      style[xProperty] = this.getXValue(x);
      style[xResetProperty] = "";
      var yPadding = isOriginTop ? "paddingTop" : "paddingBottom";
      var yProperty = isOriginTop ? "top" : "bottom";
      var yResetProperty = isOriginTop ? "bottom" : "top";
      var y = this.position.y + layoutSize[yPadding];
      style[yProperty] = this.getYValue(y);
      style[yResetProperty] = "";
      this.css(style);
      this.emitEvent("layout", [this]);
    };
    proto.getXValue = function(x) {
      var isHorizontal = this.layout._getOption("horizontal");
      return this.layout.options.percentPosition && !isHorizontal ? x / this.layout.size.width * 100 + "%" : x + "px";
    };
    proto.getYValue = function(y) {
      var isHorizontal = this.layout._getOption("horizontal");
      return this.layout.options.percentPosition && isHorizontal ? y / this.layout.size.height * 100 + "%" : y + "px";
    };
    proto._transitionTo = function(x, y) {
      this.getPosition();
      var curX = this.position.x;
      var curY = this.position.y;
      var didNotMove = x == this.position.x && y == this.position.y;
      this.setPosition(x, y);
      if (didNotMove && !this.isTransitioning) {
        this.layoutPosition();
        return;
      }
      var transX = x - curX;
      var transY = y - curY;
      var transitionStyle = {};
      transitionStyle.transform = this.getTranslate(transX, transY);
      this.transition({
        to: transitionStyle,
        onTransitionEnd: {
          transform: this.layoutPosition
        },
        isCleaning: true
      });
    };
    proto.getTranslate = function(x, y) {
      var isOriginLeft = this.layout._getOption("originLeft");
      var isOriginTop = this.layout._getOption("originTop");
      x = isOriginLeft ? x : -x;
      y = isOriginTop ? y : -y;
      return "translate3d(" + x + "px, " + y + "px, 0)";
    };
    proto.goTo = function(x, y) {
      this.setPosition(x, y);
      this.layoutPosition();
    };
    proto.moveTo = proto._transitionTo;
    proto.setPosition = function(x, y) {
      this.position.x = parseFloat(x);
      this.position.y = parseFloat(y);
    };
    proto._nonTransition = function(args) {
      this.css(args.to);
      if (args.isCleaning) {
        this._removeStyles(args.to);
      }
      for (var prop in args.onTransitionEnd) {
        args.onTransitionEnd[prop].call(this);
      }
    };
    proto.transition = function(args) {
      if (!parseFloat(this.layout.options.transitionDuration)) {
        this._nonTransition(args);
        return;
      }
      var _transition = this._transn;
      for (var prop in args.onTransitionEnd) {
        _transition.onEnd[prop] = args.onTransitionEnd[prop];
      }
      for (prop in args.to) {
        _transition.ingProperties[prop] = true;
        if (args.isCleaning) {
          _transition.clean[prop] = true;
        }
      }
      if (args.from) {
        this.css(args.from);
        var h = this.element.offsetHeight;
        h = null;
      }
      this.enableTransition(args.to);
      this.css(args.to);
      this.isTransitioning = true;
    };
    function toDashedAll(str) {
      return str.replace(/([A-Z])/g, function($1) {
        return "-" + $1.toLowerCase();
      });
    }
    var transitionProps = "opacity," + toDashedAll(transformProperty);
    proto.enableTransition = function() {
      if (this.isTransitioning) {
        return;
      }
      var duration = this.layout.options.transitionDuration;
      duration = typeof duration == "number" ? duration + "ms" : duration;
      this.css({
        transitionProperty: transitionProps,
        transitionDuration: duration,
        transitionDelay: this.staggerDelay || 0
      });
      this.element.addEventListener(transitionEndEvent, this, false);
    };
    proto.onwebkitTransitionEnd = function(event) {
      this.ontransitionend(event);
    };
    proto.onotransitionend = function(event) {
      this.ontransitionend(event);
    };
    var dashedVendorProperties = {
      "-webkit-transform": "transform"
    };
    proto.ontransitionend = function(event) {
      if (event.target !== this.element) {
        return;
      }
      var _transition = this._transn;
      var propertyName = dashedVendorProperties[event.propertyName] || event.propertyName;
      delete _transition.ingProperties[propertyName];
      if (isEmptyObj(_transition.ingProperties)) {
        this.disableTransition();
      }
      if (propertyName in _transition.clean) {
        this.element.style[event.propertyName] = "";
        delete _transition.clean[propertyName];
      }
      if (propertyName in _transition.onEnd) {
        var onTransitionEnd = _transition.onEnd[propertyName];
        onTransitionEnd.call(this);
        delete _transition.onEnd[propertyName];
      }
      this.emitEvent("transitionEnd", [this]);
    };
    proto.disableTransition = function() {
      this.removeTransitionStyles();
      this.element.removeEventListener(transitionEndEvent, this, false);
      this.isTransitioning = false;
    };
    proto._removeStyles = function(style) {
      var cleanStyle = {};
      for (var prop in style) {
        cleanStyle[prop] = "";
      }
      this.css(cleanStyle);
    };
    var cleanTransitionStyle = {
      transitionProperty: "",
      transitionDuration: "",
      transitionDelay: ""
    };
    proto.removeTransitionStyles = function() {
      this.css(cleanTransitionStyle);
    };
    proto.stagger = function(delay) {
      delay = isNaN(delay) ? 0 : delay;
      this.staggerDelay = delay + "ms";
    };
    proto.removeElem = function() {
      this.element.parentNode.removeChild(this.element);
      this.css({ display: "" });
      this.emitEvent("remove", [this]);
    };
    proto.remove = function() {
      if (!transitionProperty || !parseFloat(this.layout.options.transitionDuration)) {
        this.removeElem();
        return;
      }
      this.once("transitionEnd", function() {
        this.removeElem();
      });
      this.hide();
    };
    proto.reveal = function() {
      delete this.isHidden;
      this.css({ display: "" });
      var options = this.layout.options;
      var onTransitionEnd = {};
      var transitionEndProperty = this.getHideRevealTransitionEndProperty("visibleStyle");
      onTransitionEnd[transitionEndProperty] = this.onRevealTransitionEnd;
      this.transition({
        from: options.hiddenStyle,
        to: options.visibleStyle,
        isCleaning: true,
        onTransitionEnd
      });
    };
    proto.onRevealTransitionEnd = function() {
      if (!this.isHidden) {
        this.emitEvent("reveal");
      }
    };
    proto.getHideRevealTransitionEndProperty = function(styleProperty) {
      var optionStyle = this.layout.options[styleProperty];
      if (optionStyle.opacity) {
        return "opacity";
      }
      for (var prop in optionStyle) {
        return prop;
      }
    };
    proto.hide = function() {
      this.isHidden = true;
      this.css({ display: "" });
      var options = this.layout.options;
      var onTransitionEnd = {};
      var transitionEndProperty = this.getHideRevealTransitionEndProperty("hiddenStyle");
      onTransitionEnd[transitionEndProperty] = this.onHideTransitionEnd;
      this.transition({
        from: options.visibleStyle,
        to: options.hiddenStyle,
        isCleaning: true,
        onTransitionEnd
      });
    };
    proto.onHideTransitionEnd = function() {
      if (this.isHidden) {
        this.css({ display: "none" });
        this.emitEvent("hide");
      }
    };
    proto.destroy = function() {
      this.css({
        position: "",
        left: "",
        right: "",
        top: "",
        bottom: "",
        transition: "",
        transform: ""
      });
    };
    return Item;
  });
});

// ../node_modules/outlayer/outlayer.js
var require_outlayer = __commonJS((exports, module) => {
  /*!
   * Outlayer v2.1.1
   * the brains and guts of a layout library
   * MIT license
   */
  (function(window2, factory) {
    if (typeof define == "function" && define.amd) {
      define([
        "ev-emitter/ev-emitter",
        "get-size/get-size",
        "fizzy-ui-utils/utils",
        "./item"
      ], function(EvEmitter, getSize, utils, Item) {
        return factory(window2, EvEmitter, getSize, utils, Item);
      });
    } else if (typeof module == "object" && module.exports) {
      module.exports = factory(window2, require_ev_emitter(), require_get_size(), require_utils(), require_item());
    } else {
      window2.Outlayer = factory(window2, window2.EvEmitter, window2.getSize, window2.fizzyUIUtils, window2.Outlayer.Item);
    }
  })(window, function factory(window2, EvEmitter, getSize, utils, Item) {
    var console2 = window2.console;
    var jQuery = window2.jQuery;
    var noop = function() {
    };
    var GUID = 0;
    var instances = {};
    function Outlayer(element, options) {
      var queryElement = utils.getQueryElement(element);
      if (!queryElement) {
        if (console2) {
          console2.error("Bad element for " + this.constructor.namespace + ": " + (queryElement || element));
        }
        return;
      }
      this.element = queryElement;
      if (jQuery) {
        this.$element = jQuery(this.element);
      }
      this.options = utils.extend({}, this.constructor.defaults);
      this.option(options);
      var id = ++GUID;
      this.element.outlayerGUID = id;
      instances[id] = this;
      this._create();
      var isInitLayout = this._getOption("initLayout");
      if (isInitLayout) {
        this.layout();
      }
    }
    Outlayer.namespace = "outlayer";
    Outlayer.Item = Item;
    Outlayer.defaults = {
      containerStyle: {
        position: "relative"
      },
      initLayout: true,
      originLeft: true,
      originTop: true,
      resize: true,
      resizeContainer: true,
      transitionDuration: "0.4s",
      hiddenStyle: {
        opacity: 0,
        transform: "scale(0.001)"
      },
      visibleStyle: {
        opacity: 1,
        transform: "scale(1)"
      }
    };
    var proto = Outlayer.prototype;
    utils.extend(proto, EvEmitter.prototype);
    proto.option = function(opts) {
      utils.extend(this.options, opts);
    };
    proto._getOption = function(option) {
      var oldOption = this.constructor.compatOptions[option];
      return oldOption && this.options[oldOption] !== undefined ? this.options[oldOption] : this.options[option];
    };
    Outlayer.compatOptions = {
      initLayout: "isInitLayout",
      horizontal: "isHorizontal",
      layoutInstant: "isLayoutInstant",
      originLeft: "isOriginLeft",
      originTop: "isOriginTop",
      resize: "isResizeBound",
      resizeContainer: "isResizingContainer"
    };
    proto._create = function() {
      this.reloadItems();
      this.stamps = [];
      this.stamp(this.options.stamp);
      utils.extend(this.element.style, this.options.containerStyle);
      var canBindResize = this._getOption("resize");
      if (canBindResize) {
        this.bindResize();
      }
    };
    proto.reloadItems = function() {
      this.items = this._itemize(this.element.children);
    };
    proto._itemize = function(elems) {
      var itemElems = this._filterFindItemElements(elems);
      var Item2 = this.constructor.Item;
      var items = [];
      for (var i = 0;i < itemElems.length; i++) {
        var elem = itemElems[i];
        var item = new Item2(elem, this);
        items.push(item);
      }
      return items;
    };
    proto._filterFindItemElements = function(elems) {
      return utils.filterFindElements(elems, this.options.itemSelector);
    };
    proto.getItemElements = function() {
      return this.items.map(function(item) {
        return item.element;
      });
    };
    proto.layout = function() {
      this._resetLayout();
      this._manageStamps();
      var layoutInstant = this._getOption("layoutInstant");
      var isInstant = layoutInstant !== undefined ? layoutInstant : !this._isLayoutInited;
      this.layoutItems(this.items, isInstant);
      this._isLayoutInited = true;
    };
    proto._init = proto.layout;
    proto._resetLayout = function() {
      this.getSize();
    };
    proto.getSize = function() {
      this.size = getSize(this.element);
    };
    proto._getMeasurement = function(measurement, size) {
      var option = this.options[measurement];
      var elem;
      if (!option) {
        this[measurement] = 0;
      } else {
        if (typeof option == "string") {
          elem = this.element.querySelector(option);
        } else if (option instanceof HTMLElement) {
          elem = option;
        }
        this[measurement] = elem ? getSize(elem)[size] : option;
      }
    };
    proto.layoutItems = function(items, isInstant) {
      items = this._getItemsForLayout(items);
      this._layoutItems(items, isInstant);
      this._postLayout();
    };
    proto._getItemsForLayout = function(items) {
      return items.filter(function(item) {
        return !item.isIgnored;
      });
    };
    proto._layoutItems = function(items, isInstant) {
      this._emitCompleteOnItems("layout", items);
      if (!items || !items.length) {
        return;
      }
      var queue = [];
      items.forEach(function(item) {
        var position = this._getItemLayoutPosition(item);
        position.item = item;
        position.isInstant = isInstant || item.isLayoutInstant;
        queue.push(position);
      }, this);
      this._processLayoutQueue(queue);
    };
    proto._getItemLayoutPosition = function() {
      return {
        x: 0,
        y: 0
      };
    };
    proto._processLayoutQueue = function(queue) {
      this.updateStagger();
      queue.forEach(function(obj, i) {
        this._positionItem(obj.item, obj.x, obj.y, obj.isInstant, i);
      }, this);
    };
    proto.updateStagger = function() {
      var stagger = this.options.stagger;
      if (stagger === null || stagger === undefined) {
        this.stagger = 0;
        return;
      }
      this.stagger = getMilliseconds(stagger);
      return this.stagger;
    };
    proto._positionItem = function(item, x, y, isInstant, i) {
      if (isInstant) {
        item.goTo(x, y);
      } else {
        item.stagger(i * this.stagger);
        item.moveTo(x, y);
      }
    };
    proto._postLayout = function() {
      this.resizeContainer();
    };
    proto.resizeContainer = function() {
      var isResizingContainer = this._getOption("resizeContainer");
      if (!isResizingContainer) {
        return;
      }
      var size = this._getContainerSize();
      if (size) {
        this._setContainerMeasure(size.width, true);
        this._setContainerMeasure(size.height, false);
      }
    };
    proto._getContainerSize = noop;
    proto._setContainerMeasure = function(measure, isWidth) {
      if (measure === undefined) {
        return;
      }
      var elemSize = this.size;
      if (elemSize.isBorderBox) {
        measure += isWidth ? elemSize.paddingLeft + elemSize.paddingRight + elemSize.borderLeftWidth + elemSize.borderRightWidth : elemSize.paddingBottom + elemSize.paddingTop + elemSize.borderTopWidth + elemSize.borderBottomWidth;
      }
      measure = Math.max(measure, 0);
      this.element.style[isWidth ? "width" : "height"] = measure + "px";
    };
    proto._emitCompleteOnItems = function(eventName, items) {
      var _this = this;
      function onComplete() {
        _this.dispatchEvent(eventName + "Complete", null, [items]);
      }
      var count = items.length;
      if (!items || !count) {
        onComplete();
        return;
      }
      var doneCount = 0;
      function tick() {
        doneCount++;
        if (doneCount == count) {
          onComplete();
        }
      }
      items.forEach(function(item) {
        item.once(eventName, tick);
      });
    };
    proto.dispatchEvent = function(type, event, args) {
      var emitArgs = event ? [event].concat(args) : args;
      this.emitEvent(type, emitArgs);
      if (jQuery) {
        this.$element = this.$element || jQuery(this.element);
        if (event) {
          var $event = jQuery.Event(event);
          $event.type = type;
          this.$element.trigger($event, args);
        } else {
          this.$element.trigger(type, args);
        }
      }
    };
    proto.ignore = function(elem) {
      var item = this.getItem(elem);
      if (item) {
        item.isIgnored = true;
      }
    };
    proto.unignore = function(elem) {
      var item = this.getItem(elem);
      if (item) {
        delete item.isIgnored;
      }
    };
    proto.stamp = function(elems) {
      elems = this._find(elems);
      if (!elems) {
        return;
      }
      this.stamps = this.stamps.concat(elems);
      elems.forEach(this.ignore, this);
    };
    proto.unstamp = function(elems) {
      elems = this._find(elems);
      if (!elems) {
        return;
      }
      elems.forEach(function(elem) {
        utils.removeFrom(this.stamps, elem);
        this.unignore(elem);
      }, this);
    };
    proto._find = function(elems) {
      if (!elems) {
        return;
      }
      if (typeof elems == "string") {
        elems = this.element.querySelectorAll(elems);
      }
      elems = utils.makeArray(elems);
      return elems;
    };
    proto._manageStamps = function() {
      if (!this.stamps || !this.stamps.length) {
        return;
      }
      this._getBoundingRect();
      this.stamps.forEach(this._manageStamp, this);
    };
    proto._getBoundingRect = function() {
      var boundingRect = this.element.getBoundingClientRect();
      var size = this.size;
      this._boundingRect = {
        left: boundingRect.left + size.paddingLeft + size.borderLeftWidth,
        top: boundingRect.top + size.paddingTop + size.borderTopWidth,
        right: boundingRect.right - (size.paddingRight + size.borderRightWidth),
        bottom: boundingRect.bottom - (size.paddingBottom + size.borderBottomWidth)
      };
    };
    proto._manageStamp = noop;
    proto._getElementOffset = function(elem) {
      var boundingRect = elem.getBoundingClientRect();
      var thisRect = this._boundingRect;
      var size = getSize(elem);
      var offset = {
        left: boundingRect.left - thisRect.left - size.marginLeft,
        top: boundingRect.top - thisRect.top - size.marginTop,
        right: thisRect.right - boundingRect.right - size.marginRight,
        bottom: thisRect.bottom - boundingRect.bottom - size.marginBottom
      };
      return offset;
    };
    proto.handleEvent = utils.handleEvent;
    proto.bindResize = function() {
      window2.addEventListener("resize", this);
      this.isResizeBound = true;
    };
    proto.unbindResize = function() {
      window2.removeEventListener("resize", this);
      this.isResizeBound = false;
    };
    proto.onresize = function() {
      this.resize();
    };
    utils.debounceMethod(Outlayer, "onresize", 100);
    proto.resize = function() {
      if (!this.isResizeBound || !this.needsResizeLayout()) {
        return;
      }
      this.layout();
    };
    proto.needsResizeLayout = function() {
      var size = getSize(this.element);
      var hasSizes = this.size && size;
      return hasSizes && size.innerWidth !== this.size.innerWidth;
    };
    proto.addItems = function(elems) {
      var items = this._itemize(elems);
      if (items.length) {
        this.items = this.items.concat(items);
      }
      return items;
    };
    proto.appended = function(elems) {
      var items = this.addItems(elems);
      if (!items.length) {
        return;
      }
      this.layoutItems(items, true);
      this.reveal(items);
    };
    proto.prepended = function(elems) {
      var items = this._itemize(elems);
      if (!items.length) {
        return;
      }
      var previousItems = this.items.slice(0);
      this.items = items.concat(previousItems);
      this._resetLayout();
      this._manageStamps();
      this.layoutItems(items, true);
      this.reveal(items);
      this.layoutItems(previousItems);
    };
    proto.reveal = function(items) {
      this._emitCompleteOnItems("reveal", items);
      if (!items || !items.length) {
        return;
      }
      var stagger = this.updateStagger();
      items.forEach(function(item, i) {
        item.stagger(i * stagger);
        item.reveal();
      });
    };
    proto.hide = function(items) {
      this._emitCompleteOnItems("hide", items);
      if (!items || !items.length) {
        return;
      }
      var stagger = this.updateStagger();
      items.forEach(function(item, i) {
        item.stagger(i * stagger);
        item.hide();
      });
    };
    proto.revealItemElements = function(elems) {
      var items = this.getItems(elems);
      this.reveal(items);
    };
    proto.hideItemElements = function(elems) {
      var items = this.getItems(elems);
      this.hide(items);
    };
    proto.getItem = function(elem) {
      for (var i = 0;i < this.items.length; i++) {
        var item = this.items[i];
        if (item.element == elem) {
          return item;
        }
      }
    };
    proto.getItems = function(elems) {
      elems = utils.makeArray(elems);
      var items = [];
      elems.forEach(function(elem) {
        var item = this.getItem(elem);
        if (item) {
          items.push(item);
        }
      }, this);
      return items;
    };
    proto.remove = function(elems) {
      var removeItems = this.getItems(elems);
      this._emitCompleteOnItems("remove", removeItems);
      if (!removeItems || !removeItems.length) {
        return;
      }
      removeItems.forEach(function(item) {
        item.remove();
        utils.removeFrom(this.items, item);
      }, this);
    };
    proto.destroy = function() {
      var style = this.element.style;
      style.height = "";
      style.position = "";
      style.width = "";
      this.items.forEach(function(item) {
        item.destroy();
      });
      this.unbindResize();
      var id = this.element.outlayerGUID;
      delete instances[id];
      delete this.element.outlayerGUID;
      if (jQuery) {
        jQuery.removeData(this.element, this.constructor.namespace);
      }
    };
    Outlayer.data = function(elem) {
      elem = utils.getQueryElement(elem);
      var id = elem && elem.outlayerGUID;
      return id && instances[id];
    };
    Outlayer.create = function(namespace, options) {
      var Layout = subclass(Outlayer);
      Layout.defaults = utils.extend({}, Outlayer.defaults);
      utils.extend(Layout.defaults, options);
      Layout.compatOptions = utils.extend({}, Outlayer.compatOptions);
      Layout.namespace = namespace;
      Layout.data = Outlayer.data;
      Layout.Item = subclass(Item);
      utils.htmlInit(Layout, namespace);
      if (jQuery && jQuery.bridget) {
        jQuery.bridget(namespace, Layout);
      }
      return Layout;
    };
    function subclass(Parent) {
      function SubClass() {
        Parent.apply(this, arguments);
      }
      SubClass.prototype = Object.create(Parent.prototype);
      SubClass.prototype.constructor = SubClass;
      return SubClass;
    }
    var msUnits = {
      ms: 1,
      s: 1000
    };
    function getMilliseconds(time) {
      if (typeof time == "number") {
        return time;
      }
      var matches = time.match(/(^\d*\.?\d*)(\w*)/);
      var num = matches && matches[1];
      var unit = matches && matches[2];
      if (!num.length) {
        return 0;
      }
      num = parseFloat(num);
      var mult = msUnits[unit] || 1;
      return num * mult;
    }
    Outlayer.Item = Item;
    return Outlayer;
  });
});

// ../node_modules/masonry-layout/masonry.js
var require_masonry = __commonJS((exports, module) => {
  /*!
   * Masonry v4.2.2
   * Cascading grid layout library
   * https://masonry.desandro.com
   * MIT License
   * by David DeSandro
   */
  (function(window2, factory) {
    if (typeof define == "function" && define.amd) {
      define([
        "outlayer/outlayer",
        "get-size/get-size"
      ], factory);
    } else if (typeof module == "object" && module.exports) {
      module.exports = factory(require_outlayer(), require_get_size());
    } else {
      window2.Masonry = factory(window2.Outlayer, window2.getSize);
    }
  })(window, function factory(Outlayer, getSize) {
    var Masonry = Outlayer.create("masonry");
    Masonry.compatOptions.fitWidth = "isFitWidth";
    var proto = Masonry.prototype;
    proto._resetLayout = function() {
      this.getSize();
      this._getMeasurement("columnWidth", "outerWidth");
      this._getMeasurement("gutter", "outerWidth");
      this.measureColumns();
      this.colYs = [];
      for (var i = 0;i < this.cols; i++) {
        this.colYs.push(0);
      }
      this.maxY = 0;
      this.horizontalColIndex = 0;
    };
    proto.measureColumns = function() {
      this.getContainerWidth();
      if (!this.columnWidth) {
        var firstItem = this.items[0];
        var firstItemElem = firstItem && firstItem.element;
        this.columnWidth = firstItemElem && getSize(firstItemElem).outerWidth || this.containerWidth;
      }
      var columnWidth = this.columnWidth += this.gutter;
      var containerWidth = this.containerWidth + this.gutter;
      var cols = containerWidth / columnWidth;
      var excess = columnWidth - containerWidth % columnWidth;
      var mathMethod = excess && excess < 1 ? "round" : "floor";
      cols = Math[mathMethod](cols);
      this.cols = Math.max(cols, 1);
    };
    proto.getContainerWidth = function() {
      var isFitWidth = this._getOption("fitWidth");
      var container = isFitWidth ? this.element.parentNode : this.element;
      var size = getSize(container);
      this.containerWidth = size && size.innerWidth;
    };
    proto._getItemLayoutPosition = function(item) {
      item.getSize();
      var remainder = item.size.outerWidth % this.columnWidth;
      var mathMethod = remainder && remainder < 1 ? "round" : "ceil";
      var colSpan = Math[mathMethod](item.size.outerWidth / this.columnWidth);
      colSpan = Math.min(colSpan, this.cols);
      var colPosMethod = this.options.horizontalOrder ? "_getHorizontalColPosition" : "_getTopColPosition";
      var colPosition = this[colPosMethod](colSpan, item);
      var position = {
        x: this.columnWidth * colPosition.col,
        y: colPosition.y
      };
      var setHeight = colPosition.y + item.size.outerHeight;
      var setMax = colSpan + colPosition.col;
      for (var i = colPosition.col;i < setMax; i++) {
        this.colYs[i] = setHeight;
      }
      return position;
    };
    proto._getTopColPosition = function(colSpan) {
      var colGroup = this._getTopColGroup(colSpan);
      var minimumY = Math.min.apply(Math, colGroup);
      return {
        col: colGroup.indexOf(minimumY),
        y: minimumY
      };
    };
    proto._getTopColGroup = function(colSpan) {
      if (colSpan < 2) {
        return this.colYs;
      }
      var colGroup = [];
      var groupCount = this.cols + 1 - colSpan;
      for (var i = 0;i < groupCount; i++) {
        colGroup[i] = this._getColGroupY(i, colSpan);
      }
      return colGroup;
    };
    proto._getColGroupY = function(col, colSpan) {
      if (colSpan < 2) {
        return this.colYs[col];
      }
      var groupColYs = this.colYs.slice(col, col + colSpan);
      return Math.max.apply(Math, groupColYs);
    };
    proto._getHorizontalColPosition = function(colSpan, item) {
      var col = this.horizontalColIndex % this.cols;
      var isOver = colSpan > 1 && col + colSpan > this.cols;
      col = isOver ? 0 : col;
      var hasSize = item.size.outerWidth && item.size.outerHeight;
      this.horizontalColIndex = hasSize ? col + colSpan : this.horizontalColIndex;
      return {
        col,
        y: this._getColGroupY(col, colSpan)
      };
    };
    proto._manageStamp = function(stamp) {
      var stampSize = getSize(stamp);
      var offset = this._getElementOffset(stamp);
      var isOriginLeft = this._getOption("originLeft");
      var firstX = isOriginLeft ? offset.left : offset.right;
      var lastX = firstX + stampSize.outerWidth;
      var firstCol = Math.floor(firstX / this.columnWidth);
      firstCol = Math.max(0, firstCol);
      var lastCol = Math.floor(lastX / this.columnWidth);
      lastCol -= lastX % this.columnWidth ? 0 : 1;
      lastCol = Math.min(this.cols - 1, lastCol);
      var isOriginTop = this._getOption("originTop");
      var stampMaxY = (isOriginTop ? offset.top : offset.bottom) + stampSize.outerHeight;
      for (var i = firstCol;i <= lastCol; i++) {
        this.colYs[i] = Math.max(stampMaxY, this.colYs[i]);
      }
    };
    proto._getContainerSize = function() {
      this.maxY = Math.max.apply(Math, this.colYs);
      var size = {
        height: this.maxY
      };
      if (this._getOption("fitWidth")) {
        size.width = this._getContainerFitWidth();
      }
      return size;
    };
    proto._getContainerFitWidth = function() {
      var unusedCols = 0;
      var i = this.cols;
      while (--i) {
        if (this.colYs[i] !== 0) {
          break;
        }
        unusedCols++;
      }
      return (this.cols - unusedCols) * this.columnWidth - this.gutter;
    };
    proto.needsResizeLayout = function() {
      var previousWidth = this.containerWidth;
      this.getContainerWidth();
      return previousWidth != this.containerWidth;
    };
    return Masonry;
  });
});

// ../node_modules/@qzda/prolog/dist/index.js
var Colors = {
  black: 30,
  red: 31,
  green: 32,
  yellow: 33,
  blue: 34,
  magenta: 35,
  cyan: 36,
  white: 37,
  brightBlack: 90,
  brightRed: 91,
  brightGreen: 92,
  brightYellow: 93,
  brightBlue: 94,
  brightMagenta: 95,
  brightCyan: 96,
  brightWhite: 97
};
var Backgrounds = {
  bgBlack: 40,
  bgRed: 41,
  bgGreen: 42,
  bgYellow: 43,
  bgBlue: 44,
  bgMagenta: 45,
  bgCyan: 46,
  bgWhite: 47,
  bgBrightBlack: 100,
  bgBrightRed: 101,
  bgBrightGreen: 102,
  bgBrightYellow: 103,
  bgBrightBlue: 104,
  bgBrightMagenta: 105,
  bgBrightCyan: 106,
  bgBrightWhite: 107
};
var OtherStyles = {
  bold: 1,
  italic: 3,
  underline: 4
};
var Obj = Object.assign(Object.assign(Object.assign({}, Object.keys(Colors).reduce((_obj, color) => {
  _obj[color] = (str) => `\x1B[${Colors[color]}m${str}\x1B[0m`;
  return _obj;
}, {})), Object.keys(Backgrounds).reduce((_obj, bg) => {
  _obj[bg] = (str) => `\x1B[${Backgrounds[bg]}m${str}\x1B[0m`;
  return _obj;
}, {})), Object.keys(OtherStyles).reduce((_obj, style) => {
  _obj[style] = (str) => `\x1B[${OtherStyles[style]}m${str}\x1B[0m`;
  return _obj;
}, {}));
var dist_default = Obj;

// ../package.json
var name = "okjike-ui";
var version = "0.0.4";

// ../utils/dev.ts
var isDev = false;

// ../utils/log.ts
function log(...arg) {
  console.log(dist_default.bgBlack(dist_default.brightYellow(`${name} ${version}`)), ...arg);
}
function logError(...arg) {
  console.log(dist_default.bgRed(`${name} ${version}`), ...arg);
}
function devLog(...arg) {
  if (isDev) {
    log(...arg);
  }
}
function devLogError(...arg) {
  if (isDev) {
    logError(...arg);
  }
}

// ../Selectors.ts
var mainWrapper = `#__next > div > div`;
var navBar = `${mainWrapper} > div`;
var mainColumn = `${mainWrapper} > div:nth-child(2) > div`;
var sideBar = `${mainWrapper} > div:nth-child(2) > aside`;
var posts = `${mainColumn} > div:last-child > div`;
var selectors = {
  mainWrapper,
  navBar: `${mainWrapper} > div`,
  navBarItems: {
    links: `${navBar} > div > div`,
    linksItem: {
      logo: `${navBar} > div > div > a:nth-child(1)`,
      home: `${navBar} > div > div > a:nth-child(2)`,
      recommend: `${navBar} > div > div > a:nth-child(3)`
    },
    searchWrapper: `${navBar} > div > div:nth-child(2)`,
    searchWrapperInput: `${navBar} > div > div:nth-child(2) > input`
  },
  mainColumn: `${mainWrapper} > div:nth-child(2) > div`,
  mainColumnItems: {
    newPost: `${mainColumn} > div:has(textarea[placeholder="\u5206\u4EAB\u4F60\u7684\u60F3\u6CD5..."])`,
    newMessage: `${mainColumn} > div[class*="NewMessageNoti"]`,
    posts,
    postAction: `${posts} > div article > div:nth-child(2) > div:last-child > div:last-child`
  },
  sideBar,
  sideBarItems: {
    userInfo: `${sideBar} > div`,
    groupInfo: `${sideBar} > div:nth-child(2)`,
    footer: `${sideBar} > footer`
  }
};
var Selectors_default = selectors;

// ../utils/element.ts
function removeElementById(id) {
  document.getElementById(id)?.remove();
}
function hiddenBody(hidden) {
  if (hidden) {
    addStyles("body", "body { opacity: 0; };");
  } else {
    removeStyles("body");
  }
  devLog("hiddenBody", hidden);
}

// ../utils/newPost.ts
function hiddenNewPost(hidden) {
  if (hidden) {
    addStyles("hiddenNewPost", `${Selectors_default.mainColumnItems.newPost} { display: none; }`);
  } else {
    removeStyles("hiddenNewPost");
  }
  devLog("hiddenNewPost", hidden);
}

// ../utils/sidebar.ts
function hiddenSidebar(hidden) {
  if (hidden) {
    addStyles("hiddenSidebar", `
      ${Selectors_default.sideBar} {
        display: none;
      }
      ${Selectors_default.sideBar} > div {
        margin: 0;
        border-radius: 10px;
        overflow: hidden;
        box-shadow:
          4px 8px 8px rgba(128, 128, 128, 0.5);
      }
      ${Selectors_default.sideBar} > footer {
        display: none;
      }
      `);
  } else {
    addStyles("hiddenSidebar", `
      ${Selectors_default.sideBar} {
        display: none;
      }
      `);
  }
  devLog("hiddenSidebar", hidden);
}

// ../utils/style.ts
function addStyles(id, css) {
  const styleID = "okjike-ui-" + id;
  const oldStyle = document.getElementById(styleID);
  const head = document.querySelector("head");
  if (oldStyle) {
    if (oldStyle.textContent !== css) {
      oldStyle.textContent = css;
    }
    return oldStyle;
  } else {
    const style = document.createElement("style");
    style.id = styleID;
    style.textContent = css;
    head?.appendChild(style);
    return style;
  }
}
function removeStyles(id) {
  const styleID = "okjike-ui-" + id;
  removeElementById(styleID);
}
function changeStyles(pathname) {
  const b = isTimelineUrl(pathname);
  changeTimelineStyle(b);
  hiddenNewPost(b);
  hiddenSidebar(b);
}

// ../utils/timeline.ts
var import_masonry_layout = __toESM(require_masonry(), 1);
function isTimelineUrl(url) {
  return url === "/" || url === "/recommend";
}
function changeTimelineStyle(open) {
  devLog("changeTimelineStyle start");
  if (open) {
    const navBarWidth = document.querySelector(`${Selectors_default.navBar} > div`)?.getBoundingClientRect().width;
    const postWidth = navBarWidth ? navBarWidth / (navBarWidth / PostMinWidth >> 0) : PostMinWidth;
    devLog("navBarWidth", navBarWidth);
    devLog("postWidth", postWidth);
    const style = addStyles("timelineStyle", `
        ${Selectors_default.mainColumn} {
          min-width: 600px;
          max-width: 100%;
          padding: 0px 160px;
        }
        @media (max-width: 1536px) {
          ${Selectors_default.mainColumn} { padding: 0px 48px; }
        }
        @media (max-width: 1280px) {
          ${Selectors_default.mainColumn} { padding: 0px 32px; }
        }
        @media (max-width: 1024px) {
          ${Selectors_default.mainColumn} { padding: 0px 16px; }
        }

        ${Selectors_default.mainColumnItems.posts} > div {
          height: fit-content;
          min-width: ${PostMinWidth}px;
          width: ${postWidth}px;
        }
        ${Selectors_default.mainColumnItems.posts} > div > div {
          border-color: transparent;
          border-top-width: 10px;
          border-left-width: 5px;
          border-right-width: 5px;
        }

        /* \u5E16\u5B50\u8BC4\u8BBA\u76F4\u63A5\u9690\u85CF\u5427\uFF0C\u5F39\u51FA\u6837\u5F0F\u6CA1\u60F3\u597D */
        ${Selectors_default.mainColumnItems.posts} > div article + div {
          display: none;
          /*
            z-index: 100;
            width: 500px;
            position: fixed;
            left: 50vw;
            top: 66px;
            transform: translateX(-50%);
            box-shadow:
              10px 0px 1000px 1000px rgba(0, 0, 0, 0.5),
              0px 10px 1000px 1000px rgba(0, 0, 0, 0.5);
          */
        }
        /* body:has(${Selectors_default.mainColumnItems.posts} > div article + div) { overflow-y: hidden; } */
        ${Selectors_default.mainColumnItems.posts} > div article [class*="AudioContent___StyledFlex"] { width: 100%; }

        /* \u5E16\u5B50\u5BBD\u5EA6\u8FC7\u5C0F\u65F6\u5E16\u5B50\u7684\u64CD\u4F5C\u680F\u4F1A\u6EA2\u51FA */
        ${Selectors_default.mainColumnItems.postAction} { justify-content: space-between; }
        ${Selectors_default.mainColumnItems.postAction} > div { min-width: unset; }
        ${Selectors_default.mainColumnItems.postAction} > div.flex-1 { flex: 0; }

        ${Selectors_default.mainColumnItems.posts} > div article > div:nth-child(2) > div:nth-child(2),
        ${Selectors_default.mainColumnItems.posts} > div article > div:nth-child(2) > div:nth-child(3) {
          margin-left: calc(-1rem - 40px);
        }

        ${Selectors_default.mainColumnItems.newMessage} {
          padding: 0 5px;
          border: none;
        }
        `);
    devLog("style", style);
  } else {
    removeStyles("timelineStyle");
  }
  devLog("changeTimelineStyle", open);
  devLog("changeTimelineStyle done");
}
function updatePostLocation() {
  devLog("updatePostLocation start");
  const homeLink = document.querySelector(Selectors_default.navBarItems.linksItem.home);
  if (homeLink) {
    const navBar2 = document.querySelector(`${Selectors_default.navBar} > div`);
    const navBarWidth = navBar2?.getBoundingClientRect().width;
    const postWidth = navBarWidth / (navBarWidth / PostMinWidth >> 0);
    const cols = navBarWidth / postWidth;
    devLog("navBarWidth", navBarWidth);
    devLog("postWidth", postWidth);
    devLog("cols", cols);
    const masonry = new import_masonry_layout.default(Selectors_default.mainColumnItems.posts, {
      columnWidth: postWidth,
      itemSelector: `${Selectors_default.mainColumnItems.posts} > div`,
      transitionDuration: 0
    });
    devLog("masonry", masonry);
  } else {
    devLogError("updatePostLocation can not found homeLink", homeLink);
  }
  devLog("updatePostLocation done");
}
function observerPosts() {
  devLog("observerPosts start");
  const postsContainer = document.querySelector(Selectors_default.mainColumnItems.posts);
  const homeLink = document.querySelector(Selectors_default.navBarItems.linksItem.home);
  devLog("homeLink", homeLink);
  if (postsContainer && homeLink) {
    updatePostLocation();
    new MutationObserver((recordList) => {
      updatePostLocation();
    }).observe(postsContainer, {
      childList: true
    });
    devLog("observerPosts", true);
    devLog("observerPosts done");
    return true;
  }
  devLog("observerPosts", false);
  devLog("observerPosts done");
  return false;
}
function hiddenTimeline(hidden) {
  if (hidden) {
    addStyles("hiddenTimeline", `${Selectors_default.mainColumn} { opacity: 0; };`);
  } else {
    removeStyles("hiddenTimeline");
  }
  devLog("hiddenTimeline", hidden);
}
var PostMinWidth = 400;

// initMenuCommand.ts
function initMenuCommand() {
  GM_registerMenuCommand("\u663E\u793A/\u9690\u85CF\u4FA7\u8FB9\u680F", function(event) {
    alert("\uD83D\uDEA7\u65BD\u5DE5\u4E2D");
  }, {
    autoClose: false
  });
  devLog("initMenuCommand");
}

// index.ts
log();
initMenuCommand();
hiddenBody(true);
window.addEventListener("load", (event) => {
  devLog("window load");
  if (isTimelineUrl(location.pathname)) {
    hiddenSidebar(true);
    hiddenNewPost(true);
    changeTimelineStyle(true);
    const interval = setInterval(() => {
      if (observerPosts()) {
        clearInterval(interval);
        hiddenBody(false);
      }
    }, 200);
  } else {
    changeTimelineStyle(false);
    hiddenBody(false);
  }
  window.addEventListener("urlchange", (info) => {
    devLog("urlchange", info);
    const url = new URL(info.url);
    changeStyles(url.pathname);
    const interval = setInterval(() => {
      if (isTimelineUrl(url.pathname)) {
        hiddenTimeline(true);
        if (observerPosts()) {
          hiddenTimeline(false);
          clearInterval(interval);
        }
      } else {
        clearInterval(interval);
      }
    }, 200);
  });
});
