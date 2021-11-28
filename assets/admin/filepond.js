const $ = jQuery = require("jquery");

import * as FilePond from "filepond";
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
FilePond.registerPlugin(FilePondPluginFileValidateType);

let filepond;

$(function () {
    const inputElement = document.querySelector('.filepond');
    filepond = FilePond.create(inputElement, {
        allowMultiple: true,
        server: $('.filepond').closest('form').attr('action'),
        maxParallelUploads: 10,
        allowDrop: true,
        allowRevert: false,
        labelIdle: 'Glissez et déposez vos fichiers ou <span class="filepond--label-action"> Parcourir </span>',
        allowFileTypeValidation: true,
        acceptedFileTypes: ['image/png'],
    });


    // document.addEventListener('FilePond:processfiles', (e) => {
    //     filepond.removeFiles();
    // });
});