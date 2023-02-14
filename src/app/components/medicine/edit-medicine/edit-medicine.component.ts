import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Medicine } from 'src/app/model/medicine';
import { MedicineService } from 'src/app/services/medicine.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-medicine',
  templateUrl: './edit-medicine.component.html',
  styleUrls: ['./edit-medicine.component.scss']
})
export class EditMedicineComponent implements OnInit {

  readonly loading$ = new BehaviorSubject<boolean>(false);
  id: any;
  medicine!: Medicine
  form!: FormGroup;
  name: string = ''
  weight: number = 0
  code: string = ''


  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private medicineService: MedicineService,
    private router: Router
  ) {
    this.form = fb.group({
      name: [this.name],
      code: [this.code],
      weight: [this.weight]
    })
   }

  ngOnInit(): void {
    this.route.params.subscribe((res) => {
      this.id = res['id'];
  
      this.medicineService.getMedicine(this.id).subscribe((data) => {
        this.medicine = data.data;
        // console.log('Data', this.task);

        this.name = this.medicine.name
        this.code = this.medicine.code
        this.weight = this.medicine.weight
        
        this.form = this.fb.group({
          name: new FormControl(this.name),
          code: new FormControl(this.code),
          weight: new FormControl(this.weight)
        });
      });
    });
  }

  tinyAlert(message: string) {
    Swal.fire(message);
  }
  successNotification(message: string) {
    Swal.fire('Hi', message, 'success');
  }

  onSubmit() {
    this.loading$.next(true)
    this.medicineService
      .updateMedicine(this.id, this.form.value.name, this.form.value.code, this.form.value.weight)
      .subscribe((res) => {
        // console.log("Res: ", res);
        
        if(res.status === 'success') {
          this.loading$.next(false)
          this.successNotification("Medicine has been updated successfully!")
          this.router.navigateByUrl('/medicines');
        }
        else {
          this.loading$.next(false)
          this.tinyAlert(res.message)
          // console.log();
          
        }
        
      });
  }

}
