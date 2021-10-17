// add-collection-widget.js
jQuery(document).ready(function () {

    const tags = document.querySelectorAll('.exif-row')
    tags.forEach((tag) => {
        addDeleteEventForRow($(tag))
    })


    jQuery('.add-another-collection-widget').click(function (e) {
        var list = jQuery(jQuery(this).attr('data-list-selector'));
        var counter = list.data('widget-counter') || list.children().length;

        var newWidget = list.attr('data-prototype');
        newWidget = newWidget.replace(/__name__/g, counter);
        counter++;
        list.data('widget-counter', counter);

        var newElem = jQuery(list.attr('data-widget-tags')).html(newWidget);
        addDeleteEventForRow(newElem);
        newElem.appendTo(list);
    });
});

function addDeleteEventForRow(tag) {
    tag.find('.delete-collection-widget').on('click', function () {
        tag.remove();
    })
}