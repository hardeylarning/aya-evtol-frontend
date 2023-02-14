import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Medicine } from '../model/medicine';

@Injectable({
  providedIn: 'root'
})
export class MedicineService {
  private BASE_URL = 'http://localhost:5000/api/v1/medicines'
  private BASE_URL_ = 'https://tms-api-20kv.onrender.com/api/v1/tasks'

  constructor(private http: HttpClient) { }

  addMedicine(medicine: Medicine) {
    return this.http.post<any>(this.BASE_URL, medicine)
  }

  getMedicine(id: string) {
    return this.http.get<any>(this.BASE_URL+'/'+id)
  }

  getMedicines() {
    return this.http.get<any>(this.BASE_URL)
  }

  updateMedicine(id:string, medicine: Medicine) {
    return this.http.put<any>(this.BASE_URL+'/'+id, medicine)
  }

  updateMedicineImage(id:string, imageUrl: string) {
    return this.http.put<any>(this.BASE_URL+'/image/'+id, {imageUrl})
  }

  deleteMedicine(id:string) {
    return this.http.delete<any>(this.BASE_URL+'/'+id)
  }
}
