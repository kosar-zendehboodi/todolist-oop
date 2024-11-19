const formEl = document.querySelector("[data-form]");
const listsEl = document.querySelector("[data-lists]");
const inputEl = document.querySelector("[data-input]");
// local storage
class Storage {
  static AddlocalStorage(todoArray) {
    let Storage = localStorage.setItem("todo", JSON.stringify(todoArray));
    return Storage;
  }
  static getStorage() {
    let storage =
      localStorage.getItem("todo") === null
        ? []
        : JSON.parse(localStorage.getItem("todo"));
    return storage;
  }
}

//empty array

let todoArray = Storage.getStorage();

//form part

formEl.addEventListener("submit", (e) => {
  e.preventDefault();
  let id = Math.random() * 1000000;
  const todo = new Todo(id, inputEl.value);
  //   console.log(inputEl.value);
  todoArray = [...todoArray, todo];
  //   console.log(todoArray);
  UI.displayData();
  UI.clearInput();
  //remove
  UI.removeTodo();
  //   ADd todo storage
  Storage.AddlocalStorage(todoArray);
});

// make object instance

class Todo {
  constructor(id, todo) {
    this.id = id;
    this.todo = todo;
  }
}
class UI {
  static displayData() {
    let displayData = todoArray.map((item) => {
      return ` 
      <div class="todo" >
      <p>${item.todo} </p> 
      <span data-id="${item.id}"  class="remove" >X</span></div>`;
    });
    listsEl.innerHTML = displayData.join(" ");
  }
  static clearInput() {
    inputEl.value = "";
  }

  static removeTodo() {
    listsEl.addEventListener("click", (e) => {
      if (e.target.classList.contains("remove")) {
        e.target.parentElement.remove();
      }
      let btnId = e.target.dataset.id;
      UI.removeArrayTodo(btnId);
    });
  }
  static removeArrayTodo(id) {
    todoArray = todoArray.filter((item) => item.id !== +id);
    Storage.AddlocalStorage(todoArray);
  }
}

window.addEventListener("DOMContentLoaded", () => {
  UI.displayData();
  UI.removeTodo();
});
