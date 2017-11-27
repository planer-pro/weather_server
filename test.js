var dataTemp = [];

for (let index = 0; index < 10; index++) {
    dataTemp.push(index);
}

console.log(dataTemp.length);

dataTemp.forEach(element => {
    console.log(dataTemp.shift());
    console.log(dataTemp);
});