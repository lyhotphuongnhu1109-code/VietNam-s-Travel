/**
 * Traveloka Integration Data & Smart Deep-linking Helpers
 * Hỗ trợ liên kết đặt vé máy bay, khách sạn, combo trọn gói & vé tham quan trên Traveloka
 */

export interface TravelokaAirport {
  code: string;
  nameVi: string;
  nameEn: string;
  cityVi: string;
  cityEn: string;
  region: 'North' | 'Central' | 'South';
}

export interface TravelokaHotelCity {
  id: string;
  nameVi: string;
  nameEn: string;
  region: 'North' | 'Central' | 'South';
  travelokaSlug: string;
  popularSpots: string[];
  avgPriceVND: string;
  thumbnailUrl: string;
}

export interface TravelokaPromo {
  code: string;
  titleVi: string;
  titleEn: string;
  discountVi: string;
  discountEn: string;
  appliedFor: 'flight' | 'hotel' | 'combo' | 'xperience' | 'all';
  expiryDate: string;
  badge: string;
}

// Danh sách sân bay nội địa Việt Nam đầy đủ
export const TRAVELOKA_AIRPORTS: TravelokaAirport[] = [
  { code: 'HAN', nameVi: 'Sân bay Quốc tế Nội Bài', nameEn: 'Noi Bai International Airport', cityVi: 'Hà Nội', cityEn: 'Hanoi', region: 'North' },
  { code: 'SGN', nameVi: 'Sân bay Quốc tế Tân Sơn Nhất', nameEn: 'Tan Son Nhat International Airport', cityVi: 'TP. Hồ Chí Minh', cityEn: 'Ho Chi Minh City', region: 'South' },
  { code: 'DAD', nameVi: 'Sân bay Quốc tế Đà Nẵng', nameEn: 'Da Nang International Airport', cityVi: 'Đà Nẵng', cityEn: 'Da Nang', region: 'Central' },
  { code: 'CXR', nameVi: 'Sân bay Quốc tế Cam Ranh', nameEn: 'Cam Ranh International Airport', cityVi: 'Nha Trang / Khánh Hòa', cityEn: 'Nha Trang', region: 'Central' },
  { code: 'PQC', nameVi: 'Sân bay Quốc tế Phú Quốc', nameEn: 'Phu Quoc International Airport', cityVi: 'Đảo Phú Quốc', cityEn: 'Phu Quoc Island', region: 'South' },
  { code: 'DLI', nameVi: 'Sân bay Liên Khương', nameEn: 'Lien Khuong Airport', cityVi: 'Đà Lạt / Lâm Đồng', cityEn: 'Da Lat', region: 'Central' },
  { code: 'HPH', nameVi: 'Sân bay Quốc tế Cát Bi', nameEn: 'Cat Bi International Airport', cityVi: 'Hải Phòng', cityEn: 'Hai Phong', region: 'North' },
  { code: 'HUI', nameVi: 'Sân bay Quốc tế Phú Bài', nameEn: 'Phu Bai International Airport', cityVi: 'Huế / Thừa Thiên Huế', cityEn: 'Hue', region: 'Central' },
  { code: 'VCA', nameVi: 'Sân bay Quốc tế Cần Thơ', nameEn: 'Can Tho International Airport', cityVi: 'Cần Thơ', cityEn: 'Can Tho', region: 'South' },
  { code: 'VII', nameVi: 'Sân bay Quốc tế Vinh', nameEn: 'Vinh Airport', cityVi: 'Vinh / Nghệ An', cityEn: 'Vinh', region: 'North' },
  { code: 'UIH', nameVi: 'Sân bay Phù Cát', nameEn: 'Phu Cat Airport', cityVi: 'Quy Nhơn / Bình Định', cityEn: 'Quy Nhon', region: 'Central' },
  { code: 'BMV', nameVi: 'Sân bay Buôn Ma Thuột', nameEn: 'Buon Ma Thuot Airport', cityVi: 'Buôn Ma Thuột / Đắk Lắk', cityEn: 'Buon Ma Thuot', region: 'Central' },
  { code: 'PXU', nameVi: 'Sân bay Pleiku', nameEn: 'Pleiku Airport', cityVi: 'Pleiku / Gia Lai', cityEn: 'Pleiku', region: 'Central' },
  { code: 'VCL', nameVi: 'Sân bay Chu Lai', nameEn: 'Chu Lai Airport', cityVi: 'Tam Kỳ / Chu Lai / Hội An', cityEn: 'Chu Lai', region: 'Central' },
  { code: 'VDH', nameVi: 'Sân bay Đồng Hới', nameEn: 'Dong Hoi Airport', cityVi: 'Đồng Hới / Phong Nha', cityEn: 'Dong Hoi', region: 'Central' },
  { code: 'THD', nameVi: 'Sân bay Thọ Xuân', nameEn: 'Tho Xuan Airport', cityVi: 'Thanh Hóa', cityEn: 'Thanh Hoa', region: 'North' },
  { code: 'DIN', nameVi: 'Sân bay Điện Biên Phủ', nameEn: 'Dien Bien Phu Airport', cityVi: 'Điện Biên Phủ', cityEn: 'Dien Bien', region: 'North' },
  { code: 'TBB', nameVi: 'Sân bay Tuy Hòa', nameEn: 'Tuy Hoa Airport', cityVi: 'Tuy Hòa / Phú Yên', cityEn: 'Tuy Hoa', region: 'Central' },
  { code: 'VCS', nameVi: 'Sân bay Côn Đảo', nameEn: 'Con Dao Airport', cityVi: 'Côn Đảo / Bà Rịa - Vũng Tàu', cityEn: 'Con Dao', region: 'South' },
  { code: 'VKG', nameVi: 'Sân bay Rạch Giá', nameEn: 'Rach Gia Airport', cityVi: 'Rạch Giá / Kiên Giang', cityEn: 'Rach Gia', region: 'South' },
];

