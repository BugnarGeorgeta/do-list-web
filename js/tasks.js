window.DoList = {
    API_URL: "http://localhost:8081/tasks",
    getTasks: function () {
        $.ajax({
            url: DoList.API_URL,
            method: "GET"
        }).done(function (response) {
            console.log(response)
            DoList.displayTasks(JSON.parse(response));
        })
    },

    getTaskRow: function (task) {
        let formattedDeadliane = new Date(...task.deadline).toLocaleDateString("ro");
        let checkedAtributte = task.done ? "checked" : "";
        return `<tr>
            <td>${task.description}</td>
            <td>${formattedDeadliane}</td>
            <td><label>
                <input type="checkbox" data-id="${task.id}class="mark-done" ${checkedAtributte}>
            </label>
            </td>
            <td><a href="#" data-id=${task.id}class="delete-task"><i class="fas fa-trash"></i></a></td>
        </tr>`
    },
    displayTasks: function (tasks) {
        var tableBody = '';
        tasks.forEach(task => tableBody += DoList.getTaskRow(task));
        $("#tasks-table tbody").html(tableBody);

    }
};
DoList.getTasks();