import { Reservacion } from '../models/reservacion';
import { Cliente } from '../models/cliente';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReservasService {
  private reserva?: Reservacion[];

  constructor(private firestore: AngularFirestore) {}

  public getReservas(): Observable<Reservacion[]> {
    return this.firestore
      .collection('reservacion')
      .snapshotChanges()
      .pipe(
        map((actions) => {
          return actions.map((a) => {
            const data = a.payload.doc.data() as Reservacion;
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        })
      );
  }

  public getProx2Reservas(): Observable<Reservacion[]> {
    return this.firestore
      .collection('reservacion', (ref) =>
        ref.where('date', '>=', new Date().toLocaleDateString()).orderBy('date', 'asc').limit(2)
      )
      .snapshotChanges()
      .pipe(
        map((actions) => {
          return actions.map((a) => {
            const data = a.payload.doc.data() as Reservacion;
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        })
      );
  }

  public getDiaOcupado(fechaAComprobar): Observable<Reservacion[]> {
    return this.firestore
      .collection('reservacion')
      .snapshotChanges()
      .pipe(
        map((actions) => {
          return actions
            .map((a) => {
              const data = a.payload.doc.data() as Reservacion;
              const id = a.payload.doc.id;
              return { id, ...data };
            })
            .filter((reserva) => reserva.date == fechaAComprobar);
        })
      );
  }

  public newReserva(reserva: Reservacion) {
    this.firestore.collection('reservacion').add(reserva);
  }
}
