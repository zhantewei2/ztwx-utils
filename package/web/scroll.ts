export const getScrollParent=(el: HTMLElement|Window): HTMLElement|Window=>{
  let parent: HTMLElement|any=(el as any).parentNode;
  if(el===window||parent===window)return window;
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
