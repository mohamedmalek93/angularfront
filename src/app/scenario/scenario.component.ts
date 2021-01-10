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
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';
import { ChartType, ChartOptions, ChartDataSets } from 'chart.js';
import { RecursiveTemplateAstVisitor } from '@angular/compiler';

@Component({
  selector: 'app-scenario',
  templateUrl: './scenario.component.html',
  styleUrls: ['./scenario.component.css']
})

export class ScenarioComponent implements OnInit {
  @Input() date:Date;
  datePipe: DatePipe;
  products :Product[]=[];
  scenarios :Scenario[]=[];
  distinctscenarios :Scenario[];
  stories :US[];
  scenariosBydate :Scenario[];
  scenariostemp :Scenario[]=[];
  steps:Step[]=[];
  action:String;
  actions= ['show all', 'show Today failures'];
  actionselected:String;
  aqualif= [ 'true positive', 'false positive','application on update'];
  qualifselected:String;
  averagetime:number=0;
  states= [ 'SUCCESS', 'PENDING','FAILURE','RESOLVED'];
  stateselected:String;
 filter:String="none";
 filterstory:String="none";
 filtersc:String="none";
 filterprod:String="";
 filterdistinct:String="none";
 qualiffilter:String ;
 selectedproduct:String;
 selectedstory:String;
 selectedsc:String;

 prodId:number;
 UsId:number;

 compress:Boolean ;
 scenariosbyprod :Scenario[];
 scenariosbyUs :Scenario[];
 public databar=[];

