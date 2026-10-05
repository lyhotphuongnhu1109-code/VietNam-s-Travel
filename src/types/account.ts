export type MemberTier = 'Đồng (Bronze)' | 'Bạc (Silver)' | 'Vàng (Gold)' | 'Kim Cương (Diamond)';

export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  avatar: string;
  nationality: string;
  memberTier: MemberTier;
  rewardPoints: number;
  passportOrId?: string;
  createdAt: string;
}

export interface FlightBooking {
  id: string;
  bookingCode: string; // e.g. VN-FL-8924
  airline: 'Vietnam Airlines' | 'Vietjet Air' | 'Bamboo Airways';
  flightNumber: string;
  origin: string;
  originCode: string;
  destination: string;
  destCode: string;
  departureDate: string;
  departureTime: string;
  arrivalTime: string;
  seatClass: 'Phổ thông (Economy)' | 'Thương gia (Business)';
  passengers: number;
  passengerNames: string[];
  totalPriceVND: number;
  gate?: string;
  seatNumber?: string;
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled';
  createdAt: string;
}

export interface HotelBooking {
  id: string;
  bookingCode: string; // e.g. VN-HT-5612
  hotelName: string;
  location: string;
  region: 'North' | 'Central' | 'South';
  checkInDate: string;
  checkOutDate: string;
  roomType: string;
  nights: number;
  guests: number;
  guestName: string;
  guestPhone: string;
  totalPriceVND: number;
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled';
  specialRequests?: string;
  createdAt: string;
}

export interface TourBooking {
  id: string;
  bookingCode: string; // e.g. VN-TR-3391
  tourTitle: string;
  duration: string;
  startDate: string;
  departureLocation: string;
  participants: number;
  contactName: string;
  contactPhone: string;
  totalPriceVND: number;
  tourStyle: string;
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled';
  createdAt: string;
}

export interface BookingState {
  flights: FlightBooking[];
  hotels: HotelBooking[];
  tours: TourBooking[];
}
