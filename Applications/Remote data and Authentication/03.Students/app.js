async function getStudentInfo() {
    const formRef = document.getElementById("form");
    const url = "http://localhost:3030/jsonstore/collections/students"

    const container = document.createElement("div");
    container.classList.add("students");

    const response = await fetch(url);
    const data = await response.json();
    Object.values(data).forEach(rec => {
        let studentInfo = createRecord(rec);
        container.appendChild(studentInfo);
    })

    formRef.appendChild(container)

    function createRecord(data) {
        const div = document.createElement("div");
        div.innerHTML = `<input type="text" name="firstName" value=${data.firstName}>
            <input type="text" name="lastName" value=${data.lastName}>
            <input type="text" name="facultyNumber" value=${data.facultyNumber}>
            <input type="text" name="grade"  value=${data.grade}>`;

        return div;
    }

    document.getElementById("submit").addEventListener("click", onSubmit);

    async function onSubmit(e) {
        e.preventDefault();
        let firstNameRef = document.querySelector("input[name='firstName']");
        let lastNameRef = document.querySelector("input[name='lastName']");
        let facultyNumberRef = document.querySelector("input[name='facultyNumber']");
        let gradeRef = document.querySelector("input[name='grade']");

        let firstName = firstNameRef.value;
        let lastName = lastNameRef.value;
        let facultyNumber = facultyNumberRef.value;
        let grade = gradeRef.value;
        let data = {
            firstName,
            lastName,
            facultyNumber,
            grade
        }
        let div = createRecord(data);
        container.appendChild(div);
        firstNameRef.value = '';
        lastNameRef.value = '';
        facultyNumberRef.value = '';
        gradeRef.value = '';

    }
}
getStudentInfo();