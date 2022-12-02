import { Component } from '@angular/core';
import { ReservasService } from '../services/reservas.service';
import { Reservacion } from '../models/reservacion';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  private reserva: Reservacion;

  constructor(private serviceR: ReservasService) {}

  public addReserva(){
    this.serviceR.newReserva(this.reserva);
  }

}
