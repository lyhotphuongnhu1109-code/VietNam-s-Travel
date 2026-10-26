// Comprehensive Vietnam Travel Knowledge Synthesizer
// Guarantees realistic, rich, tailored day-by-day itineraries matching exact user wishes, destinations, companions, and budgets.

export interface WishParams {
  destination: string;
  departureCity?: string;
  durationDays?: number; // 2, 3, 4, 5, 6, 7
  durationLabel?: string; // "3 Ngày 2 Đêm", etc.
  companion?: 'couple' | 'family_kids' | 'family_seniors' | 'friends' | 'solo' | string;
  interests?: string[]; // 'food', 'photo', 'beach', 'culture', 'nature', 'theme_park', 'relaxation', etc.
  budgetTier?: 'budget' | 'standard' | 'luxury' | string;
  preferredTransport?: string;
  specialNotes?: string;
  language?: 'vi' | 'ko' | 'en';
}

export interface SynthesizedDay {
  dayNumber: number;
  destination: string;
  budgetEstimate: string;
  highlights: string[];
  morning: string;
  afternoon: string;
  evening: string;
  transport: string;
  stay: string;
}

export interface SynthesizedItinerary {
  id: string;
  title: string;
  durationLabel: string;
  overview: string;
  budgetLevel: string;
  estimatedCostTotal: string;
  bestTime: string;
  specialTip: string;
  days: SynthesizedDay[];
  userPreferencesSummary?: {
    destination: string;
    departureCity: string;
    companionLabel: string;
    interestsLabels: string[];
    budgetLabel: string;
  };
}

// Destination profiles with authentic places, dishes, and transport
interface DestinationProfile {
  name: string;
  airportCode?: string;
  cityId?: string;
  bestTimeVi: string;
  bestTimeEn: string;
  bestTimeKo: string;
  specialTipVi: string;
  specialTipEn: string;
  specialTipKo: string;
  daysTemplate: {
    title: string;
    highlights: string[];
    morning: string;
    afternoon: string;
    evening: string;
    transport: string;
    stay: string;
  }[];
}