// Danh sách điểm đến khách sạn & resort hàng đầu trên Traveloka
export const TRAVELOKA_HOTEL_CITIES: TravelokaHotelCity[] = [
  {
    id: 'da-nang',
    nameVi: 'Đà Nẵng',
    nameEn: 'Da Nang',
    region: 'Central',
    travelokaSlug: 'da-nang-10009890',
    popularSpots: ['Bãi biển Mỹ Khê', 'Bà Nà Hills', 'Bán đảo Sơn Trà', 'Cầu Rồng'],
    avgPriceVND: 'từ 450.000₫/đêm',
    thumbnailUrl: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'phu-quoc',
    nameVi: 'Phú Quốc',
    nameEn: 'Phu Quoc',
    region: 'South',
    travelokaSlug: 'phu-quoc-10010041',
    popularSpots: ['Bãi Sao', 'Bãi Trường', 'Grand World', 'Hòn Thơm', 'VinWonders'],
    avgPriceVND: 'từ 650.000₫/đêm',
    thumbnailUrl: 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'hoi-an',
    nameVi: 'Hội An',
    nameEn: 'Hoi An',
    region: 'Central',
    travelokaSlug: 'hoi-an-10009896',
    popularSpots: ['Phố Cổ Hội An', 'Sông Hoài', 'Biển An Bàng', 'Rừng dừa Bảy Mẫu'],
    avgPriceVND: 'từ 500.000₫/đêm',
    thumbnailUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'ha-noi',
    nameVi: 'Hà Nội',
    nameEn: 'Hanoi',
    region: 'North',
    travelokaSlug: 'ha-noi-10009824',
    popularSpots: ['Hồ Hoàn Kiếm', 'Phố Cổ Hà Nội', 'Hồ Tây', 'Hoàng Thành Thăng Long'],
    avgPriceVND: 'từ 480.000₫/đêm',
    thumbnailUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'ho-chi-minh',
    nameVi: 'TP. Hồ Chí Minh',
    nameEn: 'Ho Chi Minh City',
    region: 'South',
    travelokaSlug: 'ho-chi-minh-10009848',
    popularSpots: ['Quận 1 Phố Đi Bộ', 'Dinh Độc Lập', 'Chợ Bến Thành', 'Bến Bạch Đằng'],
    avgPriceVND: 'từ 520.000₫/đêm',
    thumbnailUrl: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'nha-trang',
    nameVi: 'Nha Trang',
    nameEn: 'Nha Trang',
    region: 'Central',
    travelokaSlug: 'nha-trang-10009941',
    popularSpots: ['Đường Trần Phú', 'Đảo Hòn Tre', 'Vịnh Nha Trang', 'Tháp Bà Ponagar'],
    avgPriceVND: 'từ 490.000₫/đêm',
    thumbnailUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'da-lat',
    nameVi: 'Đà Lạt',
    nameEn: 'Da Lat',
    region: 'Central',
    travelokaSlug: 'da-lat-10009903',
    popularSpots: ['Hồ Xuân Hương', 'Hồ Tuyền Lâm', 'Đồi Chè Cầu Đất', 'Thung Lũng Tình Yêu'],
    avgPriceVND: 'từ 420.000₫/đêm',
    thumbnailUrl: 'https://images.unsplash.com/photo-1579618218290-24a26f63a83b?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'sa-pa',
    nameVi: 'Sa Pa',
    nameEn: 'Sa Pa',
    region: 'North',
    travelokaSlug: 'sa-pa-10009843',
    popularSpots: ['Đỉnh Fansipan', 'Bản Cát Cát', 'Thung lũng Mường Hoa', 'Bản Tả Phìn'],
    avgPriceVND: 'từ 460.000₫/đêm',
    thumbnailUrl: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'ha-long',
    nameVi: 'Hạ Long / Quảng Ninh',
    nameEn: 'Ha Long Bay',
    region: 'North',
    travelokaSlug: 'ha-long-10009836',
    popularSpots: ['Vịnh Hạ Long', 'Đảo Tuần Châu', 'Bãi Cháy', 'Bảo tàng Quảng Ninh'],
    avgPriceVND: 'từ 550.000₫/đêm',
    thumbnailUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'ninh-binh',
    nameVi: 'Ninh Bình',
    nameEn: 'Ninh Binh',
    region: 'North',
    travelokaSlug: 'ninh-binh-10009839',
    popularSpots: ['Tràng An', 'Tam Cốc - Bích Động', 'Chùa Bái Đính', 'Hang Múa'],
    avgPriceVND: 'từ 390.000₫/đêm',
    thumbnailUrl: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'hue',
    nameVi: 'Huế',
    nameEn: 'Hue',
    region: 'Central',
    travelokaSlug: 'thua-thien-hue-10009895',
    popularSpots: ['Đại Nội Huế', 'Chùa Thiên Mụ', 'Lăng Khải Định', 'Sông Hương'],
    avgPriceVND: 'từ 410.000₫/đêm',
    thumbnailUrl: 'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'vung-tau',
    nameVi: 'Vũng Tàu',
    nameEn: 'Vung Tau',
    region: 'South',
    travelokaSlug: 'vung-tau-10009961',
    popularSpots: ['Bãi Sau', 'Bãi Trước', 'Mũi Nghinh Phong', 'Tượng Chúa Kito'],
    avgPriceVND: 'từ 480.000₫/đêm',
    thumbnailUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'quy-nhon',
    nameVi: 'Quy Nhơn',
    nameEn: 'Quy Nhon',
    region: 'Central',
    travelokaSlug: 'quy-nhon-10009935',
    popularSpots: ['Kỳ Co', 'Eo Gió', 'Hòn Khô', 'Ghềnh Ráng Tiên Sa'],
    avgPriceVND: 'từ 430.000₫/đêm',
    thumbnailUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'con-dao',
    nameVi: 'Côn Đảo',
    nameEn: 'Con Dao',
    region: 'South',
    travelokaSlug: 'con-dao-10009962',
    popularSpots: ['Bãi Đầm Trầu', 'Nghĩa trang Hàng Dương', 'Nhà tù Côn Đảo', 'Hòn Bảy Cạnh'],
    avgPriceVND: 'từ 790.000₫/đêm',
    thumbnailUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'ha-giang',
    nameVi: 'Hà Giang',
    nameEn: 'Ha Giang',
    region: 'North',
    travelokaSlug: 'ha-giang-10009819',
    popularSpots: ['Đèo Mã Pí Lèng', 'Cột cờ Lũng Cú', 'Cao nguyên đá Đồng Văn', 'Sông Nho Quế'],
    avgPriceVND: 'từ 350.000₫/đêm',
    thumbnailUrl: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'phan-thiet',
    nameVi: 'Phan Thiết / Mũi Né',
    nameEn: 'Phan Thiet / Mui Ne',
    region: 'South',
    travelokaSlug: 'phan-thiet-10009949',
    popularSpots: ['Đồi Cát Bay', 'Suối Tiên', 'Bàu Trắng', 'Bãi biển Mũi Né'],
    avgPriceVND: 'từ 420.000₫/đêm',
    thumbnailUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'can-tho',
    nameVi: 'Cần Thơ / Miền Tây',
    nameEn: 'Can Tho / Mekong Delta',
    region: 'South',
    travelokaSlug: 'can-tho-10010023',
    popularSpots: ['Chợ nổi Cái Răng', 'Bến Ninh Kiều', 'Nhà cổ Bình Thủy', 'Vườn trái cây'],
    avgPriceVND: 'từ 380.000₫/đêm',
    thumbnailUrl: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'phu-yen',
    nameVi: 'Phú Yên / Tuy Hòa',
    nameEn: 'Phu Yen / Tuy Hoa',
    region: 'Central',
    travelokaSlug: 'phu-yen-10009938',
    popularSpots: ['Ghềnh Đá Đĩa', 'Bãi Xép - Tôi thấy hoa vàng trên cỏ xanh', 'Mũi Điện', 'Tháp Nhạn'],
    avgPriceVND: 'từ 390.000₫/đêm',
    thumbnailUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'buon-ma-thuot',
    nameVi: 'Buôn Ma Thuột / Đắk Lắk',
    nameEn: 'Buon Ma Thuot / Dak Lak',
    region: 'Central',
    travelokaSlug: 'dak-lak-10009923',
    popularSpots: ['Bảo tàng Cà Phê', 'Hồ Lắk', 'Thác Dray Nur', 'Buôn Đôn'],
    avgPriceVND: 'từ 360.000₫/đêm',
    thumbnailUrl: 'https://images.unsplash.com/photo-1579618218290-24a26f63a83b?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'cat-ba',
    nameVi: 'Cát Bà / Hải Phòng',
    nameEn: 'Cat Ba Island',
    region: 'North',
    travelokaSlug: 'cat-ba-10009832',
    popularSpots: ['Vịnh Lan Hạ', 'Vườn quốc gia Cát Bà', 'Bãi Cát Cò', 'Pháo đài Thần Công'],
    avgPriceVND: 'từ 410.000₫/đêm',
    thumbnailUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'phong-nha',
    nameVi: 'Phong Nha / Quảng Bình',
    nameEn: 'Phong Nha / Quang Binh',
    region: 'Central',
    travelokaSlug: 'quang-binh-10009893',
    popularSpots: ['Động Thiên Đường', 'Động Phong Nha', 'Sông Chày - Hang Tối', 'Suối Nước Moọc'],
    avgPriceVND: 'từ 370.000₫/đêm',
    thumbnailUrl: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'moc-chau',
    nameVi: 'Mộc Châu / Sơn La',
    nameEn: 'Moc Chau Highlands',
    region: 'North',
    travelokaSlug: 'moc-chau-10009844',
    popularSpots: ['Đồi chè Trái Tim', 'Thác Dải Yếm', 'Rừng thông Bản Áng', 'Thung lũng mận Nà Ka'],
    avgPriceVND: 'từ 350.000₫/đêm',
    thumbnailUrl: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=600&q=80',
  },
];

