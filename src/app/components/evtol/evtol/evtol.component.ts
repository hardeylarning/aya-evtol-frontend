import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Evtol } from 'src/app/model/evtol';
import { Medicine } from 'src/app/model/medicine';
import { EvtolService } from 'src/app/services/evtol.service';
import Swal from 'sweetalert2';
import { PaystackOptions } from 'angular4-paystack';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-evtol',
  templateUrl: './evtol.component.html',
  styleUrls: ['./evtol.component.scss']
})
export class EvtolComponent implements OnInit {
  readonly loading$ = new BehaviorSubject<boolean>(false);
  evtol!: Evtol
  medicine!: any
  title = ''
  email = ''

  reference = '';

  

  constructor(private route: ActivatedRoute,
    private router: Router,
    private evtolService: EvtolService,
    private userService: UserService) { }

  ngOnInit(): void {
    this.reference = `ref-${Math.ceil(Math.random() * 10e13)}`;
    this.route.params.subscribe(res => {
      const id = res['id']
      const medId = sessionStorage.getItem('medId') || ''
      // console.log('MedId: ', medId);
      
      this.evtolService.getEvtol(id).subscribe({
        next: data => {
          if (data.status === 'success') {
            this.evtol = data.data
            this.medicine = JSON.parse(sessionStorage.getItem('med') || '')
            // console.log('Medicine: ', this.medicine);
            
          } 
          else {
            // console.log("Data: ",data.status);
            
            this.tinyAlert("Network Error")
          }
        },
        error: err => {
          console.log("Error: "+err);
          
          this.tinyAlert(err)
        }
      })
    })

    this.email = this.userService.getEmail()
  }

  loadEvtol(evtolId: string, medicineId: string) {
    this.loading$.next(true)
    this.evtolService.loadEvtol(evtolId, medicineId).subscribe({
      next: data => {
        if (data.status === 'success') {
          this.loading$.next(false)
          this.successNotification("Your medicine has been shipped successfully!")
          this.router.navigateByUrl('/medicines')
        } 
        else {
          this.loading$.next(false)
          // console.log("Data: ",data);
          
          this.warningNotification(data.message)
        }
      },
      error: err => {
        this.loading$.next(false)
        // console.log("Error: "+err);
        
        this.tinyAlert(err)
      }
    })
  }

  amountToPay(): number {
    if (this.evtol.weight <= 100) {
      return 100;
    }
    else if (this.evtol.weight <= 200) {
      return 200;
    }
    else if (this.evtol.weight <= 300) {
      return 300;
    }
    else if (this.evtol.weight <= 400) {
      return 200;
    }
    else {
      return 500;
    }

  }

  // options: PaystackOptions = {
  //   amount: this.amountToPay() * 100,
  //   email: 'hardexico11@gmail.com',
  //   ref: `${Math.ceil(Math.random() * 10e10)}`
  // }

  paymentInit() {
    console.log('Payment initialized');
  }

  paymentDone(ref: any) {
    this.title = 'Payment successfull';
    this.successNotification(this.title)
    this.loadEvtol(this.evtol._id, this.medicine._id)
    console.log(this.title, ref);
  }

  paymentCancel() {
    this.title = 'Payment failed';
    this.successNotification(this.title)
    console.log('payment failed');
  }

  tinyAlert(message: string) {
    Swal.fire(message);
  }
  successNotification(message: string) {
    Swal.fire('Hi', message, 'success');
  }

  warningNotification(message: string) {
    Swal.fire('Hi', message, 'info'); 
  }

}
