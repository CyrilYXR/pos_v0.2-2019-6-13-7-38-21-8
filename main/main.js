'use strict';

function printReceipt(inputs) {
  var itemObject = countEachItem(inputs);
  var output = '';
  var totalMoney = 0.00;
  for(let barcode in itemObject){
    var num = itemObject[barcode];
    var item = getItemByBarcode(barcode);
    totalMoney += item.price * num;
    output+= (getOutputString(item, num) + '\n');
  }
  output = formatOutput(output, totalMoney);
  console.log(output);
}

function countEachItem(inputs){
  var obj={};
  inputs.forEach(element => {
    if(obj[element]){
      obj[element]++;
    } else {
      obj[element]=1;
    }
  });
  return obj;
}

function getItemByBarcode(barcode){
  var items = loadAllItems();
  //console.log(items);
  var item={};
  items.forEach(value =>{
    if(value.barcode==barcode){
      item = value;
    }
  });
  return item;
}

function getOutputString(item, num){
  return '名称：'+ item.name +'，数量：'+ num +'瓶，单价：'+ item.price.toFixed(2) +'(元)，小计：'+ (item.price * num).toFixed(2) +'(元)';
}

function formatOutput(output, totalMoney){
  var formatOutput = '***<没钱赚商店>收据***\n';
  formatOutput+=output;
  formatOutput+=('----------------------\n'+
    '总计：'+ totalMoney.toFixed(2) +'(元)\n' +
    '**********************');
  return formatOutput;
}