// Danh sách Combo Vé máy bay + Khách sạn tiết kiệm hàng đầu
export interface TravelokaComboDeal {
  id: string;
  titleVi: string;
  titleEn: string;
  destCity: string;
  destCityVi: string;
  destAirport: string;
  originAirport: string;
  durationVi: string;
  durationEn: string;
  hotelTypeVi: string;
  hotelTypeEn: string;
  priceVND: string;
  priceNum: number;
  savingsVi: string;
  savingsEn: string;
  imageUrl: string;
  featuresVi: string[];
  featuresEn: string[];
  badgeVi?: string;
  badgeEn?: string;
  recommendedHotel?: string;
}

export const TRAVELOKA_POPULAR_COMBOS: TravelokaComboDeal[] = [
  {
    id: 'combo-danang-hoian',
    titleVi: 'Combo Đà Nẵng & Phố Cổ Hội An',
    titleEn: 'Da Nang & Hoi An Ancient Town Bundle',
    destCity: 'da-nang',
    destCityVi: 'Đà Nẵng & Hội An',
    destAirport: 'DAD',
    originAirport: 'HAN',
    durationVi: '3 Ngày 2 Đêm',
    durationEn: '3 Days 2 Nights',
    hotelTypeVi: 'Khách sạn 4 sao gần biển Mỹ Khê + Buffet sáng',
    hotelTypeEn: '4-star hotel near My Khe Beach + Buffet breakfast',
    priceVND: 'từ 2.490.000₫/khách',
    priceNum: 2490000,
    savingsVi: 'Tiết kiệm 550.000₫ (Giảm 25%)',
    savingsEn: 'Save VND 550,000 (25% off)',
    badgeVi: 'BÁN CHẠY NHẤT',
    badgeEn: 'TOP SELLER',
    recommendedHotel: 'Silk Sense Hoi An Resort / Furama Danang',
    imageUrl: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=600&q=80',
    featuresVi: ['Vé máy bay khứ hồi (Vietnam Airlines/Vietjet)', '2 đêm phòng Superior view biển', 'Đưa đón sân bay Đà Nẵng miễn phí'],
    featuresEn: ['Round-trip flight tickets', '2 nights Superior sea-view room', 'Free Da Nang airport transfer'],
  },
  {
    id: 'combo-phuquoc',
    titleVi: 'Combo Thiên Đường Đảo Ngọc Phú Quốc',
    titleEn: 'Phu Quoc Pearl Island Bundle',
    destCity: 'phu-quoc',
    destCityVi: 'Đảo Phú Quốc',
    destAirport: 'PQC',
    originAirport: 'SGN',
    durationVi: '3 Ngày 2 Đêm',
    durationEn: '3 Days 2 Nights',
    hotelTypeVi: 'Resort 4-5 sao Bãi Trường có hồ bơi vô cực',
    hotelTypeEn: '4-5 star Bai Truong Resort with infinity pool',
    priceVND: 'từ 2.990.000₫/khách',
    priceNum: 2990000,
    savingsVi: 'Tiết kiệm 720.000₫ (Giảm 28%)',
    savingsEn: 'Save VND 720,000 (28% off)',
    badgeVi: 'RESORT SÁT BIỂN',
    badgeEn: 'BEACH RESORT',
    recommendedHotel: 'InterContinental Phu Quoc / Novotel',
    imageUrl: 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=600&q=80',
    featuresVi: ['Vé máy bay khứ hồi thẳng đảo', 'Resort sát biển có bãi tắm riêng', 'Tặng voucher ẩm thực 200.000₫'],
    featuresEn: ['Direct round-trip flights', 'Beachfront resort with private beach', 'VND 200,000 dining voucher'],
  },
  {
    id: 'combo-nhatrang',
    titleVi: 'Combo Biển Xanh Vịnh Nha Trang',
    titleEn: 'Nha Trang Bay Ocean Breeze Bundle',
    destCity: 'nha-trang',
    destCityVi: 'Nha Trang',
    destAirport: 'CXR',
    originAirport: 'HAN',
    durationVi: '4 Ngày 3 Đêm',
    durationEn: '4 Days 3 Nights',
    hotelTypeVi: 'Khách sạn 4 sao đường Trần Phú view toàn vịnh',
    hotelTypeEn: '4-star Tran Phu hotel with panoramic bay view',
    priceVND: 'từ 2.750.000₫/khách',
    priceNum: 2750000,
    savingsVi: 'Tiết kiệm 600.000₫ (Giảm 26%)',
    savingsEn: 'Save VND 600,000 (26% off)',
    badgeVi: 'VIEW VỊNH BIỂN',
    badgeEn: 'BAY VIEW',
    recommendedHotel: 'Vinpearl Resort & Spa Nha Trang Bay',
    imageUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80',
    featuresVi: ['Vé máy bay khứ hồi Cam Ranh', 'Phòng hướng biển ban công', 'Miễn phí hồ bơi tầng thượng'],
    featuresEn: ['Round-trip Cam Ranh flights', 'Ocean balcony room', 'Free rooftop infinity pool'],
  },
  {
    id: 'combo-dalat',
    titleVi: 'Combo Sương Mờ & Hoa Ngàn Đà Lạt',
    titleEn: 'Da Lat Misty Highlands Bundle',
    destCity: 'da-lat',
    destCityVi: 'Đà Lạt',
    destAirport: 'DLI',
    originAirport: 'SGN',
    durationVi: '3 Ngày 2 Đêm',
    durationEn: '3 Days 2 Nights',
    hotelTypeVi: 'Boutique Hotel / Villa ven hồ Tuyền Lâm',
    hotelTypeEn: 'Boutique Hotel / Villa by Tuyen Lam Lake',
    priceVND: 'từ 2.190.000₫/khách',
    priceNum: 2190000,
    savingsVi: 'Tiết kiệm 480.000₫ (Giảm 24%)',
    savingsEn: 'Save VND 480,000 (24% off)',
    badgeVi: 'KHÍ HẬU MÁT LẠNH',
    badgeEn: 'HIGHLAND RETREAT',
    recommendedHotel: 'Dalat Edensee Lake Resort / Ana Mandara',
    imageUrl: 'https://images.unsplash.com/photo-1579618218290-24a26f63a83b?auto=format&fit=crop&w=600&q=80',
    featuresVi: ['Vé bay Liên Khương khứ hồi', 'Villa phong cách Pháp cổ điển', 'Thưởng thức trà chiều & bánh ngọt'],
    featuresEn: ['Lien Khuong round-trip flights', 'French colonial style villa', 'Afternoon tea & pastries included'],
  },
  {
    id: 'combo-quynhon',
    titleVi: 'Combo Kỳ Co & Eo Gió Quy Nhơn',
    titleEn: 'Quy Nhon Ky Co & Eo Gio Coastal Bundle',
    destCity: 'quy-nhon',
    destCityVi: 'Quy Nhơn',
    destAirport: 'UIH',
    originAirport: 'HAN',
    durationVi: '3 Ngày 2 Đêm',
    durationEn: '3 Days 2 Nights',
    hotelTypeVi: 'Resort view biển Ghềnh Ráng Tiên Sa',
    hotelTypeEn: 'Beachfront resort at Ghenh Rang Tien Sa',
    priceVND: 'từ 2.390.000₫/khách',
    priceNum: 2390000,
    savingsVi: 'Tiết kiệm 500.000₫ (Giảm 25%)',
    savingsEn: 'Save VND 500,000 (25% off)',
    badgeVi: 'BIỂN HOANG SƠ',
    badgeEn: 'PRISTINE BEACH',
    recommendedHotel: 'FLC Luxury Resort Quy Nhon / Seaside Boutique',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
    featuresVi: ['Vé bay Phù Cát khứ hồi', 'Khách sạn biển trung tâm', 'Tặng mã giảm giá cano ra Kỳ Co'],
    featuresEn: ['Phu Cat round-trip flights', 'Central seaside hotel', 'Discount code for Ky Co speedboat'],
  },
  {
    id: 'combo-condao',
    titleVi: 'Combo Biển Thiêng Côn Đảo',
    titleEn: 'Con Dao Sacred Island Bundle',
    destCity: 'con-dao',
    destCityVi: 'Côn Đảo',
    destAirport: 'VCS',
    originAirport: 'SGN',
    durationVi: '3 Ngày 2 Đêm',
    durationEn: '3 Days 2 Nights',
    hotelTypeVi: 'Resort nghỉ dưỡng Bãi Đầm Trầu',
    hotelTypeEn: 'Dam Trau Beach nature resort',
    priceVND: 'từ 3.650.000₫/khách',
    priceNum: 3650000,
    savingsVi: 'Tiết kiệm 800.000₫ (Giảm 30%)',
    savingsEn: 'Save VND 800,000 (30% off)',
    badgeVi: 'THIÊN NHIÊN HOANG DÃ',
    badgeEn: 'PRISTINE NATURE',
    recommendedHotel: 'Poulo Condor Boutique Resort & Spa',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
    featuresVi: ['Vé bay khứ hồi Côn Đảo', 'Khách sạn view biển yên bình', 'Hỗ trợ xe điện đưa đón'],
    featuresEn: ['Con Dao round-trip flights', 'Peaceful sea-view hotel', 'Electric shuttle assistance'],
  },
  {
    id: 'combo-halong',
    titleVi: 'Combo Kỳ Quan Vịnh Hạ Long',
    titleEn: 'Ha Long Bay Wonder Bundle',
    destCity: 'ha-long',
    destCityVi: 'Hạ Long / Quảng Ninh',
    destAirport: 'HPH',
    originAirport: 'DAD',
    durationVi: '3 Ngày 2 Đêm',
    durationEn: '3 Days 2 Nights',
    hotelTypeVi: 'Khách sạn 4 sao Bãi Cháy + Du thuyền vịnh',
    hotelTypeEn: '4-star Bai Chay Hotel + Bay cruise',
    priceVND: 'từ 2.350.000₫/khách',
    priceNum: 2350000,
    savingsVi: 'Tiết kiệm 550.000₫ (Giảm 25%)',
    savingsEn: 'Save VND 550,000 (25% off)',
    badgeVi: 'DI SẢN THẾ GIỚI',
    badgeEn: 'WORLD HERITAGE',
    recommendedHotel: 'Muong Thanh Luxury Ha Long / Novotel Ha Long',
    imageUrl: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=600&q=80',
    featuresVi: ['Vé bay khứ hồi Cát Bi (HPH)', 'Khách sạn 4 sao trung tâm Bãi Cháy', 'Tặng voucher hải sản Hạ Long'],
    featuresEn: ['Round-trip Cat Bi flights', '4-star hotel in Bai Chay', 'Seafood dining voucher'],
  },
  {
    id: 'combo-hanoi-sapa',
    titleVi: 'Combo Phố Cổ Hà Nội & Sa Pa Mây Ngàn',
    titleEn: 'Hanoi Old Quarter & Sa Pa Highlands Bundle',
    destCity: 'ha-noi',
    destCityVi: 'Hà Nội & Sa Pa',
    destAirport: 'HAN',
    originAirport: 'SGN',
    durationVi: '4 Ngày 3 Đêm',
    durationEn: '4 Days 3 Nights',
    hotelTypeVi: 'Khách sạn Phố Cổ Hà Nội + Ecolodge Sa Pa',
    hotelTypeEn: 'Hanoi Old Quarter Hotel + Sa Pa Ecolodge',
    priceVND: 'từ 3.190.000₫/khách',
    priceNum: 3190000,
    savingsVi: 'Tiết kiệm 750.000₫ (Giảm 27%)',
    savingsEn: 'Save VND 750,000 (27% off)',
    badgeVi: 'TRẢI NGHIỆM VĂN HÓA',
    badgeEn: 'CULTURAL EXPERIENCE',
    recommendedHotel: 'La Siesta Classic Ma May / Topas Ecolodge',
    imageUrl: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=600&q=80',
    featuresVi: ['Vé bay khứ hồi Tân Sơn Nhất - Nội Bài', 'Khách sạn trung tâm Hoàn Kiếm', 'Hỗ trợ đặt xe Limousine đi Sa Pa'],
    featuresEn: ['Round-trip SGN - HAN flights', 'Hoan Kiem central hotel', 'Sa Pa Limousine transfer assistance'],
  },
];


