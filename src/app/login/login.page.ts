import { ReservasService } from './../services/reservas.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public myForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private reservaService: ReservasService
  ) { }

  ngOnInit() {
    this.myForm = this.fb.group({
      fecha: []
    })
  }

  public login() {

  }
} 



