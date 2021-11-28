let $ = jQuery = require("jquery");

require('./../lib/vakata-jstree/dist/jstree')
const bootstrap = require('bootstrap');
const bootbox = require('bootbox');
require('datatables.net-bs5');

const routes = require('../../../public/js/fos_js_routes.json');
import Routing from '../../../vendor/friendsofsymfony/jsrouting-bundle/Resources/public/js/router.min.js';

Routing.setRoutingData(routes);

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

let tree;
let wysiwyg = tinymce.init({
    selector: '.wysiwyg',
    plugins: 'table lists autoresize help textpattern',
    // toolbar: 'undo redo | formatselect | bold italic | alignleft aligncentre alignright alignjustify | indent outdent | bullist numlist',
    menubar: false,
    toolbar: 'undo redo | bold italic| indent outdent | bullist numlist',
});

class Directory {
    id;
    $node;
    $nodeParent;
    $prevId;
    $nextId;
    inputDirectoryParent;

    constructor() {
        let that = this;
        that.modal = new bootstrap.Modal($('#catalogModal'));
    }

    add() {
        let that = this;
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
        let that = this;
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

                let $nodeId = tree.jstree().create_node(that.getNodeParent(), {
                    text: `${response.catalog.name} [${response.catalog.enabled ? 'Oui' : 'Non'}]`,
                    li_attr: {
                        class: "catalog",
                    },
                    a_attr: {
                        "data-id": response.catalog.id,
                        "data-type": "catalog",
                    },
                }, "first");

                let $node = tree.jstree().get_node($nodeId);

                tree.jstree().deselect_all();
                tree.jstree().select_node($node);
                selectNode($(`#${$node.a_attr.id}`));

                that.modal.hide();
            })
        ;
    }

    edit() {
        let that = this;
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
        let that = this;
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

                tree.jstree().set_text(that.$node, `${response.catalog.name} [${response.catalog.enabled?'Oui':'Non'}]`);

                tree.jstree().deselect_all();
                tree.jstree().select_node(that.$node);
                // selectNode($(`#${that.$node.a_attr.id}`));

                that.modal.hide();
            })
        ;
    }

    setForm(response, type) {
        tinymce.remove('.wysiwyg');
        let that = this;
        let form = $(response.form).on('submit', function (e) {
            e.preventDefault();
            if ('new' === type) {
                that.addSubmit();
            } else {
                that.editSubmit();
            }
        });
        $(that.modal._element).find('.modal-content').html(form);
        wysiwyg = tinymce.init({
            selector: '.wysiwyg',
            plugins: 'table lists autoresize help textpattern',
            // toolbar: 'undo redo | formatselect | bold italic | alignleft aligncentre alignright alignjustify | indent outdent | bullist numlist',
            menubar: false,
            toolbar: 'undo redo | bold italic| indent outdent | bullist numlist',
        });
    }

    getForm() {
        return $(this.modal._element).find('.modal-content form');
    }

    changeParent(parentId) {
        let that = this;

        console.log(this.getSiblings());

        $.ajax({
            url: Routing.generate('ADMIN_AJAX_CATALOG_CATALOG_SET_PARENT', {
                id: this.id,
                parentId: parentId,
                catalogPrevId: that.$prevId,
                catalogNextId: that.$nextId,
            }),
            method: 'POST',
        });
    }

    remove() {
        console.log('remove')
        let that = this;
        bootbox.confirm("Supprimer le dossier (les dossiers enfants serons aussi supprimé)", function (result) {
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
        });
    }

    open() {
        let that = this;
        $.ajax({
            url: Routing.generate('ADMIN_AJAX_CATALOG_CATALOG_OPEN', {
                id: that.id,
            }),
        })
            .done(function (response) {
                let html = $(response.html);
                $('.catalog-content').html(html);
                $('.datatable').DataTable();
            })
        ;
    }

    getNodeParent() {
        return this.$nodeParent ? this.$nodeParent : '#';
    }

    getSiblings() {
        let that = this;
        let li = $(`#${that.$node.id}`);

        let prev = li.prev();
        let next = li.next();
        let prevnode;
        let nextnode;

        that.$prevId = null;
        that.$nextId = null;

        if (prev.length > 0) {
            prevnode = tree.jstree().get_node(prev.attr('id'));
            that.$prevId = prevnode.a_attr['data-id'];
        }
        if (next.length > 0) {
            nextnode = tree.jstree().get_node(next.attr('id'));
            that.$nextId = nextnode.a_attr['data-id'];
        }
    }


}

let directory = new Directory();


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
                if ('true' === $node.a_attr['data-is-root']) {
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
                    }
                }
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
                    // "remove": {
                    //     "separator_before": false,
                    //     "separator_after": false,
                    //     "label": "Supprimer (récursif)",
                    //     "action": function (obj) {
                    //         directory.id = $node.a_attr["data-id"];
                    //         directory.$node = $node;
                    //         directory.remove($node);
                    //     },
                    // },
                };
            },
        },

    }).on('move_node.jstree', function (data, element, helper, event) {
        let node = element.node;
        let parent = tree.jstree().get_node(tree.jstree().get_parent(node));
        let parentId = parent.a_attr ? parent.a_attr["data-id"] : null;
        directory.$node = node;
        directory.$nodeParent = parent;
        directory.id = node.a_attr["data-id"];
        directory.changeParent(parentId);
    })
    ;


    directory.id = $('[data-current-catalog]').attr('data-current-catalog');


    $('body')
        .on('click', '.tree a[data-id]', function () {
            selectNode($(this));
            directory.open();
            // redirect($(this));
        })
        .on('contextmenu', '.tree a[data-id]', function () {
            selectNode($(this));
        })
    ;
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
}