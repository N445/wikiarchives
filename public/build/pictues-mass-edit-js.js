(self["webpackChunk"] = self["webpackChunk"] || []).push([["pictues-mass-edit-js"],{

/***/ "./assets/admin/catalog/pictues-mass-edit.js":
/*!***************************************************!*\
  !*** ./assets/admin/catalog/pictues-mass-edit.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
__webpack_require__(/*! core-js/modules/es.array.find.js */ "./node_modules/core-js/modules/es.array.find.js");

function all() {
  $('.picture-card').addClass('selected');
}

function none() {
  $('.picture-card').removeClass('selected');
}

function custom() {
  $('[data-button-action]').removeClass('active');
  $('[data-button-action="custom"]').addClass('active');
}

function refreshform() {
  $('#picture_mass_edit_pictures option').prop("selected", false);
  $.each($('.picture-card.selected'), function (key, item) {
    var pictureID = $(item).attr('id');
    $("#picture_mass_edit_pictures option[value=\"".concat(pictureID, "\"]")).prop("selected", true);
  });
  $('#nb-pictures-to-edit').html($('.picture-card.selected').length);
}

function filterAll() {
  $('.picture-card').closest('.col-md-4').css('display', 'block');
  $('[data-button-filter]').removeClass('active');
  $('[data-button-filter="all"]').addClass('active');
}

function filterSelected() {
  $('.picture-card.selected').closest('.col-md-4').css('display', 'block');
  $('.picture-card:not(.selected)').closest('.col-md-4').css('display', 'none');
}

function filterNotselected() {
  $('.picture-card.selected').closest('.col-md-4').css('display', 'none');
  $('.picture-card:not(.selected)').closest('.col-md-4').css('display', 'block');
}

var previousSelected = null;
$(function () {
  $('.picture-card').on('click', function (e) {
    var clickedCard = $(this);
    clickedCard.addClass('multi-selected');
    clickedCard.toggleClass('selected');
    var isSelected = clickedCard.hasClass('selected');

    if (e.shiftKey) {
      var parentCol = clickedCard.closest('.picture-card-col');

      if (null === previousSelected) {
        parentCol.find('.picture-card').addClass('multi-selected');
        previousSelected = parentCol;
      } else {
        var cardsToChange = previousSelected.nextUntil(parentCol).find('.picture-card');
        cardsToChange.addClass('multi-selected');

        if (isSelected) {
          cardsToChange.addClass('selected');
        } else {
          cardsToChange.removeClass('selected');
        }

        previousSelected = null;
        parentCol.find('.picture-card').removeClass('multi-selected');
      }
    } else {
      $('.picture-card').removeClass('multi-selected');
      previousSelected = null;
    }

    refreshform();
    custom(); // filterAll();
  });
  $('[data-button-action]').on('click', function () {
    $('[data-button-action]').removeClass('active');
    $(this).addClass('active');

    switch ($(this).data('button-action')) {
      case 'all':
        all();
        break;

      case 'none':
        none();
        break;
    }

    refreshform();
  });
  $('[data-button-filter]').on('click', function () {
    $('[data-button-filter]').removeClass('active');
    $(this).addClass('active');

    switch ($(this).data('button-filter')) {
      case 'all':
        filterAll();
        break;

      case 'selected':
        filterSelected();
        break;

      case 'notselected':
        filterNotselected();
        break;
    }

    refreshform();
  });
});

/***/ }),

/***/ "./node_modules/core-js/internals/add-to-unscopables.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js/internals/add-to-unscopables.js ***!
  \**************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js");
var create = __webpack_require__(/*! ../internals/object-create */ "./node_modules/core-js/internals/object-create.js");
var definePropertyModule = __webpack_require__(/*! ../internals/object-define-property */ "./node_modules/core-js/internals/object-define-property.js");

var UNSCOPABLES = wellKnownSymbol('unscopables');
var ArrayPrototype = Array.prototype;

// Array.prototype[@@unscopables]
// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
if (ArrayPrototype[UNSCOPABLES] == undefined) {
  definePropertyModule.f(ArrayPrototype, UNSCOPABLES, {
    configurable: true,
    value: create(null)
  });
}

// add a key to Array.prototype[@@unscopables]
module.exports = function (key) {
  ArrayPrototype[UNSCOPABLES][key] = true;
};


/***/ }),

