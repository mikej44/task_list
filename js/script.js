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

    const render = () => {
        let htmlString = "";

        for (const nextYearTask of nextYearTasks) {
            htmlString += `
        <li>
        <button></button>
        ${nextYearTask.content}
        <button></button>
        </li>
        `;
        }

        document.querySelector(".js-tasks").innerHTML = htmlString;
    };

    const init = () => {
        render();
    };

    init();

}