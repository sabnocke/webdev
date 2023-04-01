// this does more than button fetching

let entries = []; // holds every inputed entry
// it works?!
let checkedArray = []; // holds everything to be removed

$("#submit").click(function () {
  let entry = $("#input").val();
  if (entry == "") {
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

function displayEntries() {
  $("#output").empty();
  for (let i = 0; i < entries.length; i++) {
    let entry = entries[i];
    if (entry == "nullHandler") {
      continue;
    }
    let html = `<li class="list-group-item">
            <input class="form-check-input me-1" type="checkbox" id="${i + 1}">
            <label class="form-check-label newheader" for="${
              i + 1
            }">${entry}</label>
        </li>`;
    $("#output").append(html);
  }
}

$("#remove_button").on("click", function () {
  if ($("input:checked").length > 0) {
    //$("input:checked").parent().remove();
    $("input:checked").each(function (index, element) {
      checkedArray.push($(element).siblings("label").text());
    });
    console.log(checkedArray);
  } else {
    alert("Please select an item to remove.");
  }
  removeEntries();
});

function removeEntries() {
  for (let i = 0; i < checkedArray.length; i++) {
    let index = entries.indexOf(checkedArray[i]);
    entries.splice(index, 1);
  }
  console.log(entries);
  updateEntries();
  checkedArray = [];
}

function updateEntries() {
  if (entries.length >= 0) /*might cause bugs!*/  {
    localStorage.setItem("entries", JSON.stringify(entries));
  }
  entries = JSON.parse(localStorage.getItem("entries"));
  displayEntries();
}

$(document).ready(function () {
  entries = JSON.parse(localStorage.getItem("entries"));
  displayEntries();
  
});


