import { Component, OnInit } from '@angular/core';
import { Requests } from '../requests';
import { AadharService } from '../aadhar.service';

@Component({
  selector: 'app-issued-aadhar',
  templateUrl: './issued-aadhar.component.html',
  styleUrls: ['./issued-aadhar.component.css']
})
export class IssuedAadharComponent implements OnInit {
  requests:Array<Requests>=[]
  constructor(public service:AadharService) { }

  ngOnInit(): void {
    this.viewAllRequest();
  }
  viewAllRequest(){
    this.service.findAllRequestsApproved().subscribe({
      next:(result:any)=>this.requests=result,
      error:(error:any)=>console.log(error),
      complete:()=>console.log("completed")
      
    })
    
  }
}
