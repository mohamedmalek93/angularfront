import { Scenario } from './scenario';
import { US } from './US';

export class Product{
    id:number;
    nom:String;
    htmlreport:String;
    stories: US[];
    selected:Boolean=false; 
    compressed:Boolean; 

switchState(){
    if(this.selected===false)
    this.selected=true;
    else this.selected =false;
}
}
