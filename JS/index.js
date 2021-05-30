// getting all the variables
var toDoInput= document.querySelector(".to-do-input");
var input=document.querySelector(".input");
var toDoBtn= document.querySelector(".to-do-button")
var listContainer= document.querySelector(".list-container")
var listItem= document.querySelector(".list-item");
const filterOption = document.querySelector(".filter-to-do");
//Event Listeners
document.addEventListener("DOMContentLoaded", getToDos);
toDoBtn.addEventListener("click", addItem);
listItem.addEventListener("click",completed);
filterOption.addEventListener("click", filterToDo)



// functions
//function to add todos
function addItem(e){
  e.preventDefault();
  // creating list items
  const toDo= document.createElement("div");
  toDo.classList.add("todo");
  //creating todo text
  const newToDo= document.createElement("li");
  newToDo.innerText=input.value;
  toDo.appendChild(newToDo);
  //add todo to local localStorage
  saveLocalToDo(newToDo.innerText);
  // creating buttons
  //completed
  const completedBtn= document.createElement("button");
  completedBtn.innerHTML='<i class="fas fa-check"></i>'
  completedBtn.classList.add("completed-btn");
  toDo.appendChild(completedBtn);
  //delete
  const deleteBtn= document.createElement("button");
  deleteBtn.innerHTML='<i class="fas fa-trash"></i>'
  deleteBtn.classList.add("delete-btn");
  // appending as childs

  toDo.appendChild(deleteBtn);
  listItem.appendChild(toDo);
  input.value="";
}
// function descripting clicked functionality
function completed(e){
  const clickBtn=e.target;
  const todoElement= clickBtn.parentElement;
  if(clickBtn.classList[0]==="completed-btn"){
    todoElement.classList.toggle("completed");
  }
  if(clickBtn.classList[0]==="delete-btn"){
    todoElement.classList.add("fall");
    removeToDo(todoElement);
    todoElement.addEventListener("transitionend", function(){todoElement.remove();})
  }
}
//filter functionality
function filterToDo(e){
  const todos=listItem.childNodes;
  console.log(todos);
  todos.forEach(function(todo){
    switch(e.target.value){
      case "All":
      todo.style.display="flex";
      break;
      case "Completed":
      if(todo.classList.contains("completed")){
        todo.style.display="flex";
      }else{
        todo.style.display="none";
      }
      break;
      case "Uncompleted":
      if(!todo.classList.contains("completed")){
        todo.style.display="flex";
      }else{
        todo.style.display="none";
      }
      break;
    }
  })
}
// functionality of storing into local database
function saveLocalToDo(todo){
  console.log(todo);
  let todos;
  // check if todos already exists or note
  if(localStorage.getItem("todos")===null){
    todos=[];
    console.log("Executed");
  }else{
    todos=JSON.parse(localStorage.getItem("todos"));
  }
  console.log(todos);
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}
//function to get todos inorder to diplay them beforehand
function getToDos(){
  let todos;
  // check if todos already exists or note
  if(localStorage.getItem("todos")===null){
    todos=[];
    console.log("Executed");
  }else{
    todos=JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function(todo){
    // creating list items
    const toDo= document.createElement("div");
    toDo.classList.add("todo");
    //creating todo text
    const newToDo= document.createElement("li");
    newToDo.innerText=todo;
    toDo.appendChild(newToDo);
    // creating buttons
    //completed
    const completedBtn= document.createElement("button");
    completedBtn.innerHTML='<i class="fas fa-check"></i>'
    completedBtn.classList.add("completed-btn");
    toDo.appendChild(completedBtn);
    //delete
    const deleteBtn= document.createElement("button");
    deleteBtn.innerHTML='<i class="fas fa-trash"></i>'
    deleteBtn.classList.add("delete-btn");
    // appending as childs
    toDo.appendChild(deleteBtn);
    listItem.appendChild(toDo);
  })
}

function removeToDo(todo){
  let todos;
  // check if todos already exists or note
  if(localStorage.getItem("todos")===null){
    todos=[];
    console.log("Executed");
  }else{
    todos=JSON.parse(localStorage.getItem("todos"));
  }
  const toDoIndex= todo.children[0].innerText;
  todos.splice(todos.indexOf(toDoIndex),1);
  localStorage.setItem("todos", JSON.stringify(todos));
}
