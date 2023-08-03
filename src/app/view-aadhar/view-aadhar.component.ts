import { Component, OnInit } from '@angular/core';
import { Requests } from '../requests';
import { AadharService } from '../aadhar.service';

@Component({
  selector: 'app-view-aadhar',
  templateUrl: './view-aadhar.component.html',
  styleUrls: ['./view-aadhar.component.css']
})
export class ViewAadharComponent implements OnInit {
  msg:string=""
  requests:Array<Requests>=[]
  myadhar:any
  flag:boolean = false;
  adharid:string=""
  emailid:string=""
  name:string=""
  dob:string=""
  address:string=""
  phone:string=""
  gender:string=""
  constructor(public service:AadharService) { }
  ngOnInit(): void {
    let obj = sessionStorage.getItem("userDetails");
    if(obj!=null){
      this.emailid=obj;
    }
    this.viewmyadhar(this.emailid);
  }

  approvereq(request:any){
    this.flag= true;
    this.adharid=request.adharid;
    this.emailid=request.emailid;
    this.name=request.name;
    this.dob=request.dob;
    this.address=request.address;
    this.phone=request.phone;
    this.gender=request.gender;
  }

  viewmyadhar(emailid: string) {
    this.service.viewmyAdhar(this.emailid).subscribe({
      next: (result: any) => {
        const adharData = JSON.parse(result);
        if (adharData.status === "approved") {
          this.myadhar = adharData;
        }
      },
      error: (error: any) => console.log(error),
      complete: () => console.log("completed")
    });
  }

  saveReqtoDB(){
    let request = {adharid:this.adharid,emailid:this.emailid,name:this.name,dob:this.dob,address:this.address,phone:this.phone,gender:this.gender,status:"Update aadhar request"};
    this.service.updateAdhar(request).subscribe({
      next:(result:any)=>this.msg=result,
      error:(error:any)=>console.log(error),
      complete:()=>{"completed"}
    })
    this.flag=false;
  }

}
