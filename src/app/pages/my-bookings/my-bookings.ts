import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BookingDto } from '../../models/booking-dto';
import { BookingService } from '../../services/booking-service';
import Swal from 'sweetalert2';
import { TokenService } from '../../services/token-service';

@Component({
  selector: 'app-my-bookings',
  imports: [RouterLink, RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './my-bookings.html',
  styleUrl: './my-bookings.css'
})
export class MyBookings {

  bookings: BookingDto[] = [];

  constructor(private bookingService: BookingService, private tokenService: TokenService) {
    this.get();
  }

  public get() {
    const id = this.tokenService.getUserId();
    this.bookingService.getAll(id).subscribe({
      next: (data) => {
        this.bookings = data.msg;
      },
      error: (error) => {
        Swal.fire('Error!', "Error al obtener las reservas", 'error');
      }
    });
  }

  public onCancel(bookingId: number) {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción cancelará tu reserva.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, cancelar",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        this.bookingService.cancel(bookingId).subscribe({
          next: (data) => {
            if (this.bookings) {
              // Actualiza el estado de la reserva a CANCELLED
              const booking = this.bookings.find(b => b.id === bookingId);
              if (booking) {
                booking.status = 'CANCELLED';
              }
              Swal.fire('Cancelada!', 'La reserva ha sido cancelada.', 'success');
            }
          },
          error: (error) => {
            Swal.fire('Error!', "Error al cancelar la reserva", 'error');
          }
        });
      }
    });
  }

  public getStatusBadgeClass(status: string): string {
    switch(status) {
      case 'CONFIRMED':
        return 'bg-success';
      case 'PENDING':
        return 'bg-warning';
      case 'CANCELLED':
        return 'bg-danger';
      default:
        return 'bg-secondary';
    }
  }

  public getStatusText(status: string): string {
    switch(status) {
      case 'CONFIRMED':
        return 'Confirmada';
      case 'PENDING':
        return 'Pendiente';
      case 'CANCELLED':
        return 'Cancelada';
      default:
        return status;
    }
  }
}