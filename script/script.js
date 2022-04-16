let sum = 0, count = 0, stdArray = [];


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

function saveToTable(grade, stdName) {

    let studentCount = document.getElementById("stdCnt");
    let gradeAverage = document.getElementById("grdAvg");

    let tableBody = document.getElementById("tableBody");

    let tr = document.createElement("tr");
    let td1 = document.createElement("td");
    let td2 = document.createElement("td");
    let label1 = document.createElement("label");
    let label2 = document.createElement("label");

    sum += grade;
    count++;

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

function saveToLocalStorage() {
    localStorage.setItem("studentsList", JSON.stringify(stdArray));
}

function readLocalStorage() {
    if (localStorage.getItem("studentsList")) {
        stdArray = JSON.parse(localStorage.getItem("studentsList"));
        for (const i of stdArray) {
            saveToTable(i.stdGrade, i.stdName);
        }
    }
}

function validateName(name) {
    if (name.length < 5) return false;
    return true;
}

readLocalStorage();