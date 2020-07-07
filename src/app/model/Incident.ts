export class Incident{
    id:number;
    mainerror:String;
    description:String;
     commentaire:String;
Qualif:String;
pend:boolean=false;
getpend(){
    if(this.pend===false)
    return "PENDING ON";
    else return "PENDING OFF";
}
getcol(){
    if(this.pend===false)
    return "green";
    else return "red";
}
}