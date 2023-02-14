import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Evtol } from 'src/app/model/evtol';
import { EvtolService } from 'src/app/services/evtol.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-evtols',
  templateUrl: './evtols.component.html',
  styleUrls: ['./evtols.component.scss']
})
export class EvtolsComponent implements OnInit {
  evtols: Evtol[] = []

  constructor(
    private evtolService: EvtolService,
    private router: Router
  ) {}

  tinyAlert(message: string) {
    Swal.fire(message);
  }
  successNotification(message: string) {
    Swal.fire('Hi', message, 'success');
  }

 

  ngOnInit(): void {
    this.evtolService.availableEvtol().subscribe({
      next: (res) => {
        this.evtols = res.data;
      },
      error: (err) => {
        this.tinyAlert('Network Error!')
        console.log(err);
      },
    });
  }

}