/***/ "./node_modules/core-js/internals/html.js":
/*!************************************************!*\
  !*** ./node_modules/core-js/internals/html.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getBuiltIn = __webpack_require__(/*! ../internals/get-built-in */ "./node_modules/core-js/internals/get-built-in.js");

module.exports = getBuiltIn('document', 'documentElement');


/***/ }),

/***/ "./node_modules/core-js/internals/object-create.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/internals/object-create.js ***!
  \*********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* global ActiveXObject -- old IE, WSH */
var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");
var defineProperties = __webpack_require__(/*! ../internals/object-define-properties */ "./node_modules/core-js/internals/object-define-properties.js");
var enumBugKeys = __webpack_require__(/*! ../internals/enum-bug-keys */ "./node_modules/core-js/internals/enum-bug-keys.js");
var hiddenKeys = __webpack_require__(/*! ../internals/hidden-keys */ "./node_modules/core-js/internals/hidden-keys.js");
var html = __webpack_require__(/*! ../internals/html */ "./node_modules/core-js/internals/html.js");
var documentCreateElement = __webpack_require__(/*! ../internals/document-create-element */ "./node_modules/core-js/internals/document-create-element.js");
var sharedKey = __webpack_require__(/*! ../internals/shared-key */ "./node_modules/core-js/internals/shared-key.js");

var GT = '>';
var LT = '<';
var PROTOTYPE = 'prototype';
var SCRIPT = 'script';
var IE_PROTO = sharedKey('IE_PROTO');

var EmptyConstructor = function () { /* empty */ };

var scriptTag = function (content) {
  return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
};

// Create object with fake `null` prototype: use ActiveX Object with cleared prototype
var NullProtoObjectViaActiveX = function (activeXDocument) {
  activeXDocument.write(scriptTag(''));
  activeXDocument.close();
  var temp = activeXDocument.parentWindow.Object;
  activeXDocument = null; // avoid memory leak
  return temp;
};

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var NullProtoObjectViaIFrame = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = documentCreateElement('iframe');
  var JS = 'java' + SCRIPT + ':';
  var iframeDocument;
  iframe.style.display = 'none';
  html.appendChild(iframe);
  // https://github.com/zloirock/core-js/issues/475
  iframe.src = String(JS);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(scriptTag('document.F=Object'));
  iframeDocument.close();
  return iframeDocument.F;
};

// Check for document.domain and active x support
// No need to use active x approach when document.domain is not set
// see https://github.com/es-shims/es5-shim/issues/150
// variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
// avoid IE GC bug
var activeXDocument;
var NullProtoObject = function () {
  try {
    activeXDocument = new ActiveXObject('htmlfile');
  } catch (error) { /* ignore */ }
  NullProtoObject = typeof document != 'undefined'
    ? document.domain && activeXDocument
      ? NullProtoObjectViaActiveX(activeXDocument) // old IE
      : NullProtoObjectViaIFrame()
    : NullProtoObjectViaActiveX(activeXDocument); // WSH
  var length = enumBugKeys.length;
  while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
  return NullProtoObject();
};

hiddenKeys[IE_PROTO] = true;

// `Object.create` method
// https://tc39.es/ecma262/#sec-object.create
module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    EmptyConstructor[PROTOTYPE] = anObject(O);
    result = new EmptyConstructor();
    EmptyConstructor[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = NullProtoObject();
  return Properties === undefined ? result : defineProperties(result, Properties);
};


/***/ }),

/***/ "./node_modules/core-js/internals/object-define-properties.js":
/*!********************************************************************!*\
  !*** ./node_modules/core-js/internals/object-define-properties.js ***!
  \********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "./node_modules/core-js/internals/descriptors.js");
var definePropertyModule = __webpack_require__(/*! ../internals/object-define-property */ "./node_modules/core-js/internals/object-define-property.js");
var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");
var objectKeys = __webpack_require__(/*! ../internals/object-keys */ "./node_modules/core-js/internals/object-keys.js");

// `Object.defineProperties` method
// https://tc39.es/ecma262/#sec-object.defineproperties
// eslint-disable-next-line es/no-object-defineproperties -- safe
module.exports = DESCRIPTORS ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = objectKeys(Properties);
  var length = keys.length;
  var index = 0;
  var key;
  while (length > index) definePropertyModule.f(O, key = keys[index++], Properties[key]);
  return O;
};


/***/ }),

/***/ "./node_modules/core-js/internals/object-keys.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/internals/object-keys.js ***!
  \*******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var internalObjectKeys = __webpack_require__(/*! ../internals/object-keys-internal */ "./node_modules/core-js/internals/object-keys-internal.js");
