'use strict';

const addTaskBtn = document.getElementById('add-task-btn');
const deskTabInp = document.getElementById('descriotion-task');
//const todosWrapper = document.getElementsByClassName('todos-wrapper');
const globalCheck = document.getElementById('globalCheckID');
const todosWrapper = document.getElementById('todos-wrapper222');
const testDiv = document.getElementById('testDiv');

//


let tasks = [];
let tasksGl = [] ;

!localStorage.tasks ? tasks = []: tasks = JSON.parse(localStorage.getItem('tasks'));
!localStorage.tasksGl ? tasksGl = []: tasksGl = JSON.parse(localStorage.getItem('tasksGl'));


let todoItemElems = [];

function Task(discription) {
    this.discription = discription;
    this.completed = false;
}

const createTemplate = (task,index) => {
    return   `
    <div class ="todo-item ${task.completed ? 'checked': ''}">
        <div class="description">${task.discription}</div>
        <div class="buttons">
            <button onclick="deleteTask(${index})" class="btnDelete">Delete</button>
            <input onclick="completeTask(${index})" class="btnComplete" type="checkbox" ${task.completed ? 'cheked' : ''}>
        </div>
    </div>
   `;
};



const filterTasks = () =>{
    const activeTasks = tasks.length && tasks.filter(item => item.completed == false);
    const completedTasks = tasks.length && tasks.filter(item => item.completed == true);
    tasks = [...activeTasks,...completedTasks];
    };


const fillHtmlList = () => {
    todosWrapper.innerHTML = "";
    if(tasks.length > 0){
        filterTasks();
        tasks.forEach((item,index) => {
           todosWrapper.innerHTML += createTemplate(item,index); 
          
        });
        
      todoItemElems = document.querySelectorAll('.todo-item');
    } 
};



fillHtmlList();

const updateLocal = () => {
    
    localStorage.setItem('tasks',JSON.stringify(tasks));
    localStorage.setItem('tasksGl',JSON.stringify(tasksGl));
    
};

const completeTask = index =>{
    
    tasks[index].completed = !tasks[index].completed;
    if(tasks[index].completed){
        todoItemElems[index].classList.add('checked');
    }
    else{
        todoItemElems[index].classList.remove('checked');
    }
    updateLocal();
    fillHtmlList();

};




const deleteTask = index => {
  todoItemElems[index].classList.add('delition');//
    setTimeout(() => {
        tasks.splice(index, 1);
        updateLocal();
        fillHtmlList();
    }, 900);

};


const standartInput= () =>{
    if(globalCheck.checked){

        tasksGl.push(new Task(deskTabInp.value ));
    
    }
    else{
        tasks.push(new Task(deskTabInp.value ));
    }
        updateLocal();
        fillHtmlList();
        deskTabInp.value = '';
}

    deskTabInp.addEventListener('keydown',(e)=>{
        if(e.keyCode === 13){
            standartInput();
        }
    });



addTaskBtn.addEventListener('click', ()=> {
    standartInput();
});