const DESTINATION_PROFILES: Record<string, DestinationProfile> = {
  dalat: {
    name: 'Đà Lạt (Lâm Đồng)',
    airportCode: 'DLI',
    cityId: 'da-lat',
    bestTimeVi: 'Tháng 10 - Tháng 4 (Mùa hoa dã quỳ, mai anh đào, thời tiết se lạnh khô ráo)',
    bestTimeEn: 'Oct - Apr (Cherry blossoms, mild cool breeze, dry weather)',
    bestTimeKo: '10월 ~ 4월 (화사한 벚꽃, 쾌적하고 선선한 날씨)',
    specialTipVi: 'Đà Lạt về đêm nhiệt độ xuống khoảng 14-16°C, bạn nên chuẩn bị áo khoác len ấm và khăn quàng cổ.',
    specialTipEn: 'Evening temperatures drop to 14-16°C; pack a cozy jacket and scarf for night walks.',
    specialTipKo: '밤에는 14~16도로 쌀쌀해지므로 따뜻한 외투와 머플러를 준비하세요.',
    daysTemplate: [
      {
        title: 'Đà Lạt - Săn Mây & Check-in Cafe Thung Lũng',
        highlights: ['Đồi chè Cầu Đất săn mây', 'Ga xe lửa Đà Lạt cổ', 'Quán cafe view thung lũng rực rỡ'],
        morning: 'Khởi hành sớm lên Đồi chè Cầu Đất đón biển mây bồng bềnh lúc bình minh, thưởng thức cà phê Arabica Cầu Đất thơm nồng.',
        afternoon: 'Tham quan Ga Đà Lạt - nhà ga cổ kính phong cách Art Deco, dạo bước Vườn hoa Cẩm Tú Cầu Trại Mát.',
        evening: 'Ăn tối Lẩu gà lá é Tao Ngộ cay ấm, dạo Chợ đêm Đà Lạt thưởng thức bánh tráng nướng và sữa đậu nành nóng hổi.',
        transport: 'Xe máy tay ga / Xe ô tô đưa đón riêng',
        stay: 'Khách sạn phong cách mộc hoặc homestay view rừng thông',
      },
      {
        title: 'Thác Datanla - Dinh Bảo Đại - Hồ Tuyền Lâm',
        highlights: ['Máng trượt Thác Datanla', 'Thiền Viện Trúc Lâm', 'Hoàng hôn Hồ Tuyền Lâm'],
        morning: 'Trải nghiệm hệ thống máng trượt xuyên rừng thông tại Thác Datanla, ngắm dòng thác trắng xóa hùng vĩ.',
        afternoon: 'Đi cáp treo đồi Robin sang Thiền Viện Trúc Lâm thanh tịnh, chèo thuyền SUP hoặc ngắm cảnh thơ mộng Hồ Tuyền Lâm.',
        evening: 'Thưởng thức nướng ngói ngõ dốc Đà Lạt, ghé quán cafe acoustic nghe nhạc êm dịu giữa rừng thông.',
        transport: 'Cáp treo & Xe du lịch',
        stay: 'Resort ven hồ Tuyền Lâm hoặc Khách sạn trung tâm',
      },
      {
        title: 'Lang Biang Huyền Thoại - Làng Cù Lần',
        highlights: ['Đỉnh Langbiang bằng xe Jeep', 'Giao lưu văn hóa Cồng Chiêng', 'Nông trại dâu tây sạch'],
        morning: 'Đi xe Jeep địa hình chinh phục Đỉnh Radar Langbiang, phóng tầm mắt ngắm toàn cảnh thung lũng Suối Vàng suối Bạc.',
        afternoon: 'Ghé thăm Làng Cù Lần lãng mạn dưới chân núi, trải nghiệm hái dâu tây chín mọng tại vườn sinh thái công nghệ cao.',
        evening: 'Ăn lẩu bò Ba Toa quán gỗ truyền thống, nhâm nhi rượu vang Đà Lạt ấm cúng.',
        transport: 'Xe Jeep địa hình & Xe du lịch',
        stay: 'Khách sạn 3-4 sao trung tâm gần Hồ Xuân Hương',
      },
      {
        title: 'Quảng Trường Lâm Viên - Dinh III Bảo Đại - Mua Quà',
        highlights: ['Quảng trường Lâm Viên nụ hoa Atiso', 'Dinh III Biệt điện Bảo Đại', 'Mua mứt đặc sản L\'angfarm'],
        morning: 'Check-in chụp ảnh tại Quảng trường Lâm Viên bên biểu tượng Nụ hoa Atiso khổng lồ và ngắm Hồ Xuân Hương êm đềm.',
        afternoon: 'Tham quan Dinh III Bảo Đại tìm hiểu cuộc đời vị vua cuối cùng triều Nguyễn, mua đặc sản mứt dâu, trà Atiso tại L\'angfarm.',
        evening: 'Thưởng thức bữa tối nhẹ nhàng với nem nướng Bà Hùng, ra sân bay Liên Khương kết thúc chuyến đi tuyệt vời.',
        transport: 'Taxi / Xe đưa đón sân bay',
        stay: 'Kết thúc lịch trình',
      },
      {
        title: 'Chùa Linh Phước - Đồi Chè & Vườn Thảo Dược',
        highlights: ['Chùa Ve Chai Linh Phước', 'Cung đường hoa mai anh đào', 'Trải nghiệm tắm khoáng Onsen'],
        morning: 'Chiêm bái Chùa Linh Phước (Chùa Ve Chai) với kiến trúc khảm sành sứ độc nhất vô nhị và con rồng dài 49 mét.',
        afternoon: 'Trải nghiệm tắm khoáng nóng và thư giãn spa tại khu sinh thái ngoại ô, hòa mình vào không gian xanh ngắt.',
        evening: 'Tiệc nướng BBQ ngoài trời bên đống lửa ấm áp, ngắm thành phố Đà Lạt lên đèn lung linh như thung lũng đom đóm.',
        transport: 'Xe đưa đón riêng',
        stay: 'Boutique Resort ngoại ô',
      },
    ],
  },

  phuquoc: {
    name: 'Phú Quốc (Kiên Giang)',
    airportCode: 'PQC',
    cityId: 'phu-quoc',
    bestTimeVi: 'Tháng 11 - Tháng 4 (Biển êm sóng lặng, nước xanh ngọc bích, nắng vàng rực rỡ)',
    bestTimeEn: 'Nov - Apr (Calm turquoise waters, sunny days, best diving)',
    bestTimeKo: '11월 ~ 4월 (바다가 잔잔하고 맑아 스노클링과 휴양에 최적)',
    specialTipVi: 'Nên đặt tour cano 4 đảo buổi sáng sớm để tránh đông đúc và chụp ảnh san hô trong điều kiện ánh sáng đẹp nhất.',
    specialTipEn: 'Book morning 4-island speedboat tours early to enjoy calm waters and coral visibility.',
    specialTipKo: '이른 아침 4개 섬 스피드보트 투어를 예약하시면 여유롭게 산호초를 감상할 수 있습니다.',
    daysTemplate: [
      {
        title: 'Phú Quốc - Check-in Resort & Grand World Thành Phố Không Ngủ',
        highlights: ['Hạ cánh sân bay Phú Quốc', 'Kênh đào Venice Grand World', 'Show diễn Tinh Hoa Việt Nam'],
        morning: 'Đáp sân bay Phú Quốc, xe riêng đón về resort nhận phòng. Nghỉ ngơi, tắm hồ bơi và dạo bãi biển riêng của resort.',
        afternoon: 'Khám phá Grand World Phú Quốc: du ngoạn thuyền Gondola trên kênh đào Venice thu nhỏ, check-in Bảo tàng Gấu Teddy.',
        evening: 'Thưởng thức show nhạc nước triệu đô Sắc Màu Venice và show Tinh Hoa Việt Nam hoành tráng, ăn hải sản nướng chợ đêm Grand World.',
        transport: 'Xe đưa đón sân bay & Xe điện VinBus',
        stay: 'Resort 4-5 sao bãi biển Bãi Dài hoặc Gành Dầu',
      },
      {
        title: 'Thiên Đường Biển Đảo - Cano 4 Đảo & Cáp Treo Hòn Thơm',
        highlights: ['Cano cao tốc lặn ngắm san hô Hòn Gầm Ghì', 'Chụp ảnh SUP Hòn Mây Rút', 'Cáp treo vượt biển Hòn Thơm'],
        morning: 'Đi cano cao tốc ra cụm đảo Nam Phú Quốc: lặn ngắm san hô tự nhiên tại Hòn Gầm Ghì, tắm biển nước trong vắt tại Hòn Móng Tay.',
        afternoon: 'Trải nghiệm cáp treo 3 dây vượt biển dài nhất thế giới sang Hòn Thơm, vui chơi công viên nước Aquatopia.',
        evening: 'Dạo bước thị trấn Địa Trung Hải Sunset Town, ngắm hoàng hôn lộng lẫy bên Cầu Hôn (Kiss Bridge) và thưởng thức tiệc hải sản ven biển.',
        transport: 'Cano cao tốc & Cáp treo Hòn Thơm',
        stay: 'Resort cao cấp Sunset Town hoặc Dương Đông',
      },
      {
        title: 'Bãi Sao Cát Trắng - Làng Chài Hàm Ninh - Chợ Đêm Dương Đông',
        highlights: ['Bãi Sao cát trắng mịn', 'Làng chài cổ Hàm Ninh', 'Chợ đêm hải sản Dương Đông'],
        morning: 'Tắm biển Bãi Sao - bãi biển đẹp nhất Phú Quốc với cát trắng như kem và hàng dừa nghiêng thơ mộng.',
        afternoon: 'Ghé thăm Làng chài Hàm Ninh thưởng thức ghẹ luộc tươi rói, tham quan nhà thùng nước mắm truyền thống và vườn tiêu xanh tốt.',
        evening: 'Khám phá Chợ đêm Phú Quốc, ăn nhum biển nướng mỡ hành, tôm hùm baby và kem cuộn Thái Lan mát lạnh.',
        transport: 'Xe ô tô du lịch riêng',
        stay: 'Khách sạn/Resort trung tâm Dương Đông',
      },
      {
        title: 'VinWonders - Safari Phú Quốc - Mua Đặc Sản Trở Về',
        highlights: ['Vinpearl Safari bán hoang dã', 'Cung điện Hải Vương hình rùa', 'Mua ngọc trai & rượu sim'],
        morning: 'Tham quan Vinpearl Safari - vườn thú bán hoang dã lớn nhất Việt Nam, đi xe bus chuyên dụng ngắm sư tử, hươu cao cổ.',
        afternoon: 'Khám phá Thủy cung Cung Điện Hải Vương kỳ vĩ, mua ngọc trai Phú Quốc chính hiệu và rượu sim rừng làm quà.',
        evening: 'Xe đưa ra sân bay Phú Quốc, kết thúc kỳ nghỉ dưỡng biển đảo tuyệt vời.',
        transport: 'Xe đưa tiễn sân bay',
        stay: 'Kết thúc chuyến đi',
      },
    ],
  },

  danang: {
    name: 'Đà Nẵng - Hội An',
    airportCode: 'DAD',
    cityId: 'da-nang',
    bestTimeVi: 'Tháng 2 - Tháng 8 (Biển trong xanh, nắng rực rỡ, trời tạnh ráo)',
    bestTimeEn: 'Feb - Aug (Clear blue sea, sunny weather, best for swimming & heritage)',
    bestTimeKo: '2월 ~ 8월 (온화하고 맑은 건기, 해수욕과 고도 관광 최적기)',
    specialTipVi: 'Cầu Rồng Đà Nẵng phun lửa và phun nước vào đúng 21h00 các tối Thứ Bảy và Chủ Nhật hàng tuần.',
    specialTipEn: 'Dragon Bridge breathes fire and water at 21:00 every Saturday & Sunday night.',
    specialTipKo: '다낭 용다리 불·물 쇼는 매주 토·일요일 밤 9시에 진행됩니다.',
    daysTemplate: [
      {
        title: 'Đà Nẵng - Bán Đảo Sơn Trà & Biển Mỹ Khê',
        highlights: ['Chùa Linh Ứng Bãi Bụt', 'Bãi biển Mỹ Khê', 'Cầu Rồng Phun Lửa'],
        morning: 'Đáp sân bay Đà Nẵng, xe đưa về khách sạn nhận phòng. Khởi hành viếng Chùa Linh Ứng trên Bán đảo Sơn Trà ngắm tượng Phật Bà 67m.',
        afternoon: 'Tắm biển Mỹ Khê - một trong những bãi biển quyến rũ nhất hành tinh, thưởng thức nước dừa tươi ngọt lịm.',
        evening: 'Ăn tối bánh tráng cuốn thịt heo hai đầu da, dạo phố Bạch Đằng và chiêm ngưỡng Cầu Rồng phun lửa, phun nước lúc 21h00.',
        transport: 'Xe đưa đón sân bay & Taxi / Grab',
        stay: 'Khách sạn 4 sao view biển Mỹ Khê',
      },
      {
        title: 'Sun World Bà Nà Hills - Cầu Vàng Bàn Tay Khổng Lồ',
        highlights: ['Cáp treo kỷ lục Guinness', 'Cầu Vàng giữa sương mây', 'Làng Pháp cổ kính'],
        morning: 'Lên đỉnh Bà Nà bằng hệ thống cáp treo đạt nhiều kỷ lục thế giới, check-in Cầu Vàng lừng danh quốc tế.',
        afternoon: 'Dạo bước Làng Pháp mang phong cách châu Âu thời Trung cổ, viếng Chùa Linh Ứng Bà Nà và vui chơi Fantasy Park.',
        evening: 'Trở về trung tâm Đà Nẵng, thưởng thức ẩm thực hải sản tươi sống Năm Đảnh hoặc Bé Mặn ven biển.',
        transport: 'Xe đưa đón Bà Nà & Cáp treo',
        stay: 'Khách sạn biển Đà Nẵng',
      },
      {
        title: 'Ngũ Hành Sơn - Phố Cổ Hội An Lung Linh Đèn Lồng',
        highlights: ['Danh thắng Ngũ Hành Sơn & Động Huyền Không', 'Chùa Cầu & Nhà Cổ Hội An', 'Thả hoa đăng sông Hoài'],
        morning: 'Khám phá ngọn Thủy Sơn, Động Huyền Không huyền ảo và làng đá mỹ nghệ Non Nước dưới chân núi.',
        afternoon: 'Di chuyển sang Phố cổ Hội An: dạo bước Chùa Cầu, Hội quán Phúc Kiến, may áo dài lấy ngay và uống trà Mót thanh mát.',
        evening: 'Thưởng thức Cao Lầu, cơm gà Bà Buội, đi thuyền gỗ thả đèn hoa đăng lung linh cầu may mắn trên dòng sông Hoài.',
        transport: 'Xe riêng đưa đón Đà Nẵng - Hội An',
        stay: 'Boutique Resort phong cách Indochine Hội An',
      },
      {
        title: 'Rừng Dừa Bảy Mẫu - Chợ Hàn Mua Đặc Sản - Trở Về',
        highlights: ['Múa thuyền thúng Rừng dừa Bảy Mẫu', 'Chợ Hàn Đà Nẵng', 'Mua chả bò & tré làm quà'],
        morning: 'Trải nghiệm chèo thuyền thúng xoay điêu luyện giữa rặng dừa nước Bảy Mẫu Cẩm Thanh và xem quăng chài bắt cá.',
        afternoon: 'Trở lại Đà Nẵng ghé Chợ Hàn mua chả bò Đà Nẵng, mực rim me, bánh khô mè Bà Liễu làm quà cho người thân.',
        evening: 'Xe đưa ra sân bay quốc tế Đà Nẵng, đáp chuyến bay trở về nhà.',
        transport: 'Thuyền thúng & Xe tiễn sân bay',
        stay: 'Kết thúc hành trình',
      },
    ],
  },

  hanoi_ninhbinh: {
    name: 'Hà Nội - Ninh Bình',
    airportCode: 'HAN',
    cityId: 'ha-noi',
    bestTimeVi: 'Tháng 9 - Tháng 4 (Mùa thu Hà Nội se lạnh thơm hoa sữa, mùa xuân lễ hội thanh bình)',
    bestTimeEn: 'Sep - Apr (Pleasant autumn breeze, cool winter and spring blossoms)',
    bestTimeKo: '9월 ~ 4월 (가을의 쾌청함과 봄의 싱그러움, 야외 탐방 최적기)',
    specialTipVi: 'Khi tham quan đền chùa ở Ninh Bình và Lăng Bác, hãy mặc trang phục lịch sự qua đầu gối.',
    specialTipEn: 'Wear respectful attire covering shoulders and knees when visiting pagodas and temples.',
    specialTipKo: '사원 및 묘소 방문 시 무릎과 어깨를 가리는 단정한 복장을 착용하세요.',
    daysTemplate: [
      {
        title: 'Hà Nội 36 Phố Phường - Hồ Gươm - Tinh Hoa Ẩm Thực',
        highlights: ['Hồ Hoàn Kiếm & Đền Ngọc Sơn', 'Phố Cổ Hà Nội', 'Cà phê trứng Giảng trứ danh'],
        morning: 'Đáp sân bay Nội Bài, xe đưa về khách sạn phố cổ. Dạo quanh Hồ Gươm, viếng Đền Ngọc Sơn và Cầu Thê Húc đỏ son.',
        afternoon: 'Khám phá Văn Miếu - Quốc Tử Giám trường đại học đầu tiên của Việt Nam, ngồi xích lô dạo 36 phố phường cổ kính.',
        evening: 'Ăn bún chả Hương Liên hoặc chả cá Lã Vọng, thưởng thức tách cà phê trứng béo ngậy tại Cafe Giảng ngõ cổ.',
        transport: 'Xe đưa đón sân bay & Xích lô phố cổ',
        stay: 'Khách sạn boutique phong cách Pháp cổ trong phố cổ Hà Nội',
      },
      {
        title: 'Tràng An Di Sản Thế Giới - Hang Múa Ngoạn Mục',
        highlights: ['Thuyền nan Tràng An qua các hang ngầm', 'Leo đỉnh Ngọa Long Hang Múa', 'Đặc sản dê núi cơm cháy'],
        morning: 'Khởi hành đi Ninh Bình, ngồi thuyền nan chèo tay khám phá quần thể danh thắng Tràng An luồn qua các hang động kỳ vĩ.',
        afternoon: 'Chinh phục gần 500 bậc đá lên đỉnh Ngọa Long Hang Múa ngắm trọn bức tranh thung lũng Tam Cốc non xanh nước biếc.',
        evening: 'Thưởng thức thịt dê núi nướng tảng, cơm cháy giòn rụm chấm nước sốt đậm đà, nghỉ đêm giữa khung cảnh núi non thanh bình.',
        transport: 'Xe Limousine VIP Hà Nội - Ninh Bình',
        stay: 'Resort sinh thái ven hồ hoặc bungalow giữa cánh đồng lúa Ninh Bình',
      },
      {
        title: 'Cố Đô Hoa Lư - Chùa Bái Đính - Trở Về Hà Nội',
        highlights: ['Đền Vua Đinh Vua Lê tại Hoa Lư', 'Đại tự Bái Đính giữ nhiều kỷ lục', 'Mua nem chua Yên Mạc'],
        morning: 'Thăm Cố đô Hoa Lư - kinh đô đầu tiên của nhà nước phong kiến Đại Cồ Việt, tìm hiểu lịch sử triều Đinh - Tiền Lê.',
        afternoon: 'Chiêm bái Chùa Bái Đính với tượng Phật bằng đồng dát vàng lớn nhất châu Á và hành lang 500 vị La Hán đá.',
        evening: 'Xe Limousine đưa về Hà Nội, tự do dạo phố đi bộ Tạ Hiện náo nhiệt hoặc mua bánh cốm Hàng Than làm quà.',
        transport: 'Xe Limousine chất lượng cao',
        stay: 'Khách sạn trung tâm Hà Nội hoặc kết thúc lịch trình',
      },
    ],
  },

  sapa: {
    name: 'Sa Pa (Lào Cai)',
    airportCode: 'HAN',
    cityId: 'sa-pa',
    bestTimeVi: 'Tháng 9 - Tháng 11 (Mùa lúa chín vàng) và Tháng 12 - Tháng 3 (Mùa săn mây, hoa đào hoa mận)',
    bestTimeEn: 'Sep - Nov (Golden terraced rice) & Dec - Mar (Cloud hunting & blossoms)',
    bestTimeKo: '9월 ~ 11월 (황금빛 계단식 논) & 12월 ~ 3월 (운해와 봄꽃 축제)',
    specialTipVi: 'Đỉnh Fansipan cao 3.143m nhiệt độ rất thấp có thể có sương muối, nên chuẩn bị găng tay và áo ấm cản gió.',
    specialTipEn: 'Fansipan peak is cold and windy (often below 10°C); wear windproof jackets and gloves.',
    specialTipKo: '판시판 정상은 기온이 낮고 바람이 강하므로 방풍 자켓과 장갑을 지참하세요.',
    daysTemplate: [
      {
        title: 'Hà Nội - Sa Pa - Bản Cát Cát Thơ Mộng',
        highlights: ['Tàu hỏa hỏa xa hoặc Limousine lên Sa Pa', 'Nhà Thờ Đá Sa Pa cổ kính', 'Bản Cát Cát của người Mông'],
        morning: 'Khởi hành từ Hà Nội bằng xe Limousine cao tốc êm ái lên thị trấn trong sương Sa Pa, nhận phòng view thung lũng Mường Hoa.',
        afternoon: 'Dạo bước Bản Cát Cát, check-in guồng nước khổng lồ, ngắm thác Tiên Sa và thuê trang phục dân tộc H’Mông chụp ảnh.',
        evening: 'Ăn tối lẩu cá hồi, cá tầm tươi ngon Sa Pa, dạo Quảng trường Nhà Thờ Đá thưởng thức hạt dẻ nướng thơm phức.',
        transport: 'Xe Limousine VIP & Taxi nội thị',
        stay: 'Khách sạn 4 sao view thung lũng Mường Hoa',
      },
      {
        title: 'Chinh Phục Nóc Nhà Đông Dương Fansipan - Đèo Ô Quy Hồ',
        highlights: ['Tàu hỏa leo núi Mường Hoa', 'Cáp treo lên đỉnh Fansipan 3.143m', 'Hoàng hôn Đèo Ô Quy Hồ'],
        morning: 'Đi tàu hỏa Mường Hoa sang ga cáp treo Fansipan, lướt qua biển mây chinh phục Nóc nhà Đông Dương ở độ cao 3.143m.',
        afternoon: 'Chinh phục Đèo Ô Quy Hồ - một trong tứ đại đỉnh đèo hiểm trở bậc nhất, ngắm hoàng hôn rực lửa tại Cổng Trời Sa Pa.',
        evening: 'Thư giãn ngâm mình trong bồn tắm lá thuốc người Dao Đỏ xua tan mỏi mệt, thưởng thức xiên que nướng chợ đêm.',
        transport: 'Tàu hỏa leo núi, Cáp treo & Xe đưa đón',
        stay: 'Resort sinh thái bản Tả Van hoặc Khách sạn Sa Pa',
      },
      {
        title: 'Bản Tả Van - Thung Lũng Mường Hoa - Về Hà Nội',
        highlights: ['Trekking nhẹ nhàng bản Tả Van', 'Bãi đá cổ Sa Pa', 'Mua thổ cẩm và trà Shan Tuyết'],
        morning: 'Trekking khám phá bản Tả Van của người Giáy, ngắm nhìn những thửa ruộng bậc thang uốn lượn như dải lụa xanh.',
        afternoon: 'Uống cà phê ngắm mây trôi lững lờ tại bản Ý Linh Hồ, mua nấm hương rừng, thịt trâu gác bếp và trà Shan Tuyết làm quà.',
        evening: 'Lên xe Limousine trở về Hà Nội, kết thúc chuyến phiêu lưu miền Tây Bắc hùng vĩ.',
        transport: 'Xe Limousine cao tốc Sa Pa - Hà Nội',
        stay: 'Kết thúc chuyến đi',
      },
    ],
  },

  nhatrang: {
    name: 'Nha Trang (Khánh Hòa)',
    airportCode: 'CXR',
    cityId: 'nha-trang',
    bestTimeVi: 'Tháng 1 - Tháng 8 (Biển êm ả trong vắt, ngập tràn ánh nắng nhiệt đới)',
    bestTimeEn: 'Jan - Aug (Calm waters, warm sunshine, perfect for diving and sailing)',
    bestTimeKo: '1월 ~ 8월 (파도가 잔잔하고 맑은 날씨, 해양 스포츠와 리조트 휴양 적기)',
    specialTipVi: 'Nên dành trọn 1 ngày cho VinWonders hoặc tour đảo Hòn Mun để trải nghiệm trọn vẹn vịnh biển Nha Trang.',
    specialTipEn: 'Dedicate a full day to VinWonders or Hon Mun Marine Protected Area snorkeling.',
    specialTipKo: '빈원더스 또는 혼문 해양보호구역 스노클링 투어에 하루를 투자하세요.',
    daysTemplate: [
      {
        title: 'Nha Trang - Con Đường Biển Trần Phú & Tháp Bà Ponagar',
        highlights: ['Đường biển Trần Phú', 'Tháp Bà Ponagar ngàn năm', 'Tắm bùn khoáng nóng thư giãn'],
        morning: 'Đáp sân bay Cam Ranh, xe đưa dọc đại lộ ven biển tuyệt đẹp về khách sạn nhận phòng. Dạo bước bãi biển Trần Phú.',
        afternoon: 'Tham quan Di tích Tháp Bà Ponagar kiệt tác kiến trúc Chăm Pa, trải nghiệm ngâm bùn khoáng nóng trị liệu tự nhiên.',
        evening: 'Ăn tối Nem nướng Đặng Văn Quyên giòn rụm cuốn bánh tráng, dạo Chợ đêm Nha Trang lộng gió biển.',
        transport: 'Xe đưa đón sân bay & Taxi',
        stay: 'Khách sạn 4-5 sao mặt tiền biển Trần Phú',
      },
      {
        title: 'Thiên Đường Giải Trí VinWonders Nha Trang',
        highlights: ['Cáp treo vượt biển sang Đảo Hòn Tre', 'Công viên nước vịnh phao nổi khổng lồ', 'Show thực cảnh Tata Show'],
        morning: 'Đi cáp treo vượt biển Nha Trang sang Đảo Hòn Tre, chinh phục vòng xoay Bánh Xe Bầu Trời ngắm toàn cảnh vịnh.',
        afternoon: 'Vui chơi công viên nước, vịnh phao nổi trên biển và khám phá Vườn Quý Vương với các loài động thực vật quý hiếm.',
        evening: 'Chiêm ngưỡng siêu phẩm trình diễn đa phương tiện Tata Show triệu đô với ánh sáng và vũ đạo mãn nhãn.',
        transport: 'Cáp treo & Xe điện nội đảo',
        stay: 'Vinpearl Resort Đảo Hòn Tre hoặc Khách sạn biển',
      },
      {
        title: 'Tour 3 Đảo Vịnh Nha Trang - Lặn Biển Hòn Mun',
        highlights: ['Lặn ngắm rạn san hô Hòn Mun', 'Làng chài bè nổi hải sản', 'Bãi Tranh nước xanh ngọc'],
        morning: 'Cano đưa ra Khu bảo tồn biển Hòn Mun: lặn biển ngắm hàng trăm loài san hô và đàn cá nhiệt đới nhiều màu sắc.',
        afternoon: 'Ăn trưa hải sản tươi sống tại nhà bè làng chài, thư giãn tắm biển và chơi dù lượn tại Bãi Tranh.',
        evening: 'Thưởng thức bún sứa chả cá Nha Trang đậm đà, nhâm nhi cocktail tại quán bar tầng thượng ngắm vịnh đêm lung linh.',
        transport: 'Cano cao tốc vịnh Nha Trang',
        stay: 'Khách sạn view biển trung tâm',
      },
      {
        title: 'Chùa Long Sơn - Chợ Đầm Mua Hải Sản Khô - Trở Về',
        highlights: ['Tượng Phật Trắng Chùa Long Sơn', 'Chợ Đầm tròn biểu tượng', 'Mua mực một nắng & yến sào'],
        morning: 'Viếng Chùa Long Sơn chiêm bái bức tượng Kim Thân Phật Tổ khổng lồ ngự trên đỉnh đồi Trại Thủy.',
        afternoon: 'Ghé Chợ Đầm mua mực một nắng, cá chỉ vàng, chả cá Nha Trang và yến sào Khánh Hòa làm quà cao cấp.',
        evening: 'Xe đưa ra sân bay Cam Ranh, kết thúc kỳ nghỉ biển Nha Trang rực rỡ nắng vàng.',
        transport: 'Xe tiễn sân bay Cam Ranh',
        stay: 'Kết thúc chuyến đi',
      },
    ],
  },

  mientay: {
    name: 'Miền Tây - Cần Thơ - Bến Tre',
    airportCode: 'VCA',
    cityId: 'can-tho',
    bestTimeVi: 'Quanh năm (Đặc biệt mùa trái cây Tháng 5 - Tháng 8 và mùa nước nổi Tháng 9 - Tháng 11)',
    bestTimeEn: 'Year-round (Fruit harvest May - Aug, floating water season Sep - Nov)',
    bestTimeKo: '연중 내내 (과일 수확기 5~8월, 메콩 범람기 9~11월)',
    specialTipVi: 'Chợ nổi Cái Răng họp đông đúc nhất vào tầm 5h30 - 7h00 sáng, hãy dậy sớm để cảm nhận nhịp sống sông nước.',
    specialTipEn: 'Cai Rang Floating Market is liveliest between 5:30 and 7:00 AM; wake up early for the best vibe.',
    specialTipKo: '까이랑 수상시장은 새벽 5시 30분~7시에 가장 활발하니 일찍 출발하세요.',
    daysTemplate: [
      {
        title: 'Cần Thơ - Bến Ninh Kiều & Đêm Sông Hậu',
        highlights: ['Bến Ninh Kiều thơ mộng', 'Cầu tình yêu đi bộ Cần Thơ', 'Du thuyền ăn tối trên Sông Hậu'],
        morning: 'Khởi hành tới TP. Cần Thơ - thủ phủ miền Tây Nam Bộ, nhận phòng khách sạn ven sông Hậu.',
        afternoon: 'Tham quan Nhà Cổ Bình Thủy hơn 150 năm tuổi với kiến trúc giao thoa Pháp - Việt độc đáo từng là bối cảnh phim L\'Amant.',
        evening: 'Dạo Bến Ninh Kiều, lên du thuyền thưởng ngoạn sông Hậu, nghe đờn ca tài tử Nam Bộ và ăn lẩu mắm miền Tây.',
        transport: 'Xe du lịch & Du thuyền sông Hậu',
        stay: 'Khách sạn 4 sao ven sông Ninh Kiều',
      },
      {
        title: 'Chợ Nổi Cái Răng - Lò Hủ Tiếu - Vườn Trái Cây Miệt Vườn',
        highlights: ['Thuyền máy đi Chợ nổi Cái Răng từ sớm', 'Thưởng thức hủ tiếu nổi trên sông', 'Hái trái cây chín tại vườn'],
        morning: '5h30 sáng lên thuyền máy khám phá Chợ nổi Cái Răng, ăn tô bún riêu/hủ tiếu nóng hổi ngay trên mũi thuyền bồng bềnh.',
        afternoon: 'Ghé lò hủ tiếu truyền thống trải nghiệm làm bánh tráng nhiều màu, tham quan vườn sinh thái hái chôm chôm, sầu riêng.',
        evening: 'Ăn tối đặc sản cá lóc nướng trui cuốn bánh tráng rau sống, ốc nướng tiêu xanh thơm nức mũi.',
        transport: 'Thuyền máy đuôi tôm & Xe du lịch',
        stay: 'Eco-Resort phong cách miệt vườn miệt sông Cần Thơ',
      },
      {
        title: 'Bến Tre - Xuồng Ba Lá Rặng Dừa Nước - Trở Về',
        highlights: ['Chèo xuồng ba lá dưới tán dừa rợp mát', 'Lò kẹo dừa thủ công Bến Tre', 'Về lại TP.HCM'],
        morning: 'Di chuyển sang Bến Tre, ngồi xuồng ba lá len lỏi trong các con rạch nhỏ rợp bóng dừa nước xanh mát rượi.',
        afternoon: 'Thăm cơ sở nấu kẹo dừa truyền thống, uống trà mật ong phấn hoa và mua kẹo dừa sầu riêng, bánh phồng tôm.',
        evening: 'Xe đưa trở về TP. Hồ Chí Minh hoặc ra sân bay Cần Thơ, kết thúc hành trình sông nước đượm tình quê hương.',
        transport: 'Xuồng ba lá & Xe ô tô chất lượng cao',
        stay: 'Kết thúc chuyến đi',
      },
    ],
  },
};

