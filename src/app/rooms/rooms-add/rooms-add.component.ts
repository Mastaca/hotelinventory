import { Component, OnInit } from '@angular/core';
import { RoomList } from '../rooms';
import { RoomsService } from '../services/rooms.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'hinv-rooms-add',
  templateUrl: './rooms-add.component.html',
  styleUrls: ['./rooms-add.component.scss']
})
export class RoomsAddComponent implements OnInit {

  room: RoomList = {
    roomNumber: '',
    roomType: '',
    amenities: '',
    checkinTime: new Date(),
    checkoutTime: new Date(),
    photos: '',
    price: 0,
    rating: 0,
  }

  successMessage: string = '';

  constructor(private roomService: RoomsService) { }

  ngOnInit(): void {
  }

  AddRoom(roomsForm: NgForm) {
    this.roomService
      .addRoom(this.room)
      .subscribe((params) => {
        this.successMessage = 'Room added successfullty';
        roomsForm.reset({
          roomNumber: '',
          roomType: '',
          amenities: '',
          checkinTime: new Date(),
          checkoutTime: new Date(),
          photos: '',
          price: 0,
          rating: 0,
        });
      })
  }

}
