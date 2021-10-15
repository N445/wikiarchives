var $ = jQuery = require("jquery");

require('./../../lib/vakata-jstree/dist/jstree')
const bootstrap = require('bootstrap');
// const FilePond = require('filepond');
import * as FilePond from "filepond";

// import FilePond from 'filepond';
// require('jquery-filepond/filepond.jquery');
// var bootbox = require('bootbox');
// const noty = require('noty');

const routes = require('../../../public/js/fos_js_routes.json');
import Routing from '../../../vendor/friendsofsymfony/jsrouting-bundle/Resources/public/js/router.min.js';

Routing.setRoutingData(routes);

class Directory {
    id;
    $node;
    $nodeParent;
    inputDirectoryParent;

    constructor() {
        var that = this;
        that.modal = new bootstrap.Modal($('#catalogModal'));
    }

    add() {
        var that = this;
        $.ajax({
            url: Routing.generate('ADMIN_AJAX_CATALOG_CATALOG_ADD', {
                parentCatalogId: that.id
            }),
            method: 'GET',
        })
            .done(function (response) {
                that.setForm(response, 'new');
                that.modal.show();
            })
        ;
    }

    addSubmit() {
        var that = this;
        $.ajax({
            url: Routing.generate('ADMIN_AJAX_CATALOG_CATALOG_ADD'),
            method: 'POST',
            dataType: 'json',
            processData: false,
            contentType: false,
            data: new FormData(this.getForm()[0]),
        })
            .done(function (response) {
                that.setForm(response);
                if (!response.success) {
                    // addNoty('error', response.message);
                    return false;
                }

                var $nodeId = tree.jstree().create_node(that.getNodeParent(), {
                    text: response.catalog.name,
                    li_attr: {
                        class: "catalog",
                    },
                    a_attr: {
                        "data-id": response.catalog.id,
                        "data-type": "catalog",
                    },
                }, "first");

                var $node = tree.jstree().get_node($nodeId);

                tree.jstree().deselect_all();
                tree.jstree().select_node($node);
                selectNode($(`#${$node.a_attr.id}`));

                that.modal.hide();
            })
        ;
    }

    edit() {
        var that = this;
        $.ajax({
            url: Routing.generate('ADMIN_AJAX_CATALOG_CATALOG_EDIT', {
                id: that.id,
            }),
            method: 'GET',
        })
            .done(function (response) {
                that.setForm(response, 'edit');
                that.modal.show();
            })
        ;
    }

    editSubmit() {
        var that = this;
        $.ajax({
            url: Routing.generate('ADMIN_AJAX_CATALOG_CATALOG_EDIT', {
                id: that.id,
            }),
            method: 'POST',
            dataType: 'json',
            processData: false,
            contentType: false,
            data: new FormData(this.getForm()[0]),
        })
            .done(function (response) {
                that.setForm(response);
                if (!response.success) {
                    // addNoty('error', response.message);
                    return false;
                }


                tree.jstree().set_text(that.$node, response.catalog.name);


                tree.jstree().deselect_all();
                tree.jstree().select_node(that.$node);
                // selectNode($(`#${that.$node.a_attr.id}`));

                that.modal.hide();
            })
        ;
    }

    setForm(response, type) {
        var that = this;
        var form = $(response.form).on('submit', function (e) {
            e.preventDefault();
            if ('new' === type) {
                that.addSubmit();
            } else {
                that.editSubmit();
            }
        });
        $(that.modal._element).find('.modal-content').html(form);
    }

    getForm() {
        return $(this.modal._element).find('.modal-content form');
    }

    changeParent(parentId) {
        $.ajax({
            url: Routing.generate('ADMIN_AJAX_CATALOG_CATALOG_SET_PARENT', {
                id: this.id,
                parentId: parentId,
            }),
            method: 'POST',
        });
    }

    remove() {
        var that = this;
        // bootbox.confirm("Supprimer le dossier (les dossiers enfants serons aussi supprimé)", function (result) {
        $.ajax({
            url: Routing.generate('ADMIN_AJAX_CATALOG_CATALOG_REMOVE', {
                id: that.id,
            }),
            method: 'POST',
            dataType: 'json',
        })
            .done(function (response) {
                tree.jstree().delete_node(that.$node);
                selectNode($('.tree a[data-id]'));
            })
        ;
        // });
    }

    open() {
        var that = this;
        $.ajax({
            url: Routing.generate('ADMIN_AJAX_CATALOG_CATALOG_OPEN', {
                id: that.id,
            }),
        })
            .done(function (response) {
                var html = $(response.html);
                $('.catalog-content').html(html);
            })
        ;
    }

    getNodeParent() {
        return this.$nodeParent ? this.$nodeParent : '#';
    }


}

class File {
    id;
    modalAdd;
    modalAddContent;
    modalAddForm;
    $nodeParent;
    directoryId;
    directoryNbMinDay;
    modalEdit;
    modalEditForm;
    modalEditContent;