 Failbyprod:number=0;
 Succbyprod:number=0;
 Resobyprod:number=0;
 public pieChartOptions: ChartOptions = {
  responsive: true,
};
public pieChartLabels: Label[] = [['success'], ['FAILURE'], ['RESOLVED']];
public pieChartData: SingleDataSet=[0,0,0] ;
public pieChartType: ChartType = 'pie';
public pieChartLegend = true;
public pieChartPlugins = [];
public pieChartLabelsStory: Label[] = ['NOT COMPLETED',' COMPLETED'];
public pieChartDataStory: SingleDataSet=[0,0] ;
public barChartLabels: Label[] = [];
public barChartType: ChartType = 'bar';
public barChartPlugins = [];

public barChartData: ChartDataSets[] =[];
public barChartOptions: ChartOptions = {
  responsive: true,
};
public barChartOptionsInt: ChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    yAxes: [{
       ticks: {
          stepSize: 1,
          beginAtZero: true
       }
    }]
 },
};
public barChartLabelsProc: Label[] = [];
public barChartDataProd: ChartDataSets[] =[];
public prodvalue:any[]=[];

  constructor(private service:ServicesService) { 
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();

  }
 // tslint:disable-next-line: no-trailing-whitespace
 
  ngOnInit() {
    this.actionselected='show all';
    // tslint:disable-next-line: no-trailing-whitespace
    //  this.products = this.test() ; 
    this.service.getprods().subscribe( data => {
      this.products= data;
    });
      
    
        this.service.getprods()
        .subscribe( data => {
          this.prodvalue= data;
        });
        setTimeout (() => {
          console.log(this.products.length);
         for(let i=0;i<this.products.length;i++){
           this.barChartLabelsProc.push(this.products[i].nom)
         }
         
       }, 130000);

      let temp=[];
      this.service.ProdIncid()
      .subscribe( data => {
        temp= data;
      });
setTimeout (() => {
       
        
        
        console .log(temp.length);
         this.barChartDataProd= [
           { data: temp, label: 'number of incidents' }
           
         ]  ;

      }, 100000);
   
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
  let current=new Date();
 if(val==="previous not resolved errors"){
  console.log("pendiiiiiiiiings");
 
  let temp:Scenario[]=[];
  for(var sc of this.scenarios){
  
    if(sc.result==="FAILURE"&&sc.date_sc.getFullYear<current.getFullYear)
  
    
  
    temp.push(sc);
    
  
  }
  this.scenarios=temp;
temp=[];

}
if(val==="Todays error"){
  let temp:Scenario[]=[];
  for(var sc of this.scenarios){
  
    if(sc.result==="FAILURE"&&sc.date_sc.getFullYear===current.getFullYear)
  
    
  
    temp.push(sc);
    
  
  }
  this.scenarios=temp;
temp=[];

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
this.date=null;
   if(val==="true positive"){
    this.scenarios=this.scenariostemp;
  
    let temp:Scenario[]=[];


for(var sc of this.scenarios){
  console.log(sc.steps)
  for(var s of sc.steps){
    if(s.incident !=null){
  if(s.incident.Qualif==="true positive")

  

  temp.push(sc);
  

}}}
this.scenarios=temp;
temp=[];
}
  
  
  if(val==="false positive"){
    this.scenarios=this.scenariostemp;
  
    let temp:Scenario[]=[];


for(var sc of this.scenarios){
  
  for(var s of sc.steps){
    if(s.incident!=null){
  if(s.incident.Qualif==="false positive")

  

  temp.push(sc);
  

}}}
this.scenarios=temp;
temp=[];
}

  
  
  if(val==="application on update"){
    this.scenarios=this.scenariostemp;
  
    let temp:Scenario[]=[];;


for(var sc of this.scenarios){
  
  for(var s of sc.steps){
  if(s.incident!=null){
  if(s.incident.Qualif==="application on update")

  

  temp.push(sc);
  

}}}
this.scenarios=temp;
temp=[];
  
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
Resolved(i:number){
  console.log("pendiiiiiiiiings");
 

    //console.log(this.scenarios[i].steps[j].incident);
    
    let sc :Scenario ; 
     sc=this.scenarios[i];
    sc.result="RESOLVED";
console.log(this.qualifselected);
   // console.log("this is a new  "+JSON.stringify(inc));
   if (confirm("you sure want to set this scenario as resolved ?"))

    this.service.updateResol(this.scenarios[i].id,"RESOLVED")
   .subscribe(data => console.log(data), error => console.log(error));
  }  
onQualSelected(val:any,i:number,j:number){
 
  
    this.qualifselec(val, i,j);
    }
 

chooseproduct(i:number){
  
//console.log(this.filtervisib)
 
  this.selectedproduct=this.products[i].nom;
  this.prodId=this.products[i].id;
  this.compress=this.products[i].compressed;
  this.service.prodstat(this.prodId).subscribe( data => {
    this.pieChartData= data;
   // this.products=[];
  });
  
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
  this.stateselected="";
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
  console.log(this.scenarios.length);
  

}

}

this.scenarios=this.scenariosBydate;

  
  
  console.log(this.scenarios.length);
  console.log(this.scenariosBydate.length);
}
onStateSelected(val:any){
  this.onstateselected(val);
  }
  onstateselected(val:any){
    this.actionselected="";
this.qualifselected="";
this.date=null;
    this.scenarios=this.scenariostemp;
    let temp:Scenario[]=[];



    if(val==="SUCCESS"){
     
for(var sc of this.scenarios){
  
  if(sc.result==="SUCCESS")

  

  temp.push(sc);
  

}

this.scenarios=temp;
temp=[];
    }
    if(val==="RESOLVED"){
      
      for(var sc of this.scenarios){
        
        if(sc.result==="RESOLVED")
      
        
      
        temp.push(sc);
        
      
      }
      this.scenarios=temp;
      temp=[];

      
          }
          if(val==="FAILURE"){
      
            for(var sc of this.scenarios){
              
              if(sc.result==="FAILURE")
            
              
            
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
        this.service.Srorystat(id).subscribe(data => {
          this.pieChartDataStory= data;
        });
        ;
        
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
        console.log(this.scenarios.length);
        this.service.Scendates(id).subscribe( data => {
          this.barChartLabels= data;
        });
        for(var sc of this.distinctscenarios){
      if(sc.id===id)
          this.selectedsc=sc.description;
         
        }
        
        
  
        
       
        
   
  }
  averageexutiontime():number{
    let time:number=0;
    let temp=[];
    for(var sc of this.scenarios){
      
      time=time+sc.duration;
      temp.push(sc.duration);
     
    }
    time=time/this.scenarios.length;
    this.barChartData= [
      { data: temp, label: 'Execution time' }
      
    ];
    console.log(temp.length);
    this.averagetime=time;
    return time/(this.scenarios.length);
  }
  datachart(){
    let time:number=0;
    let temp=[];
    for(var sc of this.scenarios){
      
      time=sc.duration;
      temp.push(time);

    }
    console.log(this.scenarios.length);
    return temp;
  }

  
  backtoproducts(){
    this.filterprod='';
    this.filter='none';
    this.filterdistinct='none';
    this.stories=[];
    
  }
  backtoScenarios(){
    
    this.filter='none';
    this.filtersc='';
    this.filterdistinct='none';
    this.scenarios=[];
    this.actionselected="show all";
    this.qualifselected="";
    this.stateselected="";
    this.date=null;

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

  todayDate(){
    var ladate=new Date();
    return ('Daily analysis  '+ladate.getDate()+"/"+(ladate.getMonth()+1)+"/"+ladate.getFullYear());
  }

}

