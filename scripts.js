let host = "http://localhost:3000"

// FUNÇÃO PARA CRIAR UM ITEM DA LISTA DE TAREFAS

function createTaskItem(task) {
   const item = document.createElement("li");
   const title = document.createElement("h3");
   const description = document.createElement("p");
   const editButton = document.createElement("button");
   const deleteButton = document.createElement("button");
 
   title.textContent = task.title;
   description.textContent = task.description;
   editButton.textContent = "Editar";
   deleteButton.textContent = "Deletar";
 
   editButton.addEventListener("click", () => {
     editTask(task.id);
   });
 
   deleteButton.addEventListener("click", () => {
     deleteTask(task.id);
   });
 
   item.appendChild(title);
   item.appendChild(description);
   item.appendChild(editButton);
   item.appendChild(deleteButton);
 
   return item;
 }
 
 // FUNÇÃO PARA EXIBIR AS TAREFAS NA LISTA

 function displayTasks(tasks) {
   const taskList = document.getElementById("taskList");
   taskList.innerHTML = "";
 
   tasks.forEach(task => {
     const item = createTaskItem(task);
     taskList.appendChild(item);
   });
 }
 

 // FUNÇÃO PARA CARREGAR AS TAREFAS DO SERVIDOR
 function loadTasks() {
   fetch("")
     .then(response => response.json())
     .then(tasks => {
       displayTasks(tasks);
     })
     .catch(error => {
       console.error("Erro ao carregar as tarefas:", error);
     });
 }




 // FUNÇAO PARA EXIBIR AS TAREFAS NA TELA


function displayTasks(tasks) {
   const taskContainer = document.getElementById("taskContainer");
   taskContainer.innerHTML = "";
 
   tasks.forEach(task => {
     const item = createTaskItem(task);
     taskContainer.appendChild(item);
   });
 }
 
 // FUNÇÃO PARA ADICIONAR UMA NOVA TAREFA

 function addTask(event) {
   event.preventDefault();
 
   const titleInput = document.getElementById("titleInput");
   const descriptionInput = document.getElementById("descriptionInput");
 
   const task = {
     title: titleInput.value,
     description: descriptionInput.value
   };
 
   fetch("http://localhost:3000/tarefas", {
     method: "POST",
     headers: {
       "Content-Type": "application/json"
     },
     body: JSON.stringify(task)
   })
     .then(response => response.json())
     .then(response => {
       console.log("Nova tarefa adicionada:", response);
       titleInput.value = "";
       descriptionInput.value = "";
       loadTasks();
     })
     .catch(error => {
       console.error("Erro ao adicionar a tarefa:", error);
     });
 }
 
 // FUNÇÃO PARA EDITAR UMA NOVA TAREFA

 function editTask(taskId) {
   const newTitle = prompt("Novo título:");
   const newDescription = prompt("Nova descrição:");
 
   const updatedTask = {
     title: newTitle,
     description: newDescription
   };
 
   fetch(`http://localhost:3000/tarefas/${taskId}`, {
     method: "PUT",
     headers: {
       "Content-Type": "application/json"
     },
     body: JSON.stringify(updatedTask)
   })
     .then(response => response.json())
     .then(response => {
       console.log("Tarefa editada:", response);
       loadTasks();
     })
     .catch(error => {
       console.error("Erro ao editar a tarefa:", error);
     });
 }
 
 // FUNÇÃO PARA EXCLUIR UMA TAREFA

 function deleteTask(taskId) {
   fetch(`http://localhost:3000/tarefas/${taskId}`, {
     method: "DELETE"
   })
     .then(response => response.json())
     .then(response => {
       console.log("Tarefa excluída:", response);
       loadTasks();
     })
     .catch(error => {
       console.error("Erro ao excluir a tarefa:", error);
     });
 }
 
 // REGISTRAR O EVENTO DE SUBMIT DO FORMULÁRIO

 const taskForm = document.getElementById("taskForm");
 taskForm.addEventListener("submit", addTask);
 
 // CARREGAR AS TAREFAS AO CARREGAR A PÁGINA
 
 loadTasks();
 