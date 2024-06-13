import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminapiService {
server_url="http://localhost:3000"
  constructor(private http:HttpClient) { 
  }
  authorization(){
    return this.http.get(`${this.server_url}/student/1`)
  }
addStudentApi(studentData:any){
   return this.http.post(`${this.server_url}/student`,studentData)
}
getAllStudentsApi(){
   return this.http.get(`${this.server_url}/student`)
}
deleteStudentApi(studentId:any){
  return this.http.delete(`${this.server_url}/student/${studentId}`)
}
getStudentDetailsById(id:any){
  return this.http.get(`${this.server_url}/student/${id}`)

}
UpdateStudentApi(id:any,data:any){
  return this.http.put(`${this.server_url}/student/${id}`,data)
}
}

