'use strict';

class Todo {
  constructor(form, input, todoList, todoCompleted, todoComplete) {
    this.form = document.querySelector(form);
    this.input = document.querySelector(input);
    this.todoList = document.querySelector(todoList);
    this.todoCompleted = document.querySelector(todoCompleted);
    this.todoComplete = document.querySelector(todoComplete);
    this.todoData = new Map(JSON.parse(localStorage.getItem('toDoList')));
  }

  addToStorage(){
    localStorage.setItem('toDoList', JSON.stringify([...this.todoData]));
  }

  render(){
    this.input.required = true;
    this.todoList.textContent = '';
    this.todoCompleted.textContent = '';
    this.todoData.forEach(this.createItem, (this));
    this.addToStorage();
    this.input.value = '';
  }

  createItem(todo){
    const li = document.createElement('li');
    li.classList.add('todo-item');
    li.key = todo.key;
    li.insertAdjacentHTML('beforeend', `
        <span class="text-todo">${todo.value}</span>
        <div class="todo-buttons">
          <button class="todo-remove"></button>
          <button class="todo-complete"></button>
        </div>
  `);

    if(todo.completed){
      this.todoCompleted.append(li);
    } else{
      this.todoList.append(li);
    }
  }

  addTodo(event) {
    event.preventDefault();
    if (this.input.value.trim()){
      this.input.required = false;
      const newTodo = {
        value: this.input.value,
        completed: false,
        key: this.generateKey()
      };
      this.todoData.set(newTodo.key, newTodo);
      this.render();
      console.log(newTodo.completed);
    }
  }

  generateKey() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }

  deleteItem() {

  }

  completedItem() {

  }

  handler() {
    
  }

  init() {
    this.form.addEventListener('submit', this.addTodo.bind(this));
    this.render();
  }
}

const todo = new Todo('.todo-control', '.header-input', '.todo-list', '.todo-completed', '.todo-complete');

todo.init();