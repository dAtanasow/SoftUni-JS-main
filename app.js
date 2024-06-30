function students() {
    const url = "http://localhost:3030/jsonstore/collections/students"
    getStudentsInfo();
    
    document.getElementById("submit").addEventListener("click", onSubmit);
    
    const formRef = document.getElementById("form")
    const container = document.createElement("div");
    container.classList.add("students");
    
    async function getStudentsInfo() {

        const response = await fetch(url);
        const data = await response.json();
        Object.values(data).forEach(rec => {
            let studentInfo = createRecord(rec);
            container.appendChild(studentInfo);
        })
        formRef.appendChild(container)
    }


    function createRecord(data) {
        const tr = document.createElement("tr");
        
    }


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

        if (!data.firstName || !data.lastName || !data.facultyNumber || !data.grade) {
            return;
        }
        let div = createRecord(data);
        container.appendChild(div);
        firstNameRef.value = '';
        lastNameRef.value = '';
        facultyNumberRef.value = '';
        gradeRef.value = '';

    }
}
students();