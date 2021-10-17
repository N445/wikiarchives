const Noty = require('noty');

$(function() {
    var flashContainer = $('.flash-message-wrapper');
    var flashMessages  = flashContainer.find('.flash-message');
    if(flashMessages.length > 0) {
        $.each(flashMessages, function (key, message) {
            message  = $(message);
            new Noty({
                theme: 'bootstrap-v4',
                type: message.attr('data-type'),
                text: message.attr('data-message'),
                timeout: 8000 + key,
                queue: 'notification',
            }).show();
        });
    }
})