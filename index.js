const log = console.log
log("Grade")
const addButton = document.getElementById("addButton")
const clearButton = document.getElementById("clearButton")
const gradeList = document.getElementById("gradeList")
const gradeDisplay = document.getElementById("gradeDisplay")
const submitButton = document.getElementById("submitButton")
const showGrade = document.getElementById("showGrade")
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
                  		"D-": 50}
let weightGrades = []
function addPortion(){
	const weight = document.getElementById("gradeWeight").value
	const grade = document.getElementById("gradePercent").value
	if (weight && grade){
		const weightToGrade = `${weight}% - ${grade}`
		const li = document.createElement('li')
		li.appendChild(document.createTextNode(weightToGrade))
		li.className = "list-group-item"
		gradeList.appendChild(li)
		const temp = [parseFloat(weight) / 100, parseFloat(grade)]
		weightGrades.push(temp)
		const currentGrade = weightGrades.reduce((acc, sublist) => acc + (sublist[0] * sublist[1]), 0)
		const h1 = document.createElement("h1")
		h1.className = "text-info"
		const format = `Current Grade is ${currentGrade.toFixed(2)}`
		h1.appendChild(document.createTextNode(format))
		if(showGrade.firstElementChild){
			showGrade.replaceChild(h1, showGrade.firstElementChild)
		}
		else{
			showGrade.appendChild(h1)
		}
	}

}
function calculateGrade(){
	const expectedGrade = document.getElementById("expectedGrade").value
	let requiredGrade
	if (expectedGrade.toUpperCase() in gradeToScale){
		requiredGrade = gradeToScale[expectedGrade.toUpperCase()]
	}
	else{
		requiredGrade = parseFloat(expectedGrade)
	}
	const totalPercent = weightGrades.reduce((acc, sublist) => acc + sublist[0], 0)
	const remainPercent = 1 - totalPercent
	const currentGrade = weightGrades.reduce((acc, sublist) => acc + (sublist[0] * sublist[1]), 0)
	const remainGrade = requiredGrade - currentGrade
	const estGrade = parseInt(remainGrade / remainPercent)
	let res
	const h1 = document.createElement("h1")
	h1.className="text-info"
	if (0 < estGrade && estGrade < 99){
		res = `To get ${expectedGrade.toUpperCase()} you need to get ${estGrade + 1}`
	}
	else if (estGrade < 0){
		res = "You already achieve the score"
	}
	else{
		res = "Unachievable"
	}
	h1.appendChild(document.createTextNode(res))
	if(showGrade.childNodes.length != 3){
		showGrade.appendChild(h1)
	}
	else{
		showGrade.replaceChild(h1, showGrade.childNodes[2])
	}
	
}
function clearGrade(){
	weightGrades = []
	if (showGrade.childNodes.length > 1){
		showGrade.removeChild(showGrade.childNodes[1])
	}
	$("#gradeList").empty()
}
addButton.addEventListener("click", addPortion)
submitButton.addEventListener("click", calculateGrade)
clearButton.addEventListener("click", clearGrade)