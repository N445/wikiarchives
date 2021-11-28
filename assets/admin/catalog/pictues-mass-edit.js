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


function filterAll() {
    $('.picture-card').closest('.col-md-4').css('display', 'block');
    $('[data-button-filter]').removeClass('active');
    $('[data-button-filter="all"]').addClass('active');
}

function filterSelected() {
    $('.picture-card.selected').closest('.col-md-4').css('display', 'block');
    $('.picture-card:not(.selected)').closest('.col-md-4').css('display', 'none');
}

function filterNotselected() {
    $('.picture-card.selected').closest('.col-md-4').css('display', 'none');
    $('.picture-card:not(.selected)').closest('.col-md-4').css('display', 'block');
}

$(function () {
    $('.picture-card').on('click', function () {
        $(this).toggleClass('selected');
        refreshform();
        custom();
        // filterAll();
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

    $('[data-button-filter]').on('click', function () {
        $('[data-button-filter]').removeClass('active');
        $(this).addClass('active');

        switch ($(this).data('button-filter')) {
            case 'all':
                filterAll();
                break;
            case 'selected':
                filterSelected();
                break;
            case 'notselected':
                filterNotselected();
                break;
        }
        refreshform();
    })
})