    constructor() {
        var that = this;
        that.modalAdd = $('#lawModalAdd');
        that.modalAddContent = that.modalAdd.find('.newLawContent');
        that.modalAddForm = that.modalAdd.find('form').on('submit', function (e) {
            e.preventDefault();
            that.addSumbit();
        });

        that.modalEdit = $('#lawModalEdit');
        that.modalEditContent = that.modalEdit.find('.editLawContent');

        that.modalShow = $('#lawModalShow');
        that.modalShowContent = that.modalShow.find('.showLawContent');
    }

    hideAddModal() {
        this.modalAdd.modal('hide');
    }

    hideEditModal() {
        this.modalEdit.modal('hide');
    }

    add() {
        var that = this;
        $.ajax({
            url: Routing.generate('AJAX_LAW_NEW', {
                siteid: SITE_ID,
                directoryId: that.directoryId,
            }),
            method: 'GET',
        })
            .done(function (response) {
                that.modalAddForm = $(response.html);
                that.modalAddContent.html(that.modalAddForm);
                that.modalAdd.modal('show');
                that.initFlatPikr(that.modalAddForm);

                that.modalAddForm.on('submit', function (e) {
                    e.preventDefault();
                    that.addSumbit();
                });
            })
        ;


    }

    addSumbit() {
        var that = this;
        $.ajax({
            url: Routing.generate('AJAX_LAW_NEW', {
                'siteid': SITE_ID,
                'directoryId': that.directoryId,
            }),
            method: 'POST',
            dataType: 'json',
            processData: false,
            contentType: false,
            data: new FormData(that.modalAddForm[0]),
            context: this,
        })
            .done(function (response) {

                if (!response.success) {
                    addNoty('error', response.message);
                    var html = $(response.html);
                    html.on('submit', function (e) {
                        e.preventDefault();
                        that.addSumbit();
                    });

                    that.modalAddForm.replaceWith(html);
                    that.modalAddForm = html;
                    that.initFlatPikr(html);
                    return false;
                }

                var $node = tree.jstree().get_node(that.$node);

                // selectNode($(`#${$node.a_attr.id}`));

                that.modalAddForm[0].reset();
                that.hideAddModal();
            })
            .always(function () {
                loader.addClass('d-none');
            })
        ;
    }

    edit() {
        var that = this;
        $.ajax({
            url: Routing.generate('AJAX_LAW_EDIT', {
                siteid: SITE_ID,
                directoryId: that.directoryId,
                id: that.id,
            }),
            method: 'GET',
        })
            .done(function (response) {
                that.modalEditForm = $(response.html);

                that.modalEditForm.on('submit', function (e) {
                    e.preventDefault();
                    that.editSubmit();
                });
                that.modalEditContent.html(that.modalEditForm);
                that.initFlatPikr(that.modalEditForm);

                that.modalEdit.modal('show');
            })
        ;
    }

    editSubmit() {
        var that = this;
        $.ajax({
            url: Routing.generate('AJAX_LAW_EDIT', {
                siteid: SITE_ID,
                directoryId: that.directoryId,
                id: that.id,
            }),
            method: 'POST',
            dataType: 'json',
            processData: false,
            contentType: false,
            data: new FormData(this.modalEditForm[0]),
        })
            .done(function (response) {
                if (!response.success) {
                    addNoty('error', response.message);
                    that.modalEditForm.replaceWith(response.html);
                    that.modalEditForm = $(response.html);
                    that.modalEditForm.on('submit', function (e) {
                        e.preventDefault();
                        that.editSubmit();
                    });
                    return false;
                }

                directory.open();

                that.modalEditForm[0].reset();
                that.hideEditModal();
            })
            .always(function () {
                loader.addClass('d-none');
            })
        ;
    }

    show() {
        var that = this;
        $.ajax({
            url: Routing.generate('AJAX_LAW_SHOW', {
                siteid: SITE_ID,
                directoryId: that.directoryId,
                id: that.id,
            }),
            method: 'GET',
        })
            .done(function (response) {
                that.modalShowContent.html($(response.html));
                that.modalShow.modal('show');
            })
        ;
    }

    remove() {
        var that = this;
        bootbox.confirm("Supprimer le fichier", function (result) {
            if (ajax) {
                return false;
            }
            loader.removeClass('d-none');

            $.ajax({
                url: Routing.generate('AJAX_LAW_DELETE', {
                    siteid: SITE_ID,
                    directoryId: that.directoryId,
                    id: that.id,
                }),
                method: 'POST',
                dataType: 'json',
            })
                .done(function (response) {
                    directory.open();
                })
                .always(function () {
                    loader.addClass('d-none');
                })
            ;
        });
    }

