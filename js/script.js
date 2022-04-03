// Объявили переменные button и input
const addTaskBtn = document.querySelector('.todo-wrapper__btn-add');
const descTaskInput = document.querySelector('.todo-wrapper__description-task');

// Объявляем div куда буду собираться все задачи "todos-wrapper".
const todosWrapper = document.querySelector('.todos-wrapper');

let tasks;
!localStorage.tasks ? tasks = [] : tasks = JSON.parse(localStorage.getItem('tasks'));
todoitemElem = [];

function Task(description) {
   this.description = description;
   this.completed = false;
}

addTaskBtn.addEventListener('click', () => {
   tasks.push(new Task(descTaskInput.value));
   console.log(tasks);
   descTaskInput.value = '';

   addTaskLocalStorage();
   addTaskDiv();
});

const addTaskLocalStorage = () => {
   localStorage.setItem('tasks', JSON.stringify(tasks));
}

const createTamplate = (task, index) => {
   return `
   <div class="todos-wrapper__todo-item ${task.completed ? 'checked' : ''}">
               <div class="todos-wrapper__description">${task.description}</div>
               <div class="todos-wrapper__buttons">
                  <input onclick ='checkedTask(${index})' class="todos-wrapper__btn-complete" type="checkbox"${task.completed ? 'checked' : ''}>
                  <button onclick ='deleteTask(${index})' class="todos-wrapper__btn-delete">Delete</button>
               </div>
            </div>
   `
}

const filterTasks = () => {
   let activeTask = tasks.length && tasks.filter(item => item.completed == false);
   let completedTask = tasks.length && tasks.filter(item => item.completed == true);
   tasks = [...activeTask, ...completedTask];
}

const addTaskDiv = () => {
   todosWrapper.innerHTML = '';
   if (tasks.length > 0) {
      filterTasks();
      tasks.forEach(function (item, index) {
         todosWrapper.innerHTML += createTamplate(item, index);
      });
   }
   todoitemElem = document.querySelectorAll('.todos-wrapper__todo-item');
}
addTaskDiv();

const checkedTask = (index) => {
   tasks[index].completed = !tasks[index].completed;
   if (tasks[index].completed) {
      todoitemElem[index].classList.add('checked');
   } else {
      todoitemElem[index].classList.remove('checked');
   }
   addTaskLocalStorage();
   addTaskDiv();
}

const deleteTask = (index) => {
   todoitemElem[index].classList.add('delition');
   setTimeout(() => {
      tasks.splice(index, 1);
      addTaskLocalStorage();
      addTaskDiv();
   }, 500);
}


























//let tasks = [];

// Проверка есть ли в lockal storage что-то(задачи-tasks) и если нет, то тогда наш массив  будет пустым, а если есть здачи(в lockal storage),
// то тогда tasks равен JSON.parse.... парcим из JSON и задачи при обновлении страницы будут оставиться на странице благодаря вызванной функции
// fillHtmlList()
// !localStorage.tasks ? tasks = [] : tasks = JSON.parse(localStorage.getItem('tasks'))

// let todoItemElems = [];

// Создаем объекты которые будут храниться в lockal storage и потом будут появляться в "todos_wrapper".
// Их мы создаем с помощью конструктора, который будет создать много однотипных объектов.
// function Task(description) {
//    this.description = description; // пишем-бдущий ключ у объекта description будет равен description который попадет при создании данного конструктора
//    this.completed = false; // при создании task, она не должна быть сразу законченной. При загрузке страницы браузера мы должны понимать, это законченная  task (задача) или нет.
// }

// Создаем функцию которая будет создавать шаблоны задач.
// const createTamplate = (task, index) => {

// Если tasks закончен (complete), то мы должны поставить атрибут checked, но если такого нет, ставим пустые скобки (${task.completed?'checked': ''})
//    return `
//    <div class="todo_item ${task.completed ? 'checked' : ''}">
//             <div class="description">${task.description}</div>
//             <div class="buttons">
//                <input onclick= 'completeTask(${index})' class="btn-complete" type="checkbox" ${task.completed ? 'checked' : ''}>
//                <button onclick= 'deteTask(${index})' class="btn_delete">Delete</button>
//             </div>
//          </div>
//    `
// }

