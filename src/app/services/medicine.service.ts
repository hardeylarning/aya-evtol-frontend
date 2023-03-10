import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Medicine } from '../model/medicine';

@Injectable({
  providedIn: 'root'
})
export class MedicineService {
  private BASE_URL = environment.MEDICINE_BASE_URL
  private BASE_URL_ = 'https://evtol-api-gzz7.onrender.com/api/v1/medicines'

  constructor(private http: HttpClient) { }

  addMedicine(medicine: Medicine, imageUrl: any) {
    const formData = new FormData();

    formData.append('name', medicine.name);
    formData.append('code', medicine.code);
    formData.append('weight', medicine.weight.toString());
    formData.append('userId', medicine.userId);
    formData.append('imageUrl', imageUrl);

    return this.http.post<any>(this.BASE_URL, formData)
  }

  getMedicine(id: string) {
    return this.http.get<any>(this.BASE_URL+'/'+id)
  }

  getMedicines() {
    return this.http.get<any>(this.BASE_URL)
  }

  updateMedicine(id:string, name: string, code: string, weight:number) {
    return this.http.put<any>(this.BASE_URL+'/'+id, {name, code, weight})
  }

  updateMedicineImage(id:string, imageUrl: string) {
    return this.http.put<any>(this.BASE_URL+'/image/'+id, {imageUrl})
  }

  deleteMedicine(id:string) {
    return this.http.delete<any>(this.BASE_URL+'/'+id)
  }
}
