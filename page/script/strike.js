$(document).on('click', ':checkbox', function () {
    if ($(this).is(':checked')) {
        $(this).siblings('label').addClass('text-decoration-line-through');
    }
    else {
        $(this).siblings('label').removeClass('text-decoration-line-through');
    }
});
