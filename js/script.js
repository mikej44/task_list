{
    let nextYearTasks = [];
    let hideDoneTasks = false;

    const removeTask = (index) => {
        /*nextYearTasks.splice(index, 1);//stara wersja z mutowaniem*/
        nextYearTasks = [
            ...nextYearTasks.slice(0, index),
            ...nextYearTasks.slice(index + 1),
        ];
        render();
    };

    const addNewTask = (newTaskContent) => {
        nextYearTasks = [
            ...nextYearTasks,
            { content: newTaskContent },
        ];
        render();
        /*nextYearTasks.push({
            content: newTaskContent,
        });  //stara wersja z mutowaniem*/
    };

    const toggleTaskDone = (index) => {
        nextYearTasks = [
            ...nextYearTasks.slice(0, index),
            {
                ...nextYearTasks[index],
                done: !nextYearTasks[index].done
            },
            ...nextYearTasks.slice(index + 1),
        ];
        /*nextYearTasks[index].done = !nextYearTasks[index].done; stara wersja z mutowaniem*/
        render();
    };

    const toggleHideDoneTask = () => {
        hideDoneTasks = !hideDoneTasks;
        render();
    };

    const finishAllTasks = () => {
        nextYearTasks = nextYearTasks.map(task => ({...task, done: true}));
        render();
    };

    const bindEvents = () => {
        const removeButtons = document.querySelectorAll(".js-removeButton"); /* querySelectorAll zwraca pseudolistę dodanych przycisków po któych możemy iterować przy pomocy forEach */

        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTask(index);
            });
        });

        const doneButtons = document.querySelectorAll(".js-doneButton");

        doneButtons.forEach((doneButton, index) => {
            doneButton.addEventListener("click", () => {
                toggleTaskDone(index);

            });
        });
    };

    const bindHideTasksEvent = () => {
        const hideTasksButton = document.querySelector(".js-hideTasksButton");

        if (!hideTasksButton) {
            return;
        }
        hideTasksButton.addEventListener("click", () => {
            toggleHideDoneTask();
        });
    };

    const bindFinishAllTasksEvent = () => {
        const finishTasksButton = document.querySelector(".js-tasksDoneButton");

        if (!finishTasksButton) {
            return;
        }
        finishTasksButton.addEventListener("click", () => {
            finishAllTasks();
        });
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskElement = document.querySelector(".js-newTask");
        const newTaskContent = newTaskElement.value.trim();

        if (newTaskContent !== "") {
            addNewTask(newTaskContent);
            newTaskElement.value = "";
        };

        render();

        newTaskElement.focus();

    };

    const renderTasks = () => {

        let htmlString = "";

        for (const nextYearTask of nextYearTasks) {
            htmlString += `
            <li type="none" class="listItem ${nextYearTask.done && hideDoneTasks ? "listItem--hide" : ""}"> 
                <button class="button js-doneButton ${nextYearTask.done ? "button--thick" : ""}"></button>
                    <span class="newItemText ${nextYearTask.done ? "taskDone" : ""}">${nextYearTask.content} </span>
                <button class="button button--remove js-removeButton"></button>
            </li>
            `;
        };

        document.querySelector(".js-tasks").innerHTML = htmlString;
    };

    const renderButtons = () => {
        let htmlButtons = "";

        if (nextYearTasks.length > 0) {
            htmlButtons +=
                `<button class="js-hideTasksButton taskList__button">${hideDoneTasks ? "Pokaż ukończone" : "Ukryj ukończone"}</button>
                <button class="js-tasksDoneButton taskList__button" ${nextYearTasks.every(task => task.done) ? "disabled" : ""}>Ukończ wszystkie</button>`
        } else {
            htmlButtons = "";
        };

        document.querySelector(".taskList__buttons").innerHTML = htmlButtons;
    };

    const render = () => {
        renderTasks();
        renderButtons();

        bindEvents();
        bindHideTasksEvent();
        bindFinishAllTasksEvent();
    };

    const init = () => {

        render();

        const form = document.querySelector(".js-form");
        form.addEventListener("submit", onFormSubmit)
    };

    init();

}