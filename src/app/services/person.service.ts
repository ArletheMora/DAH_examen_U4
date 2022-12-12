import { Cliente } from './../models/cliente';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PersonService {
  private clientes: Cliente[];

  constructor(private firestore: AngularFirestore) {}

  public getClientes(): Observable<Cliente[]> {
    return this.firestore
      .collection('cliente')
      .snapshotChanges()
      .pipe(
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data() as Cliente;
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        })
      );
  }

  public getClienteByTel(tel: string): Observable<Cliente[]> {
    return this.firestore
      .collection('cliente')
      .snapshotChanges()
      .pipe(
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data() as Cliente;
            const id = a.payload.doc.id;
            return { id, ...data };
          }).filter(cliente => cliente.tel == tel)
        })
      );
  }

}
