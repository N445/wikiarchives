require('./../../lib/vakata-jstree/dist/jstree')
const bootstrap = require('bootstrap');
const routes = require('../../../public/js/fos_js_routes.json');
import Routing from '../../../vendor/friendsofsymfony/jsrouting-bundle/Resources/public/js/router.min.js';
Routing.setRoutingData(routes);
// const $ = require('jquery');
// require('jquery-filepond/filepond.jquery');

class Directory {
    id;
    $node;
    $nodeParent;
    inputDirectoryParent;

    constructor() {
        var that = this;
        // that.modalAdd = $('#catalogModalAdd');
        // that.modalAdd = new bootstrap.Modal(document.getElementById('myModal'), options);
        that.modalAdd = new bootstrap.Modal($('#catalogModalAdd'));

        that.modalAddForm = $('#catalogModalAdd').find('form').on('submit', function (e) {
            e.preventDefault();
            that.addSubmit();
        });
        that.inputDirectoryParent = that.modalAddForm.find('#ajax_catalog_tree_parent');


        that.modalEdit = $('#catalogModalEdit');
        that.modalEditContent = that.modalEdit.find('.editCatalogContent');
    }

    hideAddModal() {
        this.modalAdd.modal('hide');
    }

    hideEditModal() {
        this.modalEdit.modal('hide');
    }

    add() {
        this.inputDirectoryParent.val(this.id);
        this.modalAdd.show();
    }

    addSubmit() {
        var that = this;
        $.ajax({
            url: Routing.generate('ADMIN_AJAX_ADMIN_CATALOG_CATALOG_ADD'),
            method: 'POST',
            dataType: 'json',
            processData: false,
            contentType: false,
            data: new FormData(this.modalAddForm[0]),
        })
            .done(function (response) {
                if (!response.success) {
                    addNoty('error', response.message);
                    $(response.html).on('submit', function (e) {
                        e.preventDefault();
                        that.addSubmit();
                    });
                    that.modalAddForm.replaceWith(response.html);
                    return false;
                }

                var $nodeId = tree.jstree().create_node(that.getNodeParent(), {
                    text: response.directory.name + '[<span class="nb-laws">0</span>]',
                    icon: response.directory.file ? '/' + response.directory.file.file : null,
                    li_attr: {
                        class: "law-directory",
                    },
                    a_attr: {
                        "data-directory-id": response.directory.id,
                        "data-type": "directory",
                    },
                }, "last");
                var $node = tree.jstree().get_node($nodeId);


                tree.jstree().deselect_all();
                tree.jstree().select_node($node);
                selectNode($(`#${$node.a_attr.id}`));

                that.inputDirectoryParent.append($('<option>', {
                    value: response.directory.id,
                    text: response.directory.name,
                }));

                that.modalAddForm[0].reset();
                that.hideAddModal();
            })
            .always(function () {
            })
        ;
    }

    changeParent(parentId) {
        $.ajax({
            url: Routing.generate('AJAX_LAW_DIRECTORY_SET_PARENT', {
                siteid: SITE_ID,
                id: this.id,
                parentId: parentId,
            }),
            method: 'POST',
        });
    }

    edit() {
        var that = this;
        $.ajax({
            url: Routing.generate('AJAX_LAW_DIRECTORY_EDIT', {
                siteid: SITE_ID,
                id: that.id,
            }),
            method: 'GET',
        })
            .done(function (response) {
                that.modalEditForm = $(response.html);
                that.modalEditContent.html(that.modalEditForm);
                that.modalEdit.modal('show');
                that.modalEditForm.on('submit', function (e) {
                    e.preventDefault();
                    that.editSubmit();
                });
            })
        ;
    }

    editSubmit() {
        var that = this;
        $.ajax({
            url: Routing.generate('AJAX_LAW_DIRECTORY_EDIT', {
                siteid: SITE_ID,
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


                tree.jstree().set_text(that.$node, response.directory.name + '[<span class="nb-laws">0</span>]');
                tree.jstree().set_icon(that.$node, '/' + response.directory.file.file);


                tree.jstree().deselect_all();
                tree.jstree().select_node(that.$node);
                selectNode($(`#${that.$node.a_attr.id}`));

                that.modalEditForm[0].reset();
                that.hideEditModal();
            })
            .always(function () {
                loader.addClass('d-none');
            })
        ;
    }

    remove() {
        var that = this;
        bootbox.confirm("Supprimer le dossier (les dossiers enfants serons aussi supprimé)", function (result) {
            if (ajax) {
                return false;
            }
            loader.removeClass('d-none');

            $.ajax({
                url: Routing.generate('AJAX_LAW_DIRECTORY_REMOVE', {
                    siteid: SITE_ID,
                    id: that.id,
                }),
                method: 'POST',
                dataType: 'json',
            })
                .done(function (response) {
                    tree.jstree().delete_node(that.$node);
                    selectNode($('.tree a[data-directory-id]'));
                })
                .always(function () {
                    loader.addClass('d-none');
                })
            ;
        });
    }

    open() {
        var that = this;
        if (ajax) {
            return false;
        }
        loader.removeClass('d-none');
        $.ajax({
            url: Routing.generate('AJAX_LAW_DIRECTORY_OPEN', {
                siteid: SITE_ID,
                id: that.id,
            }),
        })
            .done(function (response) {
                var html = $(response.html);
                html.find('.law-show').on('click', function () {
                    file.id = $(this).closest('tr').attr('id');
                    file.directoryId = that.id;
                    file.show();
                });
                html.find('.law-edit').on('click', function () {
                    file.id = $(this).closest('tr').attr('id');
                    file.directoryId = that.id;
                    file.edit();
                });
                html.find('.law-remove').on('click', function () {
                    file.id = $(this).closest('tr').attr('id');
                    file.directoryId = that.id;
                    file.remove();
                });
                $('.directory-content').html(html);
                $(`.tree [data-directory-id=${that.id}]`).find('.nb-laws').html(response.nb_laws);
            })
            .always(function () {
                loader.addClass('d-none');
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

                selectNode($(`#${$node.a_attr.id}`));

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


let tree = null;

$(function () {
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
                            directory.id = $node.a_attr["data-directory-id"];
                            directory.$nodeParent = $node;
                            directory.add();
                        },
                    },
                    "edit": {
                        "separator_before": false,
                        "separator_after": false,
                        "label": "Modifier",
                        "action": function (obj) {
                            directory.id = $node.a_attr["data-directory-id"];
                            directory.$node = $node;
                            directory.edit();
                        },
                    },
                    "remove": {
                        "separator_before": false,
                        "separator_after": false,
                        "label": "Supprimer (récursif)",
                        "action": function (obj) {
                            directory.id = $node.a_attr["data-directory-id"];
                            directory.$node = $node;
                            directory.remove($node);
                        },
                    },
                    "createFile": {
                        "separator_before": true,
                        "separator_after": false,
                        "label": "Ajouter fichier légal",
                        "action": function (obj) {
                            file.directoryId = $node.a_attr["data-directory-id"];
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
        var parentId = parent.a_attr ? parent.a_attr["data-directory-id"] : null;
        directory.id = node.a_attr["data-directory-id"];
        directory.changeParent(parentId);
    })
    ;

    $('body')
        .on('click', '.tree a[data-directory-id]', function () {
            selectNode($(this));
        })
        .on('contextmenu', '.tree a[data-directory-id]', function () {
            selectNode($(this));
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
});
