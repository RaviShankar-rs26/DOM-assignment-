//this is my student table body function
document.addEventListener("DOMContentLoaded", function () {
    const studentForm = document.getElementById("student-form");
    const studentTableBody = document.getElementById("student-table-body");
   //this is use to create local storage 
    let students = JSON.parse(localStorage.getItem("students")) || [];
    displayStudents();

    studentForm.addEventListener("submit", function (event) {
        event.preventDefault();
     // this is use to store the data of student same as it fill
        let name = document.getElementById("studentName").value.trim();
        let id = document.getElementById("studentID").value.trim();
        let studentClass = document.getElementById("studentClass").value.trim();
        let rollNo = document.getElementById("rollNo").value.trim();
        let email = document.getElementById("email").value.trim();
        let contact = document.getElementById("contact").value.trim();
          //this is my alert use to alert student fill the form correct meathod 
        if (!name || !id || !studentClass || !rollNo || !email || !contact) {
            alert("All fields are required!");
            return;
        }

        students.push({ name, id, studentClass, rollNo, email, contact });
        localStorage.setItem("students", JSON.stringify(students));

        displayStudents();
        studentForm.reset();
    });

    function displayStudents() {
        studentTableBody.innerHTML = "";
        students.forEach((student, index) => {
            let row = document.createElement("tr");
            row.innerHTML = `
                <td>${student.name}</td>
                <td>${student.id}</td>
                <td>${student.studentClass}</td>
                <td>${student.rollNo}</td>
                <td>${student.email}</td>
                <td>${student.contact}</td>
                <td>
                    <button class="reset-btn" onclick="editStudent(${index})">Reset</button>
                    <button class="delete-btn" onclick="deleteStudent(${index})">Delete</button>
                </td>
            `;
            studentTableBody.appendChild(row);
        });
    }

    window.editStudent = function (index) {
        let student = students[index];
        document.getElementById("studentName").value = student.name;
        document.getElementById("studentID").value = student.id;
        document.getElementById("studentClass").value = student.studentClass;
        document.getElementById("rollNo").value = student.rollNo;
        document.getElementById("email").value = student.email;
        document.getElementById("contact").value = student.contact;

        students.splice(index, 1);
        localStorage.setItem("students", JSON.stringify(students));
        displayStudents();
    };
        //this is use to delete tha data of
    window.deleteStudent = function (index) {
        if (confirm("Are you sure you want to delete this record?")) {
            students.splice(index, 1);
            localStorage.setItem("students", JSON.stringify(students));
            displayStudents();
        }
    };
});