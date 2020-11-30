const date = new Date()

const month = date.getMonth()<10 ? "0"+date.getMonth() : date.getMonth()
console.log(month)