//Selectors
const todoInput = document.querySelector('.todo-input')
const todoButton = document.querySelector('.todo-button')
const todoList = document.querySelector('.todo-list') 
const filterOption = document.querySelector('.filter-todo') 
//Event Listners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo)
//Functions

function addTodo(event){
    //prevent form from submitting
    event.preventDefault();

    const toDoDiv = document.createElement("div");
    toDoDiv.classList.add("todo");

    //Check Mark Button
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    toDoDiv.appendChild(newTodo);
    //ADD TO DO TO LOCAL STORAGE
    saveLocalTodos(todoInput.value)


    //completed Button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    toDoDiv.appendChild(completedButton);

    // Check Trash Button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    toDoDiv.appendChild(trashButton);
    //append to list
    todoList.appendChild(toDoDiv);
    //clear todo input value

    todoInput.value = "";


}
function deleteCheck(e){
    const item = e.target

    if(item.classList[0] === 'trash-btn'){
        const todo = item.parentElement;
        //Animation
        todo.classList.add('fall');
        removeLocalTodos(todo);
        todo.addEventListener('transitioned', function(){
            todo.remove();  
        });
    }

    if(item.classList[0] === 'complete-btn'){
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
}

function filterTodo(e){
    const todos = todoList.childNodes;
    todos.forEach(function(todo){
        switch(e.target.value){
            case "all":
                todo.style.display = 'flex';
                break;
            case "completed":
                if(todo.classList.contains('completed')){
                        todo.style.display = 'flex';
                } else{
                        todo.style.display = "none"
                }
                break;
                case "uncompleted":
                    if(!todo.classList.contains ("completed")){
                        todo.style.display = "flex";
                    } else{
                        todo.style.display = "none"
                    }
                    break;
        }
    });
}

function saveLocalTodos(todo){
let todos;
if(localStorage.getItem('todos') === null){
    todos = [];
}else{
    todos = JSON.parse(localStorage.getItem("todos"));
}
todos.push(todo);
localStorage.setItem("todos", JSON.stringify(todos));
} 
function getTodos(){
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function(todo){
        const toDoDiv = document.createElement("div");
    toDoDiv.classList.add("todo");

    //Check Mark Button
    const newTodo = document.createElement('li');
    newTodo.innerText = todo;
    newTodo.classList.add('todo-item');
    toDoDiv.appendChild(newTodo);
    //ADD TO DO TO LOCAL STORAGE
    


    //completed Button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    toDoDiv.appendChild(completedButton);

    // Check Trash Button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    toDoDiv.appendChild(trashButton);
    //append to list
    todoList.appendChild(toDoDiv);
    //clear todo input value
    })
}

function removeLocalTodos(todo){

    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    } else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}