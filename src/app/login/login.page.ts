import { Cliente } from './../models/cliente';
import { PersonService } from './../services/person.service';
import { ReservasService } from './../services/reservas.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public myForm: FormGroup;
  public clientes: Cliente[];
  public cliente: Cliente;

  constructor(
    private fb: FormBuilder,
    private reservaService: ReservasService,
    private personService: PersonService,
    private router: Router,
    private tC: ToastController
  ) {}

  ngOnInit() {
    this.personService.getClientes().subscribe((res) => {
      this.clientes = res;
      console.log(this.clientes);
    });

    this.myForm = this.fb.group({
      phone: [],
    });
  }

  async login() {
    if (this.myForm.get('phone').value == '3111234567') {
      this.router.navigate(['/admin']);
    } else {
      if (this.reservaValida()) {
        this.router.navigate(['/home'], {
          queryParams: {
            tel: this.myForm.get('phone').value
          },
        });
      } else {
        let toast = await this.tC.create({
          message: 'Credenciales no válidas',
          duration: 2000,
        });
        toast.present();
      }
    }
    this.myForm.reset();
  }

  reservaValida(): Boolean {
    let existe = false;
    for (var i = 0; i < this.clientes.length; i++) {
      if (this.clientes[i].tel == this.myForm.get('phone').value) {
        this.cliente = this.clientes[i];
        existe = true;
        console.log(this.cliente)
      }
    }
    return existe;
  }
}
