const tasks = JSON.parse(localStorage.getItem("tasks")) || [
    {
        text: "task 01",
        isCompleted: false,
    },
    {
        text: "task 02",
        isCompleted: true,
    },
];

const ul = document.querySelector("ul.list-group");
const taskInput = document.querySelector("#task-input");
const addBtn = document.getElementById("add-btn");
let editIndex = null;

const runConfetti = () => {
    confetti({
        particleCount: 300,
        spread: false,
        origin: { y: 0.6 },
    });
};

const toastSuccess = (message) => {
    Toastify({
        text: message,
        duration: 3000,
        style: {
            background: "rgb(79, 179, 79)",
            borderRadius: "10px",
        },
    }).showToast();
};

const toastError = (message) => {
    Toastify({
        text: message,
        duration: 3000,
        style: {
            background: "rgb(201, 68, 68)",
            borderRadius: "10px",
        },
    }).showToast();
};

const renderTasks = () => {
    localStorage.setItem("tasks", JSON.stringify(tasks));

    ul.innerHTML = "";

    tasks.map((item, index) => {
        const li = document.createElement("li");
        li.className =
            "list-group-item d-flex justify-content-between align-items-start";
        li.innerHTML = `
          <div class="me-auto">
          <button class="btn border-0 p-0 me-2" onclick="complete(${index})">
            ${item.isCompleted
                ? `<i class="fa-regular fa-circle-check"></i>`
                : `<i class="fa-regular fa-circle-check"></i>`
            }
          </button>
        <span class="${item.isCompleted ? "text-secondary text-decoration-line-through" : ""
            }"
          >${index + 1}. ${item.text}</span>
      </div>
      <div>
        <button class="btn border-0 p-0 me-2 edit-btn" onclick="editClick(${index})">
          <i class="fa-solid fa-pencil"></i>
        </button>
        <button class="btn border-0 p-0" onclick="removeTask(${index})">
          <i class="fa-solid fa-trash-can"></i>
        </button>
      </div>
        `;
        ul.appendChild(li);
    });
};

window.onload = () => {
    renderTasks();
};

const addTask = () => {
    const text = taskInput.value.trim();

    if (text.length == 0) {
        toastError("Task Kiritilmagan !!");
        taskInput.value = "";
        return;
    }
    if (editIndex !== null) {
        tasks[editIndex].text = text;
        editIndex = null;
        addBtn.innerHTML = "Add";
    } else {
        tasks.unshift({ text, isCompleted: false });
    }
    renderTasks();
    taskInput.value = "";
};

const removeTask = (index) => {
    tasks.splice(index, 1);
    renderTasks();
};

const complete = (index) => {
    tasks[index].isCompleted = !tasks[index].isCompleted;
    renderTasks();

    const filteredUncompletedTasks = tasks.filter((t) => !t.isCompleted);
    if (filteredUncompletedTasks.length == 0) runConfetti();
};

const editClick = (index) => {
    editIndex = index;
    taskInput.value = tasks[index].text;
    addBtn.innerHTML = "Edit";
};
