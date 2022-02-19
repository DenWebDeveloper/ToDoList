
    'use strict';

const todoControl = document.querySelector('.todo-control');
const headerInput = document.querySelector('.header-input');
const todoList = document.querySelector('.todo-list');
const todoCompleted = document.querySelector('.todo-completed');

let toDoData = JSON.parse(localStorage.getItem('todo')) || [];



console.log(toDoData);

const render = function(){
    todoList.innerHTML = '';
    todoCompleted.innerHTML = '';


    toDoData.forEach(function(item){
        
        let li = document.createElement('li');

        li.classList.add('todo-item');

        li.innerHTML = '<span class="text-todo">' + item.text + '</span>' +
        '<div class="todo-buttons">' +
        '<button class="todo-remove"></button>' +
        '<button class="todo-complete"></button>' +
        '</div>';

        if(item.completed){
            todoCompleted.append(li);
        }else {
            todoList.append(li);

        }

        li.querySelector('.todo-complete').addEventListener('click', function(){
            item.completed = !item.completed;
            render();
        });

        const removeBtn = li.querySelector('.todo-remove');

        removeBtn.addEventListener('click', function(){

            if(item.completed){
                todoCompleted.removeChild(li);
              
            }else {
                todoList.removeChild(li);
                
            }
        });

    });

    localStorage.setItem('todo', JSON.stringify(toDoData));

};

todoControl.addEventListener('submit', function(event){
    event.preventDefault();


    if(headerInput.value === "" || headerInput.value.trim() === ""){
        return false;
       
    } else {
        let newToDo = {

            text: headerInput.value,
            completed: false
        };
    
        toDoData.push(newToDo);
        headerInput.value = '';
    
        render();
    }


});

render();