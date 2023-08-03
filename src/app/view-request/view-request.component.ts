import { Component, OnInit } from '@angular/core';
import { Requests } from '../requests';
import { AadharService } from '../aadhar.service';

@Component({
  selector: 'app-view-request',
  templateUrl: './view-request.component.html',
  styleUrls: ['./view-request.component.css']
})
export class ViewRequestComponent implements OnInit {
  msg: string = "";
  requests: Array<Requests> = [];

  flag: boolean = false;
  adharid: string = "";
  emailid: string = "";
  name: string = "";
  dob: string = "";
  address: string = "";
  phone: string = "";
  gender: string = "";
  status: string="";

  constructor(public service:AadharService) { }

  ngOnInit(): void {
    this.viewAllRequestsNotApproved();
  }

  viewAllRequestsNotApproved() {
    this.service.findAllRequestsNotApproved().subscribe({
      next: (result: any) => {
        this.requests = result;
      },
      error: (error: any) => console.log(error),
      complete: () => console.log("completed")
    });
  }

  denyRequest(adharid: string) {
    this.service.denyRequest(adharid).subscribe({
      next: (result: any) => this.msg = result,
      error: (error: any) => console.log(error),
      complete: () => this.viewAllRequestsNotApproved()
    });
  }

  approvereq(request: any) {
    this.flag = true;
    this.adharid = request.adharid;
    this.emailid = request.emailid;
    this.name = request.name;
    this.dob = request.dob;
    this.address = request.address;
    this.phone = request.phone;
    this.gender = request.gender;
    this.status=request.status;
    if (this.status === "Close aadhar request") {
      this.denyRequest(this.adharid);
    } else {
      this.saveReqtoDB(); 
    }
  }

  saveReqtoDB() {
    let request = { adharid: this.adharid, emailid: this.emailid, name: this.name, dob: this.dob, address: this.address, phone: this.phone, gender: this.gender,status:"approved" };
    this.service.updateAdhar(request).subscribe({
      next: (result: any) => this.msg = "approved request",
      error: (error: any) => console.log(error),
      complete: () => {
        this.flag = false;
        this.viewAllRequestsNotApproved();
      }
    });
  }
}
