function all() {
    $('.picture-card').addClass('selected');
}

function none() {
    $('.picture-card').removeClass('selected');
}

function custom() {
    $('[data-button-action]').removeClass('active');
    $('[data-button-action="custom"]').addClass('active');
}

function refreshform() {
    $('#picture_mass_edit_pictures option').prop("selected", false)
    $.each($('.picture-card.selected'), function (key, item) {
        let pictureID = $(item).attr('id');
        $(`#picture_mass_edit_pictures option[value="${pictureID}"]`).prop("selected", true)
    })
    $('#nb-pictures-to-edit').html($('.picture-card.selected').length)
}

$(function () {
    $('.picture-card').on('click', function () {
        $(this).toggleClass('selected');
        refreshform();
        custom();
    })

    $('[data-button-action]').on('click', function () {
        $('[data-button-action]').removeClass('active');
        $(this).addClass('active');

        switch ($(this).data('button-action')) {
            case 'all':
                all();
                break;
            case 'none':
                none();
                break;
        }
        refreshform();
    })
})

