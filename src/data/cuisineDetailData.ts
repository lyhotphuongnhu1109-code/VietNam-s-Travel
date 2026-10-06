import phoImg from '../assets/images/pho_vietnam_1789530541480.jpg';
import banhMiImg from '../assets/images/banh_mi_vietnam_1789530554776.jpg';
import bunChaImg from '../assets/images/bun_cha_hanoi_1789530568497.jpg';
import bunBoHueImg from '../assets/images/bun_bo_hue_1789530580655.jpg';
import comTamImg from '../assets/images/com_tam_saigon_1789530596304.jpg';
import miQuangImg from '../assets/images/mi_quang_danang_1789530609604.jpg';
import banhXeoImg from '../assets/images/banh_xeo_mientay_1789530626361.jpg';
import eggCoffeeImg from '../assets/images/egg_coffee_hanoi_1789530640290.jpg';
import hanoiImg from '../assets/images/hanoi_hoankiem_lake_1789531168556.jpg';
import hoianImg from '../assets/images/hoian_ancient_bridge_1789531239369.jpg';
import hueThienMuImg from '../assets/images/hue_thienmu_pagoda_1789531224397.jpg';
import hueCitadelImg from '../assets/images/hue_citadel_monument_1789530680714.jpg';
import danangImg from '../assets/images/danang_golden_bridge_1789531252694.jpg';
import saigonImg from '../assets/images/saigon_city_view_1789531280393.jpg';
import cairangImg from '../assets/images/cairang_floating_mkt_1789531303058.jpg';

import { DestinationGalleryImage, DestinationDiningSpot } from './destinationDetailData';

export interface CuisineFullGuide {
  originCity: string;
  originProvince: string;
  destinationId: string;
  gallery: DestinationGalleryImage[];
  diningSpots: DestinationDiningSpot[];
}

