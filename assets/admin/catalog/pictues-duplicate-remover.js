$(function () {
    $('form[name="pictures_duplicate_remover"]').on('submit', function (e) {
        let keys = [];
        $.each($('.duplicate-input'), function (key, value) {
            if ($(value).prop('checked')) {
                keys.push($(this).val());
            }
        })
        $('#pictures_duplicate_remover_keys').val(keys.join(','));
    })
})