let entries: any[] = [];
const isFirstTime: boolean = !!(localStorage.getItem("isFirstTime"))
const entryExists: boolean = localStorage.getItem("entries") !== null

$(function () {
    if (isFirstTime) {
        localStorage.setItem("isFirstTime", "false")
        displayEntries()
    } else {
        updateEntries(false)
    }
})

$("#submit").on('click', function () {
    let field: HTMLInputElement = document.getElementById("input") as HTMLInputElement;
    const entry: string = field.value
    if (entry === "") {
        alert("Please enter something");
    } else {
        entries.push(entry);
        displayEntries();
        $("#input").val("");
        if (entries.length > 0) {
            localStorage.setItem("entries", JSON.stringify(entries));
        }
    }
});

$("#remove_button").on("click", function () {
    const $boxes: JQuery = $('input[type=checkbox]:checked');
    $boxes.each(function (index, element) {
        const id: string | null = element.attributes[2].nodeValue
        if (!id) {
          return;
        }

        const elementToRemove: HTMLElement | null = document.getElementById(id)
        if (!elementToRemove) {
          return
        }

        const parent: HTMLElement | null = elementToRemove.parentElement;
        if (!parent) {
          return
        }

        const label: Element | null = elementToRemove.nextElementSibling
        if (!label) {
          return
        }

        parent.remove()
        entries.splice(entries.indexOf(label.textContent), 1)
    })
    updateEntries(true)
});

function updateEntries(setEntries: boolean) {
    if (setEntries) {
      localStorage.setItem("entries", JSON.stringify(entries));
    }
    const loader: string | null = entryExists ? localStorage.getItem("entries") : ""
    entries = loader !== null ? JSON.parse(loader) : []
    displayEntries();
}


function displayEntries() {
    $('#output').empty();
    for (let i: number = 0; i < entries.length; i++) {
        let entry: any = entries[i];
        const html: string =
            `<li class="list-group-item">
                <input class="form-check-input me-1" type="checkbox" id="${i + 1}">
                <label class="form-check-label newHeader" for="${i + 1}">${entry}</label>
                </li>`;
        $("#output").append(html);
    }
}