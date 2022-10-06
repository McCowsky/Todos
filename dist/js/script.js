"use strict";
const inputBox = document.getElementById("inputBox");
const buttonBox = document.getElementById("buttonBox");
const taskList = document.getElementById("taskList");
const logoBox = document.getElementById("logoBox");
const taskBox = document.getElementById("taskBox");
const errorBox = document.getElementById("errorBox");
const taskArray = JSON.parse(localStorage.getItem("taskArray") || "[]");
const saveTask = (event) => {
    event.preventDefault();
    let task = {
        text: inputBox === null || inputBox === void 0 ? void 0 : inputBox.value,
        done: false,
    };
    if (checkTask()) {
        if (inputBox != null)
            taskArray.push(task);
        localStorage.setItem("taskArray", JSON.stringify(taskArray));
        renderTaskList();
    }
};
const deleteTask = (event) => {
    var _a, _b;
    event.preventDefault();
    const textToDelete = (_b = (_a = event.target.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement) === null || _b === void 0 ? void 0 : _b.innerText;
    const indexToDelete = taskArray.findIndex((x) => x.text == textToDelete);
    taskArray.splice(indexToDelete, 1);
    localStorage.setItem("taskArray", JSON.stringify(taskArray));
    renderTaskList();
};
const markDone = (event) => {
    var _a;
    const indexToMark = taskArray.findIndex((x) => { var _a; return x.text == ((_a = event.target.parentElement) === null || _a === void 0 ? void 0 : _a.innerText); });
    taskArray[indexToMark].done === false
        ? (taskArray[indexToMark].done = true)
        : (taskArray[indexToMark].done = false);
    (_a = event.target.parentElement) === null || _a === void 0 ? void 0 : _a.classList.toggle("line-through");
    localStorage.setItem("taskArray", JSON.stringify(taskArray));
};
const renderTaskList = () => {
    if (taskArray.length === 0) {
        logoBox === null || logoBox === void 0 ? void 0 : logoBox.classList.remove("hidden");
        taskBox === null || taskBox === void 0 ? void 0 : taskBox.classList.add("hidden");
    }
    else {
        logoBox === null || logoBox === void 0 ? void 0 : logoBox.classList.add("hidden");
        taskBox === null || taskBox === void 0 ? void 0 : taskBox.classList.remove("hidden");
    }
    if (taskList != null) {
        taskList.innerHTML = "";
        taskArray.forEach((task) => {
            const li = document.createElement("li");
            li.classList.add("flex", "justify-center", "items-center", "gap-3");
            const input = document.createElement("input");
            input.type = "checkbox";
            const button = document.createElement("button");
            button.addEventListener("click", deleteTask);
            // const img = document.createElement("img");
            // img.src = "../dist/bin.png";
            // img.classList.add("w-5");
            // button.appendChild(img);
            const i = document.createElement("i");
            i.classList.add("fa", "fa-trash", "fa-regular");
            button.appendChild(i);
            input.addEventListener("click", markDone);
            const text = document.createElement("span");
            if (task.done === false) {
                li.appendChild(input);
                text.innerText = task.text;
                li.appendChild(text);
                li.appendChild(button);
                taskList.appendChild(li);
            }
            else {
                input.checked = true;
                li.classList.add("line-through");
                li.appendChild(input);
                text.innerText = task.text;
                li.appendChild(text);
                li.appendChild(button);
                taskList.appendChild(li);
            }
        });
    }
};
renderTaskList();
// FORM VALIDATION
const isRequired = (value) => (value === "" ? false : true);
const isBetween = (length, min, max) => length < min || length > max ? false : true;
const showError = (message) => {
    errorBox === null || errorBox === void 0 ? void 0 : errorBox.classList.remove("hidden");
    if (errorBox != null)
        errorBox.innerText = message;
};
const showSuccess = () => {
    errorBox === null || errorBox === void 0 ? void 0 : errorBox.classList.add("hidden");
    if (errorBox != null)
        errorBox.innerText = "";
};
const checkTask = () => {
    let valid = false;
    const MIN = 3;
    const MAX = 150;
    const taskValue = inputBox.value.trim();
    if (!isRequired(taskValue)) {
        showError("Task cannot be empty");
        return false;
    }
    if (!isBetween(taskValue.length, MIN, MAX)) {
        showError(`Task must be between ${MIN} and ${MAX} characters`);
        return false;
    }
    showSuccess;
    return true;
};
