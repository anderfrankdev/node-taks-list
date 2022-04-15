const inquirer = require("inquirer");
const colors = require('colors/safe');

const inquirerMenu = async () =>{
	const questions = [
		{
			type:"list",
			name:"opt",
			message:"What do you want to do?",
			choices:[
				{value:"1",name:`${colors.yellow("1.")} Add a new task`},
				{value:"2",name:`${colors.yellow("2.")} Show list`},
				{value:"3",name:`${colors.yellow("3.")} Show completed tasks`},
				{value:"4",name:`${colors.yellow("4.")} Show Pending tasks`},
				{value:"5",name:`${colors.yellow("5.")} Complete a task`},
				{value:"6",name:`${colors.yellow("6.")} Delete a task`},
				{value:"7",name:`${colors.yellow("7.")} Edit a task`},
				{value:"0",name:`${colors.yellow("0.")} Exit`}
			]
		}
	]
	console.clear();
	console.log(colors.green("======================"))
	console.log(colors.green("   Select an option   "))
	console.log(colors.green("======================\n"))

	const opt = await inquirer.prompt(questions)
	return opt
}

const pausa = async () => {
	
	const questions = [
		{
			type:"input",
			name:"enter",
			message:`Press ${colors.green("ENTER")} to continue`
		}
	]

	console.log("\n")

	await inquirer.prompt(questions)	
}

const readInput = async (message) => {

	const questions = [
		{
			type:"input",
			name:"desc",
			message,
			validate(value){
				if (value.length===0) {
					return "Please tell me your task's name"
				}else return true
			}
		}
	]

	const {desc} = await inquirer.prompt(questions)
	
	return desc
}

const deleteMenu = async (arr) => {

	const choices = [];

	arr.forEach((task,i)=>{
		const value = task.id
		const name = task.description
		const state = task.doneDate
		?colors.green("Completed")
		:colors.red("Pending") 
		const num = colors.yellow(`${i+1}.`)

		choices.push({
			value,
			name:`${num} ${name} :: ${state}`
		})

	})

	const cancel = colors.yellow("0. ")+"Cancel"
	choices.unshift({value:"0",name:cancel})
	
	const questions = [
		{
			type:"list",
			name:"id",
			message:"What task do you want to delete?",
			choices
		}
	]
	
	const {id} = await inquirer.prompt(questions)
	
	return id
}

const confirm = async(message)=>{
	const questions = [
		{
			type:"confirm",
			name:"ok",
			message
		}
	]

	const {ok} = await inquirer.prompt(questions)
	return ok
}

const completeMenu = async (arr) => {

	const choices = [];


	arr.forEach((task,i)=>{
		const value = task.id
		const name = task.description
		const num = colors.yellow(`${i+1}.`)
		const checked = task.doneDate ? true : false
		choices.push({
			value,
			name:`${num} ${name}`,
			checked
		})

	})
	
	const questions = [
		{
			type:"checkbox",
			name:"ids",
			message:"What task did you complete?",
			choices
		}
	]

	if (!arr.length) return console.log("There's no task")

	const {ids} = await inquirer.prompt(questions)
	
	return ids
}

module.exports = {
	inquirerMenu,
	pausa,
	readInput,
	deleteMenu,
	confirm,
	completeMenu
}