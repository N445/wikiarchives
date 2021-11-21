const tinymce = require('tinymce');
require('tinymce/themes/silver/theme');
require('tinymce/icons/default/icons');

// require('tinymce/plugins/quickbars/plugin');
require('tinymce/plugins/table/plugin');
// require('tinymce/plugins/link/plugin');
require('tinymce/plugins/lists/plugin');
// require('tinymce/plugins/media/plugin');
require('tinymce/plugins/autoresize/plugin');
require('tinymce/plugins/help/plugin');
require('tinymce/plugins/textpattern/plugin');

$(function () {
    tinymce.init({
        selector: '.wysiwyg',
        plugins: 'table lists autoresize help textpattern',
        // toolbar: 'undo redo | formatselect | bold italic | alignleft aligncentre alignright alignjustify | indent outdent | bullist numlist',
        menubar: false,
        toolbar: 'undo redo | bold italic| indent outdent | bullist numlist',
    });
})