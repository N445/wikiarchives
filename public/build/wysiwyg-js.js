(self["webpackChunk"] = self["webpackChunk"] || []).push([["wysiwyg-js"],{

/***/ "./assets/wysiwyg.js":
/*!***************************!*\
  !*** ./assets/wysiwyg.js ***!
  \***************************/
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
/******/ __webpack_require__.O(0, ["vendors-node_modules_jquery_dist_jquery_js","vendors-node_modules_tinymce_icons_default_icons_js-node_modules_tinymce_plugins_autoresize_p-3678fd"], () => (__webpack_exec__("./assets/wysiwyg.js")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid3lzaXd5Zy1qcy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxJQUFNQSxPQUFPLEdBQUdDLG1CQUFPLENBQUMsa0RBQUQsQ0FBdkI7O0FBQ0FBLG1CQUFPLENBQUMsa0ZBQUQsQ0FBUDs7QUFDQUEsbUJBQU8sQ0FBQyxrRkFBRCxDQUFQLEVBRUE7OztBQUNBQSxtQkFBTyxDQUFDLG9GQUFELENBQVAsRUFDQTs7O0FBQ0FBLG1CQUFPLENBQUMsb0ZBQUQsQ0FBUCxFQUNBOzs7QUFDQUEsbUJBQU8sQ0FBQyw4RkFBRCxDQUFQOztBQUNBQSxtQkFBTyxDQUFDLGtGQUFELENBQVA7O0FBQ0FBLG1CQUFPLENBQUMsZ0dBQUQsQ0FBUDs7QUFFQUMsQ0FBQyxDQUFDLFlBQVk7QUFDVkYsRUFBQUEsT0FBTyxDQUFDRyxJQUFSLENBQWE7QUFDVEMsSUFBQUEsUUFBUSxFQUFFLFVBREQ7QUFFVEMsSUFBQUEsT0FBTyxFQUFFLHlDQUZBO0FBR1Q7QUFDQUMsSUFBQUEsT0FBTyxFQUFFLEtBSkE7QUFLVEMsSUFBQUEsT0FBTyxFQUFFO0FBTEEsR0FBYjtBQU9ILENBUkEsQ0FBRCIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL2Fzc2V0cy93eXNpd3lnLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHRpbnltY2UgPSByZXF1aXJlKCd0aW55bWNlJyk7XG5yZXF1aXJlKCd0aW55bWNlL3RoZW1lcy9zaWx2ZXIvdGhlbWUnKTtcbnJlcXVpcmUoJ3RpbnltY2UvaWNvbnMvZGVmYXVsdC9pY29ucycpO1xuXG4vLyByZXF1aXJlKCd0aW55bWNlL3BsdWdpbnMvcXVpY2tiYXJzL3BsdWdpbicpO1xucmVxdWlyZSgndGlueW1jZS9wbHVnaW5zL3RhYmxlL3BsdWdpbicpO1xuLy8gcmVxdWlyZSgndGlueW1jZS9wbHVnaW5zL2xpbmsvcGx1Z2luJyk7XG5yZXF1aXJlKCd0aW55bWNlL3BsdWdpbnMvbGlzdHMvcGx1Z2luJyk7XG4vLyByZXF1aXJlKCd0aW55bWNlL3BsdWdpbnMvbWVkaWEvcGx1Z2luJyk7XG5yZXF1aXJlKCd0aW55bWNlL3BsdWdpbnMvYXV0b3Jlc2l6ZS9wbHVnaW4nKTtcbnJlcXVpcmUoJ3RpbnltY2UvcGx1Z2lucy9oZWxwL3BsdWdpbicpO1xucmVxdWlyZSgndGlueW1jZS9wbHVnaW5zL3RleHRwYXR0ZXJuL3BsdWdpbicpO1xuXG4kKGZ1bmN0aW9uICgpIHtcbiAgICB0aW55bWNlLmluaXQoe1xuICAgICAgICBzZWxlY3RvcjogJy53eXNpd3lnJyxcbiAgICAgICAgcGx1Z2luczogJ3RhYmxlIGxpc3RzIGF1dG9yZXNpemUgaGVscCB0ZXh0cGF0dGVybicsXG4gICAgICAgIC8vIHRvb2xiYXI6ICd1bmRvIHJlZG8gfCBmb3JtYXRzZWxlY3QgfCBib2xkIGl0YWxpYyB8IGFsaWdubGVmdCBhbGlnbmNlbnRyZSBhbGlnbnJpZ2h0IGFsaWduanVzdGlmeSB8IGluZGVudCBvdXRkZW50IHwgYnVsbGlzdCBudW1saXN0JyxcbiAgICAgICAgbWVudWJhcjogZmFsc2UsXG4gICAgICAgIHRvb2xiYXI6ICd1bmRvIHJlZG8gfCBib2xkIGl0YWxpY3wgaW5kZW50IG91dGRlbnQgfCBidWxsaXN0IG51bWxpc3QnLFxuICAgIH0pO1xufSkiXSwibmFtZXMiOlsidGlueW1jZSIsInJlcXVpcmUiLCIkIiwiaW5pdCIsInNlbGVjdG9yIiwicGx1Z2lucyIsIm1lbnViYXIiLCJ0b29sYmFyIl0sInNvdXJjZVJvb3QiOiIifQ==