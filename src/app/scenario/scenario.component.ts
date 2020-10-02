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
import { US } from '../model/US';



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
  distinctscenarios :Scenario[];
  stories :US[];
  scenariosBydate :Scenario[];
  scenariostemp :Scenario[];
  steps:Step[];
  action:String;
  actions= ['show all', 'previous not resolved errors', 'Todays error'];
  actionselected:String;
  aqualif= [ 'true positive', 'false positive','application on update'];
  qualifselected:String;
  states= [ 'SUCCESS', 'PENDING','ERROR'];
  stateselected:String;
 filter:String="none";
 filterstory:String="none";
 filtersc:String="none";
 filterprod:String="";
 filterdistinct:String="none";
 qualiffilter:String ;
 selectedproduct:String;
 selectedstory:String;

 prodId:number;
 UsId:number;

 compress:Boolean ;
 scenariosbyprod :Scenario[];
 scenariosbyUs :Scenario[];

 Failbyprod:number=0;
 Succbyprod:number=0;
 Resobyprod:number=0;
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
return "blue";
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
  

    return this.scenarios[i].steps[j].images ;
    console.log(j);
  
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
  
  this.scenarios=this.scenariostemp;

}
}
QualifSelected(val:any){
  this.qualifselection(val);
  }
  qualifselection(val:any){
    this.actionselected="";
this.stateselected="";
   if(val==="true positive"){
    this.scenarios=this.scenariostemp;
  
    let temp:Scenario[]=[];;


for(var sc of this.scenarios){
  
  for(var s of this.steps)
  if(s.incident.Qualif==="true positive"){

  

  temp.push(sc);
  

}
this.scenarios=temp;
temp=[];
}
  
  }
  if(val==="false positive"){
    this.scenarios=this.scenariostemp;
  
    let temp:Scenario[]=[];;


for(var sc of this.scenarios){
  
  for(var s of this.steps)
  if(s.incident.Qualif==="false positive"){

  

  temp.push(sc);
  

}
this.scenarios=temp;
temp=[];
}

  
  }
  if(val==="application on update"){
    this.service.appupd()
    .subscribe( data => {
      this.scenarios= data;
    });
  
  }
  }
updateComment(i:number,j:number) {
  if (confirm("you sure want add this comment ?"))

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
   if (confirm("you sure want to qualify this incident as "+this.qualifselected+"?"))

    this.service.updateQual(this.scenarios[i].steps[j].incident.id,this.qualifselected)
   .subscribe(data => console.log(data), error => console.log(error));
  } 
} 
onQualSelected(val:any,i:number,j:number){
 
  
    this.qualifselec(val, i,j);
    }
 