export const TRAVELOKA_POPULAR_ACTIVITIES: TravelokaActivityItem[] = [
  {
    id: 'act_bana_hills',
    nameVi: 'Vé Cáp Treo Sun World Ba Na Hills & Cầu Vàng',
    nameEn: 'Sun World Ba Na Hills Cable Car & Golden Bridge',
    destCity: 'da-nang',
    destCityVi: 'Đà Nẵng',
    categoryVi: 'Công viên chủ đề & Cáp treo',
    categoryEn: 'Theme Park & Cable Car',
    priceVND: 'từ 850.000₫/vé',
    badgeVi: 'BÁN CHẠY NHẤT',
    badgeEn: 'BEST SELLER',
    imageUrl: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=600&q=80',
    featuresVi: ['Vé cáp treo khứ hồi đạt kỷ lục thế giới', 'Check-in Cầu Vàng Bàn Tay Khổng Lồ', 'Khu vui chơi Fantasy Park'],
    featuresEn: ['Round-trip cable car ticket', 'Golden Bridge check-in', 'Fantasy Park access'],
  },
  {
    id: 'act_vinwonders_phuquoc',
    nameVi: 'Vé VinWonders & Vinpearl Safari Phú Quốc',
    nameEn: 'VinWonders & Vinpearl Safari Phu Quoc',
    destCity: 'phu-quoc',
    destCityVi: 'Phú Quốc',
    categoryVi: 'Công viên giải trí & Safari',
    categoryEn: 'Amusement Park & Safari',
    priceVND: 'từ 900.000₫/vé',
    badgeVi: 'SIÊU HOT',
    badgeEn: 'SUPER DEAL',
    imageUrl: 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=600&q=80',
    featuresVi: ['Công viên chủ đề lớn nhất Việt Nam', 'Vườn thú bán hoang dã Safari đầu tiên', 'Vé QR quét vào cổng trực tiếp'],
    featuresEn: ['Largest theme park in Vietnam', 'Semi-wild Safari zoo admission', 'Instant direct QR code entry'],
  },
  {
    id: 'act_fansipan_sapa',
    nameVi: 'Vé Cáp Treo Sun World Fansipan Legend',
    nameEn: 'Sun World Fansipan Legend Cable Car',
    destCity: 'sa-pa',
    destCityVi: 'Sa Pa / Lào Cai',
    categoryVi: 'Cáp treo & Danh thắng',
    categoryEn: 'Cable Car & Scenic Peak',
    priceVND: 'từ 730.000₫/vé',
    badgeVi: 'NÓC NHÀ ĐÔNG DƯƠNG',
    badgeEn: 'INDOCHINA SUMMIT',
    imageUrl: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=600&q=80',
    featuresVi: ['Chinh phục đỉnh 3.143m ngắm biển mây', 'Chiêm bái quần thể tâm linh Đại Tượng Phật', 'Tàu hỏa leo núi Mường Hoa'],
    featuresEn: ['Reach 3,143m cloud summit', 'Spiritual complex & Giant Buddha', 'Muong Hoa mountain funicular'],
  },
  {
    id: 'act_halong_cruise',
    nameVi: 'Vé Du Thuyền 5 Sao Ngắm Vịnh Hạ Long',
    nameEn: '5-Star Ha Long Bay Day Cruise',
    destCity: 'ha-long',
    destCityVi: 'Hạ Long / Quảng Ninh',
    categoryVi: 'Du thuyền & Vịnh di sản',
    categoryEn: 'Cruise & UNESCO Bay',
    priceVND: 'từ 650.000₫/khách',
    badgeVi: 'DI SẢN UNESCO',
    badgeEn: 'UNESCO HERITAGE',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
    featuresVi: ['Khám phá Hang Sửng Sốt, Đảo Ti Tốp', 'Thưởng thức buffet hải sản cao cấp', 'Trải nghiệm chèo kayak / thuyền nan'],
    featuresEn: ['Sung Sot Cave & Ti Top Island', 'Luxury seafood buffet lunch', 'Kayaking or bamboo boat ride'],
  },
  {
    id: 'act_baden_tayninh',
    nameVi: 'Vé Cáp Treo Sun World Núi Bà Đen',
    nameEn: 'Sun World Ba Den Mountain Cable Car',
    destCity: 'tay-ninh',
    destCityVi: 'Tây Ninh',
    categoryVi: 'Cáp treo & Du lịch tâm linh',
    categoryEn: 'Cable Car & Spiritual Trek',
    priceVND: 'từ 350.000₫/vé',
    badgeVi: 'NÓC NHÀ NAM BỘ',
    badgeEn: 'SOUTHERN ROOF',
    imageUrl: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=600&q=80',
    featuresVi: ['Hệ thống cáp treo hiện đại lên Chùa Bà & Đỉnh', 'Chiêm bái Tượng Phật Bà Tây Bổ Đà Sơn', 'Ngắm toàn cảnh vùng đất linh thiêng'],
    featuresEn: ['Modern cable car to Pagoda & Peak', 'Tay Bo Da Son giant bronze Buddha', 'Panoramic views of holy plains'],
  },
  {
    id: 'act_lotte_aquarium',
    nameVi: 'Vé Thủy Cung Lotte World Aquarium Hà Nội',
    nameEn: 'Lotte World Aquarium Hanoi Ticket',
    destCity: 'ha-noi',
    destCityVi: 'Hà Nội',
    categoryVi: 'Thủy cung & Sinh vật biển',
    categoryEn: 'Aquarium & Marine Life',
    priceVND: 'từ 280.000₫/vé',
    badgeVi: 'GIA ĐÌNH & TRẺ EM',
    badgeEn: 'FAMILY & KIDS',
    imageUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=600&q=80',
    featuresVi: ['Hơn 31.000 sinh vật biển đa dạng', 'Bể thủy cung vòm kính lớn nhất Hà Nội', 'Trình diễn cho chim cánh cụt & cá ăn'],
    featuresEn: ['31,000+ diverse marine animals', 'Largest curved tunnel aquarium in Hanoi', 'Penguin & fish feeding shows'],
  },
  {
    id: 'act_saigon_river_cruise',
    nameVi: 'Vé Du Thuyền Sông Sài Gòn & Tiệc Tối',
    nameEn: 'Saigon River Sightseeing & Dinner Cruise',
    destCity: 'ho-chi-minh',
    destCityVi: 'TP. Hồ Chí Minh',
    categoryVi: 'Du thuyền ẩm thực đêm',
    categoryEn: 'Dining Night Cruise',
    priceVND: 'từ 390.000₫/khách',
    badgeVi: 'TRẢI NGHIỆM ĐÊM',
    badgeEn: 'NIGHT EXPERIENCE',
    imageUrl: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=600&q=80',
    featuresVi: ['Ngắm toàn cảnh Sài Gòn & Landmark 81 lung linh', 'Thực đơn ẩm thực Âu - Á hoặc buffet nướng', 'Nhạc sống du dương suốt hành trình'],
    featuresEn: ['Illuminated skyline & Landmark 81 view', 'Asian-Western fusion menu or BBQ', 'Live acoustic music on board'],
  },
  {
    id: 'act_tinh_hoa_bac_bo',
    nameVi: 'Vé Show Thực Cảnh Tinh Hoa Bắc Bộ',
    nameEn: 'The Quintessence of Tonkin Live Show',
    destCity: 'ha-noi',
    destCityVi: 'Hà Nội',
    categoryVi: 'Show nghệ thuật thực cảnh',
    categoryEn: 'Outdoor Cultural Live Show',
    priceVND: 'từ 320.000₫/vé',
    badgeVi: 'NGHỆ THUẬT ĐẶC SẮC',
    badgeEn: 'SIGNATURE SHOW',
    imageUrl: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=600&q=80',
    featuresVi: ['Sân khấu nước thực cảnh tự nhiên kỳ vĩ', 'Hàng trăm diễn viên là nông dân địa phương', 'Tái hiện lịch sử, múa rối nước & thi ca'],
    featuresEn: ['Magnificent natural water stage', 'Hundreds of local farmer performers', 'Folklore, water puppetry & heritage'],
    bookingUrl: 'https://www.traveloka.com/vi-vn/activities/search?q=show%20tinh%20hoa%20bac%20bo',
  },
  {
    id: 'act_vinwonders_nhatrang',
    nameVi: 'Vé VinWonders Nha Trang (Đảo Hòn Tre)',
    nameEn: 'VinWonders Nha Trang Amusement Park',
    destCity: 'nha-trang',
    destCityVi: 'Nha Trang',
    categoryVi: 'Công viên chủ đề & Vịnh biển',
    categoryEn: 'Theme Park & Bay Island',
    priceVND: 'từ 800.000₫/vé',
    badgeVi: 'ĐẢO THẦN TIÊN',
    badgeEn: 'FAIRY ISLAND',
    imageUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80',
    featuresVi: ['Cáp treo vượt biển hoặc cano cao tốc', 'Vịnh phao nổi lớn nhất thế giới & rạp phim bay', 'Show diễn bom tấn Tata Show thực cảnh'],
    featuresEn: ['Sea-crossing cable car or speedboat', 'World-class water park & flying cinema', 'Spectacular live Tata Show'],
    bookingUrl: 'https://www.traveloka.com/vi-vn/activities/search?q=vinwonders%20nha%20trang',
  },
  {
    id: 'act_ky_uc_hoi_an',
    nameVi: 'Vé Show Diễn Ký Ức Hội An & Công Viên Ấn Tượng',
    nameEn: 'Hoi An Memories Show & Impression Theme Park',
    destCity: 'hoi-an',
    destCityVi: 'Hội An',
    categoryVi: 'Show thực cảnh văn hóa di sản',
    categoryEn: 'Cultural Heritage Live Show',
    priceVND: 'từ 600.000₫/vé',
    badgeVi: 'MÃN NHÃN',
    badgeEn: 'MUST SEE',
    imageUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=600&q=80',
    featuresVi: ['500 diễn viên trên sân khấu nổi 25.000m²', 'Tái hiện 400 năm vàng son thương cảng Faifo', 'Công viên văn hóa tương tác đa sắc màu'],
    featuresEn: ['500 performers on 25,000m² water stage', '400 years of historic Faifo trading port', 'Interactive cultural theme park'],
    bookingUrl: 'https://www.traveloka.com/vi-vn/activities/search?q=ky%20uc%20hoi%20an',
  },
  {
    id: 'act_nui_than_tai',
    nameVi: 'Vé Công Viên Suối Khoáng Nóng Núi Thần Tài',
    nameEn: 'Nui Than Tai Hot Springs Park Da Nang',
    destCity: 'da-nang',
    destCityVi: 'Đà Nẵng',
    categoryVi: 'Suối khoáng nóng & Thư giãn Onsen',
    categoryEn: 'Hot Springs & Wellness Onsen',
    priceVND: 'từ 450.000₫/vé',
    badgeVi: 'NGHỈ DƯỠNG ONSEN',
    badgeEn: 'WELLNESS ONSEN',
    imageUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80',
    featuresVi: ['Tắm khoáng tự nhiên giữa rừng nguyên sinh', 'Công viên nước trên núi & hồ sóng nhân tạo', 'Tắm bùn khoáng & ngâm chân Onsen chuẩn Nhật'],
    featuresEn: ['Natural thermal hot springs', 'Mountain water park & wave pool', 'Japanese mineral mud & Onsen foot bath'],
    bookingUrl: 'https://www.traveloka.com/vi-vn/activities/search?q=nui%20than%20tai%20da%20nang',
  },
  {
    id: 'act_hon_thom_phuquoc',
    nameVi: 'Vé Cáp Treo Vượt Biển Hòn Thơm & Công Viên Nước Aquatopia',
    nameEn: 'Hon Thom Sun World Sea Cable Car & Aquatopia',
    destCity: 'phu-quoc',
    destCityVi: 'Phú Quốc',
    categoryVi: 'Cáp treo 3 dây vượt biển & Công viên nước',
    categoryEn: 'Sea Cable Car & Water Park',
    priceVND: 'từ 650.000₫/vé',
    badgeVi: 'KỶ LỤC GUINNESS',
    badgeEn: 'GUINNESS RECORD',
    imageUrl: 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=600&q=80',
    featuresVi: ['Cáp treo 3 dây vượt biển dài nhất thế giới 7.899m', 'Công viên nước Aquatopia 20 làn trượt đẳng cấp', 'Làng Exotica với trò chơi tàu lượn Mộc Xà Thịnh Nộ'],
    featuresEn: ['World longest 3-wire sea cable car (7,899m)', 'Aquatopia premier water park', 'Exotica wooden coaster adventure'],
    bookingUrl: 'https://www.traveloka.com/vi-vn/activities/search?q=cap%20treo%20hon%20thom%20phu%20quoc',
  },
];

