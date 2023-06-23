const {getUniqueId}=require("../main/uniqueId");
let count=100000;
while(count--){

  console.log(getUniqueId());
}