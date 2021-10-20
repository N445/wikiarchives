// const Diff2Html = require('diff2html');
import htmldiff from './lib/htmldiff';


let originalHTML = $('.current').html();
let newHTML = $('.final').html();

let output = htmldiff(originalHTML, newHTML);

$('.final').html(output)


let originalHTMLExif = $('.current-exif').html();
let newHTMLExif = $('.final-exif').html();

let outputExif = htmldiff(originalHTMLExif, newHTMLExif);

$('.final-exif').html(outputExif)