import {defineVNodeHook} from "./utils";


export const Teleport={
  props:{
    to:{
      type:String,
    },
  },
  render(this:any){
    const child=this.$slots.default&&this.$slots.default[0];
    if(child){
      defineVNodeHook(child,{
        insert: ()=>{
          if(this.to||this.toEl){
            this.outsideWrapper=this.toEl||document.querySelector(this.to);
            this.outsideWrapper&&this.outsideWrapper.appendChild(this.outsideEl=child.elm);
          }
        }
      })
      return child;
    }else{
      this.outsideEl=null;
      return null;
    }
  },
  methods: {
    removeOutside(this:any) {
      this.outsideEl&&this.outsideEl.parentElement&&this.outsideEl.parentElement.removeChild(this.outsideEl);
      this.mutationUnsubscribe&&this.mutationUnsubscribe();
    }
  },
  activated(this:any){
    if(this.outsideEl&&this.outsideWrapper)this.outsideWrapper.appendChild(this.outsideEl);
  },
  deactivated(this:any){
    this.removeOutside();
  },
  beforeDestroy(this:any) {
    this.removeOutside();
  }
}