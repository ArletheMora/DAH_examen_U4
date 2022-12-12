import { Cliente } from './../models/cliente';
import { Component, NgModule } from '@angular/core';
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
  private cliente: Cliente;

  public myForm: FormGroup;
  public fecha = new Date();
  public fechaInicio = new Date(2022 - 12 - 3) //a partir de mañana
  public total = 1000
  public event?: Event;

  //para range
  public profundidadAct = 0;
  public profundidadAnt = 0;
  //para los toggle
  brincolin: boolean = false;
  mesa: boolean = false;
  futbolito: boolean = false;


  constructor(private serviceR: ReservasService,
    private fb: FormBuilder) {
    this.reserva = {
      date: this.fecha,
      price: 0,
      client: "",
      tel: "",
      id: ""
    }

  }

  ngOnInit() {
    this.myForm = this.fb.group({
      fecha: []
    })
  }

  public addReserva() {
    this.fecha = this.myForm.get('fechaInicio').value
    this.reserva = {
      date: this.fecha,
      price: this.total,
      client: this.cliente.name,
      tel: this.cliente.tel
    }

    this.serviceR.newReserva(this.reserva);
  }

  //EXTRAS
  toggleChanged(event, modo, boton) {
    if (boton == 'brincolin') {
      this.brincolin = !modo;
      if (!modo) {
        this.total += 200
      } else this.total -= 200
    }
    if (boton == 'mesa') {
      this.mesa = !modo;
      if (!modo) {
        this.total += 150
      } else this.total -= 150
    }
    if (boton == 'futbolito') {
      this.futbolito = !modo;
      if (!modo) {
        this.total += 100
      } else this.total -= 100
    }

    console.log(event.target.value, this.brincolin, this.mesa, this.futbolito);
    //if(boton.)
  }

  //ALBERCA
  rangeChange(event) {
    this.profundidadAct = event.target.value
    //console.log("valor:" + this.profundidadAct + " ant: " + this.profundidadAnt + " act: " + this.profundidadAct)
    //console.log(this.total + "-" + this.profundidadAnt*5 + "+" + this.profundidadAct * 5)
    this.total = this.total-this.profundidadAnt*5 + (this.profundidadAct * 5) 
    this.profundidadAnt = this.profundidadAct
  }
}
