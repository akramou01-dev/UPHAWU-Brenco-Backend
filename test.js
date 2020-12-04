const date = new Date();
console.log(
  `${date.getFullYear()}-${
    date.getMonth() < 10 ?  (date.getMonth() + 1) : date.getMonth()+1
  }-${date.getDay() < 10 ? "0" + date.getDate() : date.getDate()}`
);
