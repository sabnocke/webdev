var entries = []; // holds every inputted entry
var isFirstTime = !!(localStorage.getItem("isFirstTime"));
var entryExists = localStorage.getItem("entries") !== null;
$(function () {
    if (isFirstTime) {
        localStorage.setItem("isFirstTime", "false");
        displayEntries();
    }
    else {
        updateEntries(false);
    }
});
$("#submit").on('click', function () {
    var field = document.getElementById("input");
    var entry = field.value;
    if (entry === "") {
        alert("Please enter something");
    }
    else {
        entries.push(entry);
        displayEntries();
        $("#input").val("");
        if (entries.length > 0) {
            localStorage.setItem("entries", JSON.stringify(entries));
        }
    }
});
$("#remove_button").on("click", function () {
    var $boxes = $('input[type=checkbox]:checked');
    $boxes.each(function (index, element) {
        var id = element.attributes[2].nodeValue;
        if (!id)
            return;
        var elementToRemove = document.getElementById(id);
        if (!elementToRemove)
            return;
        var parent = elementToRemove.parentElement;
        if (!parent)
            return;
        var label = elementToRemove.nextElementSibling;
        if (!label)
            return;
        parent.remove();
        entries.splice(entries.indexOf(label.textContent), 1);
    });
    updateEntries(true);
});
function updateEntries(setEntries) {
    if (setEntries)
        localStorage.setItem("entries", JSON.stringify(entries));
    var loader = entryExists ? localStorage.getItem("entries") : "";
    entries = loader !== null ? JSON.parse(loader) : [];
    displayEntries();
}
function displayEntries() {
    $('#output').empty();
    for (var i = 0; i < entries.length; i++) {
        var entry = entries[i];
        var html = "<li class=\"list-group-item\">\n                <input class=\"form-check-input me-1\" type=\"checkbox\" id=\"".concat(i + 1, "\">\n                <label class=\"form-check-label newheader\" for=\"").concat(i + 1, "\">").concat(entry, "</label>\n                </li>");
        $("#output").append(html);
    }
}
