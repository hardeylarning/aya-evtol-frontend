import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Evtol } from 'src/app/model/evtol';
import { EvtolService } from 'src/app/services/evtol.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register-evtol',
  templateUrl: './register-evtol.component.html',
  styleUrls: ['./register-evtol.component.scss']
})
export class RegisterEvtolComponent implements OnInit {
  readonly loading$ = new BehaviorSubject<boolean>(false);

  constructor(private userService: UserService, 
              private evtolService: EvtolService,
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
   serialNumber: number = 0
   state: any;
   batteryCapacity: number = 0;
   model: string = ''

  onSubmit() {
    const userId = this.userService.userLoggedIn() || ''
    const evtol = new Evtol('', this.serialNumber, this.model, this.weight, this.batteryCapacity, this.state, [])
    this.loading$.next(true)
    this.evtolService.addEvtol(evtol).subscribe({
      next: (data) =>{
      if(data.status === 'success'){
        this.loading$.next(false)
        this.successNotification("Evtol has been registered successfully")
        this.router.navigateByUrl('/evtols')
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

  handleStateChange(data: any) {
    this.state = data.target.value
  }
  handleModelChange(data: any) {
    this.model = data.target.value
  }

}