export interface TravelokaActivityItem {
  id: string;
  nameVi: string;
  nameEn: string;
  destCity: string;
  destCityVi: string;
  categoryVi: string;
  categoryEn: string;
  priceVND: string;
  badgeVi: string;
  badgeEn: string;
  imageUrl: string;
  featuresVi: string[];
  featuresEn: string[];
  bookingUrl?: string;
}

// Danh sách khách sạn & resort tiêu biểu được đề xuất đặt trực tiếp qua Traveloka
export interface TravelokaPopularHotel {
  id: string;
  nameVi: string;
  nameEn: string;
  cityId: string;
  cityNameVi: string;
  stars: number;
  ratingScore: string;
  reviewCount: string;
  pricePerNightVND: string;
  priceNum: number;
  address: string;
  badgeVi: string;
  badgeEn: string;
  imageUrl: string;
  featuresVi: string[];
  featuresEn: string[];
}

export const TRAVELOKA_POPULAR_HOTELS: TravelokaPopularHotel[] = [
  {
    id: 'silk_sense_hoian',
    nameVi: 'Silk Sense Hoi An River Resort & Spa',
    nameEn: 'Silk Sense Hoi An River Resort & Spa',
    cityId: 'hoi-an',
    cityNameVi: 'Hội An',
    stars: 5,
    ratingScore: '9.2/10',
    reviewCount: '1.450+ đánh giá',
    pricePerNightVND: 'từ 1.650.000₫/đêm',
    priceNum: 1650000,
    address: 'Đường Lê Thánh Tông, Cẩm An, Hội An, Quảng Nam',
    badgeVi: 'RESORT XANH BÊN SÔNG',
    badgeEn: 'GREEN RIVER RESORT',
    imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80',
    featuresVi: ['Hồ bơi muối khoáng vô cực bên sông Cổ Cò', 'Buffet sáng hữu cơ từ vườn sinh thái', 'Xe đạp & xe điện miễn phí ra Phố Cổ'],
    featuresEn: ['Saltwater infinity pool by river', 'Organic farm-to-table breakfast', 'Free bicycles and shuttle to Old Town'],
  },
  {
    id: 'intercon_phuquoc',
    nameVi: 'InterContinental Phu Quoc Long Beach Resort',
    nameEn: 'InterContinental Phu Quoc Long Beach Resort',
    cityId: 'phu-quoc',
    cityNameVi: 'Phú Quốc',
    stars: 5,
    ratingScore: '9.4/10',
    reviewCount: '2.800+ đánh giá',
    pricePerNightVND: 'từ 3.250.000₫/đêm',
    priceNum: 3250000,
    address: 'Bãi Trường, Dương Tơ, Phú Quốc, Kiên Giang',
    badgeVi: 'ĐẲNG CẤP 5 SAO QUỐC TẾ',
    badgeEn: '5-STAR LUXURY',
    imageUrl: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=600&q=80',
    featuresVi: ['Bãi biển riêng tư cát trắng hoàng hôn Bãi Trường', 'Quán bar tầng thượng INK 360 view ngắm cảnh đẹp nhất đảo', 'Khu vui chơi trẻ em Planet Trekkers chuẩn quốc tế'],
    featuresEn: ['Private Long Beach white sand sunset', 'Famous INK 360 rooftop bar', 'International Planet Trekkers kids club'],
  },
  {
    id: 'furama_danang',
    nameVi: 'Furama Resort Da Nang',
    nameEn: 'Furama Resort Da Nang',
    cityId: 'da-nang',
    cityNameVi: 'Đà Nẵng',
    stars: 5,
    ratingScore: '9.0/10',
    reviewCount: '3.100+ đánh giá',
    pricePerNightVND: 'từ 2.150.000₫/đêm',
    priceNum: 2150000,
    address: '105 Võ Nguyên Giáp, Ngũ Hành Sơn, Đà Nẵng',
    badgeVi: 'BÃI BIỂN MỸ KHÊ',
    badgeEn: 'MY KHE BEACHFRONT',
    imageUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80',
    featuresVi: ['Khu nghỉ dưỡng di sản ẩm thực bên bờ biển Mỹ Khê', 'Hồ bơi đầm phá nhiệt đới giữa rừng dừa', 'Trường dạy lặn biển & thể thao nước chuyên nghiệp'],
    featuresEn: ['Culinary heritage resort on My Khe Beach', 'Lagoon pool in tropical coconut jungle', 'Professional diving and water sports school'],
  },
  {
    id: 'topas_ecolodge_sapa',
    nameVi: 'Topas Ecolodge Sa Pa',
    nameEn: 'Topas Ecolodge Sa Pa',
    cityId: 'sa-pa',
    cityNameVi: 'Sa Pa',
    stars: 5,
    ratingScore: '9.5/10',
    reviewCount: '1.920+ đánh giá',
    pricePerNightVND: 'từ 2.450.000₫/đêm',
    priceNum: 2450000,
    address: 'Thôn Bản Lếch, Xã Thanh Bình, Sa Pa, Lào Cai',
    badgeVi: 'HỒ BƠI VÔ CỰC MÂY NGÀN',
    badgeEn: 'CLOUD INFINITY POOL',
    imageUrl: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=600&q=80',
    featuresVi: ['Bungalow đá granite trên đỉnh đồi view thung lũng Mường Hoa', 'Hồ bơi nước ấm vô cực lưng chừng biển mây', 'Trải nghiệm tắm lá thuốc cổ truyền người Dao Đỏ'],
    featuresEn: ['Granite bungalows overlooking Muong Hoa valley', 'Heated infinity pool above the clouds', 'Traditional Red Dao herbal bath experience'],
  },
  {
    id: 'vinpearl_nhatrang',
    nameVi: 'Vinpearl Resort & Spa Nha Trang Bay',
    nameEn: 'Vinpearl Resort & Spa Nha Trang Bay',
    cityId: 'nha-trang',
    cityNameVi: 'Nha Trang',
    stars: 5,
    ratingScore: '9.1/10',
    reviewCount: '2.600+ đánh giá',
    pricePerNightVND: 'từ 2.390.000₫/đêm',
    priceNum: 2390000,
    address: 'Đảo Hòn Tre, Vĩnh Nguyên, Nha Trang, Khánh Hòa',
    badgeVi: 'RESORT BIỂN ĐẢO HÒN TRE',
    badgeEn: 'ISLAND LUXURY RESORT',
    imageUrl: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=600&q=80',
    featuresVi: ['Khu nghỉ hình cánh cung hướng trọn vẹn vịnh biển Nha Trang', 'Cáp treo & cano cao tốc đưa đón miễn phí', 'Kết nối liền kề công viên VinWonders Nha Trang'],
    featuresEn: ['Curved architecture facing Nha Trang Bay', 'Free round-the-clock cable car and speedboat transfer', 'Direct adjacent access to VinWonders park'],
  },
  {
    id: 'la_siesta_hanoi',
    nameVi: 'La Siesta Classic Ma May Hotel Hanoi',
    nameEn: 'La Siesta Classic Ma May Hotel Hanoi',
    cityId: 'ha-noi',
    cityNameVi: 'Hà Nội',
    stars: 4,
    ratingScore: '9.6/10',
    reviewCount: '3.400+ đánh giá',
    pricePerNightVND: 'từ 1.850.000₫/đêm',
    priceNum: 1850000,
    address: '94 Mã Mây, Hàng Buồm, Hoàn Kiếm, Hà Nội',
    badgeVi: 'TRÁI TIM PHỐ CỔ HOÀN KIẾM',
    badgeEn: 'OLD QUARTER HEART',
    imageUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=600&q=80',
    featuresVi: ['Kiến trúc boutique Đông Dương tinh tế giữa Phố Cổ', 'Đi bộ 3 phút tới Hồ Hoàn Kiếm & Chợ đêm', 'Dịch vụ hiếu khách hàng đầu Việt Nam trên TripAdvisor'],
    featuresEn: ['Sophisticated Indochine boutique design', '3-minute walk to Hoan Kiem Lake and Night Market', 'Top-rated TripAdvisor hospitality service'],
  },
  {
    id: 'dalat_edensee',
    nameVi: 'Dalat Edensee Lake Resort & Spa',
    nameEn: 'Dalat Edensee Lake Resort & Spa',
    cityId: 'da-lat',
    cityNameVi: 'Đà Lạt',
    stars: 5,
    ratingScore: '8.9/10',
    reviewCount: '1.750+ đánh giá',
    pricePerNightVND: 'từ 1.950.000₫/đêm',
    priceNum: 1950000,
    address: 'Khu chức năng VII.2, Hồ Tuyền Lâm, Đà Lạt, Lâm Đồng',
    badgeVi: 'BIỆT THỰ RỪNG THÔNG VEN HỒ',
    badgeEn: 'PINE FOREST LAKE RESORT',
    imageUrl: 'https://images.unsplash.com/photo-1579618218290-24a26f63a83b?auto=format&fit=crop&w=600&q=80',
    featuresVi: ['Làng biệt thự phong cách châu Âu giữa rừng thông', 'Khung cảnh thơ mộng hướng hồ Tuyền Lâm sương mờ', 'Sân golf mini, bắn cung & chèo thuyền kayak trên hồ'],
    featuresEn: ['European-style villas tucked in pine forests', 'Romantic views over misty Tuyen Lam Lake', 'Mini golf, archery, and lake kayaking'],
  },
  {
    id: 'muong_thanh_halong',
    nameVi: 'Khách Sạn Mường Thanh Luxury Hạ Long Centre',
    nameEn: 'Muong Thanh Luxury Ha Long Centre Hotel',
    cityId: 'ha-long',
    cityNameVi: 'Hạ Long / Quảng Ninh',
    stars: 5,
    ratingScore: '9.0/10',
    reviewCount: '2.100+ đánh giá',
    pricePerNightVND: 'từ 1.450.000₫/đêm',
    priceNum: 1450000,
    address: 'Khu 2, Phường Bãi Cháy, TP. Hạ Long, Quảng Ninh',
    badgeVi: 'VIEW TRỌN VỊNH DI SẢN',
    badgeEn: 'HERITAGE BAY PANORAMA',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
    featuresVi: ['Khách sạn 5 sao cao cấp ngay trung tâm Bãi Cháy', 'Phòng hướng biển ngắm trọn vẹn vịnh Hạ Long', 'Hồ bơi vô cực, phòng gym & spa đá muối Himalaya'],
    featuresEn: ['Premier 5-star hotel in Bai Chay center', 'Direct ocean rooms facing Ha Long Bay', 'Infinity pool, fitness center & Himalayan salt spa'],
  },
];