    initFlatPikr(html) {
        let that = this;
        let $html = $(html);

        that.directoryNbMinDay = parseInt($html.find('[data-min-days]').attr('data-min-days'));

        let startAt = $html.find('.input-date-start-at');
        let endAt = $html.find('.input-date-end-at');

        startAt = startAt.flatpickr({
            altFormat: 'l j F Y H:i',
            locale: 'fr',
            altInput: true,
            time_24hr: true,
            enableTime: true,
            minuteIncrement: 1,
            // defaultDate: '2020-05-16',
            onChange: function (selectedDates, dateStr, instance) {
                let minDate = new Date(dateStr);
                minDate.setDate(minDate.getDate() + that.directoryNbMinDay);
                endAt.set('minDate', minDate);
            },
        });

        endAt = endAt.flatpickr({
            altFormat: 'l j F Y H:i',
            locale: 'fr',
            altInput: true,
            time_24hr: true,
            enableTime: true,
            minuteIncrement: 1,
            // defaultDate: '2020-05-16',
            onChange: function (selectedDates, dateStr, instance) {
                let maxDate = new Date(dateStr);
                maxDate.setDate(maxDate.getDate() - that.directoryNbMinDay);
                startAt.set('maxDate', maxDate);
            },
        });
    }
}

let directory = new Directory();
let file = new File();


let tree;
let filepond;

$(function () {
    // FilePond.create($('.filepond'));


    const inputElement = document.querySelector('.filepond');
    filepond = FilePond.create(inputElement, {
        allowMultiple: true,
        server: {
            process: {
                method: 'POST',
            },
        },
        maxParallelUploads: 5,
        allowDrop: true,
        allowRevert: false,
        labelIdle: 'Glissez et déposez vos fichiers ou <span class="filepond--label-action"> Parcourir </span>',
    });


    tree = $('#jstree-catalog .tree').jstree({
        "core": {
            "check_callback": true,
        },
        "plugins": [
            "contextmenu",
            "dnd",
        ],
        "contextmenu": {
            "items": function ($node) {
                return {
                    "create": {
                        "separator_before": false,
                        "separator_after": false,
                        "label": "Ajouter",
                        "action": function (obj) {
                            directory.id = $node.a_attr["data-id"];
                            directory.$nodeParent = $node;
                            directory.add();
                        },
                    },
                    "edit": {
                        "separator_before": false,
                        "separator_after": false,
                        "label": "Modifier",
                        "action": function (obj) {
                            directory.id = $node.a_attr["data-id"];
                            directory.$node = $node;
                            directory.edit();
                        },
                    },
                    "remove": {
                        "separator_before": false,
                        "separator_after": false,
                        "label": "Supprimer (récursif)",
                        "action": function (obj) {
                            directory.id = $node.a_attr["data-id"];
                            directory.$node = $node;
                            directory.remove($node);
                        },
                    },
                    "createFile": {
                        "separator_before": true,
                        "separator_after": false,
                        "label": "Ajouter fichier légal",
                        "action": function (obj) {
                            file.directoryId = $node.a_attr["data-id"];
                            file.$node = $node;
                            file.add();
                        },
                    },

                };
            },
        },

    }).on('move_node.jstree', function (data, element, helper, event) {
        var node = element.node;
        var parent = tree.jstree().get_node(tree.jstree().get_parent(node));
        var parentId = parent.a_attr ? parent.a_attr["data-id"] : null;
        directory.id = node.a_attr["data-id"];
        directory.changeParent(parentId);
    })
    ;


    // selectNode($('.tree a[data-id]'));
    directory.id = $('[data-current-catalog]').attr('data-current-catalog');
    filepond.setOptions({
        server: {
            process: {
                url: Routing.generate('AJAX_CATALOG_PICTURE_FILEPOND', {
                    'directoryId': directory.id,
                }),
            },
        },
    });
    //
    // directory.id = $('.tree a[data-id]').attr('data-id');

    $('body')
        .on('click', '.tree a[data-id]', function () {
            selectNode($(this));
            redirect($(this));
        })
        .on('contextmenu', '.tree a[data-id]', function () {
            selectNode($(this));
            redirect($(this));
        })
    ;

    $('.add-root-catalog').on('click', function () {
        directory.id = null;
        directory.$nodeParent = '#';
        directory.add();
    })
    ;

    $('body').on('click', '.law-delete', function (e) {
        e.preventDefault();
        $.ajax({
            url: $(this).attr('action'),
            method: 'POST',
            data: $(this).serialize(),
        })
            .done(function (response) {
                directory.open();
            })
        ;
    });

    document.addEventListener('FilePond:processfiles', (e) => {
        directory.open();
        filepond.removeFiles();
    });
});


function redirect(element) {
    window.location.replace(element.attr('href'));
    return false;
}


function selectNode(element) {
    if (!element.attr('data-id')) {
        return false;
    }

    directory.id = element.attr('data-id');


    // tree.jstree().deselect_node(tree.jstree().node);
    // tree.jstree().select_node(tree.jstree().get_node(element.attr('id')));

    // directory.open();

    filepond.removeFiles();
    filepond.setOptions({
        server: {
            process: {
                url: Routing.generate('AJAX_CATALOG_PICTURE_FILEPOND', {
                    'directoryId': directory.id,
                }),
            },
        },
    });
}