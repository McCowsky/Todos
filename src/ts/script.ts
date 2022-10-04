type Task_Type = {
  text: string;
  done: boolean;
};

const inputBox = document.getElementById("inputBox") as HTMLInputElement | null;
const buttonBox = document.getElementById(
  "buttonBox"
) as HTMLButtonElement | null;
const taskList = document.getElementById("taskList") as HTMLUListElement | null;
const logoBox = document.getElementById("logoBox") as HTMLDivElement | null;
const taskBox = document.getElementById("taskBox") as HTMLDivElement | null;
const errorBox = document.getElementById("errorBox") as HTMLDivElement | null;

const taskArray = JSON.parse(localStorage.getItem("taskArray") || "[]");

const saveTask = (event: Event) => {
  event.preventDefault();
  let task = {
    text: inputBox?.value,
    done: false,
  };
  if (checkTask()) {
    if (inputBox != null) taskArray.push(task);
    localStorage.setItem("taskArray", JSON.stringify(taskArray));
    renderTaskList();
  }
};

const deleteTask = (event: Event) => {
  event.preventDefault();
  const textToDelete: string = (event.target as HTMLInputElement).parentElement
    ?.parentElement?.innerText!;
  const indexToDelete = taskArray.findIndex(
    (x: Task_Type) => x.text == textToDelete
  );
  taskArray.splice(indexToDelete, 1);
  localStorage.setItem("taskArray", JSON.stringify(taskArray));
  renderTaskList();
};

const markDone = (event: Event) => {
  const indexToMark = taskArray.findIndex(
    (x: Task_Type) =>
      x.text == (event.target as HTMLLIElement).parentElement?.innerText
  );
  taskArray[indexToMark].done === false
    ? (taskArray[indexToMark].done = true)
    : (taskArray[indexToMark].done = false);

  (event.target as HTMLLIElement).parentElement?.classList.toggle(
    "line-through"
  );
  localStorage.setItem("taskArray", JSON.stringify(taskArray));
};

const renderTaskList = () => {
  if (taskArray.length === 0) {
    logoBox?.classList.remove("hidden");
    taskBox?.classList.add("hidden");
  } else {
    logoBox?.classList.add("hidden");
    taskBox?.classList.remove("hidden");
  }

  if (taskList != null) {
    taskList.innerHTML = taskArray
      .map((task: Task_Type) => {
        if (task.done === false) {
          return `<li class="flex justify-center items-center gap-3"><input type="checkbox" name='test' onclick="markDone(event)">${task.text} <button onclick="deleteTask(event)"><img src="../dist/bin.png" class="w-5"></button></li>`;
        } else {
          return `<li class="flex justify-center items-center gap-3 line-through"><input type="checkbox" checked name='test' onclick="markDone(event)">${task.text} <button onclick="deleteTask(event)"><img src="../dist/bin.png" class="w-5"></button></li>`;
        }
      })
      .join("");
  }
};

renderTaskList();

// FORM VALIDATION

const isRequired = (value: string) => (value === "" ? false : true);

const isBetween = (length: number, min: number, max: number) =>
  length < min || length > max ? false : true;

const showError = (message: string) => {
  errorBox?.classList.remove("hidden");
  if (errorBox != null) errorBox.innerText = message;
};

const showSuccess = () => {
  errorBox?.classList.add("hidden");
  if (errorBox != null) errorBox.innerText = "";
};

const checkTask = () => {
  let valid: boolean = false;
  const MIN = 3;
  const MAX = 150;
  const taskValue: string = inputBox!.value.trim();

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