// Danh sách mã ưu đãi Traveloka độc quyền cho người dùng app

export const TRAVELOKA_PROMOS: TravelokaPromo[] = [
  {
    code: 'BAYVIETNAM50K',
    titleVi: 'Ưu đãi Vé Máy Bay Nội Địa',
    titleEn: 'Domestic Flights Discount',
    discountVi: 'Giảm 50.000₫ cho mọi chặng bay nội địa (VN, Vietjet, Bamboo)',
    discountEn: 'VND 50,000 off on all domestic flights',
    appliedFor: 'flight',
    expiryDate: '31/12/2026',
    badge: 'HOT DEAL',
  },
  {
    code: 'HOTELTRAVELOKA15',
    titleVi: 'Ưu đãi Khách Sạn & Resort 63 Tỉnh Thành',
    titleEn: 'Hotels & Resorts Discount',
    discountVi: 'Giảm đến 15% tối đa 300.000₫ cho phòng khách sạn & homestay',
    discountEn: 'Up to 15% off max VND 300,000 on hotels & homestays',
    appliedFor: 'hotel',
    expiryDate: '31/12/2026',
    badge: 'TIẾT KIỆM',
  },
  {
    code: 'COMBOTRAVEL30',
    titleVi: 'Combo Vé Máy Bay + Khách Sạn',
    titleEn: 'Flight + Hotel Bundle',
    discountVi: 'Tiết kiệm thêm 25% - 30% khi đặt trọn gói vé + chỗ ở',
    discountEn: 'Save 25% - 30% when bundling flight and hotel',
    appliedFor: 'combo',
    expiryDate: '31/12/2026',
    badge: 'COMBO VIP',
  },
  {
    code: 'XPERIENCEFUN20',
    titleVi: 'Vé Vui Chơi & Hoạt Động Xperience',
    titleEn: 'Tours & Attractions Xperience',
    discountVi: 'Giảm 20.000₫ - 100.000₫ vé Bà Nà Hills, VinWonders, Fansipan',
    discountEn: 'Up to VND 100,000 off Sun World, VinWonders & tours',
    appliedFor: 'xperience',
    expiryDate: '31/12/2026',
    badge: 'XPERIENCE',
  },
];

