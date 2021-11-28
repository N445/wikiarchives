// const Diff2Html = require('diff2html');
import htmldiff from './lib/htmldiff';

$.each($('.git-diff'), function (key, item) {
    item = $(item);
    let originalHTML = item.find('.current').html();
    let newHTML = item.find('.final').html();

    let output = htmldiff(originalHTML, newHTML);

    item.find('.final').html(output)
})

// let originalHTML = $('.current').html();
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