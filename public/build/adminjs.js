(self["webpackChunk"] = self["webpackChunk"] || []).push([["adminjs"],{

/***/ "./assets/admin.js":
/*!*************************!*\
  !*** ./assets/admin.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.array.find.js */ "./node_modules/core-js/modules/es.array.find.js");
/* harmony import */ var core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lib_htmldiff__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lib/htmldiff */ "./assets/lib/htmldiff.js");
/* harmony import */ var _lib_htmldiff__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_lib_htmldiff__WEBPACK_IMPORTED_MODULE_1__);
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");

// const Diff2Html = require('diff2html');

$.each($('.git-diff'), function (key, item) {
  item = $(item);
  var originalHTML = item.find('.current').html();
  var newHTML = item.find('.final').html();
  var output = _lib_htmldiff__WEBPACK_IMPORTED_MODULE_1___default()(originalHTML, newHTML);
  item.find('.final').html(output);
}); // let originalHTML = $('.current').html();
// let newHTML = $('.final').html();
//
// let output = htmldiff(originalHTML, newHTML);
//
// $('.final').html(output)
//
//
// let originalHTMLExif = $('.current-exif').html();
// let newHTMLExif = $('.final-exif').html();
//
// let outputExif = htmldiff(originalHTMLExif, newHTMLExif);
//
// $('.final-exif').html(outputExif)

/***/ }),

/***/ "./assets/lib/htmldiff.js":
/*!********************************!*\
  !*** ./assets/lib/htmldiff.js ***!
  \********************************/
