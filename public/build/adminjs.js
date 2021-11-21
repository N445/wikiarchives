(self["webpackChunk"] = self["webpackChunk"] || []).push([["adminjs"],{

/***/ "./assets/admin/admin.js":
/*!*******************************!*\
  !*** ./assets/admin/admin.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.array.find.js */ "./node_modules/core-js/modules/es.array.find.js");
/* harmony import */ var core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lib_htmldiff__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lib/htmldiff */ "./assets/admin/lib/htmldiff.js");
/* harmony import */ var _lib_htmldiff__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_lib_htmldiff__WEBPACK_IMPORTED_MODULE_1__);
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");

// const Diff2Html = require('diff2html');


__webpack_require__(/*! ./lib/startbootstrap-sb-admin-gh-pages/js/scripts */ "./assets/admin/lib/startbootstrap-sb-admin-gh-pages/js/scripts.js");

__webpack_require__(/*! ./lib/startbootstrap-sb-admin-gh-pages/js/datatables-simple-demo */ "./assets/admin/lib/startbootstrap-sb-admin-gh-pages/js/datatables-simple-demo.js");

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

/***/ "./assets/admin/lib/htmldiff.js":
/*!**************************************!*\
  !*** ./assets/admin/lib/htmldiff.js ***!
  \**************************************/
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

/***/ "./assets/admin/lib/startbootstrap-sb-admin-gh-pages/js/datatables-simple-demo.js":
/*!****************************************************************************************!*\
  !*** ./assets/admin/lib/startbootstrap-sb-admin-gh-pages/js/datatables-simple-demo.js ***!
  \****************************************************************************************/
/***/ (() => {

window.addEventListener('DOMContentLoaded', function (event) {
  // Simple-DataTables
  // https://github.com/fiduswriter/Simple-DataTables/wiki
  var datatablesSimple = document.getElementById('datatablesSimple');

  if (datatablesSimple) {
    new simpleDatatables.DataTable(datatablesSimple);
  }
});

/***/ }),

/***/ "./assets/admin/lib/startbootstrap-sb-admin-gh-pages/js/scripts.js":
/*!*************************************************************************!*\
  !*** ./assets/admin/lib/startbootstrap-sb-admin-gh-pages/js/scripts.js ***!
  \*************************************************************************/
