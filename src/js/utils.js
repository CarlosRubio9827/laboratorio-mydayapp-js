import "./store";

const inputNewToDo = document.querySelector(".new-todo");
const main = document.querySelector(".main");
const footer = document.querySelector(".footer");
const counter = document.querySelector(".todo-count");
const clearButton = document.querySelector(".clear-completed");
const allButton = document.querySelector(".filters li:nth-child(1)");
const pendingButton = document.querySelector(".filters li:nth-child(2)");
const completedButton = document.querySelector(".filters li:nth-child(3)");

pendingButton.addEventListener("click", (e) => {
  completedButton.querySelector("a").classList.remove("selected");
  allButton.querySelector("a").classList.remove("selected");
  pendingButton.querySelector("a").classList.add("selected");
  filterPendingTodo();
});
completedButton.addEventListener("click", (e) => {
  allButton.querySelector("a").classList.remove("selected");
  pendingButton.querySelector("a").classList.remove("selected");
  completedButton.querySelector("a").classList.add("selected");
  filterCompletedTodo();
});
allButton.addEventListener("click", (e) => {
  completedButton.querySelector("a").classList.remove("selected");
  pendingButton.querySelector("a").classList.remove("selected");
  allButton.querySelector("a").classList.add("selected");
  filterAllTodo();
});

const filterPendingTodo = () => {
  const pendingToDo = listToDo.filter((i) => !i.completed);
  showToDo(pendingToDo);
  // listToDo.filter((i)=>)
};
const filterCompletedTodo = () => {
  const completedToDo = listToDo.filter((i) => i.completed);
  showToDo(completedToDo);
  // listToDo.filter((i)=>)
};
const filterAllTodo = () => {
  // const completedToDo = listToDo.filter((i) => i.completed);
  showToDo(listToDo);
  // listToDo.filter((i)=>)
};

clearButton.classList.add("hidden");
main.style.display = "none";
footer.style.display = "none";
// localStorage.setItem("mydayapp-js", JSON.stringify(listToDo));

var valueInput;
var toDoItem = {};
var listLS10 = JSON.parse(localStorage.getItem("mydayapp-js"));
var listToDo = listLS10 || [];

// document.addEventListener("DOMContentLoaded", () => {
//   // const todoItem = listToDo[idToDo - 1];
//   var listLS10 = JSON.parse(localStorage.getItem("mydayapp-js"));
//   console.log("LIST SL", listLS10);
// });

clearButton.addEventListener("click", (e) => {
  clearCompleted();
  e.target.classList.add("hidden");
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
  localStorage.setItem("mydayapp-js", JSON.stringify(listToDo));
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
  var listLS = JSON.parse(localStorage.getItem("mydayapp-js"));
  console.log("LIST SL", listLS);
  var todoItemLS = listLS[idToDo - 1];
  if (!todoItem.completed) {
    // localStorage.getItem("mydayapp-js", JSON.stringify(listToDo));
    todoItem.completed = true;
    todoItemLS.completed = true;
    console.log("todoItem", todoItem);
    console.log("objetoRecuperado", todoItemLS);
    element.classList.add("completed");
  } else {
    todoItem.completed = false;
    todoItemLS.completed = false;
    element.classList.remove("completed");
  }
  listLS[idToDo - 1] = todoItemLS;
  localStorage.setItem("mydayapp-js", JSON.stringify(listLS));
  var listLS2 = JSON.parse(localStorage.getItem("mydayapp-js"));

  console.log("LIST SL2", listLS2);

  clearButton.classList.remove("hidden");
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
  localStorage.setItem("mydayapp-js", JSON.stringify(listToDo));
  validateLengthToDo();
  updateCounter();
};

const showUpdateToDo = (element) => {
  element.classList.add("editing");
  element.childNodes[1].focus();
};

const updateToDo = (element) => {
  const newValueTodo = element.childNodes[1].value.trim();
  const idToDo = element.id;
  // const todoItem = listToDo[idToDo - 1];
  // var listLS = JSON.parse(localStorage.getItem("mydayapp-js"));
  // console.log("LIST SL", listLS);
  // var todoItemLS = listLS[idToDo - 1];

  element.classList.remove("editing");
  element.childNodes[0].childNodes[1].innerText = newValueTodo;

  let item;
  console.log("LIST TODO ", listToDo);
  listToDo.forEach((i) => {
    if (i.id == idToDo) {
      i.title = newValueTodo;
      // item = i;
    }
  });
  console.log("LIST TODO ", listToDo);
  localStorage.setItem("mydayapp-js", JSON.stringify(listToDo));

  // var listLS3 = JSON.parse(localStorage.getItem("mydayapp-js"));
  // console.log("List LS3",listLS3)
  // console.log("List LS4", item.title)
  // item.title = newValueTodo;
  // console.log("List LS5",item.title)
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

const showToDo = (list) => {
  // console.log(toDoItem);

  const todoListUl = document.querySelector(".todo-list"); // Obtén la lista ul

  // Itera sobre cada elemento li dentro de la lista ul
  todoListUl.querySelectorAll("li").forEach((todoItem) => {
    todoItem.remove(); // Elimina cada elemento li
  });

  // todoListUl.forEach((i) => {
  //   removeToDo(i);
  // });

  const content = document.querySelector(".todo-list");

  list.forEach((i) => {
    console.log(i);
    let li = document.createElement("li");
    let div = document.createElement("div");
    let input = document.createElement("input");
    let label = document.createElement("label");
    let button = document.createElement("button");
    let inputEdit = document.createElement("input");

    li.id = i.id;
    input.type = "checkbox";

    div.classList.add("view");
    input.classList.add("toggle");
    button.classList.add("destroy");
    inputEdit.classList.add("edit");

    label.innerText = i.title;
    inputEdit.value = i.title;

    div.appendChild(input);
    div.appendChild(label);
    div.appendChild(button);

    li.appendChild(div);
    if (i.completed) {
      input.checked = true;
      li.classList.add("completed");
    } else {
      li.classList.remove("completed");
      input.checked = false;
    }
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
  });
  validateLengthToDo();
  updateCounter();
};

showToDo(listToDo);
