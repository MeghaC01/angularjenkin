import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Requests } from './requests';

@Injectable({
  providedIn: 'root'
})
export class AadharService {
  constructor(public http:HttpClient) { }

  signIn(login:any):Observable<string> {
    return this.http.post("http://localhost:8088/login"+"/signIn",login,{responseType:"text"});
  }

  signUp(login:any):Observable<string> {
    return this.http.post("http://localhost:8088/login"+"/signUp",login,{responseType:"text"});
  }

  storeRequest(requests:any):Observable<string> {
    return this.http.post("http://localhost:8088/request"+"/apply",requests,{responseType:"text"});
  }

  findAllRequest():Observable<Requests[]> {
    return this.http.get<Requests[]>("http://localhost:8088/request"+"/viewAllRequest");
  }
  denyRequest(adharid:string):Observable<string> {
    return this.http.delete("http://localhost:8088/request"+"/deny/"+adharid,{responseType:"text"});
  }

  approvereq(request:any):Observable<string> {
    return this.http.patch("http://localhost:8088/request"+"/approve",request,{responseType:"text"});
  }

  viewmyAdhar(emailid:String):Observable<string> {
    return this.http.get("http://localhost:8088/request"+"/viewmyadhar/"+emailid,{responseType:"text"});
  }

  updateAdhar(request:any):Observable<string> {
    return this.http.patch("http://localhost:8088/request"+"/updateadhar",request,{responseType:"text"});
  }

  findAllRequestsNotApproved(): Observable<Requests[]> {
    return this.http.get<Requests[]>("http://localhost:8088/request"+ "/viewAllRequestsNotApproved");
  }

  findAllRequestsApproved(): Observable<Requests[]> {
    return this.http.get<Requests[]>("http://localhost:8088/request"+ "/viewAllRequestsApproved");
  }
}
