export interface LoadParams{
  address:string;
  tag:string;
  rel?:string;
  remove?:boolean;
  id?:string;
}


const load=({
    address,
    tag,
    rel,
    remove,
    id
}:LoadParams)=>{
  return new Promise((resolve,reject)=>{
    const script:any=document.createElement(tag);
    const body:HTMLElement|any=document.querySelector('body');
    id=id||(address.match(/[^\/]*$/)||address).toString();
    //filter if exists
    if(document.getElementById(id))return resolve();
    if(tag=='link'){
      script.href=address
    }else{
      script.src=address;
    }
    script.onload=()=>{
        if(remove)body.removeChild(script);
        resolve();
    }
    script.onerror=()=>{
        body.removeChild(script);
        reject()
    };
    script.id=id;
    if(rel)script.rel=rel;
    body.appendChild(script);
  })
}

export const loadJs=(address:string,id:string,remove:boolean=true)=>load({
  address,
  tag:"script",
  id,
  remove,
});
export const loadCss=(address:string,id:string,remove:boolean=false)=>load({
  address,
  rel:"stylesheet",
  tag:"link",
  id,
  remove,
});
