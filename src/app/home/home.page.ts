import { Component } from '@angular/core';
import { ReservasService } from '../services/reservas.service';
import { Reservacion } from '../models/reservacion';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  private reserva: Reservacion;
  public myForm: FormGroup;
  public fecha = new Date();
  public event?: Event;

  constructor(private serviceR: ReservasService, 
    private fb: FormBuilder) {
    this.reserva = {
      date: this.fecha,
      price: 0,
      client: "",
      tel: "",
      id: ""
    }

    this.myForm = this.fb.group({
      fecha:[]
    })

   }

  ngOnInit() {
    
  }

  public addReserva() {
    this.serviceR.newReserva(this.reserva);
  }

  /* onChange(event){
    console.log(event.target.value);
  } */
}
