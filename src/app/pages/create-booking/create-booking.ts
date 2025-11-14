import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { CreateBookingDto } from '../../models/create-booking-dto';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PlaceDTO } from '../../models/place-dto';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { BookingService } from '../../services/booking-service';
import { PlacesService } from '../../services/places-service';
import { CommonModule } from '@angular/common';
import { BookingDto } from '../../models/booking-dto';

@Component({
  selector: 'app-create-booking',
  imports: [ReactiveFormsModule, RouterModule, CommonModule],
  templateUrl: './create-booking.html',
  styleUrl: './create-booking.css'
})
export class CreateBooking {
  createBookingForm!: FormGroup;
  accommodationId: string = "";
  place: PlaceDTO | undefined;
  booking: BookingDto | undefined;
  totalNights: number = 0;
  totalPrice: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private bookingService: BookingService,
    private placesService: PlacesService
  ) {
    this.createForm();
  }

  private createForm() {
    this.createBookingForm = this.formBuilder.group({
      dateFrom: ['', [Validators.required]],
      dateTo: ['', [Validators.required]],
      guests: [1, [Validators.required, Validators.min(1)]]
    });

    // Escuchar cambios en las fechas para calcular el total
    this.createBookingForm.valueChanges.subscribe(() => {
      this.calculateTotal();
    });
  }

  private calculateTotal() {
    const dateFrom = this.createBookingForm.get('dateFrom')?.value;
    const dateTo = this.createBookingForm.get('dateTo')?.value;

    if (dateFrom && dateTo && this.place) {
      const from = new Date(dateFrom);
      const to = new Date(dateTo);
      const diffTime = Math.abs(to.getTime() - from.getTime());
      this.totalNights = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      this.totalPrice = this.totalNights * this.place.priceNight;
    } else {
      this.totalNights = 0;
      this.totalPrice = 0;
    }
  }

  public createBooking() {

    const createBookingDto = this.createBookingForm.value as CreateBookingDto;

    if (this.createBookingForm.invalid) {
      this.createBookingForm.markAllAsTouched();
      return;
    }

    this.bookingService.create(createBookingDto).subscribe({
      next: (data) => {
        Swal.fire('Creado!', data.msg, 'success');
      },
      error: (error) => {
        Swal.fire({
          title: 'Error',
          text: error.error.msg || 'No se pudo crear la reserva',
          icon: 'error'
        });
      }
    });
  }

  getGuestsArray(): number[] {
    return Array.from({ length: this.place?.capMax || 10 }, (_, i) => i + 1);
  }
}
