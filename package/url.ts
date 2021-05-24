
export class QueryParams{
  /**
   * encode queryparams
   */
  encode=(obj:Record<any,any>,URIComponent:boolean=true):string=>{
    let str:string='';
    if(!obj)return str;
    let value:any;
    for(let i in obj){
      value=URIComponent?encodeURIComponent(obj[i]):obj[i];
      if(value||value===0)str+=i+'='+value+'&';
    }
    return str.slice(0,-1);
  };
  /**
   * decode queryparams
   */
  dencode=(url:string=""):Record<any,any>=>{
    if(!url)return {};
    try{
      let str:string=(url.match(/\?[^#?]*/)||"").toString();
      str=str.slice(1);
      const result:Record<any,any>={};
      const arr=str.split('&');
      arr.forEach(i=>{
        const [key,value]=i.split('=');
        result[key]=decodeURIComponent(value||"");
      });
      return result;
    }catch(e){
      return {};
    }
  };
}


export const queryparams=new QueryParams();
export const getPureUrl=(url:string)=>url?(url.match(/^[^\?#]*/)||"").toString():url;
export const additionUrl=(url:string,params?:Record<any, any>,URIComponent:boolean=true)=>
  url+(params&&Object.keys(params).length?'?'+queryparams.encode(params,URIComponent):'')