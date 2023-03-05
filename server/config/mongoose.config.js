
const mongoose = require("mongoose");

const database = "vidShare_schema"

mongoose.set('strictQuery', true);
mongoose.connect(`mongodb://localhost/${database}`, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
})
	.then(() => console.log("Established a connection to the database"))
	.catch(err => console.log("Something went wrong when connecting to the database", err));