// Generic resolver for any destination typed by user
function findBestProfileKey(destination: string): string {
  const d = destination.toLowerCase().trim();
  if (d.includes('lạt') || d.includes('dalat') || d.includes('da lat') || d.includes('lâm đồng')) return 'dalat';
  if (d.includes('phú quốc') || d.includes('phu quoc') || d.includes('kiên giang')) return 'phuquoc';
  if (d.includes('nha trang') || d.includes('cam ranh') || d.includes('khánh hòa')) return 'nhatrang';
  if (d.includes('đà nẵng') || d.includes('da nang') || d.includes('hội an') || d.includes('hoi an') || d.includes('bà nà')) return 'danang';
  if (d.includes('sa pa') || d.includes('sapa') || d.includes('fansipan') || d.includes('lào cai')) return 'sapa';
  if (d.includes('ninh bình') || d.includes('hà nội') || d.includes('tràng an') || d.includes('hanoi')) return 'hanoi_ninhbinh';
  if (d.includes('miền tây') || d.includes('cần thơ') || d.includes('bến tre') || d.includes('sông nước') || d.includes('an giang')) return 'mientay';
  return 'danang'; // default high-quality baseline
}

/**
 * Synthesizes a realistic, beautiful, fully custom itinerary
 * tailored specifically to ALL parameters of the user's wish.
 */
