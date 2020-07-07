import { Step } from './Step';

export class Scenario {

    
    description:String;
    result:String;
    etat:boolean ;
    color :String;
    duration:number;
    steps:Step[];
    errortype:String;
    visible:String="hidden";
    pendresult:String;
     Pending:Boolean=false;
    errordays:number;
  penddays:number;
  date_sc:Date;

    setetat(){
      if(this.result==="EROOR")
      this.etat=false;
      else this.etat=true;
    }
getcolor(){
  if(this.result==="ERROR")
  return "red";
  else return "green" ;
}

  }