import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AadharService } from '../aadhar.service';

@Component({
  selector: 'app-userdashboard',
  templateUrl: './userdashboard.component.html',
  styleUrls: ['./userdashboard.component.css']
})
export class UserdashboardComponent implements OnInit {
  user: string = "";
  msg: string = "";
  close: string = "";

  myadhar: any;
  constructor(private router: Router, public service:AadharService) { }

  ngOnInit(): void {
    let obj = sessionStorage.getItem("userDetails");
    if (obj != null) {
      this.user = obj;
    }
    this.viewmyadhar(this.user);
  }

  logout() {
    sessionStorage.removeItem("userDetails");
    this.router.navigate(["login"]);
  }

  viewmyadhar(emailid: string) {
    this.service.viewmyAdhar(this.user).subscribe({
      next: (result: any) => {
        this.myadhar = JSON.parse(result);
      },
      error: (error: any) => console.log(error),
      complete: () => console.log("data fetched")
    });
  }

  applydup() {
    this.myadhar.status = "Duplicate aadhar request";
    this.saveAdharRequest(this.myadhar);
    this.msg = "Request to duplicate aadhar card submitted";
  }

  closeadhar() {
    this.myadhar.status = "Close aadhar request";
    this.saveAdharRequest(this.myadhar);
    this.msg = "Request to close aadhar card submitted";
  }

  saveAdharRequest(adharData: any) {
    this.service.updateAdhar(adharData).subscribe({
      next: (result: any) => console.log("action done"),
      error: (error: any) => console.log(error),
      complete: () => { }
    });
  }
}
