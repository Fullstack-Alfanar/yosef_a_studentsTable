let sum = 0, count = 0;

function saveToTable() {

    let nameTxt = document.getElementById("nameInput");
    let gradeTxt = document.getElementById("gradeInput");

    let studentCount = document.getElementById("stdCnt");
    let gradeAverage = document.getElementById("grdAvg");

    let missingTxt = document.getElementById("missing");
    let missingStr = "Invalid parameters: ";

    let tableBody = document.getElementById("tableBody");

    let validName = nameTxt.value == "" || nameTxt.value == null ? false : true;
    let validGrade = gradeTxt.value == "" || gradeTxt.value == null ? false : true;

    let tr = document.createElement("tr");
    let td1 = document.createElement("td");
    let td2 = document.createElement("td");
    let label1 = document.createElement("label");
    let label2 = document.createElement("label");

    if (validGrade) {
        if (!(Number.parseInt(gradeTxt.value) >= 0 && Number.parseInt(gradeTxt.value) <= 100)) { validGrade = false }

    }

    if (validName && validGrade) {

        sum += Number.parseInt(gradeTxt.value);
        count++;

        gradeAverage.textContent = Math.floor(sum / count);
        studentCount.textContent = count;

        missingStr = "Invalid parameters: ";
        missingTxt.style.display = "none";

        label1.textContent = nameTxt.value;
        td1.appendChild(label1);
        tr.appendChild(td1);

        label2.textContent = gradeTxt.value;
        td2.appendChild(label2);
        tr.appendChild(td2);

        tableBody.appendChild(tr);

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