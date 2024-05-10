export type UserDataType = {
  _id?: string;
  fullName: string;
  email: string;
  password: string;
  role: string;
  bookings?: string;
};

export type HotelDataType = {
  _id?: string;
  hotelName: string;
  description: string;
  pricePerNight: number;
  address: string;
  starRating: number;
  facilities: string[];
  images: string[];
  updatedAt: Date;
};
