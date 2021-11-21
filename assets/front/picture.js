require('slick-carousel');


let catalogNavigationSlider = $('.catalog-navigation').slick({
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 5,
    arrows: false
    // centerMode: true,
    // initialSlide: currentPicture
});


// let currentPicture = $('.catalog-navigation .slick-slide:not(.slick-cloned)  .current-picture');
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