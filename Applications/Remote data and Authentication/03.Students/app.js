const url = "http://localhost:3030/jsonstore/collections/students"
const formRef = document.getElementById("form");
formRef.addEventListener("submit", onSubmit);

const tbody = document.querySelector("tbody");


getStudents();
async function getStudents() {
    const response = await fetch(url);
    const data = await response.json();
    Object.values(data).forEach(rec => {
        let studentInfo = createRecord(rec);
        tbody.appendChild(studentInfo)
    })
}
async function onSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    let newStudentInfo = Object.fromEntries(formData)
    if (!newStudentInfo.firstName || !newStudentInfo.lastName ||
        !newStudentInfo.facultyNumber || !newStudentInfo.grade) {
        return;
    }
    await fetch(url, {
        method: "POST",
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify(newStudentInfo)
    })
    tbody.innerHTML = "";
    getStudents();
    formRef.reset();
}

function createRecord(data) {
    let tr = document.createElement("tr");
    let firstName = document.createElement("td");
    let lastName = document.createElement("td");
    let facultyNumber = document.createElement("td");
    let grade = document.createElement("td")

    firstName.textContent = data.firstName;
    lastName.textContent = data.lastName;
    facultyNumber.textContent = data.facultyNumber;
    grade.textContent = data.grade;

    tr.appendChild(firstName);
    tr.appendChild(lastName);
    tr.appendChild(facultyNumber);
    tr.appendChild(grade);

    return tr;
}
