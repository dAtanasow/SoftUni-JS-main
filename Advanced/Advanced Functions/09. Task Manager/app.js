// Use the index.html and app.js files to solve this problem. You have NO permission to directly change the given HTML code (index.html file).
// Write the missing JavaScript code to make the Task Manager Functionality works as follows: 
// When the [Add] button is clicked, first you need to validate the inputs. If any of the input fields are empty, the function doesn’t make anything. 
// After validating the input fields, you need to add the new task (article) in the "Open" section. 
// The article should have two buttons "Start" and "Delete". Be careful to set the classes for the buttons and the parent-div.
// When the [Start] button is clicked, you need to move the Task in the section "In Progress". Be careful with the buttons!
// When the [Delete] button is clicked, the Task (whole article) should be removed from the HTML. 
// After clicking the [Finish] button, the Task will be completed, and you should move the article to the section "Complete". The buttons with their parent div-element should be removed.

function solve() {
  let formRef = document.querySelector("form");
  const [addTask, openTask, inProgress, complete] =
    document.querySelectorAll("section");

  formRef.addEventListener("submit", onSubmitHandler);

  function onSubmitHandler(e) {
    e.preventDefault();
    let formElements = e.target.elements;
    let task = formElements[0].value;
    let desc = formElements[1].value;
    let date = formElements[2].value;

    if (!task || !desc || !date) {
      return;
    }

    createArticle(task, desc, date);
    clearForm(formElements);
  }

  function clearForm(formElements) {
    formElements[0].value = ''
    formElements[1].value = ''
    formElements[2].value = ''
  }

  function createArticle(task, desc, date) {
    let newArticle = document.createElement("article");
    newArticle.innerHTML = getArticleTemp(task, desc, date);
    openTask.children[1].appendChild(newArticle);
    let btns = newArticle.querySelectorAll("button");
    addEventListenerToBtn(btns);
  }

  let btnsContent = {
    start: function (e) {
      let currentArticle = e.target.parentElement.parentElement;
      removeBtn(e.target.parentElement);
      currentArticle.innerHTML += getBtnPartial(
        { classes: "red", text: "Delete" },
        { classes: "orange", text: "Finish" }
      );
      let btns = currentArticle.querySelectorAll("button");
      addEventListenerToBtn(btns);
      inProgress.children[1].appendChild(currentArticle);
    },
    finish: function (e) {
      let currentArticle = e.target.parentElement.parentElement;
      removeBtn(e.target.parentElement);
      complete.children[1].appendChild(currentArticle);
    },
    delete: function (e) {
        e.target.parentElement.parentElement.remove()
    },
  };

  function clickHandler(e) {
    let command = e.target.innerText.toLowerCase();
    btnsContent[command](e);
  }

  function addEventListenerToBtn(btns) {
    Array.from(btns).forEach((btn) =>
      btn.addEventListener("click", clickHandler)
    );
  }

  function getArticleTemp(task, desc, date) {
    return (
      `<h3>${task}</h3>` +
      `<p>Description: ${desc}</p>` +
      `<p>Due Date: ${date}</p>` +
      getBtnPartial(
        { classes: "green", text: "Start" },
        { classes: "red", text: "Delete" }
      )
    );
  }

  function getBtnPartial(btn1, btn2) {
    return (
      `<div class="flex">` +
      `<button class=${btn1.classes}>${btn1.text}</button>` +
      `<button class=${btn2.classes}>${btn2.text}</button>` +
      `</div>`
    );
  }

  function removeBtn(e) {
    e.remove();
  }
}