var enumBugKeys = __webpack_require__(/*! ../internals/enum-bug-keys */ "./node_modules/core-js/internals/enum-bug-keys.js");

// `Object.keys` method
// https://tc39.es/ecma262/#sec-object.keys
// eslint-disable-next-line es/no-object-keys -- safe
module.exports = Object.keys || function keys(O) {
  return internalObjectKeys(O, enumBugKeys);
};


/***/ }),

/***/ "./node_modules/core-js/modules/es.array.find.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/es.array.find.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
var $find = __webpack_require__(/*! ../internals/array-iteration */ "./node_modules/core-js/internals/array-iteration.js").find;
var addToUnscopables = __webpack_require__(/*! ../internals/add-to-unscopables */ "./node_modules/core-js/internals/add-to-unscopables.js");

var FIND = 'find';
var SKIPS_HOLES = true;

// Shouldn't skip holes
if (FIND in []) Array(1)[FIND](function () { SKIPS_HOLES = false; });

// `Array.prototype.find` method
// https://tc39.es/ecma262/#sec-array.prototype.find
$({ target: 'Array', proto: true, forced: SKIPS_HOLES }, {
  find: function find(callbackfn /* , that = undefined */) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});

// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables(FIND);


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendors-node_modules_jquery_dist_jquery_js","vendors-node_modules_core-js_internals_array-iteration_js-node_modules_core-js_internals_export_js"], () => (__webpack_exec__("./assets/admin/catalog/pictues-mass-edit.js")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LENBQUMsdUVBQXFCO0FBQ3JDLFlBQVksbUhBQTRDO0FBQ3hELHVCQUF1QixtQkFBTyxDQUFDLCtGQUFpQzs7QUFFaEU7QUFDQTs7QUFFQTtBQUNBLDZDQUE2QyxzQkFBc0I7O0FBRW5FO0FBQ0E7QUFDQSxJQUFJLG1EQUFtRDtBQUN2RDtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvYWRtaW4vY2F0YWxvZy9waWN0dWVzLW1hc3MtZWRpdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvYWRkLXRvLXVuc2NvcGFibGVzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9odG1sLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9vYmplY3QtY3JlYXRlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9vYmplY3QtZGVmaW5lLXByb3BlcnRpZXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL29iamVjdC1rZXlzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXMuYXJyYXkuZmluZC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJmdW5jdGlvbiBhbGwoKSB7XG4gICAgJCgnLnBpY3R1cmUtY2FyZCcpLmFkZENsYXNzKCdzZWxlY3RlZCcpO1xufVxuXG5mdW5jdGlvbiBub25lKCkge1xuICAgICQoJy5waWN0dXJlLWNhcmQnKS5yZW1vdmVDbGFzcygnc2VsZWN0ZWQnKTtcbn1cblxuZnVuY3Rpb24gY3VzdG9tKCkge1xuICAgICQoJ1tkYXRhLWJ1dHRvbi1hY3Rpb25dJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICQoJ1tkYXRhLWJ1dHRvbi1hY3Rpb249XCJjdXN0b21cIl0nKS5hZGRDbGFzcygnYWN0aXZlJyk7XG59XG5cbmZ1bmN0aW9uIHJlZnJlc2hmb3JtKCkge1xuICAgICQoJyNwaWN0dXJlX21hc3NfZWRpdF9waWN0dXJlcyBvcHRpb24nKS5wcm9wKFwic2VsZWN0ZWRcIiwgZmFsc2UpXG4gICAgJC5lYWNoKCQoJy5waWN0dXJlLWNhcmQuc2VsZWN0ZWQnKSwgZnVuY3Rpb24gKGtleSwgaXRlbSkge1xuICAgICAgICBsZXQgcGljdHVyZUlEID0gJChpdGVtKS5hdHRyKCdpZCcpO1xuICAgICAgICAkKGAjcGljdHVyZV9tYXNzX2VkaXRfcGljdHVyZXMgb3B0aW9uW3ZhbHVlPVwiJHtwaWN0dXJlSUR9XCJdYCkucHJvcChcInNlbGVjdGVkXCIsIHRydWUpXG4gICAgfSlcbiAgICAkKCcjbmItcGljdHVyZXMtdG8tZWRpdCcpLmh0bWwoJCgnLnBpY3R1cmUtY2FyZC5zZWxlY3RlZCcpLmxlbmd0aClcbn1cblxuXG5mdW5jdGlvbiBmaWx0ZXJBbGwoKSB7XG4gICAgJCgnLnBpY3R1cmUtY2FyZCcpLmNsb3Nlc3QoJy5jb2wtbWQtNCcpLmNzcygnZGlzcGxheScsICdibG9jaycpO1xuICAgICQoJ1tkYXRhLWJ1dHRvbi1maWx0ZXJdJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICQoJ1tkYXRhLWJ1dHRvbi1maWx0ZXI9XCJhbGxcIl0nKS5hZGRDbGFzcygnYWN0aXZlJyk7XG59XG5cbmZ1bmN0aW9uIGZpbHRlclNlbGVjdGVkKCkge1xuICAgICQoJy5waWN0dXJlLWNhcmQuc2VsZWN0ZWQnKS5jbG9zZXN0KCcuY29sLW1kLTQnKS5jc3MoJ2Rpc3BsYXknLCAnYmxvY2snKTtcbiAgICAkKCcucGljdHVyZS1jYXJkOm5vdCguc2VsZWN0ZWQpJykuY2xvc2VzdCgnLmNvbC1tZC00JykuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcbn1cblxuZnVuY3Rpb24gZmlsdGVyTm90c2VsZWN0ZWQoKSB7XG4gICAgJCgnLnBpY3R1cmUtY2FyZC5zZWxlY3RlZCcpLmNsb3Nlc3QoJy5jb2wtbWQtNCcpLmNzcygnZGlzcGxheScsICdub25lJyk7XG4gICAgJCgnLnBpY3R1cmUtY2FyZDpub3QoLnNlbGVjdGVkKScpLmNsb3Nlc3QoJy5jb2wtbWQtNCcpLmNzcygnZGlzcGxheScsICdibG9jaycpO1xufVxuXG5sZXQgcHJldmlvdXNTZWxlY3RlZCA9IG51bGw7XG5cbiQoZnVuY3Rpb24gKCkge1xuICAgICQoJy5waWN0dXJlLWNhcmQnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICBsZXQgY2xpY2tlZENhcmQgPSAkKHRoaXMpO1xuICAgICAgICBjbGlja2VkQ2FyZC5hZGRDbGFzcygnbXVsdGktc2VsZWN0ZWQnKTtcblxuICAgICAgICBjbGlja2VkQ2FyZC50b2dnbGVDbGFzcygnc2VsZWN0ZWQnKTtcbiAgICAgICAgbGV0IGlzU2VsZWN0ZWQgPSBjbGlja2VkQ2FyZC5oYXNDbGFzcygnc2VsZWN0ZWQnKTtcblxuICAgICAgICBpZiAoZS5zaGlmdEtleSkge1xuICAgICAgICAgICAgbGV0IHBhcmVudENvbCA9IGNsaWNrZWRDYXJkLmNsb3Nlc3QoJy5waWN0dXJlLWNhcmQtY29sJyk7XG4gICAgICAgICAgICBpZiAobnVsbCA9PT0gcHJldmlvdXNTZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgIHBhcmVudENvbC5maW5kKCcucGljdHVyZS1jYXJkJykuYWRkQ2xhc3MoJ211bHRpLXNlbGVjdGVkJyk7XG4gICAgICAgICAgICAgICAgcHJldmlvdXNTZWxlY3RlZCA9IHBhcmVudENvbDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbGV0IGNhcmRzVG9DaGFuZ2UgPSBwcmV2aW91c1NlbGVjdGVkLm5leHRVbnRpbChwYXJlbnRDb2wpLmZpbmQoJy5waWN0dXJlLWNhcmQnKTtcbiAgICAgICAgICAgICAgICBjYXJkc1RvQ2hhbmdlLmFkZENsYXNzKCdtdWx0aS1zZWxlY3RlZCcpO1xuICAgICAgICAgICAgICAgIGlmKGlzU2VsZWN0ZWQpe1xuICAgICAgICAgICAgICAgICAgICBjYXJkc1RvQ2hhbmdlLmFkZENsYXNzKCdzZWxlY3RlZCcpO1xuICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICBjYXJkc1RvQ2hhbmdlLnJlbW92ZUNsYXNzKCdzZWxlY3RlZCcpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBwcmV2aW91c1NlbGVjdGVkID0gbnVsbDtcbiAgICAgICAgICAgICAgICBwYXJlbnRDb2wuZmluZCgnLnBpY3R1cmUtY2FyZCcpLnJlbW92ZUNsYXNzKCdtdWx0aS1zZWxlY3RlZCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJCgnLnBpY3R1cmUtY2FyZCcpLnJlbW92ZUNsYXNzKCdtdWx0aS1zZWxlY3RlZCcpO1xuICAgICAgICAgICAgcHJldmlvdXNTZWxlY3RlZCA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcmVmcmVzaGZvcm0oKTtcbiAgICAgICAgY3VzdG9tKCk7XG4gICAgICAgIC8vIGZpbHRlckFsbCgpO1xuICAgIH0pXG5cbiAgICAkKCdbZGF0YS1idXR0b24tYWN0aW9uXScpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgJCgnW2RhdGEtYnV0dG9uLWFjdGlvbl0nKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuXG4gICAgICAgIHN3aXRjaCAoJCh0aGlzKS5kYXRhKCdidXR0b24tYWN0aW9uJykpIHtcbiAgICAgICAgICAgIGNhc2UgJ2FsbCc6XG4gICAgICAgICAgICAgICAgYWxsKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdub25lJzpcbiAgICAgICAgICAgICAgICBub25lKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgcmVmcmVzaGZvcm0oKTtcbiAgICB9KVxuXG4gICAgJCgnW2RhdGEtYnV0dG9uLWZpbHRlcl0nKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICQoJ1tkYXRhLWJ1dHRvbi1maWx0ZXJdJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdhY3RpdmUnKTtcblxuICAgICAgICBzd2l0Y2ggKCQodGhpcykuZGF0YSgnYnV0dG9uLWZpbHRlcicpKSB7XG4gICAgICAgICAgICBjYXNlICdhbGwnOlxuICAgICAgICAgICAgICAgIGZpbHRlckFsbCgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnc2VsZWN0ZWQnOlxuICAgICAgICAgICAgICAgIGZpbHRlclNlbGVjdGVkKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdub3RzZWxlY3RlZCc6XG4gICAgICAgICAgICAgICAgZmlsdGVyTm90c2VsZWN0ZWQoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICByZWZyZXNoZm9ybSgpO1xuICAgIH0pXG59KVxuXG4iLCJ2YXIgd2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sJyk7XG52YXIgY3JlYXRlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1jcmVhdGUnKTtcbnZhciBkZWZpbmVQcm9wZXJ0eU1vZHVsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZGVmaW5lLXByb3BlcnR5Jyk7XG5cbnZhciBVTlNDT1BBQkxFUyA9IHdlbGxLbm93blN5bWJvbCgndW5zY29wYWJsZXMnKTtcbnZhciBBcnJheVByb3RvdHlwZSA9IEFycmF5LnByb3RvdHlwZTtcblxuLy8gQXJyYXkucHJvdG90eXBlW0BAdW5zY29wYWJsZXNdXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS1AQHVuc2NvcGFibGVzXG5pZiAoQXJyYXlQcm90b3R5cGVbVU5TQ09QQUJMRVNdID09IHVuZGVmaW5lZCkge1xuICBkZWZpbmVQcm9wZXJ0eU1vZHVsZS5mKEFycmF5UHJvdG90eXBlLCBVTlNDT1BBQkxFUywge1xuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICB2YWx1ZTogY3JlYXRlKG51bGwpXG4gIH0pO1xufVxuXG4vLyBhZGQgYSBrZXkgdG8gQXJyYXkucHJvdG90eXBlW0BAdW5zY29wYWJsZXNdXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgQXJyYXlQcm90b3R5cGVbVU5TQ09QQUJMRVNdW2tleV0gPSB0cnVlO1xufTtcbiIsInZhciBnZXRCdWlsdEluID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dldC1idWlsdC1pbicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGdldEJ1aWx0SW4oJ2RvY3VtZW50JywgJ2RvY3VtZW50RWxlbWVudCcpO1xuIiwiLyogZ2xvYmFsIEFjdGl2ZVhPYmplY3QgLS0gb2xkIElFLCBXU0ggKi9cbnZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hbi1vYmplY3QnKTtcbnZhciBkZWZpbmVQcm9wZXJ0aWVzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1kZWZpbmUtcHJvcGVydGllcycpO1xudmFyIGVudW1CdWdLZXlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2VudW0tYnVnLWtleXMnKTtcbnZhciBoaWRkZW5LZXlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hpZGRlbi1rZXlzJyk7XG52YXIgaHRtbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9odG1sJyk7XG52YXIgZG9jdW1lbnRDcmVhdGVFbGVtZW50ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2RvY3VtZW50LWNyZWF0ZS1lbGVtZW50Jyk7XG52YXIgc2hhcmVkS2V5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3NoYXJlZC1rZXknKTtcblxudmFyIEdUID0gJz4nO1xudmFyIExUID0gJzwnO1xudmFyIFBST1RPVFlQRSA9ICdwcm90b3R5cGUnO1xudmFyIFNDUklQVCA9ICdzY3JpcHQnO1xudmFyIElFX1BST1RPID0gc2hhcmVkS2V5KCdJRV9QUk9UTycpO1xuXG52YXIgRW1wdHlDb25zdHJ1Y3RvciA9IGZ1bmN0aW9uICgpIHsgLyogZW1wdHkgKi8gfTtcblxudmFyIHNjcmlwdFRhZyA9IGZ1bmN0aW9uIChjb250ZW50KSB7XG4gIHJldHVybiBMVCArIFNDUklQVCArIEdUICsgY29udGVudCArIExUICsgJy8nICsgU0NSSVBUICsgR1Q7XG59O1xuXG4vLyBDcmVhdGUgb2JqZWN0IHdpdGggZmFrZSBgbnVsbGAgcHJvdG90eXBlOiB1c2UgQWN0aXZlWCBPYmplY3Qgd2l0aCBjbGVhcmVkIHByb3RvdHlwZVxudmFyIE51bGxQcm90b09iamVjdFZpYUFjdGl2ZVggPSBmdW5jdGlvbiAoYWN0aXZlWERvY3VtZW50KSB7XG4gIGFjdGl2ZVhEb2N1bWVudC53cml0ZShzY3JpcHRUYWcoJycpKTtcbiAgYWN0aXZlWERvY3VtZW50LmNsb3NlKCk7XG4gIHZhciB0ZW1wID0gYWN0aXZlWERvY3VtZW50LnBhcmVudFdpbmRvdy5PYmplY3Q7XG4gIGFjdGl2ZVhEb2N1bWVudCA9IG51bGw7IC8vIGF2b2lkIG1lbW9yeSBsZWFrXG4gIHJldHVybiB0ZW1wO1xufTtcblxuLy8gQ3JlYXRlIG9iamVjdCB3aXRoIGZha2UgYG51bGxgIHByb3RvdHlwZTogdXNlIGlmcmFtZSBPYmplY3Qgd2l0aCBjbGVhcmVkIHByb3RvdHlwZVxudmFyIE51bGxQcm90b09iamVjdFZpYUlGcmFtZSA9IGZ1bmN0aW9uICgpIHtcbiAgLy8gVGhyYXNoLCB3YXN0ZSBhbmQgc29kb215OiBJRSBHQyBidWdcbiAgdmFyIGlmcmFtZSA9IGRvY3VtZW50Q3JlYXRlRWxlbWVudCgnaWZyYW1lJyk7XG4gIHZhciBKUyA9ICdqYXZhJyArIFNDUklQVCArICc6JztcbiAgdmFyIGlmcmFtZURvY3VtZW50O1xuICBpZnJhbWUuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgaHRtbC5hcHBlbmRDaGlsZChpZnJhbWUpO1xuICAvLyBodHRwczovL2dpdGh1Yi5jb20vemxvaXJvY2svY29yZS1qcy9pc3N1ZXMvNDc1XG4gIGlmcmFtZS5zcmMgPSBTdHJpbmcoSlMpO1xuICBpZnJhbWVEb2N1bWVudCA9IGlmcmFtZS5jb250ZW50V2luZG93LmRvY3VtZW50O1xuICBpZnJhbWVEb2N1bWVudC5vcGVuKCk7XG4gIGlmcmFtZURvY3VtZW50LndyaXRlKHNjcmlwdFRhZygnZG9jdW1lbnQuRj1PYmplY3QnKSk7XG4gIGlmcmFtZURvY3VtZW50LmNsb3NlKCk7XG4gIHJldHVybiBpZnJhbWVEb2N1bWVudC5GO1xufTtcblxuLy8gQ2hlY2sgZm9yIGRvY3VtZW50LmRvbWFpbiBhbmQgYWN0aXZlIHggc3VwcG9ydFxuLy8gTm8gbmVlZCB0byB1c2UgYWN0aXZlIHggYXBwcm9hY2ggd2hlbiBkb2N1bWVudC5kb21haW4gaXMgbm90IHNldFxuLy8gc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9lcy1zaGltcy9lczUtc2hpbS9pc3N1ZXMvMTUwXG4vLyB2YXJpYXRpb24gb2YgaHR0cHM6Ly9naXRodWIuY29tL2tpdGNhbWJyaWRnZS9lczUtc2hpbS9jb21taXQvNGY3MzhhYzA2NjM0NlxuLy8gYXZvaWQgSUUgR0MgYnVnXG52YXIgYWN0aXZlWERvY3VtZW50O1xudmFyIE51bGxQcm90b09iamVjdCA9IGZ1bmN0aW9uICgpIHtcbiAgdHJ5IHtcbiAgICBhY3RpdmVYRG9jdW1lbnQgPSBuZXcgQWN0aXZlWE9iamVjdCgnaHRtbGZpbGUnKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHsgLyogaWdub3JlICovIH1cbiAgTnVsbFByb3RvT2JqZWN0ID0gdHlwZW9mIGRvY3VtZW50ICE9ICd1bmRlZmluZWQnXG4gICAgPyBkb2N1bWVudC5kb21haW4gJiYgYWN0aXZlWERvY3VtZW50XG4gICAgICA/IE51bGxQcm90b09iamVjdFZpYUFjdGl2ZVgoYWN0aXZlWERvY3VtZW50KSAvLyBvbGQgSUVcbiAgICAgIDogTnVsbFByb3RvT2JqZWN0VmlhSUZyYW1lKClcbiAgICA6IE51bGxQcm90b09iamVjdFZpYUFjdGl2ZVgoYWN0aXZlWERvY3VtZW50KTsgLy8gV1NIXG4gIHZhciBsZW5ndGggPSBlbnVtQnVnS2V5cy5sZW5ndGg7XG4gIHdoaWxlIChsZW5ndGgtLSkgZGVsZXRlIE51bGxQcm90b09iamVjdFtQUk9UT1RZUEVdW2VudW1CdWdLZXlzW2xlbmd0aF1dO1xuICByZXR1cm4gTnVsbFByb3RvT2JqZWN0KCk7XG59O1xuXG5oaWRkZW5LZXlzW0lFX1BST1RPXSA9IHRydWU7XG5cbi8vIGBPYmplY3QuY3JlYXRlYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtb2JqZWN0LmNyZWF0ZVxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3QuY3JlYXRlIHx8IGZ1bmN0aW9uIGNyZWF0ZShPLCBQcm9wZXJ0aWVzKSB7XG4gIHZhciByZXN1bHQ7XG4gIGlmIChPICE9PSBudWxsKSB7XG4gICAgRW1wdHlDb25zdHJ1Y3RvcltQUk9UT1RZUEVdID0gYW5PYmplY3QoTyk7XG4gICAgcmVzdWx0ID0gbmV3IEVtcHR5Q29uc3RydWN0b3IoKTtcbiAgICBFbXB0eUNvbnN0cnVjdG9yW1BST1RPVFlQRV0gPSBudWxsO1xuICAgIC8vIGFkZCBcIl9fcHJvdG9fX1wiIGZvciBPYmplY3QuZ2V0UHJvdG90eXBlT2YgcG9seWZpbGxcbiAgICByZXN1bHRbSUVfUFJPVE9dID0gTztcbiAgfSBlbHNlIHJlc3VsdCA9IE51bGxQcm90b09iamVjdCgpO1xuICByZXR1cm4gUHJvcGVydGllcyA9PT0gdW5kZWZpbmVkID8gcmVzdWx0IDogZGVmaW5lUHJvcGVydGllcyhyZXN1bHQsIFByb3BlcnRpZXMpO1xufTtcbiIsInZhciBERVNDUklQVE9SUyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZXNjcmlwdG9ycycpO1xudmFyIGRlZmluZVByb3BlcnR5TW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1kZWZpbmUtcHJvcGVydHknKTtcbnZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hbi1vYmplY3QnKTtcbnZhciBvYmplY3RLZXlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1rZXlzJyk7XG5cbi8vIGBPYmplY3QuZGVmaW5lUHJvcGVydGllc2AgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLW9iamVjdC5kZWZpbmVwcm9wZXJ0aWVzXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXMvbm8tb2JqZWN0LWRlZmluZXByb3BlcnRpZXMgLS0gc2FmZVxubW9kdWxlLmV4cG9ydHMgPSBERVNDUklQVE9SUyA/IE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzIDogZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyhPLCBQcm9wZXJ0aWVzKSB7XG4gIGFuT2JqZWN0KE8pO1xuICB2YXIga2V5cyA9IG9iamVjdEtleXMoUHJvcGVydGllcyk7XG4gIHZhciBsZW5ndGggPSBrZXlzLmxlbmd0aDtcbiAgdmFyIGluZGV4ID0gMDtcbiAgdmFyIGtleTtcbiAgd2hpbGUgKGxlbmd0aCA+IGluZGV4KSBkZWZpbmVQcm9wZXJ0eU1vZHVsZS5mKE8sIGtleSA9IGtleXNbaW5kZXgrK10sIFByb3BlcnRpZXNba2V5XSk7XG4gIHJldHVybiBPO1xufTtcbiIsInZhciBpbnRlcm5hbE9iamVjdEtleXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWtleXMtaW50ZXJuYWwnKTtcbnZhciBlbnVtQnVnS2V5cyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9lbnVtLWJ1Zy1rZXlzJyk7XG5cbi8vIGBPYmplY3Qua2V5c2AgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLW9iamVjdC5rZXlzXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXMvbm8tb2JqZWN0LWtleXMgLS0gc2FmZVxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3Qua2V5cyB8fCBmdW5jdGlvbiBrZXlzKE8pIHtcbiAgcmV0dXJuIGludGVybmFsT2JqZWN0S2V5cyhPLCBlbnVtQnVnS2V5cyk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyICQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZXhwb3J0Jyk7XG52YXIgJGZpbmQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYXJyYXktaXRlcmF0aW9uJykuZmluZDtcbnZhciBhZGRUb1Vuc2NvcGFibGVzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FkZC10by11bnNjb3BhYmxlcycpO1xuXG52YXIgRklORCA9ICdmaW5kJztcbnZhciBTS0lQU19IT0xFUyA9IHRydWU7XG5cbi8vIFNob3VsZG4ndCBza2lwIGhvbGVzXG5pZiAoRklORCBpbiBbXSkgQXJyYXkoMSlbRklORF0oZnVuY3Rpb24gKCkgeyBTS0lQU19IT0xFUyA9IGZhbHNlOyB9KTtcblxuLy8gYEFycmF5LnByb3RvdHlwZS5maW5kYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtYXJyYXkucHJvdG90eXBlLmZpbmRcbiQoeyB0YXJnZXQ6ICdBcnJheScsIHByb3RvOiB0cnVlLCBmb3JjZWQ6IFNLSVBTX0hPTEVTIH0sIHtcbiAgZmluZDogZnVuY3Rpb24gZmluZChjYWxsYmFja2ZuIC8qICwgdGhhdCA9IHVuZGVmaW5lZCAqLykge1xuICAgIHJldHVybiAkZmluZCh0aGlzLCBjYWxsYmFja2ZuLCBhcmd1bWVudHMubGVuZ3RoID4gMSA/IGFyZ3VtZW50c1sxXSA6IHVuZGVmaW5lZCk7XG4gIH1cbn0pO1xuXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS1AQHVuc2NvcGFibGVzXG5hZGRUb1Vuc2NvcGFibGVzKEZJTkQpO1xuIl0sIm5hbWVzIjpbImFsbCIsIiQiLCJhZGRDbGFzcyIsIm5vbmUiLCJyZW1vdmVDbGFzcyIsImN1c3RvbSIsInJlZnJlc2hmb3JtIiwicHJvcCIsImVhY2giLCJrZXkiLCJpdGVtIiwicGljdHVyZUlEIiwiYXR0ciIsImh0bWwiLCJsZW5ndGgiLCJmaWx0ZXJBbGwiLCJjbG9zZXN0IiwiY3NzIiwiZmlsdGVyU2VsZWN0ZWQiLCJmaWx0ZXJOb3RzZWxlY3RlZCIsInByZXZpb3VzU2VsZWN0ZWQiLCJvbiIsImUiLCJjbGlja2VkQ2FyZCIsInRvZ2dsZUNsYXNzIiwiaXNTZWxlY3RlZCIsImhhc0NsYXNzIiwic2hpZnRLZXkiLCJwYXJlbnRDb2wiLCJmaW5kIiwiY2FyZHNUb0NoYW5nZSIsIm5leHRVbnRpbCIsImRhdGEiXSwic291cmNlUm9vdCI6IiJ9