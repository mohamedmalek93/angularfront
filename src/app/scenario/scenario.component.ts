import { Component, OnInit, Output, Input } from '@angular/core';
import { ServicesService } from '../services.service';
import { Scenario } from '../model/scenario';
import { Observable } from 'rxjs/internal/Observable';
import { Step } from '../model/Step';
import { FormGroup, FormBuilder } from '@angular/forms';
import { of } from 'rxjs';
import { Incident } from '../model/Incident';
import { Product } from '../model/Product';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import { DatePipe, JsonPipe } from '@angular/common';

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'YYYY-MM-DD',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
};
@Component({
  selector: 'app-scenario',
  templateUrl: './scenario.component.html',
  styleUrls: ['./scenario.component.css']
})

export class ScenarioComponent implements OnInit {
  @Input() date:Date;
  datePipe: DatePipe;
  products :Product[];
  scenarios :Scenario[];
  scenariosBydate :Scenario[];
  
  steps:Step[];
  action:String;
  actions= ['show all', 'previous not resolved errors', 'Todays error'];
  actionselected:String;
  aqualif= [ 'true positive', 'false positive','application on update'];
  qualifselected:String;
  states= [ 'SUCCESS', 'PENDING','ERROR'];
  stateselected:String;
 filter:String="none";
 qualiffilter:String ;
  constructor(private service:ServicesService) { }
 
  ngOnInit() {
    this.actionselected='show all';
    
      this.service.getprods()
        .subscribe( data => {
          this.products= data;
        });
        ;

}
getColor(i:number){
if(this.scenarios[i].result==="ERROR")  
return "red";
if(this.scenarios[i].result==="FAILURE") 
return "red";
if(this.scenarios[i].result==="RESOLVED")
return "orange";
if(this.scenarios[i].result==="IGNORED")
return "blue";
if(this.scenarios[i].result==="PENDING")
return "blue";

else 
return "green" ;
}
geterrordays(i:number){
  if(this.scenarios[i].result==="ERROR") 
  return "the script is failed for"+this.scenarios[i].errordays+"          days"
}
getsteps(i:number){
  return this.scenarios[i].steps;
}
setsteps(i:number){
  this.steps= this.scenarios[i].steps;
}
getbut(i:number){
  if(this.scenarios[i].visible==="hidden")
  return "show less";
  else return "show more"
}
show(i:number){
  if(this.scenarios[i].visible==="visible")
  this.scenarios[i].visible="hidden";
  else 
  this.scenarios[i].visible="visible";
}
getvis(i:number){
  if(this.scenarios[i].visible==="hidden")
  return "";
  else return "none";
}
geterror(i:number,j:number){
  if(this.scenarios[i].steps[j].incident!=null)
return this.scenarios[i].steps[j].incident.mainerror ;

}
geterrordes(i:number,j:number){
  if(this.scenarios[i].steps[j].incident!=null)
  return this.scenarios[i].steps[j].incident.description ;
}
getscreens(i:number,j:number){
  if(this.scenarios[i].steps[j].incident!=null){

    return this.scenarios[i].steps[j].images ;
  }
}


onActionSelected(val:any){
this.actionselec(val);
}
actionselec(val:any){
 if(val==="previous not resolved errors"){
  console.log("pendiiiiiiiiings");
 
  this.service.getunqual() .subscribe( data => {
    this.scenarios= data;
  });

}
if(val==="Todays error"){
  this.service.getErrors()
  .subscribe( data => {
    this.scenarios= data;
  });

}
if(val==="previous not resolved errors"){
  this.service.getErrors()
  .subscribe( data => {
    this.scenarios= data;
  });

}
if(val==="show all"){
  this.service.getEmployees()
  .subscribe( data => {
    this.scenarios= data;
  });

}
}
QualifSelected(val:any){
  this.qualifselection(val);
  }
  qualifselection(val:any){
   if(val==="true positive"){
    console.log("pendiiiiiiiiings");
   
    this.service.gettrue() .subscribe( data => {
      this.scenarios= data;
    });
  
  }
  if(val==="false positive"){
    this.service.getfalse()
    .subscribe( data => {
      this.scenarios= data;
    });
  
  }
  if(val==="application on update"){
    this.service.appupd()
    .subscribe( data => {
      this.scenarios= data;
    });
  
  }
  }
updateComment(i:number,j:number) {
  this.service.updateComment(this.scenarios[i].steps[j].incident.id, this.scenarios[i].steps[j].incident)
    .subscribe(data => console.log(data), error => console.log(error));
}
updatePend(i:number,j:number) {
  this.service.updateComment(this.scenarios[i].steps[j].incident.id, this.scenarios[i].steps[j].incident)
    .subscribe(data => console.log(data), error => console.log(error));
}

qualifselec(val:any,i:number,j:number){
  console.log("pendiiiiiiiiings");
  if(val==="true positive"||val==="false positive"||val==="'application on update"){

    //console.log(this.scenarios[i].steps[j].incident);
    
    let inc :Incident ; 
     inc=this.scenarios[i].steps[j].incident;
    inc.Qualif=this.qualifselected;
console.log(this.qualifselected);
   // console.log("this is a new  "+JSON.stringify(inc));

    this.service.updateQual(this.scenarios[i].steps[j].incident.id,this.qualifselected)
   .subscribe(data => console.log(data), error => console.log(error));
  } 
} 
onQualSelected(val:any,i:number,j:number){
 
  
    this.qualifselec(val, i,j);
    }
 

chooseproduct(i:number){
  
//console.log(this.filtervisib)
 
  
  if(this.products[i].selected===false){
    this.products[i].selected=true;
    console.log("visible");
    this.filter=("none");
    this.scenarios=[];
  }
  
  else {

    this.products[i].selected=false;
  console.log("hidden");
  this.filter=("");
  this.service.getEmployees()
        .subscribe( data => {
          this.scenarios= data;
        });
        ;
}
}

 
 addEvent( event: MatDatepickerInputEvent<Date>) {
this.service.getEmployees() .subscribe( data => {
  this.scenarios= data;

});
for(var sc of this.scenarios){
  if(sc.date_sc.getTime===this.date.getTime)
  this.scenariosBydate.push(sc);
}
this.scenarios=this.scenariosBydate;


  
  
  console.log(this.date.getTime());
}
onStateSelected(val:any){
  this.onstateselected(val);
  }
  onstateselected(val:any){
   if(val==="SUCCESS"){
    console.log("pendiiiiiiiiings");
   
    this.service.getSucc() .subscribe( data => {
      this.scenarios= data;
    });
  
  }
 
  }
}