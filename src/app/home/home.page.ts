import { PersonService } from './../services/person.service';
import { ReservasService } from './../services/reservas.service';
import { Cliente } from './../models/cliente';
import { Component, NgModule } from '@angular/core';
import { Reservacion } from '../models/reservacion';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  private reserva: Reservacion;
  private cliente: Cliente;
  private reservaciones: Reservacion[];

  public myForm: FormGroup;
  public fecha = new Date();
  public hoy;
  public total = 1000;
  public event?: Event;

  //para range
  public profundidadAct = 0;
  public profundidadAnt = 0;
  //para los toggle
  brincolin: boolean = false;
  mesa: boolean = false;
  futbolito: boolean = false;

  constructor(
    private reservasService: ReservasService,
    private personService: PersonService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private tC: ToastController
  ) {
    this.reserva = {
      date: this.fecha.toString(),
      price: 0,
      client: '',
      tel: '',
      id: '',
    };
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params) => {
      let tel = params['tel'];
      this.personService.getClienteByTel(tel).subscribe((res) => {
        this.cliente = res[0];
      });
    });

    this.reservasService.getReservas().subscribe((res) => {
      this.reservaciones = res;
    });

    this.hoy = new Date(); //a partir de mañana
    console.log(this.hoy);

    this.myForm = this.fb.group({
      fecha: [],
    });
  }

  public async addReserva() {
    this.fecha = new Date(this.myForm.get('fecha').value);
    console.log(this.fecha);
    //console.log(this.cliente);

    if (this.fecha > this.hoy) {
      //COMPROBAR FECHA LIBRE
      if (this.fechaOcupada()) {
        let toast = await this.tC.create({
          message: 'Este día ya está reservado, intenta otro día',
          duration: 2000,
        });
        toast.present();
      } else {
        //NUEVA RESERVA
        this.reserva = {
          date: this.fecha.toLocaleDateString(),
          price: this.total,
          client: this.cliente.name,
          tel: this.cliente.tel,
        };

        this.reservasService.newReserva(this.reserva);

        let toast = await this.tC.create({
          message: 'Reserva creada con éxito',
          duration: 2000,
        });
        toast.present();
      }
    } else {
      //hoy no se puede reservar
      let toast = await this.tC.create({
        message: 'Selecciona una fecha que sea a partir de mañana',
        duration: 2000,
      });
      toast.present();
    }
  }

  //EXTRAS
  toggleChanged(event, modo, boton) {
    if (boton == 'brincolin') {
      this.brincolin = !modo;
      if (!modo) {
        this.total += 200;
      } else this.total -= 200;
    }
    if (boton == 'mesa') {
      this.mesa = !modo;
      if (!modo) {
        this.total += 150;
      } else this.total -= 150;
    }
    if (boton == 'futbolito') {
      this.futbolito = !modo;
      if (!modo) {
        this.total += 100;
      } else this.total -= 100;
    }

    console.log(event.target.value, this.brincolin, this.mesa, this.futbolito);
    //if(boton.)
  }

  //ALBERCA
  rangeChange(event) {
    this.profundidadAct = event.target.value;
    //console.log("valor:" + this.profundidadAct + " ant: " + this.profundidadAnt + " act: " + this.profundidadAct)
    //console.log(this.total + "-" + this.profundidadAnt*5 + "+" + this.profundidadAct * 5)
    this.total = this.total - this.profundidadAnt * 5 + this.profundidadAct * 5;
    this.profundidadAnt = this.profundidadAct;
  }

  public fechaOcupada(): Boolean {
    let ocupado = false;
    let fechaPropuesta = this.fecha.toLocaleDateString();

    for (let index = 0; index < this.reservaciones.length; index++) {
      let fechaOcupada = this.reservaciones[index].date;
      console.log('propuesta ' + fechaPropuesta);
      console.log('ocupada   ' + fechaOcupada);
      if (fechaPropuesta == fechaOcupada) {
        ocupado = true;
        console.log(ocupado);
        return (ocupado = true);
      }
    }
    console.log(ocupado);
    return ocupado;
  }
}
