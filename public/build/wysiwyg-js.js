(self["webpackChunk"] = self["webpackChunk"] || []).push([["wysiwyg-js"],{

/***/ "./assets/global/wysiwyg.js":
/*!**********************************!*\
  !*** ./assets/global/wysiwyg.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
var tinymce = __webpack_require__(/*! tinymce */ "./node_modules/tinymce/tinymce.js");

__webpack_require__(/*! tinymce/themes/silver/theme */ "./node_modules/tinymce/themes/silver/theme.js");

__webpack_require__(/*! tinymce/icons/default/icons */ "./node_modules/tinymce/icons/default/icons.js"); // require('tinymce/plugins/quickbars/plugin');


__webpack_require__(/*! tinymce/plugins/table/plugin */ "./node_modules/tinymce/plugins/table/plugin.js"); // require('tinymce/plugins/link/plugin');


__webpack_require__(/*! tinymce/plugins/lists/plugin */ "./node_modules/tinymce/plugins/lists/plugin.js"); // require('tinymce/plugins/media/plugin');


__webpack_require__(/*! tinymce/plugins/autoresize/plugin */ "./node_modules/tinymce/plugins/autoresize/plugin.js");

__webpack_require__(/*! tinymce/plugins/help/plugin */ "./node_modules/tinymce/plugins/help/plugin.js");

__webpack_require__(/*! tinymce/plugins/textpattern/plugin */ "./node_modules/tinymce/plugins/textpattern/plugin.js");

$(function () {
  tinymce.init({
    selector: '.wysiwyg',
    plugins: 'table lists autoresize help textpattern',
    // toolbar: 'undo redo | formatselect | bold italic | alignleft aligncentre alignright alignjustify | indent outdent | bullist numlist',
    menubar: false,
    toolbar: 'undo redo | bold italic| indent outdent | bullist numlist'
  });
});

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendors-node_modules_jquery_dist_jquery_js","vendors-node_modules_tinymce_icons_default_icons_js-node_modules_tinymce_plugins_autoresize_p-3678fd"], () => (__webpack_exec__("./assets/global/wysiwyg.js")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid3lzaXd5Zy1qcy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxJQUFNQSxPQUFPLEdBQUdDLG1CQUFPLENBQUMsa0RBQUQsQ0FBdkI7O0FBQ0FBLG1CQUFPLENBQUMsa0ZBQUQsQ0FBUDs7QUFDQUEsbUJBQU8sQ0FBQyxrRkFBRCxDQUFQLEVBRUE7OztBQUNBQSxtQkFBTyxDQUFDLG9GQUFELENBQVAsRUFDQTs7O0FBQ0FBLG1CQUFPLENBQUMsb0ZBQUQsQ0FBUCxFQUNBOzs7QUFDQUEsbUJBQU8sQ0FBQyw4RkFBRCxDQUFQOztBQUNBQSxtQkFBTyxDQUFDLGtGQUFELENBQVA7O0FBQ0FBLG1CQUFPLENBQUMsZ0dBQUQsQ0FBUDs7QUFFQUMsQ0FBQyxDQUFDLFlBQVk7QUFDVkYsRUFBQUEsT0FBTyxDQUFDRyxJQUFSLENBQWE7QUFDVEMsSUFBQUEsUUFBUSxFQUFFLFVBREQ7QUFFVEMsSUFBQUEsT0FBTyxFQUFFLHlDQUZBO0FBR1Q7QUFDQUMsSUFBQUEsT0FBTyxFQUFFLEtBSkE7QUFLVEMsSUFBQUEsT0FBTyxFQUFFO0FBTEEsR0FBYjtBQU9ILENBUkEsQ0FBRCIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL2Fzc2V0cy9nbG9iYWwvd3lzaXd5Zy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCB0aW55bWNlID0gcmVxdWlyZSgndGlueW1jZScpO1xucmVxdWlyZSgndGlueW1jZS90aGVtZXMvc2lsdmVyL3RoZW1lJyk7XG5yZXF1aXJlKCd0aW55bWNlL2ljb25zL2RlZmF1bHQvaWNvbnMnKTtcblxuLy8gcmVxdWlyZSgndGlueW1jZS9wbHVnaW5zL3F1aWNrYmFycy9wbHVnaW4nKTtcbnJlcXVpcmUoJ3RpbnltY2UvcGx1Z2lucy90YWJsZS9wbHVnaW4nKTtcbi8vIHJlcXVpcmUoJ3RpbnltY2UvcGx1Z2lucy9saW5rL3BsdWdpbicpO1xucmVxdWlyZSgndGlueW1jZS9wbHVnaW5zL2xpc3RzL3BsdWdpbicpO1xuLy8gcmVxdWlyZSgndGlueW1jZS9wbHVnaW5zL21lZGlhL3BsdWdpbicpO1xucmVxdWlyZSgndGlueW1jZS9wbHVnaW5zL2F1dG9yZXNpemUvcGx1Z2luJyk7XG5yZXF1aXJlKCd0aW55bWNlL3BsdWdpbnMvaGVscC9wbHVnaW4nKTtcbnJlcXVpcmUoJ3RpbnltY2UvcGx1Z2lucy90ZXh0cGF0dGVybi9wbHVnaW4nKTtcblxuJChmdW5jdGlvbiAoKSB7XG4gICAgdGlueW1jZS5pbml0KHtcbiAgICAgICAgc2VsZWN0b3I6ICcud3lzaXd5ZycsXG4gICAgICAgIHBsdWdpbnM6ICd0YWJsZSBsaXN0cyBhdXRvcmVzaXplIGhlbHAgdGV4dHBhdHRlcm4nLFxuICAgICAgICAvLyB0b29sYmFyOiAndW5kbyByZWRvIHwgZm9ybWF0c2VsZWN0IHwgYm9sZCBpdGFsaWMgfCBhbGlnbmxlZnQgYWxpZ25jZW50cmUgYWxpZ25yaWdodCBhbGlnbmp1c3RpZnkgfCBpbmRlbnQgb3V0ZGVudCB8IGJ1bGxpc3QgbnVtbGlzdCcsXG4gICAgICAgIG1lbnViYXI6IGZhbHNlLFxuICAgICAgICB0b29sYmFyOiAndW5kbyByZWRvIHwgYm9sZCBpdGFsaWN8IGluZGVudCBvdXRkZW50IHwgYnVsbGlzdCBudW1saXN0JyxcbiAgICB9KTtcbn0pIl0sIm5hbWVzIjpbInRpbnltY2UiLCJyZXF1aXJlIiwiJCIsImluaXQiLCJzZWxlY3RvciIsInBsdWdpbnMiLCJtZW51YmFyIiwidG9vbGJhciJdLCJzb3VyY2VSb290IjoiIn0=