
  function newElement() {
    //get the input
    let inputValue = document.getElementById("toDo").value;
  
    //create a list of the task from the input
    let li = document.createElement("li");
    li.textContent = inputValue;
  
    //close button
    let span = document.createElement("span");
    span.className = "close";
    span.appendChild(document.createTextNode("\u00D7"));
    //\u00D7=x
    li.appendChild(span);//add the button to task
   
    //new task
    document.getElementById("listUl").appendChild(li);
   // reset input field
    document.getElementById("toDo").value = "";
  
    // gone when x is clicked
    span.onclick = function() {
      li.style.display = "none";
    };
  
    updateLocalStorage();
  }
  
  function updateLocalStorage() {
    let listItems = document.querySelectorAll("#listUl li");
    let tasks = [];
  
    // find and store the non checked tasks in the task array
    listItems.forEach(function(item, index) {
      if (!item.classList.contains("checked")) {
        tasks.push(item.textContent);
      }
    });
  //store tasks in local storage
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
  
  function restoreFromLocalStorage() {
    let storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      let tasks = JSON.parse(storedTasks);
  
       tasks.forEach(function(taskText) {
        let li = document.createElement("li");
        li.textContent = taskText;
  
        let span = document.createElement("span");
        span.className = "close";
        span.appendChild(document.createTextNode("\u00D7"));
        li.appendChild(span);
        document.getElementById("listUl").appendChild(li);
        //hide tasks when x is clicked
        span.onclick = function() {
          li.style.display = "none";
        };
      });
    }
  }
  
  document.getElementById("listUl").addEventListener("click", function(ev) {
    if (ev.target.tagName === "SPAN") {
      ev.target.parentElement.style.display = "none";
    } else if (ev.target.tagName === "LI") {
      ev.target.classList.toggle("checked");
    }
  
    updateLocalStorage();
  });
  
  //restore tasks from local storage when page is loaded
  document.addEventListener("DOMContentLoaded", function() {
    restoreFromLocalStorage();
  });
  
  
  
  
  