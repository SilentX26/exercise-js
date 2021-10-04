const input = document.querySelector('.input');
const iconInputRight = document.querySelector('.card-input .prepand-right i');

const isEmpty = val => val == '' || val.search(/^\s+$/) >= 0;

input.addEventListener('keyup', function(event) {
    if(event.key == 'Enter') {
        addTodo(this.value);
        this.value = '';
        iconInputRight.classList.remove('show');

    } else {
        if(!isEmpty(this.value)) {
            iconInputRight.classList.add('show');
        } else {
            iconInputRight.classList.remove('show');
        }
    }
});

const getDataTodo = () => {
    return JSON.parse(localStorage.getItem('dt-todo'));
}

const updateDataTodo = todoObj => {
    localStorage.setItem('dt-todo', JSON.stringify(todoObj));
}

const getAllTodoId = todoObj => {
    return todoObj.map( value => { return value.id });
}

const generateTodoId = () => {
    let result = '';
    
    for(let i=0; i < 10; i++) {
        result += Math.round(Math.random() * 10).toString();
    }

    return result;
}

const refreshTodo = () => {
    const objData = getDataTodo();
    if(!objData) {
        return false;
    }

    const todoUl = document.querySelector('.todo');
    let todoSrc = '';

    if(objData.length > 0) {
        for(const data of objData) {
            let checked = '';
            let icon = '';

            if(data.checked) {
                checked = 'checked';
                icon = 'check-double';
            } else {
                checked = '';
                icon = 'check';
            }

            todoSrc += `
                <li class="todo-items ${checked}">
                    <a href="javascript:checkTodo('${data.id}');" class="todo-action">
                        <i class="fas fa-${icon} todo-icon"></i>
                    </a>
                    <span class="todo-text">${data.text}</span>
                    <a href="javascript:deleteTodo('${data.id}');" class="todo-action">
                        <i class="fas fa-times text-danger"></i>
                    </a>
                </li>
            `;
        }

    } else {
        todoSrc = `
            <li class="todo-items loading">
                Belum ada todo yang dibuat.
            </li>
        `;
    }

    todoUl.innerHTML = todoSrc;
}

const addTodo = text => {
    let objData = getDataTodo();
    objData = objData == null ? [] : objData;
    let todoId = generateTodoId();

    objData.push({
        id: todoId,
        text: text,
        checked: false
    });

    updateDataTodo(objData);
    refreshTodo();
} 

const deleteTodo = todoId => {
    let objData = getDataTodo();
    const objTodoId = getAllTodoId(objData);
    
    if(objTodoId.includes(todoId)) {
        let index = objTodoId.indexOf(todoId);
        if(objData.length > 1) {
            objData.splice(index, 1);
        } else {
            objData = [];
        }

        updateDataTodo(objData);
        refreshTodo();

    } else {
        alert('Maaf, data todo tidak dapat ditemukan.');
    }
}

const checkTodo = todoId => {
    const objData = getDataTodo();
    const objTodoId = getAllTodoId(objData);

    if(objTodoId.includes(todoId)) {
        let index = objTodoId.indexOf(todoId);
        objData[index].checked = true;

        updateDataTodo(objData);
        refreshTodo();

    } else {
        alert('Maaf, data todo tidak dapat ditemukan.');
    }
}

window.onload = refreshTodo;