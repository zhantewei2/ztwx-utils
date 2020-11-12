const body=document&&document.body;
export const getScrollParent=(el: HTMLElement): HTMLElement=>{
  let parent: HTMLElement|any=(el as any).parentNode;
  if(el===body||parent===body){
    const bodyPosition=window.getComputedStyle(body).getPropertyValue("position");
    return /static|relative/.test(bodyPosition)?document.documentElement:body;
  }
  //IS Shadow Root
  if(parent.host&&parent.host instanceof HTMLElement){
    parent=parent.host;
  }
  const style=window.getComputedStyle(parent);
  return /auto|scroll/.test(
    style.getPropertyValue("overflow")+
    style.getPropertyValue("overflow-y")
  )?parent:getScrollParent(parent);
};

export const checkAndSetOffsetNode=(node:HTMLElement)=>{
  if(/static|inherit/.test(window.getComputedStyle(node).getPropertyValue("position"))){
    node.style.position="relative";
  }
}

export const getScrollDistanceFromNode=(
  targetNode:HTMLElement,
  scrollParent:HTMLElement=document.documentElement,
  distance:number=0
):number=>{
  distance+=targetNode.offsetTop;
  return targetNode.offsetParent!==scrollParent?
    (targetNode.offsetParent?getScrollDistanceFromNode((targetNode.offsetParent as HTMLElement),scrollParent,distance):distance)
    :distance;
}
