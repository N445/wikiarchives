(self["webpackChunk"] = self["webpackChunk"] || []).push([["picture-js"],{

/***/ "./assets/front/picture.js":
/*!*********************************!*\
  !*** ./assets/front/picture.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
__webpack_require__(/*! slick-carousel */ "./node_modules/slick-carousel/slick/slick.js");

var catalogNavigationSlider = $('.catalog-navigation').slick({
  infinite: true,
  slidesToShow: 5,
  slidesToScroll: 5,
  arrows: false // centerMode: true,
  // initialSlide: currentPicture

}); // let currentPicture = $('.catalog-navigation .slick-slide:not(.slick-cloned)  .current-picture');
// let currentPictureSlide = currentPicture.closest('.slick-slide');
// let currentPictureId = currentPictureSlide.attr('data-slick-index');
//
//
// console.log(currentPicture)
// console.log(currentPictureSlide)
// console.log(currentPictureId)
//
//
// catalogNavigationSlider.slick('slickGoTo', currentPictureId);
// // catalogNavigationSlider.slick('slickSetOption', 'initialSlide', currentPictureId);

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendors-node_modules_jquery_dist_jquery_js","vendors-node_modules_slick-carousel_slick_slick_js"], () => (__webpack_exec__("./assets/front/picture.js")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGljdHVyZS1qcy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQUEsbUJBQU8sQ0FBQyxvRUFBRCxDQUFQOztBQUdBLElBQUlDLHVCQUF1QixHQUFHQyxDQUFDLENBQUMscUJBQUQsQ0FBRCxDQUF5QkMsS0FBekIsQ0FBK0I7QUFDekRDLEVBQUFBLFFBQVEsRUFBRSxJQUQrQztBQUV6REMsRUFBQUEsWUFBWSxFQUFFLENBRjJDO0FBR3pEQyxFQUFBQSxjQUFjLEVBQUUsQ0FIeUM7QUFJekRDLEVBQUFBLE1BQU0sRUFBRSxLQUppRCxDQUt6RDtBQUNBOztBQU55RCxDQUEvQixDQUE5QixFQVVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL2Fzc2V0cy9mcm9udC9waWN0dXJlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbInJlcXVpcmUoJ3NsaWNrLWNhcm91c2VsJyk7XG5cblxubGV0IGNhdGFsb2dOYXZpZ2F0aW9uU2xpZGVyID0gJCgnLmNhdGFsb2ctbmF2aWdhdGlvbicpLnNsaWNrKHtcbiAgICBpbmZpbml0ZTogdHJ1ZSxcbiAgICBzbGlkZXNUb1Nob3c6IDUsXG4gICAgc2xpZGVzVG9TY3JvbGw6IDUsXG4gICAgYXJyb3dzOiBmYWxzZVxuICAgIC8vIGNlbnRlck1vZGU6IHRydWUsXG4gICAgLy8gaW5pdGlhbFNsaWRlOiBjdXJyZW50UGljdHVyZVxufSk7XG5cblxuLy8gbGV0IGN1cnJlbnRQaWN0dXJlID0gJCgnLmNhdGFsb2ctbmF2aWdhdGlvbiAuc2xpY2stc2xpZGU6bm90KC5zbGljay1jbG9uZWQpICAuY3VycmVudC1waWN0dXJlJyk7XG4vLyBsZXQgY3VycmVudFBpY3R1cmVTbGlkZSA9IGN1cnJlbnRQaWN0dXJlLmNsb3Nlc3QoJy5zbGljay1zbGlkZScpO1xuLy8gbGV0IGN1cnJlbnRQaWN0dXJlSWQgPSBjdXJyZW50UGljdHVyZVNsaWRlLmF0dHIoJ2RhdGEtc2xpY2staW5kZXgnKTtcbi8vXG4vL1xuLy8gY29uc29sZS5sb2coY3VycmVudFBpY3R1cmUpXG4vLyBjb25zb2xlLmxvZyhjdXJyZW50UGljdHVyZVNsaWRlKVxuLy8gY29uc29sZS5sb2coY3VycmVudFBpY3R1cmVJZClcbi8vXG4vL1xuLy8gY2F0YWxvZ05hdmlnYXRpb25TbGlkZXIuc2xpY2soJ3NsaWNrR29UbycsIGN1cnJlbnRQaWN0dXJlSWQpO1xuLy8gLy8gY2F0YWxvZ05hdmlnYXRpb25TbGlkZXIuc2xpY2soJ3NsaWNrU2V0T3B0aW9uJywgJ2luaXRpYWxTbGlkZScsIGN1cnJlbnRQaWN0dXJlSWQpOyJdLCJuYW1lcyI6WyJyZXF1aXJlIiwiY2F0YWxvZ05hdmlnYXRpb25TbGlkZXIiLCIkIiwic2xpY2siLCJpbmZpbml0ZSIsInNsaWRlc1RvU2hvdyIsInNsaWRlc1RvU2Nyb2xsIiwiYXJyb3dzIl0sInNvdXJjZVJvb3QiOiIifQ==