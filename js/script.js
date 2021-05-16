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
    }

    const addNewTask = (newTaskContent) => {

        nextYearTasks.push({
            content: newTaskContent,
        });
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskContent = document.querySelector(".js-newTask").value.trim();

        if (newTaskContent === "") {
            return;
        }
        addNewTask(newTaskContent);

        render();

    };


    const render = () => {
        let htmlString = "";

        for (const nextYearTask of nextYearTasks) {
            htmlString += `
        <li class="${nextYearTask.done ? "taskDone" : ""}">
        <button class="js-doneButton">zrobione?</button>
        ${nextYearTask.content}
        <button class="js-removeButton">usuń</button>
        </li>
        `;
        }

        document.querySelector(".js-tasks").innerHTML = htmlString;

        const removeButtons = document.querySelectorAll(".js-removeButton"); /* querySelectorAll zwraca pseudolistę dodanych przycisków po któych możemy iterować przy pomocy forEach */

        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTask(index);
            });
        });
    };

    const init = () => {

        render();

        const form = document.querySelector(".js-form");
        form.addEventListener("submit", onFormSubmit)
    };

    init();

}