import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Evtol } from '../model/evtol';

@Injectable({
  providedIn: 'root'
})
export class EvtolService {
  private BASE_URL = 'http://localhost:5000/api/v1/evtols'
  private BASE_URL_ = 'https://tms-api-20kv.onrender.com/api/v1/evtol'

  constructor(private http: HttpClient) { }

  addEvtol(evtol: Evtol) {
    return this.http.post<any>(this.BASE_URL, evtol)
  }

  availableEvtol() {
    return this.http.get<any>(this.BASE_URL + "/available")
  }

  checkEvtolBattery(id: string) {
    return this.http.get<any>(`${this.BASE_URL}/check-battery/${id}`)
  }
  getEvtol(id: string) {
    return this.http.get<any>(`${this.BASE_URL}/${id}`)
  }

  getEvtols() {
    return this.http.get<any>(`${this.BASE_URL}`)
  }

  loadedEvtol(id:string) {
    return this.http.get<any>(`${this.BASE_URL}/loaded/${id}`)
  }
  
  loadEvtol(evtolId:string, medicineId:string) {
    return this.http.put<any>(`${this.BASE_URL}/loading/${evtolId}`, {medicineId})
  }
}
