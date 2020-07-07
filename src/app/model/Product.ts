import { Scenario } from './scenario';

export class Product{
    id:number;
    nom:String;
    htmlreport:String;
    Scearios: Scenario[];
    selected:Boolean=false; ;
switchState(){
    if(this.selected===false)
    this.selected=true;
    else this.selected =false;
}
}