/***/ ((module, exports, __webpack_require__) => {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;__webpack_require__(/*! core-js/modules/es.array.index-of.js */ "./node_modules/core-js/modules/es.array.index-of.js");

__webpack_require__(/*! core-js/modules/es.date.to-string.js */ "./node_modules/core-js/modules/es.date.to-string.js");

__webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");

__webpack_require__(/*! core-js/modules/es.regexp.to-string.js */ "./node_modules/core-js/modules/es.regexp.to-string.js");

__webpack_require__(/*! core-js/modules/es.array.slice.js */ "./node_modules/core-js/modules/es.array.slice.js");

__webpack_require__(/*! core-js/modules/es.array.join.js */ "./node_modules/core-js/modules/es.array.join.js");

__webpack_require__(/*! core-js/modules/es.regexp.exec.js */ "./node_modules/core-js/modules/es.regexp.exec.js");

__webpack_require__(/*! core-js/modules/es.string.replace.js */ "./node_modules/core-js/modules/es.string.replace.js");

/**
 * htmldiff.js a diff algorithm that understands HTML, and produces HTML in the browser.
 *
 * @author https://github.com/tnwinc
 * @see https://github.com/tnwinc/htmldiff.js
 */
!function () {
  var e, n, t, r, i, f, _, a, o, s, u, h, l, c, _d, b, p;

  o = function o(e) {
    return ">" === e;
  }, s = function s(e) {
    return "<" === e;
  }, h = function h(e) {
    return /^\s+$/.test(e);
  }, u = function u(e) {
    return /^\s*<[^>]+>\s*$/.test(e);
  }, l = function l(e) {
    return !u(e);
  }, e = function () {
    return function (e, n, t) {
      this.start_in_before = e, this.start_in_after = n, this.length = t, this.end_in_before = this.start_in_before + this.length - 1, this.end_in_after = this.start_in_after + this.length - 1;
    };
  }(), a = function a(e) {
    var n, t, r, i, f, _;

    for (f = "char", t = "", _ = [], r = 0, i = e.length; r < i; r++) {
      switch (n = e[r], f) {
        case "tag":
          o(n) ? (t += ">", _.push(t), t = "", f = h(n) ? "whitespace" : "char") : t += n;
          break;

        case "char":
          s(n) ? (t && _.push(t), t = "<", f = "tag") : /\s/.test(n) ? (t && _.push(t), t = n, f = "whitespace") : /[\w\#@]+/i.test(n) ? t += n : (t && _.push(t), t = n);
          break;

        case "whitespace":
          s(n) ? (t && _.push(t), t = "<", f = "tag") : h(n) ? t += n : (t && _.push(t), t = n, f = "char");
          break;

        default:
          throw new Error("Unknown mode " + f);
      }
    }

    return t && _.push(t), _;
  }, f = function f(n, t, r, i, _f, _, a) {
    var o, s, u, h, l, c, d, b, p, g, w, v, k, m, y;

    for (s = i, o = _, u = 0, w = {}, c = h = m = i, y = _f; m <= y ? h < y : h > y; c = m <= y ? ++h : --h) {
      for (k = {}, d = 0, b = (p = r[n[c]]).length; d < b; d++) {
        if (!((l = p[d]) < _)) {
          if (l >= a) break;
          null == w[l - 1] && (w[l - 1] = 0), v = w[l - 1] + 1, k[l] = v, v > u && (s = c - v + 1, o = l - v + 1, u = v);
        }
      }

      w = k;
    }

    return 0 !== u && (g = new e(s, o, u)), g;
  }, _d = function d(e, n, t, r, i, _, a, o) {
    var s;
    return null != (s = f(e, 0, t, r, i, _, a)) && (r < s.start_in_before && _ < s.start_in_after && _d(e, n, t, r, s.start_in_before, _, s.start_in_after, o), o.push(s), s.end_in_before <= i && s.end_in_after <= a && _d(e, n, t, s.end_in_before + 1, i, s.end_in_after + 1, a, o)), o;
  }, r = function r(e) {
    var n, t, r, i, f, _;

    if (null == e.find_these) throw new Error("params must have find_these key");
    if (null == e.in_these) throw new Error("params must have in_these key");

    for (r = {}, n = 0, i = (f = e.find_these).length; n < i; n++) {
      for (r[_ = f[n]] = [], t = e.in_these.indexOf(_); -1 !== t;) {
        r[_].push(t), t = e.in_these.indexOf(_, t + 1);
      }
    }

    return r;
  }, _ = function _(e, n) {
    var t, i;
    return i = [], t = r({
      find_these: e,
      in_these: n
    }), _d(e, n, t, 0, e.length, 0, n.length, i);
  }, n = function n(_n, t) {
    var r, i, f, a, o, s, u, h, l, c, d, b, p, g, w, v;
    if (null == _n) throw new Error("before_tokens?");
    if (null == t) throw new Error("after_tokens?");

    for (w = g = 0, p = [], r = {
      "false,false": "replace",
      "true,false": "insert",
      "false,true": "delete",
      "true,true": "none"
    }, (d = _(_n, t)).push(new e(_n.length, t.length, 0)), a = f = 0, h = d.length; f < h; a = ++f) {
      "none" !== (i = r[[w === (c = d[a]).start_in_before, g === c.start_in_after].toString()]) && p.push({
        action: i,
        start_in_before: w,
        end_in_before: "insert" !== i ? c.start_in_before - 1 : void 0,
        start_in_after: g,
        end_in_after: "delete" !== i ? c.start_in_after - 1 : void 0
      }), 0 !== c.length && p.push({
        action: "equal",
        start_in_before: c.start_in_before,
        end_in_before: c.end_in_before,
        start_in_after: c.start_in_after,
        end_in_after: c.end_in_after
      }), w = c.end_in_before + 1, g = c.end_in_after + 1;
    }

    for (v = [], u = {
      action: "none"
    }, o = function o(e) {
      return "equal" === e.action && e.end_in_before - e.start_in_before == 0 && /^\s$/.test(_n.slice(e.start_in_before, +e.end_in_before + 1 || 9e9));
    }, s = 0, l = p.length; s < l; s++) {
      o(b = p[s]) && "replace" === u.action || "replace" === b.action && "replace" === u.action ? (u.end_in_before = b.end_in_before, u.end_in_after = b.end_in_after) : (v.push(b), u = b);
    }

    return v;
  }, t = function t(e, n, _t) {
    var r, i, f, _, a, o;

    for (_ = void 0, f = i = 0, a = (n = n.slice(e, +n.length + 1 || 9e9)).length; i < a && (o = n[f], !0 === (r = _t(o)) && (_ = f), !1 !== r); f = ++i) {
      ;
    }

    return null != _ ? n.slice(0, +_ + 1 || 9e9) : [];
  }, p = function p(e, n) {
    var r, i, f, _, a;

    for (_ = "", f = 0, r = n.length;;) {
      if (f >= r) break;
      if (i = t(f, n, l), f += i.length, 0 !== i.length && (_ += "<" + e + ">" + i.join("") + "</" + e + ">"), f >= r) break;
      f += (a = t(f, n, u)).length, _ += a.join("");
    }

    return _;
  }, (c = {
    equal: function equal(e, n, t) {
      return n.slice(e.start_in_before, +e.end_in_before + 1 || 9e9).join("");
    },
    insert: function insert(e, n, t) {
      var r;
      return r = t.slice(e.start_in_after, +e.end_in_after + 1 || 9e9), p("ins", r);
    },
    "delete": function _delete(e, n, t) {
      var r;
      return r = n.slice(e.start_in_before, +e.end_in_before + 1 || 9e9), p("del", r);
    }
  }).replace = function (e, n, t) {
    return c["delete"](e, n, t) + c.insert(e, n, t);
  }, b = function b(e, n, t) {
    var r, i, f, _;

    for (_ = "", r = 0, i = t.length; r < i; r++) {
      f = t[r], _ += c[f.action](f, e, n);
    }

    return _;
  }, (i = function i(e, t) {
    var r;
    return e === t ? e : (e = a(e), t = a(t), r = n(e, t), b(e, t, r));
  }).html_to_tokens = a, i.find_matching_blocks = _, _.find_match = f, _.create_index = r, i.calculate_operations = n, i.render_operations = b,  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
    return i;
  }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : 0;
}();

/***/ }),

/***/ "./node_modules/core-js/internals/array-method-has-species-support.js":
/*!****************************************************************************!*\
  !*** ./node_modules/core-js/internals/array-method-has-species-support.js ***!
  \****************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js");
var V8_VERSION = __webpack_require__(/*! ../internals/engine-v8-version */ "./node_modules/core-js/internals/engine-v8-version.js");

var SPECIES = wellKnownSymbol('species');

