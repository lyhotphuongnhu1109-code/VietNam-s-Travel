import halongImg from '../assets/images/halong_bay_karst_1789531154772.jpg';
import hanoiImg from '../assets/images/hanoi_hoankiem_lake_1789531168556.jpg';
import sapaImg from '../assets/images/sapa_rice_terraces_1789531183033.jpg';
import tranganImg from '../assets/images/trangan_ninhbinh_1789531195824.jpg';
import phongnhaImg from '../assets/images/phongnha_cave_river_1789531208995.jpg';
import hueThienMuImg from '../assets/images/hue_thienmu_pagoda_1789531224397.jpg';
import hueCitadelImg from '../assets/images/hue_citadel_monument_1789530680714.jpg';
import hoianImg from '../assets/images/hoian_ancient_bridge_1789531239369.jpg';
import danangImg from '../assets/images/danang_golden_bridge_1789531252694.jpg';
import dalatImg from '../assets/images/dalat_flower_hills_1789531267114.jpg';
import saigonImg from '../assets/images/saigon_city_view_1789531280393.jpg';
import cairangImg from '../assets/images/cairang_floating_mkt_1789531303058.jpg';
import phuquocImg from '../assets/images/phuquoc_sao_beach_1789531318779.jpg';
import truongsaImg from '../assets/images/truongsa_island_flag_1789531332666.jpg';
import hoangsaImg from '../assets/images/hoangsa_vietnam_sea_1789531347167.jpg';
import dk1Img from '../assets/images/dk1_platform_rig_1789531362217.jpg';
import lungCuImg from '../assets/images/lung_cu_flag_tower_1789530668278.jpg';
import hoangThanhImg from '../assets/images/hoang_thanh_thang_long_1789530654797.jpg';
import mySonImg from '../assets/images/my_son_sanctuary_1789530694157.jpg';
import cuChiImg from '../assets/images/cu_chi_tunnels_1789530706937.jpg';
import dinhDocLapImg from '../assets/images/reunification_palace_1789530722587.jpg';
import phoImg from '../assets/images/pho_vietnam_1789530541480.jpg';
import banhMiImg from '../assets/images/banh_mi_vietnam_1789530554776.jpg';
import bunChaImg from '../assets/images/bun_cha_hanoi_1789530568497.jpg';
import bunBoHueImg from '../assets/images/bun_bo_hue_1789530580655.jpg';
import comTamImg from '../assets/images/com_tam_saigon_1789530596304.jpg';
import miQuangImg from '../assets/images/mi_quang_danang_1789530609604.jpg';
import banhXeoImg from '../assets/images/banh_xeo_mientay_1789530626361.jpg';
import eggCoffeeImg from '../assets/images/egg_coffee_hanoi_1789530640290.jpg';

export interface DestinationGalleryImage {
  url: string;
  captionVi: string;
  captionEn: string;
  captionKo: string;
}

export interface DestinationDiningSpot {
  name: string;
  dish: string;
  address: string;
  priceRange: string;
  openingHours: string;
  rating: number;
  highlightTip: string;
}

export interface DestinationFlightInfo {
  nearestAirport: string;
  airportCode: string;
  originOptions: { code: string; name: string }[];
  roundtripPriceEstimate: string;
  onewayPriceEstimate: string;
  flightDuration: string;
  airlines: string[];
  bookingAdvice: string;
}

export interface HotelRecommendation {
  name: string;
  stars: number;
  pricePerNight: string;
  address: string;
  features: string[];
}

export interface DestinationHotelTier {
  category: string;
  priceRange: string;
  description: string;
}

export interface DestinationFullGuide {
  gallery: DestinationGalleryImage[];
  ticketPriceInfo: string;
  openingHoursInfo: string;
  highlightsList: string[];
  flights: DestinationFlightInfo;
  hotels: {
    travelokaCityId: string;
    tiers: DestinationHotelTier[];
    recommendedStays: HotelRecommendation[];
  };
  diningSpots: DestinationDiningSpot[];
}

