const tinymce = require('tinymce');
require('tinymce/themes/silver/theme');
require('tinymce/icons/default/icons');

$(function () {
    $('.wysiwyg')
    tinymce.init({
        selector: '.wysiwyg'
    });
})