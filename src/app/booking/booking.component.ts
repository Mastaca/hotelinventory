import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../services/config.service';
import { FormGroup, FormBuilder, FormControl, FormArray, Validators } from '@angular/forms';
import { BookingService } from './booking.service';
import { exhaustMap, mergeMap, switchMap } from 'rxjs';
import { CustomValidator } from './validators/custom-validator';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'hinv-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {

  bookingForm!: FormGroup;

  get guests() {
    return this.bookingForm.get('guests') as FormArray;
  }

  constructor(
    private configService: ConfigService,
    private formBuilder: FormBuilder,
    private bookingService: BookingService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.bookingForm = this.formBuilder.group({
      roomId: new FormControl({ value: id, disabled: true }, { validators: [Validators.required] }),
      guestEmail: [
        '',
        {
          updateOn: 'blur',
          validator: [Validators.required, Validators.email]
        }
      ],
      checkinDate: [''],
      checkoutDate: [''],
      bookingStatus: [''],
      bookingAmount: [''],
      bookingDate: [''],
      mobileNumber: [
        '',
        {
          updateOn: 'blur',
        }
      ],
      guestName: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          CustomValidator.validateName,
          CustomValidator.validateSpecialChar('*'),
        ]],
      address: this.formBuilder.group({
        addressLine1: ['', { validators: [Validators.required] }],
        addressLine2: [''],
        city: ['', { validators: [Validators.required] }],
        state: ['', { validators: [Validators.required] }],
        country: [''],
        zipCode: [''],
      }),
      guestCount: [''],
      guests: this.formBuilder.array([this.addGuestControl()]),
      tnc: new FormControl(false, { validators: [Validators.requiredTrue] }),
    },
      {
        updateOn: 'blur',
        validators: [CustomValidator.validateDate]
      }
    );
    this.getBookingdata();

    // this.bookingForm.valueChanges.subscribe((data) => {
    //   // console.log(data);
    //   this.bookingService.bookRoom(data).subscribe((data) => {});
    // })

    this.bookingForm.valueChanges.pipe(
      exhaustMap((data) => this.bookingService.bookRoom(data))
    ).subscribe((data) => console.log(data))
  }

  addBooking() {
    console.log(this.bookingForm.getRawValue());
    this.bookingService.bookRoom(this.bookingForm.getRawValue()).subscribe((data) => {
      console.log(data);
    })
    // this.bookingForm.reset({
    //   roomId: '2',
    //   guestEmail: '',
    //   checkinDate: '',
    //   checkoutDate: '',
    //   bookingStatus: '',
    //   bookingAmount: '',
    //   bookingDate: '',
    //   mobileNumber: '',
    //   guestName: '',
    //   address: {
    //     addressLine1: '',
    //     addressLine2: '',
    //     city: '',
    //     state: '',
    //     country: '',
    //     zipCode: '',
    //   },
    //   guestCount: '',
    //   guests: [],
    //   tnc: false,
    // });
  }

  getBookingdata() {
    this.bookingForm.patchValue({
      guestEmail: 'test@gmail.com',
      checkinDate: new Date('10-Feb-2020'),
      checkoutDate: '',
      bookingStatus: '',
      bookingAmount: '',
      bookingDate: '',
      mobileNumber: '',
      guestName: '',
      address: {
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        country: '',
        zipCode: '',
      },
      guestCount: '',
      guests: [],
      tnc: false,
    })
  }

  addGuest() {
    this.guests.push(
      this.addGuestControl()
    );
  }

  addGuestControl() {
    return this.formBuilder.group({
      guestName: ['', { validators: [Validators.required] }],
      age: new FormControl(''),
    });
  }

  removeGuest(i: number) {
    this.guests.removeAt(i);
  }

  addPassport() {
    this.bookingForm.addControl('passport', new FormControl(' '));
  }

  deletePassport() {
    if (this.bookingForm.get('passport')) {
      this.bookingForm.removeControl('passport');
    }
  }

}

