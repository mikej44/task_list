{
    const nextYearTasks = [
        {
            content: "zmiana samochodu",
            done: true,
        },
        {
            content: "remont mieszkania",
            done: false,
        },
    ];

    const removeTask = (index) => {
        nextYearTasks.splice(index, 1);
        render();
    };

    const addNewTask = (newTaskContent) => {

        nextYearTasks.push({
            content: newTaskContent,
        });
    };

    const toggleTaskDone = (index) => {
        nextYearTasks[index].done = !nextYearTasks[index].done;
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

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskElement = document.querySelector(".js-newTask");
        const newTaskContent = newTaskElement.value.trim();

        if (newTaskContent !== "") {
            addNewTask(newTaskContent);
            newTaskElement.value = "";
        }

        render();

        newTaskElement.focus();

    };

    const render = () => {
        let htmlString = "";

        for (const nextYearTask of nextYearTasks) {
            htmlString += `
        <li type="none" class="listItem 
            ${nextYearTask.done ? "taskDone" : ""}
            ">
                <button class="button js-doneButton"></button>
                <span class="newItem">${nextYearTask.content} </span>
                <button class="button button--remove js-removeButton"></button>
        </li>
        `;
        }

        document.querySelector(".js-tasks").innerHTML = htmlString;

        bindEvents();
    };

    const init = () => {

        render();

        const form = document.querySelector(".js-form");
        form.addEventListener("submit", onFormSubmit)
    };

    init();

}