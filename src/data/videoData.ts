import halongImg from '../assets/images/halong_bay_karst_1789531154772.jpg';
import hanoiImg from '../assets/images/hanoi_hoankiem_lake_1789531168556.jpg';
import sapaImg from '../assets/images/sapa_rice_terraces_1789531183033.jpg';
import tranganImg from '../assets/images/trangan_ninhbinh_1789531195824.jpg';
import lungCuImg from '../assets/images/lung_cu_flag_tower_1789530668278.jpg';

import phoImg from '../assets/images/pho_vietnam_1789530541480.jpg';
import bunChaImg from '../assets/images/bun_cha_hanoi_1789530568497.jpg';
import eggCoffeeImg from '../assets/images/egg_coffee_hanoi_1789530640290.jpg';
import banhMiImg from '../assets/images/banh_mi_vietnam_1789530554776.jpg';

import hueCitadelImg from '../assets/images/hue_citadel_monument_1789530680714.jpg';
import hueThienMuImg from '../assets/images/hue_thienmu_pagoda_1789531224397.jpg';
import hoianImg from '../assets/images/hoian_ancient_bridge_1789531239369.jpg';
import danangImg from '../assets/images/danang_golden_bridge_1789531252694.jpg';
import phongnhaImg from '../assets/images/phongnha_cave_river_1789531208995.jpg';

import bunBoHueImg from '../assets/images/bun_bo_hue_1789530580655.jpg';
import miQuangImg from '../assets/images/mi_quang_danang_1789530609604.jpg';

import saigonImg from '../assets/images/saigon_city_view_1789531280393.jpg';
import cairangImg from '../assets/images/cairang_floating_mkt_1789531303058.jpg';
import phuquocImg from '../assets/images/phuquoc_sao_beach_1789531318779.jpg';
import dalatImg from '../assets/images/dalat_flower_hills_1789531267114.jpg';

import comTamImg from '../assets/images/com_tam_saigon_1789530596304.jpg';
import banhXeoImg from '../assets/images/banh_xeo_mientay_1789530626361.jpg';

export type VideoCategory = 'all' | 'beauty' | 'cuisine';
export type VideoRegion = 'all' | 'North' | 'Central' | 'South';

export interface SceneSlide {
  titleVi: string;
  titleEn: string;
  image: string;
  descVi: string;
  descEn: string;
}

export interface VietnamShowcaseVideo {
  id: string;
  region: 'North' | 'Central' | 'South' | 'all';
  category: 'beauty' | 'cuisine';
  titleVi: string;
  titleEn: string;
  subtitleVi: string;
  subtitleEn: string;
  descriptionVi: string;
  descriptionEn: string;
  videoStreamUrl: string; // Direct CORS-friendly HTML5 MP4 stream hosted on Google CDN
  youtubeEmbedUrl: string; // Embeddable YouTube URL
  youtubeWatchUrl: string; // Direct watch URL
  duration: string;
  thumbnail: string;
  scenes: SceneSlide[];
  highlights: string[];
  voiceGuideVi: string;
  voiceGuideEn: string;
}