/**
 * Tạo URL tìm kiếm chuyến bay Traveloka chính thức
 */
export function buildTravelokaFlightUrl(params: {
  originCode: string;
  destCode: string;
  departureDate?: string; // YYYY-MM-DD
  returnDate?: string; // YYYY-MM-DD
  seatClass?: 'ECONOMY' | 'BUSINESS' | 'PREMIUM_ECONOMY';
  adults?: number;
  children?: number;
  infants?: number;
}): string {
  const origin = params.originCode.toUpperCase();
  const dest = params.destCode.toUpperCase();
  const adults = params.adults || 1;
  const children = params.children || 0;
  const infants = params.infants || 0;
  const seatClass = params.seatClass || 'ECONOMY';

  // Format date: DD-MM-YYYY
  const formatDate = (isoStr?: string) => {
    if (!isoStr) return '';
    const parts = isoStr.split('-');
    if (parts.length === 3) {
      return `${parts[2]}-${parts[1]}-${parts[0]}`;
    }
    return '';
  };

  const depFormatted = formatDate(params.departureDate) || '15-10-2026';
  const retFormatted = formatDate(params.returnDate) || 'NA';

  // Official Traveloka fullsearch URL format
  return `https://www.traveloka.com/vi-vn/flight/fullsearch?ap=${origin}.${dest}&dt=${depFormatted}.${retFormatted}&ps=${adults}.${children}.${infants}&sc=${seatClass}`;
}

