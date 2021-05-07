console.log("initiating")
let app = require("./index.js");
console.log("app loading")
let port = process.argv.length === 3 ? +process.argv[2] : 8000
app.listen(port, () => console.log("Listening on port", port))
console.log("done")