export const VIETNAM_REGION_VIDEOS: VietnamShowcaseVideo[] = [
  // 1. MIỀN BẮC - VẺ ĐẸP DANH THẮNG
  {
    id: 'north-beauty',
    region: 'North',
    category: 'beauty',
    titleVi: 'Vẻ Đẹp Non Nước Miền Bắc: Vịnh Hạ Long, Tràng An, Sa Pa & Mù Cang Chải',
    titleEn: 'Northern Vietnam Beauty: Ha Long Bay, Trang An, Sa Pa & Mu Cang Chai',
    subtitleVi: 'Kỳ quan thiên nhiên thế giới, danh thắng non xanh nước biếc & ruộng bậc thang kỳ vĩ',
    subtitleEn: 'World Natural Heritage, emerald waters, limestone peaks and cascading rice terraces',
    descriptionVi:
      'Hành trình chiêm ngưỡng vẻ đẹp hùng vĩ của miền Bắc: Vịnh Hạ Long với hàng nghìn đảo đá vôi nhấp nhô giữa làn nước ngọc bích, quần thể danh thắng Tràng An non nước hữu tình, ruộng bậc thang Mù Cang Chải vàng óng mùa lúa chín, đỉnh Fansipan nóc nhà Đông Dương và thủ đô Hà Nội ngàn năm văn hiến bên bờ Hồ Gươm.',
    descriptionEn:
      'Experience Northern Vietnam’s spectacular landscapes: Ha Long Bay with thousands of towering karst islands, Trang An landscape complex, sweeping golden terraced fields of Mu Cang Chai, and peaceful historic Hanoi.',
    videoStreamUrl:
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    youtubeEmbedUrl: 'https://www.youtube-nocookie.com/embed/5-9F1g50iB4?rel=0',
    youtubeWatchUrl: 'https://www.youtube.com/watch?v=5-9F1g50iB4',
    duration: '04:15',
    thumbnail: halongImg,
    scenes: [
      {
        titleVi: 'Vịnh Hạ Long - Kỳ Quan Thế Giới',
        titleEn: 'Ha Long Bay - World Wonder',
        image: halongImg,
        descVi: 'Gần 2.000 hòn đảo đá vôi kỳ vĩ soi bóng xuống làn nước biển ngọc bích phẳng lặng.',
        descEn: 'Nearly 2,000 towering limestone pillars rising above emerald waters.',
      },
      {
        titleVi: 'Tràng An Ninh Bình - Di Sản Non Nước',
        titleEn: 'Trang An - Scenic Heritage',
        image: tranganImg,
        descVi: 'Dòng sông Sào Khê uốn lượn qua các dãy núi đá vôi và hang động ngập nước lung linh.',
        descEn: 'Winding rivers flowing beneath towering limestone cliffs and mystical caverns.',
      },
      {
        titleVi: 'Ruộng Bậc Thang Sa Pa & Mù Cang Chải',
        titleEn: 'Terraced Rice Fields of Sa Pa',
        image: sapaImg,
        descVi: 'Những nấc thang vàng óng mùa lúa chín vươn lên mây trời Hoàng Liên Sơn hùng vĩ.',
        descEn: 'Golden cascading rice terraces reaching into the misty northern clouds.',
      },
      {
        titleVi: 'Cột Cờ Lũng Cú - Điểm Cực Bắc Tổ Quốc',
        titleEn: 'Lung Cu Flag Tower - Northern Frontier',
        image: lungCuImg,
        descVi: 'Lá cờ đỏ sao vàng 54m² tung bay kiêu hãnh trên đỉnh núi rồng cao nguyên đá Hà Giang.',
        descEn: 'The national flag fluttering high above the dramatic karst plateau of Ha Giang.',
      },
    ],
    highlights: ['Vịnh Hạ Long', 'Tràng An Ninh Bình', 'Ruộng bậc thang Sa Pa', 'Hồ Gươm Hà Nội', 'Cột cờ Lũng Cú'],
    voiceGuideVi:
      'Chào mừng bạn đến với vẻ đẹp non nước miền Bắc Việt Nam. Nơi đây hội tụ kỳ quan thiên nhiên thế giới Vịnh Hạ Long với làn nước ngọc bích, di sản kép Tràng An Ninh Bình non nước hữu tình, và những thửa ruộng bậc thang kỳ vĩ uốn lượn bên sườn núi Hoàng Liên Sơn. Mời bạn cùng chiêm ngưỡng những cảnh quay ngoạn mục.',
    voiceGuideEn:
      'Welcome to the breathtaking landscapes of Northern Vietnam, featuring world wonder Ha Long Bay, the UNESCO dual heritage site of Trang An Ninh Binh, and the sweeping golden rice terraces of Sa Pa and Mu Cang Chai.',
  },

  // 2. MIỀN BẮC - ẨM THỰC TRUYỀN THỐNG
  {
    id: 'north-cuisine',
    region: 'North',
    category: 'cuisine',
    titleVi: 'Tinh Hoa Ẩm Thực Bắc Bộ: Phở Hà Nội Gia Truyền, Bún Chả & Cà Phê Trứng',
    titleEn: 'Northern Gastronomy: Traditional Hanoi Pho, Bun Cha & Egg Coffee',
    subtitleVi: 'Nghệ thuật ẩm thực thanh tao, tinh tế đậm đà hồn cốt xứ Tràng An',
    subtitleEn: 'Refined Hanoi flavors, simmering bone broths, and delicate aromatic herbs',
    descriptionVi:
      'Ẩm thực miền Bắc nổi tiếng với sự tinh tế, thanh nhã và cân bằng ngũ vị. Điểm nhấn là bát Phở bò Hà Nội nghi ngút khói với nước dùng ninh xương hoa hồi quế ngọt thanh, món Bún chả than hoa chấm nước mắm chua ngọt ăn kèm rau thơm, đĩa Bánh mì giòn rụm và ly Cà phê trứng béo ngậy thơm lừng ngõ nhỏ phố cổ.',
    descriptionEn:
      'Northern cuisine represents elegance and balance: a steaming bowl of traditional Hanoi Pho steeped in fragrant star anise and cinnamon, smoky grilled pork Bun Cha, and decadent Hanoi egg coffee.',
    videoStreamUrl:
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    youtubeEmbedUrl: 'https://www.youtube-nocookie.com/embed/z3bT2GgV4z4?rel=0',
    youtubeWatchUrl: 'https://www.youtube.com/watch?v=z3bT2GgV4z4',
    duration: '03:50',
    thumbnail: phoImg,
    scenes: [
      {
        titleVi: 'Phở Bò Hà Nội Truyền Thống',
        titleEn: 'Traditional Hanoi Beef Pho',
        image: phoImg,
        descVi: 'Nước dùng ninh xương bò suốt hàng chục giờ cùng gừng nướng, hoa hồi và thảo quả thanh ngọt.',
        descEn: 'Clear, deeply flavorful beef broth simmered for hours with charred aromatics.',
      },
      {
        titleVi: 'Bún Chả Nướng Than Hoa Xứ Tràng An',
        titleEn: 'Charcoal Grilled Pork Bun Cha',
        image: bunChaImg,
        descVi: 'Chả miếng và chả viên nướng xém cạnh thơm lừng trên than hồng, chấm mắm đu đủ chua ngọt giòn tan.',
        descEn: 'Pork patties caramelized over hot coals served in savory-sweet dipping broth.',
      },
      {
        titleVi: 'Cà Phê Trứng Phố Cổ Hà Nội',
        titleEn: 'Historic Hanoi Egg Coffee',
        image: eggCoffeeImg,
        descVi: 'Lớp kem trứng đánh bông mịn như nhung hòa quyện hoàn hảo cùng cà phê Robusta đen đậm đà.',
        descEn: 'Velvety whipped egg yolk foam poured gracefully over intense dark drip coffee.',
      },
      {
        titleVi: 'Bánh Mì Hà Nội Giòn Thơm',
        titleEn: 'Crispy Vietnamese Banh Mi',
        image: banhMiImg,
        descVi: 'Vỏ bánh mì nướng giòn rụm kẹp pate gan, chả lụa, dưa góp và sốt mayonnaise thơm béo.',
        descEn: 'A crackling crust stuffed with savory pate, pork sausage, herbs, and pickled daikon.',
      },
    ],
    highlights: ['Phở bò Hà Nội', 'Bún chả nướng than hoa', 'Cà phê trứng phố cổ', 'Bánh mì truyền thống'],
    voiceGuideVi:
      'Ẩm thực Bắc Bộ mang đậm nét thanh tao của người Hà Nội xưa. Nước dùng phở được ninh từ xương bò suốt hàng chục giờ cùng hoa hồi, quế, thảo quả, tạo nên vị ngọt trong veo không lẫn vào đâu được. Cùng với bún chả thơm nức và tách cà phê trứng ấm áp, đây là linh hồn của văn hóa ẩm thực Thăng Long.',
    voiceGuideEn:
      'Northern culinary traditions emphasize purity and delicate balance. Traditional pho broth simmers for hours with charred ginger, cinnamon, and star anise for deep aromatic warmth, paired with smoky bun cha and rich egg coffee.',
  },

  // 3. MIỀN TRUNG - VẺ ĐẸP DI SẢN
  {
    id: 'central-beauty',
    region: 'Central',
    category: 'beauty',
    titleVi: 'Vẻ Đẹp Di Sản Miền Trung: Cố Đô Huế, Phố Cổ Hội An & Cầu Vàng Đà Nẵng',
    titleEn: 'Central Vietnam Heritage: Hue Imperial City, Hoi An Lanterns & Da Nang',
    subtitleVi: 'Dải đất trầm tích lịch sử, biển xanh cát trắng & quần thể di sản UNESCO',
    subtitleEn: 'UNESCO World Heritage citadels, romantic river lantern streets and tropical coastline',
    descriptionVi:
      'Miền Trung là dải đất trữ tình nơi thời gian như lắng đọng: nét thâm trầm cổ kính của Đại Nội Cố đô Huế soi bóng sông Hương, phố cổ Hội An rực rỡ sắc màu đèn lồng trong đêm rằm, cầu Vàng nâng đỡ bởi bàn tay khổng lồ trên đỉnh Bà Nà Đà Nẵng, và những hang động thạch nhũ kỳ ảo tại Vườn quốc gia Phong Nha - Kẻ Bàng.',
    descriptionEn:
      'Central Vietnam is a rich cultural corridor: the regal palaces of Hue Imperial Citadel along the Perfume River, atmospheric lantern-lit streets of ancient town Hoi An, coastal beauty of Da Nang, and the colossal caves of Phong Nha.',
    videoStreamUrl:
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    youtubeEmbedUrl: 'https://www.youtube-nocookie.com/embed/Xg5cO48zBQE?rel=0',
    youtubeWatchUrl: 'https://www.youtube.com/watch?v=Xg5cO48zBQE',
    duration: '04:30',
    thumbnail: hoianImg,
    scenes: [
      {
        titleVi: 'Phố Cổ Hội An - Sắc Màu Đèn Lồng',
        titleEn: 'Hoi An Ancient Town - Lantern Glow',
        image: hoianImg,
        descVi: 'Khu thương cảng thế kỷ 16 với Chùa Cầu cổ kính và hàng ngàn chiếc đèn lồng hoa đăng rực rỡ.',
        descEn: '16th-century trading port famous for wooden shophouses and lantern-filled evenings.',
      },
      {
        titleVi: 'Đại Nội Cố Đô Huế - Dấu Ấn Triều Nguyễn',
        titleEn: 'Hue Imperial Citadel',
        image: hueCitadelImg,
        descVi: 'Hoàng thành thâm nghiêm với Ngọ Môn, Điện Thái Hòa và lăng tẩm các vị vua triều Nguyễn.',
        descEn: 'The solemn seat of the Nguyen Dynasty boasting majestic gates and ornate shrines.',
      },
      {
        titleVi: 'Cầu Vàng Bà Nà Hills - Đà Nẵng',
        titleEn: 'Golden Bridge - Da Nang',
        image: danangImg,
        descVi: 'Kiến trúc ngoạn mục với đôi bàn tay khổng lồ rêu phong nâng dải lụa vàng giữa mây trời.',
        descEn: 'A breathtaking walkway cradled by two mossy stone giant hands in the clouds.',
      },
      {
        titleVi: 'Chùa Thiên Mụ & Động Phong Nha',
        titleEn: 'Thien Mu Pagoda & Phong Nha Cave',
        image: hueThienMuImg,
        descVi: 'Tháp Phước Duyên cổ kính soi bóng dòng sông Hương thơ mộng êm đềm trôi.',
        descEn: 'The iconic seven-story pagoda serenely overlooking the peaceful Perfume River.',
      },
    ],
    highlights: ['Đại Nội Cố đô Huế', 'Phố cổ Hội An', 'Cầu Vàng Đà Nẵng', 'Động Phong Nha Kẻ Bàng'],
    voiceGuideVi:
      'Miền Trung Việt Nam là con đường di sản vô giá. Đến Huế để cảm nhận nét trang nghiêm cung đình, ghé Hội An thả đèn hoa đăng cầu an trên dòng sông Hoài, và ngắm nhìn cây Cầu Vàng kỳ vĩ trên đỉnh Bà Nà. Dải đất kiên cường với bao trầm tích lịch sử luôn mở rộng vòng tay đón chào du khách.',
    voiceGuideEn:
      'Central Vietnam forms an incredible heritage corridor. Experience Hue’s ancient imperial gates, release floating paper lanterns down Hoi An’s waterways, and marvel at Da Nang’s Golden Bridge.',
  },

  // 4. MIỀN TRUNG - ẨM THỰC ĐẬM ĐÀ
  {
    id: 'central-cuisine',
    region: 'Central',
    category: 'cuisine',
    titleVi: 'Hương Vị Miền Trung: Bún Bò Huế Cay Nồng, Mì Quảng & Cao Lầu Phố Cổ',
    titleEn: 'Central Gastronomy: Spicy Bun Bo Hue, Da Nang Mi Quang & Cao Lau',
    subtitleVi: 'Đậm đà hương sả ớt, hòa quyện phong vị cung đình và ẩm thực dân dã mộc mạc',
    subtitleEn: 'Bold lemongrass chili broths, crispy sesame crackers, and artisanal noodles',
    descriptionVi:
      'Món ăn miền Trung gây thương nhớ bởi sắc thái đậm đà, vị cay nồng đặc trưng của sả ớt và mắm ruốc: tô Bún bò Huế đỏ rực nước dùng thơm phức mùi sả, đĩa Mì Quảng tôm thịt rắc lạc rang giòn rụm ăn cùng bánh tráng mè, cùng bát Cao lầu Hội An dai ngon được nhào từ tro củi Cù Lao Chàm và nước giếng cổ Bá Lễ.',
    descriptionEn:
      'Central Vietnamese cuisine captivates diners with bold, fiery accents: authentic Bun Bo Hue infused with lemongrass and shrimp paste, and savory Mi Quang noodles served with roasted peanuts and crispy rice crackers.',
    videoStreamUrl:
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
    youtubeEmbedUrl: 'https://www.youtube-nocookie.com/embed/0hYl6Pq5uQc?rel=0',
    youtubeWatchUrl: 'https://www.youtube.com/watch?v=0hYl6Pq5uQc',
    duration: '03:40',
    thumbnail: bunBoHueImg,
    scenes: [
      {
        titleVi: 'Bún Bò Huế Cung Đình Cay Nồng',
        titleEn: 'Royal Spicy Bun Bo Hue',
        image: bunBoHueImg,
        descVi: 'Sợi bún to tròn ngập trong nước dùng thơm lừng sả, mắm ruốc Huế và ớt sa tế cay nồng bỏng môi.',
        descEn: 'Thick rice vermicelli in deeply fragrant broth infused with lemongrass and shrimp paste.',
      },
      {
        titleVi: 'Mì Quảng Tôm Thịt Đà Nẵng',
        titleEn: 'Da Nang Mi Quang Noodles',
        image: miQuangImg,
        descVi: 'Sợi mì vàng nghệ chan xăm xắp nước dùng béo ngọt, ăn kèm bánh tráng nướng mè giòn rụm và rau búp chuối.',
        descEn: 'Turmeric rice noodles with braised pork and shrimp, crushed peanuts, and crispy rice paper.',
      },
    ],
    highlights: ['Bún bò xứ Huế', 'Mì Quảng tôm thịt', 'Cao lầu phố cổ Hội An', 'Bánh bèo chén'],
    voiceGuideVi:
      'Ẩm thực miền Trung ghi dấu ấn khó phai bởi vị cay nồng nàn của sả ớt. Tô bún bò Huế thơm ngát mắm ruốc, cùng món Mì Quảng bánh tráng giòn tan chính là sự kết tinh của tình đất tình người miền Trung kiên cường và nồng hậu.',
    voiceGuideEn:
      'Central gastronomy is celebrated for its assertive spices and deep umami. Bun Bo Hue and Mi Quang showcase the culinary passion and hearty spirit of Vietnam’s central coast.',
  },

  // 5. MIỀN NAM - VẺ ĐẸP SÔNG NƯỚC & PHỐ THỊ
  {
    id: 'south-beauty',
    region: 'South',
    category: 'beauty',
    titleVi: 'Vẻ Đẹp Miền Nam: Sông Nước Miệt Vườn Tây Đô, Đảo Ngọc Phú Quốc & Sài Gòn Năng Động',
    titleEn: 'Southern Vietnam Beauty: Mekong River Life, Tropical Phu Quoc & Vibrant Saigon',
    subtitleVi: 'Chợ nổi Cái Răng tấp nập, rừng tràm xanh ngắt, đảo ngọc Phú Quốc & Sài Gòn phồn hoa',
    subtitleEn: 'Floating markets, lush mangrove canals, tropical beaches of Phu Quoc and bustling Ho Chi Minh City',
    descriptionVi:
      'Về phương Nam là về với miền sông nước trù phú hào sảng: chiếc ghe bẹo len lỏi chợ nổi Cái Răng lúc bình minh, xuồng ba lá lướt nhẹ dưới tán rừng dừa nước, bờ cát trắng mịn và hoàng hôn đỏ rực tại Bãi Sao Phú Quốc, cùng nhịp sống sôi động hiện đại của trung tâm kinh tế TP. Hồ Chí Minh.',
    descriptionEn:
      'Southern Vietnam unfolds with lively river culture and endless tropical sun: early morning trade at Cai Rang floating market, peaceful sampan rides through river canals, white beaches of Phu Quoc, and the vibrant modern skyline of Ho Chi Minh City.',
    videoStreamUrl:
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
    youtubeEmbedUrl: 'https://www.youtube-nocookie.com/embed/V3uJkE7k1W4?rel=0',
    youtubeWatchUrl: 'https://www.youtube.com/watch?v=V3uJkE7k1W4',
    duration: '04:45',
    thumbnail: cairangImg,
    scenes: [
      {
        titleVi: 'Chợ Nổi Cái Răng Cần Thơ',
        titleEn: 'Cai Rang Floating Market',
        image: cairangImg,
        descVi: 'Nét văn hóa giao thương độc đáo trên sông Hậu với cây bẹo treo lủng lẳng dưa hấu, khóm, xoài.',
        descEn: 'Lively boat commerce on the Hau River where fruits hang from tall bamboo poles.',
      },
      {
        titleVi: 'Sài Gòn - TP. Hồ Chí Minh Phồn Hoa',
        titleEn: 'Dynamic Ho Chi Minh City',
        image: saigonImg,
        descVi: 'Đô thị hiện đại bậc nhất Việt Nam rực sáng ánh đèn đêm ven sông Sài Gòn phồn hoa.',
        descEn: 'Vietnam’s premier modern metropolis pulsating with skyline energy and historic landmarks.',
      },
      {
        titleVi: 'Bãi Sao Đảo Ngọc Phú Quốc',
        titleEn: 'Sao Beach - Phu Quoc Island',
        image: phuquocImg,
        descVi: 'Bờ cát trắng mịn như kem ôm lấy làn nước biển xanh trong như ngọc bích.',
        descEn: 'Pristine powdery white sands met by crystal-clear turquoise waters in the Gulf of Thailand.',
      },
      {
        titleVi: 'Thành Phố Ngàn Hoa Đà Lạt',
        titleEn: 'Da Lat - City of Eternal Spring',
        image: dalatImg,
        descVi: 'Đồi thông reo trong sương sớm, ngàn hoa khoe sắc và không khí mát lành quanh năm.',
        descEn: 'Misty pine hills, rolling flower valleys, and pleasantly cool mountain climate.',
      },
    ],
    highlights: ['Chợ nổi Cái Răng', 'Rừng dừa nước Bến Tre', 'Biển đảo Phú Quốc', 'Sài Gòn - TP.HCM'],
    voiceGuideVi:
      'Miền Nam đón chào bạn bằng sự hiền hòa, trù phú của vùng đồng bằng sông Cửu Long. Ngồi trên xuồng ba lá len lỏi giữa rừng dừa nước, ghé chợ nổi thưởng thức trái cây miệt vườn tươi ngon và đắm mình trong ánh nắng ấm áp của đảo ngọc Phú Quốc.',
    voiceGuideEn:
      'Southern Vietnam welcomes travelers with warm hospitality and fertile riverways. Traverse coconut canals on traditional wooden boats, visit colorful floating markets, and bask in the tropical sun of Phu Quoc.',
  },

  // 6. MIỀN NAM - ẨM THỰC PHÓNG KHOÁNG
  {
    id: 'south-cuisine',
    region: 'South',
    category: 'cuisine',
    titleVi: 'Ẩm Thực Nam Bộ: Cơm Tấm Sài Gòn Sườn Bì Chả, Bánh Xèo Miền Tây Giòn Rụm',
    titleEn: 'Southern Gastronomy: Saigon Broken Rice & Mekong Crispy Banh Xeo',
    subtitleVi: 'Vị ngọt thanh nước cốt dừa, phong phú rau rừng miệt vườn & đĩa cơm tấm sườn nướng mỡ hành',
    subtitleEn: 'Sweet aromatic broths, overflowing wild river herbs, and savory charcoal-grilled pork chops',
    descriptionVi:
      'Ẩm thực phương Nam mang tính phóng khoáng, ngọt lành và hào sảng: đĩa Cơm tấm Sài Gòn thơm nức sườn nướng mỡ hành trứng ốp la chan nước mắm tỏi ớt kẹo, chiếc Bánh xèo miền Tây to bản giòn rụm gói kèm hơn 20 loại rau rừng sông nước, tô Hủ tiếu Nam Vang thanh ngọt tôm thịt và nồi lẩu mắm cá linh bốc khói cùng bông điên điển.',
    descriptionEn:
      'Southern dining is hearty, generous and flavorful: famous Saigon Com Tam broken rice topped with charred glazed pork chop, giant golden Banh Xeo crepes wrapped with wild herbs, and rich coconut-infused curries.',
    videoStreamUrl:
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
    youtubeEmbedUrl: 'https://www.youtube-nocookie.com/embed/s2Fz2L9l5kM?rel=0',
    youtubeWatchUrl: 'https://www.youtube.com/watch?v=s2Fz2L9l5kM',
    duration: '03:55',
    thumbnail: comTamImg,
    scenes: [
      {
        titleVi: 'Cơm Tấm Sài Gòn Sườn Bì Chả',
        titleEn: 'Saigon Broken Rice with Grilled Pork',
        image: comTamImg,
        descVi: 'Miếng sườn cốt lết nướng than hoa vàng ươm, mỡ hành óng ả, chả trứng bùi béo và nước mắm ớt sánh kẹo.',
        descEn: 'Charcoal-grilled marinated pork chop served over broken rice with scallion oil and fish sauce glaze.',
      },
      {
        titleVi: 'Bánh Xèo Giòn Rụm Miền Tây',
        titleEn: 'Crispy Giant Mekong Crepe',
        image: banhXeoImg,
        descVi: 'Vỏ bánh mỏng tang vàng ươm nghệ và nước cốt dừa, nhân tôm sông, thịt ba rọi cuốn rau cải trời thơm phức.',
        descEn: 'Golden turmeric crepe loaded with pork and river shrimp, eaten wrapped in wild herbs.',
      },
    ],
    highlights: ['Cơm tấm sườn bì chả', 'Bánh xèo miền Tây', 'Hủ tiếu Nam Vang', 'Lẩu mắm cá linh'],
    voiceGuideVi:
      'Ẩm thực Nam Bộ mang đậm chất hào sảng của người phương Nam. Vị ngọt béo từ nước cốt dừa, đĩa bánh xèo vàng óng cuốn rau rừng chấm nước mắm chua ngọt, hay đĩa cơm tấm sườn nướng khói thơm lừng góc phố Sài Gòn làm say lòng mọi thực khách.',
    voiceGuideEn:
      'Southern cuisine reflects the generous spirit of the Mekong Delta: giant crispy savory crepes, broken rice served with fragrant lemongrass pork chops, and richly seasoned fresh river seafood.',
  },

  // 7. TOÀN CẢNH VIỆT NAM - VẺ ĐẸP BẤT TẬN (TỔNG HỢP 3 MIỀN)
  {
    id: 'vietnam-grand-tour',
    region: 'all',
    category: 'beauty',
    titleVi: 'Việt Nam Toàn Cảnh: Vẻ Đẹp Bất Tận & Hương Vị 3 Miền Bắc - Trung - Nam',
    titleEn: 'Vietnam Grand Panorama: Timeless Charm & 3-Region Flavors',
    subtitleVi: 'Thước phim tổng quan xuyên suốt dải đất hình chữ S từ đỉnh Lũng Cú đến Mũi Cà Mau',
    subtitleEn: 'A cinematic odyssey traversing Vietnam from the northern frontier to the southern delta',
    descriptionVi:
      'Một bức tranh toàn cảnh sống động về non nước, con người và văn hóa ẩm thực Việt Nam: từ núi non trùng điệp Tây Bắc, cố đô đền đài trầm mặc miền Trung cho đến nhịp sống sông nước mênh mông Nam Bộ, gắn kết keo sơn cùng 54 dân tộc anh em trên dải đất hình chữ S.',
    descriptionEn:
      'A breathtaking panoramic tapestry connecting Vietnam’s topography, people and gastronomy: from northern jagged peaks, through solemn historic citadels of the center, to the sun-drenched waterways of the southern delta.',
    videoStreamUrl:
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    youtubeEmbedUrl: 'https://www.youtube-nocookie.com/embed/5-9F1g50iB4?rel=0',
    youtubeWatchUrl: 'https://www.youtube.com/watch?v=5-9F1g50iB4',
    duration: '05:10',
    thumbnail: halongImg,
    scenes: [
      {
        titleVi: 'Miền Bắc - Non Nước Ngàn Năm',
        titleEn: 'Northern Vietnam - Timeless Land',
        image: halongImg,
        descVi: 'Vịnh Hạ Long, Tràng An Ninh Bình và ruộng bậc thang Tây Bắc kỳ vĩ.',
        descEn: 'World wonder Ha Long Bay and towering limestone peaks of the North.',
      },
      {
        titleVi: 'Miền Trung - Trầm Tích Di Sản',
        titleEn: 'Central Vietnam - Heritage Corridor',
        image: hoianImg,
        descVi: 'Cố đô Huế, phố cổ Hội An và những bãi biển cát trắng nắng vàng.',
        descEn: 'Ancient citadels, romantic river lanterns, and sun-kissed coastlines.',
      },
      {
        titleVi: 'Miền Nam - Sông Nước Hào Sảng',
        titleEn: 'Southern Vietnam - Abundant Waterways',
        image: cairangImg,
        descVi: 'Chợ nổi Cái Răng, rừng dừa nước miệt vườn và nhịp sống Sài Gòn phồn hoa.',
        descEn: 'Bustling river markets, tropical islands, and vibrant metropolitan life.',
      },
    ],
    highlights: ['3 Miền Bắc - Trung - Nam', 'Di sản UNESCO', 'Ẩm thực truyền thống', 'Văn hóa 54 Dân tộc'],
    voiceGuideVi:
      'Việt Nam - đất nước ngàn năm văn hiến với thiên nhiên trác tuyệt, ẩm thực ba miền phong phú và lòng hiếu khách nồng hậu. Kính chúc quý khách có một hành trình khám phá dải đất hình chữ S thật trọn vẹn và ý nghĩa.',
    voiceGuideEn:
      'Vietnam - a timeless land of enchanting landscapes, distinctive 3-region culinary arts, and boundless hospitality. We wish you an unforgettable journey across our homeland.',
  },
];
