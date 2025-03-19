// DOM references
const inputBox = document.getElementById("add__bar");
const listContainer = document.getElementById("todo__list");
const addMessage = document.getElementById("add_message");
const addButton = document.getElementById("add");

// change between two classes with delay
function toggleClass(element, addClass, removeClass, delay) {
  setTimeout(() => {
    element.classList.remove(removeClass);
    element.classList.add(addClass);
  }, delay);
}

// add task function
function addTask() {
  if (inputBox.value === "") {
    addMessage.textContent = "Task is required";
    if (addMessage.classList.contains("hidden")) {
      toggleClass(addMessage, "visible", "hidden", 100);
      toggleClass(addMessage, "fade-out", "visible", 3100);
      toggleClass(addMessage, "hidden", "fade-out", 4000);
    }
  } else {
    let task = document.createElement("li");
    task.innerHTML = inputBox.value;
    listContainer.appendChild(task);

    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    task.appendChild(span);

    inputBox.value = "";
    saveData();
  }
}

// display tasks and new tasks
listContainer.addEventListener(
  "click",
  function (e) {
    if (e.target.tagName === "LI") {
      e.target.classList.toggle("checked");
      saveData();
    } else if (e.target.tagName === "SPAN") {
      e.target.parentElement.remove();
      saveData();
    }
  },
  false
);

// save tasks in the browser storage
function saveData() {
  localStorage.setItem("dataTasks", listContainer.innerHTML);
}

// provide tasks in the browser storage
function showTask() {
  listContainer.innerHTML = localStorage.getItem("dataTasks");
}

// check first if tasks in browser storage
showTask();

// add a task clicking on the button or pressing the enter key
addButton.addEventListener("click", addTask);

document.addEventListener("keydown", (evento) => {
  if (evento.key === "Enter") {
    addTask();
  }
});
