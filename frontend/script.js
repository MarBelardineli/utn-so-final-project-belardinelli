document.getElementById("loadButton").addEventListener("click", async () => {
  const response = await fetch("/api/students");
  const students = await response.json();
  const tbody = document.querySelector("#studentsTable tbody");
  tbody.innerHTML = "";
  students.forEach((student) => {
    const row = document.createElement("tr");
    row.innerHTML = `<td>${student.id}</td><td>${student.name}</td>`;
    tbody.appendChild(row);
  });
});

document.getElementById("greetBtn").addEventListener("click", async () => {

  const name = document.getElementById('nameInput').value;
  const input = document.getElementById('nameInput'); 

  if (!name) {
    alert('Por favor, ingresá tu nombre');
    return;
  }
  fetch(`/api/greet/${encodeURIComponent(name)}`)
    .then(response => response.json())
    .then(data => {
      document.getElementById('greetingMessage').textContent = data.message;
    })
  input.value = "";
})

document.getElementById("addStudent").addEventListener("submit", async (event) => {
  
  event.preventDefault(); 

  const input = document.getElementById("newStudentName");
  const name = input.value;

  if (!name) {
    alert('Por favor, ingresá un nombre');
    return;
  }

  const response = await fetch("/api/students", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name }),
  });

  const newStudent = await response.json();
  const status = document.getElementById("statusMessage");
  status.textContent = `Estudiante agregado: ${newStudent.name} (ID ${newStudent.id})`;
 
  console.log("Estudiante agregado:", newStudent);

  input.value = "";

  document.getElementById("loadButton").click();

  
})