/***/ (() => {

/*!
    * Start Bootstrap - SB Admin v7.0.4 (https://startbootstrap.com/template/sb-admin)
    * Copyright 2013-2021 Start Bootstrap
    * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-sb-admin/blob/master/LICENSE)
    */
// 
// Scripts
// 
window.addEventListener('DOMContentLoaded', function (event) {
  // Toggle the side navigation
  var sidebarToggle = document.body.querySelector('#sidebarToggle');

  if (sidebarToggle) {
    // Uncomment Below to persist sidebar toggle between refreshes
    // if (localStorage.getItem('sb|sidebar-toggle') === 'true') {
    //     document.body.classList.toggle('sb-sidenav-toggled');
    // }
    sidebarToggle.addEventListener('click', function (event) {
      event.preventDefault();
      document.body.classList.toggle('sb-sidenav-toggled');
      localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
    });
  }
});

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
/******/ __webpack_require__.O(0, ["vendors-node_modules_jquery_dist_jquery_js","vendors-node_modules_core-js_internals_array-iteration_js-node_modules_core-js_internals_export_js","vendors-node_modules_core-js_modules_es_array_find_js-node_modules_core-js_modules_es_array_i-550953"], () => (__webpack_exec__("./assets/admin/admin.js")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRtaW5qcy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTs7QUFDQUMsbUJBQU8sQ0FBQyw0SEFBRCxDQUFQOztBQUNBQSxtQkFBTyxDQUFDLDBKQUFELENBQVA7O0FBRUFDLENBQUMsQ0FBQ0MsSUFBRixDQUFPRCxDQUFDLENBQUMsV0FBRCxDQUFSLEVBQXVCLFVBQVVFLEdBQVYsRUFBZUMsSUFBZixFQUFxQjtBQUN4Q0EsRUFBQUEsSUFBSSxHQUFHSCxDQUFDLENBQUNHLElBQUQsQ0FBUjtBQUNBLE1BQUlDLFlBQVksR0FBR0QsSUFBSSxDQUFDRSxJQUFMLENBQVUsVUFBVixFQUFzQkMsSUFBdEIsRUFBbkI7QUFDQSxNQUFJQyxPQUFPLEdBQUdKLElBQUksQ0FBQ0UsSUFBTCxDQUFVLFFBQVYsRUFBb0JDLElBQXBCLEVBQWQ7QUFFQSxNQUFJRSxNQUFNLEdBQUdWLG9EQUFRLENBQUNNLFlBQUQsRUFBZUcsT0FBZixDQUFyQjtBQUVBSixFQUFBQSxJQUFJLENBQUNFLElBQUwsQ0FBVSxRQUFWLEVBQW9CQyxJQUFwQixDQUF5QkUsTUFBekI7QUFDSCxDQVJELEdBVUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM1QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxZQUFVO0FBQUMsTUFBSUMsQ0FBSixFQUFNQyxDQUFOLEVBQVFDLENBQVIsRUFBVUMsQ0FBVixFQUFZQyxDQUFaLEVBQWNDLENBQWQsRUFBZ0JDLENBQWhCLEVBQWtCQyxDQUFsQixFQUFvQkMsQ0FBcEIsRUFBc0JDLENBQXRCLEVBQXdCQyxDQUF4QixFQUEwQkMsQ0FBMUIsRUFBNEJDLENBQTVCLEVBQThCQyxDQUE5QixFQUFnQ0MsRUFBaEMsRUFBa0NDLENBQWxDLEVBQW9DQyxDQUFwQzs7QUFBc0NSLEVBQUFBLENBQUMsR0FBQyxXQUFTUixDQUFULEVBQVc7QUFBQyxXQUFNLFFBQU1BLENBQVo7QUFBYyxHQUE1QixFQUE2QlMsQ0FBQyxHQUFDLFdBQVNULENBQVQsRUFBVztBQUFDLFdBQU0sUUFBTUEsQ0FBWjtBQUFjLEdBQXpELEVBQTBEVyxDQUFDLEdBQUMsV0FBU1gsQ0FBVCxFQUFXO0FBQUMsV0FBTSxRQUFRaUIsSUFBUixDQUFhakIsQ0FBYixDQUFOO0FBQXNCLEdBQTlGLEVBQStGVSxDQUFDLEdBQUMsV0FBU1YsQ0FBVCxFQUFXO0FBQUMsV0FBTSxrQkFBa0JpQixJQUFsQixDQUF1QmpCLENBQXZCLENBQU47QUFBZ0MsR0FBN0ksRUFBOElZLENBQUMsR0FBQyxXQUFTWixDQUFULEVBQVc7QUFBQyxXQUFNLENBQUNVLENBQUMsQ0FBQ1YsQ0FBRCxDQUFSO0FBQVksR0FBeEssRUFBeUtBLENBQUMsR0FBQyxZQUFVO0FBQUMsV0FBTyxVQUFTQSxDQUFULEVBQVdDLENBQVgsRUFBYUMsQ0FBYixFQUFlO0FBQUMsV0FBS2dCLGVBQUwsR0FBcUJsQixDQUFyQixFQUF1QixLQUFLbUIsY0FBTCxHQUFvQmxCLENBQTNDLEVBQTZDLEtBQUttQixNQUFMLEdBQVlsQixDQUF6RCxFQUEyRCxLQUFLbUIsYUFBTCxHQUFtQixLQUFLSCxlQUFMLEdBQXFCLEtBQUtFLE1BQTFCLEdBQWlDLENBQS9HLEVBQWlILEtBQUtFLFlBQUwsR0FBa0IsS0FBS0gsY0FBTCxHQUFvQixLQUFLQyxNQUF6QixHQUFnQyxDQUFuSztBQUFxSyxLQUE1TDtBQUE2TCxHQUF4TSxFQUEzSyxFQUFzWGIsQ0FBQyxHQUFDLFdBQVNQLENBQVQsRUFBVztBQUFDLFFBQUlDLENBQUosRUFBTUMsQ0FBTixFQUFRQyxDQUFSLEVBQVVDLENBQVYsRUFBWUMsQ0FBWixFQUFjQyxDQUFkOztBQUFnQixTQUFJRCxDQUFDLEdBQUMsTUFBRixFQUFTSCxDQUFDLEdBQUMsRUFBWCxFQUFjSSxDQUFDLEdBQUMsRUFBaEIsRUFBbUJILENBQUMsR0FBQyxDQUFyQixFQUF1QkMsQ0FBQyxHQUFDSixDQUFDLENBQUNvQixNQUEvQixFQUFzQ2pCLENBQUMsR0FBQ0MsQ0FBeEMsRUFBMENELENBQUMsRUFBM0M7QUFBOEMsY0FBT0YsQ0FBQyxHQUFDRCxDQUFDLENBQUNHLENBQUQsQ0FBSCxFQUFPRSxDQUFkO0FBQWlCLGFBQUksS0FBSjtBQUFVRyxVQUFBQSxDQUFDLENBQUNQLENBQUQsQ0FBRCxJQUFNQyxDQUFDLElBQUUsR0FBSCxFQUFPSSxDQUFDLENBQUNpQixJQUFGLENBQU9yQixDQUFQLENBQVAsRUFBaUJBLENBQUMsR0FBQyxFQUFuQixFQUFzQkcsQ0FBQyxHQUFDTSxDQUFDLENBQUNWLENBQUQsQ0FBRCxHQUFLLFlBQUwsR0FBa0IsTUFBaEQsSUFBd0RDLENBQUMsSUFBRUQsQ0FBM0Q7QUFBNkQ7O0FBQU0sYUFBSSxNQUFKO0FBQVdRLFVBQUFBLENBQUMsQ0FBQ1IsQ0FBRCxDQUFELElBQU1DLENBQUMsSUFBRUksQ0FBQyxDQUFDaUIsSUFBRixDQUFPckIsQ0FBUCxDQUFILEVBQWFBLENBQUMsR0FBQyxHQUFmLEVBQW1CRyxDQUFDLEdBQUMsS0FBM0IsSUFBa0MsS0FBS1ksSUFBTCxDQUFVaEIsQ0FBVixLQUFjQyxDQUFDLElBQUVJLENBQUMsQ0FBQ2lCLElBQUYsQ0FBT3JCLENBQVAsQ0FBSCxFQUFhQSxDQUFDLEdBQUNELENBQWYsRUFBaUJJLENBQUMsR0FBQyxZQUFqQyxJQUErQyxZQUFZWSxJQUFaLENBQWlCaEIsQ0FBakIsSUFBb0JDLENBQUMsSUFBRUQsQ0FBdkIsSUFBMEJDLENBQUMsSUFBRUksQ0FBQyxDQUFDaUIsSUFBRixDQUFPckIsQ0FBUCxDQUFILEVBQWFBLENBQUMsR0FBQ0QsQ0FBekMsQ0FBakY7QUFBNkg7O0FBQU0sYUFBSSxZQUFKO0FBQWlCUSxVQUFBQSxDQUFDLENBQUNSLENBQUQsQ0FBRCxJQUFNQyxDQUFDLElBQUVJLENBQUMsQ0FBQ2lCLElBQUYsQ0FBT3JCLENBQVAsQ0FBSCxFQUFhQSxDQUFDLEdBQUMsR0FBZixFQUFtQkcsQ0FBQyxHQUFDLEtBQTNCLElBQWtDTSxDQUFDLENBQUNWLENBQUQsQ0FBRCxHQUFLQyxDQUFDLElBQUVELENBQVIsSUFBV0MsQ0FBQyxJQUFFSSxDQUFDLENBQUNpQixJQUFGLENBQU9yQixDQUFQLENBQUgsRUFBYUEsQ0FBQyxHQUFDRCxDQUFmLEVBQWlCSSxDQUFDLEdBQUMsTUFBOUIsQ0FBbEM7QUFBd0U7O0FBQU07QUFBUSxnQkFBTSxJQUFJbUIsS0FBSixDQUFVLGtCQUFnQm5CLENBQTFCLENBQU47QUFBblY7QUFBOUM7O0FBQW9hLFdBQU9ILENBQUMsSUFBRUksQ0FBQyxDQUFDaUIsSUFBRixDQUFPckIsQ0FBUCxDQUFILEVBQWFJLENBQXBCO0FBQXNCLEdBQTkwQixFQUErMEJELENBQUMsR0FBQyxXQUFTSixDQUFULEVBQVdDLENBQVgsRUFBYUMsQ0FBYixFQUFlQyxDQUFmLEVBQWlCQyxFQUFqQixFQUFtQkMsQ0FBbkIsRUFBcUJDLENBQXJCLEVBQXVCO0FBQUMsUUFBSUMsQ0FBSixFQUFNQyxDQUFOLEVBQVFDLENBQVIsRUFBVUMsQ0FBVixFQUFZQyxDQUFaLEVBQWNDLENBQWQsRUFBZ0JDLENBQWhCLEVBQWtCQyxDQUFsQixFQUFvQkMsQ0FBcEIsRUFBc0JTLENBQXRCLEVBQXdCQyxDQUF4QixFQUEwQkMsQ0FBMUIsRUFBNEJDLENBQTVCLEVBQThCQyxDQUE5QixFQUFnQ0MsQ0FBaEM7O0FBQWtDLFNBQUlyQixDQUFDLEdBQUNMLENBQUYsRUFBSUksQ0FBQyxHQUFDRixDQUFOLEVBQVFJLENBQUMsR0FBQyxDQUFWLEVBQVlnQixDQUFDLEdBQUMsRUFBZCxFQUFpQmIsQ0FBQyxHQUFDRixDQUFDLEdBQUNrQixDQUFDLEdBQUN6QixDQUF2QixFQUF5QjBCLENBQUMsR0FBQ3pCLEVBQS9CLEVBQWlDd0IsQ0FBQyxJQUFFQyxDQUFILEdBQUtuQixDQUFDLEdBQUNtQixDQUFQLEdBQVNuQixDQUFDLEdBQUNtQixDQUE1QyxFQUE4Q2pCLENBQUMsR0FBQ2dCLENBQUMsSUFBRUMsQ0FBSCxHQUFLLEVBQUVuQixDQUFQLEdBQVMsRUFBRUEsQ0FBM0QsRUFBNkQ7QUFBQyxXQUFJaUIsQ0FBQyxHQUFDLEVBQUYsRUFBS2QsQ0FBQyxHQUFDLENBQVAsRUFBU0MsQ0FBQyxHQUFDLENBQUNDLENBQUMsR0FBQ2IsQ0FBQyxDQUFDRixDQUFDLENBQUNZLENBQUQsQ0FBRixDQUFKLEVBQVlPLE1BQTNCLEVBQWtDTixDQUFDLEdBQUNDLENBQXBDLEVBQXNDRCxDQUFDLEVBQXZDO0FBQTBDLFlBQUcsRUFBRSxDQUFDRixDQUFDLEdBQUNJLENBQUMsQ0FBQ0YsQ0FBRCxDQUFKLElBQVNSLENBQVgsQ0FBSCxFQUFpQjtBQUFDLGNBQUdNLENBQUMsSUFBRUwsQ0FBTixFQUFRO0FBQU0sa0JBQU1tQixDQUFDLENBQUNkLENBQUMsR0FBQyxDQUFILENBQVAsS0FBZWMsQ0FBQyxDQUFDZCxDQUFDLEdBQUMsQ0FBSCxDQUFELEdBQU8sQ0FBdEIsR0FBeUJlLENBQUMsR0FBQ0QsQ0FBQyxDQUFDZCxDQUFDLEdBQUMsQ0FBSCxDQUFELEdBQU8sQ0FBbEMsRUFBb0NnQixDQUFDLENBQUNoQixDQUFELENBQUQsR0FBS2UsQ0FBekMsRUFBMkNBLENBQUMsR0FBQ2pCLENBQUYsS0FBTUQsQ0FBQyxHQUFDSSxDQUFDLEdBQUNjLENBQUYsR0FBSSxDQUFOLEVBQVFuQixDQUFDLEdBQUNJLENBQUMsR0FBQ2UsQ0FBRixHQUFJLENBQWQsRUFBZ0JqQixDQUFDLEdBQUNpQixDQUF4QixDQUEzQztBQUFzRTtBQUFoSjs7QUFBZ0pELE1BQUFBLENBQUMsR0FBQ0UsQ0FBRjtBQUFJOztBQUFBLFdBQU8sTUFBSWxCLENBQUosS0FBUWUsQ0FBQyxHQUFDLElBQUl6QixDQUFKLENBQU1TLENBQU4sRUFBUUQsQ0FBUixFQUFVRSxDQUFWLENBQVYsR0FBd0JlLENBQS9CO0FBQWlDLEdBQTluQyxFQUErbkNYLEVBQUMsR0FBQyxXQUFTZCxDQUFULEVBQVdDLENBQVgsRUFBYUMsQ0FBYixFQUFlQyxDQUFmLEVBQWlCQyxDQUFqQixFQUFtQkUsQ0FBbkIsRUFBcUJDLENBQXJCLEVBQXVCQyxDQUF2QixFQUF5QjtBQUFDLFFBQUlDLENBQUo7QUFBTSxXQUFPLFNBQU9BLENBQUMsR0FBQ0osQ0FBQyxDQUFDTCxDQUFELEVBQUcsQ0FBSCxFQUFLRSxDQUFMLEVBQU9DLENBQVAsRUFBU0MsQ0FBVCxFQUFXRSxDQUFYLEVBQWFDLENBQWIsQ0FBVixNQUE2QkosQ0FBQyxHQUFDTSxDQUFDLENBQUNTLGVBQUosSUFBcUJaLENBQUMsR0FBQ0csQ0FBQyxDQUFDVSxjQUF6QixJQUF5Q0wsRUFBQyxDQUFDZCxDQUFELEVBQUdDLENBQUgsRUFBS0MsQ0FBTCxFQUFPQyxDQUFQLEVBQVNNLENBQUMsQ0FBQ1MsZUFBWCxFQUEyQlosQ0FBM0IsRUFBNkJHLENBQUMsQ0FBQ1UsY0FBL0IsRUFBOENYLENBQTlDLENBQTFDLEVBQTJGQSxDQUFDLENBQUNlLElBQUYsQ0FBT2QsQ0FBUCxDQUEzRixFQUFxR0EsQ0FBQyxDQUFDWSxhQUFGLElBQWlCakIsQ0FBakIsSUFBb0JLLENBQUMsQ0FBQ2EsWUFBRixJQUFnQmYsQ0FBcEMsSUFBdUNPLEVBQUMsQ0FBQ2QsQ0FBRCxFQUFHQyxDQUFILEVBQUtDLENBQUwsRUFBT08sQ0FBQyxDQUFDWSxhQUFGLEdBQWdCLENBQXZCLEVBQXlCakIsQ0FBekIsRUFBMkJLLENBQUMsQ0FBQ2EsWUFBRixHQUFlLENBQTFDLEVBQTRDZixDQUE1QyxFQUE4Q0MsQ0FBOUMsQ0FBMUssR0FBNE5BLENBQW5PO0FBQXFPLEdBQXQ0QyxFQUF1NENMLENBQUMsR0FBQyxXQUFTSCxDQUFULEVBQVc7QUFBQyxRQUFJQyxDQUFKLEVBQU1DLENBQU4sRUFBUUMsQ0FBUixFQUFVQyxDQUFWLEVBQVlDLENBQVosRUFBY0MsQ0FBZDs7QUFBZ0IsUUFBRyxRQUFNTixDQUFDLENBQUMrQixVQUFYLEVBQXNCLE1BQU0sSUFBSVAsS0FBSixDQUFVLGlDQUFWLENBQU47QUFBbUQsUUFBRyxRQUFNeEIsQ0FBQyxDQUFDZ0MsUUFBWCxFQUFvQixNQUFNLElBQUlSLEtBQUosQ0FBVSwrQkFBVixDQUFOOztBQUFpRCxTQUFJckIsQ0FBQyxHQUFDLEVBQUYsRUFBS0YsQ0FBQyxHQUFDLENBQVAsRUFBU0csQ0FBQyxHQUFDLENBQUNDLENBQUMsR0FBQ0wsQ0FBQyxDQUFDK0IsVUFBTCxFQUFpQlgsTUFBaEMsRUFBdUNuQixDQUFDLEdBQUNHLENBQXpDLEVBQTJDSCxDQUFDLEVBQTVDO0FBQStDLFdBQUlFLENBQUMsQ0FBQ0csQ0FBQyxHQUFDRCxDQUFDLENBQUNKLENBQUQsQ0FBSixDQUFELEdBQVUsRUFBVixFQUFhQyxDQUFDLEdBQUNGLENBQUMsQ0FBQ2dDLFFBQUYsQ0FBV0MsT0FBWCxDQUFtQjNCLENBQW5CLENBQW5CLEVBQXlDLENBQUMsQ0FBRCxLQUFLSixDQUE5QztBQUFpREMsUUFBQUEsQ0FBQyxDQUFDRyxDQUFELENBQUQsQ0FBS2lCLElBQUwsQ0FBVXJCLENBQVYsR0FBYUEsQ0FBQyxHQUFDRixDQUFDLENBQUNnQyxRQUFGLENBQVdDLE9BQVgsQ0FBbUIzQixDQUFuQixFQUFxQkosQ0FBQyxHQUFDLENBQXZCLENBQWY7QUFBakQ7QUFBL0M7O0FBQXlJLFdBQU9DLENBQVA7QUFBUyxHQUFyc0QsRUFBc3NERyxDQUFDLEdBQUMsV0FBU04sQ0FBVCxFQUFXQyxDQUFYLEVBQWE7QUFBQyxRQUFJQyxDQUFKLEVBQU1FLENBQU47QUFBUSxXQUFPQSxDQUFDLEdBQUMsRUFBRixFQUFLRixDQUFDLEdBQUNDLENBQUMsQ0FBQztBQUFDNEIsTUFBQUEsVUFBVSxFQUFDL0IsQ0FBWjtBQUFjZ0MsTUFBQUEsUUFBUSxFQUFDL0I7QUFBdkIsS0FBRCxDQUFSLEVBQW9DYSxFQUFDLENBQUNkLENBQUQsRUFBR0MsQ0FBSCxFQUFLQyxDQUFMLEVBQU8sQ0FBUCxFQUFTRixDQUFDLENBQUNvQixNQUFYLEVBQWtCLENBQWxCLEVBQW9CbkIsQ0FBQyxDQUFDbUIsTUFBdEIsRUFBNkJoQixDQUE3QixDQUE1QztBQUE0RSxHQUExeUQsRUFBMnlESCxDQUFDLEdBQUMsV0FBU0EsRUFBVCxFQUFXQyxDQUFYLEVBQWE7QUFBQyxRQUFJQyxDQUFKLEVBQU1DLENBQU4sRUFBUUMsQ0FBUixFQUFVRSxDQUFWLEVBQVlDLENBQVosRUFBY0MsQ0FBZCxFQUFnQkMsQ0FBaEIsRUFBa0JDLENBQWxCLEVBQW9CQyxDQUFwQixFQUFzQkMsQ0FBdEIsRUFBd0JDLENBQXhCLEVBQTBCQyxDQUExQixFQUE0QkMsQ0FBNUIsRUFBOEJTLENBQTlCLEVBQWdDQyxDQUFoQyxFQUFrQ0MsQ0FBbEM7QUFBb0MsUUFBRyxRQUFNMUIsRUFBVCxFQUFXLE1BQU0sSUFBSXVCLEtBQUosQ0FBVSxnQkFBVixDQUFOO0FBQWtDLFFBQUcsUUFBTXRCLENBQVQsRUFBVyxNQUFNLElBQUlzQixLQUFKLENBQVUsZUFBVixDQUFOOztBQUFpQyxTQUFJRSxDQUFDLEdBQUNELENBQUMsR0FBQyxDQUFKLEVBQU1ULENBQUMsR0FBQyxFQUFSLEVBQVdiLENBQUMsR0FBQztBQUFDLHFCQUFjLFNBQWY7QUFBeUIsb0JBQWEsUUFBdEM7QUFBK0Msb0JBQWEsUUFBNUQ7QUFBcUUsbUJBQVk7QUFBakYsS0FBYixFQUFzRyxDQUFDVyxDQUFDLEdBQUNSLENBQUMsQ0FBQ0wsRUFBRCxFQUFHQyxDQUFILENBQUosRUFBV3FCLElBQVgsQ0FBZ0IsSUFBSXZCLENBQUosQ0FBTUMsRUFBQyxDQUFDbUIsTUFBUixFQUFlbEIsQ0FBQyxDQUFDa0IsTUFBakIsRUFBd0IsQ0FBeEIsQ0FBaEIsQ0FBdEcsRUFBa0piLENBQUMsR0FBQ0YsQ0FBQyxHQUFDLENBQXRKLEVBQXdKTSxDQUFDLEdBQUNHLENBQUMsQ0FBQ00sTUFBaEssRUFBdUtmLENBQUMsR0FBQ00sQ0FBekssRUFBMktKLENBQUMsR0FBQyxFQUFFRixDQUEvSztBQUFpTCxrQkFBVUQsQ0FBQyxHQUFDRCxDQUFDLENBQUMsQ0FBQ3VCLENBQUMsS0FBRyxDQUFDYixDQUFDLEdBQUNDLENBQUMsQ0FBQ1AsQ0FBRCxDQUFKLEVBQVNXLGVBQWQsRUFBOEJPLENBQUMsS0FBR1osQ0FBQyxDQUFDTSxjQUFwQyxFQUFvRGUsUUFBcEQsRUFBRCxDQUFiLEtBQWdGbEIsQ0FBQyxDQUFDTyxJQUFGLENBQU87QUFBQ1ksUUFBQUEsTUFBTSxFQUFDL0IsQ0FBUjtBQUFVYyxRQUFBQSxlQUFlLEVBQUNRLENBQTFCO0FBQTRCTCxRQUFBQSxhQUFhLEVBQUMsYUFBV2pCLENBQVgsR0FBYVMsQ0FBQyxDQUFDSyxlQUFGLEdBQWtCLENBQS9CLEdBQWlDLEtBQUssQ0FBaEY7QUFBa0ZDLFFBQUFBLGNBQWMsRUFBQ00sQ0FBakc7QUFBbUdILFFBQUFBLFlBQVksRUFBQyxhQUFXbEIsQ0FBWCxHQUFhUyxDQUFDLENBQUNNLGNBQUYsR0FBaUIsQ0FBOUIsR0FBZ0MsS0FBSztBQUFySixPQUFQLENBQWhGLEVBQWdQLE1BQUlOLENBQUMsQ0FBQ08sTUFBTixJQUFjSixDQUFDLENBQUNPLElBQUYsQ0FBTztBQUFDWSxRQUFBQSxNQUFNLEVBQUMsT0FBUjtBQUFnQmpCLFFBQUFBLGVBQWUsRUFBQ0wsQ0FBQyxDQUFDSyxlQUFsQztBQUFrREcsUUFBQUEsYUFBYSxFQUFDUixDQUFDLENBQUNRLGFBQWxFO0FBQWdGRixRQUFBQSxjQUFjLEVBQUNOLENBQUMsQ0FBQ00sY0FBakc7QUFBZ0hHLFFBQUFBLFlBQVksRUFBQ1QsQ0FBQyxDQUFDUztBQUEvSCxPQUFQLENBQTlQLEVBQW1aSSxDQUFDLEdBQUNiLENBQUMsQ0FBQ1EsYUFBRixHQUFnQixDQUFyYSxFQUF1YUksQ0FBQyxHQUFDWixDQUFDLENBQUNTLFlBQUYsR0FBZSxDQUF4YjtBQUFqTDs7QUFBMm1CLFNBQUlLLENBQUMsR0FBQyxFQUFGLEVBQUtqQixDQUFDLEdBQUM7QUFBQ3lCLE1BQUFBLE1BQU0sRUFBQztBQUFSLEtBQVAsRUFBdUIzQixDQUFDLEdBQUMsV0FBU1IsQ0FBVCxFQUFXO0FBQUMsYUFBTSxZQUFVQSxDQUFDLENBQUNtQyxNQUFaLElBQXFCbkMsQ0FBQyxDQUFDcUIsYUFBRixHQUFnQnJCLENBQUMsQ0FBQ2tCLGVBQWxCLElBQW1DLENBQW5DLElBQXNDLE9BQU9ELElBQVAsQ0FBWWhCLEVBQUMsQ0FBQ21DLEtBQUYsQ0FBUXBDLENBQUMsQ0FBQ2tCLGVBQVYsRUFBMEIsQ0FBQ2xCLENBQUMsQ0FBQ3FCLGFBQUgsR0FBaUIsQ0FBakIsSUFBb0IsR0FBOUMsQ0FBWixDQUFqRTtBQUFrSSxLQUF2SyxFQUF3S1osQ0FBQyxHQUFDLENBQTFLLEVBQTRLRyxDQUFDLEdBQUNJLENBQUMsQ0FBQ0ksTUFBcEwsRUFBMkxYLENBQUMsR0FBQ0csQ0FBN0wsRUFBK0xILENBQUMsRUFBaE07QUFBbU1ELE1BQUFBLENBQUMsQ0FBQ08sQ0FBQyxHQUFDQyxDQUFDLENBQUNQLENBQUQsQ0FBSixDQUFELElBQVcsY0FBWUMsQ0FBQyxDQUFDeUIsTUFBekIsSUFBaUMsY0FBWXBCLENBQUMsQ0FBQ29CLE1BQWQsSUFBc0IsY0FBWXpCLENBQUMsQ0FBQ3lCLE1BQXJFLElBQTZFekIsQ0FBQyxDQUFDVyxhQUFGLEdBQWdCTixDQUFDLENBQUNNLGFBQWxCLEVBQWdDWCxDQUFDLENBQUNZLFlBQUYsR0FBZVAsQ0FBQyxDQUFDTyxZQUE5SCxLQUE2SUssQ0FBQyxDQUFDSixJQUFGLENBQU9SLENBQVAsR0FBVUwsQ0FBQyxHQUFDSyxDQUF6SjtBQUFuTTs7QUFBK1YsV0FBT1ksQ0FBUDtBQUFTLEdBQTM0RixFQUE0NEZ6QixDQUFDLEdBQUMsV0FBU0YsQ0FBVCxFQUFXQyxDQUFYLEVBQWFDLEVBQWIsRUFBZTtBQUFDLFFBQUlDLENBQUosRUFBTUMsQ0FBTixFQUFRQyxDQUFSLEVBQVVDLENBQVYsRUFBWUMsQ0FBWixFQUFjQyxDQUFkOztBQUFnQixTQUFJRixDQUFDLEdBQUMsS0FBSyxDQUFQLEVBQVNELENBQUMsR0FBQ0QsQ0FBQyxHQUFDLENBQWIsRUFBZUcsQ0FBQyxHQUFDLENBQUNOLENBQUMsR0FBQ0EsQ0FBQyxDQUFDbUMsS0FBRixDQUFRcEMsQ0FBUixFQUFVLENBQUNDLENBQUMsQ0FBQ21CLE1BQUgsR0FBVSxDQUFWLElBQWEsR0FBdkIsQ0FBSCxFQUFnQ0EsTUFBckQsRUFBNERoQixDQUFDLEdBQUNHLENBQUYsS0FBTUMsQ0FBQyxHQUFDUCxDQUFDLENBQUNJLENBQUQsQ0FBSCxFQUFPLENBQUMsQ0FBRCxNQUFNRixDQUFDLEdBQUNELEVBQUMsQ0FBQ00sQ0FBRCxDQUFULE1BQWdCRixDQUFDLEdBQUNELENBQWxCLENBQVAsRUFBNEIsQ0FBQyxDQUFELEtBQUtGLENBQXZDLENBQTVELEVBQXNHRSxDQUFDLEdBQUMsRUFBRUQsQ0FBMUc7QUFBNEc7QUFBNUc7O0FBQTZHLFdBQU8sUUFBTUUsQ0FBTixHQUFRTCxDQUFDLENBQUNtQyxLQUFGLENBQVEsQ0FBUixFQUFVLENBQUM5QixDQUFELEdBQUcsQ0FBSCxJQUFNLEdBQWhCLENBQVIsR0FBNkIsRUFBcEM7QUFBdUMsR0FBbGtHLEVBQW1rR1UsQ0FBQyxHQUFDLFdBQVNoQixDQUFULEVBQVdDLENBQVgsRUFBYTtBQUFDLFFBQUlFLENBQUosRUFBTUMsQ0FBTixFQUFRQyxDQUFSLEVBQVVDLENBQVYsRUFBWUMsQ0FBWjs7QUFBYyxTQUFJRCxDQUFDLEdBQUMsRUFBRixFQUFLRCxDQUFDLEdBQUMsQ0FBUCxFQUFTRixDQUFDLEdBQUNGLENBQUMsQ0FBQ21CLE1BQWpCLElBQTBCO0FBQUMsVUFBR2YsQ0FBQyxJQUFFRixDQUFOLEVBQVE7QUFBTSxVQUFHQyxDQUFDLEdBQUNGLENBQUMsQ0FBQ0csQ0FBRCxFQUFHSixDQUFILEVBQUtXLENBQUwsQ0FBSCxFQUFXUCxDQUFDLElBQUVELENBQUMsQ0FBQ2dCLE1BQWhCLEVBQXVCLE1BQUloQixDQUFDLENBQUNnQixNQUFOLEtBQWVkLENBQUMsSUFBRSxNQUFJTixDQUFKLEdBQU0sR0FBTixHQUFVSSxDQUFDLENBQUNpQyxJQUFGLENBQU8sRUFBUCxDQUFWLEdBQXFCLElBQXJCLEdBQTBCckMsQ0FBMUIsR0FBNEIsR0FBOUMsQ0FBdkIsRUFBMEVLLENBQUMsSUFBRUYsQ0FBaEYsRUFBa0Y7QUFBTUUsTUFBQUEsQ0FBQyxJQUFFLENBQUNFLENBQUMsR0FBQ0wsQ0FBQyxDQUFDRyxDQUFELEVBQUdKLENBQUgsRUFBS1MsQ0FBTCxDQUFKLEVBQWFVLE1BQWhCLEVBQXVCZCxDQUFDLElBQUVDLENBQUMsQ0FBQzhCLElBQUYsQ0FBTyxFQUFQLENBQTFCO0FBQXFDOztBQUFBLFdBQU8vQixDQUFQO0FBQVMsR0FBaHhHLEVBQWl4RyxDQUFDTyxDQUFDLEdBQUM7QUFBQ3lCLElBQUFBLEtBQUssRUFBQyxlQUFTdEMsQ0FBVCxFQUFXQyxDQUFYLEVBQWFDLENBQWIsRUFBZTtBQUFDLGFBQU9ELENBQUMsQ0FBQ21DLEtBQUYsQ0FBUXBDLENBQUMsQ0FBQ2tCLGVBQVYsRUFBMEIsQ0FBQ2xCLENBQUMsQ0FBQ3FCLGFBQUgsR0FBaUIsQ0FBakIsSUFBb0IsR0FBOUMsRUFBbURnQixJQUFuRCxDQUF3RCxFQUF4RCxDQUFQO0FBQW1FLEtBQTFGO0FBQTJGRSxJQUFBQSxNQUFNLEVBQUMsZ0JBQVN2QyxDQUFULEVBQVdDLENBQVgsRUFBYUMsQ0FBYixFQUFlO0FBQUMsVUFBSUMsQ0FBSjtBQUFNLGFBQU9BLENBQUMsR0FBQ0QsQ0FBQyxDQUFDa0MsS0FBRixDQUFRcEMsQ0FBQyxDQUFDbUIsY0FBVixFQUF5QixDQUFDbkIsQ0FBQyxDQUFDc0IsWUFBSCxHQUFnQixDQUFoQixJQUFtQixHQUE1QyxDQUFGLEVBQW1ETixDQUFDLENBQUMsS0FBRCxFQUFPYixDQUFQLENBQTNEO0FBQXFFLEtBQTdMO0FBQThMLGNBQU8saUJBQVNILENBQVQsRUFBV0MsQ0FBWCxFQUFhQyxDQUFiLEVBQWU7QUFBQyxVQUFJQyxDQUFKO0FBQU0sYUFBT0EsQ0FBQyxHQUFDRixDQUFDLENBQUNtQyxLQUFGLENBQVFwQyxDQUFDLENBQUNrQixlQUFWLEVBQTBCLENBQUNsQixDQUFDLENBQUNxQixhQUFILEdBQWlCLENBQWpCLElBQW9CLEdBQTlDLENBQUYsRUFBcURMLENBQUMsQ0FBQyxLQUFELEVBQU9iLENBQVAsQ0FBN0Q7QUFBdUU7QUFBbFMsR0FBSCxFQUF3U3FDLE9BQXhTLEdBQWdULFVBQVN4QyxDQUFULEVBQVdDLENBQVgsRUFBYUMsQ0FBYixFQUFlO0FBQUMsV0FBT1csQ0FBQyxVQUFELENBQVNiLENBQVQsRUFBV0MsQ0FBWCxFQUFhQyxDQUFiLElBQWdCVyxDQUFDLENBQUMwQixNQUFGLENBQVN2QyxDQUFULEVBQVdDLENBQVgsRUFBYUMsQ0FBYixDQUF2QjtBQUF1QyxHQUF4bkgsRUFBeW5IYSxDQUFDLEdBQUMsV0FBU2YsQ0FBVCxFQUFXQyxDQUFYLEVBQWFDLENBQWIsRUFBZTtBQUFDLFFBQUlDLENBQUosRUFBTUMsQ0FBTixFQUFRQyxDQUFSLEVBQVVDLENBQVY7O0FBQVksU0FBSUEsQ0FBQyxHQUFDLEVBQUYsRUFBS0gsQ0FBQyxHQUFDLENBQVAsRUFBU0MsQ0FBQyxHQUFDRixDQUFDLENBQUNrQixNQUFqQixFQUF3QmpCLENBQUMsR0FBQ0MsQ0FBMUIsRUFBNEJELENBQUMsRUFBN0I7QUFBZ0NFLE1BQUFBLENBQUMsR0FBQ0gsQ0FBQyxDQUFDQyxDQUFELENBQUgsRUFBT0csQ0FBQyxJQUFFTyxDQUFDLENBQUNSLENBQUMsQ0FBQzhCLE1BQUgsQ0FBRCxDQUFZOUIsQ0FBWixFQUFjTCxDQUFkLEVBQWdCQyxDQUFoQixDQUFWO0FBQWhDOztBQUE2RCxXQUFPSyxDQUFQO0FBQVMsR0FBN3RILEVBQTh0SCxDQUFDRixDQUFDLEdBQUMsV0FBU0osQ0FBVCxFQUFXRSxDQUFYLEVBQWE7QUFBQyxRQUFJQyxDQUFKO0FBQU0sV0FBT0gsQ0FBQyxLQUFHRSxDQUFKLEdBQU1GLENBQU4sSUFBU0EsQ0FBQyxHQUFDTyxDQUFDLENBQUNQLENBQUQsQ0FBSCxFQUFPRSxDQUFDLEdBQUNLLENBQUMsQ0FBQ0wsQ0FBRCxDQUFWLEVBQWNDLENBQUMsR0FBQ0YsQ0FBQyxDQUFDRCxDQUFELEVBQUdFLENBQUgsQ0FBakIsRUFBdUJhLENBQUMsQ0FBQ2YsQ0FBRCxFQUFHRSxDQUFILEVBQUtDLENBQUwsQ0FBakMsQ0FBUDtBQUFpRCxHQUF4RSxFQUEwRXNDLGNBQTFFLEdBQXlGbEMsQ0FBdnpILEVBQXl6SEgsQ0FBQyxDQUFDc0Msb0JBQUYsR0FBdUJwQyxDQUFoMUgsRUFBazFIQSxDQUFDLENBQUNxQyxVQUFGLEdBQWF0QyxDQUEvMUgsRUFBaTJIQyxDQUFDLENBQUNzQyxZQUFGLEdBQWV6QyxDQUFoM0gsRUFBazNIQyxDQUFDLENBQUN5QyxvQkFBRixHQUF1QjVDLENBQXo0SCxFQUEyNEhHLENBQUMsQ0FBQzBDLGlCQUFGLEdBQW9CL0IsQ0FBLzVILEVBQWk2SCxRQUEwQmdDLGlDQUFPLEVBQUQsbUNBQUksWUFBVTtBQUFDLFdBQU8zQyxDQUFQO0FBQVMsR0FBeEI7QUFBQSxrR0FBaEMsR0FBMEQsQ0FBMzlIO0FBQXNrSSxDQUF2bkksRUFBRDs7Ozs7Ozs7OztBQ05BOEMsTUFBTSxDQUFDQyxnQkFBUCxDQUF3QixrQkFBeEIsRUFBNEMsVUFBQUMsS0FBSyxFQUFJO0FBQ2pEO0FBQ0E7QUFFQSxNQUFNQyxnQkFBZ0IsR0FBR0MsUUFBUSxDQUFDQyxjQUFULENBQXdCLGtCQUF4QixDQUF6Qjs7QUFDQSxNQUFJRixnQkFBSixFQUFzQjtBQUNsQixRQUFJRyxnQkFBZ0IsQ0FBQ0MsU0FBckIsQ0FBK0JKLGdCQUEvQjtBQUNIO0FBQ0osQ0FSRDs7Ozs7Ozs7OztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDSTtBQUNKO0FBQ0E7QUFFQUgsTUFBTSxDQUFDQyxnQkFBUCxDQUF3QixrQkFBeEIsRUFBNEMsVUFBQUMsS0FBSyxFQUFJO0FBRWpEO0FBQ0EsTUFBTU0sYUFBYSxHQUFHSixRQUFRLENBQUNLLElBQVQsQ0FBY0MsYUFBZCxDQUE0QixnQkFBNUIsQ0FBdEI7O0FBQ0EsTUFBSUYsYUFBSixFQUFtQjtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0FBLElBQUFBLGFBQWEsQ0FBQ1AsZ0JBQWQsQ0FBK0IsT0FBL0IsRUFBd0MsVUFBQUMsS0FBSyxFQUFJO0FBQzdDQSxNQUFBQSxLQUFLLENBQUNTLGNBQU47QUFDQVAsTUFBQUEsUUFBUSxDQUFDSyxJQUFULENBQWNHLFNBQWQsQ0FBd0JDLE1BQXhCLENBQStCLG9CQUEvQjtBQUNBQyxNQUFBQSxZQUFZLENBQUNDLE9BQWIsQ0FBcUIsbUJBQXJCLEVBQTBDWCxRQUFRLENBQUNLLElBQVQsQ0FBY0csU0FBZCxDQUF3QkksUUFBeEIsQ0FBaUMsb0JBQWpDLENBQTFDO0FBQ0gsS0FKRDtBQUtIO0FBRUosQ0FoQkQ7Ozs7Ozs7Ozs7QUNUQSxZQUFZLG1CQUFPLENBQUMscUVBQW9CO0FBQ3hDLHNCQUFzQixtQkFBTyxDQUFDLDZGQUFnQztBQUM5RCxpQkFBaUIsbUJBQU8sQ0FBQyw2RkFBZ0M7O0FBRXpEOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2Y7QUFDQTtBQUNBLEdBQUc7QUFDSDs7Ozs7Ozs7Ozs7O0FDbEJhO0FBQ2Isb0JBQW9CLG1CQUFPLENBQUMseUZBQThCO0FBQzFELDJCQUEyQixtQkFBTyxDQUFDLHVHQUFxQztBQUN4RSwrQkFBK0IsbUJBQU8sQ0FBQywrR0FBeUM7O0FBRWhGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ1RhO0FBQ2IsUUFBUSxtQkFBTyxDQUFDLHVFQUFxQjtBQUNyQyxjQUFjLG1CQUFPLENBQUMsMkVBQXVCO0FBQzdDLG9CQUFvQixtQkFBTyxDQUFDLHVGQUE2QjtBQUN6RCxlQUFlLG1CQUFPLENBQUMsNkVBQXdCO0FBQy9DLHNCQUFzQixtQkFBTyxDQUFDLDZGQUFnQztBQUM5RCx3QkFBd0IsbUJBQU8sQ0FBQyxtR0FBbUM7QUFDbkUsc0JBQXNCLG1CQUFPLENBQUMsNkZBQWdDO0FBQzlELHFCQUFxQixtQkFBTyxDQUFDLHlGQUE4QjtBQUMzRCxzQkFBc0IsbUJBQU8sQ0FBQyw2RkFBZ0M7QUFDOUQsbUNBQW1DLG1CQUFPLENBQUMsMkhBQStDOztBQUUxRjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBSSw0REFBNEQ7QUFDaEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsU0FBUztBQUN6QjtBQUNBO0FBQ0E7QUFDQSxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2FkbWluL2FkbWluLmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9hZG1pbi9saWIvaHRtbGRpZmYuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2FkbWluL2xpYi9zdGFydGJvb3RzdHJhcC1zYi1hZG1pbi1naC1wYWdlcy9qcy9kYXRhdGFibGVzLXNpbXBsZS1kZW1vLmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9hZG1pbi9saWIvc3RhcnRib290c3RyYXAtc2ItYWRtaW4tZ2gtcGFnZXMvanMvc2NyaXB0cy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvYXJyYXktbWV0aG9kLWhhcy1zcGVjaWVzLXN1cHBvcnQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2NyZWF0ZS1wcm9wZXJ0eS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzLmFycmF5LnNsaWNlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIGNvbnN0IERpZmYySHRtbCA9IHJlcXVpcmUoJ2RpZmYyaHRtbCcpO1xuaW1wb3J0IGh0bWxkaWZmIGZyb20gJy4vbGliL2h0bWxkaWZmJztcbnJlcXVpcmUoJy4vbGliL3N0YXJ0Ym9vdHN0cmFwLXNiLWFkbWluLWdoLXBhZ2VzL2pzL3NjcmlwdHMnKVxucmVxdWlyZSgnLi9saWIvc3RhcnRib290c3RyYXAtc2ItYWRtaW4tZ2gtcGFnZXMvanMvZGF0YXRhYmxlcy1zaW1wbGUtZGVtbycpXG5cbiQuZWFjaCgkKCcuZ2l0LWRpZmYnKSwgZnVuY3Rpb24gKGtleSwgaXRlbSkge1xuICAgIGl0ZW0gPSAkKGl0ZW0pO1xuICAgIGxldCBvcmlnaW5hbEhUTUwgPSBpdGVtLmZpbmQoJy5jdXJyZW50JykuaHRtbCgpO1xuICAgIGxldCBuZXdIVE1MID0gaXRlbS5maW5kKCcuZmluYWwnKS5odG1sKCk7XG5cbiAgICBsZXQgb3V0cHV0ID0gaHRtbGRpZmYob3JpZ2luYWxIVE1MLCBuZXdIVE1MKTtcblxuICAgIGl0ZW0uZmluZCgnLmZpbmFsJykuaHRtbChvdXRwdXQpXG59KVxuXG4vLyBsZXQgb3JpZ2luYWxIVE1MID0gJCgnLmN1cnJlbnQnKS5odG1sKCk7XG4vLyBsZXQgbmV3SFRNTCA9ICQoJy5maW5hbCcpLmh0bWwoKTtcbi8vXG4vLyBsZXQgb3V0cHV0ID0gaHRtbGRpZmYob3JpZ2luYWxIVE1MLCBuZXdIVE1MKTtcbi8vXG4vLyAkKCcuZmluYWwnKS5odG1sKG91dHB1dClcbi8vXG4vL1xuLy8gbGV0IG9yaWdpbmFsSFRNTEV4aWYgPSAkKCcuY3VycmVudC1leGlmJykuaHRtbCgpO1xuLy8gbGV0IG5ld0hUTUxFeGlmID0gJCgnLmZpbmFsLWV4aWYnKS5odG1sKCk7XG4vL1xuLy8gbGV0IG91dHB1dEV4aWYgPSBodG1sZGlmZihvcmlnaW5hbEhUTUxFeGlmLCBuZXdIVE1MRXhpZik7XG4vL1xuLy8gJCgnLmZpbmFsLWV4aWYnKS5odG1sKG91dHB1dEV4aWYpIiwiLyoqXG4gKiBodG1sZGlmZi5qcyBhIGRpZmYgYWxnb3JpdGhtIHRoYXQgdW5kZXJzdGFuZHMgSFRNTCwgYW5kIHByb2R1Y2VzIEhUTUwgaW4gdGhlIGJyb3dzZXIuXG4gKlxuICogQGF1dGhvciBodHRwczovL2dpdGh1Yi5jb20vdG53aW5jXG4gKiBAc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS90bndpbmMvaHRtbGRpZmYuanNcbiAqL1xuIWZ1bmN0aW9uKCl7dmFyIGUsbix0LHIsaSxmLF8sYSxvLHMsdSxoLGwsYyxkLGIscDtvPWZ1bmN0aW9uKGUpe3JldHVyblwiPlwiPT09ZX0scz1mdW5jdGlvbihlKXtyZXR1cm5cIjxcIj09PWV9LGg9ZnVuY3Rpb24oZSl7cmV0dXJuL15cXHMrJC8udGVzdChlKX0sdT1mdW5jdGlvbihlKXtyZXR1cm4vXlxccyo8W14+XSs+XFxzKiQvLnRlc3QoZSl9LGw9ZnVuY3Rpb24oZSl7cmV0dXJuIXUoZSl9LGU9ZnVuY3Rpb24oKXtyZXR1cm4gZnVuY3Rpb24oZSxuLHQpe3RoaXMuc3RhcnRfaW5fYmVmb3JlPWUsdGhpcy5zdGFydF9pbl9hZnRlcj1uLHRoaXMubGVuZ3RoPXQsdGhpcy5lbmRfaW5fYmVmb3JlPXRoaXMuc3RhcnRfaW5fYmVmb3JlK3RoaXMubGVuZ3RoLTEsdGhpcy5lbmRfaW5fYWZ0ZXI9dGhpcy5zdGFydF9pbl9hZnRlcit0aGlzLmxlbmd0aC0xfX0oKSxhPWZ1bmN0aW9uKGUpe3ZhciBuLHQscixpLGYsXztmb3IoZj1cImNoYXJcIix0PVwiXCIsXz1bXSxyPTAsaT1lLmxlbmd0aDtyPGk7cisrKXN3aXRjaChuPWVbcl0sZil7Y2FzZVwidGFnXCI6byhuKT8odCs9XCI+XCIsXy5wdXNoKHQpLHQ9XCJcIixmPWgobik/XCJ3aGl0ZXNwYWNlXCI6XCJjaGFyXCIpOnQrPW47YnJlYWs7Y2FzZVwiY2hhclwiOnMobik/KHQmJl8ucHVzaCh0KSx0PVwiPFwiLGY9XCJ0YWdcIik6L1xccy8udGVzdChuKT8odCYmXy5wdXNoKHQpLHQ9bixmPVwid2hpdGVzcGFjZVwiKTovW1xcd1xcI0BdKy9pLnRlc3Qobik/dCs9bjoodCYmXy5wdXNoKHQpLHQ9bik7YnJlYWs7Y2FzZVwid2hpdGVzcGFjZVwiOnMobik/KHQmJl8ucHVzaCh0KSx0PVwiPFwiLGY9XCJ0YWdcIik6aChuKT90Kz1uOih0JiZfLnB1c2godCksdD1uLGY9XCJjaGFyXCIpO2JyZWFrO2RlZmF1bHQ6dGhyb3cgbmV3IEVycm9yKFwiVW5rbm93biBtb2RlIFwiK2YpfXJldHVybiB0JiZfLnB1c2godCksX30sZj1mdW5jdGlvbihuLHQscixpLGYsXyxhKXt2YXIgbyxzLHUsaCxsLGMsZCxiLHAsZyx3LHYsayxtLHk7Zm9yKHM9aSxvPV8sdT0wLHc9e30sYz1oPW09aSx5PWY7bTw9eT9oPHk6aD55O2M9bTw9eT8rK2g6LS1oKXtmb3Ioaz17fSxkPTAsYj0ocD1yW25bY11dKS5sZW5ndGg7ZDxiO2QrKylpZighKChsPXBbZF0pPF8pKXtpZihsPj1hKWJyZWFrO251bGw9PXdbbC0xXSYmKHdbbC0xXT0wKSx2PXdbbC0xXSsxLGtbbF09dix2PnUmJihzPWMtdisxLG89bC12KzEsdT12KX13PWt9cmV0dXJuIDAhPT11JiYoZz1uZXcgZShzLG8sdSkpLGd9LGQ9ZnVuY3Rpb24oZSxuLHQscixpLF8sYSxvKXt2YXIgcztyZXR1cm4gbnVsbCE9KHM9ZihlLDAsdCxyLGksXyxhKSkmJihyPHMuc3RhcnRfaW5fYmVmb3JlJiZfPHMuc3RhcnRfaW5fYWZ0ZXImJmQoZSxuLHQscixzLnN0YXJ0X2luX2JlZm9yZSxfLHMuc3RhcnRfaW5fYWZ0ZXIsbyksby5wdXNoKHMpLHMuZW5kX2luX2JlZm9yZTw9aSYmcy5lbmRfaW5fYWZ0ZXI8PWEmJmQoZSxuLHQscy5lbmRfaW5fYmVmb3JlKzEsaSxzLmVuZF9pbl9hZnRlcisxLGEsbykpLG99LHI9ZnVuY3Rpb24oZSl7dmFyIG4sdCxyLGksZixfO2lmKG51bGw9PWUuZmluZF90aGVzZSl0aHJvdyBuZXcgRXJyb3IoXCJwYXJhbXMgbXVzdCBoYXZlIGZpbmRfdGhlc2Uga2V5XCIpO2lmKG51bGw9PWUuaW5fdGhlc2UpdGhyb3cgbmV3IEVycm9yKFwicGFyYW1zIG11c3QgaGF2ZSBpbl90aGVzZSBrZXlcIik7Zm9yKHI9e30sbj0wLGk9KGY9ZS5maW5kX3RoZXNlKS5sZW5ndGg7bjxpO24rKylmb3IocltfPWZbbl1dPVtdLHQ9ZS5pbl90aGVzZS5pbmRleE9mKF8pOy0xIT09dDspcltfXS5wdXNoKHQpLHQ9ZS5pbl90aGVzZS5pbmRleE9mKF8sdCsxKTtyZXR1cm4gcn0sXz1mdW5jdGlvbihlLG4pe3ZhciB0LGk7cmV0dXJuIGk9W10sdD1yKHtmaW5kX3RoZXNlOmUsaW5fdGhlc2U6bn0pLGQoZSxuLHQsMCxlLmxlbmd0aCwwLG4ubGVuZ3RoLGkpfSxuPWZ1bmN0aW9uKG4sdCl7dmFyIHIsaSxmLGEsbyxzLHUsaCxsLGMsZCxiLHAsZyx3LHY7aWYobnVsbD09bil0aHJvdyBuZXcgRXJyb3IoXCJiZWZvcmVfdG9rZW5zP1wiKTtpZihudWxsPT10KXRocm93IG5ldyBFcnJvcihcImFmdGVyX3Rva2Vucz9cIik7Zm9yKHc9Zz0wLHA9W10scj17XCJmYWxzZSxmYWxzZVwiOlwicmVwbGFjZVwiLFwidHJ1ZSxmYWxzZVwiOlwiaW5zZXJ0XCIsXCJmYWxzZSx0cnVlXCI6XCJkZWxldGVcIixcInRydWUsdHJ1ZVwiOlwibm9uZVwifSwoZD1fKG4sdCkpLnB1c2gobmV3IGUobi5sZW5ndGgsdC5sZW5ndGgsMCkpLGE9Zj0wLGg9ZC5sZW5ndGg7ZjxoO2E9KytmKVwibm9uZVwiIT09KGk9cltbdz09PShjPWRbYV0pLnN0YXJ0X2luX2JlZm9yZSxnPT09Yy5zdGFydF9pbl9hZnRlcl0udG9TdHJpbmcoKV0pJiZwLnB1c2goe2FjdGlvbjppLHN0YXJ0X2luX2JlZm9yZTp3LGVuZF9pbl9iZWZvcmU6XCJpbnNlcnRcIiE9PWk/Yy5zdGFydF9pbl9iZWZvcmUtMTp2b2lkIDAsc3RhcnRfaW5fYWZ0ZXI6ZyxlbmRfaW5fYWZ0ZXI6XCJkZWxldGVcIiE9PWk/Yy5zdGFydF9pbl9hZnRlci0xOnZvaWQgMH0pLDAhPT1jLmxlbmd0aCYmcC5wdXNoKHthY3Rpb246XCJlcXVhbFwiLHN0YXJ0X2luX2JlZm9yZTpjLnN0YXJ0X2luX2JlZm9yZSxlbmRfaW5fYmVmb3JlOmMuZW5kX2luX2JlZm9yZSxzdGFydF9pbl9hZnRlcjpjLnN0YXJ0X2luX2FmdGVyLGVuZF9pbl9hZnRlcjpjLmVuZF9pbl9hZnRlcn0pLHc9Yy5lbmRfaW5fYmVmb3JlKzEsZz1jLmVuZF9pbl9hZnRlcisxO2Zvcih2PVtdLHU9e2FjdGlvbjpcIm5vbmVcIn0sbz1mdW5jdGlvbihlKXtyZXR1cm5cImVxdWFsXCI9PT1lLmFjdGlvbiYmKGUuZW5kX2luX2JlZm9yZS1lLnN0YXJ0X2luX2JlZm9yZT09MCYmL15cXHMkLy50ZXN0KG4uc2xpY2UoZS5zdGFydF9pbl9iZWZvcmUsK2UuZW5kX2luX2JlZm9yZSsxfHw5ZTkpKSl9LHM9MCxsPXAubGVuZ3RoO3M8bDtzKyspbyhiPXBbc10pJiZcInJlcGxhY2VcIj09PXUuYWN0aW9ufHxcInJlcGxhY2VcIj09PWIuYWN0aW9uJiZcInJlcGxhY2VcIj09PXUuYWN0aW9uPyh1LmVuZF9pbl9iZWZvcmU9Yi5lbmRfaW5fYmVmb3JlLHUuZW5kX2luX2FmdGVyPWIuZW5kX2luX2FmdGVyKToodi5wdXNoKGIpLHU9Yik7cmV0dXJuIHZ9LHQ9ZnVuY3Rpb24oZSxuLHQpe3ZhciByLGksZixfLGEsbztmb3IoXz12b2lkIDAsZj1pPTAsYT0obj1uLnNsaWNlKGUsK24ubGVuZ3RoKzF8fDllOSkpLmxlbmd0aDtpPGEmJihvPW5bZl0sITA9PT0ocj10KG8pKSYmKF89ZiksITEhPT1yKTtmPSsraSk7cmV0dXJuIG51bGwhPV8/bi5zbGljZSgwLCtfKzF8fDllOSk6W119LHA9ZnVuY3Rpb24oZSxuKXt2YXIgcixpLGYsXyxhO2ZvcihfPVwiXCIsZj0wLHI9bi5sZW5ndGg7Oyl7aWYoZj49cilicmVhaztpZihpPXQoZixuLGwpLGYrPWkubGVuZ3RoLDAhPT1pLmxlbmd0aCYmKF8rPVwiPFwiK2UrXCI+XCIraS5qb2luKFwiXCIpK1wiPC9cIitlK1wiPlwiKSxmPj1yKWJyZWFrO2YrPShhPXQoZixuLHUpKS5sZW5ndGgsXys9YS5qb2luKFwiXCIpfXJldHVybiBffSwoYz17ZXF1YWw6ZnVuY3Rpb24oZSxuLHQpe3JldHVybiBuLnNsaWNlKGUuc3RhcnRfaW5fYmVmb3JlLCtlLmVuZF9pbl9iZWZvcmUrMXx8OWU5KS5qb2luKFwiXCIpfSxpbnNlcnQ6ZnVuY3Rpb24oZSxuLHQpe3ZhciByO3JldHVybiByPXQuc2xpY2UoZS5zdGFydF9pbl9hZnRlciwrZS5lbmRfaW5fYWZ0ZXIrMXx8OWU5KSxwKFwiaW5zXCIscil9LGRlbGV0ZTpmdW5jdGlvbihlLG4sdCl7dmFyIHI7cmV0dXJuIHI9bi5zbGljZShlLnN0YXJ0X2luX2JlZm9yZSwrZS5lbmRfaW5fYmVmb3JlKzF8fDllOSkscChcImRlbFwiLHIpfX0pLnJlcGxhY2U9ZnVuY3Rpb24oZSxuLHQpe3JldHVybiBjLmRlbGV0ZShlLG4sdCkrYy5pbnNlcnQoZSxuLHQpfSxiPWZ1bmN0aW9uKGUsbix0KXt2YXIgcixpLGYsXztmb3IoXz1cIlwiLHI9MCxpPXQubGVuZ3RoO3I8aTtyKyspZj10W3JdLF8rPWNbZi5hY3Rpb25dKGYsZSxuKTtyZXR1cm4gX30sKGk9ZnVuY3Rpb24oZSx0KXt2YXIgcjtyZXR1cm4gZT09PXQ/ZTooZT1hKGUpLHQ9YSh0KSxyPW4oZSx0KSxiKGUsdCxyKSl9KS5odG1sX3RvX3Rva2Vucz1hLGkuZmluZF9tYXRjaGluZ19ibG9ja3M9XyxfLmZpbmRfbWF0Y2g9ZixfLmNyZWF0ZV9pbmRleD1yLGkuY2FsY3VsYXRlX29wZXJhdGlvbnM9bixpLnJlbmRlcl9vcGVyYXRpb25zPWIsXCJmdW5jdGlvblwiPT10eXBlb2YgZGVmaW5lP2RlZmluZShbXSxmdW5jdGlvbigpe3JldHVybiBpfSk6XCJ1bmRlZmluZWRcIiE9dHlwZW9mIG1vZHVsZSYmbnVsbCE9PW1vZHVsZT9tb2R1bGUuZXhwb3J0cz1pOlwidW5kZWZpbmVkXCIhPXR5cGVvZiB3aW5kb3cmJih3aW5kb3cuaHRtbGRpZmY9aSl9KCk7Iiwid2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBldmVudCA9PiB7XG4gICAgLy8gU2ltcGxlLURhdGFUYWJsZXNcbiAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vZmlkdXN3cml0ZXIvU2ltcGxlLURhdGFUYWJsZXMvd2lraVxuXG4gICAgY29uc3QgZGF0YXRhYmxlc1NpbXBsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkYXRhdGFibGVzU2ltcGxlJyk7XG4gICAgaWYgKGRhdGF0YWJsZXNTaW1wbGUpIHtcbiAgICAgICAgbmV3IHNpbXBsZURhdGF0YWJsZXMuRGF0YVRhYmxlKGRhdGF0YWJsZXNTaW1wbGUpO1xuICAgIH1cbn0pO1xuIiwiLyohXG4gICAgKiBTdGFydCBCb290c3RyYXAgLSBTQiBBZG1pbiB2Ny4wLjQgKGh0dHBzOi8vc3RhcnRib290c3RyYXAuY29tL3RlbXBsYXRlL3NiLWFkbWluKVxuICAgICogQ29weXJpZ2h0IDIwMTMtMjAyMSBTdGFydCBCb290c3RyYXBcbiAgICAqIExpY2Vuc2VkIHVuZGVyIE1JVCAoaHR0cHM6Ly9naXRodWIuY29tL1N0YXJ0Qm9vdHN0cmFwL3N0YXJ0Ym9vdHN0cmFwLXNiLWFkbWluL2Jsb2IvbWFzdGVyL0xJQ0VOU0UpXG4gICAgKi9cbiAgICAvLyBcbi8vIFNjcmlwdHNcbi8vIFxuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGV2ZW50ID0+IHtcblxuICAgIC8vIFRvZ2dsZSB0aGUgc2lkZSBuYXZpZ2F0aW9uXG4gICAgY29uc3Qgc2lkZWJhclRvZ2dsZSA9IGRvY3VtZW50LmJvZHkucXVlcnlTZWxlY3RvcignI3NpZGViYXJUb2dnbGUnKTtcbiAgICBpZiAoc2lkZWJhclRvZ2dsZSkge1xuICAgICAgICAvLyBVbmNvbW1lbnQgQmVsb3cgdG8gcGVyc2lzdCBzaWRlYmFyIHRvZ2dsZSBiZXR3ZWVuIHJlZnJlc2hlc1xuICAgICAgICAvLyBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3NifHNpZGViYXItdG9nZ2xlJykgPT09ICd0cnVlJykge1xuICAgICAgICAvLyAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QudG9nZ2xlKCdzYi1zaWRlbmF2LXRvZ2dsZWQnKTtcbiAgICAgICAgLy8gfVxuICAgICAgICBzaWRlYmFyVG9nZ2xlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZXZlbnQgPT4ge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnRvZ2dsZSgnc2Itc2lkZW5hdi10b2dnbGVkJyk7XG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnc2J8c2lkZWJhci10b2dnbGUnLCBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5jb250YWlucygnc2Itc2lkZW5hdi10b2dnbGVkJykpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbn0pO1xuIiwidmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG52YXIgd2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sJyk7XG52YXIgVjhfVkVSU0lPTiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9lbmdpbmUtdjgtdmVyc2lvbicpO1xuXG52YXIgU1BFQ0lFUyA9IHdlbGxLbm93blN5bWJvbCgnc3BlY2llcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChNRVRIT0RfTkFNRSkge1xuICAvLyBXZSBjYW4ndCB1c2UgdGhpcyBmZWF0dXJlIGRldGVjdGlvbiBpbiBWOCBzaW5jZSBpdCBjYXVzZXNcbiAgLy8gZGVvcHRpbWl6YXRpb24gYW5kIHNlcmlvdXMgcGVyZm9ybWFuY2UgZGVncmFkYXRpb25cbiAgLy8gaHR0cHM6Ly9naXRodWIuY29tL3psb2lyb2NrL2NvcmUtanMvaXNzdWVzLzY3N1xuICByZXR1cm4gVjhfVkVSU0lPTiA+PSA1MSB8fCAhZmFpbHMoZnVuY3Rpb24gKCkge1xuICAgIHZhciBhcnJheSA9IFtdO1xuICAgIHZhciBjb25zdHJ1Y3RvciA9IGFycmF5LmNvbnN0cnVjdG9yID0ge307XG4gICAgY29uc3RydWN0b3JbU1BFQ0lFU10gPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4geyBmb286IDEgfTtcbiAgICB9O1xuICAgIHJldHVybiBhcnJheVtNRVRIT0RfTkFNRV0oQm9vbGVhbikuZm9vICE9PSAxO1xuICB9KTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgdG9Qcm9wZXJ0eUtleSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1wcm9wZXJ0eS1rZXknKTtcbnZhciBkZWZpbmVQcm9wZXJ0eU1vZHVsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZGVmaW5lLXByb3BlcnR5Jyk7XG52YXIgY3JlYXRlUHJvcGVydHlEZXNjcmlwdG9yID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NyZWF0ZS1wcm9wZXJ0eS1kZXNjcmlwdG9yJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG9iamVjdCwga2V5LCB2YWx1ZSkge1xuICB2YXIgcHJvcGVydHlLZXkgPSB0b1Byb3BlcnR5S2V5KGtleSk7XG4gIGlmIChwcm9wZXJ0eUtleSBpbiBvYmplY3QpIGRlZmluZVByb3BlcnR5TW9kdWxlLmYob2JqZWN0LCBwcm9wZXJ0eUtleSwgY3JlYXRlUHJvcGVydHlEZXNjcmlwdG9yKDAsIHZhbHVlKSk7XG4gIGVsc2Ugb2JqZWN0W3Byb3BlcnR5S2V5XSA9IHZhbHVlO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciAkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2V4cG9ydCcpO1xudmFyIGlzQXJyYXkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtYXJyYXknKTtcbnZhciBpc0NvbnN0cnVjdG9yID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLWNvbnN0cnVjdG9yJyk7XG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtb2JqZWN0Jyk7XG52YXIgdG9BYnNvbHV0ZUluZGV4ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWFic29sdXRlLWluZGV4Jyk7XG52YXIgbGVuZ3RoT2ZBcnJheUxpa2UgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvbGVuZ3RoLW9mLWFycmF5LWxpa2UnKTtcbnZhciB0b0luZGV4ZWRPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8taW5kZXhlZC1vYmplY3QnKTtcbnZhciBjcmVhdGVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jcmVhdGUtcHJvcGVydHknKTtcbnZhciB3ZWxsS25vd25TeW1ib2wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvd2VsbC1rbm93bi1zeW1ib2wnKTtcbnZhciBhcnJheU1ldGhvZEhhc1NwZWNpZXNTdXBwb3J0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LW1ldGhvZC1oYXMtc3BlY2llcy1zdXBwb3J0Jyk7XG5cbnZhciBIQVNfU1BFQ0lFU19TVVBQT1JUID0gYXJyYXlNZXRob2RIYXNTcGVjaWVzU3VwcG9ydCgnc2xpY2UnKTtcblxudmFyIFNQRUNJRVMgPSB3ZWxsS25vd25TeW1ib2woJ3NwZWNpZXMnKTtcbnZhciBuYXRpdmVTbGljZSA9IFtdLnNsaWNlO1xudmFyIG1heCA9IE1hdGgubWF4O1xuXG4vLyBgQXJyYXkucHJvdG90eXBlLnNsaWNlYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtYXJyYXkucHJvdG90eXBlLnNsaWNlXG4vLyBmYWxsYmFjayBmb3Igbm90IGFycmF5LWxpa2UgRVMzIHN0cmluZ3MgYW5kIERPTSBvYmplY3RzXG4kKHsgdGFyZ2V0OiAnQXJyYXknLCBwcm90bzogdHJ1ZSwgZm9yY2VkOiAhSEFTX1NQRUNJRVNfU1VQUE9SVCB9LCB7XG4gIHNsaWNlOiBmdW5jdGlvbiBzbGljZShzdGFydCwgZW5kKSB7XG4gICAgdmFyIE8gPSB0b0luZGV4ZWRPYmplY3QodGhpcyk7XG4gICAgdmFyIGxlbmd0aCA9IGxlbmd0aE9mQXJyYXlMaWtlKE8pO1xuICAgIHZhciBrID0gdG9BYnNvbHV0ZUluZGV4KHN0YXJ0LCBsZW5ndGgpO1xuICAgIHZhciBmaW4gPSB0b0Fic29sdXRlSW5kZXgoZW5kID09PSB1bmRlZmluZWQgPyBsZW5ndGggOiBlbmQsIGxlbmd0aCk7XG4gICAgLy8gaW5saW5lIGBBcnJheVNwZWNpZXNDcmVhdGVgIGZvciB1c2FnZSBuYXRpdmUgYEFycmF5I3NsaWNlYCB3aGVyZSBpdCdzIHBvc3NpYmxlXG4gICAgdmFyIENvbnN0cnVjdG9yLCByZXN1bHQsIG47XG4gICAgaWYgKGlzQXJyYXkoTykpIHtcbiAgICAgIENvbnN0cnVjdG9yID0gTy5jb25zdHJ1Y3RvcjtcbiAgICAgIC8vIGNyb3NzLXJlYWxtIGZhbGxiYWNrXG4gICAgICBpZiAoaXNDb25zdHJ1Y3RvcihDb25zdHJ1Y3RvcikgJiYgKENvbnN0cnVjdG9yID09PSBBcnJheSB8fCBpc0FycmF5KENvbnN0cnVjdG9yLnByb3RvdHlwZSkpKSB7XG4gICAgICAgIENvbnN0cnVjdG9yID0gdW5kZWZpbmVkO1xuICAgICAgfSBlbHNlIGlmIChpc09iamVjdChDb25zdHJ1Y3RvcikpIHtcbiAgICAgICAgQ29uc3RydWN0b3IgPSBDb25zdHJ1Y3RvcltTUEVDSUVTXTtcbiAgICAgICAgaWYgKENvbnN0cnVjdG9yID09PSBudWxsKSBDb25zdHJ1Y3RvciA9IHVuZGVmaW5lZDtcbiAgICAgIH1cbiAgICAgIGlmIChDb25zdHJ1Y3RvciA9PT0gQXJyYXkgfHwgQ29uc3RydWN0b3IgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gbmF0aXZlU2xpY2UuY2FsbChPLCBrLCBmaW4pO1xuICAgICAgfVxuICAgIH1cbiAgICByZXN1bHQgPSBuZXcgKENvbnN0cnVjdG9yID09PSB1bmRlZmluZWQgPyBBcnJheSA6IENvbnN0cnVjdG9yKShtYXgoZmluIC0gaywgMCkpO1xuICAgIGZvciAobiA9IDA7IGsgPCBmaW47IGsrKywgbisrKSBpZiAoayBpbiBPKSBjcmVhdGVQcm9wZXJ0eShyZXN1bHQsIG4sIE9ba10pO1xuICAgIHJlc3VsdC5sZW5ndGggPSBuO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbn0pO1xuIl0sIm5hbWVzIjpbImh0bWxkaWZmIiwicmVxdWlyZSIsIiQiLCJlYWNoIiwia2V5IiwiaXRlbSIsIm9yaWdpbmFsSFRNTCIsImZpbmQiLCJodG1sIiwibmV3SFRNTCIsIm91dHB1dCIsImUiLCJuIiwidCIsInIiLCJpIiwiZiIsIl8iLCJhIiwibyIsInMiLCJ1IiwiaCIsImwiLCJjIiwiZCIsImIiLCJwIiwidGVzdCIsInN0YXJ0X2luX2JlZm9yZSIsInN0YXJ0X2luX2FmdGVyIiwibGVuZ3RoIiwiZW5kX2luX2JlZm9yZSIsImVuZF9pbl9hZnRlciIsInB1c2giLCJFcnJvciIsImciLCJ3IiwidiIsImsiLCJtIiwieSIsImZpbmRfdGhlc2UiLCJpbl90aGVzZSIsImluZGV4T2YiLCJ0b1N0cmluZyIsImFjdGlvbiIsInNsaWNlIiwiam9pbiIsImVxdWFsIiwiaW5zZXJ0IiwicmVwbGFjZSIsImh0bWxfdG9fdG9rZW5zIiwiZmluZF9tYXRjaGluZ19ibG9ja3MiLCJmaW5kX21hdGNoIiwiY3JlYXRlX2luZGV4IiwiY2FsY3VsYXRlX29wZXJhdGlvbnMiLCJyZW5kZXJfb3BlcmF0aW9ucyIsImRlZmluZSIsIm1vZHVsZSIsImV4cG9ydHMiLCJ3aW5kb3ciLCJhZGRFdmVudExpc3RlbmVyIiwiZXZlbnQiLCJkYXRhdGFibGVzU2ltcGxlIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsInNpbXBsZURhdGF0YWJsZXMiLCJEYXRhVGFibGUiLCJzaWRlYmFyVG9nZ2xlIiwiYm9keSIsInF1ZXJ5U2VsZWN0b3IiLCJwcmV2ZW50RGVmYXVsdCIsImNsYXNzTGlzdCIsInRvZ2dsZSIsImxvY2FsU3RvcmFnZSIsInNldEl0ZW0iLCJjb250YWlucyJdLCJzb3VyY2VSb290IjoiIn0=