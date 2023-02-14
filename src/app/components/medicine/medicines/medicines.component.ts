import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Medicine } from 'src/app/model/medicine';
import { MedicineService } from 'src/app/services/medicine.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicines',
  templateUrl: './medicines.component.html',
  styleUrls: ['./medicines.component.scss']
})
export class MedicinesComponent implements OnInit {
  medicines: Medicine[] = [];

  constructor(
    private medicineService: MedicineService,
    private router: Router
  ) {}

  tinyAlert(message: string) {
    Swal.fire(message);
  }
  successNotification(message: string) {
    Swal.fire('Hi', message, 'success');
  }

 

  ngOnInit(): void {
    this.medicineService.getMedicines().subscribe({
      next: (res) => {
        this.medicines = res.data;
      },
      error: (err) => {
        this.tinyAlert('Network Error!')
        console.log(err);
      },
    });
  }


  onDelete(id: string) {
    Swal.fire({
      title: 'Do you want to delete this medicine?',
      // showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Delete',
      // denyButtonText: `Don't save`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.delete(id)
      } 
      else {
        Swal.fire('Delete Action','Deletion action has been canceled', 'info')
      }
    })
   
  }

  delete(id: string) {
    this.medicineService.deleteMedicine(id).subscribe({
      next: data => {
        if(data.status === 'success') {
          this.successNotification("Medicine has been deleted successfully.")
          this.ngOnInit();
        }

        else {
          this.tinyAlert(data.message)
        }
        
        // this.router.navigateByUrl('/tasks');
      }
    })
  }

}
