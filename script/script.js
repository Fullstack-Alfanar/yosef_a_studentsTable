/**
 * @param {number} sum used to save the sum of all the grades
 * @param {number} count used to save the number of students
 * @param {Array} stdArray used to save the student's names and grades as an array of objects 
 */
let sum = 0, count = 0, stdArray = [];

/**
 * this function rads the input from the HTML code
 */
function readInput() {
    let nameTxt = document.getElementById("nameInput");
    let gradeTxt = document.getElementById("gradeInput");
    let missingTxt = document.getElementById("missing");
    let missingStr = "Invalid parameters: ";
    let validName = (nameTxt.value == "" || nameTxt.value == null) || !validateName(nameTxt.value) ? false : true;
    let validGrade = gradeTxt.value == "" || gradeTxt.value == null ? false : true;
    let stdObj;

    if (validGrade) {
        if (!(Number.parseInt(gradeTxt.value) >= 0 && Number.parseInt(gradeTxt.value) <= 100)) { validGrade = false }
    }

    if (validName && validGrade) {
        missingStr = "Invalid parameters: ";
        missingTxt.style.display = "none";

        saveToTable(Number.parseInt(gradeTxt.value), nameTxt.value);

        stdObj = { stdName: nameTxt.value, stdGrade: Number.parseInt(gradeTxt.value) };
        stdArray.push(stdObj);
        saveToLocalStorage();

        nameTxt.value = "";
        gradeTxt.value = "";
    } else {
        if ((gradeTxt.value != "" && gradeTxt.value != null) && Number.parseInt(gradeTxt.value) >= 9000) missingStr = "Whaattt its over 9000!"
        else {
            missingStr = "Invalid parameters: ";
            if (!validName) missingStr += "name ";
            if (!validGrade) missingStr += "grade ";

        }
        missingTxt.textContent = missingStr;
        missingTxt.style.color = "red";
        missingTxt.style.display = "block";
    }
}


/**
 * this function displays the data in the table on the page,
 * this function also appends the <code>sum , count</code>
 * @param {number} grade the grade of the student
 * @param {string} stdName the name of the student
 */
function saveToTable(grade, stdName) {
    // get some HTML elements
    let studentCount = document.getElementById("stdCnt");
    let gradeAverage = document.getElementById("grdAvg");

    let tableBody = document.getElementById("tableBody");

    // create new HTML elements
    let tr = document.createElement("tr");
    let td1 = document.createElement("td");
    let td2 = document.createElement("td");
    let label1 = document.createElement("label");
    let label2 = document.createElement("label");

    // append the sum of all grades, and the count of all students
    sum += grade;
    count++;

    // display on the page
    gradeAverage.textContent = Math.floor(sum / count);
    studentCount.textContent = count;

    label1.textContent = stdName;
    td1.appendChild(label1);
    tr.appendChild(td1);

    label2.textContent = grade;
    td2.appendChild(label2);
    tr.appendChild(td2);

    tableBody.appendChild(tr);
}

/**
 * this function saves the stdArray to the local storage
 */
function saveToLocalStorage() {
    localStorage.setItem("studentsList", JSON.stringify(stdArray));
}

/**
 * this function reads the local storage for studentsList,
 * and it uses the saveToTable function to add the students to the table
 */
function readLocalStorage() {
    // first check if the localStorage contains the data
    if (localStorage.getItem("studentsList")) {
        stdArray = JSON.parse(localStorage.getItem("studentsList"));
        for (const i of stdArray) {
            saveToTable(i.stdGrade, i.stdName);
        }
    }
}


/**
 * this function checks if a name is a valid name or not 
 * @param {string} name the name to be checked
 * @returns boolean 
 */
function validateName(name) {
    if (name.length < 5) return false;
    return true;
}

/**
 * at the start of this page we need to check and get the students list from localStorage
 */
readLocalStorage();