export interface Room {
  totalRooms: number;
  availableRoom: number;
  bookedRooms: number;
}

export interface RoomList {
  roomNumber: string;
  roomType: string;
  amenities: string;
  price: number;
  photos: string;
  checkinTime: Date;
  checkoutTime: Date;
  rating: number;
}
