import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { CreateBookingDto } from '../../models/create-booking-dto';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PlaceDTO } from '../../models/place-dto';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { BookingService } from '../../services/booking-service';
import { PlacesService } from '../../services/places-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-booking',
  imports: [ReactiveFormsModule, RouterModule, CommonModule],
  templateUrl: './create-booking.html',
  styleUrl: './create-booking.css'
})
export class CreateBooking {
  bookingForm!: FormGroup;
  accommodationId: string = "";
  place: PlaceDTO | undefined;
  minDate: string = "";
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
    this.setMinDate();
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.accommodationId = params["id"];
      if (this.accommodationId) {
        this.loadPlace(this.accommodationId);
      }
    });
  }

  private createForm() {
    this.bookingForm = this.formBuilder.group({
      dateFrom: ['', [Validators.required]],
      dateTo: ['', [Validators.required]],
      guests: [1, [Validators.required, Validators.min(1)]]
    });

    // Escuchar cambios en las fechas para calcular el total
    this.bookingForm.valueChanges.subscribe(() => {
      this.calculateTotal();
    });
  }

  private setMinDate() {
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];
  }

  private loadPlace(id: string) {
    this.placesService.getById(parseInt(id)).subscribe({
      next: (data) => {
        this.place = data.msg;
        if (this.place) {
          this.bookingForm.patchValue({
            guests: 1
          });
        }
      },
      error: (error) => {
        Swal.fire('Error!', 'No se pudo cargar la información del alojamiento', 'error');
        this.router.navigate(['/']);
      }
    });
  }

  private calculateTotal() {
    const dateFrom = this.bookingForm.get('dateFrom')?.value;
    const dateTo = this.bookingForm.get('dateTo')?.value;

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
    if (this.bookingForm.invalid) {
      this.bookingForm.markAllAsTouched();
      return;
    }

    const createBookingDto: CreateBookingDto = {
      accommodationId: parseInt(this.accommodationId),
      dateFrom: new Date(this.bookingForm.get('dateFrom')?.value),
      dateTo: new Date(this.bookingForm.get('dateTo')?.value),
      guests: this.bookingForm.get('guests')?.value
    };

    this.bookingService.create(createBookingDto).subscribe({
      next: (data) => {
        Swal.fire({
          title: 'Reserva creada!',
          text: 'Tu reserva ha sido creada exitosamente',
          icon: 'success'
        }).then(() => {
          this.router.navigate(['/bookings']);
        });
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
