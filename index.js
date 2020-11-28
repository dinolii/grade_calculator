const log = console.log;
log("Grade");
const addButton = document.getElementById("addButton");
const clearButton = document.getElementById("clearButton");
const gradeList = document.getElementById("gradeList");
const submitButton = document.getElementById("submitButton");
const showGrade = document.getElementById("showGrade");
const gradeToScale = {"A+": 90,
                  		"A": 85,
                  		"A-": 80,
                  		"B+": 77,
                  		"B": 73,
                  		"B-": 70,
                  		"C+": 67,
                  		"C": 63,
                  		"C-": 60,
                  		"D+": 57,
                  		"D": 53,
                  		"D-": 50};
let weightGrades = [];
function addPortion(){
	const weight = document.getElementById("gradeWeight").value;
	const grade = document.getElementById("gradePercent").value;
	if (weight && grade){
		const button = document.createElement('button');
		button.innerText='Delete';
		button.className='btn btn-dark';
		button.id='removeButton';
		button.onclick=function () {
			let parentElement = button.parentElement;
			let gradeNode = parentElement.childNodes[0];
			let gradeText = gradeNode.data;
			let info = gradeText.split('-');
			let percent = info[0].trim();
			percent = parseFloat(percent.substring(0, percent.length-1));
			let val = parseFloat(info[1].trim());
			gradeList.removeChild(parentElement);
			const deductGrade = val * (percent / 100);
			let newGrade = showGrade.firstElementChild.innerText.split(' ');
			let floats = newGrade.filter((x) => (! isNaN(x)));
			newGrade = parseFloat(floats[0]);
			newGrade -= deductGrade;
			let newWeight = parseFloat(floats[1]) - percent;
			let newHead = document.createElement('h1');
			newHead.className = "text-info";
			const format = `Current Grade is ${newGrade.toFixed(2)} Total Weight is ${newWeight.toFixed(2)}`;
			newHead.appendChild(document.createTextNode(format));
			const mapList = weightGrades.map((x) => x.every(function(element, index) {
				return element === [percent / 100, val][index];
			}));
			let lastIndex = mapList.lastIndexOf(true);
			weightGrades.splice(lastIndex, 1);
			showGrade.replaceChild(newHead, showGrade.firstElementChild);
		};
		const weightToGrade = `${weight}% - ${grade}`;
		const li = document.createElement('li');
		li.appendChild(document.createTextNode(weightToGrade));
		li.appendChild(button);
		li.className = "list-group-item";
		gradeList.appendChild(li);
		const temp = [parseFloat(weight) / 100, parseFloat(grade)];
		weightGrades.push(temp);
		const currentGrade = weightGrades.reduce((acc, sublist) => acc + (sublist[0] * sublist[1]), 0);
		const currentWeight = weightGrades.reduce((acc, sublist) => acc + (sublist[0] * 100), 0);
		const h1 = document.createElement("h1");
		h1.className = "text-info";
		const format = `Current Grade is ${currentGrade.toFixed(2)} Total Weight is ${currentWeight.toFixed(2)}`;
		h1.appendChild(document.createTextNode(format));
		if(showGrade.firstElementChild){
			showGrade.replaceChild(h1, showGrade.firstElementChild)
		}
		else{
			showGrade.appendChild(h1)
		}
	}

}
function calculateGrade(){
	const expectedGrade = document.getElementById("expectedGrade").value;
	let requiredGrade;
	if (expectedGrade.toUpperCase() in gradeToScale){
		requiredGrade = gradeToScale[expectedGrade.toUpperCase()]
	}
	else{
		requiredGrade = parseFloat(expectedGrade)
	}
	const totalPercent = weightGrades.reduce((acc, sublist) => acc + sublist[0], 0);
	const remainPercent = 1 - totalPercent;
	const currentGrade = weightGrades.reduce((acc, sublist) => acc + (sublist[0] * sublist[1]), 0);
	const remainGrade = requiredGrade - currentGrade;
	const estGrade = parseInt(remainGrade / remainPercent);
	let res;
	const h1 = document.createElement("h1");
	h1.className="text-info";
	if (0 < estGrade && estGrade < 99){
		res = `To get ${expectedGrade.toUpperCase()} you need to get ${estGrade + 1}`
	}
	else if (estGrade < 0){
		res = "You already achieve the score"
	}
	else{
		res = "Unachievable"
	}
	h1.appendChild(document.createTextNode(res));
	if(showGrade.childNodes.length !== 3){
		showGrade.appendChild(h1)
	}
	else{
		showGrade.replaceChild(h1, showGrade.childNodes[2])
	}
	
}
function clearGrade(){
	weightGrades = [];
	$("#showGrade").empty();
	$("#gradeList").empty();
}

addButton.addEventListener("click", addPortion);
submitButton.addEventListener("click", calculateGrade);
clearButton.addEventListener("click", clearGrade);