export const CUISINE_DETAILS: Record<string, CuisineFullGuide> = {
  'pho-vietnam': {
    originCity: 'Hà Nội',
    originProvince: 'Hà Nội & Nam Định',
    destinationId: 'hanoi-old-quarter',
    gallery: [
      { url: phoImg, captionVi: 'Bát phở bò gia truyền nước dùng trong thanh ngọt thơm hương hoa hồi thảo quả', captionEn: 'Traditional Vietnamese beef pho with fragrant star anise broth', captionKo: '깊고 맑은 육수의 하노이 전통 소고기 쌀국수(Pho)' },
      { url: hanoiImg, captionVi: 'Không gian Hồ Gươm phố cổ Hà Nội - Cái nôi ẩm thực phở ngàn năm văn hiến', captionEn: 'Hanoi Old Quarter and Sword Lake - The cradle of authentic pho culture', captionKo: '하노이 구시가지 호안끼엠 - 쌀국수의 본고장' },
      { url: eggCoffeeImg, captionVi: 'Cà phê trứng phố cổ - Nét thưởng thức đậm đà sau bát phở sáng', captionEn: 'Old Quarter egg coffee - Perfect companion after a morning pho', captionKo: '아침 쌀국수 후 즐기는 하노이 에그 커피' },
    ],
    diningSpots: [
      { name: 'Phở Gia Truyền Bát Đàn', dish: 'Phở bò tái nạm, tái lăn nước dùng thanh ngọt tủy bò nguyên chất', address: 'Số 49 Bát Đàn, Cửa Đông, Hoàn Kiếm, Hà Nội', priceRange: '55.000 - 85.000 VNĐ / bát', openingHours: '06:00 - 10:00 & 18:00 - 20:30', rating: 4.9, highlightTip: 'Quán phở xếp hàng nổi tiếng nhất phố cổ, nên ăn kèm quẩy giòn và giấm tỏi ớt truyền thống.', city: 'Hà Nội', region: 'North' },
      { name: 'Phở Thìn Lò Đúc', dish: 'Phở bò tái lăn xào lăn trên chảo lửa ngập hành hoa thơm nức', address: 'Số 13 Lò Đúc, Hai Bà Trưng, Hà Nội', priceRange: '70.000 - 95.000 VNĐ / bát', openingHours: '06:00 - 20:30', rating: 4.8, highlightTip: 'Nước dùng béo ngậy đậm đà, thịt bò xào lăn tỏi lửa lớn mềm ngọt khó quên.', city: 'Hà Nội', region: 'North' },
      { name: 'Phở Lệ (Chợ Lớn Sài Gòn)', dish: 'Phở bò thập cẩm, tái bắp, bò viên gân giòn sần sật', address: 'Số 415 Nguyễn Trãi, Phường 7, Quận 5, TP.HCM', priceRange: '65.000 - 105.000 VNĐ / tô', openingHours: '06:00 - 01:00 đêm', rating: 4.8, highlightTip: 'Nước dùng ngọt đậm phong cách Nam Bộ, ăn kèm tương đen, ngò gai và húng quế tươi rói.', city: 'TP.HCM', region: 'South' },
      { name: 'Phở Hòa Pasteur', dish: 'Phở bò tái nạm gầu, bánh phở mềm mướt, nước dùng thơm ngát quế hồi', address: 'Số 260C Pasteur, Phường 8, Quận 3, TP.HCM', priceRange: '75.000 - 110.000 VNĐ / tô', openingHours: '06:00 - 22:30', rating: 4.7, highlightTip: 'Một trong những quán phở lâu đời và được du khách quốc tế yêu thích nhất tại Sài Gòn.', city: 'TP.HCM', region: 'South' },
      { name: 'Phở Bắc 63 (Đà Nẵng)', dish: 'Phở bò phong cách Bắc chuẩn vị, nước dùng trong veo thơm mùi gừng nướng', address: 'Số 203 Đống Đa, Thạch Thang, Hải Châu, Đà Nẵng', priceRange: '45.000 - 70.000 VNĐ / tô', openingHours: '06:00 - 21:30', rating: 4.7, highlightTip: 'Địa chỉ thưởng thức phở hương vị Hà Nội chuẩn xác nhất giữa lòng thành phố biển.', city: 'Đà Nẵng', region: 'Central' },
    ],
  },

  'banh-mi-vietnam': {
    originCity: 'Hội An & Sài Gòn',
    originProvince: 'Quảng Nam & TP.HCM',
    destinationId: 'hoi-an-ancient-town',
    gallery: [
      { url: banhMiImg, captionVi: 'Ổ bánh mì vỏ giòn rụm kẹp pate béo ngậy, thịt nguội và dưa leo đồ chua thanh mát', captionEn: 'Crispy Vietnamese baguette filled with rich pate, cold cuts and pickled vegetables', captionKo: '바삭한 바게트와 고소한 파테, 채소 피클이 어우러진 베트남 반미' },
      { url: hoianImg, captionVi: 'Phố cổ Hội An - Nơi sản sinh những tiệm bánh mì ngon nhất thế giới', captionEn: 'Ancient town of Hoi An - Home to world-acclaimed banh mi spots', captionKo: '세계 최고의 반미 맛집들이 모여있는 호이안 고도시' },
      { url: saigonImg, captionVi: 'Nhịp sống Sài Gòn gắn liền với những xe bánh mì đường phố rộn rã', captionEn: 'Saigon bustling street food culture centered around fresh banh mi', captionKo: '활기찬 사이공 거리의 대표 길거리 미식 반미' },
    ],
    diningSpots: [
      { name: 'Bánh Mì Phượng Hội An', dish: 'Bánh mì thập cẩm thịt nướng, chả lụa, pate gan bí truyền & sốt ớt cay', address: 'Số 2B Phan Châu Trinh, Cẩm Châu, Hội An', priceRange: '30.000 - 45.000 VNĐ / ổ', openingHours: '06:30 - 21:00', rating: 4.9, highlightTip: 'Được cố đầu bếp Anthony Bourdain vinh danh là bản giao hưởng trong ổ bánh mì.', city: 'Hội An', region: 'Central' },
      { name: 'Bánh Mì Madam Khánh (The Banh Mi Queen)', dish: 'Bánh mì thịt quay xá xíu, pate gan béo mượt, trứng ốp la', address: 'Số 115 Trần Cao Vân, Minh An, Hội An', priceRange: '25.000 - 40.000 VNĐ / ổ', openingHours: '07:00 - 19:30', rating: 4.9, highlightTip: 'Cụ bà hơn 80 tuổi với công thức sốt tương thịt gia truyền đậm đà khó cưỡng.', city: 'Hội An', region: 'Central' },
      { name: 'Bánh Mì Huỳnh Hoa Sài Gòn', dish: 'Bánh mì đẫy đà ngập ngụa 5 loại thịt nguội, pate bơ béo ngậy', address: 'Số 26 Lê Thị Riêng, Bến Thành, Quận 1, TP.HCM', priceRange: '68.000 - 75.000 VNĐ / ổ', openingHours: '13:00 - 23:00', rating: 4.8, highlightTip: 'Trọng lượng gần 400g/ổ, đủ cho 2 người ăn no nê với lớp pate thơm lừng.', city: 'TP.HCM', region: 'South' },
      { name: 'Bánh Mì Bảy Hổ Sài Gòn', dish: 'Bánh mì thịt luộc ướp mật ong, pate gia truyền từ năm 1930', address: 'Số 19 Huỳnh Khương Ninh, Đa Kao, Quận 1, TP.HCM', priceRange: '20.000 - 30.000 VNĐ / ổ', openingHours: '13:30 - 19:00', rating: 4.8, highlightTip: 'Tiệm bánh mì gần 100 năm tuổi với lớp pate nấu nhừ béo ngậy độc nhất vô nhị.', city: 'TP.HCM', region: 'South' },
      { name: 'Bánh Mì Dân Tổ Hà Nội', dish: 'Bánh mì nhân xào chảo xá xíu, trứng pate bơ hành tây nóng hổi', address: 'Ngã 3 Trần Nhật Duật - Cao Thắng, Hoàn Kiếm, Hà Nội', priceRange: '25.000 - 35.000 VNĐ / ổ', openingHours: '03:00 - 08:00 sáng', rating: 4.7, highlightTip: 'Đặc sản ăn đêm - sáng sớm lừng danh của giới trẻ và dân phố cổ Hà Nội.', city: 'Hà Nội', region: 'North' },
      { name: 'Bánh Mì Cay Bà Già (Hải Phòng)', dish: 'Bánh mì que giòn tan kẹp pate cay nồng chấm chí chương', address: 'Số 57 Lê Lợi, Máy Tơ, Ngô Quyền, Hải Phòng', priceRange: '3.000 - 5.000 VNĐ / chiếc', openingHours: '07:00 - 22:00', rating: 4.9, highlightTip: 'Nguồn gốc món bánh mì cay trứ danh đất Cảng, sốt ớt chí chương thơm nức.', city: 'Hải Phòng', region: 'North' },
    ],
  },

  'bun-cha-hanoi': {
    originCity: 'Hà Nội',
    originProvince: 'Hà Nội',
    destinationId: 'hanoi-old-quarter',
    gallery: [
      { url: bunChaImg, captionVi: 'Bún chả than hoa nướng kẹp que tre đượm khói thơm nồng thả trong nước mắm chua ngọt ấm nóng', captionEn: 'Charcoal-grilled pork patties and slices served in warm sweet-sour dipping broth', captionKo: '숯불 향이 가득한 돼지고기 완자와 삼겹살을 곁들인 하노이 분짜' },
      { url: hanoiImg, captionVi: 'Thủ đô Hà Nội nghìn năm văn hiến - Cái nôi tinh hoa ẩm thực bún chả', captionEn: 'Hanoi cultural capital - Birthplace of iconic bun cha heritage', captionKo: '분짜의 본고장 천년 고도 하노이' },
      { url: phoImg, captionVi: 'Ẩm thực phố cổ Hà Nội - Tinh hoa bàn ăn người Tràng An thanh lịch', captionEn: 'Traditional culinary essence of Hanoi Old Quarter', captionKo: '하노이 구시가지의 고유한 식문화' },
    ],
    diningSpots: [
      { name: 'Bún Chả Hương Liên (Bún Chả Obama)', dish: 'Bún chả đặc biệt, nem cua bể giòn rụm & nem hải sản', address: 'Số 24 Lê Văn Hưu, Phan Chu Trinh, Hai Bà Trưng, Hà Nội', priceRange: '50.000 - 90.000 VNĐ / suất', openingHours: '08:00 - 20:30', rating: 4.8, highlightTip: 'Nơi Tổng thống Mỹ Barack Obama từng dùng bữa năm 2016, chả nướng mềm ngọt ngào.', city: 'Hà Nội', region: 'North' },
      { name: 'Bún Chả Đắc Kim Hàng Mành', dish: 'Suất bún chả đẫy đà thịt ba chỉ nướng vàng và nem rán vỏ mỏng', address: 'Số 1 Hàng Mành, Hàng Gai, Hoàn Kiếm, Hà Nội', priceRange: '65.000 - 100.000 VNĐ / suất', openingHours: '08:30 - 21:00', rating: 4.7, highlightTip: 'Suất ăn cực kỳ hào phóng với rổ rau thơm tươi rói và nước chấm pha vừa vị.', city: 'Hà Nội', region: 'North' },
      { name: 'Bún Chả Sinh Từ', dish: 'Bún chả que tre than củi, chả băm bọc lá lốt thơm lừng', address: 'Số 10 Hoàng Cầu, Ô Chợ Dừa, Đống Đa, Hà Nội', priceRange: '50.000 - 80.000 VNĐ / suất', openingHours: '07:00 - 21:00', rating: 4.7, highlightTip: 'Thương hiệu bún chả gia truyền từ thế kỷ 20 với nước dùng hầm xương ngọt thanh.', city: 'Hà Nội', region: 'North' },
      { name: 'Bún Chả 145 Bùi Viện (Sài Gòn)', dish: 'Bún chả que tre nướng than, nem cua bể thơm giòn', address: 'Số 145 Bùi Viện, Phạm Ngũ Lão, Quận 1, TP.HCM', priceRange: '45.000 - 75.000 VNĐ / suất', openingHours: '11:00 - 20:00', rating: 4.8, highlightTip: 'Quán bún chả được khách Tây và người Sài Gòn khen ngợi chuẩn vị Bắc.', city: 'TP.HCM', region: 'South' },
      { name: 'Bún Chả Hà Nội Phố (Đà Nẵng)', dish: 'Chả viên nướng than hoa, bún tươi làng Phú Đô, nem rán', address: 'Số 164 Đống Đa, Thạch Thang, Hải Châu, Đà Nẵng', priceRange: '40.000 - 65.000 VNĐ / suất', openingHours: '07:00 - 21:00', rating: 4.7, highlightTip: 'Nước chấm pha ấm nóng đậm đà, thịt chả tẩm ướp hành hoa thơm phức.', city: 'Đà Nẵng', region: 'Central' },
    ],
  },

  'bun-bo-hue': {
    originCity: 'Thừa Thiên Huế',
    originProvince: 'Thừa Thiên Huế',
    destinationId: 'hue-ancient-capital',
    gallery: [
      { url: bunBoHueImg, captionVi: 'Tô bún bò Huế sợi to bóng mượt với bắp bò, giò heo, huyết luộc và nước dùng sả ruốc cay nồng', captionEn: 'Hue spicy beef noodle soup with lemongrass, shrimp paste and rich broth', captionKo: '레몬그라스와 새우 발효장으로 맛을 낸 매콤한 후에 분보후에' },
      { url: hueThienMuImg, captionVi: 'Chùa Thiên Mụ và sông Hương thơ mộng - Không gian cố đô Huế trầm mặc', captionEn: 'Thien Mu Pagoda and the serene Perfume River in Hue', captionKo: '후에의 상징 티엔무 사원과 흐엉강' },
      { url: hueCitadelImg, captionVi: 'Đại Nội Huế - Nơi lưu giữ tinh hoa ẩm thực cung đình triều Nguyễn', captionEn: 'Imperial Citadel of Hue - Preserving ancient royal gastronomy', captionKo: '조선 왕실 요리에 필적하는 응우옌 왕조 궁중 요리의 발원지 후에 황궁' },
    ],
    diningSpots: [
      { name: 'Bún Bò Mụ Rơi (Cố Đô Huế)', dish: 'Bún bò tái nạm, gân bò dẻo quánh, chả cua Huế thơm lừng', address: 'Số 40 Nguyễn Chí Diễu, Thuận Thành, TP. Huế', priceRange: '40.000 - 60.000 VNĐ / tô', openingHours: '06:30 - 10:00 (Hết sớm)', rating: 4.9, highlightTip: 'Nước dùng trong nhưng đậm đà sả ớt, chả cua giòn ngọt tan trên đầu lưỡi.', city: 'Huế', region: 'Central' },
      { name: 'Bún Bò Bà Tuyết', dish: 'Bún bò giò heo hầm mềm róc xương, nước dùng thơm ngát mùi ruốc Huế', address: 'Số 47 Đỗ Thúc Tịnh, Vĩnh Ninh, TP. Huế', priceRange: '35.000 - 55.000 VNĐ / tô', openingHours: '06:00 - 11:00', rating: 4.8, highlightTip: 'Quán ăn lâu năm của người bản địa, rau sống gồm bắp chuối thái mỏng tươi ngon.', city: 'Huế', region: 'Central' },
      { name: 'Bún Bò O Cương Chú Điệp', dish: 'Bún bò sườn bò hầm béo ngậy, móng giò giòn sần sật', address: 'Số 6 Trần Thúc Nhẫn, Vĩnh Ninh, TP. Huế', priceRange: '40.000 - 65.000 VNĐ / tô', openingHours: '06:30 - 11:30', rating: 4.8, highlightTip: 'Sợi bún to tròn chuẩn phong cách Huế, nước dùng ngọt hậu từ xương ống ninh 10 tiếng.', city: 'Huế', region: 'Central' },
      { name: 'Bún Bò Gánh (Sài Gòn)', dish: 'Bún bò bắp hoa, giò gân, chả cua cay nồng xứ Huế', address: 'Số 110 Lý Chính Thắng, Võ Thị Sáu, Quận 3, TP.HCM', priceRange: '50.000 - 80.000 VNĐ / tô', openingHours: '06:00 - 22:00', rating: 4.8, highlightTip: 'Không gian ấm cúng, nước dùng cay đượm chuẩn phong vị cố đô tại trung tâm Sài Gòn.', city: 'TP.HCM', region: 'South' },
      { name: 'Bún Bò Huế O Xuân (Hà Nội)', dish: 'Bún bò tái chả móng giò, nem lụi nướng chấm tương đậu ngậy', address: 'Số 5D Quang Trung, Tràng Tiền, Hoàn Kiếm, Hà Nội', priceRange: '45.000 - 75.000 VNĐ / tô', openingHours: '07:00 - 21:30', rating: 4.7, highlightTip: 'Quán bún bò Huế đông khách bậc nhất Hà thành, nước dùng đậm thơm hương mắm ruốc.', city: 'Hà Nội', region: 'North' },
      { name: 'Bún Bò Huế Bà Diệu (Đà Nẵng)', dish: 'Bún bò giò nạc, gân bò dẻo, chả cây gói lá chuối', address: 'Số 17 Trần Tống, Thạc Gián, Thanh Khê, Đà Nẵng', priceRange: '40.000 - 60.000 VNĐ / tô', openingHours: '13:30 - 19:30', rating: 4.8, highlightTip: 'Nước dùng ninh xương sánh ngọt, chỉ mở bán buổi chiều và thường hết rất sớm.', city: 'Đà Nẵng', region: 'Central' },
    ],
  },

  'com-tam-sai-gon': {
    originCity: 'TP. Hồ Chí Minh',
    originProvince: 'TP. Hồ Chí Minh & Nam Bộ',
    destinationId: 'ho-chi-minh-city',
    gallery: [
      { url: comTamImg, captionVi: 'Đĩa cơm tấm hạt gạo vỡ dẻo thơm với miếng sườn nướng mật ong xém cạnh, chả trứng, bì heo và mỡ hành', captionEn: 'Saigon broken rice with honey-marinated pork chop, egg meatloaf, and scallion oil', captionKo: '숯불 돼지갈비와 계란 찜, 돼지껍질 채를 얹은 사이공 껌땀' },
      { url: saigonImg, captionVi: 'Đô thị Sài Gòn năng động - Nơi mùi sườn nướng than hoa lan tỏa khắp các con phố', captionEn: 'Dynamic Saigon city where fragrant charcoal grilled ribs fill the air', captionKo: '숯불 향이 골목마다 퍼지는 활기찬 사이공 도심 풍경' },
      { url: banhMiImg, captionVi: 'Nền văn hóa ẩm thực đường phố Nam Bộ phóng khoáng, chân tình', captionEn: 'Generous and lively Southern Vietnamese culinary culture', captionKo: '남부 베트남의 정겨운 서민 길거리 음식 문화' },
    ],
    diningSpots: [
      { name: 'Cơm Tấm Ba Ghiền (Sài Gòn)', dish: 'Miếng sườn nướng khổng lồ che kín đĩa cơm, chả trứng bùi béo', address: 'Số 84 Đặng Văn Ngữ, Phường 10, Quận Phú Nhuận, TP.HCM', priceRange: '75.000 - 120.000 VNĐ / đĩa', openingHours: '07:30 - 20:30', rating: 4.8, highlightTip: 'Được Michelin Guide tuyển chọn vinh danh, sườn ướp đậm đà mềm tan.', city: 'TP.HCM', region: 'South' },
      { name: 'Cơm Tấm Thuận Kiều', dish: 'Cơm tấm sườn bì chả truyền thống, canh khổ qua dồn thịt', address: 'Số 54 Thuận Kiều, Phường 4, Quận 11, TP.HCM', priceRange: '55.000 - 95.000 VNĐ / đĩa', openingHours: '06:00 - 22:00', rating: 4.7, highlightTip: 'Hơn 40 năm tuổi đời, nước mắm pha kẹo sền sệt mặn ngọt vô cùng hấp dẫn.', city: 'TP.HCM', region: 'South' },
      { name: 'Cơm Tấm Phúc Lộc Thọ', dish: 'Cơm sườn nướng than hoa thơm lừng, bì dai giòn, chả hấp thơm ngậy', address: 'Số 236 Đinh Tiên Hoàng, Đa Kao, Quận 1, TP.HCM', priceRange: '42.000 - 68.000 VNĐ / suất', openingHours: '06:00 - 22:00', rating: 4.6, highlightTip: 'Không gian sạch sẽ máy lạnh, phục vụ nhanh, nước mắm tỏi ớt dẻo quánh đặc trưng.', city: 'TP.HCM', region: 'South' },
      { name: 'Cơm Tấm Nam Phương (Hà Nội)', dish: 'Cơm tấm sườn cọng nướng than hoa, trứng ốp la lòng đào', address: 'Số 102 E6 Tạ Quang Bửu, Bách Khoa, Hai Bà Trưng, Hà Nội', priceRange: '45.000 - 70.000 VNĐ / đĩa', openingHours: '09:30 - 21:00', rating: 4.7, highlightTip: 'Mang hương vị cơm tấm Sài Gòn chuẩn mực ra đất Bắc, đĩa cơm đầy đặn mỡ hành béo ngậy.', city: 'Hà Nội', region: 'North' },
      { name: 'Cơm Tấm Bà Lang (Đà Nẵng)', dish: 'Cơm tấm sườn nướng mật ong, chả bì trứng đúc', address: 'Số 120 Yên Bái, Phước Ninh, Hải Châu, Đà Nẵng', priceRange: '35.000 - 60.000 VNĐ / dĩa', openingHours: '06:30 - 21:00', rating: 4.8, highlightTip: 'Quán cơm tấm nổi tiếng lâu năm của người Đà thành, hạt gạo tấm dẻo ngọt.', city: 'Đà Nẵng', region: 'Central' },
    ],
  },

  'mi-quang-da-nang': {
    originCity: 'Đà Nẵng & Hội An',
    originProvince: 'Đà Nẵng & Quảng Nam',
    destinationId: 'da-nang-city',
    gallery: [
      { url: miQuangImg, captionVi: 'Tô mì Quảng sợi vàng óng chan nước nhưn tôm thịt đậm đà, rắc đậu phộng bùi bùi và bánh tráng mè giòn tan', captionEn: 'Da Nang Mi Quang turmeric rice noodles with savory shrimp-pork broth and sesame crackers', captionKo: '노란 강황 쌀국수 면에 새우, 돼지고기 육수를 자작하게 부어 먹는 미꽝' },
      { url: danangImg, captionVi: 'Thành phố biển Đà Nẵng và Cầu Rồng - Điểm đến ẩm thực hấp dẫn bậc nhất miền Trung', captionEn: 'Coastal Da Nang and Dragon Bridge - Premier Central culinary hub', captionKo: '해변 도시 다낭과 용다리 - 미식의 중심지' },
      { url: hoianImg, captionVi: 'Đất Quảng mộc mạc - Nơi sợi mì gạo gắn liền với nếp sống cư dân bản địa', captionEn: 'Rustic Quang countryside where rice noodles symbolize local livelihood', captionKo: '꽝남의 소박하고 깊은 정이 담긴 전통 쌀국수' },
    ],
    diningSpots: [
      { name: 'Mì Quảng Bà Mua (Đà Nẵng)', dish: 'Mì Quảng tôm thịt, mì Quảng gà ta, mì lươn đồng đậm vị', address: 'Số 19 Trần Bình Trọng, Phước Ninh, Hải Châu, Đà Nẵng', priceRange: '40.000 - 60.000 VNĐ / tô', openingHours: '06:30 - 21:30', rating: 4.8, highlightTip: 'Nước nhưn nấu sắc lại đậm đà thơm ngậy, ăn kèm đĩa rau sống búp chuối tươi ngon.', city: 'Đà Nẵng', region: 'Central' },
      { name: 'Mì Quảng Ếch Bếp Trang', dish: 'Mì Quảng ếch om sả ớt trong thố đất nóng hổi, mẹt tre dân dã', address: 'Số 441 Ông Ích Khiêm, Nam Dương, Hải Châu, Đà Nẵng', priceRange: '45.000 - 75.000 VNĐ / phần', openingHours: '07:00 - 22:00', rating: 4.8, highlightTip: 'Cách bày trí sáng tạo trên mẹt tre lót lá chuối, thịt ếch đồng dai ngọt cay tê.', city: 'Đà Nẵng', region: 'Central' },
      { name: 'Mì Quảng Bích', dish: 'Mì Quảng sườn non, chả tôm cua, bánh tráng nướng giòn rụm', address: 'Số 1 Triệu Nữ Vương, Hải Châu 2, Hải Châu, Đà Nẵng', priceRange: '35.000 - 50.000 VNĐ / tô', openingHours: '06:00 - 21:00', rating: 4.7, highlightTip: 'Quán ăn bình dân được người dân Đà Nẵng yêu thích hơn 20 năm qua.', city: 'Đà Nẵng', region: 'Central' },
      { name: 'Mì Quảng Ông Hai (Hội An)', dish: 'Mì Quảng sườn heo, cao lầu sợi dai vàng óng nước sốt đậm', address: 'Số 6A Trương Minh Lượng, Cẩm Châu, Hội An', priceRange: '35.000 - 50.000 VNĐ / tô', openingHours: '07:30 - 21:00', rating: 4.9, highlightTip: 'Quán nhỏ ấm cúng trong lòng phố cổ, hương vị mộc mạc nguyên bản xứ Quảng.', city: 'Hội An', region: 'Central' },
      { name: 'Mì Quảng Sâm (Sài Gòn)', dish: 'Mì Quảng gà đồi, tôm thịt trứng cút, bánh đa mè giòn rụm', address: 'Số 8 Ca Văn Thỉnh, Phường 11, Tân Bình, TP.HCM', priceRange: '40.000 - 60.000 VNĐ / tô', openingHours: '06:00 - 21:30', rating: 4.7, highlightTip: 'Nằm trong khu phố người Quảng tại Sài Gòn, giữ trọn vị ớt xanh và đọt chuối.', city: 'TP.HCM', region: 'South' },
      { name: 'Mì Quảng Tâm Quán (Hà Nội)', dish: 'Mì Quảng tôm thịt rim, gà ta xào nghệ vàng ươm', address: 'Số 103 Ngọc Khánh, Giảng Võ, Ba Đình, Hà Nội', priceRange: '45.000 - 65.000 VNĐ / tô', openingHours: '07:00 - 21:00', rating: 4.7, highlightTip: 'Nước nhưn sắc chuẩn vị miền Trung phục vụ thực khách yêu ẩm thực đất Quảng tại thủ đô.', city: 'Hà Nội', region: 'North' },
    ],
  },

  'banh-xeo-mientay': {
    originCity: 'Cần Thơ',
    originProvince: 'Cần Thơ & Miền Tây Nam Bộ',
    destinationId: 'mekong-delta-can-tho',
    gallery: [
      { url: banhXeoImg, captionVi: 'Chiếc bánh xèo giòn rụm viền mỏng vàng óng nhân tôm sông, thịt ba rọi cuốn cùng hơn 10 loại rau rừng', captionEn: 'Sizzling Southern crispy pancake with river shrimp, pork and wild orchard herbs', captionKo: '바삭하게 부쳐낸 황금빛 베트남식 팬케이크 반쎄오와 야생 허브 채소' },
      { url: cairangImg, captionVi: 'Chợ nổi Cái Răng Cần Thơ - Sông nước miệt vườn cây trái trĩu cành', captionEn: 'Cai Rang floating market Can Tho - Lush riverway orchard paradise', captionKo: '풍요로운 과일과 수상 시장이 있는 껀터 까이랑' },
      { url: saigonImg, captionVi: 'Văn hóa đổ bánh xèo xèo vui tai rộn rã trên chảo gang rực lửa', captionEn: 'Traditional sizzling sound as rice batter hits the blazing wok', captionKo: '지글지글 소리가 입맛을 돋우는 전통 부침 요리 문화' },
    ],
    diningSpots: [
      { name: 'Bánh Xèo Mười Xiềm (Cần Thơ)', dish: 'Bánh xèo nấm kim châm, bánh xèo cổ hũ dừa tôm thịt', address: 'Số 13/3 Nguyễn Chí Thanh, Trà An, Bình Thủy, Cần Thơ', priceRange: '60.000 - 90.000 VNĐ / cái lớn', openingHours: '09:00 - 21:00', rating: 4.8, highlightTip: 'Nghệ nhân Mười Xiềm từng mang món bánh xèo Việt Nam đi biểu diễn tại Mỹ.', city: 'Cần Thơ', region: 'South' },
      { name: 'Bánh Xèo 7 Tới (Cần Thơ)', dish: 'Bánh xèo vịt xiêm củ hũ dừa, bánh khọt nước cốt dừa béo ngậy', address: 'Số 45 Hoàng Quốc Việt, An Bình, Ninh Kiều, Cần Thơ', priceRange: '50.000 - 80.000 VNĐ / cái', openingHours: '07:30 - 21:30', rating: 4.9, highlightTip: 'Đĩa rau rừng cực kỳ phong phú gồm lá xoài non, lá cóc, đọt bằng lăng giòn ngọt.', city: 'Cần Thơ', region: 'South' },
      { name: 'Bánh Xèo Ngọc Sơn (Sài Gòn)', dish: 'Bánh xèo tôm nhảy, bánh xèo thịt bò giòn tan chấm mắm chua ngọt', address: 'Số 103 Hà Huy Giáp, Thạnh Lộc, Quận 12, TP.HCM', priceRange: '55.000 - 85.000 VNĐ / cái', openingHours: '09:00 - 21:00', rating: 4.7, highlightTip: 'Vỏ bánh mỏng tang giòn rụm không hề ngấy dầu mỡ, nước mắm tỏi ớt pha tuyệt ngon.', city: 'TP.HCM', region: 'South' },
      { name: 'Bánh Xèo Ăn Là Ghiền (Sài Gòn)', dish: 'Bánh xèo nấm bào ngư, bánh xèo hải sản tôm mực rau rừng', address: 'Số 74 Sương Nguyệt Ánh, Bến Thành, Quận 1, TP.HCM', priceRange: '65.000 - 110.000 VNĐ / cái', openingHours: '09:30 - 22:00', rating: 4.7, highlightTip: 'Chuỗi bánh xèo miệt vườn danh tiếng phục vụ thực khách sành ăn tại trung tâm TP.HCM.', city: 'TP.HCM', region: 'South' },
      { name: 'Bánh Xèo Bà Dưỡng (Đà Nẵng)', dish: 'Bánh xèo đúc chảo giòn thơm cuộn bánh tráng, nem lụi chấm nước tương gan nếp', address: 'K280/23 Hoàng Diệu, Bình Hiên, Hải Châu, Đà Nẵng', priceRange: '20.000 - 50.000 VNĐ / đĩa', openingHours: '09:30 - 21:30', rating: 4.8, highlightTip: 'Quán bánh xèo hẻm lừng danh nhất miền Trung với nước chấm gan thịt đậu phộng độc quyền.', city: 'Đà Nẵng', region: 'Central' },
      { name: 'Bánh Xèo Tôm Nhảy Cô Ba (Hà Nội)', dish: 'Bánh xèo tôm đất nhảy tanh tách giòn rụm, cuốn xoài xanh', address: 'Số 101 B2 Nguyễn Chí Thanh, Đống Đa, Hà Nội', priceRange: '40.000 - 75.000 VNĐ / đĩa', openingHours: '10:00 - 22:00', rating: 4.7, highlightTip: 'Địa chỉ thưởng thức bánh xèo giòn tan phong vị Nam Bộ được yêu thích tại Hà Nội.', city: 'Hà Nội', region: 'North' },
    ],
  },

  'egg-coffee-hanoi': {
    originCity: 'Hà Nội',
    originProvince: 'Hà Nội',
    destinationId: 'hanoi-old-quarter',
    gallery: [
      { url: eggCoffeeImg, captionVi: 'Tách cà phê trứng nóng hổi với lớp kem trứng đánh bông mịn như nhung phủ trên cà phê phin đậm đà', captionEn: 'Iconic Hanoi hot egg coffee with velvety whipped egg yolk froth over robust drip coffee', captionKo: '벨벳처럼 부드러운 달걀 크림을 얹은 하노이 명물 에그 커피' },
      { url: hanoiImg, captionVi: 'Hồ Gươm phố cổ Hà Nội - Không gian hoài niệm nhâm nhi cà phê sáng', captionEn: 'Hoan Kiem Lake Old Quarter - Nostalgic ambiance to savor morning coffee', captionKo: '하노이 구시가지의 고즈넉한 아침 커피 분위기' },
      { url: phoImg, captionVi: 'Món tráng miệng và thức uống danh tiếng toàn cầu của người Tràng An', captionEn: 'World-renowned dessert beverage of historic Hanoi elegance', captionKo: 'CNN 등 세계 언론이 극찬한 하노이의 대표 디저트 음료' },
    ],
    diningSpots: [
      { name: 'Cafe Giảng 1946 (Nguyên Bản)', dish: 'Cà phê trứng nóng, Cà phê trứng đá, Cacao trứng béo ngậy', address: 'Ngõ 39 Nguyễn Hữu Huân, Lý Thái Tổ, Hoàn Kiếm, Hà Nội', priceRange: '35.000 - 50.000 VNĐ / ly', openingHours: '07:00 - 22:00', rating: 4.9, highlightTip: 'Cụ Nguyễn Văn Giảng sáng tạo ra công thức cà phê trứng huyền thoại từ năm 1946.', city: 'Hà Nội', region: 'North' },
      { name: 'Cafe Đinh (Bà Bích)', dish: 'Cà phê trứng, ca cao trứng view trọn vẹn bờ Hồ Gươm', address: 'Tầng 2, số 13 Đinh Tiên Hoàng, Hàng Bạc, Hoàn Kiếm, Hà Nội', priceRange: '30.000 - 45.000 VNĐ / ly', openingHours: '07:00 - 21:30', rating: 4.8, highlightTip: 'Quán cà phê mộc mạc cổ kính trên gác hai nhìn thẳng ra Tháp Rùa thơ mộng.', city: 'Hà Nội', region: 'North' },
      { name: 'Cafe Phố Cổ (11 Hàng Gai)', dish: 'Cà phê trứng trong ngôi nhà cổ 4 gian ngắm toàn cảnh Hồ Gươm từ sân thượng', address: 'Số 11 Hàng Gai, Hàng Trống, Hoàn Kiếm, Hà Nội', priceRange: '40.000 - 60.000 VNĐ / ly', openingHours: '08:00 - 22:30', rating: 4.7, highlightTip: 'Lối vào qua con ngõ sâu hun hút dẫn lên sân thượng tầng thượng view 360 độ Hồ Gươm.', city: 'Hà Nội', region: 'North' },
      { name: 'Little HaNoi Egg Coffee (Sài Gòn)', dish: 'Cà phê trứng nguyên bản phong cách phố cổ, bánh mì nướng bơ mật ong', address: 'Số 119/5 Yersin, Phường Cầu Ông Lãnh, Quận 1, TP.HCM', priceRange: '45.000 - 65.000 VNĐ / ly', openingHours: '08:00 - 22:00', rating: 4.8, highlightTip: 'Góc phố cổ Hà Nội tái hiện giữa lòng Sài Gòn với lớp kem trứng thơm béo chuẩn vị.', city: 'TP.HCM', region: 'South' },
      { name: 'Retro Kitchen & Bar Egg Coffee (Đà Nẵng)', dish: 'Cà phê trứng nướng caramel, kem trứng đánh bông nhung tuyết', address: 'Số 85-87 Trần Phú, Hải Châu 1, Hải Châu, Đà Nẵng', priceRange: '40.000 - 60.000 VNĐ / ly', openingHours: '07:00 - 22:30', rating: 4.7, highlightTip: 'Không gian sang trọng kết hợp hương vị cà phê trứng truyền thống Việt Nam.', city: 'Đà Nẵng', region: 'Central' },
    ],
  },
};
