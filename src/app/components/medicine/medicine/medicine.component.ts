import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Medicine } from 'src/app/model/medicine';
import { MedicineService } from 'src/app/services/medicine.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicine',
  templateUrl: './medicine.component.html',
  styleUrls: ['./medicine.component.scss']
})
export class MedicineComponent implements OnInit {
  // id: any
  medicine!: Medicine

  constructor(private route: ActivatedRoute, private medicineService: MedicineService) { }

  ngOnInit(): void {
    this.route.params.subscribe(res => {
      const id = res['id']
      this.medicineService.getMedicine(id).subscribe({
        next: data => {
          if (data.status === 'success') {
            this.medicine = data.data
          }
          else {
            this.tinyAlert(data.message)
          }
        },
        error: err => this.tinyAlert(err)
      })
    })
  }

  tinyAlert(message: string) {
    Swal.fire(message);
  }
  successNotification(message: string) {
    Swal.fire('Hi', message, 'success');
  }

}