// Задачи которые выполнены они падают вниз, верху остаются только активные задачи
// const filterTasks = () => {
//    const activeTasks = tasks.length && tasks.filter(item => item.completed == false); // Пройдем по элемнетам в массиве Tasks и вернем те элементы которые активные (false), не активные у нас true (законченные)
//    const completedTasks = tasks.length && tasks.filter(item => item.completed == true);
//    tasks = [...activeTasks, ...completedTasks];
// }

// Добавляем в div todoswrapper, на ши задачи с помощью функции.
// const fillHtmlList = () => {
//    todosWrapper.innerHTML = ''; // зачищаем данные которые там были
//    if (tasks.length > 0) { // далее проверяем, если массив tasks не пустой(проверяем с помощью length), то нужно обратиться к массиву tasks, далее перебираем массив, чтобы добраться до каждой каждого объекта внутри массива.
//       filterTasks(); // вызываем функцию. которая будет сгружать выполненные задачи вниз
//       tasks.forEach((item, index) => { // делаем перебор массива с помощью forEach
//          todosWrapper.innerHTML += createTamplate(item, index);// обращаемся к todos_wrapper.innerHTHL и кладем в него созданную задачу с помощью функции createTamplate.
//       });
//       todoItemElems = document.querySelectorAll('.todo_item');// Если в tasks все заполненно, то мы обращаемся сюда
//    }
// }

// fillHtmlList(); // Объявляем функцию, чтобы добавленные задачи не исчезали при обновлении старницы

// Массив "tasks" отправляем lockal storage, с помощью функции
// const apdateLocalStorage = () => {
//    localStorage.setItem('tasks', JSON.stringify(tasks)); // чтобы что-то отправить в lockal storage, нужно к ней обратиться и передать ключ(tasks)/значение(JSON.stringify(tasks)).Сначала массив tasks превращаем в JSON(чтобы он хранился корректно), а потом отправить lockal storage.
// }

// Функция которая будет завершить задачу, будет меняться background
// Мы обращаемся к массиву tasks, найти тот элемент на котором поставили галочку, далее вызвать функцию (завершение)complete- которая принимает значение этого индекса, даллее обращается в массив tasks, меняет там значение, а потом обновляет  lockal storage
// const completeTask = index => { // функция принимет индекс index (какой-то индекс в зависимости на какую задачу кликнули чтобы она стала завершенной)
//    tasks[index].completed = !tasks[index].completed; // обращаемся к массиву, передаем индекс(тот индекс задачи по которой кликнули), далее есть свойство completed, далее меняем просто на противоположное значение !tasks[index].completed (если было fals станет true и наоборот)
//    if (tasks[index].completed) { // далее мы проверяем, если tasks[index].completed -true, то мы обращаемся к массиву (let todoItemElems). прописываем индекс элемента и пишем  classList.add('.checked');
//       todoItemElems[index].classList.add('checked');
//    } else {
//       todoItemElems[index].classList.remove('checked'); // Если false, то мы убираем класс, пишем remove
//    }
//    apdateLocalStorage(); // обнавляем
//    fillHtmlList(); // заполняем новыми какими-то данными
// }


// Когда и в какой момент будем создавать задачи и где будем их хранить.
//Для этого создаем слушателя
//addTaskBtn.addEventListener('click', () => { // при нажатии кнопки создается description и помещается в массив, который будет храниться в lockal storage.
//tasks.push(new Task(descTaskInput.value)); // получаем value от input, с помощью функции конструктора Task создаем объект и сохраняем в переменной- массив "let tasks".

//apdateLocalStorage(); // объявляем функцию apdateLocalStorage, для того чтобы массив добавился в lockal storage
//    fillHtmlList();
//    descTaskInput.value = ''; // Зачищаем input после того как добавили задачу
//});

// Удаляем tasks
// const deteTask = (index) => {
//    todoItemElems[index].classList.add('delition');
//    setTimeout(() => { // анимируем удаление
//       tasks.splice(index, 1); // удаляем элемент в массиве и далее обновляем lockal storage, аргумент index и кол-во элементов к удалению, нам нужно удалить 1 элемент
//       apdateLocalStorage(); // обнавляем
//       fillHtmlList(); // заполняем новыми какими-то данными
//    }, 500);
// }





