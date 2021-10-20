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
// require('tinymce/plugins/table/plugin');
// require('tinymce/plugins/link/plugin');


__webpack_require__(/*! tinymce/plugins/lists/plugin */ "./node_modules/tinymce/plugins/lists/plugin.js"); // require('tinymce/plugins/media/plugin');


__webpack_require__(/*! tinymce/plugins/autoresize/plugin */ "./node_modules/tinymce/plugins/autoresize/plugin.js");

__webpack_require__(/*! tinymce/plugins/help/plugin */ "./node_modules/tinymce/plugins/help/plugin.js");

__webpack_require__(/*! tinymce/plugins/textpattern/plugin */ "./node_modules/tinymce/plugins/textpattern/plugin.js");

$(function () {
  $('.wysiwyg');
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
/******/ __webpack_require__.O(0, ["vendors-node_modules_jquery_dist_jquery_js","vendors-node_modules_tinymce_icons_default_icons_js-node_modules_tinymce_plugins_autoresize_p-a89b51"], () => (__webpack_exec__("./assets/wysiwyg.js")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid3lzaXd5Zy1qcy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxJQUFNQSxPQUFPLEdBQUdDLG1CQUFPLENBQUMsa0RBQUQsQ0FBdkI7O0FBQ0FBLG1CQUFPLENBQUMsa0ZBQUQsQ0FBUDs7QUFDQUEsbUJBQU8sQ0FBQyxrRkFBRCxDQUFQLEVBRUE7QUFDQTtBQUNBOzs7QUFDQUEsbUJBQU8sQ0FBQyxvRkFBRCxDQUFQLEVBQ0E7OztBQUNBQSxtQkFBTyxDQUFDLDhGQUFELENBQVA7O0FBQ0FBLG1CQUFPLENBQUMsa0ZBQUQsQ0FBUDs7QUFDQUEsbUJBQU8sQ0FBQyxnR0FBRCxDQUFQOztBQUVBQyxDQUFDLENBQUMsWUFBWTtBQUNWQSxFQUFBQSxDQUFDLENBQUMsVUFBRCxDQUFEO0FBQ0FGLEVBQUFBLE9BQU8sQ0FBQ0csSUFBUixDQUFhO0FBQ1RDLElBQUFBLFFBQVEsRUFBRSxVQUREO0FBRVRDLElBQUFBLE9BQU8sRUFBRSx5Q0FGQTtBQUdUO0FBQ0FDLElBQUFBLE9BQU8sRUFBRSxLQUpBO0FBS1RDLElBQUFBLE9BQU8sRUFBRTtBQUxBLEdBQWI7QUFPSCxDQVRBLENBQUQiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvd3lzaXd5Zy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCB0aW55bWNlID0gcmVxdWlyZSgndGlueW1jZScpO1xucmVxdWlyZSgndGlueW1jZS90aGVtZXMvc2lsdmVyL3RoZW1lJyk7XG5yZXF1aXJlKCd0aW55bWNlL2ljb25zL2RlZmF1bHQvaWNvbnMnKTtcblxuLy8gcmVxdWlyZSgndGlueW1jZS9wbHVnaW5zL3F1aWNrYmFycy9wbHVnaW4nKTtcbi8vIHJlcXVpcmUoJ3RpbnltY2UvcGx1Z2lucy90YWJsZS9wbHVnaW4nKTtcbi8vIHJlcXVpcmUoJ3RpbnltY2UvcGx1Z2lucy9saW5rL3BsdWdpbicpO1xucmVxdWlyZSgndGlueW1jZS9wbHVnaW5zL2xpc3RzL3BsdWdpbicpO1xuLy8gcmVxdWlyZSgndGlueW1jZS9wbHVnaW5zL21lZGlhL3BsdWdpbicpO1xucmVxdWlyZSgndGlueW1jZS9wbHVnaW5zL2F1dG9yZXNpemUvcGx1Z2luJyk7XG5yZXF1aXJlKCd0aW55bWNlL3BsdWdpbnMvaGVscC9wbHVnaW4nKTtcbnJlcXVpcmUoJ3RpbnltY2UvcGx1Z2lucy90ZXh0cGF0dGVybi9wbHVnaW4nKTtcblxuJChmdW5jdGlvbiAoKSB7XG4gICAgJCgnLnd5c2l3eWcnKVxuICAgIHRpbnltY2UuaW5pdCh7XG4gICAgICAgIHNlbGVjdG9yOiAnLnd5c2l3eWcnLFxuICAgICAgICBwbHVnaW5zOiAndGFibGUgbGlzdHMgYXV0b3Jlc2l6ZSBoZWxwIHRleHRwYXR0ZXJuJyxcbiAgICAgICAgLy8gdG9vbGJhcjogJ3VuZG8gcmVkbyB8IGZvcm1hdHNlbGVjdCB8IGJvbGQgaXRhbGljIHwgYWxpZ25sZWZ0IGFsaWduY2VudHJlIGFsaWducmlnaHQgYWxpZ25qdXN0aWZ5IHwgaW5kZW50IG91dGRlbnQgfCBidWxsaXN0IG51bWxpc3QnLFxuICAgICAgICBtZW51YmFyOiBmYWxzZSxcbiAgICAgICAgdG9vbGJhcjogJ3VuZG8gcmVkbyB8IGJvbGQgaXRhbGljfCBpbmRlbnQgb3V0ZGVudCB8IGJ1bGxpc3QgbnVtbGlzdCcsXG4gICAgfSk7XG59KSJdLCJuYW1lcyI6WyJ0aW55bWNlIiwicmVxdWlyZSIsIiQiLCJpbml0Iiwic2VsZWN0b3IiLCJwbHVnaW5zIiwibWVudWJhciIsInRvb2xiYXIiXSwic291cmNlUm9vdCI6IiJ9