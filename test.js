const {additionUrl,getPureUrl,getUrlTag,decodeQuery,parseUrl}=require("./main")

const str="https://www.aa.com?a=1&b=2#aa";

const aa=additionUrl("https://www.aa.com?a=1&b=2#aa",{"bbb":123});
console.log(getPureUrl(str),getUrlTag(str),decodeQuery(str),parseUrl(str))