const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const numberPointer = document.querySelector(".count");
function addTask() {
  if (inputBox.value === "") {
    alert("You must write something!!");
  } else {
    let li = document.createElement("li");
    li.innerHTML = inputBox.value;
    listContainer.appendChild(li);

    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    li.appendChild(span);
    span.className = "cross";
    inputBox.value = "";
    updateNumberOfTasks();
    saveData();
  }
}

// Where we are clicking inside the list-container class section...if we are clicking in the area of "li" then just toggle the class of the li...if we click on the element span(cross) then we remove the parent element of this clicked span....than is "li" => this particular task..this parameter `e` is the object representing the location where we clicked...e.target gives the element of that click...
listContainer.addEventListener(
  "click",
  function (e) {
    if (e.target.tagName === "LI") {
      e.target.classList.toggle("checked");
      updateNumberOfTasks();
      saveData();
    } else if (e.target.tagName === "SPAN") {
      e.target.parentElement.remove();
      updateNumberOfTasks();
      saveData();
    }
  },
  false
);
// on refreshing we will loose all our saved data...so to prevent that from happening..we store our data in local storage...its stored as a key-value pair...
// in the localStorage of browser our tasks will be saved with the name data....
function saveData() {
  localStorage.setItem("data", listContainer.innerHTML);
  localStorage.setItem("total", numberPointer.textContent);
}
// this save data function need to be called at multiple locations whenever we are making any changes...so that after each change it saves the new data....

// now whenever we refresh our page...we need to load our data...
function loadData() {
  listContainer.innerHTML = localStorage.getItem("data");
  numberPointer.textContent = localStorage.getItem("total");
}

// this function is called each time this script file is called or each time you refresh your browser...loading all you saved data...here how you can see where your data is stored in local storage in the browser....
/*
1. Open your website in Chrome.
2. Right-click on the page and select "Inspect" or press Ctrl+Shift+I on Windows/Linux or Cmd+Option+I on macOS to open DevTools.
3. Go to the "Application" tab in DevTools.
4. In the left sidebar, you will find "Storage" section. Click on "Local Storage" to see the key-value pairs stored by your website.
*/

// Local storage in a web browser is like a small database that allows web applications to store data locally within the user's browser. This data persists even when the browser is closed and reopened.
loadData();

function updateNumberOfTasks() {
  const liElements = listContainer.getElementsByTagName("li");

  const uncheckedLiElements = Array.from(liElements).filter(
    (li) => !li.classList.contains("checked")
  );

  const numberOfLiElements = uncheckedLiElements.length;
  numberPointer.textContent = numberOfLiElements; // Update the text content instead of value
}
