const {v4:uudiv4} = require("uuid");

const Task = (()=>{
	
	function Task(description) {
		this.id = uudiv4();
		this.description=description;
		this.doneDate = null;
	}
	
	return Task

})()

module.exports = Task