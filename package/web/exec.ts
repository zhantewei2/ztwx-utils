export const copy=(str:string)=>{
    const txt:any=window.getSelection();
    txt.removeAllRanges();
    const div=document.createElement("div");
    div.style.cssText="visibility:hidden;position:absolute;top:0;left:0;transform:translate3d(-100%,-100%,0)";
    div.innerText=str;
    document.body.appendChild(div);
    txt.selectAllChildren(div);
    document.execCommand("copy");
    txt.removeAllRanges();
    document.body.removeChild(div);
}