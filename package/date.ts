const _second=1000;
const _minute=_second*60;
const _hour=_minute*60;
const _day=_hour*24;
const _year=_day*365;
const _just=_second*10;

export const awaitSleep=(time:number)=>new Promise(resolve=>setTimeout(resolve,time))

export const disDate=(params:string|Date|number,simple?:boolean):string=>{
  let date:Date|null=null;
  if(typeof params=='string'||typeof params =='number'){
    date=new Date(params);
  }else if(params instanceof Date){
    date=params;
  }
  if(!date)return '';

  const disNum:number=new Date().getTime()-date.getTime();

  if(disNum<_just)return '刚刚';
  let content='';

  const run=()=>{
    let
    year:number,
    yearRD:number,
    day:number,
    dayRD:number,
    hour:number,
    hourRD:number,
    minute:number,
    minuteRD:number,
    second:number,
    defineM:boolean=false;
    year=Math.floor(disNum /_year);
    yearRD=disNum % _year;
    if(year)return content+=year+'年';
    if(yearRD){
      day=Math.floor(yearRD/_day);
      if(day)return content+=day+'天';
      dayRD=yearRD % _day;
      if(dayRD){
        hour=Math.floor(dayRD/_hour);
        if(hour){
          content+=hour+'小时';
          if(simple)return;
        }
        hourRD=dayRD % _hour;
        if(hourRD){
          minute=Math.floor(hourRD/_minute);
          if(minute){
            if(content||simple){
              return content+=minute+'分钟'
            }else{
              defineM=true;
              content+=minute+'分'
            }
          }
          minuteRD=hourRD % _minute;
          if(minuteRD){
            second=Math.floor(minuteRD/_second);
            content+=second+'秒';
          }else if(defineM){
            content+='钟';
          }
        }
      }
    }
  };
  run();
  return content+'前';
};