module.exports = function (METHOD_NAME) {
  // We can't use this feature detection in V8 since it causes
  // deoptimization and serious performance degradation
  // https://github.com/zloirock/core-js/issues/677
  return V8_VERSION >= 51 || !fails(function () {
    var array = [];
    var constructor = array.constructor = {};
    constructor[SPECIES] = function () {
      return { foo: 1 };
    };
    return array[METHOD_NAME](Boolean).foo !== 1;
  });
};


/***/ }),

/***/ "./node_modules/core-js/internals/create-property.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/internals/create-property.js ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var toPropertyKey = __webpack_require__(/*! ../internals/to-property-key */ "./node_modules/core-js/internals/to-property-key.js");
var definePropertyModule = __webpack_require__(/*! ../internals/object-define-property */ "./node_modules/core-js/internals/object-define-property.js");
var createPropertyDescriptor = __webpack_require__(/*! ../internals/create-property-descriptor */ "./node_modules/core-js/internals/create-property-descriptor.js");

module.exports = function (object, key, value) {
  var propertyKey = toPropertyKey(key);
  if (propertyKey in object) definePropertyModule.f(object, propertyKey, createPropertyDescriptor(0, value));
  else object[propertyKey] = value;
};


/***/ }),

/***/ "./node_modules/core-js/modules/es.array.slice.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es.array.slice.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
var isArray = __webpack_require__(/*! ../internals/is-array */ "./node_modules/core-js/internals/is-array.js");
var isConstructor = __webpack_require__(/*! ../internals/is-constructor */ "./node_modules/core-js/internals/is-constructor.js");
var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js/internals/is-object.js");
var toAbsoluteIndex = __webpack_require__(/*! ../internals/to-absolute-index */ "./node_modules/core-js/internals/to-absolute-index.js");
var lengthOfArrayLike = __webpack_require__(/*! ../internals/length-of-array-like */ "./node_modules/core-js/internals/length-of-array-like.js");
var toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ "./node_modules/core-js/internals/to-indexed-object.js");
var createProperty = __webpack_require__(/*! ../internals/create-property */ "./node_modules/core-js/internals/create-property.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js");
var arrayMethodHasSpeciesSupport = __webpack_require__(/*! ../internals/array-method-has-species-support */ "./node_modules/core-js/internals/array-method-has-species-support.js");

var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('slice');

var SPECIES = wellKnownSymbol('species');
var nativeSlice = [].slice;
var max = Math.max;