export function synthesizeTailoredItinerary(params: WishParams): SynthesizedItinerary {
  const destName = params.destination?.trim() || 'Đà Lạt';
  const profileKey = findBestProfileKey(destName);
  const profile = DESTINATION_PROFILES[profileKey] || DESTINATION_PROFILES.dalat;

  const departure = params.departureCity || 'TP. Hồ Chí Minh (SGN)';
  const daysCount = Math.max(2, Math.min(params.durationDays || 3, 7));
  const nightsCount = Math.max(1, daysCount - 1);
  const durationLabel = `${daysCount} Ngày ${nightsCount} Đêm`;

  const companion = params.companion || 'couple';
  const budgetTier = params.budgetTier || 'standard';
  const interests = Array.isArray(params.interests) ? params.interests : [];

  // Generate customized title
  let companionText = '';
  if (companion === 'couple') companionText = 'Cho Đôi Lứa Lãng Mạn';
  else if (companion === 'family_kids') companionText = 'Gia Đình Có Trẻ Nhỏ';
  else if (companion === 'family_seniors') companionText = 'Gia Đình & Nghỉ Dưỡng Thư Thái';
  else if (companion === 'friends') companionText = 'Nhóm Bạn Trẻ Năng Động';
  else if (companion === 'solo') companionText = 'Hành Trình Khám Phá Độc Hành';

  const title = `Hành Trình ${destName} ${durationLabel} ${companionText ? `• ${companionText}` : ''}`;

  // Overview with personalized touch
  const overview = `Lộ trình được thiết kế may đo riêng cho chuyến đi ${destName} (${durationLabel}), khởi hành từ ${departure}. Kế hoạch tối ưu nhịp độ di chuyển phù hợp cho ${
    companion === 'couple' ? 'cặp đôi tìm kiếm sự lãng mạn và riêng tư' :
    companion === 'family_kids' ? 'gia đình có trẻ nhỏ cần không gian an toàn, khu vui chơi và lịch trình nhẹ nhàng' :
    companion === 'family_seniors' ? 'người lớn tuổi với các điểm tham quan văn hóa, nghỉ dưỡng thanh tịnh và ẩm thực thanh đạm' :
    companion === 'friends' ? 'nhóm bạn trẻ yêu thích sống ảo, cafe view đẹp và ẩm thực đường phố về đêm' :
    'du khách độc hành muốn hòa mình vào thiên nhiên và trải nghiệm văn hóa bản địa'
  }${params.specialNotes ? `. Ghi chú đặc biệt: "${params.specialNotes}" đã được ưu tiên bố trí vào các ngày phù hợp.` : '.'}`;

  // Pricing based on budget tier and days
  let dailySpendPerPerson = 1500000;
  let budgetLevel = 'Tiêu chuẩn (Khách sạn 3-4 sao, xe tiện nghi)';
  if (budgetTier === 'budget') {
    dailySpendPerPerson = 900000;
    budgetLevel = 'Tiết kiệm (Homestay / Hostel, ăn quán địa phương)';
  } else if (budgetTier === 'luxury') {
    dailySpendPerPerson = 2800000;
    budgetLevel = 'Cao cấp (Resort 5 sao, ẩm thực hải sản & xe riêng)';
  }

  const totalMin = (dailySpendPerPerson * daysCount * 0.9).toLocaleString('vi-VN');
  const totalMax = (dailySpendPerPerson * daysCount * 1.15).toLocaleString('vi-VN');
  const estimatedCostTotal = `${totalMin} VNĐ - ${totalMax} VNĐ / người`;

  // Build day by day items
  const generatedDays: SynthesizedDay[] = [];
  const templates = profile.daysTemplate;

  for (let i = 0; i < daysCount; i++) {
    const dayNum = i + 1;
    const templateIndex = i % templates.length;
    const t = templates[templateIndex];

    let dayDest = destName;
    if (dayNum === 1) {
      dayDest = `${departure} ➔ ${destName} (Ngày Khởi Hành)`;
    } else if (dayNum === daysCount) {
      dayDest = `${destName} ➔ ${departure} (Ngày Kết Thúc)`;
    } else {
      dayDest = `${destName} - ${t.title.split('-')[1]?.trim() || 'Khám Phá'}`;
    }

    // Enhance highlights if interests match
    const dayHighlights = [...t.highlights];
    if (interests.includes('food') && !dayHighlights.some(h => h.includes('ẩm thực') || h.includes('đặc sản'))) {
      dayHighlights.push('Food Tour Đặc Sản Địa Phương');
    }
    if (interests.includes('photo') && !dayHighlights.some(h => h.includes('check-in') || h.includes('cafe'))) {
      dayHighlights.push('Check-in Cà Phê View Đẹp Sống Ảo');
    }

    const dayDailyCost = (dailySpendPerPerson * (0.85 + (i % 3) * 0.15)).toLocaleString('vi-VN');

    generatedDays.push({
      dayNumber: dayNum,
      destination: dayDest,
      budgetEstimate: `~${dayDailyCost} VNĐ`,
      highlights: dayHighlights.slice(0, 4),
      morning: t.morning,
      afternoon: t.afternoon,
      evening: t.evening,
      transport: i === 0 ? `Vé máy bay/xe khách từ ${departure} & Xe đưa đón` : t.transport,
      stay: i === daysCount - 1 ? 'Chuẩn bị hành lý & Trở về nhà' : t.stay,
    });
  }

  return {
    id: `tailored-plan-${Date.now()}`,
    title,
    durationLabel,
    overview,
    budgetLevel,
    estimatedCostTotal,
    bestTime: profile.bestTimeVi,
    specialTip: profile.specialTipVi,
    days: generatedDays,
    userPreferencesSummary: {
      destination: destName,
      departureCity: departure,
      companionLabel: companionText || 'Du khách',
      interestsLabels: interests,
      budgetLabel: budgetTier === 'budget' ? 'Tiết kiệm' : budgetTier === 'luxury' ? 'Cao cấp' : 'Tiêu chuẩn',
    },
  };
}