/**
 * Tạo URL tìm kiếm khách sạn Traveloka chính thức
 * Liên kết trực tiếp tới trang khách sạn theo điểm đến, ngày check-in, check-out, số khách & phòng
 */
export function buildTravelokaHotelUrl(params: {
  cityIdOrName: string;
  checkInDate?: string; // YYYY-MM-DD
  checkOutDate?: string; // YYYY-MM-DD
  guests?: number;
  rooms?: number;
  hotelName?: string;
}): string {
  const norm = (params.cityIdOrName || 'da-nang').trim().toLowerCase();
  const cityMatch = TRAVELOKA_HOTEL_CITIES.find(
    (c) =>
      c.id === norm ||
      c.nameVi.toLowerCase().includes(norm) ||
      c.nameEn.toLowerCase().includes(norm) ||
      norm.includes(c.id) ||
      norm.includes(c.nameVi.toLowerCase())
  );

  const formatDate = (isoStr?: string, defaultDaysOffset = 7) => {
    if (isoStr) {
      const parts = isoStr.split('-');
      if (parts.length === 3) {
        if (parts[0].length === 4) {
          return `${parts[2].padStart(2, '0')}-${parts[1].padStart(2, '0')}-${parts[0]}`;
        }
        return `${parts[0].padStart(2, '0')}-${parts[1].padStart(2, '0')}-${parts[2]}`;
      }
    }
    const d = new Date(Date.now() + defaultDaysOffset * 86400000);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const checkIn = formatDate(params.checkInDate, 7);
  const checkOut = formatDate(params.checkOutDate, 10);
  const guests = params.guests || 2;
  const rooms = params.rooms || 1;

  const searchQuery = params.hotelName
    ? `${params.hotelName} ${cityMatch?.nameVi || params.cityIdOrName}`
    : (cityMatch ? cityMatch.nameVi : params.cityIdOrName);

  return `https://www.traveloka.com/vi-vn/hotel/search?q=${encodeURIComponent(searchQuery)}&spec=${checkIn}.${checkOut}.${rooms}.${guests}.HOTEL_GEO`;
}

export interface TravelokaComboParams {
  originCode?: string; // e.g. 'HAN', 'SGN', 'DAD', 'HPH', 'VCA'
  destCode?: string; // e.g. 'DAD', 'PQC', 'CXR', 'DLI', 'UIH', 'HUI', 'VCS'
  destCity?: string; // e.g. 'da-nang', 'phu-quoc', 'nha-trang'
  departureDate?: string; // YYYY-MM-DD
  returnDate?: string; // YYYY-MM-DD
  guests?: number;
  rooms?: number;
  seatClass?: 'ECONOMY' | 'BUSINESS' | 'PREMIUM_ECONOMY';
}

/**
 * Tạo URL combo Vé máy bay + Khách sạn Traveloka chính thức
 * Giúp tiết kiệm tới 30% khi đặt trọn gói vé bay + phòng lưu trú
 */
export function buildTravelokaComboUrl(params?: TravelokaComboParams): string {
  if (!params) {
    return 'https://www.traveloka.com/vi-vn/packages';
  }

  const origin = (params.originCode || 'HAN').toUpperCase();
  const dest = (params.destCode || 'DAD').toUpperCase();
  const guests = params.guests || 2;
  const rooms = params.rooms || 1;
  const seatClass = params.seatClass || 'ECONOMY';

  const formatDate = (isoStr?: string, defaultDaysOffset = 14) => {
    if (isoStr) {
      const parts = isoStr.split('-');
      if (parts.length === 3) {
        if (parts[0].length === 4) {
          return `${parts[2].padStart(2, '0')}-${parts[1].padStart(2, '0')}-${parts[0]}`;
        }
        return `${parts[0].padStart(2, '0')}-${parts[1].padStart(2, '0')}-${parts[2]}`;
      }
    }
    const d = new Date(Date.now() + defaultDaysOffset * 86400000);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const depFormatted = formatDate(params.departureDate, 14);
  const retFormatted = formatDate(params.returnDate, 17);

  // Mapping từ mã sân bay đến Traveloka package slug chính thức
  const airportToPkgSlug: Record<string, string> = {
    DAD: 'da-nang-10009890',
    PQC: 'phu-quoc-10010041',
    CXR: 'nha-trang-10009941',
    DLI: 'da-lat-10009903',
    UIH: 'quy-nhon-10009935',
    HUI: 'thua-thien-hue-10009895',
    HPH: 'ha-long-10009836',
    VCS: 'con-dao-10009962',
    HAN: 'ha-noi-10009824',
    SGN: 'ho-chi-minh-10009848',
    VCA: 'can-tho-10010023',
    TBB: 'phu-yen-10009938',
    BMV: 'dak-lak-10009923',
    DIN: 'dien-bien-10009816',
  };

  const pkgSlug = airportToPkgSlug[dest];
  if (pkgSlug) {
    return `https://www.traveloka.com/vi-vn/packages/vietnam/${pkgSlug}`;
  }

  return 'https://www.traveloka.com/vi-vn/packages';
}

/**
 * Trang chủ chính thức cổng Combo Vé máy bay + Khách sạn Traveloka Packages
 */
export const TRAVELOKA_PACKAGES_URL = 'https://www.traveloka.com/vi-vn/packages';

/**
 * Tạo URL vé tham quan Xperience
 */
export function buildTravelokaActivitiesUrl(params?: {
  query?: string;
  destination?: string;
} | string): string {
  if (!params) {
    return 'https://www.traveloka.com/vi-vn/activities';
  }
  const q = typeof params === 'string' ? params.trim() : (params.query || params.destination || '').trim();
  if (q) {
    return `https://www.traveloka.com/vi-vn/activities/search?q=${encodeURIComponent(q)}`;
  }
  return 'https://www.traveloka.com/vi-vn/activities';
}

/**
 * Link App Store & Google Play
 */
export const TRAVELOKA_APP_LINKS = {
  appStore: 'https://apps.apple.com/app/traveloka-flights-hotels/id898244865',
  googlePlay: 'https://play.google.com/store/apps/details?id=com.traveloka.android',
  webHome: 'https://www.traveloka.com/vi-vn',
  flightHome: 'https://www.traveloka.com/vi-vn/flight',
  hotelHome: 'https://www.traveloka.com/vi-vn/hotel',
  comboHome: 'https://www.traveloka.com/vi-vn/packages',
  activitiesHome: 'https://www.traveloka.com/vi-vn/activities',
};
