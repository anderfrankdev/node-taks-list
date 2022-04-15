const Task = require("./task")
const colors = require("colors/safe")

const To_do_list = (()=>{
	
	function To_do_list() {
		this._list = {};
	}

	To_do_list.prototype.newTask = function(desc="") {
		const task = new Task(desc);	
		this._list[task.id] = task;
	}

	To_do_list.prototype.listArr = function(){
		return Object.values(this._list)
	}

	To_do_list.prototype.arrToList = function(arr){
		arr.forEach(data=>{
			this._list[data.id]=data
		})
	}

	To_do_list.prototype.showList = function(){

		if (!this.listArr().length) 
			console.log("There's no task")

		this.listArr().forEach((task,i)=>{
			const num = `${i+1}.`
			const taskName = task.description
			const complete = task.doneDate
							?colors.green("Completed")
							:colors.red("Pending")

			console.log(
				`${colors.yellow(num)} ${taskName} :: `
				,complete
			)
		
		})
	}

	To_do_list.prototype.showDone = function(){

		let noTaskDone=true
		
		this.listArr().forEach((task,i)=>{
			if (task.doneDate) {
				const num = `${i+1}.`
				const taskName = task.description
				const complete = colors.green(task.doneDate)
				console.log(
					`${colors.yellow(num)} ${taskName}`
					,complete
				)
				noTaskDone = false
			}
		})

		if (noTaskDone) 
			console.log("There's no task completed")
	}

	To_do_list.prototype.showPending = function(){

		let noTaskPending = true

		this.listArr().forEach((task,i)=>{
			if (!task.doneDate) {
				const num = `${i+1}.`
				const taskName = task.description
				const complete = colors.red("Pending")
				console.log(
					`${colors.yellow(num)} ${taskName} :: `
					,complete
				)
				noTaskPending = false;
			}
		})

		if (noTaskPending) 
			console.log("There's no task pending")

	}

	To_do_list.prototype.delete = async function(id){
		if (this._list[id]) delete this._list[id]
	}

	To_do_list.prototype.complete = async function(ids){
		this.listArr().forEach(task=>{
			if (ids.includes(task.id)){
				const date = new Date().toLocaleDateString()
				const time = new Date().toLocaleTimeString("en")
				task.doneDate = `completed on ${date} at ${time}`
			}else task.doneDate = null		
		})
	}

	To_do_list.prototype.edit = function(id, desc){
		if (this._list[id]) this._list[id].description=desc
	}

	return To_do_list

})()

module.exports = To_do_list