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

let previousSelected = null;

$(function () {
    $('.picture-card').on('click', function (e) {
        let clickedCard = $(this);
        clickedCard.addClass('multi-selected');

        clickedCard.toggleClass('selected');
        let isSelected = clickedCard.hasClass('selected');

        if (e.shiftKey) {
            let parentCol = clickedCard.closest('.picture-card-col');
            if (null === previousSelected) {
                parentCol.find('.picture-card').addClass('multi-selected');
                previousSelected = parentCol;
            } else {
                let cardsToChange = previousSelected.nextUntil(parentCol).find('.picture-card');
                cardsToChange.addClass('multi-selected');
                if(isSelected){
                    cardsToChange.addClass('selected');
                }else{
                    cardsToChange.removeClass('selected');
                }
                previousSelected = null;
                parentCol.find('.picture-card').removeClass('multi-selected');
            }
        } else {
            $('.picture-card').removeClass('multi-selected');
            previousSelected = null;
        }
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

