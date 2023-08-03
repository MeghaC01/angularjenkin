import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl} from '@angular/forms'
import { AadharService } from '../aadhar.service';

@Component({
  selector: 'app-new-request',
  templateUrl: './new-request.component.html',
  styleUrls: ['./new-request.component.css']
})
export class NewRequestComponent implements OnInit {

reqRef = new FormGroup({
  emailid:new FormControl(),
  name:new FormControl(),
  dob:new FormControl(),
  address:new FormControl(),
  phone:new FormControl(),
  gender:new FormControl(),
  status: new FormControl("New aadhar request")
})
storeMsg :string =""
  constructor(public service:AadharService) { }

  ngOnInit(): void {
  }
  storeRequest() {
    let request = this.reqRef.value;
    console.log(request);   
    this.service.storeRequest(request).subscribe({
      next:(result:any)=>this.storeMsg=result,
      error:(error:any)=>console.log(error),
      complete:()=>console.log("completed")
    })

    this.reqRef.reset();
  }
}
