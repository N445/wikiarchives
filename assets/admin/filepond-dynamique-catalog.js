const $ = jQuery = require("jquery");
const routes = require('../../public/js/fos_js_routes.json');
import Routing from '../../vendor/friendsofsymfony/jsrouting-bundle/Resources/public/js/router.min.js';
import * as FilePond from "filepond";
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
FilePond.registerPlugin(FilePondPluginFileValidateType);

Routing.setRoutingData(routes);

let filepond;
let inputElement;
let form = $('form');

const lang = $('html').attr('lang');
let labelIdle = 'Drag and drop your files or <span class="filepond--label-action"> Browse </span>';
if ('fr' === lang) {
    labelIdle = 'Glissez et déposez vos fichiers ou <span class="filepond--label-action"> Parcourir </span>';
}

$(function () {
    inputElement = document.querySelector('.filepond');
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

    setUrl($('select[name="catalog"]').val());
    $('select[name="catalog"]').on('change', function (e) {
        setUrl($(this).val());
    })
});

function setUrl(catalogId) {
    form.attr('action', Routing.generate('AJAX_CATALOG_PICTURE_FILEPOND', {
        'catalogId': catalogId,
    }));
    filepond.server.url = form.attr('action');
}