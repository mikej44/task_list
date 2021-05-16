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

    const addNewTask = (newTaskContent) => {

        nextYearTasks.push({
            content: newTaskContent,
        });
    }

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
        <button class="js-doneButton"></button>
        ${nextYearTask.content}
        <button class="js-removeButton"></button>
        </li>
        `;
        }

        document.querySelector(".js-tasks").innerHTML = htmlString;
    };

    const init = () => {
        
        render();

        const form = document.querySelector(".js-form");
        form.addEventListener("submit", onFormSubmit())
    };

    init();

}