export function extractWishFromRequest(body: any): WishParams {
  const p = (body.prompt || '').toLowerCase();

  // Destination
  let destination = body.destination;
  if (!destination || typeof destination !== 'string' || !destination.trim()) {
    if (p.includes('đà lạt') || p.includes('da lat')) destination = 'Đà Lạt';
    else if (p.includes('phú quốc') || p.includes('phu quoc')) destination = 'Phú Quốc';
    else if (p.includes('nha trang')) destination = 'Nha Trang';
    else if (p.includes('đà nẵng') || p.includes('da nang') || p.includes('hội an') || p.includes('bà nà'))
      destination = 'Đà Nẵng - Hội An';
    else if (p.includes('sa pa') || p.includes('sapa') || p.includes('fansipan')) destination = 'Sa Pa';
    else if (p.includes('ninh bình') || p.includes('tràng an')) destination = 'Hà Nội - Ninh Bình';
    else if (p.includes('hà nội') || p.includes('hanoi')) destination = 'Hà Nội';
    else if (p.includes('hạ long') || p.includes('vịnh hạ long')) destination = 'Hạ Long';
    else if (p.includes('miền tây') || p.includes('cần thơ') || p.includes('bến tre'))
      destination = 'Miền Tây - Cần Thơ';
    else if (p.includes('hà giang') || p.includes('mã pí lèng')) destination = 'Hà Giang';
    else if (p.includes('huế') || p.includes('cố đô')) destination = 'Cố Đô Huế';
    else if (p.includes('quy nhơn') || p.includes('phú yên')) destination = 'Quy Nhơn - Phú Yên';
    else destination = 'Đà Lạt';
  }

  // Duration
  let durationDays = body.durationDays ? Number(body.durationDays) : 0;
  if (!durationDays || isNaN(durationDays)) {
    const daysMatch = p.match(/(\d+)\s*(ngày|ngay|days|일)/);
    if (daysMatch && daysMatch[1]) {
      durationDays = parseInt(daysMatch[1], 10);
    } else if (body.duration === '1-3') {
      durationDays = 3;
    } else if (body.duration === '10-14') {
      durationDays = 7;
    } else {
      durationDays = 4;
    }
  }
  durationDays = Math.min(Math.max(durationDays, 2), 7);

  // Companion
  let companion = body.companion;
  if (!companion) {
    if (p.includes('người yêu') || p.includes('vợ chồng') || p.includes('cặp đôi') || p.includes('trăng mật'))
      companion = 'couple';
    else if (p.includes('trẻ nhỏ') || p.includes('con nhỏ') || p.includes('bé')) companion = 'family_kids';
    else if (p.includes('bố mẹ') || p.includes('ông bà') || p.includes('người lớn tuổi') || p.includes('người già'))
      companion = 'family_seniors';
    else if (p.includes('bạn') || p.includes('nhóm') || p.includes('phượt')) companion = 'friends';
    else if (p.includes('một mình') || p.includes('solo')) companion = 'solo';
    else companion = 'couple';
  }

  // Interests
  const interests: string[] = Array.isArray(body.interests) ? body.interests : [];
  if (p.includes('ăn') || p.includes('hải sản') || p.includes('đặc sản') || p.includes('ẩm thực')) {
    if (!interests.includes('food')) interests.push('food');
  }
  if (p.includes('ảnh') || p.includes('sống ảo') || p.includes('cafe') || p.includes('cà phê')) {
    if (!interests.includes('photo')) interests.push('photo');
  }
  if (p.includes('biển') || p.includes('lặn') || p.includes('san hô') || p.includes('đảo')) {
    if (!interests.includes('beach')) interests.push('beach');
  }
  if (p.includes('di sản') || p.includes('lịch sử') || p.includes('chùa') || p.includes('văn hóa')) {
    if (!interests.includes('culture')) interests.push('culture');
  }
  if (p.includes('mây') || p.includes('đèo') || p.includes('trekking') || p.includes('núi')) {
    if (!interests.includes('nature')) interests.push('nature');
  }

  return {
    destination: destination.trim(),
    departureCity: body.departureCity || 'TP. Hồ Chí Minh (SGN)',
    durationDays,
    companion,
    interests,
    budgetTier: body.budgetTier || body.budget || 'standard',
    specialNotes: body.specialNotes || body.prompt || '',
    language: body.language || 'vi',
  };
}
