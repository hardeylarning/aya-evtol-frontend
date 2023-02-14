import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  evtol!: Evtol

  medicine!: any

  constructor(private route: ActivatedRoute, 
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

  tinyAlert(message: string) {
    Swal.fire(message);
  }
  successNotification(message: string) {
    Swal.fire('Hi', message, 'success');
  }

}
