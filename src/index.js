// init value

let arrTask = [
  { name: "Купит хлеб", isCompleted: true },
  { name: "Сделать домашку", isCompleted: false },
  { name: "Купить воды", isCompleted: false },
  { name: "НЕ забыть покушать", isCompleted: false },
];

//end init value

// add event
const addEventsListTasks = () => {
  document.querySelectorAll("li").forEach((el) => {
    const value = el.textContent;
    el.addEventListener("dblclick", (e) => {
      const input = e.target.firstElementChild;
      input.classList.remove("hidden");
      input.value = e.target.textContent;
      input.addEventListener("keydown", (e) => {
        if (e.code === "Enter") {
          if (input.value === "") {
            arrTask = [...arrTask.filter((el) => el.name !== value)];
            showTasks(arrTask);
          } else {
            arrTask = [
              ...arrTask.filter((el) => el.name !== value),
              {
                name: input.value,
                isCompleted: false,
              },
            ];
            showTasks(arrTask);
          }
        }
      });
    });
  });
};

const changeCompletedTask = () => {
  document.querySelectorAll(".button_completed").forEach((el) =>
    el.addEventListener("click", (e) => {
      arrTask = [
        ...arrTask.filter((e) => e.name !== el.previousSibling.textContent),
        { name: `${el.previousSibling.textContent}`, isCompleted: true },
      ];
      showTasks(arrTask);
    })
  );
};

//end add event

// show tasks
const showTasks = (arr) => {
  let str = "<ol>";
  arr.forEach((el) => {
    str +=
      `<li class='${el.isCompleted ? "done" : "undone"}'>` +
      `${el.name}` +
      `<input class='input_h hidden' type='text' />${
        !el.isCompleted
          ? "</li><button class='button_completed' type='submit'>Отметить как выполненную</button>"
          : ""
      }`;
  });
  str += "</ol>";
  document.querySelector(".ol").innerHTML = str;
  addEventsListTasks();
  changeCompletedTask();
};

//end show tasks

showTasks(arrTask);

// Add Task

document.querySelector(".button_add").addEventListener("click", () => {
  const input = document.querySelector(".input");
  if (input.value !== "") {
    arrTask = [...arrTask, { name: input.value, isCompleted: false }];
    showTasks(arrTask);
    input.value = "";
  } else {
    alert("Задача не может быть пустой");
  }
});

//end add task

// add event button filter
document.querySelector(".button_all").addEventListener("click", () => {
  showTasks(arrTask);
});
document.querySelector(".button_done").addEventListener("click", () => {
  showTasks([...arrTask.filter((el) => el.isCompleted)]);
});
document.querySelector(".button_undone").addEventListener("click", () => {
  showTasks([...arrTask.filter((el) => !el.isCompleted)]);
});

// end add event button filter

//change completed
