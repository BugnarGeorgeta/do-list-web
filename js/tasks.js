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

    createTask: function () {
        let descriptionValue = $("#description-field").val();
        let deadlineValue = $("#deadline-field").val();
        let requestBody = {
            description: descriptionValue,
            deadline: deadlineValue,
        };
        $.ajax({
            url: DoList.API_URL,
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify(requestBody)
        }).done(function () {
            DoList.getTasks();
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

    },
    bindEvents: function () {
        $("#new-task-form").submit(function (event) {
            event.preventDefault(),
                DoList.createTask();
        })
    }


};
DoList.getTasks();
DoList.bindEvents();