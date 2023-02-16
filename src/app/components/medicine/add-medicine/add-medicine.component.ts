import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Medicine } from 'src/app/model/medicine';
import { MedicineService } from 'src/app/services/medicine.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-medicine',
  templateUrl: './add-medicine.component.html',
  styleUrls: ['./add-medicine.component.scss']
})
export class AddMedicineComponent implements OnInit {
  readonly loading$ = new BehaviorSubject<boolean>(false);

  constructor(private userService: UserService, 
              private medicineService: MedicineService,
              private router: Router) { }

  ngOnInit(): void {
  }

  tinyAlert(message: string) {
    Swal.fire(message);
  }
  successNotification(message: string) {
    Swal.fire('Hi', message, 'success');
  }

   weight: number = 0;
   name: string = ''
   code: any;
   file!: File

   onChange(event: any) {
    this.file = event.target.files[0];
}

  onSubmit() {
    const userId = this.userService.userLoggedIn() || ''
    const medicine = new Medicine('', this.name, userId, this.weight, this.code, '')
    this.loading$.next(true)
    this.medicineService.addMedicine(medicine, this.file).subscribe({
      next: (data) =>{
      if(data.status === 'success'){
        this.loading$.next(false)
        this.successNotification("Medicine has been added successfully")
        this.router.navigateByUrl('/medicines')
      }
      else {
        this.loading$.next(false)
        this.tinyAlert(data.message)
      }
      // window.location.reload();
      // this.router.navigateByUrl('/tasks')
  }, 
  error: (err) => {
    this.loading$.next(false)
    console.log(err)
    this.tinyAlert("Network Error!")
  }
  })
    
  }

}
