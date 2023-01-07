//HTML variables
let _submitButton = $('#submit-button');
let _name = $('#name');
let _type = $('#type');
let _dueDate = $('#dueDate');
let _table = $('table');
let projectArray = [];

//Event listeners
_submitButton.on("click", addNewProject);

//newProject constructor
class project {
    constructor(id, name, type, dueDate){
        this.id = id;
        this.name = name;
        this.type = type;
        this.dueDate = dueDate;
    }
}

//Load initial storage, create it if it doesn't exist
if(localStorage.getItem("projects") == null){
    localStorage.setItem("projects", "");
} else {
    getLocalStorage();
    populateTracker();
}

//If localStorage isn't empty, load it into project array
function getLocalStorage(){
    if(localStorage.getItem("projects") != ""){
        projectArray = JSON.parse(localStorage.getItem("projects"));
    }
}

//Set local storage to the current value of project array
function populateTracker(){
    //guardian if statement
    if(projectArray.length == 0){
        return;
    }

    _table.innerHTML = "";                                      //Reset innerHTML of the table
    let today = dayjs().format("MM-DD-YYYY");                   //Get today's date

    for(let i = 0; i < projectArray.length; i++){
        let tableRow = document.createElement("<tr>");          //Create a row for each new element
        let projectDate = dayjs(projectArray[i].dueDate).format("MM-DD-YYYY");
        let projectName = projectArray[i].name;
        let projectType = projectArray[i].type;
        if(today > projectDate){
            tableRow.className = "light-red-class";
        }
        if(today == projectDate){
            tableRow.className = "light-yellow-class";
        }

        tableRow.setAttribute("data-id", projectArray[i].id);

        let column1 = document.createElement("<td>");
        let column2 = document.createElement("<td>");
        let column3 = document.createElement("<td>");
        
        column1.textContent = projectName;
        column2.textContent = projectDate;
        column3.textContent = projectType;

        tableRow.appendChild(column1);
        tableRow.appendChild(column2);
        tableRow.appendChild(column3);

        _table.appendChild(tableRow);
    }
}

function addNewProject() {
    let newIndex = projectArray.length;                         //Setting newIndex to length of project array ensure we're adding to the next index
    getLocalStorage();                                          //If local storage isn't empty, set projectArray to its value. If it is, projectArray remains empty

    let projectObj = new project(newIndex, _name.value, _project.value, _dueDate.value);     //Create new project object
    projectArray[newIndex] = projectObj;                                           //Sets the next index to the new object
    JSON.stringify(localStorage.setItem("projects", projectArray));                //Saves the updated projectArray to local storage
    populateTracker();                                                             //Populate the tracker
}