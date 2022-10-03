"use strict";
const inputBox = document.getElementById("inputBox");
const buttonBox = document.getElementById("buttonBox");
const taskList = document.getElementById("taskList");
const logoBox = document.getElementById("logoBox");
const taskBox = document.getElementById("taskBox");
const errorBox = document.getElementById("errorBox");
const taskArray = JSON.parse(localStorage.getItem("taskArray") || "[]");
if (taskArray.length === 0) {
    logoBox === null || logoBox === void 0 ? void 0 : logoBox.classList.remove("hidden");
    taskBox === null || taskBox === void 0 ? void 0 : taskBox.classList.add("hidden");
}
else {
    logoBox === null || logoBox === void 0 ? void 0 : logoBox.classList.add("hidden");
    taskBox === null || taskBox === void 0 ? void 0 : taskBox.classList.remove("hidden");
}
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
        window.location.reload();
    }
};
const deleteTask = (event) => {
    var _a, _b;
    event.preventDefault();
    const textToDelete = (_b = (_a = event.target.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement) === null || _b === void 0 ? void 0 : _b.innerText;
    const indexToDelete = taskArray.findIndex((x) => x.text == textToDelete);
    taskArray.splice(indexToDelete, 1);
    localStorage.setItem("taskArray", JSON.stringify(taskArray));
    window.location.reload();
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
if (taskList != null) {
    taskList.innerHTML = taskArray
        .map((task) => {
        if (task.done === false) {
            return `<li class="flex justify-center items-center gap-3"><input type="checkbox" name='test' onclick="markDone(event)">${task.text} <button onclick="deleteTask(event)"><img src="../dist/bin.png" class="w-5"></button></li>`;
        }
        else {
            return `<li class="flex justify-center items-center gap-3 line-through"><input type="checkbox" checked name='test' onclick="markDone(event)">${task.text} <button onclick="deleteTask(event)"><img src="../dist/bin.png" class="w-5"></button></li>`;
        }
    })
        .join("");
}
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
    }
    else if (!isBetween(taskValue.length, MIN, MAX)) {
        showError(`Task must be between ${MIN} and ${MAX} characters`);
    }
    else {
        showSuccess;
        valid = true;
    }
    return valid;
};