// `Array.prototype.slice` method
// https://tc39.es/ecma262/#sec-array.prototype.slice
// fallback for not array-like ES3 strings and DOM objects
$({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT }, {
  slice: function slice(start, end) {
    var O = toIndexedObject(this);
    var length = lengthOfArrayLike(O);
    var k = toAbsoluteIndex(start, length);
    var fin = toAbsoluteIndex(end === undefined ? length : end, length);
    // inline `ArraySpeciesCreate` for usage native `Array#slice` where it's possible
    var Constructor, result, n;
    if (isArray(O)) {
      Constructor = O.constructor;
      // cross-realm fallback
      if (isConstructor(Constructor) && (Constructor === Array || isArray(Constructor.prototype))) {
        Constructor = undefined;
      } else if (isObject(Constructor)) {
        Constructor = Constructor[SPECIES];
        if (Constructor === null) Constructor = undefined;
      }
      if (Constructor === Array || Constructor === undefined) {
        return nativeSlice.call(O, k, fin);
      }
    }
    result = new (Constructor === undefined ? Array : Constructor)(max(fin - k, 0));
    for (n = 0; k < fin; k++, n++) if (k in O) createProperty(result, n, O[k]);
    result.length = n;
    return result;
  }
});


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendors-node_modules_jquery_dist_jquery_js","vendors-node_modules_core-js_internals_array-iteration_js-node_modules_core-js_internals_export_js","vendors-node_modules_core-js_modules_es_array_find_js-node_modules_core-js_modules_es_array_i-550953"], () => (__webpack_exec__("./assets/admin.js")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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aEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsU0FBUztBQUN6QjtBQUNBO0FBQ0E7QUFDQSxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2FkbWluLmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9saWIvaHRtbGRpZmYuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2FycmF5LW1ldGhvZC1oYXMtc3BlY2llcy1zdXBwb3J0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9jcmVhdGUtcHJvcGVydHkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lcy5hcnJheS5zbGljZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBjb25zdCBEaWZmMkh0bWwgPSByZXF1aXJlKCdkaWZmMmh0bWwnKTtcbmltcG9ydCBodG1sZGlmZiBmcm9tICcuL2xpYi9odG1sZGlmZic7XG5cbiQuZWFjaCgkKCcuZ2l0LWRpZmYnKSwgZnVuY3Rpb24gKGtleSwgaXRlbSkge1xuICAgIGl0ZW0gPSAkKGl0ZW0pO1xuICAgIGxldCBvcmlnaW5hbEhUTUwgPSBpdGVtLmZpbmQoJy5jdXJyZW50JykuaHRtbCgpO1xuICAgIGxldCBuZXdIVE1MID0gaXRlbS5maW5kKCcuZmluYWwnKS5odG1sKCk7XG5cbiAgICBsZXQgb3V0cHV0ID0gaHRtbGRpZmYob3JpZ2luYWxIVE1MLCBuZXdIVE1MKTtcblxuICAgIGl0ZW0uZmluZCgnLmZpbmFsJykuaHRtbChvdXRwdXQpXG59KVxuXG4vLyBsZXQgb3JpZ2luYWxIVE1MID0gJCgnLmN1cnJlbnQnKS5odG1sKCk7XG4vLyBsZXQgbmV3SFRNTCA9ICQoJy5maW5hbCcpLmh0bWwoKTtcbi8vXG4vLyBsZXQgb3V0cHV0ID0gaHRtbGRpZmYob3JpZ2luYWxIVE1MLCBuZXdIVE1MKTtcbi8vXG4vLyAkKCcuZmluYWwnKS5odG1sKG91dHB1dClcbi8vXG4vL1xuLy8gbGV0IG9yaWdpbmFsSFRNTEV4aWYgPSAkKCcuY3VycmVudC1leGlmJykuaHRtbCgpO1xuLy8gbGV0IG5ld0hUTUxFeGlmID0gJCgnLmZpbmFsLWV4aWYnKS5odG1sKCk7XG4vL1xuLy8gbGV0IG91dHB1dEV4aWYgPSBodG1sZGlmZihvcmlnaW5hbEhUTUxFeGlmLCBuZXdIVE1MRXhpZik7XG4vL1xuLy8gJCgnLmZpbmFsLWV4aWYnKS5odG1sKG91dHB1dEV4aWYpIiwiLyoqXG4gKiBodG1sZGlmZi5qcyBhIGRpZmYgYWxnb3JpdGhtIHRoYXQgdW5kZXJzdGFuZHMgSFRNTCwgYW5kIHByb2R1Y2VzIEhUTUwgaW4gdGhlIGJyb3dzZXIuXG4gKlxuICogQGF1dGhvciBodHRwczovL2dpdGh1Yi5jb20vdG53aW5jXG4gKiBAc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS90bndpbmMvaHRtbGRpZmYuanNcbiAqL1xuIWZ1bmN0aW9uKCl7dmFyIGUsbix0LHIsaSxmLF8sYSxvLHMsdSxoLGwsYyxkLGIscDtvPWZ1bmN0aW9uKGUpe3JldHVyblwiPlwiPT09ZX0scz1mdW5jdGlvbihlKXtyZXR1cm5cIjxcIj09PWV9LGg9ZnVuY3Rpb24oZSl7cmV0dXJuL15cXHMrJC8udGVzdChlKX0sdT1mdW5jdGlvbihlKXtyZXR1cm4vXlxccyo8W14+XSs+XFxzKiQvLnRlc3QoZSl9LGw9ZnVuY3Rpb24oZSl7cmV0dXJuIXUoZSl9LGU9ZnVuY3Rpb24oKXtyZXR1cm4gZnVuY3Rpb24oZSxuLHQpe3RoaXMuc3RhcnRfaW5fYmVmb3JlPWUsdGhpcy5zdGFydF9pbl9hZnRlcj1uLHRoaXMubGVuZ3RoPXQsdGhpcy5lbmRfaW5fYmVmb3JlPXRoaXMuc3RhcnRfaW5fYmVmb3JlK3RoaXMubGVuZ3RoLTEsdGhpcy5lbmRfaW5fYWZ0ZXI9dGhpcy5zdGFydF9pbl9hZnRlcit0aGlzLmxlbmd0aC0xfX0oKSxhPWZ1bmN0aW9uKGUpe3ZhciBuLHQscixpLGYsXztmb3IoZj1cImNoYXJcIix0PVwiXCIsXz1bXSxyPTAsaT1lLmxlbmd0aDtyPGk7cisrKXN3aXRjaChuPWVbcl0sZil7Y2FzZVwidGFnXCI6byhuKT8odCs9XCI+XCIsXy5wdXNoKHQpLHQ9XCJcIixmPWgobik/XCJ3aGl0ZXNwYWNlXCI6XCJjaGFyXCIpOnQrPW47YnJlYWs7Y2FzZVwiY2hhclwiOnMobik/KHQmJl8ucHVzaCh0KSx0PVwiPFwiLGY9XCJ0YWdcIik6L1xccy8udGVzdChuKT8odCYmXy5wdXNoKHQpLHQ9bixmPVwid2hpdGVzcGFjZVwiKTovW1xcd1xcI0BdKy9pLnRlc3Qobik/dCs9bjoodCYmXy5wdXNoKHQpLHQ9bik7YnJlYWs7Y2FzZVwid2hpdGVzcGFjZVwiOnMobik/KHQmJl8ucHVzaCh0KSx0PVwiPFwiLGY9XCJ0YWdcIik6aChuKT90Kz1uOih0JiZfLnB1c2godCksdD1uLGY9XCJjaGFyXCIpO2JyZWFrO2RlZmF1bHQ6dGhyb3cgbmV3IEVycm9yKFwiVW5rbm93biBtb2RlIFwiK2YpfXJldHVybiB0JiZfLnB1c2godCksX30sZj1mdW5jdGlvbihuLHQscixpLGYsXyxhKXt2YXIgbyxzLHUsaCxsLGMsZCxiLHAsZyx3LHYsayxtLHk7Zm9yKHM9aSxvPV8sdT0wLHc9e30sYz1oPW09aSx5PWY7bTw9eT9oPHk6aD55O2M9bTw9eT8rK2g6LS1oKXtmb3Ioaz17fSxkPTAsYj0ocD1yW25bY11dKS5sZW5ndGg7ZDxiO2QrKylpZighKChsPXBbZF0pPF8pKXtpZihsPj1hKWJyZWFrO251bGw9PXdbbC0xXSYmKHdbbC0xXT0wKSx2PXdbbC0xXSsxLGtbbF09dix2PnUmJihzPWMtdisxLG89bC12KzEsdT12KX13PWt9cmV0dXJuIDAhPT11JiYoZz1uZXcgZShzLG8sdSkpLGd9LGQ9ZnVuY3Rpb24oZSxuLHQscixpLF8sYSxvKXt2YXIgcztyZXR1cm4gbnVsbCE9KHM9ZihlLDAsdCxyLGksXyxhKSkmJihyPHMuc3RhcnRfaW5fYmVmb3JlJiZfPHMuc3RhcnRfaW5fYWZ0ZXImJmQoZSxuLHQscixzLnN0YXJ0X2luX2JlZm9yZSxfLHMuc3RhcnRfaW5fYWZ0ZXIsbyksby5wdXNoKHMpLHMuZW5kX2luX2JlZm9yZTw9aSYmcy5lbmRfaW5fYWZ0ZXI8PWEmJmQoZSxuLHQscy5lbmRfaW5fYmVmb3JlKzEsaSxzLmVuZF9pbl9hZnRlcisxLGEsbykpLG99LHI9ZnVuY3Rpb24oZSl7dmFyIG4sdCxyLGksZixfO2lmKG51bGw9PWUuZmluZF90aGVzZSl0aHJvdyBuZXcgRXJyb3IoXCJwYXJhbXMgbXVzdCBoYXZlIGZpbmRfdGhlc2Uga2V5XCIpO2lmKG51bGw9PWUuaW5fdGhlc2UpdGhyb3cgbmV3IEVycm9yKFwicGFyYW1zIG11c3QgaGF2ZSBpbl90aGVzZSBrZXlcIik7Zm9yKHI9e30sbj0wLGk9KGY9ZS5maW5kX3RoZXNlKS5sZW5ndGg7bjxpO24rKylmb3IocltfPWZbbl1dPVtdLHQ9ZS5pbl90aGVzZS5pbmRleE9mKF8pOy0xIT09dDspcltfXS5wdXNoKHQpLHQ9ZS5pbl90aGVzZS5pbmRleE9mKF8sdCsxKTtyZXR1cm4gcn0sXz1mdW5jdGlvbihlLG4pe3ZhciB0LGk7cmV0dXJuIGk9W10sdD1yKHtmaW5kX3RoZXNlOmUsaW5fdGhlc2U6bn0pLGQoZSxuLHQsMCxlLmxlbmd0aCwwLG4ubGVuZ3RoLGkpfSxuPWZ1bmN0aW9uKG4sdCl7dmFyIHIsaSxmLGEsbyxzLHUsaCxsLGMsZCxiLHAsZyx3LHY7aWYobnVsbD09bil0aHJvdyBuZXcgRXJyb3IoXCJiZWZvcmVfdG9rZW5zP1wiKTtpZihudWxsPT10KXRocm93IG5ldyBFcnJvcihcImFmdGVyX3Rva2Vucz9cIik7Zm9yKHc9Zz0wLHA9W10scj17XCJmYWxzZSxmYWxzZVwiOlwicmVwbGFjZVwiLFwidHJ1ZSxmYWxzZVwiOlwiaW5zZXJ0XCIsXCJmYWxzZSx0cnVlXCI6XCJkZWxldGVcIixcInRydWUsdHJ1ZVwiOlwibm9uZVwifSwoZD1fKG4sdCkpLnB1c2gobmV3IGUobi5sZW5ndGgsdC5sZW5ndGgsMCkpLGE9Zj0wLGg9ZC5sZW5ndGg7ZjxoO2E9KytmKVwibm9uZVwiIT09KGk9cltbdz09PShjPWRbYV0pLnN0YXJ0X2luX2JlZm9yZSxnPT09Yy5zdGFydF9pbl9hZnRlcl0udG9TdHJpbmcoKV0pJiZwLnB1c2goe2FjdGlvbjppLHN0YXJ0X2luX2JlZm9yZTp3LGVuZF9pbl9iZWZvcmU6XCJpbnNlcnRcIiE9PWk/Yy5zdGFydF9pbl9iZWZvcmUtMTp2b2lkIDAsc3RhcnRfaW5fYWZ0ZXI6ZyxlbmRfaW5fYWZ0ZXI6XCJkZWxldGVcIiE9PWk/Yy5zdGFydF9pbl9hZnRlci0xOnZvaWQgMH0pLDAhPT1jLmxlbmd0aCYmcC5wdXNoKHthY3Rpb246XCJlcXVhbFwiLHN0YXJ0X2luX2JlZm9yZTpjLnN0YXJ0X2luX2JlZm9yZSxlbmRfaW5fYmVmb3JlOmMuZW5kX2luX2JlZm9yZSxzdGFydF9pbl9hZnRlcjpjLnN0YXJ0X2luX2FmdGVyLGVuZF9pbl9hZnRlcjpjLmVuZF9pbl9hZnRlcn0pLHc9Yy5lbmRfaW5fYmVmb3JlKzEsZz1jLmVuZF9pbl9hZnRlcisxO2Zvcih2PVtdLHU9e2FjdGlvbjpcIm5vbmVcIn0sbz1mdW5jdGlvbihlKXtyZXR1cm5cImVxdWFsXCI9PT1lLmFjdGlvbiYmKGUuZW5kX2luX2JlZm9yZS1lLnN0YXJ0X2luX2JlZm9yZT09MCYmL15cXHMkLy50ZXN0KG4uc2xpY2UoZS5zdGFydF9pbl9iZWZvcmUsK2UuZW5kX2luX2JlZm9yZSsxfHw5ZTkpKSl9LHM9MCxsPXAubGVuZ3RoO3M8bDtzKyspbyhiPXBbc10pJiZcInJlcGxhY2VcIj09PXUuYWN0aW9ufHxcInJlcGxhY2VcIj09PWIuYWN0aW9uJiZcInJlcGxhY2VcIj09PXUuYWN0aW9uPyh1LmVuZF9pbl9iZWZvcmU9Yi5lbmRfaW5fYmVmb3JlLHUuZW5kX2luX2FmdGVyPWIuZW5kX2luX2FmdGVyKToodi5wdXNoKGIpLHU9Yik7cmV0dXJuIHZ9LHQ9ZnVuY3Rpb24oZSxuLHQpe3ZhciByLGksZixfLGEsbztmb3IoXz12b2lkIDAsZj1pPTAsYT0obj1uLnNsaWNlKGUsK24ubGVuZ3RoKzF8fDllOSkpLmxlbmd0aDtpPGEmJihvPW5bZl0sITA9PT0ocj10KG8pKSYmKF89ZiksITEhPT1yKTtmPSsraSk7cmV0dXJuIG51bGwhPV8/bi5zbGljZSgwLCtfKzF8fDllOSk6W119LHA9ZnVuY3Rpb24oZSxuKXt2YXIgcixpLGYsXyxhO2ZvcihfPVwiXCIsZj0wLHI9bi5sZW5ndGg7Oyl7aWYoZj49cilicmVhaztpZihpPXQoZixuLGwpLGYrPWkubGVuZ3RoLDAhPT1pLmxlbmd0aCYmKF8rPVwiPFwiK2UrXCI+XCIraS5qb2luKFwiXCIpK1wiPC9cIitlK1wiPlwiKSxmPj1yKWJyZWFrO2YrPShhPXQoZixuLHUpKS5sZW5ndGgsXys9YS5qb2luKFwiXCIpfXJldHVybiBffSwoYz17ZXF1YWw6ZnVuY3Rpb24oZSxuLHQpe3JldHVybiBuLnNsaWNlKGUuc3RhcnRfaW5fYmVmb3JlLCtlLmVuZF9pbl9iZWZvcmUrMXx8OWU5KS5qb2luKFwiXCIpfSxpbnNlcnQ6ZnVuY3Rpb24oZSxuLHQpe3ZhciByO3JldHVybiByPXQuc2xpY2UoZS5zdGFydF9pbl9hZnRlciwrZS5lbmRfaW5fYWZ0ZXIrMXx8OWU5KSxwKFwiaW5zXCIscil9LGRlbGV0ZTpmdW5jdGlvbihlLG4sdCl7dmFyIHI7cmV0dXJuIHI9bi5zbGljZShlLnN0YXJ0X2luX2JlZm9yZSwrZS5lbmRfaW5fYmVmb3JlKzF8fDllOSkscChcImRlbFwiLHIpfX0pLnJlcGxhY2U9ZnVuY3Rpb24oZSxuLHQpe3JldHVybiBjLmRlbGV0ZShlLG4sdCkrYy5pbnNlcnQoZSxuLHQpfSxiPWZ1bmN0aW9uKGUsbix0KXt2YXIgcixpLGYsXztmb3IoXz1cIlwiLHI9MCxpPXQubGVuZ3RoO3I8aTtyKyspZj10W3JdLF8rPWNbZi5hY3Rpb25dKGYsZSxuKTtyZXR1cm4gX30sKGk9ZnVuY3Rpb24oZSx0KXt2YXIgcjtyZXR1cm4gZT09PXQ/ZTooZT1hKGUpLHQ9YSh0KSxyPW4oZSx0KSxiKGUsdCxyKSl9KS5odG1sX3RvX3Rva2Vucz1hLGkuZmluZF9tYXRjaGluZ19ibG9ja3M9XyxfLmZpbmRfbWF0Y2g9ZixfLmNyZWF0ZV9pbmRleD1yLGkuY2FsY3VsYXRlX29wZXJhdGlvbnM9bixpLnJlbmRlcl9vcGVyYXRpb25zPWIsXCJmdW5jdGlvblwiPT10eXBlb2YgZGVmaW5lP2RlZmluZShbXSxmdW5jdGlvbigpe3JldHVybiBpfSk6XCJ1bmRlZmluZWRcIiE9dHlwZW9mIG1vZHVsZSYmbnVsbCE9PW1vZHVsZT9tb2R1bGUuZXhwb3J0cz1pOlwidW5kZWZpbmVkXCIhPXR5cGVvZiB3aW5kb3cmJih3aW5kb3cuaHRtbGRpZmY9aSl9KCk7IiwidmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG52YXIgd2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sJyk7XG52YXIgVjhfVkVSU0lPTiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9lbmdpbmUtdjgtdmVyc2lvbicpO1xuXG52YXIgU1BFQ0lFUyA9IHdlbGxLbm93blN5bWJvbCgnc3BlY2llcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChNRVRIT0RfTkFNRSkge1xuICAvLyBXZSBjYW4ndCB1c2UgdGhpcyBmZWF0dXJlIGRldGVjdGlvbiBpbiBWOCBzaW5jZSBpdCBjYXVzZXNcbiAgLy8gZGVvcHRpbWl6YXRpb24gYW5kIHNlcmlvdXMgcGVyZm9ybWFuY2UgZGVncmFkYXRpb25cbiAgLy8gaHR0cHM6Ly9naXRodWIuY29tL3psb2lyb2NrL2NvcmUtanMvaXNzdWVzLzY3N1xuICByZXR1cm4gVjhfVkVSU0lPTiA+PSA1MSB8fCAhZmFpbHMoZnVuY3Rpb24gKCkge1xuICAgIHZhciBhcnJheSA9IFtdO1xuICAgIHZhciBjb25zdHJ1Y3RvciA9IGFycmF5LmNvbnN0cnVjdG9yID0ge307XG4gICAgY29uc3RydWN0b3JbU1BFQ0lFU10gPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4geyBmb286IDEgfTtcbiAgICB9O1xuICAgIHJldHVybiBhcnJheVtNRVRIT0RfTkFNRV0oQm9vbGVhbikuZm9vICE9PSAxO1xuICB9KTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgdG9Qcm9wZXJ0eUtleSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1wcm9wZXJ0eS1rZXknKTtcbnZhciBkZWZpbmVQcm9wZXJ0eU1vZHVsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZGVmaW5lLXByb3BlcnR5Jyk7XG52YXIgY3JlYXRlUHJvcGVydHlEZXNjcmlwdG9yID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NyZWF0ZS1wcm9wZXJ0eS1kZXNjcmlwdG9yJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG9iamVjdCwga2V5LCB2YWx1ZSkge1xuICB2YXIgcHJvcGVydHlLZXkgPSB0b1Byb3BlcnR5S2V5KGtleSk7XG4gIGlmIChwcm9wZXJ0eUtleSBpbiBvYmplY3QpIGRlZmluZVByb3BlcnR5TW9kdWxlLmYob2JqZWN0LCBwcm9wZXJ0eUtleSwgY3JlYXRlUHJvcGVydHlEZXNjcmlwdG9yKDAsIHZhbHVlKSk7XG4gIGVsc2Ugb2JqZWN0W3Byb3BlcnR5S2V5XSA9IHZhbHVlO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciAkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2V4cG9ydCcpO1xudmFyIGlzQXJyYXkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtYXJyYXknKTtcbnZhciBpc0NvbnN0cnVjdG9yID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLWNvbnN0cnVjdG9yJyk7XG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtb2JqZWN0Jyk7XG52YXIgdG9BYnNvbHV0ZUluZGV4ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWFic29sdXRlLWluZGV4Jyk7XG52YXIgbGVuZ3RoT2ZBcnJheUxpa2UgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvbGVuZ3RoLW9mLWFycmF5LWxpa2UnKTtcbnZhciB0b0luZGV4ZWRPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8taW5kZXhlZC1vYmplY3QnKTtcbnZhciBjcmVhdGVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jcmVhdGUtcHJvcGVydHknKTtcbnZhciB3ZWxsS25vd25TeW1ib2wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvd2VsbC1rbm93bi1zeW1ib2wnKTtcbnZhciBhcnJheU1ldGhvZEhhc1NwZWNpZXNTdXBwb3J0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LW1ldGhvZC1oYXMtc3BlY2llcy1zdXBwb3J0Jyk7XG5cbnZhciBIQVNfU1BFQ0lFU19TVVBQT1JUID0gYXJyYXlNZXRob2RIYXNTcGVjaWVzU3VwcG9ydCgnc2xpY2UnKTtcblxudmFyIFNQRUNJRVMgPSB3ZWxsS25vd25TeW1ib2woJ3NwZWNpZXMnKTtcbnZhciBuYXRpdmVTbGljZSA9IFtdLnNsaWNlO1xudmFyIG1heCA9IE1hdGgubWF4O1xuXG4vLyBgQXJyYXkucHJvdG90eXBlLnNsaWNlYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtYXJyYXkucHJvdG90eXBlLnNsaWNlXG4vLyBmYWxsYmFjayBmb3Igbm90IGFycmF5LWxpa2UgRVMzIHN0cmluZ3MgYW5kIERPTSBvYmplY3RzXG4kKHsgdGFyZ2V0OiAnQXJyYXknLCBwcm90bzogdHJ1ZSwgZm9yY2VkOiAhSEFTX1NQRUNJRVNfU1VQUE9SVCB9LCB7XG4gIHNsaWNlOiBmdW5jdGlvbiBzbGljZShzdGFydCwgZW5kKSB7XG4gICAgdmFyIE8gPSB0b0luZGV4ZWRPYmplY3QodGhpcyk7XG4gICAgdmFyIGxlbmd0aCA9IGxlbmd0aE9mQXJyYXlMaWtlKE8pO1xuICAgIHZhciBrID0gdG9BYnNvbHV0ZUluZGV4KHN0YXJ0LCBsZW5ndGgpO1xuICAgIHZhciBmaW4gPSB0b0Fic29sdXRlSW5kZXgoZW5kID09PSB1bmRlZmluZWQgPyBsZW5ndGggOiBlbmQsIGxlbmd0aCk7XG4gICAgLy8gaW5saW5lIGBBcnJheVNwZWNpZXNDcmVhdGVgIGZvciB1c2FnZSBuYXRpdmUgYEFycmF5I3NsaWNlYCB3aGVyZSBpdCdzIHBvc3NpYmxlXG4gICAgdmFyIENvbnN0cnVjdG9yLCByZXN1bHQsIG47XG4gICAgaWYgKGlzQXJyYXkoTykpIHtcbiAgICAgIENvbnN0cnVjdG9yID0gTy5jb25zdHJ1Y3RvcjtcbiAgICAgIC8vIGNyb3NzLXJlYWxtIGZhbGxiYWNrXG4gICAgICBpZiAoaXNDb25zdHJ1Y3RvcihDb25zdHJ1Y3RvcikgJiYgKENvbnN0cnVjdG9yID09PSBBcnJheSB8fCBpc0FycmF5KENvbnN0cnVjdG9yLnByb3RvdHlwZSkpKSB7XG4gICAgICAgIENvbnN0cnVjdG9yID0gdW5kZWZpbmVkO1xuICAgICAgfSBlbHNlIGlmIChpc09iamVjdChDb25zdHJ1Y3RvcikpIHtcbiAgICAgICAgQ29uc3RydWN0b3IgPSBDb25zdHJ1Y3RvcltTUEVDSUVTXTtcbiAgICAgICAgaWYgKENvbnN0cnVjdG9yID09PSBudWxsKSBDb25zdHJ1Y3RvciA9IHVuZGVmaW5lZDtcbiAgICAgIH1cbiAgICAgIGlmIChDb25zdHJ1Y3RvciA9PT0gQXJyYXkgfHwgQ29uc3RydWN0b3IgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gbmF0aXZlU2xpY2UuY2FsbChPLCBrLCBmaW4pO1xuICAgICAgfVxuICAgIH1cbiAgICByZXN1bHQgPSBuZXcgKENvbnN0cnVjdG9yID09PSB1bmRlZmluZWQgPyBBcnJheSA6IENvbnN0cnVjdG9yKShtYXgoZmluIC0gaywgMCkpO1xuICAgIGZvciAobiA9IDA7IGsgPCBmaW47IGsrKywgbisrKSBpZiAoayBpbiBPKSBjcmVhdGVQcm9wZXJ0eShyZXN1bHQsIG4sIE9ba10pO1xuICAgIHJlc3VsdC5sZW5ndGggPSBuO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbn0pO1xuIl0sIm5hbWVzIjpbImh0bWxkaWZmIiwiJCIsImVhY2giLCJrZXkiLCJpdGVtIiwib3JpZ2luYWxIVE1MIiwiZmluZCIsImh0bWwiLCJuZXdIVE1MIiwib3V0cHV0IiwiZSIsIm4iLCJ0IiwiciIsImkiLCJmIiwiXyIsImEiLCJvIiwicyIsInUiLCJoIiwibCIsImMiLCJkIiwiYiIsInAiLCJ0ZXN0Iiwic3RhcnRfaW5fYmVmb3JlIiwic3RhcnRfaW5fYWZ0ZXIiLCJsZW5ndGgiLCJlbmRfaW5fYmVmb3JlIiwiZW5kX2luX2FmdGVyIiwicHVzaCIsIkVycm9yIiwiZyIsInciLCJ2IiwiayIsIm0iLCJ5IiwiZmluZF90aGVzZSIsImluX3RoZXNlIiwiaW5kZXhPZiIsInRvU3RyaW5nIiwiYWN0aW9uIiwic2xpY2UiLCJqb2luIiwiZXF1YWwiLCJpbnNlcnQiLCJyZXBsYWNlIiwiaHRtbF90b190b2tlbnMiLCJmaW5kX21hdGNoaW5nX2Jsb2NrcyIsImZpbmRfbWF0Y2giLCJjcmVhdGVfaW5kZXgiLCJjYWxjdWxhdGVfb3BlcmF0aW9ucyIsInJlbmRlcl9vcGVyYXRpb25zIiwiZGVmaW5lIiwibW9kdWxlIiwiZXhwb3J0cyIsIndpbmRvdyJdLCJzb3VyY2VSb290IjoiIn0=