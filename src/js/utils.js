import "./store";

const inputNewToDo = document.querySelector(".new-todo");
const main = document.querySelector(".main");
const footer = document.querySelector(".footer");
const counter = document.querySelector(".todo-count");
const clearButton = document.querySelector(".clear-completed");

main.style.display = "none";
footer.style.display = "none";

var valueInput;
var toDoItem = {};
var listToDo = [];

clearButton.addEventListener("click", () => {
  clearCompleted();
});

const clearCompleted = () => {
  const todoListUl = document.querySelectorAll(".todo-list li.completed");
  todoListUl.forEach((i) => {
    removeToDo(i);
  });
};

const addNewToDo = () => {
  valueInput = inputNewToDo.value.trim();
  if (!valueInput) {
    return;
  }

  const lastId = getLastId();
  toDoItem = { id: lastId, title: valueInput, completed: false };

  listToDo.push(toDoItem);
  addToDoHTML(toDoItem);

  inputNewToDo.value = "";
};

const getLastId = () => {
  if (listToDo.length === 0) {
    return 1; // O cualquier otro valor de inicio que desees
  }
  let x = parseInt(listToDo[listToDo.length - 1].id) || 0;
  return x + 1;
};

const cleanInput = () => {
  inputNewToDo.value = "";
};

inputNewToDo.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addNewToDo();
    cleanInput();
  }
});

const addToDoHTML = (toDoItem) => {
  console.log(toDoItem);
  const content = document.querySelector(".todo-list");

  // toDos.forEach((i) => {
  let li = document.createElement("li");
  let div = document.createElement("div");
  let input = document.createElement("input");
  let label = document.createElement("label");
  let button = document.createElement("button");
  let inputEdit = document.createElement("input");

  li.id = toDoItem.id;
  input.type = "checkbox";

  div.classList.add("view");
  input.classList.add("toggle");
  button.classList.add("destroy");
  inputEdit.classList.add("edit");

  label.innerText = toDoItem.title;
  inputEdit.value = toDoItem.title;

  div.appendChild(input);
  div.appendChild(label);
  div.appendChild(button);

  li.appendChild(div);
  // li.classList.add('completed');
  // li.classList.add('editing');
  li.appendChild(inputEdit);

  content.appendChild(li);

  input.addEventListener("click", () => {
    completeToDo(li);
  });

  button.addEventListener("click", () => {
    removeToDo(li);
  });
  label.addEventListener("dblclick", () => {
    showUpdateToDo(li);
  });
  inputEdit.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      updateToDo(li);
    }
  });

  validateLengthToDo();
  updateCounter();
};

const completeToDo = (element) => {
  const idToDo = element.id;
  const todoItem = listToDo[idToDo - 1];
  if (!todoItem.completed) {
    todoItem.completed = true;
    element.classList.add("completed");
  } else {
    todoItem.completed = false;
    element.classList.remove("completed");
  }
  updateCounter();
};

const validateLengthToDo = () => {
  const displayStyle = listToDo.length > 0 ? "block" : "none";
  main.style.display = displayStyle;
  footer.style.display = displayStyle;
};
const removeToDo = (element) => {
  element.remove();
  const idToDo = element.id;
  let item;
  listToDo.forEach((i) => {
    if (i.id == idToDo) {
      item = i;
    }
  });
  listToDo = listToDo.filter((i) => i !== item);
  validateLengthToDo();
  updateCounter();
};

const showUpdateToDo = (element) => {
  element.classList.add("editing");
  element.childNodes[1].focus();
};

const updateToDo = (element) => {
  const newValueTodo = element.childNodes[1].value;
  const idToDo = element.id;

  element.classList.remove("editing");
  element.childNodes[0].childNodes[1].innerText = newValueTodo;

  let item;
  listToDo.forEach((i) => {
    if (i.id == idToDo) {
      item = i;
    }
  });

  item.title = newValueTodo;
};

const updateCounter = () => {
  counter.childNodes[0].textContent = getImcompleteToDo().toString();
  counter.childNodes[1].textContent =
    getImcompleteToDo() == 1 ? " item left" : " items left";
};

const getCompletedToDo = () => {
  const completedListToDo = listToDo.filter((i) => i.completed);
  return completedListToDo.length;
};
const getImcompleteToDo = () => {
  const imcompletedListToDo = listToDo.filter((i) => !i.completed);
  return imcompletedListToDo.length;
};
