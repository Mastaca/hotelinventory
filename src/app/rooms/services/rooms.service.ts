import { Inject, Injectable } from '@angular/core';
import { RoomList } from '../rooms';
import { appServiceConfig } from 'src/app/AppConfig/appconfig.service';
import { AppConfig } from '../../AppConfig/appconfig.interface';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {

  // roomList_BACKUP: RoomList[] = [
  //   {
  //     roomNumber: 1,
  //     roomType: 'Deluxe Room',
  //     amenities: 'Air conditioner, Free Wi-Fi, TV, Bathroom, Kitchen',
  //     price: 500,
  //     photos: 'some Image URL',
  //     checkinTime: new Date('11-11-2021'),
  //     checkoutTime: new Date('15-11-2021'),
  //     rating: 4.51985231,
  //   },
  //   {
  //     roomNumber: 2,
  //     roomType: 'Deluxe Room',
  //     amenities: 'Air conditioner, Free Wi-Fi, TV, Bathroom, Kitchen',
  //     price: 2000,
  //     photos: 'some Image URL',
  //     checkinTime: new Date('11-11-2021'),
  //     checkoutTime: new Date('15-11-2021'),
  //     rating: 3.8387948,
  //   },
  //   {
  //     roomNumber: 3,
  //     roomType: 'Private Suite',
  //     amenities: 'Air conditioner, Free Wi-Fi, TV, Bathroom, Kitchen',
  //     price: 15000,
  //     photos: 'some Image URL',
  //     checkinTime: new Date('11-11-2021'),
  //     checkoutTime: new Date('15-11-2021'),
  //     rating: 2.9768516,
  //   },
  // ];

  roomList = [];

  // headers = new HttpHeaders({ 'token': '1asdw23494136496313asfd' });

  // getRooms$ =
  //   this.http.get<RoomList[]>('/api/rooms', {
  //       headers: this.headers
  //     })
  //     .pipe(shareReplay(1));

  getRooms$ =
    this.http.get<RoomList[]>('/api/rooms')
      .pipe(shareReplay(1));

  constructor(
    @Inject(appServiceConfig) private config: AppConfig,
    private http: HttpClient) {
    console.log(this.config.apiEndpoint);
    // console.log('Rooms service initialized');
  }

  getRooms() {
    return this.http.get<RoomList[]>('/api/rooms');
  }

  addRoom(room: RoomList) {
    return this.http.post<RoomList[]>('/api/rooms', room,
    // {headers: this.headers}
    );
  }

  editRoom(room: RoomList) {
    return this.http.put<RoomList[]>(`/api/rooms/${room.roomNumber}`, room);
  }

  deleteRoom(id: string) {
    return this.http.delete<RoomList[]>(`/api/rooms/${id}`);
  }

  getPhotos() {
    const request = new HttpRequest(
      'GET',
      `https://jsonplaceholder.typicode.com/photos`,
      {
        reportProgress: true,
      }
    )
    return this.http.request(request);

  }

}