chooseproduct(i:number){
  
//console.log(this.filtervisib)
 
  this.selectedproduct=this.products[i].nom;
  this.prodId=this.products[i].id;
  this.compress=this.products[i].compressed;
  if(this.products[i].selected===false){
    this.products[i].selected=true;
    console.log("visible");
    this.filter=("none");
    
    this.stories=[];
  }
  
  else {

    this.products[i].selected=false;
  console.log("hidden");
  this.filterprod=("none");
  this.filter=('');
  this.service.getUS(this.products[i].id)
        .subscribe( data => {
          this.stories= data;
         // this.products=[];
        });
        ;
         
}
}

 
 addEvent( event: MatDatepickerInputEvent<Date>) {
  this.actionselected="";
  this.qualifselected="";
  var a:boolean =false;
this.scenarios=this.scenariostemp;
  
  this.scenariosBydate=[];


for(var sc of this.scenarios){
  var date1=new Date(sc.date_sc);
  console. log(date1.getTime());
  console. log(this.date.getTime());
  if(date1.getDate()===this.date.getDate()&&date1.getMonth()===this.date.getMonth()){
a=true;
  

  this.scenariosBydate.push(sc);
  

}
this.scenarios=this.scenariosBydate;
}



  
  
  console.log(this.scenarios.length);
  console.log(this.scenariosBydate.length);
}
onStateSelected(val:any){
  this.onstateselected(val);
  }
  onstateselected(val:any){
    this.scenarios=this.scenariostemp;
    let temp:Scenario[]=[];
this.actionselected="";
this.qualifselected="";

    if(val==="SUCCESS"){
     
for(var sc of this.scenarios){
  
  if(sc.result==="SUCCESS")

  

  temp.push(sc);
  

}
console.log(temp.length);
this.scenarios=temp;
temp=[];
    }
    if(val!="SUCCESS"){
      
      for(var sc of this.scenarios){
        
        if(sc.result!="SUCCESS")
      
        
      
        temp.push(sc);
        
      
      }
      this.scenarios=temp;
      temp=[];

      
          }

  }
  getUS(id:number){
    this.service.getUS(id)
        .subscribe( data => {
          this.stories= data;
        });
        ;
        
  }
  testNgClick(id:number){
    this.filter='none';
    this.filtersc='';
    this.UsId=id;
    this.service.getSCDistint(id)
        .subscribe( data => {
          this.distinctscenarios= data;
        });
        ;
        for(var s of this.stories){
          if(s.id==id)
          this.selectedstory=s.nom;
        }
    console.log("click working ");
  }
  rendonantsc(id:number){
    
    this.filtersc='none';
    this.filterdistinct='';
    this.service.getSCDsame(id)
        .subscribe( data => {
          this.scenariostemp= data;
        });
        this.service.getSCDsame(id)
        .subscribe( data => {
          this.scenarios= data;
        });
        
    console.log("click working ");
  }
  averageexutiontime():number{
    let time:number=0;
    for(var sc of this.scenarios){
      
      time=time+sc.duration;
    }
    return time/(this.scenarios.length);
  }
  Selectedsc(){
    if(this.scenarios !=null)
    return this.scenarios[0].description ;
  }
  backtoproducts(){
    this.filterprod='';
    this.filter='none';
    this.filterdistinct='none';
    this.stories=[];
    
  }
  backtoStories(){
    this.filterprod='none';
    this.filter='';
    this.filterdistinct='none';
    this.distinctscenarios=[];
    this.filtersc='none';
    
    
    
    
  }
scenarioDetails(){
  window.alert("average execution time is "+this.averageexutiontime()+" secondes")
}
getreport(i:number){
  

  return this.scenarios[i].id;
  

}
getId(){
  return this.prodId;
}
getcompress(){
  return this.compress;
}
getnumberFFailurebyprod(){
let id =this.prodId;
let fail:number=0;
let succ:number=0;
let resol:number=0;
 this.service.getSuccbyprod(id)
.subscribe( data => {
  this.scenariosbyprod= data;
});
for(var sc of this.scenariosbyprod){
  if(sc.result==="FAILURE")
  fail=fail+1;
  if(sc.result==="SUCCESS")
  succ=succ+1;
  if(sc.result==="RESOLVED")
  resol=resol+1;
  
}
this.Failbyprod=fail;
this.Succbyprod=succ;
this.Resobyprod=resol;
console.log(id);
console.log(this.Succbyprod +" "+succ);
return "this product contains " +resol+ " resolved scenarios  "+fail+ " failed scenarios and "+succ+" successful scenario";
  
}
getdetailsUS(){
  let id =this.UsId;
  let fail:number=0;
  let succ:number=0;
  let resol:number=0;
   this.service.getScbyUS(id)
  .subscribe( data => {
    this.scenariosbyUs= data;
  });
  for(var sc of this.scenariosbyUs){
    if(sc.result==="FAILURE")
    fail=fail+1;
    if(sc.result==="SUCCESS")
    succ=succ+1;
    if(sc.result==="RESOLVED")
    resol=resol+1;
    
  }
  this.Failbyprod=fail;
  this.Succbyprod=succ;
  this.Resobyprod=resol;
  console.log(id);
  console.log(this.Succbyprod +" "+succ);
  return "this product contains " +resol+ " resolved scenarios  "+fail+ " failed scenarios and "+succ+" successful scenario";
    
  }
  

}

