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

  isLoading: Boolean = false
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

  onSubmit() {
    const userId = this.userService.userLoggedIn() || ''

    const medicine: Medicine = new Medicine(null, this.name, userId, this.weight, this.code, null)

    this.medicineService.addMedicine(medicine).subscribe({
      next: (data) =>{
      this.loading$.next(true)
      if(data.status === 'success'){
        this.loading$.next(false)
        this.successNotification("Medicine has been added successfully")
        this.router.navigateByUrl('/medicines')
      }
      else {
        this.isLoading = false
        this.tinyAlert(data.message)
      }
      // window.location.reload();
      // this.router.navigateByUrl('/tasks')
  }, 
  error: (err) => {
    this.isLoading = false
    console.log(err)
    this.tinyAlert("Network Error!")
  }
  })
    
  }

}
