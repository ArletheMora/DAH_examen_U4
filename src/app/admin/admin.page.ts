import { Component, OnInit } from '@angular/core';
import { Reservacion } from '../models/reservacion';
import { ReservasService } from '../services/reservas.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
  prox2: boolean;
  todasReservaciones: Reservacion[];
  sig2Reservaciones: Reservacion[];
  reservaciones: Reservacion[];

  constructor(
    private reservasService: ReservasService,
  ) {}

  ngOnInit() {
    this.reservasService.getReservas().subscribe((res) => {
      this.todasReservaciones = res;
      this.reservaciones = this.todasReservaciones
    });

    this.reservasService.getProx2Reservas().subscribe((res) => {
      this.sig2Reservaciones = res;
    });
  }

  toggleChanged(event) {
    this.prox2 = event.detail.checked
    console.log(this.prox2)

    if(this.prox2){
      this.reservaciones = this.sig2Reservaciones
      console.log('sig 2 '+this.reservaciones);
    }else{
      this.reservaciones = this.todasReservaciones
      console.log('sig '+this.reservaciones);
    }
  }
}
