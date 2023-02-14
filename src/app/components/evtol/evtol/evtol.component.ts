import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Evtol } from 'src/app/model/evtol';
import { Medicine } from 'src/app/model/medicine';
import { EvtolService } from 'src/app/services/evtol.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-evtol',
  templateUrl: './evtol.component.html',
  styleUrls: ['./evtol.component.scss']
})
export class EvtolComponent implements OnInit {
  readonly loading$ = new BehaviorSubject<boolean>(false);
  evtol!: Evtol

  medicine!: any

  constructor(private route: ActivatedRoute,
    private router: Router,
    private evtolService: EvtolService) { }

  ngOnInit(): void {
    this.route.params.subscribe(res => {
      const id = res['id']
      const medId = sessionStorage.getItem('medId') || ''
      // console.log('MedId: ', medId);
      
      this.evtolService.getEvtol(id).subscribe({
        next: data => {
          if (data.status === 'success') {
            this.evtol = data.data
            this.medicine = JSON.parse(sessionStorage.getItem('med') || '')
            console.log('Medicine: ', this.medicine);
            
          } 
          else {
            console.log("Data: ",data.status);
            
            this.tinyAlert("Network Error")
          }
        },
        error: err => {
          console.log("Error: "+err);
          
          this.tinyAlert(err)
        }
      })
    })
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
          console.log("Data: ",data.message);
          
          this.tinyAlert("Network Error")
        }
      },
      error: err => {
        this.loading$.next(false)
        console.log("Error: "+err);
        
        this.tinyAlert(err)
      }
    })
  }

  tinyAlert(message: string) {
    Swal.fire(message);
  }
  successNotification(message: string) {
    Swal.fire('Hi', message, 'success');
  }

}
