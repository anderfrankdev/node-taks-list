const fs = require("fs");

const file = "./db/data.json"

const saveDb = (data) => {
	const dataJson = JSON.stringify(data)
	fs.writeFileSync(file, dataJson)
}

const readDb = () => {

	if (!fs.existsSync(file)) return null

	const info = fs.readFileSync(file, {encoding:"utf-8"})

	return JSON.parse(info)
}

module.exports = {
	saveDb,
	readDb
}