export const DESTINATION_DETAILS: Record<string, DestinationFullGuide> = {
  'ha-long-bay': {
    gallery: [
      { url: halongImg, captionVi: 'Vịnh Hạ Long - Quần thể núi đá vôi nhô lên từ mặt biển xanh ngọc', captionEn: 'Ha Long Bay emerald seascape and limestone karsts', captionKo: '하롱베이 에메랄드빛 바다와 웅장한 석회암 기암괴석' },
      { url: phuquocImg, captionVi: 'Hang Luồn & bến chèo kayak nước trong vắt', captionEn: 'Kayaking paradise through sea caves and lagoons', captionKo: '루온 동굴 카약 체험과 청정 석호' },
      { url: hoangsaImg, captionVi: 'Hoàng hôn rực rỡ nhìn từ du thuyền 5 sao vịnh Hạ Long', captionEn: 'Spectacular sunset from 5-star cruise sun deck', captionKo: '5성급 럭셔리 크루즈 선상에서 바라보는 일몰' },
    ],
    ticketPriceInfo: 'Vé tham quan ban ngày: 290.000 VNĐ/người (tuyến 1 & 2 bao gồm phí qua cảng). Vé du thuyền ngủ đêm: từ 2.200.000 - 5.500.000 VNĐ/khách trọn gói ăn 4 bữa.',
    openingHoursInfo: 'Cảng tàu khách quốc tế Tuần Châu & Hạ Long mở cửa từ 06:30 - 18:30 hàng ngày.',
    highlightsList: [
      'Ngủ đêm trên du thuyền ngắm bình minh & hoàng hôn trên vịnh',
      'Chèo thuyền kayak luồn qua các vòm hang kỳ vĩ (Hang Luồn, Hang Sáng Tối)',
      'Thám hiểm hang Sửng Sốt - hang động thạch nhũ tráng lệ nhất vịnh',
      'Tắm biển cát trắng và leo đài quan sát đảo Ti Tốp ngắm toàn cảnh 360 độ',
    ],
    flights: {
      nearestAirport: 'Sân bay Quốc tế Vân Đồn (VDO) & Cát Bi Hải Phòng (HPH)',
      airportCode: 'HPH',
      originOptions: [
        { code: 'SGN', name: 'TP. Hồ Chí Minh (SGN)' },
        { code: 'DAD', name: 'Đà Nẵng (DAD)' },
        { code: 'CXR', name: 'Nha Trang (CXR)' },
      ],
      roundtripPriceEstimate: '1.450.000 - 2.800.000 VNĐ / khứ hồi',
      onewayPriceEstimate: '750.000 - 1.450.000 VNĐ / chiều',
      flightDuration: 'Khoảng 2 giờ bay thẳng từ TP.HCM đến Cát Bi/Vân Đồn, sau đó đi cao tốc 35 phút đến Hạ Long',
      airlines: ['Vietnam Airlines', 'Vietjet Air', 'Bamboo Airways'],
      bookingAdvice: 'Nên đặt vé máy bay trước 2-3 tuần. Tuyến bay TP.HCM - Hải Phòng có tần suất dày đặc với mức giá rất tiết kiệm.',
    },
    hotels: {
      travelokaCityId: 'ha-long',
      tiers: [
        { category: 'Du thuyền 5 Sao & Resort Cao Cấp', priceRange: '2.400.000 - 6.500.000 VNĐ / đêm', description: 'Du thuyền vịnh đẳng cấp (Ambassador, Paradise, Mon Chéri) hoặc Vinpearl Resort & Spa Hạ Long view biển riêng biệt.' },
        { category: 'Khách sạn 3-4 Sao Trung tâm Bãi Cháy', priceRange: '750.000 - 1.600.000 VNĐ / đêm', description: 'Phòng ốc hiện đại, cách bãi tắm Bãi Cháy và phố ẩm thực đêm Sun World chỉ vài bước chân.' },
        { category: 'Khách sạn & Homestay Tiết Kiệm', priceRange: '300.000 - 550.000 VNĐ / đêm', description: 'Ấm cúng, thân thiện, thuận tiện thuê xe máy khám phá Hòn Gai và ngắm cầu Bãi Cháy.' },
      ],
      recommendedStays: [
        { name: 'Vinpearl Resort & Spa Hạ Long (Đảo Rều)', stars: 5, pricePerNight: '3.100.000 VNĐ', address: 'Đảo Rều, Bãi Cháy, TP. Hạ Long', features: ['Resort đảo độc lập', 'Hồ bơi vô cực', 'Cano đưa đón riêng', 'View 360 độ vịnh'] },
        { name: 'Khách Sạn Wyndham Legend Hạ Long', stars: 5, pricePerNight: '1.850.000 VNĐ', address: 'Số 12 đường Hạ Long, Bãi Cháy', features: ['View ngắm Cầu Bãi Cháy', 'Buffet quốc tế', 'Phòng gym & Spa', 'Gần cáp treo Nữ Hoàng'] },
        { name: 'Novotel Ha Long Bay Hotel', stars: 4, pricePerNight: '1.250.000 VNĐ', address: 'Đường Hạ Long, Bãi Cháy', features: ['Sát biển Bãi Cháy', 'Hồ bơi ngoài trời', 'Ban công view biển'] },
      ],
    },
    diningSpots: [
      { name: 'Chả Mực Thoan - Chợ Hạ Long 1', dish: 'Chả mực giã tay giòn sần sật, Bánh cuốn chả mực nóng hổi', address: 'Kiot 36-37 chợ Hạ Long 1, TP. Hạ Long', priceRange: '45.000 - 90.000 VNĐ / suất', openingHours: '06:00 - 18:00', rating: 4.9, highlightTip: 'Mực mai tươi rói giã tay tại chỗ, nên ăn kèm bánh cuốn nóng chấm mắm ớt tiêu thơm lừng.' },
      { name: 'Nhà Hàng Hải Sản Cua Vàng Bãi Cháy', dish: 'Cua biển hấp bia, Lẩu cua biển nấm, Tôm hùm bỏ lò phô mai', address: 'Số 32 Phan Chu Trinh, Bãi Cháy, TP. Hạ Long', priceRange: '250.000 - 500.000 VNĐ / người', openingHours: '09:00 - 22:30', rating: 4.8, highlightTip: 'Nổi tiếng với nồi đất nấu cua bí truyền, hải sản bơi tại bể tươi sống 100%.' },
      { name: 'Bún Bề Bề Cầu Trắng (Hòn Gai)', dish: 'Bún bề bề tôm nõn chua cay, mực ống tươi, nước dùng ngọt thanh', address: 'Khu Cầu Trắng, phường Hà Tu, TP. Hạ Long', priceRange: '40.000 - 65.000 VNĐ / bát', openingHours: '06:00 - 13:30', rating: 4.7, highlightTip: 'Bề bề tươi luộc róc vỏ béo ngậy, nước dùng nấu từ ghẹ và tôm thơm ngọt tự nhiên.' },
    ],
  },

  'hanoi-old-quarter': {
    gallery: [
      { url: hanoiImg, captionVi: 'Hồ Hoàn Kiếm thơ mộng - Trái tim nghìn năm văn hiến Thủ đô', captionEn: 'Sword Lake (Hoan Kiem) and Turtle Tower in autumn', captionKo: '호안끼엠 호수와 거북탑 - 천년 고도 하노이의 심장' },
      { url: hoangThanhImg, captionVi: 'Hoàng Thành Thăng Long - Di sản văn hóa thế giới', captionEn: 'Imperial Citadel of Thang Long UNESCO World Heritage', captionKo: '탕롱 황성 유네스코 세계문화유산' },
      { url: phoImg, captionVi: 'Phở bò gia truyền Hà Nội nước dùng thanh ngọt thơm hương hoa hồi', captionEn: 'Traditional Hanoi beef pho noodle soup', captionKo: '깊고 맑은 육수의 하노이 전통 쌀국수(Pho)' },
      { url: eggCoffeeImg, captionVi: 'Cà phê trứng béo ngậy phố cổ - Thức uống trứ danh quốc tế', captionEn: 'Iconic creamy Hanoi egg coffee in the Old Quarter', captionKo: '하노이 구시가지의 명물 달콤하고 부드러운 에그 커피' },
    ],
    ticketPriceInfo: 'Hồ Gươm & 36 Phố Phường: Miễn phí tham quan. Cầu Thê Húc & Đền Ngọc Sơn: 30.000 VNĐ. Văn Miếu Quốc Tử Giám: 70.000 VNĐ. Hoàng Thành Thăng Long: 70.000 VNĐ.',
    openingHoursInfo: 'Phố cổ mở cửa cả ngày đêm; Phố đi bộ Hồ Gươm hoạt động từ 19h00 tối thứ Sáu đến 24h00 Chủ Nhật hàng tuần.',
    highlightsList: [
      'Dạo bước phố cổ 36 phố phường rêu phong rộn rã',
      'Thưởng thức phở gánh Bát Đàn, bún chả Hương Liên và cà phê trứng Giảng',
      'Viếng Lăng Bác, tham quan Văn Miếu Quốc Tử Giám và Chùa Một Cột',
      'Ngồi xích lô vòng quanh Hồ Tây đón gió mát buổi chiều tà',
    ],
    flights: {
      nearestAirport: 'Sân bay Quốc tế Nội Bài (HAN)',
      airportCode: 'HAN',
      originOptions: [
        { code: 'SGN', name: 'TP. Hồ Chí Minh (SGN)' },
        { code: 'DAD', name: 'Đà Nẵng (DAD)' },
        { code: 'PQC', name: 'Phú Quốc (PQC)' },
        { code: 'CXR', name: 'Cam Ranh (CXR)' },
      ],
      roundtripPriceEstimate: '1.300.000 - 2.600.000 VNĐ / khứ hồi',
      onewayPriceEstimate: '650.000 - 1.350.000 VNĐ / chiều',
      flightDuration: '2 giờ bay thẳng từ TP.HCM, 1 giờ 15 phút từ Đà Nẵng; xe buýt/taxi 35 phút vào trung tâm',
      airlines: ['Vietnam Airlines', 'Vietjet Air', 'Bamboo Airways', 'Vietravel Airlines'],
      bookingAdvice: 'Các hãng bay liên tục có chương trình ưu đãi chặng vàng Hà Nội - TP.HCM với hàng chục chuyến bay mỗi ngày.',
    },
    hotels: {
      travelokaCityId: 'hanoi',
      tiers: [
        { category: 'Khách sạn 5 Sao Di Sản Cổ Điển', priceRange: '3.200.000 - 8.000.000 VNĐ / đêm', description: 'Sofitel Legend Metropole Hà Nội, Apricot Hotel view trọn vẹn Hồ Gươm quý phái kiến trúc Pháp.' },
        { category: 'Khách sạn Boutique 3-4 Sao Phố Cổ', priceRange: '700.000 - 1.800.000 VNĐ / đêm', description: 'Nằm ngay trong 36 phố phường, tiện dạo bộ ăn đêm, phòng ốc bài trí phong cách Đông Dương.' },
        { category: 'Homestay & Khách Sạn Tiết Kiệm', priceRange: '280.000 - 550.000 VNĐ / đêm', description: 'Phù hợp du khách tự do, phòng ấm cúng trên các con ngõ cổ rợp bóng cây.' },
      ],
      recommendedStays: [
        { name: 'Sofitel Legend Metropole Hanoi', stars: 5, pricePerNight: '5.200.000 VNĐ', address: 'Số 15 phố Ngô Quyền, Hoàn Kiếm', features: ['Di sản kiến trúc Pháp 1901', 'Hồ bơi nhiệt đới', 'Nhà hàng ẩm thực Michelin'] },
        { name: 'Apricot Hotel Hoàn Kiếm', stars: 5, pricePerNight: '2.600.000 VNĐ', address: 'Số 136 Hàng Trống, Hoàn Kiếm', features: ['Sát mép nước Hồ Gươm', 'Bể bơi tầng thượng', 'Trưng bày tác phẩm hội họa'] },
        { name: 'Hanoi La Siesta Classic Ma May', stars: 4, pricePerNight: '1.450.000 VNĐ', address: 'Số 94 phố Mã Mây, Hàng Buồm', features: ['Trung tâm phố đi bộ', 'Spa trị liệu truyền thống', 'Buffet sáng tuyệt ngon'] },
      ],
    },
    diningSpots: [
      { name: 'Phở Gia Truyền Bát Đàn', dish: 'Phở bò tái nạm, tái lăn nước dùng trong vắt ngọt thanh từ tủy bò', address: 'Số 49 Bát Đàn, Cửa Đông, Hoàn Kiếm', priceRange: '55.000 - 85.000 VNĐ / bát', openingHours: '06:00 - 10:00 & 18:00 - 20:30', rating: 4.8, highlightTip: 'Nên đến sớm từ 7h00 sáng để thưởng thức bát phở nóng hổi với quẩy giòn tan trứ danh.' },
      { name: 'Bún Chả Hương Liên (Bún Chả Obama)', dish: 'Bún chả than hoa kẹp que tre, Nem cua bể giòn rụm', address: 'Số 24 Lê Văn Hưu, Phan Chu Trinh, Hai Bà Trưng', priceRange: '50.000 - 90.000 VNĐ / suất', openingHours: '08:00 - 20:30', rating: 4.7, highlightTip: 'Quán ăn Tổng thống Mỹ Barack Obama từng dùng bữa năm 2016, chả nướng thơm lừng nước chấm chua ngọt.' },
      { name: 'Cafe Giảng 1946 (Cà Phê Trứng Nguyên Bản)', dish: 'Cà phê trứng nóng, Cà phê trứng đá, Cacao trứng', address: 'Ngõ 39 Nguyễn Hữu Huân, Lý Thái Tổ, Hoàn Kiếm', priceRange: '35.000 - 50.000 VNĐ / ly', openingHours: '07:00 - 22:00', rating: 4.9, highlightTip: 'Kem trứng đánh bông mịn như nhung phủ trên lớp cà phê phin đậm đà, dùng thìa nhỏ khuấy đều và nhâm nhi.' },
    ],
  },

  'sapa-terraces': {
    gallery: [
      { url: sapaImg, captionVi: 'Ruộng bậc thang Mường Hoa uốn lượn vàng óng mùa lúa chín', captionEn: 'Golden cascading rice terraces in Muong Hoa Valley', captionKo: '황금빛으로 물든 므엉호아 계곡의 계단식 논' },
      { url: lungCuImg, captionVi: 'Cung đường đèo Hoàng Liên Sơn mây phủ bồng bềnh', captionEn: 'Misty mountain passes of Hoang Lien Son range', captionKo: '구름이 감도는 황리엔선 산맥의 웅장한 드라이브 코스' },
      { url: hmongBatikCostumeImg, captionVi: 'Bản sắc hoa văn thổ cẩm sáp ong truyền thống người H’Mông Sa Pa', captionEn: 'Traditional Hmong handwoven batik indigo textiles', captionKo: '사파 몽족의 전통 쪽염색 및 바틱 직물 예술' },
    ],
    ticketPriceInfo: 'Cáp treo Fansipan Sun World: 850.000 VNĐ/người lớn. Vé tàu hỏa Mường Hoa: 150.000 VNĐ. Bản Cát Cát: 150.000 VNĐ. Thung lũng Mường Hoa: 80.000 VNĐ.',
    openingHoursInfo: 'Khu du lịch Fansipan mở cửa từ 07:30 - 17:30; các bản làng văn hóa mở cửa tự do ban ngày.',
    highlightsList: [
      'Chinh phục nóc nhà Đông Dương Fansipan cao 3.143m ngắm biển mây',
      'Check-in cung ruộng bậc thang đẹp nhất thế giới tại thung lũng Mường Hoa',
      'Trải nghiệm tắm lá thuốc cổ truyền người Dao đỏ tại bản Tả Phìn',
      'Dạo chợ đêm Sa Pa ăn đồ nướng than hoa và thắng cố ấm nóng',
    ],
    flights: {
      nearestAirport: 'Sân bay Quốc tế Nội Bài (HAN) sau đó đi cao tốc Nội Bài - Lào Cai',
      airportCode: 'HAN',
      originOptions: [
        { code: 'SGN', name: 'TP. Hồ Chí Minh (SGN)' },
        { code: 'DAD', name: 'Đà Nẵng (DAD)' },
        { code: 'PQC', name: 'Phú Quốc (PQC)' },
      ],
      roundtripPriceEstimate: '1.300.000 - 2.500.000 VNĐ / khứ hồi',
      onewayPriceEstimate: '650.000 - 1.300.000 VNĐ / chiều',
      flightDuration: 'Bay đến Hà Nội, sau đó xe Limousine giường nằm chạy êm ái trên cao tốc 4.5 - 5 giờ đến thẳng Sa Pa',
      airlines: ['Vietnam Airlines', 'Vietjet Air', 'Bamboo Airways'],
      bookingAdvice: 'Nên kết hợp đặt combo Vé máy bay về Hà Nội + Xe Limousine VIP đi Sa Pa trên Traveloka để nhận ưu đãi lên đến 30%.',
    },
    hotels: {
      travelokaCityId: 'sa-pa',
      tiers: [
        { category: 'Resort 5 Sao Sang Trọng View Núi', priceRange: '2.500.000 - 7.000.000 VNĐ / đêm', description: 'Topas Ecolodge (resort đẹp nhất National Geographic), Hotel de la Coupole - MGallery kiến trúc lộng lẫy.' },
        { category: 'Khách sạn 3-4 Sao Trung tâm Thị Trấn', priceRange: '700.000 - 1.500.000 VNĐ / đêm', description: 'Gần Nhà thờ Đá, view thung lũng Mường Hoa và ga tàu hỏa leo núi.' },
        { category: 'Ecolodge & Homestay Bản Làng', priceRange: '300.000 - 650.000 VNĐ / đêm', description: 'Trải nghiệm sống cùng người bản địa tại Tả Van, Ý Linh Hồ, sáng thức giấc giữa biển mây.' },
      ],
      recommendedStays: [
        { name: 'Hotel de la Coupole - MGallery Sapa', stars: 5, pricePerNight: '3.300.000 VNĐ', address: 'Số 1 Hoàng Liên, TT. Sa Pa', features: ['Kiến trúc Pháp hòa quyện thổ cẩm', 'Bể bơi nước nóng trong nhà', 'Kết nối trực tiếp ga Fansipan'] },
        { name: 'Topas Ecolodge Sapa', stars: 5, pricePerNight: '5.400.000 VNĐ', address: 'Xã Thanh Bình, Sa Pa', features: ['Hồ bơi vô cực view ruộng bậc thang', 'Bungalow đá tự nhiên', 'Biệt lập giữa thiên nhiên'] },
        { name: 'Silk Path Grand Resort & Spa Sapa', stars: 5, pricePerNight: '2.100.000 VNĐ', address: 'Đồi Quan Chuẩn, TT. Sa Pa', features: ['Vườn hồng cổ ngát hương', 'Tầm nhìn đỉnh Fansipan', 'Spa thảo dược Dao Đỏ'] },
      ],
    },
    diningSpots: [
      { name: 'Nhà Hàng A Quỳnh Sapa - Ẩm Thực Vùng Cao', dish: 'Thắng cố ngựa truyền thống, Lẩu cá hồi cá tầm Na Hang, Gà đen nướng mật ong', address: 'Số 15 Thạch Sơn, TT. Sa Pa', priceRange: '150.000 - 300.000 VNĐ / người', openingHours: '08:00 - 23:00', rating: 4.8, highlightTip: 'Thắng cố nấu chuẩn vị với thảo quả rừng thơm lừng, thịt cá tầm tươi giòn nhúng lẩu chua cay tuyệt hảo.' },
      { name: 'Quán Nướng Phố Cổ Cầu Mây', dish: 'Thịt xiên nướng mắc khén, Cơm lam nướng ống tre, Nấm hương nướng phô mai', address: 'Dọc phố Cầu Mây & phố Fansipan, Sa Pa', priceRange: '50.000 - 120.000 VNĐ / người', openingHours: '16:00 - 23:30', rating: 4.7, highlightTip: 'Thời tiết Sa Pa se lạnh, ngồi bên bếp than hoa đỏ rực ăn thịt cuốn cải mèo và chấm chẩm chéo.' },
      { name: 'Nhà Hàng Cá Hồi Vua Sa Pa', dish: 'Sashimi cá hồi Sapa tươi sống, Cá hồi chiên giòn sốt chanh leo, Da cá hồi chiên xù', address: 'Số 15 Lê Văn Tám, TT. Sa Pa', priceRange: '200.000 - 350.000 VNĐ / người', openingHours: '09:00 - 22:00', rating: 4.8, highlightTip: 'Cá hồi nuôi tại chân núi Hoàng Liên Sơn nước lạnh ngọt thịt, dai và giàu dinh dưỡng.' },
    ],
  },

  'ninh-binh-trangan': {
    gallery: [
      { url: tranganImg, captionVi: 'Tràng An non xanh nước biếc - Di sản hỗn hợp kép đầu tiên Đông Nam Á', captionEn: 'Trang An dual UNESCO Heritage emerald waterways', captionKo: '동남아 최초 유네스코 복합유산 짱안의 수려한 산수' },
      { url: halongImg, captionVi: 'Hang động karst kỳ bí lướt thuyền nan qua sông Sào Khê', captionEn: 'Traditional rowboat journey through limestone caves', captionKo: '사오케강을 따라 석회암 수중 동굴을 지나는 나룻배 투어' },
      { url: hoangThanhImg, captionVi: 'Cố đô Hoa Lư ngàn năm với đền thờ Vua Đinh, Vua Lê', captionEn: 'Hoa Lu Ancient Capital temples of King Dinh and King Le', captionKo: '딘 왕조와 레 왕조의 천년 역사 사원 호아루 고도' },
    ],
    ticketPriceInfo: 'Vé thuyền Tràng An: 250.000 VNĐ/người (tuyến 1, 2 hoặc 3 gồm thuyền nan và áo phao). Hang Múa: 100.000 VNĐ. Tam Cốc - Bích Động: 250.000 VNĐ (vé thắng cảnh + đò).',
    openingHoursInfo: 'Bến thuyền Tràng An mở từ 06:30 - 17:00 hàng ngày.',
    highlightsList: [
      'Đi thuyền nan luồn qua các hang động thủy xuyên kỳ ảo (Hang Tối, Hang Sáng, Hang Nấu Rượu)',
      'Leo 500 bậc đá đỉnh Hang Múa ngắm trọn thung lũng lúa Tam Cốc đẹp mê hồn',
      'Chiêm bái Chùa Bái Đính - ngôi chùa giữ nhiều kỷ lục nhất Đông Nam Á',
      'Thưởng thức đặc sản cơm cháy giòn rụm và dê núi nướng tảng',
    ],
    flights: {
      nearestAirport: 'Sân bay Quốc tế Nội Bài (HAN) sau đó đi cao tốc Pháp Vân - Cầu Giẽ - Ninh Bình',
      airportCode: 'HAN',
      originOptions: [
        { code: 'SGN', name: 'TP. Hồ Chí Minh (SGN)' },
        { code: 'DAD', name: 'Đà Nẵng (DAD)' },
        { code: 'CXR', name: 'Nha Trang (CXR)' },
      ],
      roundtripPriceEstimate: '1.250.000 - 2.400.000 VNĐ / khứ hồi',
      onewayPriceEstimate: '620.000 - 1.250.000 VNĐ / chiều',
      flightDuration: 'Bay đến Hà Nội (2 giờ), sau đó đi xe Limousine êm ái trên cao tốc chỉ 1 giờ 15 phút đến thẳng Ninh Bình',
      airlines: ['Vietnam Airlines', 'Vietjet Air', 'Bamboo Airways'],
      bookingAdvice: 'Ninh Bình rất gần Hà Nội nên du khách phương xa chỉ cần bay đến Nội Bài là có xe đón tận nơi tới resort.',
    },
    hotels: {
      travelokaCityId: 'ninh-binh',
      tiers: [
        { category: 'Resort Sinh Thái Nghỉ Dưỡng 4-5 Sao', priceRange: '1.800.000 - 4.500.000 VNĐ / đêm', description: 'Emeralda Resort Ninh Binh (làng quê Bắc Bộ cổ), Ninh Binh Hidden Charm Hotel & Resort.' },
        { category: 'Boutique Hotel & Ecolodge Ven Sông', priceRange: '650.000 - 1.400.000 VNĐ / đêm', description: 'View ngắm rặng núi đá vôi Tam Cốc, hồ bơi ngoài trời giữa thiên nhiên.' },
        { category: 'Homestay Thân Thiện Gia Đình', priceRange: '280.000 - 550.000 VNĐ / đêm', description: 'Cung cấp xe đạp miễn phí dạo quanh đồng lúa, không khí thanh bình trong lành.' },
      ],
      recommendedStays: [
        { name: 'Emeralda Resort Ninh Binh', stars: 5, pricePerNight: '2.450.000 VNĐ', address: 'Khu bảo tồn Vân Long, Gia Viễn', features: ['Không gian làng quê Bắc Bộ xưa', 'Biệt thự mái ngói hồ sen', '2 hồ bơi rộng lớn'] },
        { name: 'Ninh Binh Hidden Charm Hotel & Resort', stars: 4, pricePerNight: '1.550.000 VNĐ', address: 'Bến thuyền Tam Cốc, Hoa Lư', features: ['Cách bến thuyền 200m', 'Phòng view núi đá vôi', 'Nhà hàng ẩm thực cung đình'] },
        { name: 'Tràng An Retreat Ecolodge', stars: 3, pricePerNight: '850.000 VNĐ', address: 'Thôn Tràng An, Trường Yên, Hoa Lư', features: ['Hồ bơi tự nhiên tựa lưng núi', 'Xe đạp miễn phí', 'Bữa sáng đậm đà'] },
      ],
    },
    diningSpots: [
      { name: 'Nhà Hàng Dê Núi Chính Thư', dish: 'Dê núi tái chanh, Dê nướng tảng thơm lừng lá móc mật, Cơm cháy chấm nước sốt tim cật', address: 'Thôn Khê Thượng, xã Ninh Xuân, Hoa Lư', priceRange: '130.000 - 250.000 VNĐ / người', openingHours: '08:30 - 22:00', rating: 4.8, highlightTip: 'Dê leo núi đá ăn lá thuốc nên thịt chắc, thơm ngậy và không hề có mùi gây.' },
      { name: 'Nhà Hàng Thăng Long Tràng An', dish: 'Cơm cháy ruốc thơm giòn, Dê xào lăn sả ớt, Canh ngọc dương bồi bổ', address: 'Tràng An, Trường Yên, Hoa Lư', priceRange: '120.000 - 220.000 VNĐ / người', openingHours: '09:00 - 21:30', rating: 4.7, highlightTip: 'Cơm cháy nếp hương đóng túi mua về làm quà đặc sản số 1 Ninh Bình.' },
      { name: 'Miến Lươn Bà Phấn Ninh Bình', dish: 'Miến lươn xào giòn, Miến lươn nước nấu hoa chuối thơm bùi', address: 'Số 999 Trần Hưng Đạo, TP. Ninh Bình', priceRange: '35.000 - 60.000 VNĐ / bát', openingHours: '06:00 - 20:00', rating: 4.9, highlightTip: 'Lươn đồng béo vàng ươm, nước dùng ninh từ xương lươn sánh ngọt đậm đà gia truyền 3 đời.' },
    ],
  },

  'phong-nha-ke-bang': {
    gallery: [
      { url: phongnhaImg, captionVi: 'Vương quốc hang động Phong Nha - Kẻ Bàng kỳ vĩ bậc nhất thế giới', captionEn: 'Phong Nha Ke Bang National Park limestone cave kingdom', captionKo: '세계 최대의 석회암 동굴 왕국 퐁냐케방 국립공원' },
      { url: tranganImg, captionVi: 'Động Thiên Đường - Hoàng cung trong lòng đất thạch nhũ lung linh', captionEn: 'Paradise Cave palace of stalactites and stalagmites', captionKo: '지하의 궁전으로 불리는 파라다이스(천당) 동굴의 종유석' },
      { url: hoangsaImg, captionVi: 'Sông Chày xanh biếc & hang Tối thám hiểm đu dây zipline', captionEn: 'Chay River turquoise waters and Dark Cave zipline adventure', captionKo: '에메랄드빛 차이강과 짚라인 동굴 탐험' },
    ],
    ticketPriceInfo: 'Động Phong Nha: 150.000 VNĐ + thuyền 550.000 VNĐ/thuyền (chở tối đa 12 người). Động Thiên Đường: 250.000 VNĐ. Sông Chày - Hang Tối: 450.000 VNĐ trọn gói tắm bùn zipline.',
    openingHoursInfo: 'Mở cửa từ 07:30 - 16:30 hàng ngày.',
    highlightsList: [
      'Du thuyền trên sông Son ngắm làng quê thanh bình tiến vào động Phong Nha',
      'Chiêm ngưỡng vòm thạch nhũ Động Thiên Đường dài 31km kỳ vĩ',
      'Tắm bùn khoáng tự nhiên trong Hang Tối và đu zipline vượt sông Chày',
      'Thám hiểm rừng nguyên sinh karst cổ nhất châu Á 400 triệu năm tuổi',
    ],
    flights: {
      nearestAirport: 'Sân bay Đồng Hới (VDH), Quảng Bình',
      airportCode: 'VDH',
      originOptions: [
        { code: 'HAN', name: 'Hà Nội (HAN)' },
        { code: 'SGN', name: 'TP. Hồ Chí Minh (SGN)' },
      ],
      roundtripPriceEstimate: '1.200.000 - 2.500.000 VNĐ / khứ hồi',
      onewayPriceEstimate: '600.000 - 1.250.000 VNĐ / chiều',
      flightDuration: 'Chỉ 1 giờ bay thẳng từ Hà Nội hoặc 1 giờ 30 phút từ TP.HCM, sau đó đi xe 40 phút đến Phong Nha',
      airlines: ['Vietnam Airlines', 'Vietjet Air', 'Bamboo Airways'],
      bookingAdvice: 'Sân bay Đồng Hới nằm rất gần biển Nhật Lệ và Phong Nha, đặt trước 2 tuần luôn có giá tốt.',
    },
    hotels: {
      travelokaCityId: 'dong-hoi',
      tiers: [
        { category: 'Resort Biển & Khách Sạn 4-5 Sao', priceRange: '1.400.000 - 3.500.000 VNĐ / đêm', description: 'Sun Spa Resort Quảng Bình, Gold Coast Hotel Resort & Spa bên bờ biển Bảo Ninh.' },
        { category: 'Ecolodge & Khách sạn Phong Nha', priceRange: '600.000 - 1.300.000 VNĐ / đêm', description: 'Phong Nha Lake House, Chay Lap Farmstay nằm ngay bên bờ sông mát lành.' },
        { category: 'Homestay Sinh Thái Làng Quê', priceRange: '250.000 - 500.000 VNĐ / đêm', description: 'Thân thiện, nhiều khách du lịch ba lô quốc tế, view đồng cỏ và rặng núi đá vôi.' },
      ],
      recommendedStays: [
        { name: 'Chay Lap Farmstay & Resort', stars: 4, pricePerNight: '1.450.000 VNĐ', address: 'Xã Phúc Trạch, Bố Trạch, Quảng Bình', features: ['Nằm cạnh sông Chày', 'Khu chèo thuyền kayak riêng', 'Vườn hữu cơ xanh mướt'] },
        { name: 'Sun Spa Resort & Villa Quảng Bình', stars: 5, pricePerNight: '1.950.000 VNĐ', address: 'Bán đảo Bảo Ninh, TP. Đồng Hới', features: ['Resort 3 mặt giáp biển và sông', 'Bãi biển riêng biệt', 'Hồ bơi phong cách nhiệt đới'] },
        { name: 'Phong Nha Lake House Resort', stars: 3, pricePerNight: '850.000 VNĐ', address: 'Hồ Đồng Suôn, Khương Hà, Bố Trạch', features: ['View hồ nước xanh ngắt', 'Nhà hàng ẩm thực địa phương', 'Xe đạp dạo quanh hồ'] },
      ],
    },
    diningSpots: [
      { name: 'Nhà Hàng Cơm Quê Phong Nha (Tuấn Ngọc)', dish: 'Gà đồi nướng chấm muối cheo thơm nồng, Cá trắm sông Son om măng chua', address: 'ĐT20, TT. Phong Nha, Bố Trạch', priceRange: '90.000 - 180.000 VNĐ / người', openingHours: '09:00 - 22:00', rating: 4.8, highlightTip: 'Gà thả đồi thịt dai ngọt chấm với "muối cheo" - loại muối ớt giã lá lốt rừng đặc trưng Quảng Bình.' },
      { name: 'Cháo Canh Gia Bảo Đồng Hới', dish: 'Cháo canh cá lóc tươi rói, Ram rán giòn tan ăn kèm', address: 'Số 08 Lý Thường Kiệt, TP. Đồng Hới', priceRange: '30.000 - 50.000 VNĐ / tô', openingHours: '06:00 - 12:30', rating: 4.9, highlightTip: 'Sợi bánh canh bột mì dai mềm nấu cùng cá lóc ngọt thịt, ăn kèm cây ram chiên giòn thơm nức mũi.' },
      { name: 'Nhà Hàng Hải Sản Mệ Toại Bảo Ninh', dish: 'Mực nhảy nướng than hoa, Đẻn biển xào lăn, Cháo hàu Quảng sinh', address: 'Đường biển Bảo Ninh, TP. Đồng Hới', priceRange: '150.000 - 300.000 VNĐ / người', openingHours: '10:00 - 23:00', rating: 4.7, highlightTip: 'Hải sản bắt sống từ thuyền ngư dân cập bến buổi chiều, mực tươi chớp nháy ngọt lịm.' },
    ],
  },

  'hue-ancient-capital': {
    gallery: [
      { url: hueThienMuImg, captionVi: 'Chùa Thiên Mụ cổ kính 400 năm soi bóng dòng sông Hương êm đềm', captionEn: 'Thien Mu Pagoda reflecting on poetic Perfume River', captionKo: '흐엉강변에 고요히 자리한 400년 역사의 티엔무 사원' },
      { url: hueCitadelImg, captionVi: 'Đại Nội Hoàng Thành Huế - Trái tim vương triều nhà Nguyễn', captionEn: 'Imperial Citadel of Hue UNESCO World Heritage', captionKo: '응우옌 왕조의 심장부 유네스코 유산 후에 황궁' },
      { url: bunBoHueImg, captionVi: 'Bún bò Huế chuẩn vị cố đô cay nồng hương sả và mắm ruốc', captionEn: 'Authentic spicy Hue beef noodle soup', captionKo: '레몬글라스와 특제 소스로 끓인 원조 분보후에' },
    ],
    ticketPriceInfo: 'Đại Nội Huế: 200.000 VNĐ. Lăng vua Khải Định: 150.000 VNĐ. Lăng vua Tự Đức: 150.000 VNĐ. Vé combo 3 điểm (Đại Nội + 2 Lăng): 420.000 VNĐ. Nghe Ca Huế trên thuyền rồng: 100.000 - 150.000 VNĐ.',
    openingHoursInfo: 'Đại Nội Huế mở cửa từ 07:00 - 17:30; Ca Huế trên sông Hương biểu diễn từ 19:00 - 21:00 hàng đêm.',
    highlightsList: [
      'Khám phá Điện Thái Hòa, Tử Cấm Thành và các cung điện vàng son triều Nguyễn',
      'Chiêm ngưỡng nghệ thuật ghép sành sứ đỉnh cao tại Lăng Vua Khải Định',
      'Đi thuyền rồng thả hoa đăng và nghe biểu diễn di sản Nhã nhạc Cung đình',
      'Thưởng thức ẩm thực hoàng gia và các món chè hẻm 20 món nức tiếng xứ Huế',
    ],
    flights: {
      nearestAirport: 'Sân bay Quốc tế Phú Bài (HUI), Thừa Thiên Huế',
      airportCode: 'HUI',
      originOptions: [
        { code: 'HAN', name: 'Hà Nội (HAN)' },
        { code: 'SGN', name: 'TP. Hồ Chí Minh (SGN)' },
      ],
      roundtripPriceEstimate: '1.200.000 - 2.300.000 VNĐ / khứ hồi',
      onewayPriceEstimate: '600.000 - 1.150.000 VNĐ / chiều',
      flightDuration: '1 giờ 15 phút từ Hà Nội hoặc 1 giờ 25 phút từ TP.HCM, sau đó đi taxi 20 phút vào trung tâm Huế',
      airlines: ['Vietnam Airlines', 'Vietjet Air', 'Bamboo Airways'],
      bookingAdvice: 'Sân bay Phú Bài vừa khánh thành nhà ga T2 hiện đại, các chặng bay nội địa luôn sẵn vé giá tốt.',
    },
    hotels: {
      travelokaCityId: 'hue',
      tiers: [
        { category: 'Khách sạn Di Sản Hoàng Gia 5 Sao', priceRange: '1.800.000 - 4.500.000 VNĐ / đêm', description: 'Azerai La Residence Hue (dinh thự Thống sứ Pháp xưa), Silk Path Grand Hue Hotel.' },
        { category: 'Khách sạn 3-4 Sao Trung Tâm Ven Sông', priceRange: '600.000 - 1.400.000 VNĐ / đêm', description: 'Nằm ngay phố đi bộ Chu Văn An, ngắm dòng sông Hương thơ mộng.' },
        { category: 'Nhà Rường Cổ & Homestay', priceRange: '250.000 - 500.000 VNĐ / đêm', description: 'Trải nghiệm không gian nhà vườn Kim Long thanh tịnh, trà sen và mứt gừng.' },
      ],
      recommendedStays: [
        { name: 'Azerai La Residence Hue', stars: 5, pricePerNight: '3.600.000 VNĐ', address: 'Số 5 Lê Lợi, TP. Huế', features: ['Dinh thự nghệ thuật Art Deco', 'Hồ bơi nước mặn hướng sông Hương', 'Vườn nhiệt đới rộng lớn'] },
        { name: 'Silk Path Grand Hue Hotel', stars: 5, pricePerNight: '1.850.000 VNĐ', address: 'Số 2 Lê Lợi, Vĩnh Ninh, TP. Huế', features: ['Kiến trúc quý phái cung đình', 'Nhà hàng ẩm thực hoàng gia', 'Gần cầu Tràng Tiền'] },
        { name: 'Khách Sạn Mường Thanh Holiday Huế', stars: 4, pricePerNight: '950.000 VNĐ', address: 'Số 38 Lê Lợi, TP. Huế', features: ['Sát bến thuyền Tòa Khâm', 'View toàn cảnh sông Hương', 'Giá phòng hợp lý'] },
      ],
    },
    diningSpots: [
      { name: 'Bún Bò Huế Mụ Rơi', dish: 'Bún bò bắp hoa, giò heo ninh mềm, chả cua quết tay thơm lừng', address: 'Số 40 Nguyễn Chí Diểu, Thuận Thành, TP. Huế', priceRange: '35.000 - 55.000 VNĐ / tô', openingHours: '06:30 - 10:30 sáng', rating: 4.9, highlightTip: 'Nước dùng trong nhưng đậm đà cay nồng mùi sả và ruốc thơm phức chuẩn vị người Huế xưa.' },
      { name: 'Quán Bánh Bèo - Nậm - Lọc Bà Đỏ', dish: 'Bánh bèo chén tôm chấy, Bánh nậm gói lá dong, Bánh lọc tôm thịt giòn dai', address: 'Số 8 Nguyễn Bỉnh Khiêm, Phú Cát, TP. Huế', priceRange: '30.000 - 70.000 VNĐ / suất', openingHours: '08:00 - 21:00', rating: 4.8, highlightTip: 'Bánh bèo chén đất nung nhỏ xinh rắc tóp mỡ giòn rụm chan nước mắm ớt cay ngọt ngon mê ly.' },
      { name: 'Chè Hẻm Cố Đô Hùng Vương', dish: 'Chè bột lọc bọc heo quay mặn ngọt lạ miệng, Chè hạt sen long nhãn', address: 'Kiệt 29 đường Hùng Vương, Phú Hội, TP. Huế', priceRange: '15.000 - 25.000 VNĐ / ly', openingHours: '10:00 - 22:00', rating: 4.8, highlightTip: 'Chè heo quay là sáng tạo độc nhất vô nhị xứ Huế, bột lọc dẻo dai bọc thịt heo quay giòn mặn ngọt hòa quyện.' },
    ],
  },

  'hoi-an-ancient-town': {
    gallery: [
      { url: hoianImg, captionVi: 'Phố cổ Hội An rực rỡ sắc đèn lồng lung linh bên dòng sông Hoài', captionEn: 'Hoi An lantern lit ancient streets by Hoai River', captionKo: '호아이 강변에 오색 등불이 빛나는 호이안 구시가지' },
      { url: banhMiImg, captionVi: 'Bánh Mì Phượng Hội An - Bánh mì ngon nhất thế giới', captionEn: 'World-famous Banh Mi Phuong in Hoi An', captionKo: '세계 최고로 손꼽히는 호이안의 반미 프엉' },
      { url: mySonImg, captionVi: 'Thánh địa Mỹ Sơn - Quần thể đền tháp Chăm Pa huyền bí gần Hội An', captionEn: 'My Son Sanctuary mystical Hindu Cham temples', captionKo: '신비로운 힌두 참파 문명의 미선 유적지' },
    ],
    ticketPriceInfo: 'Vé tham quan phố cổ Hội An: 120.000 VNĐ/khách quốc tế, 80.000 VNĐ/khách Việt (bao gồm 5 điểm di tích cổ, Chùa Cầu, nhà cổ Tấn Ký, hội quán Phúc Kiến). Đi thuyền thả hoa đăng: 150.000 - 200.000 VNĐ/thuyền.',
    openingHoursInfo: 'Phố đi bộ cấm xe cơ giới từ 09:00 - 11:00 & 15:00 - 21:30 hàng ngày.',
    highlightsList: [
      'Check-in Chùa Cầu Nhật Bản biểu tượng 400 năm tuổi',
      'Đi thuyền gỗ thả đèn hoa đăng cầu may mắn trên dòng sông Hoài thơ mộng',
      'Khám phá nhà cổ Tấn Ký, Phùng Hưng và các hội quán Phúc Kiến rực rỡ',
      'Thưởng thức đặc sản Cao Lầu, bánh bao bánh vạc và bánh mì Phượng',
    ],
    flights: {
      nearestAirport: 'Sân bay Quốc tế Đà Nẵng (DAD), cách Hội An 30km (40 phút xe)',
      airportCode: 'DAD',
      originOptions: [
        { code: 'HAN', name: 'Hà Nội (HAN)' },
        { code: 'SGN', name: 'TP. Hồ Chí Minh (SGN)' },
        { code: 'CXR', name: 'Nha Trang (CXR)' },
        { code: 'HPH', name: 'Hải Phòng (HPH)' },
      ],
      roundtripPriceEstimate: '1.200.000 - 2.400.000 VNĐ / khứ hồi',
      onewayPriceEstimate: '600.000 - 1.200.000 VNĐ / chiều',
      flightDuration: '1 giờ 15 phút từ Hà Nội / TP.HCM đến Đà Nẵng, sau đó đi taxi/xe đưa đón 40 phút tới Hội An',
      airlines: ['Vietnam Airlines', 'Vietjet Air', 'Bamboo Airways', 'Vietravel Airlines'],
      bookingAdvice: 'Hội An dùng chung sân bay Đà Nẵng với tần suất bay hàng chục chuyến mỗi ngày, cực kỳ thuận tiện.',
    },
    hotels: {
      travelokaCityId: 'hoi-an',
      tiers: [
        { category: 'Resort 5 Sao Indochine Ven Biển & Ven Sông', priceRange: '2.500.000 - 8.000.000 VNĐ / đêm', description: 'Four Seasons Resort The Nam Hai, Anantara Hoi An Resort ven sông Hoài thơ mộng.' },
        { category: 'Khách sạn Boutique 3-4 Sao Phố Cổ', priceRange: '750.000 - 1.800.000 VNĐ / đêm', description: 'Hồ bơi xanh mát, phong cách Indochine hoài niệm, có xe đạp miễn phí đi dạo.' },
        { category: 'Homestay Vườn Xanh Làng Rau Trà Quế', priceRange: '300.000 - 600.000 VNĐ / đêm', description: 'Không gian xanh mướt, yên bình, cách biển An Bàng chỉ vài phút xe đạp.' },
      ],
      recommendedStays: [
        { name: 'Anantara Hoi An Resort', stars: 5, pricePerNight: '3.800.000 VNĐ', address: 'Số 1 Phạm Hồng Thái, Cẩm Châu, Hội An', features: ['Ven bờ sông Thu Bồn', 'Hồ bơi nhiệt đới', 'Đi bộ 5 phút vào phố cổ'] },
        { name: 'La Siesta Hoi An Resort & Spa', stars: 5, pricePerNight: '2.200.000 VNĐ', address: 'Số 130 Hùng Vương, Cẩm Phô, Hội An', features: ['4 hồ bơi siêu đẹp', 'View cánh đồng thanh bình', 'Dịch vụ chuẩn 5 sao'] },
        { name: 'Hoi An Ancient House Resort', stars: 4, pricePerNight: '1.100.000 VNĐ', address: 'Số 377 Cửa Đại, Hội An', features: ['Kiến trúc nhà cổ truyền thống', 'Hồ bơi nước trong vắt', 'Xe đạp miễn phí'] },
      ],
    },
    diningSpots: [
      { name: 'Bánh Mì Phượng Hội An', dish: 'Bánh mì thập cẩm pate sốt bơ trứng, Bánh mì thịt nướng sả ớt', address: 'Số 2B Phan Châu Trinh, Cẩm Châu, Hội An', priceRange: '30.000 - 45.000 VNĐ / ổ', openingHours: '06:30 - 21:00', rating: 4.9, highlightTip: 'Được đầu bếp huyền thoại Anthony Bourdain ca ngợi là "bản giao hưởng bánh mì trong miệng".' },
      { name: 'Cao Lầu Thanh Hội An', dish: 'Mì Cao Lầu sợi vàng dai giòn, Thịt xá xíu đậm đà, Da heo chiên phồng', address: 'Số 26 Thái Phiên, Minh An, Hội An', priceRange: '35.000 - 50.000 VNĐ / tô', openingHours: '07:00 - 19:00', rating: 4.8, highlightTip: 'Nước nhào bột lấy từ giếng cổ Bá Lễ, tro ngâm củi Cù Lao Chàm tạo nên sợi mì vàng độc nhất vô nhị.' },
      { name: 'Cơm Gà Bà Buội', dish: 'Cơm gà xé vàng óng, Gỏi gà xé hành tây chua ngọt, Lòng mề gà xào nghệ', address: 'Số 22 Phan Châu Trinh, Hội An', priceRange: '45.000 - 65.000 VNĐ / đĩa', openingHours: '10:30 - 20:30', rating: 4.7, highlightTip: 'Gạo nấu bằng nước luộc gà thơm nức màu vàng mơ, thịt gà ta thả vườn chắc nịch.' },
    ],
  },

  'da-nang-city': {
    gallery: [
      { url: danangImg, captionVi: 'Cầu Vàng Bà Nà Hills - Dải lụa vàng giữa mây trời Đà Nẵng', captionEn: 'Golden Bridge held by giant stone hands in Ba Na Hills', captionKo: '거대한 돌손이 받치고 있는 바나힐 골든 브릿지' },
      { url: miQuangImg, captionVi: 'Mì Quảng ếch Đà Nẵng đậm đà hương vị xứ Quảng', dish: 'Mì Quảng', captionEn: 'Authentic Da Nang Mi Quang turmeric noodles', captionKo: '다낭 전통 미꽝 국수와 바삭한 라이스페이퍼' },
      { url: mySonImg, captionVi: 'Danh thắng Ngũ Hành Sơn 5 ngọn núi kỳ vĩ ven biển Mỹ Khê', captionEn: 'Marble Mountains sacred caves and stone craftsmanship', captionKo: '오행산 동굴 사원과 대리석 조각 예술' },
    ],
    ticketPriceInfo: 'Vé Sun World Bà Nà Hills: 900.000 VNĐ/người lớn (bao gồm cáp treo 2 chiều và Cầu Vàng). Ngũ Hành Sơn: 40.000 VNĐ. Thang máy: 15.000 VNĐ. Công viên Châu Á Asia Park: Miễn phí vào cửa.',
    openingHoursInfo: 'Bà Nà Hills: 07:30 - 21:00; Cầu Rồng phun lửa: 21h00 tối thứ Bảy và Chủ Nhật hàng tuần.',
    highlightsList: [
      'Check-in Cầu Vàng Bà Nà Hills kỳ quan kiến trúc thế giới',
      'Tắm biển cát trắng mịn màng tại Bãi biển Mỹ Khê',
      'Chiêm ngưỡng Cầu Rồng phun lửa và phun nước rực rỡ cuối tuần',
      'Khám phá bán đảo Sơn Trà và viếng Chùa Linh Ứng ngắm tượng Phật Bà 67m',
    ],
    flights: {
      nearestAirport: 'Sân bay Quốc tế Đà Nẵng (DAD) ngay trung tâm thành phố',
      airportCode: 'DAD',
      originOptions: [
        { code: 'HAN', name: 'Hà Nội (HAN)' },
        { code: 'SGN', name: 'TP. Hồ Chí Minh (SGN)' },
        { code: 'PQC', name: 'Phú Quốc (PQC)' },
        { code: 'HPH', name: 'Hải Phòng (HPH)' },
      ],
      roundtripPriceEstimate: '1.150.000 - 2.200.000 VNĐ / khứ hồi',
      onewayPriceEstimate: '580.000 - 1.150.000 VNĐ / chiều',
      flightDuration: '1 giờ 15 phút từ Hà Nội / TP.HCM; sân bay chỉ cách biển Mỹ Khê 10 phút taxi',
      airlines: ['Vietnam Airlines', 'Vietjet Air', 'Bamboo Airways', 'Vietravel Airlines'],
      bookingAdvice: 'Sân bay nằm ngay trung tâm thành phố nên chi phí di chuyển cực kỳ tiết kiệm.',
    },
    hotels: {
      travelokaCityId: 'da-nang',
      tiers: [
        { category: 'Resort 5 Sao & Khách sạn Biển Sang Trọng', priceRange: '2.000.000 - 7.500.000 VNĐ / đêm', description: 'InterContinental Danang Sun Peninsula Resort, Furama Resort Danang, Premier Village view trọn vẹn biển Mỹ Khê.' },
        { category: 'Khách sạn 4 Sao Trực Diện Biển Mỹ Khê', priceRange: '800.000 - 1.800.000 VNĐ / đêm', description: 'Bể bơi vô cực trên tầng thượng ngắm bình minh biển, phòng ốc mới tinh.' },
        { category: 'Khách sạn 3 Sao & Căn Hộ Dịch Vụ', priceRange: '350.000 - 700.000 VNĐ / đêm', description: 'Tiện nghi đầy đủ, gần cầu Rồng và chợ đêm Sơn Trà náo nhiệt.' },
      ],
      recommendedStays: [
        { name: 'InterContinental Danang Sun Peninsula Resort', stars: 5, pricePerNight: '8.500.000 VNĐ', address: 'Bán đảo Sơn Trà, TP. Đà Nẵng', features: ['Resort sang trọng nhất thế giới', 'Bãi biển riêng tư', 'Kiến trúc Bill Bensley'] },
        { name: 'TMS Hotel Da Nang Beach', stars: 5, pricePerNight: '1.650.000 VNĐ', address: 'Số 292 Võ Nguyên Giáp, Mỹ An', features: ['Hồ bơi vô cực tầng 25', 'Trực diện bãi biển Mỹ Khê', 'Buffet sáng phong phú'] },
        { name: 'Haian Beach Hotel & Spa', stars: 4, pricePerNight: '1.200.000 VNĐ', address: 'Số 278 Võ Nguyên Giáp, Ngũ Hành Sơn', features: ['View biển Mỹ Khê tuyệt đẹp', 'Sky bar sôi động', 'Bữa sáng khay nổi hồ bơi'] },
      ],
    },
    diningSpots: [
      { name: 'Bánh Tráng Cuốn Thịt Heo Bà Mua', dish: 'Thịt heo hai đầu da luộc mềm ngậy, Bánh tráng phơi sương, Mắm nêm cá cơm đậm đà', address: 'Số 19-21 Trần Bình Trọng, Hải Châu, TP. Đà Nẵng', priceRange: '45.000 - 80.000 VNĐ / suất', openingHours: '06:30 - 22:00', rating: 4.8, highlightTip: 'Cuốn kèm đĩa rau thơm 15 loại thanh mát và chấm ngập chén mắm nêm bí truyền thơm lừng.' },
      { name: 'Mì Quảng Ếch Bếp Trang', dish: 'Mì Quảng ếch om niêu đất, Chả bò Đà Nẵng, Bánh tráng mè nướng giòn', address: 'Số 441 Ông Ích Khiêm, Nam Dương, Hải Châu', priceRange: '45.000 - 75.000 VNĐ / phần', openingHours: '07:00 - 22:30', rating: 4.8, highlightTip: 'Thịt ếch om vàng ruộm sả nghệ trong niêu đất sôi lục bục, chan cùng sợi mì vàng óng.' },
      { name: 'Hải Sản Bé Mặn Biển Mỹ Khê', dish: 'Cua rang me, Tôm sú nướng muối ớt, Chíp chíp hấp sả thơm nức', address: 'Lô 11 Võ Nguyên Giáp, Mạn Thái, Sơn Trà', priceRange: '180.000 - 350.000 VNĐ / người', openingHours: '09:00 - 23:00', rating: 4.7, highlightTip: 'Hải sản tươi sống bơi trong bể kính tự tay lựa chọn, chế biến nóng sốt ăn ngay sát biển gió lộng.' },
    ],
  },

  'da-lat-flower-city': {
    gallery: [
      { url: dalatImg, captionVi: 'Thành phố ngàn hoa Đà Lạt lãng mạn giữa cao nguyên Lâm Viên', captionEn: 'Da Lat romantic highland flower hills and pine forests', captionKo: '낭만적인 소나무 숲과 꽃들의 도시 달랏' },
      { url: banhXeoImg, captionVi: 'Bánh tráng nướng mỡ hành giòn rụm chợ đêm Đà Lạt', captionEn: 'Vietnamese pizza crispy grilled rice paper in Da Lat night market', captionKo: '달랏 야시장의 별미 바삭한 라이스페이퍼 피자(Banh Trang Nuong)' },
      { url: cairangImg, captionVi: 'Hồ Tuyền Lâm & Thiền viện Trúc Lâm thanh bình sương khói', captionEn: 'Tuyen Lam Lake and peaceful Truc Lam Zen Monastery', captionKo: '고요한 뚜옌람 호수와 죽림선원' },
    ],
    ticketPriceInfo: 'Thung lũng Tình Yêu: 250.000 VNĐ. Vườn hoa thành phố: 100.000 VNĐ. Thác Datanla (máng trượt 2 chiều): 250.000 VNĐ. Ga Đà Lạt: 50.000 VNĐ.',
    openingHoursInfo: 'Các điểm tham quan mở từ 07:30 - 17:00; Chợ đêm Đà Lạt hoạt động từ 17:00 - 24:00.',
    highlightsList: [
      'Săn mây bình minh đồi chè Cầu Đất & ngắm mai anh đào nở rộ',
      'Trải nghiệm máng trượt xuyên rừng thông dài nhất Đông Nam Á tại Thác Datanla',
      'Check-in các quán cafe view thung lũng mộng mơ ngắm hoàng hôn buông',
      'Ăn lẩu gà lá é, bánh tráng nướng và uống sữa đậu nành nóng chợ đêm',
    ],
    flights: {
      nearestAirport: 'Sân bay Quốc tế Liên Khương (DLI), cách trung tâm Đà Lạt 30km',
      airportCode: 'DLI',
      originOptions: [
        { code: 'HAN', name: 'Hà Nội (HAN)' },
        { code: 'SGN', name: 'TP. Hồ Chí Minh (SGN)' },
        { code: 'DAD', name: 'Đà Nẵng (DAD)' },
        { code: 'HPH', name: 'Hải Phòng (HPH)' },
      ],
      roundtripPriceEstimate: '1.200.000 - 2.500.000 VNĐ / khứ hồi',
      onewayPriceEstimate: '600.000 - 1.300.000 VNĐ / chiều',
      flightDuration: 'Chỉ 50 phút bay từ TP.HCM hoặc 1 giờ 50 phút từ Hà Nội; xe bus/taxi 30 phút vào trung tâm',
      airlines: ['Vietnam Airlines', 'Vietjet Air', 'Bamboo Airways'],
      bookingAdvice: 'Vé bay chặng TP.HCM - Đà Lạt giá rất rẻ và bay cực nhanh, thích hợp kỳ nghỉ cuối tuần.',
    },
    hotels: {
      travelokaCityId: 'da-lat',
      tiers: [
        { category: 'Resort & Khách Sạn Di Sản 5 Sao', priceRange: '2.200.000 - 6.500.000 VNĐ / đêm', description: 'Dalat Edensee Lake Resort bên hồ Tuyền Lâm, Ana Mandara Villas Dalat kiến trúc Pháp cổ.' },
        { category: 'Khách sạn 3-4 Sao Trung tâm Hồ Xuân Hương', priceRange: '700.000 - 1.600.000 VNĐ / đêm', description: 'Cách chợ đêm vài bước chân, view ngắm hồ nước mộng mơ, thiết kế ấm cúng.' },
        { category: 'Homestay Thung Lũng Săn Mây', priceRange: '300.000 - 600.000 VNĐ / đêm', description: 'Các căn nhà gỗ mộc mạc view thung lũng đèn lồng, ban công ngắm mây trôi.' },
      ],
      recommendedStays: [
        { name: 'Ana Mandara Villas Dalat Resort & Spa', stars: 5, pricePerNight: '2.850.000 VNĐ', address: 'Đường Lê Lai, Phường 5, TP. Đà Lạt', features: ['Biệt thự Pháp cổ giữa rừng thông', 'Hồ bơi nước ấm ngoài trời', 'Không gian lãng mạn'] },
        { name: 'Dalat Edensee Lake Resort & Spa', stars: 5, pricePerNight: '2.400.000 VNĐ', address: 'Khu du lịch Hồ Tuyền Lâm, Phường 4', features: ['Bán đảo ven hồ Tuyền Lâm', 'Khí hậu trong lành tuyệt đối', 'Dịch vụ chèo thuyền kayak'] },
        { name: 'Colline Hotel Dalat', stars: 4, pricePerNight: '1.350.000 VNĐ', address: 'Số 10 Phan Bội Châu, Phường 2', features: ['Ngay trên chợ Đà Lạt mới', 'Kiến trúc hiện đại sang trọng', 'Rất tiện đi dạo ăn đêm'] },
      ],
    },
    diningSpots: [
      { name: 'Lẩu Gà Lá É Tao Ngộ', dish: 'Lẩu gà ta đun lá é thơm cay nồng, măng tươi giòn ngọt, nấm sò', address: 'Số 5 đường 3 Tháng 4, Phường 3, Đà Lạt', priceRange: '200.000 - 300.000 VNĐ / nồi 3-4 người', openingHours: '08:00 - 22:00', rating: 4.8, highlightTip: 'Lá é cay dịu ấm nồng ăn cùng thịt gà ta xé phay, húp muỗng nước lẩu nóng giữa trời lạnh Đà Lạt là số 1.' },
      { name: 'Bánh Căn Lệ Đà Lạt', dish: 'Bánh căn trứng cút lòng đào, Xíu mại sốt cay thơm béo, Bánh căn bò bằm', address: 'Hẻm 44 Yersin, Phường 10, TP. Đà Lạt', priceRange: '30.000 - 50.000 VNĐ / dĩa', openingHours: '06:30 - 18:00', rating: 4.9, highlightTip: 'Vỏ bánh nướng giòn rụm đáy, chấm ngập chén nước chấm xíu mại có mỡ hành và ớt sa tế cay xé lưỡi.' },
      { name: 'Quán Kem Bơ Thanh Thảo', dish: 'Kem bơ sáp béo ngậy, Chè thái sầu riêng thơm lừng, Kem dừa cốt dừa', address: 'Số 76 Nguyễn Văn Trỗi, Phường 2, Đà Lạt', priceRange: '20.000 - 35.000 VNĐ / ly', openingHours: '07:00 - 22:00', rating: 4.7, highlightTip: 'Bơ sáp dẻo thơm xay nhuyễn không ngọt gắt, bên trên phủ viên kem dừa trắng muốt rắc dừa khô sấy giòn.' },
    ],
  },

  'ho-chi-minh-city': {
    gallery: [
      { url: saigonImg, captionVi: 'Sài Gòn năng động hiện đại - Hòn ngọc Viễn Đông rực rỡ ánh đèn đêm', captionEn: 'Ho Chi Minh City dynamic skyline and Saigon River', captionKo: '활기찬 에너지와 눈부신 야경의 호치민 시티(사이공)' },
      { url: dinhDocLapImg, captionVi: 'Dinh Độc Lập - Di tích lịch sử quốc gia đặc biệt chứng nhân 30/4/1975', captionEn: 'Reunification Palace historic national monument', captionKo: '역사적인 통일궁(독립궁) 유적지' },
      { url: comTamImg, captionVi: 'Cơm tấm sườn bì chả Sài Gòn mỡ hành óng ánh nước mắm kẹo', captionEn: 'Signature Saigon broken rice with grilled pork ribs', captionKo: '달콤짭조름한 숯불 돼지갈비가 일품인 껌승(Com Tam)' },
      { url: cuChiImg, captionVi: 'Địa đạo Củ Chi - Kỳ quan quân sự huyền thoại trong lòng đất', captionEn: 'Cu Chi Tunnels underground resistance network', captionKo: '지하 군사 요새 꾸찌 터널' },
    ],
    ticketPriceInfo: 'Dinh Độc Lập: 40.000 VNĐ/người (vé toàn phần gồm khu triển lãm: 65.000 VNĐ). Địa đạo Củ Chi: 125.000 VNĐ. Bảo tàng Chứng tích Chiến tranh: 40.000 VNĐ.',
    openingHoursInfo: 'Dinh Độc Lập mở từ 08:00 - 16:30; Phố đi bộ Nguyễn Huệ & Bùi Viện hoạt động sôi động thâu đêm.',
    highlightsList: [
      'Tham quan Dinh Độc Lập, Nhà thờ Đức Bà và Bưu điện Trung tâm thành phố',
      'Ngồi bus sông Saigon Waterbus ngắm hoàng hôn và tòa Landmark 81 chọc trời',
      'Thưởng thức cà phê bệt Nhà thờ và ăn cơm tấm sườn bì chả nướng than hoa',
      'Khám phá hệ thống địa đạo Củ Chi kỳ tích trong lòng đất',
    ],
    flights: {
      nearestAirport: 'Sân bay Quốc tế Tân Sơn Nhất (SGN) lớn nhất Việt Nam',
      airportCode: 'SGN',
      originOptions: [
        { code: 'HAN', name: 'Hà Nội (HAN)' },
        { code: 'DAD', name: 'Đà Nẵng (DAD)' },
        { code: 'HUI', name: 'Huế (HUI)' },
        { code: 'HPH', name: 'Hải Phòng (HPH)' },
      ],
      roundtripPriceEstimate: '1.300.000 - 2.600.000 VNĐ / khứ hồi',
      onewayPriceEstimate: '650.000 - 1.350.000 VNĐ / chiều',
      flightDuration: '2 giờ từ Hà Nội, 1 giờ 15 phút từ Đà Nẵng, kết nối với tất cả các sân bay trong nước',
      airlines: ['Vietnam Airlines', 'Vietjet Air', 'Bamboo Airways', 'Vietravel Airlines'],
      bookingAdvice: 'Tần suất bay dày đặc 15-20 phút có 1 chuyến, dễ dàng đặt vé máy bay linh hoạt bất cứ giờ nào.',
    },
    hotels: {
      travelokaCityId: 'ho-chi-minh',
      tiers: [
        { category: 'Khách sạn 5 Sao & Landmark Hạng Sang', priceRange: '2.500.000 - 7.000.000 VNĐ / đêm', description: 'Vinpearl Landmark 81 Autograph Collection, The Reverie Saigon, Caravelle Saigon.' },
        { category: 'Khách sạn 3-4 Sao Trung tâm Quận 1', priceRange: '750.000 - 1.700.000 VNĐ / đêm', description: 'Cách chợ Bến Thành và phố đi bộ Nguyễn Huệ chỉ 3-5 phút đi bộ.' },
        { category: 'Boutique Hotel & Căn Hộ Dịch Vụ', priceRange: '350.000 - 650.000 VNĐ / đêm', description: 'Phù hợp người trẻ, du khách công tác và du lịch trải nghiệm dài ngày.' },
      ],
      recommendedStays: [
        { name: 'Caravelle Saigon', stars: 5, pricePerNight: '3.400.000 VNĐ', address: 'Số 19-23 Lam Sơn Square, Quận 1', features: ['Khách sạn lịch sử đối diện Nhà Hát Lớn', 'Rooftop bar nổi tiếng', 'Dịch vụ thượng lưu'] },
        { name: 'Vinpearl Landmark 81, Autograph Collection', stars: 5, pricePerNight: '4.800.000 VNĐ', address: 'Số 720A Điện Biên Phủ, Bình Thạnh', features: ['Tòa tháp cao nhất Việt Nam', 'View mây trời toàn cảnh Sài Gòn', 'Bể bơi trên mây'] },
        { name: 'Silverland Yen Hotel', stars: 4, pricePerNight: '1.550.000 VNĐ', address: 'Số 73 Thủ Khoa Huân, Quận 1', features: ['Bể sục jacuzzi tầng thượng', 'Trà chiều miễn phí mỗi ngày', 'Cách chợ Bến Thành 200m'] },
      ],
    },
    diningSpots: [
      { name: 'Cơm Tấm Ba Ghiền (Sài Gòn)', dish: 'Cơm tấm sườn que to bằng bàn tay nướng thơm phức, Chả trứng, Bì thính', address: 'Số 84 Đặng Văn Ngữ, Phường 10, Phú Nhuận', priceRange: '70.000 - 110.000 VNĐ / đĩa', openingHours: '07:30 - 21:00', rating: 4.8, highlightTip: 'Miếng sườn ướp mật ong nướng than hoa vàng óng, mềm mọng nước ăn cùng nước mắm kẹo quánh cay nồng.' },
      { name: 'Bánh Mì Huỳnh Hoa Sài Gòn', dish: 'Bánh mì ô môi kẹp 6 lớp thịt nguội, giò thủ, chả lụa, pate béo ngậy', address: 'Số 26 Lê Thị Riêng, Bến Thành, Quận 1', priceRange: '65.000 - 75.000 VNĐ / ổ', openingHours: '06:00 - 22:00', rating: 4.7, highlightTip: 'Ổ bánh mì nặng gần 400g ngập tràn nhân, nên ăn ngay khi vừa làm xong giòn rụm.' },
      { name: 'Ốc Oanh Phố Ốc Vĩnh Khánh', dish: 'Càng ghẹ rang muối ớt cay xé lưỡi, Ốc hương xào bơ tỏi, Sò điệp nướng mỡ hành', address: 'Số 534 Vĩnh Khánh, Phường 8, Quận 4', priceRange: '100.000 - 250.000 VNĐ / người', openingHours: '15:00 - 24:00', rating: 4.8, highlightTip: 'Vừa nhâm nhi đĩa ốc đậm đà xì xụp, vừa cảm nhận trọn vẹn văn hóa nhậu đường phố rộn rã Sài Gòn.' },
    ],
  },

  'mekong-delta-can-tho': {
    gallery: [
      { url: cairangImg, captionVi: 'Chợ nổi Cái Răng tấp nập ghe xuồng mua bán trái cây sông nước', captionEn: 'Cai Rang lively morning floating market in Mekong Delta', captionKo: '활기 넘치는 메콩 델타의 까이랑 수상시장' },
      { url: banhXeoImg, captionVi: 'Bánh xèo miền Tây giòn rụm vàng ruộm cuốn đọt rau rừng', captionEn: 'Crispy giant Mekong Delta pancake Banh Xeo', captionKo: '바삭하고 큼직한 메콩 델타 전통 반쎄오' },
      { url: saigonImg, captionVi: 'Bến Ninh Kiều lung linh ánh đèn và cầu đi bộ tình yêu Cần Thơ', captionEn: 'Ninh Kieu Wharf lights and Can Tho walking bridge', captionKo: '닌끼에우 부두의 낭만적인 야경과 보행자 다리' },
    ],
    ticketPriceInfo: 'Thuê tàu riêng đi chợ nổi Cái Răng: 350.000 - 550.000 VNĐ/thuyền (chở 4-10 người). Nhà cổ Bình Thủy: 20.000 VNĐ. Vườn du lịch sinh thái Mỹ Khánh: 100.000 VNĐ.',
    openingHoursInfo: 'Chợ nổi Cái Răng họp đông đúc nhất từ 05:30 - 08:30 sáng sớm.',
    highlightsList: [
      'Đi thuyền đón bình minh và ăn tô bún riêu cua nóng hổi trên chợ nổi Cái Răng',
      'Thưởng thức các loại trái cây miệt vườn chín trĩu cành (chôm chôm, sầu riêng, măng cụt)',
      'Thăm Nhà Cổ Bình Thủy bối cảnh phim Người Tình (L’Amant) danh tiếng',
      'Thưởng thức đờn ca tài tử Nam Bộ di sản văn hóa phi vật thể của nhân loại',
    ],
    flights: {
      nearestAirport: 'Sân bay Quốc tế Cần Thơ (VCA)',
      airportCode: 'VCA',
      originOptions: [
        { code: 'HAN', name: 'Hà Nội (HAN)' },
        { code: 'DAD', name: 'Đà Nẵng (DAD)' },
        { code: 'HPH', name: 'Hải Phòng (HPH)' },
      ],
      roundtripPriceEstimate: '1.400.000 - 2.800.000 VNĐ / khứ hồi',
      onewayPriceEstimate: '700.000 - 1.450.000 VNĐ / chiều',
      flightDuration: '2 giờ 10 phút từ Hà Nội, 1 giờ 20 phút từ Đà Nẵng bay thẳng đến thủ phủ Miền Tây',
      airlines: ['Vietnam Airlines', 'Vietjet Air', 'Bamboo Airways'],
      bookingAdvice: 'Bay thẳng đến Cần Thơ giúp tiết kiệm nửa ngày di chuyển đường bộ từ TP.HCM.',
    },
    hotels: {
      travelokaCityId: 'can-tho',
      tiers: [
        { category: 'Resort Sinh Thái Ven Sông 5 Sao', priceRange: '2.000.000 - 5.500.000 VNĐ / đêm', description: 'Azerai Can Tho Resort (ốc đảo cồn Ấu sang trọng), Victoria Can Tho Resort cổ kính.' },
        { category: 'Khách sạn 4 Sao Bến Ninh Kiều', priceRange: '700.000 - 1.500.000 VNĐ / đêm', description: 'Ngay cạnh bến du thuyền, thuận tiện đi dạo phố đêm và đón tàu đi chợ nổi sáng sớm.' },
        { category: 'Homestay Miệt Vườn Sông Nước', priceRange: '250.000 - 500.000 VNĐ / đêm', description: 'Thân thương, cùng chủ nhà hái rau bắt cá làm bánh xèo miền Tây.' },
      ],
      recommendedStays: [
        { name: 'Azerai Can Tho', stars: 5, pricePerNight: '4.200.000 VNĐ', address: 'Cồn Ấu, Cái Răng, Cần Thơ', features: ['Ốc đảo xanh biệt lập giữa sông Hậu', 'Cano đưa đón riêng', 'Thiết kế tối giản đẳng cấp'] },
        { name: 'Victoria Can Tho Resort', stars: 4, pricePerNight: '1.650.000 VNĐ', address: 'Phường Cái Khế, Ninh Kiều', features: ['Kiến trúc thuộc địa Pháp ven sông', 'Vườn nhiệt đới mát mẻ', 'Tàu gỗ tham quan riêng'] },
        { name: 'Khách Sạn TTC - Premium Cần Thơ', stars: 4, pricePerNight: '950.000 VNĐ', address: 'Số 2 Hai Bà Trưng, Tân An, Ninh Kiều', features: ['Sát vách Bến Ninh Kiều', 'Hồ bơi view sông Hậu', 'Gần chợ đêm'] },
      ],
    },
    diningSpots: [
      { name: 'Quán Bánh Cống Cô Dung', dish: 'Bánh cống tôm đậu xanh vàng giòn, Bánh cống nhân thịt béo bùi', address: 'Số 86/38 Lý Tự Trọng, Ninh Kiều, Cần Thơ', priceRange: '15.000 - 30.000 VNĐ / cái', openingHours: '09:00 - 20:00', rating: 4.8, highlightTip: 'Bánh cống chiên ngập dầu giòn rụm bên ngoài mềm bùi bên trong, cuốn rau đọt xoài chấm mắm ớt.' },
      { name: 'Bún Riêu Tàu Nổi Chợ Cái Răng', dish: 'Bún riêu cua đồng nấu trên thuyền, Cà phê kho sông nước', address: 'Giữa lòng Chợ nổi Cái Răng, Cần Thơ', priceRange: '35.000 - 50.000 VNĐ / tô', openingHours: '05:30 - 08:30 sáng', rating: 4.9, highlightTip: 'Tô bún riêu truyền tay giữa hai mạn thuyền dập dềnh sóng nước buổi sớm mai là trải nghiệm khó quên.' },
      { name: 'Nhà Hàng Hoa Sứ Bến Ninh Kiều', dish: 'Cá lóc nướng trui cuộn bánh tráng, Lẩu mắm miền Tây thơm nức mũi', address: 'Khu du lịch Sông Hậu, Cái Khế, Ninh Kiều', priceRange: '120.000 - 250.000 VNĐ / người', openingHours: '10:00 - 22:30', rating: 4.7, highlightTip: 'Lẩu mắm nấu từ mắm cá linh, cá sặc cá thơm phức ăn kèm đĩa rau đồng nội 20 loại rau muống, điên điển, kèo nèo.' },
    ],
  },

  'phu-quoc-pearl-island': {
    gallery: [
      { url: phuquocImg, captionVi: 'Bãi Sao Phú Quốc - Bãi biển cát trắng mịn như kem và nước xanh ngọc bích', captionEn: 'Sao Beach powder white sands and crystal turquoise sea', captionKo: '밀가루처럼 부드러운 백사장과 에메랄드빛 바다 바이사오(Bai Sao)' },
      { url: hoangsaImg, captionVi: 'Hoàng hôn rực rỡ lãng mạn tại Bãi Trường & Sunset Sanato', captionEn: 'Breathtaking sunset spectacle at Truong Beach', captionKo: '선셋 사나토에서 바라보는 환상적인 붉은 노을' },
      { url: halongImg, captionVi: 'Tour cano 4 đảo & lặn ngắm rạn san hô tự nhiên đảo ngọc', captionEn: 'Speedboat hopping tour and natural coral reef snorkeling', captionKo: '스피드보트 4개 섬 호핑투어와 산호초 스노클링' },
    ],
    ticketPriceInfo: 'Cáp treo Hòn Thơm vượt biển dài nhất thế giới: 650.000 VNĐ/người lớn (bao gồm công viên nước Aquatopia). Tour cano 4 đảo lặn san hô: 650.000 - 950.000 VNĐ/người. Show Tinh Hoa Việt Nam Grand World: 300.000 VNĐ.',
    openingHoursInfo: 'Cáp treo Hòn Thơm vận hành từ 08:30 - 17:00; Grand World mở cửa không ngủ 24/7.',
    highlightsList: [
      'Tắm biển cát trắng mịn màng như kem tại Bãi Sao và Bãi Khem',
      'Đi cáp treo vượt biển 3 dây dài kỷ lục thế giới 7.899m sang đảo Hòn Thơm',
      'Tham gia tour cano lặn ngắm san hô tại Hòn Mây Rút và Hòn Gầm Ghì',
      'Oanh tạc Chợ đêm Phú Quốc thưởng thức nhum biển nướng mỡ hành và hải sản tươi rói',
    ],
    flights: {
      nearestAirport: 'Sân bay Quốc tế Phú Quốc (PQC) hiện đại',
      airportCode: 'PQC',
      originOptions: [
        { code: 'HAN', name: 'Hà Nội (HAN)' },
        { code: 'SGN', name: 'TP. Hồ Chí Minh (SGN)' },
        { code: 'DAD', name: 'Đà Nẵng (DAD)' },
        { code: 'HPH', name: 'Hải Phòng (HPH)' },
      ],
      roundtripPriceEstimate: '1.400.000 - 3.200.000 VNĐ / khứ hồi',
      onewayPriceEstimate: '700.000 - 1.650.000 VNĐ / chiều',
      flightDuration: 'Chỉ 55 phút từ TP.HCM hoặc 2 giờ 10 phút từ Hà Nội bay thẳng ra đảo ngọc',
      airlines: ['Vietnam Airlines', 'Vietjet Air', 'Bamboo Airways'],
      bookingAdvice: 'Nên đặt vé máy bay sớm vào mùa đẹp (tháng 11 đến tháng 4) để có mức giá tốt nhất.',
    },
    hotels: {
      travelokaCityId: 'phu-quoc',
      tiers: [
        { category: 'Resort Biển 5 Sao Sang Trọng Quốc Tế', priceRange: '2.800.000 - 12.000.000 VNĐ / đêm', description: 'JW Marriott Phu Quoc Emerald Bay (Bãi Khem), InterContinental Phu Quoc Long Beach Resort, Vinpearl Resort.' },
        { category: 'Khách sạn 4 Sao Sunset Town & Dương Đông', priceRange: '900.000 - 2.200.000 VNĐ / đêm', description: 'View ngắm Cầu Hôn, hoàng hôn Địa Trung Hải, gần bãi biển và chợ đêm.' },
        { category: 'Resort Bungalow Ven Biển Tiết Kiệm', priceRange: '450.000 - 850.000 VNĐ / đêm', description: 'Bungalow mái lá vườn dừa nhiệt đới, bước vài bước chân ra cát mịn.' },
      ],
      recommendedStays: [
        { name: 'JW Marriott Phu Quoc Emerald Bay Resort', stars: 5, pricePerNight: '6.800.000 VNĐ', address: 'Bãi Khem, An Thới, TP. Phú Quốc', features: ['Kiến trúc đại học Lamarck độc nhất thế giới', 'Bãi cát trắng mịn như kem', 'Bể bơi hình vỏ sò'] },
        { name: 'InterContinental Phu Quoc Long Beach Resort', stars: 5, pricePerNight: '3.600.000 VNĐ', address: 'Bãi Trường, Dương Tơ, Phú Quốc', features: ['Sky bar INK 360 cao nhất đảo ngọc', '4 hồ bơi ngoài trời', 'Bãi biển ngắm hoàng hôn'] },
        { name: 'Salinda Resort Phu Quoc Island', stars: 5, pricePerNight: '2.400.000 VNĐ', address: 'Ấp Cửa Lấp, Xã Dương Tơ', features: ['Bể bơi lọc muối điện phân', 'Vườn cây nhiệt đới xanh mát', 'Bữa sáng vang sủi miễn phí'] },
      ],
    },
    diningSpots: [
      { name: 'Hải Sản Quán Ra Khơi Phú Quốc', dish: 'Nhum biển nướng mỡ hành trứng cút, Gỏi cá trích cuốn bánh tráng, Ghẹ Hàm Ninh hấp bia', address: 'Số 131 đường 30 Tháng 4, Dương Đông, Phú Quốc', priceRange: '150.000 - 350.000 VNĐ / người', openingHours: '10:00 - 23:00', rating: 4.8, highlightTip: 'Gỏi cá trích tươi rói vắt chanh cuốn bánh tráng rau rừng chấm nước mắm nhĩ Phú Quốc béo bùi say đắm.' },
      { name: 'Bún Quậy Kiến Xây Phú Quốc', dish: 'Bún quậy tôm mực chả cá tươi quết tại chỗ, Nước chấm tự pha theo sở thích', address: 'Số 28 Bạch Đằng, Dương Đông, Phú Quốc', priceRange: '45.000 - 75.000 VNĐ / tô', openingHours: '07:00 - 22:30', rating: 4.9, highlightTip: 'Thịt tôm tươi giã quết sát đáy tô chan nước lèo sôi sùng sục, tự pha chén nước chấm tắc ớt muối đường cay nồng.' },
      { name: 'Chợ Đêm Phú Quốc (Dinh Cậu)', dish: 'Mực ống nướng sa tế, Bánh khéo Phú Quốc, Kẹo chỉ đường phố', address: 'Số 6 Bạch Đằng, Dương Đông, Phú Quốc', priceRange: '30.000 - 150.000 VNĐ / món', openingHours: '17:00 - 23:30', rating: 4.7, highlightTip: 'Thiên đường ẩm thực đêm rực rỡ sắc màu ngập tràn mùi hải sản nướng than hoa thơm lừng.' },
    ],
  },

  'hoang-sa-islands': {
    gallery: [
      { url: hoangsaImg, captionVi: 'Quần đảo Hoàng Sa - Thềm lục địa thiêng liêng không thể tách rời của Tổ quốc Việt Nam', captionEn: 'Hoang Sa sacred maritime sovereignty of Vietnam', captionKo: '베트남의 신성하고 양도할 수 없는 영토 호앙사 군도' },
      { url: truongsaImg, captionVi: 'Lá cờ đỏ sao vàng kiêu hãnh tung bay khẳng định chủ quyền biển đảo', captionEn: 'Vietnam national flag fluttering over sacred territorial waters', captionKo: '해양 주권을 상징하는 베트남 금성홍기' },
      { url: dk1Img, captionVi: 'Vùng biển chủ quyền hòa bình giàu tài nguyên thiên nhiên của dân tộc Việt Nam', captionEn: 'Peaceful sea endowed with natural marine resources', captionKo: '풍부한 해양 자원과 평화로운 베트남 해역' },
    ],
    ticketPriceInfo: 'Vùng biển chủ quyền thiêng liêng của Tổ quốc. Tham quan Nhà trưng bày Hoàng Sa tại đường Hoàng Sa, TP. Đà Nẵng: Miễn phí vào cửa.',
    openingHoursInfo: 'Nhà trưng bày Hoàng Sa mở cửa từ 07:30 - 17:00 các ngày trong tuần (thứ Hai đến Chủ Nhật).',
    highlightsList: [
      'Tìm hiểu tư liệu lịch sử, Châu bản triều Nguyễn khẳng định chủ quyền Hoàng Sa',
      'Chiêm ngưỡng các bản đồ cổ thế giới công nhận Hoàng Sa là của Việt Nam',
      'Tưởng nhớ công đức các bậc tiền nhân Hải đội Hoàng Sa kiêm quản Bắc Hải',
      'Giáo dục lòng yêu nước và ý thức bảo vệ chủ quyền biển đảo cho thế hệ mai sau',
    ],
    flights: {
      nearestAirport: 'Sân bay Quốc tế Đà Nẵng (DAD)',
      airportCode: 'DAD',
      originOptions: [
        { code: 'HAN', name: 'Hà Nội (HAN)' },
        { code: 'SGN', name: 'TP. Hồ Chí Minh (SGN)' },
      ],
      roundtripPriceEstimate: '1.200.000 - 2.200.000 VNĐ / khứ hồi',
      onewayPriceEstimate: '600.000 - 1.150.000 VNĐ / chiều',
      flightDuration: '1 giờ 15 phút đến TP. Đà Nẵng - đơn vị hành chính quản lý huyện đảo Hoàng Sa',
      airlines: ['Vietnam Airlines', 'Vietjet Air', 'Bamboo Airways'],
      bookingAdvice: 'Du khách ghé thăm thành phố Đà Nẵng có thể dễ dàng đến viếng Nhà Trưng Bày Hoàng Sa trên bán đảo Sơn Trà.',
    },
    hotels: {
      travelokaCityId: 'da-nang',
      tiers: [
        { category: 'Khách Sạn & Resort Sơn Trà - Đà Nẵng', priceRange: '1.500.000 - 5.000.000 VNĐ / đêm', description: 'Các khách sạn view biển Hoàng Sa - Võ Nguyên Giáp lộng gió.' },
        { category: 'Khách sạn Trung tâm Đà Nẵng', priceRange: '650.000 - 1.400.000 VNĐ / đêm', description: 'Thuận tiện tham quan các bảo tàng lịch sử và danh lam thắng cảnh.' },
        { category: 'Khách sạn Tiết Kiệm', priceRange: '300.000 - 550.000 VNĐ / đêm', description: 'Gần biển, tiện nghi đầy đủ.' },
      ],
      recommendedStays: [
        { name: 'Khách Sạn Mường Thanh Luxury Đà Nẵng', stars: 5, pricePerNight: '1.450.000 VNĐ', address: 'Số 270 Võ Nguyên Giáp, Mỹ An, Ngũ Hành Sơn', features: ['Trực diện biển', 'Phòng view biển Đông', 'Gần Nhà trưng bày Hoàng Sa'] },
        { name: 'Four Points by Sheraton Danang', stars: 5, pricePerNight: '1.950.000 VNĐ', address: 'Số 118-120 Võ Nguyên Giáp, Sơn Trà', features: ['Thương hiệu Marriott', 'Rooftop bar tầng 36', 'View trọn cung đường biển Hoàng Sa'] },
      ],
    },
    diningSpots: [
      { name: 'Nhà Hàng Hải Sản Bé Biển Đà Nẵng', dish: 'Cá mú hấp xì dầu, Mực lá nướng muối ớt, Tôm sú biển Đông xào me', address: 'Đường Võ Nguyên Giáp ven biển Đà Nẵng', priceRange: '150.000 - 300.000 VNĐ / người', openingHours: '09:00 - 23:00', rating: 4.8, highlightTip: 'Hải sản đánh bắt trực tiếp từ ngư trường biển miền Trung tươi ngon béo ngậy.' },
    ],
  },

  'truong-sa-islands': {
    gallery: [
      { url: truongsaImg, captionVi: 'Quần đảo Trường Sa - Cột mốc chủ quyền thiêng liêng nơi đầu sóng ngọn gió', captionEn: 'Truong Sa Islands sacred sovereign monument and naval guardians', captionKo: '조국의 파도를 지키는 쯔엉사 군도의 신성한 주권 비석' },
      { url: dk1Img, captionVi: 'Nhà giàn DK1 - Pháo đài thép kiên cường trên thềm lục địa phía Nam', captionEn: 'DK1 offshore platforms guarding the southern continental shelf', captionKo: '남부 대륙붕을 수호하는 강철 요새 DK1 해상 플랫폼' },
      { url: hoangsaImg, captionVi: 'Cây bàng vuông Trường Sa hiên ngang bất khuất giữa bão tố biển khơi', captionEn: 'Iconic Barringtonia asiatica square sea-apple tree in Truong Sa', captionKo: '거친 바닷바람을 견뎌내는 쯔엉사의 상징 사각 바링토니아 나무' },
    ],
    ticketPriceInfo: 'Hải trình theo các chuyến tàu công tác thăm quân dân huyện đảo Trường Sa & Nhà giàn DK1. Tham quan Công viên Biển Đông & Bảo tàng Hải quân: Miễn phí.',
    openingHoursInfo: 'Công viên Biển Đông & Khu tưởng niệm chiến sĩ Gạc Ma mở cửa tất cả các ngày trong năm.',
    highlightsList: [
      'Chào cờ dưới chân Cột mốc chủ quyền đá hoa cương trên đảo Trường Sa Lớn',
      'Viếng Chùa Trường Sa Lớn - tiếng chuông chùa ngân nga giữa biển trời Tổ quốc',
      'Thăm Nhà giàn DK1 kiên cường giữa sóng gió ngàn khơi',
      'Chiêm ngưỡng cây bàng vuông, cây phong ba biểu tượng của lòng quả cảm kiên trung',
    ],
    flights: {
      nearestAirport: 'Sân bay Quốc tế Cam Ranh (CXR), tỉnh Khánh Hòa',
      airportCode: 'CXR',
      originOptions: [
        { code: 'HAN', name: 'Hà Nội (HAN)' },
        { code: 'SGN', name: 'TP. Hồ Chí Minh (SGN)' },
      ],
      roundtripPriceEstimate: '1.250.000 - 2.500.000 VNĐ / khứ hồi',
      onewayPriceEstimate: '650.000 - 1.250.000 VNĐ / chiều',
      flightDuration: '1 giờ 45 phút từ Hà Nội hoặc 1 giờ từ TP.HCM đến Cam Ranh (Khánh Hòa - đơn vị quản lý huyện đảo Trường Sa)',
      airlines: ['Vietnam Airlines', 'Vietjet Air', 'Bamboo Airways'],
      bookingAdvice: 'Sân bay Cam Ranh kết nối dễ dàng đến Cảng quốc tế Cam Ranh và trung tâm thành phố biển Nha Trang.',
    },
    hotels: {
      travelokaCityId: 'nha-trang',
      tiers: [
        { category: 'Resort & Khách Sạn Biển 5 Sao', priceRange: '1.800.000 - 5.500.000 VNĐ / đêm', description: 'Vinpearl Resort Nha Trang, Amiana Resort Nha Trang, InterContinental Nha Trang view vịnh ngọc.' },
        { category: 'Khách sạn 4 Sao Đường Trần Phú', priceRange: '700.000 - 1.600.000 VNĐ / đêm', description: 'Sát mặt biển, hồ bơi vô cực ngắm bình minh biển Đông lộng lẫy.' },
        { category: 'Khách sạn Tiết Kiệm', priceRange: '280.000 - 550.000 VNĐ / đêm', description: 'Gần phố đi bộ, dịch vụ thân thiện, giá tốt.' },
      ],
      recommendedStays: [
        { name: 'Vinpearl Resort & Spa Nha Trang Bay', stars: 5, pricePerNight: '2.800.000 VNĐ', address: 'Đảo Hòn Tre, TP. Nha Trang', features: ['Cáp treo vượt biển', 'Bãi biển cát trắng riêng biệt', 'Hồ bơi rộng 1.000m2'] },
        { name: 'InterContinental Nha Trang', stars: 5, pricePerNight: '2.500.000 VNĐ', address: 'Số 32-34 Trần Phú, Lộc Thọ, Nha Trang', features: ['Tọa lạc trên con đường vàng Trần Phú', 'Hồ bơi view trọn vịnh', 'Dịch vụ đẳng cấp quốc tế'] },
      ],
    },
    diningSpots: [
      { name: 'Bún Cá Sứa Nguyên Loan Nha Trang', dish: 'Bún sứa giòn sần sật thanh mát, Chả cá thu chiên thơm lừng, Nước lèo thanh ngọt', address: 'Số 123 Ngô Gia Tự, Tân Lập, TP. Nha Trang', priceRange: '35.000 - 55.000 VNĐ / tô', openingHours: '06:00 - 22:30', rating: 4.8, highlightTip: 'Sứa biển tươi giòn ngọt ăn cùng chả cá hấp và nước dùng nấu từ cá dầm trong vắt.' },
      { name: 'Hải Sản Thanh Sương Nha Trang', dish: 'Tôm hùm nướng phô mai, Mực cơm hấp gừng, Ốc hương xào bơ tỏi', address: 'Số 21 Trần Phú, Vĩnh Nguyên, TP. Nha Trang', priceRange: '150.000 - 320.000 VNĐ / người', openingHours: '10:00 - 23:00', rating: 4.8, highlightTip: 'Hải sản vịnh Cam Ranh tươi sống chế biến thơm lừng giá cả niêm yết minh bạch.' },
    ],
  },
};
