import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  DoCheck,
  OnInit,
  QueryList,
  SkipSelf,
  ViewChild,
  ViewChildren
} from '@angular/core';
import { Room, RoomList } from './rooms';
import { HeaderComponent } from '../header/header.component';
import { RoomsService } from './services/rooms.service';
import { Observable, Subject, Subscription, catchError, map, of } from 'rxjs';
import { HttpEventType } from '@angular/common/http';
import { ConfigService } from '../services/config.service';
import { FormControl } from '@angular/forms';
import { ShareddataService } from '../services/shareddata.service';

@Component({
  selector: 'hinv-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss'],
})
export class RoomsComponent implements
  OnInit,
  DoCheck,
  AfterViewInit,
  AfterViewChecked {

  hotelName = 'Hilton Hotel';

  numberOfRooms = 10;

  hideRooms = false;

  selectedRoom!: RoomList;

  rooms: Room = {
    totalRooms: 15,
    availableRoom: 10,
    bookedRooms: 5,
  };

  title = 'List of rooms (modified)'

  roomList: RoomList[] = [];

  totalBytes = 0;

  subscription!: Subscription;

  error$ = new Subject<string>();

  getError$ = this.error$.asObservable();

  rooms$ = this.roomsService.getRooms$.pipe(
    catchError((err) => {
      // console.log(err);
      this.error$.next(err.message);
      return of([]);
    })
  );

  priceFilter = new FormControl(0);

  roomsCount$ = this.roomsService.getRooms$.pipe(
    map((rooms) => rooms.length)
  )

  stream = new Observable(observer => {
    observer.next('user1');
    // observer.next('user2');
    // observer.next('user3');
    observer.complete();
    observer.error('error');
  })

  @ViewChild(HeaderComponent) headerComponent!: HeaderComponent;
  @ViewChildren(HeaderComponent) headerChildrenComponent!: QueryList<HeaderComponent>;

  constructor(
    @SkipSelf() private roomsService: RoomsService,
    private configService: ConfigService,
    private shareddataService: ShareddataService,
    ) { }

  ngOnInit(): void {
    this.roomsService.getPhotos().subscribe((event) => {
      switch (event.type) {
        case HttpEventType.Sent: {
          console.log('Request has been made!');
          break;
        }
        case HttpEventType.ResponseHeader: {
          console.log('Request succes!');
          break;
        }
        case HttpEventType.DownloadProgress: {
          this.totalBytes += event.loaded;
          break;
        }
        case HttpEventType.Response: {
          console.log('Request complete!');
          console.log(event.body);
          break;
        }
      }
    })

    // this.stream.subscribe({
    //   next: (value) => console.log(value),
    //   complete: () => console.log('complete'),
    //   error: (err) => console.log(err),
    // });
    // this.stream.subscribe((data) => console.log(data));
    // this.subscription =
    //   this.roomsService.
    //     getRooms$.subscribe(rooms => {
    //       this.roomList = rooms;
    //     });
  }

  ngAfterViewInit(): void {
    // console.log(this.headerComponent);
    // this.headerComponent.title = "Rooms view";
    // this.headerChildrenComponent.last.title = "last Title";
  }

  ngAfterViewChecked(): void {
    // console.log(this.headerComponent);
    // this.headerComponent.title = "Rooms view"
  }

  ngDoCheck(): void {
    // console.log('on changes is called');
  }

  toggle() {
    this.hideRooms = !this.hideRooms;
    this.title = this.title;
  }

  selectRoom(room: RoomList) {
    this.selectedRoom = room;
  }

  addRoom() {
    const room: RoomList = {
      roomNumber: '4',
      roomType: 'Deluxe Room',
      amenities: 'Air conditioner, Free Wi-Fi, TV, Bathroom, Kitchen',
      price: 555,
      photos: 'some Image URL',
      checkinTime: new Date('11-11-2021'),
      checkoutTime: new Date('15-11-2021'),
      rating: 2.9768516,
    };

    // this.roomList.push(room);
    // this.roomList = [...this.roomList, room];
    this.roomsService.addRoom(room).subscribe((data) => {
      this.roomList = data;
    })
  }

  editRoom() {
    const room: RoomList = {
      roomNumber: '3',
      roomType: 'Deluxe Room what the fuck man',
      amenities: 'Air conditioner, Free Wi-Fi, TV, Bathroom, Kitchen',
      price: 55505,
      photos: 'some Image URL',
      checkinTime: new Date('11-11-2021'),
      checkoutTime: new Date('15-11-2021'),
      rating: 2.9768516,
    };
    this.roomsService.editRoom(room).subscribe((data) => {
      this.roomList = data;
    });
  }

  deleteRoom() {
    this.roomsService.deleteRoom('3').subscribe((data) => {
      this.roomList = data;
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
