const {
	inquirerMenu,
	pausa,
	readInput,
	deleteMenu,
	confirm,
	completeMenu} = require("./helpers/inquirer")

const To_do_list = require("./helpers/list")
const {saveDb,readDb} = require("./helpers/db")


const main = async ()=>{

	let opt = ""

	const to_do_list = new To_do_list()

	const db = readDb()

	if (db) {
		to_do_list.arrToList(db)
	}

	while(opt!=="0"){

		opt = (await inquirerMenu()).opt
		
		switch(opt){
			case '1':
				const desc = await readInput("Description: ")
				to_do_list.newTask(desc)
			break;
			case "2":
				to_do_list.showList()
			break
			case "3":
				to_do_list.showDone()
			break
			case "4":
				to_do_list.showPending()
			break
			case "5":
				const ids = await completeMenu(to_do_list.listArr())
				if (typeof ids == "object") to_do_list.complete(ids)
			break
			case "6":
				const id = await deleteMenu(to_do_list.listArr())
				if (id==="0") break
				const ok = await confirm("Are you sure to delete this task?")
				if (!ok) break
				to_do_list.delete(id)
				console.log("Task deleted")
			break
			case "7":
				const id2 = await deleteMenu(to_do_list.listArr())
				if (id2==="0") break
				const desc2 = await readInput("Description: ")
				const ok2 = await confirm("Are you sure to edit this task?")
				if (!ok2) break
				to_do_list.edit(id2,desc2)
				console.log("Task Edited")
			break

		}

		saveDb(to_do_list.listArr())
		
		await pausa()	
	}

}

main()