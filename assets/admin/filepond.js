const $ = jQuery = require("jquery");

import * as FilePond from "filepond";
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';

FilePond.registerPlugin(FilePondPluginFileValidateType);

let filepond;

const lang = $('html').attr('lang');
let labelIdle = 'Glissez et déposez vos fichiers ou <span class="filepond--label-action"> Parcourir </span>';
if ('en' === lang) {
    labelIdle = 'Drag and drop your files or <span class="filepond--label-action"> Browse </span>';
}

$(function () {
    const inputElement = document.querySelector('.filepond');
    filepond = FilePond.create(inputElement, {
        allowMultiple: true,
        server: $('.filepond').closest('form').attr('action'),
        maxParallelUploads: 10,
        allowDrop: true,
        allowRevert: false,
        labelIdle: labelIdle,
        allowFileTypeValidation: true,
        acceptedFileTypes: ['image/*','application/zip'],
    });


    // document.addEventListener('FilePond:processfiles', (e) => {
    //     filepond.removeFiles();
    // });
});
