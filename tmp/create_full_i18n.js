const fs = require('fs');

const extracted = JSON.parse(fs.readFileSync('/tmp/extracted_phrases.json', 'utf8'));

// Common dictionary mappings
const coreDict = {
  // Traveloka Integration
  "Cổng Dịch Vụ Du Lịch Traveloka": "Traveloka 여행 서비스 공식 예약 센터",
  "Traveloka Booking Hub": "Traveloka 공식 예약 허브",
  "Liên Kết Chính Thức": "공식 제휴 연동",
  "Official Integration": "공식 제휴 연동",
  "Traveloka Partner": "트래블로카 공식 파트너",
  "Đặt vé máy bay & khách sạn dễ dàng hơn": "항공권 & 호텔을 가장 편리하게 예약하세요",
  "Seamless flight & hotel booking": "원스톱 항공권 및 호텔 간편 예약",
  "Tra cứu giá vé máy bay nội địa, phòng khách sạn, resort & vé vui chơi với ưu đãi độc quyền dành cho bạn.": "국내선 항공권, 호텔, 리조트 및 액티비티 패스 실시간 가격 조회와 회원 전용 특가를 만나보세요.",
  "Search real-time domestic flights, hotel resorts & attraction passes with exclusive promo discounts.": "국내선 항공권, 호텔, 리조트 및 액티비티 패스 실시간 가격 조회와 회원 전용 특가를 만나보세요.",
  "Vé Máy Bay": "항공권",
  "Flights": "항공권",
  "Khách Sạn": "호텔 & 리조트",
  "Hotels": "호텔 & 리조트",
  "Combo Tiết Kiệm": "절약 콤보",
  "Combo": "절약 콤보",
  "Vé Vui Chơi": "액티비티 & 투어",
  "Xperience": "액티비티 & 투어",
  "Mã Giảm Giá": "할인 쿠폰",
  "Vouchers": "할인 쿠폰",
  "Tải App": "앱 다운로드",
  "Mobile App": "앱 다운로드",
  "Một chiều": "편도",
  "One-way": "편도",
  "Khứ hồi": "왕복",
  "Round-trip": "왕복",
  "Khởi hành từ": "출발지",
  "Departure": "출발지",
  "Nơi cần đến": "도착지",
  "Destination": "도착지",
  "Điểm đến du lịch": "인기 여행지",
  "Popular Destination": "인기 여행지",
  "Ngày đi": "가는 날",
  "Departure date": "가는 날",
  "Ngày về": "오는 날",
  "Return date": "오는 날",
  "Hành khách": "탑승객",
  "Passengers": "탑승객",
  "Phòng": "객실",
  "Rooms": "객실",
  "Hạng ghế": "좌석 등급",
  "Seat class": "좌석 등급",
  "Phổ thông": "이코노미",
  "Economy": "이코노미",
  "Thương gia": "비즈니스",
  "Business": "비즈니스",
  "Phổ thông đặc biệt": "프리미엄 이코노미",
  "Premium Eco": "프리미엄 이코노미",
  "Người lớn": "성인",
  "Adults": "성인",
  "Trẻ em": "어린이",
  "Children": "어린이",
  "Em bé": "유아",
  "Infants": "유아",
  "Tìm Chuyến Bay Traveloka": "Traveloka 실시간 항공권 검색",
  "Search Flights on Traveloka": "Traveloka 실시간 항공권 검색",
  "Tìm Khách Sạn Traveloka": "Traveloka 호텔 & 리조트 검색",
  "Search Hotels on Traveloka": "Traveloka 호텔 & 리조트 검색",
  "Tìm Gói Combo Vé Máy Bay + Khách Sạn Tại": "항공권 + 호텔 절약 콤보 패키지 예약 -",
  "Xem Gói Combo Trên Traveloka": "Traveloka 콤보 패키지 열기",
  "View Package on Traveloka": "Traveloka 콤보 패키지 열기",
  "Mở Cổng Combo Traveloka": "Traveloka 콤보 포털 열기",
  "Open Traveloka Packages": "Traveloka 콤보 포털 열기",
  "Đặt Giữ Chỗ Combo Nhanh (Lưu Vào Tài Khoản)": "📝 앱에서 콤보 바로 예약 (계정 연동)",
  "Book Combo In-App (Sync to Account)": "📝 앱에서 콤보 바로 예약 (계정 연동)",
  "Đặt Giữ Chỗ Combo Này": "이 콤보 앱에서 예약",
  "Book This Bundle": "이 콤보 앱에서 예약",
  "1. Đặt Vé Bay Khứ Hồi": "1. 왕복 항공권 예약",
  "2. Đặt Khách Sạn Tại": "2. 호텔 예약 -",
  "1. Vé Bay": "1. 항공권",
  "1. Flight": "1. 항공권",
  "2. Khách Sạn": "2. 호텔",
  "2. Hotel": "2. 호텔",
  "⚡ Mở Trọn Gói Cả Vé Bay & Khách Sạn (2 Tab Traveloka)": "⚡ 왕복 항공권 & 호텔 2개 탭 동시 열기",
  "⚡ Open Both Flight & Hotel Tabs on Traveloka": "⚡ 왕복 항공권 & 호텔 2개 탭 동시 열기",
  "Cần tùy biến gói combo cho chuyến đi khác?": "다른 여행지의 맞춤 콤보 패키지가 필요하신가요?",
  "Need a custom package for other trips?": "다른 여행지의 맞춤 콤보 패키지가 필요하신가요?",
  "Khám phá hơn 200+ gói combo du lịch tới 63 tỉnh thành trên cổng chính thức Traveloka.": "Traveloka 공식 포털에서 63개 성·시로 향하는 200개 이상의 다양한 여행 콤보 패키지를 확인해보세요.",
  "Explore 200+ vacation packages across Vietnam on official Traveloka portal.": "Traveloka 공식 포털에서 63개 성·시로 향하는 200개 이상의 다양한 여행 콤보 패키지를 확인해보세요.",
  "Vé Vui Chơi, Cáp Treo & Tour Trải Nghiệm": "액티비티 티켓, 케이블카 & 체험 투어",
  "Traveloka Attractions & Tours": "액티비티 티켓, 케이블카 & 체험 투어",
  "Tìm vé vui chơi theo điểm đến & từ khóa": "목적지 및 키워드로 액티비티 검색",
  "Search attractions by destination": "목적지 및 키워드로 액티비티 검색",
  "Nhập mã XPERIENCEFUN20": "할인 코드 XPERIENCEFUN20 입력",
  "Use code XPERIENCEFUN20": "할인 코드 XPERIENCEFUN20 입력",
  "Tất cả điểm đến": "모든 여행지",
  "All Destinations": "모든 여행지",
  "Mọi danh mục": "모든 카테고리",
  "All Categories": "모든 카테고리",
  "Cáp treo & Danh thắng": "케이블카 & 주요 명소",
  "Cable Car & Peak": "케이블카 & 주요 명소",
  "Công viên chủ đề & Safari": "테마파크 & 사파리",
  "Theme Park & Safari": "테마파크 & 사파리",
  "Du thuyền & Ngắm cảnh": "크루즈 & 유람선 투어",
  "Cruise & Sightseeing": "크루즈 & 유람선 투어",
  "Show nghệ thuật thực cảnh": "실경 수상 쇼 & 문화 공연",
  "Cultural Live Shows": "실경 수상 쇼 & 문화 공연",
  "Suối khoáng & Onsen": "미네랄 온천 & 스파",
  "Hot Springs & Onsen": "미네랄 온천 & 스파",
  "⚡ Vé tham quan hot nhất được tìm kiếm nhiều:": "⚡ 가장 인기 있는 추천 액티비티 패스:",
  "⚡ Most searched attraction tickets:": "⚡ 가장 인기 있는 추천 액티비티 패스:",
  "Danh sách vé vui chơi chính thức có thể đặt ngay:": "바로 예약 가능한 공식 액티비티 패스 목록:",
  "Official Attraction Passes Ready to Book:": "바로 예약 가능한 공식 액티비티 패스 목록:",
  "hoạt động nổi bật": "개의 인기 체험",
  "experiences": "개의 인기 체험",
  "Quét mã QR vào cổng không xếp hàng": "줄 설 필요 없이 QR 코드 직접 입장",
  "Direct QR entry, skip line": "줄 설 필요 없이 QR 코드 직접 입장",
  "Đặt Vé Này Trên Traveloka": "Traveloka에서 이 패스 예약",
  "Book on Traveloka": "Traveloka에서 예약",
  "Đã chép!": "복사 완료!",
  "Copied!": "복사 완료!",
  "Sao chép": "코드 복사",
  "Copy": "코드 복사",
  "Thẻ lên máy bay & Voucher lưu trong máy": "탑승권 및 예약 바우처 기기 내 안전 저장",
  "Digital boarding passes & vouchers": "탑승권 및 예약 바우처 기기 내 안전 저장",
  "Hỗ trợ khách hàng 24/7 trực tiếp trên ứng dụng": "앱 내 연중무휴 24시간 실시간 고객 지원",
  "24/7 in-app live customer support": "앱 내 연중무휴 24시간 실시간 고객 지원",
  "Tích lũy Traveloka Points quy đổi quà tặng": "트래블로카 포인트 적립 및 리워드 혜택",
  "Earn Traveloka Points for future discounts": "트래블로카 포인트 적립 및 리워드 혜택",
  "Quét QR tải & mở App Traveloka": "QR 코드를 스캔하여 Traveloka 앱 다운로드",
  "Scan QR to Open Traveloka App": "QR 코드를 스캔하여 Traveloka 앱 다운로드",
  "Trang chủ Traveloka.com": "Traveloka 공식 웹사이트",
  "Traveloka.com Official Portal": "Traveloka 공식 웹사이트",

  // 54 Ethnic Groups & Culture
  "Bản Sắc Đầy Đủ 54 Dân Tộc": "54개 형제 민족 고유 문화",
  "Full 54 Ethnic Groups": "54개 형제 민족 고유 문화",
  "Di Tích & Kiến Trúc Lịch Sử": "역사 유적 & 전통 건축",
  "Historic Monuments": "역사 유적 & 전통 건축",
  "3 Trụ Cột Bản Sắc 54 Dân Tộc": "54개 민족 문화의 3대 핵심 기둥",
  "3 Pillars of 54 Ethnic Heritages": "54개 민족 문화의 3대 핵심 기둥",
  "Đặc Trưng Trang Phục • Kiến Trúc Nhà Ở • Lễ Hội Dân Gian": "전통 의상 특징 • 가옥 건축 양식 • 민속 전통 축제",
  "Traditional Costumes • Architecture • Festive Heritage": "전통 의상 특징 • 가옥 건축 양식 • 민속 전통 축제",
  "Đặc Trưng Trang Phục Cổ Truyền 54 Dân Tộc": "54개 민족 전통 복식의 특징",
  "Traditional Costumes of 54 Ethnic Groups": "54개 민족 전통 복식의 특징",
  "Kiểu dáng tiêu biểu:": "대표 복식 스타일:",
  "Costume types:": "대표 복식 스타일:",
  "Đặc Trưng Kiến Trúc Nhà Ở 54 Dân Tộc": "54개 민족 가옥 건축의 특징",
  "Traditional Housing & Architecture": "54개 민족 가옥 건축의 특징",
  "Kiểu nếp nhà:": "대표 주거 형태:",
  "Dwelling types:": "대표 주거 형태:",
  "Hình ảnh kiến trúc tiêu biểu (bấm để xem & lọc):": "대표 건축 갤러리 (클릭하여 확대 및 필터링):",
  "Architecture photo gallery (click to filter):": "대표 건축 갤러리 (클릭하여 확대 및 필터링):",
  "Đặc Trưng Lễ Hội & Phong Tục 54 Dân Tộc": "54개 민족 민속 축제 & 풍습",
  "Festivals & Ceremonies of 54 Ethnic Groups": "54개 민족 민속 축제 & 풍습",
  "Lễ hội & Nghi thức:": "대표 축제 & 제례 의식:",
  "Festival rituals:": "대표 축제 & 제례 의식:",
  "Hình ảnh lễ hội truyền thống (bấm để xem & lọc):": "전통 축제 사진 갤러리 (클릭하여 확대 및 필터링):",
  "Festival photo gallery (click to filter):": "전통 축제 사진 갤러리 (클릭하여 확대 및 필터링):",
  "1. Đặc Trưng Trang Phục": "1. 고유 전통 의상",
  "1. Traditional Costumes": "1. 고유 전통 의상",
  "2. Kiến Trúc Nhà Ở": "2. 전통 가옥 건축",
  "2. Traditional Architecture": "2. 전통 가옥 건축",
  "3. Lễ Hội & Phong Tục": "3. 민속 축제 & 제례",
  "3. Festivals & Rituals": "3. 민속 축제 & 제례",
  "Vùng miền:": "지역:",
  "Region:": "지역:",
  "Xem bộ sưu tập lưới ảnh 54 dân tộc": "54개 민족 사진 그리드 갤러리 보기",
  "Grid gallery view": "사진 그리드 갤러리 보기",
  "Lưới ảnh 54 dân tộc": "54개 민족 사진 그리드",
  "Photo Grid": "사진 그리드",
  "Xem danh sách & tiêu điểm chi tiết": "상세 목록 및 집중 탐구 보기",
  "List & Spotlight view": "상세 목록 및 집중 탐구 보기",
  "Danh sách chi tiết": "상세 목록",
  "List & Detail": "상세 목록",
  "Không tìm thấy dân tộc phù hợp": "일치하는 민족 정보를 찾을 수 없습니다",
  "No matching ethnic group found": "일치하는 민족 정보를 찾을 수 없습니다",
  "Xóa bộ lọc để xem lại toàn bộ 54 dân tộc": "필터를 초기화하여 54개 민족 전체보기",
  "Reset filters": "필터 초기화",
  "Kiến trúc": "건축 양식",
  "Architecture": "건축 양식",
  "Lễ hội": "민속 축제",
  "Festival": "민속 축제",
  "Xem ảnh trang phục": "전통 의상 사진 보기",
  "View costume image": "전통 의상 사진 보기",
  "Xem ảnh kiến trúc nhà ở": "가옥 건축 사진 보기",
  "View architecture image": "가옥 건축 사진 보기",
  "Xem ảnh lễ hội truyền thống": "전통 축제 사진 보기",
  "View festival image": "전통 축제 사진 보기",
  "Trang phục đặc trưng:": "고유 전통 의상:",
  "Traditional attire:": "고유 전통 의상:",
  "Tiêu điểm": "집중 조명",
  "Active": "현재 위치",
  "Kiến trúc nhà ở:": "가옥 건축 양식:",
  "Architecture:": "가옥 건축 양식:",
  "Bấm để soi ảnh kiến trúc": "클릭하여 건축 사진 자세히 보기",
  "Click to inspect architecture image": "클릭하여 건축 사진 자세히 보기",
  "Lễ hội tiêu biểu:": "대표 민속 축제:",
  "Festivals:": "대표 민속 축제:",
  "Bấm để soi ảnh lễ hội": "클릭하여 축제 사진 자세히 보기",
  "Click to inspect festival image": "클릭하여 축제 사진 자세히 보기",
  "Soi Nét Đặc Trưng": "핵심 특징 탐구",
  "Inspect Features": "핵심 특징 탐구",
  "Danh sách 54 Dân Tộc Việt Nam:": "베트남 54개 형제 민족 목록:",
  "List of 54 Ethnic Groups:": "베트남 54개 형제 민족 목록:",
  "Quần thể di tích lịch sử & văn hóa nghìn năm:": "천년의 역사와 유서 깊은 문화유산 단지:",
  "Historic monuments & millennium-old heritages:": "천년의 역사와 유서 깊은 문화유산 단지:",
  "Di tích": "역사 유적",
  "Monuments": "역사 유적",
  "Thời kỳ lịch sử:": "역사적 시대:",
  "Historical period:": "역사적 시대:",
  "Địa điểm:": "위치 / 소재지:",
  "Location:": "위치 / 소재지:",
  "Giá trị di sản:": "문화유산 가치:",
  "Heritage value:": "문화유산 가치:",

  // Explore Destinations & Food
  "Danh Thắng & Ẩm Thực": "명소 & 대표 미식",
  "Destinations & Cuisine": "명소 & 대표 미식",
  "Khám Phá Địa Điểm & Món Ngon Nổi Tiếng": "베트남 대표 명소 & 유명 미식 탐험",
  "Iconic Sights & Famous Gastronomy": "베트남 대표 명소 & 유명 미식 탐험",
  "Mỗi địa danh và món ăn đều gắn liền với dòng giới thiệu nét đặc trưng của loại hình du lịch, câu chuyện văn hóa ngàn năm và chi phí tham khảo thực tế.": "모든 명소와 요리에는 여행 유형별 특징, 유구한 역사·문화 이야기 및 실질적인 참고 여행 경비가 함께 제공됩니다.",
  "Each destination and dish comes paired with travel typology insights, historical heritage stories, and practical pricing.": "모든 명소와 요리에는 여행 유형별 특징, 유구한 역사·문화 이야기 및 실질적인 참고 여행 경비가 함께 제공됩니다.",
  "Tìm địa danh, món ăn...": "명소, 대표 요리 검색...",
  "Search place, dish...": "명소, 대표 요리 검색...",
  "Tất cả": "전체",
  "All": "전체",
  "Địa Điểm Cần Đến": "주요 명소",
  "Places": "주요 명소",
  "Đặc Sắc Ẩm Thực": "대표 미식",
  "Cuisine": "대표 미식",
  "Video 3 Miền": "3대 지역 영상",
  "3-Region Videos": "3대 지역 영상",
  "Toàn quốc": "전국",
  "Miền Bắc": "북부",
  "North": "북부",
  "Miền Trung": "중부",
  "Central": "중부",
  "Miền Nam": "남부",
  "South": "남부",
  "Thời gian đẹp:": "최적 여행 시기:",
  "Best time:": "최적 여행 시기:",
  "🏛️ Ý nghĩa văn hóa & lịch sử:": "🏛️ 문화적 의미 및 역사적 배경:",
  "🏛️ Cultural Story & Heritage:": "🏛️ 문화적 의미 및 역사적 배경:",
  "Thuyết minh": "오디오 가이드",
  "Audio Guide": "오디오 가이드",
  "Xem video 3 miền": "3대 지역 영상 시청",
  "Watch 3-region videos": "3대 지역 영상 시청",
  "Đặt dịch vụ qua Traveloka:": "Traveloka 공식 서비스 예약:",
  "Book with Traveloka:": "Traveloka 공식 서비스 예약:",
  "Vé bay": "항공권",
  "Flight": "항공권",
  "Khách sạn": "호텔",
  "Hotel": "호텔",
  "Vé vui chơi": "액티비티",
  "Passes": "액티비티",
  "Hương vị đặc trưng:": "고유의 맛과 풍미:",
  "Taste profile:": "고유의 맛과 풍미:",
  "Quán ăn nổi tiếng gợi ý:": "현지 추천 맛집:",
  "Recommended places:": "현지 추천 맛집:",
  "Giá trung bình:": "평균 가격대:",
  "Average price:": "평균 가격대:",
  "Câu chuyện văn hóa ẩm thực:": "요리에 얽힌 문화 이야기:",
  "Cultural food story:": "요리에 얽힌 문화 이야기:",

  // Video Showcase
  "Showcase Video 3 Miền Đất Nước": "베트남 3대 지역 고화질 영상 쇼케이스",
  "3-Region Video Showcase": "베트남 3대 지역 고화질 영상 쇼케이스",
  "Những thước phim 4K sống động giới thiệu cảnh đẹp non nước, ẩm thực đường phố và di sản văn hóa Việt Nam.": "베트남의 수려한 산하와 바다, 활기찬 길거리 미식과 문화유산을 담은 생생한 영상 컬렉션입니다.",
  "Immersive 4K footage celebrating Vietnam’s natural landscapes, street gastronomy, and timeless heritages.": "베트남의 수려한 산하와 바다, 활기찬 길거리 미식과 문화유산을 담은 생생한 영상 컬렉션입니다.",
  "Đang phát video:": "현재 재생 중인 영상:",
  "Now playing:": "현재 재생 중인 영상:",
  "Ẩm thực": "미식 요리",
  "Thiên nhiên": "자연 경관",
  "Văn hóa": "전통문화",
  "Di sản": "세계유산",
  "Thu gọn video": "영상 창 접기",
  "Mở rộng video": "영상 창 펼치기",

  // Services & Stays
  "Dịch Vụ & Phong Cách Du Lịch": "여행 서비스 & 여행 스타일",
  "Services & Travel Styles": "여행 서비스 & 여행 스타일",
  "Vé Máy Bay Giá Tốt": "실속 최저가 항공권",
  "Best Flight Fares": "실속 최저가 항공권",
  "20.000+ Khách Sạn & Resort": "20,000+ 호텔 & 리조트",
  "20,000+ Stays & Resorts": "20,000+ 호텔 & 리조트",
  "Combo Tiết Kiệm Tới 30%": "최대 30% 절약 콤보",
  "Combo Save up to 30%": "최대 30% 절약 콤보",
  "Vé Vui Chơi Xperience": "Xperience 액티비티 티켓",
  "Attraction Tickets": "Xperience 액티비티 티켓",
  "Phương Tiện Di Chuyển": "교통 및 이동 수단",
  "Transportation": "교통 및 이동 수단",
  "Chỗ Ở & Lưu Trú": "숙소 & 호텔·홈스테이",
  "Accommodations": "숙소 & 호텔·홈스테이",
  "Phong Cách Du Lịch": "추천 여행 스타일",
  "Travel Styles": "추천 여행 스타일",
  "Ưu điểm nổi bật:": "주요 장점 및 특징:",
  "Key benefits:": "주요 장점 및 특징:",
  "Lưu ý quan trọng:": "주의사항 및 팁:",
  "Important notes:": "주의사항 및 팁:",
  "Mức giá tham khảo:": "참고 가격대:",
  "Estimated price:": "참고 가격대:",
  "Phù hợp cho:": "추천 대상:",
  "Best suited for:": "추천 대상:",
  "Mẹo trải nghiệm:": "여행 꿀팁:",
  "Travel tips:": "여행 꿀팁:",
  "Đặt Dịch Vụ Này": "이 서비스 예약하기",
  "Book This Service": "이 서비스 예약하기",

  // Itinerary Planner
  "Gợi Ý Lộ Trình": "추천 여행 코스",
  "Itinerary Planner": "추천 여행 코스",
  "Lịch Trình Du Lịch Khám Phá Tối Ưu": "베트남 최적 여행 코스 추천",
  "Optimized Travel Itineraries": "베트남 최적 여행 코스 추천",
  "Được thiết kế chu đáo theo từng buổi, cân bằng giữa danh lam thắng cảnh, ẩm thực địa phương và dự toán chi phí minh bạch.": "오전, 오후, 저녁 시간대별로 세심하게 설계되어 관광, 미식 및 투명한 예상 경비가 완벽한 조화를 이룹니다.",
  "Carefully crafted by morning, afternoon, and evening with transparent cost estimates and authentic experiences.": "오전, 오후, 저녁 시간대별로 세심하게 설계되어 관광, 미식 및 투명한 예상 경비가 완벽한 조화를 이룹니다.",
  "1-3 Ngày": "1~3일 코스",
  "4-7 Ngày": "4~7일 코스",
  "10-14 Ngày": "10~14일 종단",
  "Tổng chi phí dự kiến:": "총 예상 경비:",
  "Total estimated budget:": "총 예상 경비:",
  "Thời lượng:": "여행 기간:",
  "Duration:": "여행 기간:",
  "Điểm đến trong tour:": "방문 도시 및 명소:",
  "Tour destinations:": "방문 도시 및 명소:",
  "Buổi sáng:": "오전 일정:",
  "Morning:": "오전 일정:",
  "Buổi chiều:": "오후 일정:",
  "Afternoon:": "오후 일정:",
  "Buổi tối:": "저녁 일정:",
  "Evening:": "저녁 일정:",
  "Phương tiện & Di chuyển:": "이동 수단 및 교통편:",
  "Transport:": "이동 수단 및 교통편:",
  "Chỗ ở gợi ý:": "추천 숙소:",
  "Recommended stay:": "추천 숙소:",
  "Đặt Tour Theo Lộ Trình Này": "이 코스로 투어 예약하기",
  "Book This Tour": "이 코스로 투어 예약하기",
  "AI Kiến Tạo Lộ Trình Riêng": "AI 맞춤 여행 코스 생성기",
  "AI Custom Tour Generator": "AI 맞춤 여행 코스 생성기",
  "Nhập sở thích, số ngày và ngân sách của bạn (VD: 'Tôi muốn đi 5 ngày từ Hà Nội đến Đà Nẵng, thích ăn ngon và chụp ảnh đẹp')...": "여행 선호도, 일정 및 예산을 입력하세요 (예: '하노이에서 다낭까지 5일 일정, 미식과 사진 명소 위주로 추천해줘')...",
  "Tạo Lộ Trình": "맞춤 코스 생성",
  "Generate Route": "맞춤 코스 생성",
  "Đang tạo lộ trình...": "AI 맞춤 코스 생성 중...",
  "Generating...": "AI 맞춤 코스 생성 중...",

  // Interactive Map
  "Bản Đồ Trực Quan Có Thuyết Minh Âm Thanh": "음성 안내 지원 대화형 인터랙티브 지도",
  "Interactive Map with Voice Narration": "음성 안내 지원 대화형 인터랙티브 지도",
  "Bản Đồ Du Lịch Việt Nam & Giọng Nói Hướng Dẫn": "베트남 관광 지도 & 전문 오디오 가이드",
  "Vietnam Tourism Map & Audio Guide": "베트남 관광 지도 & 전문 오디오 가이드",
  "Nhấp vào bất kỳ địa danh nào trên bản đồ hoặc danh sách bên dưới để lắng nghe giọng đọc giới thiệu về lịch sử, cảnh quan và văn hóa đặc trưng.": "지도 위 명소나 아래 목록을 클릭하면 역사, 자연 경관 및 문화적 특징을 담은 현지 오디오 가이드를 들을 수 있습니다.",
  "Click any destination on the map or the list to hear authentic audio narration about its history, scenic wonders, and cultural traits.": "지도 위 명소나 아래 목록을 클릭하면 역사, 자연 경관 및 문화적 특징을 담은 현지 오디오 가이드를 들을 수 있습니다.",
  "Đang thuyết minh địa điểm:": "현재 안내 중인 명소:",
  "Now narrating:": "현재 안내 중인 명소:",
  "Dừng đọc": "재생 중지",
  "Stop": "재생 중지",
  "Nghe thuyết minh": "오디오 가이드 듣기",
  "Listen Guide": "오디오 가이드 듣기",

  // Maritime Sovereignty
  "Chủ Quyền Biển Đảo": "신성한 해양 주권",
  "Maritime Sovereignty": "신성한 해양 주권",
  "Hoàng Sa & Trường Sa": "호앙사 & 쯔엉사 군도",
  "Paracel & Spratly": "호앙사 & 쯔엉사 군도",
  "Bằng chứng lịch sử & Cơ sở pháp lý thiêng liêng": "신성한 역사적 증거 & 국제법적 토대",
  "Sacred Historical Evidence & Legal Foundation": "신성한 역사적 증거 & 국제법적 토대",
  "Khẳng định chủ quyền không thể chối cãi của Việt Nam đối với hai quần đảo Hoàng Sa và Trường Sa qua các triều đại và tư liệu quốc tế.": "역대 왕조와 국제 문서들을 통해 입증된 호앙사 및 쯔엉사 군도에 대한 베트남의 명백하고 양도할 수 없는 주권을 확인합니다.",
  "Affirming Vietnam’s undeniable sovereignty over the Paracel and Spratly archipelagos through dynasties and international archives.": "역대 왕조와 국제 문서들을 통해 입증된 호앙사 및 쯔엉사 군도에 대한 베트남의 명백하고 양도할 수 없는 주권을 확인합니다.",
  "Tư liệu lịch sử tiêu biểu:": "대표적인 역사적 기록물:",
  "Historical records:": "대표적인 역사적 기록물:",
  "Cơ sở pháp lý quốc tế:": "국제법적 토대 및 협약:",
  "Legal grounds:": "국제법적 토대 및 협약:",
  "Vị trí chiến lược:": "전략적 해양 위치:",
  "Strategic position:": "전략적 해양 위치:",

  // Translator & Phrasebook
  "Công Cụ Phiên Dịch & Giải Đáp Du Khách": "여행 번역기 & 문화 Q&A 도우미",
  "Translation & Cultural Q&A for Tourists": "여행 번역기 & 문화 Q&A 도우미",
  "Cầu Nối Ngôn Ngữ & Sổ Tay Giao Tiếp Thiết Yếu": "필수 여행 회화집 & 실시간 양방향 번역기",
  "Travel Phrasebook & Instant Translator": "필수 여행 회화집 & 실시간 양방향 번역기",
  "Thiết kế riêng cho du khách quốc tế và người Việt đi du lịch: phát âm mẫu chuẩn xác, hướng dẫn mặc cả, gọi món không cay và trợ lý giải đáp mọi thắc mắc văn hóa.": "해외 여행객을 위한 실시간 원어민 발음, 안 맵게 주문하기, 정중한 흥정 팁 및 AI 문화 어시스턴트를 제공합니다.",
  "Designed for international travelers in Vietnam: audio pronunciations, dining allergy tips, polite bargaining, and AI-powered cultural answers.": "해외 여행객을 위한 실시간 원어민 발음, 안 맵게 주문하기, 정중한 흥정 팁 및 AI 문화 어시스턴트를 제공합니다.",
  "Dịch Nhanh Sang Tiếng Việt": "베트남어로 빠른 번역",
  "Translate to Vietnamese": "베트남어로 빠른 번역",
  "Có Audio Phát Âm": "원어민 오디오 발음 지원",
  "Nhập câu tiếng Anh hoặc bất kỳ ngôn ngữ nào cần dịch sang tiếng Việt (VD: \"How much is this bowl of pho?\")...": "베트남어로 말하고 싶은 문장을 입력하세요 (예: \"이 쌀국수 얼마인가요?\", \"고수 빼주세요\")...",
  "Type anything you want to say in Vietnam (e.g. \"I cannot eat spicy food\", \"Where is the nearest pharmacy?\")...": "베트남어로 말하고 싶은 문장을 입력하세요 (예: \"이 쌀국수 얼마인가요?\", \"고수 빼주세요\")...",
  "Đang dịch...": "번역 중...",
  "Translating...": "번역 중...",
  "Dịch & Phiên Âm": "번역 및 발음 확인",
  "Translate & Pronounce": "번역 및 발음 확인",
  "Tiếng Việt:": "베트남어 번역:",
  "Vietnamese Translation:": "베트남어 번역:",
  "Phát âm câu này": "이 문장 음성 듣기",
  "Hỏi Trợ Lý Văn Hóa & Du Lịch": "베트남 문화 & 여행 AI 어시스턴트",
  "Ask Vietnam Travel Assistant": "베트남 문화 & 여행 AI 어시스턴트",
  "Giải đáp nhanh về phong tục, tiền boa (tip), văn hóa ứng xử và lưu ý an toàn.": "현지 팁 문화, 예절, 안전 수칙 및 관습에 대해 무엇이든 물어보세요.",
  "Quick answers on local tipping, etiquette, customs, and safety tips.": "현지 팁 문화, 예절, 안전 수칙 및 관습에 대해 무엇이든 물어보세요.",
  "Đặt câu hỏi (VD: 'Ở Việt Nam có cần boa tiền không?', 'Đi chùa nên mặc đồ thế nào?')...": "질문을 입력하세요 (예: '베트남에서는 팁을 주어야 하나요?', '사원에 갈 때 복장 규정은?')...",
  "Gửi câu hỏi": "질문 전송",
  "Ask Question": "질문 전송",
  "Đang trả lời...": "답변 작성 중...",
  "Answering...": "답변 작성 중...",
  "Sổ Tay Mẫu Câu Thiết Yếu Có Âm Thanh": "실시간 음성 지원 여행 필수 회화집",
  "Essential Travel Phrasebook with Audio": "실시간 음성 지원 여행 필수 회화집",
  "Bấm vào biểu tượng loa để phát âm mẫu câu cho người bán hàng hoặc tài xế nghe trực tiếp.": "스피커 아이콘을 누르면 현지 기사님이나 상인에게 정확한 원어민 발음으로 직접 들려줄 수 있습니다.",
  "Tap the audio button to play accurate native pronunciation directly to vendors or drivers.": "스피커 아이콘을 누르면 현지 기사님이나 상인에게 정확한 원어민 발음으로 직접 들려줄 수 있습니다.",
  "Chào hỏi": "기본 인사",
  "Greetings": "기본 인사",
  "Gọi món": "식당 주문",
  "Dining": "식당 주문",
  "Mua sắm": "쇼핑·흥정",
  "Shopping": "쇼핑·흥정",
  "Hỏi đường": "길 찾기",
  "Directions": "길 찾기",
  "Khẩn cấp": "긴급 상황",
  "Emergency": "긴급 상황",

  // Reviews
  "Đánh Giá & Nhận Xét": "여행자 생생 후기 & 평점",
  "Traveler Reviews": "여행자 생생 후기 & 평점",
  "Đánh Giá Thực Tế Từ Du Khách": "전 세계 여행자들의 실제 여행 평가",
  "Real Traveler Testimonials": "전 세계 여행자들의 실제 여행 평가",
  "Lắng nghe những cảm nhận chân thực về cảnh sắc, con người, ẩm thực và dịch vụ du lịch tại Việt Nam.": "베트남의 아름다운 풍경, 따뜻한 사람들, 매력적인 음식과 여행 서비스에 대한 진솔한 경험담을 확인하세요.",
  "Hear authentic feedback about Vietnam’s stunning nature, welcoming people, delicious gastronomy, and travel services.": "베트남의 아름다운 풍경, 따뜻한 사람들, 매력적인 음식과 여행 서비스에 대한 진솔한 경험담을 확인하세요.",
  "Đánh giá trung bình": "평균 평점",
  "Average Rating": "평균 평점",
  "tổng số đánh giá": "개의 전체 평가",
  "total reviews": "개의 전체 평가",
  "Viết Đánh Giá Của Bạn": "나의 여행 후기 작성하기",
  "Write Your Review": "나의 여행 후기 작성하기",
  "Chia sẻ trải nghiệm du lịch Việt Nam của bạn với cộng đồng quốc tế.": "여러분의 소중한 베트남 여행 경험을 전 세계 여행자들과 나누어보세요.",
  "Share your Vietnam travel experience with the global traveler community.": "여러분의 소중한 베트남 여행 경험을 전 세계 여행자들과 나누어보세요.",
  "Họ và tên của bạn *": "작성자 성명 *",
  "Your name *": "작성자 성명 *",
  "Quốc tịch (VD: Hàn Quốc, Việt Nam, Mỹ...) *": "국적 (예: 대한민국, 미국, 베트남...) *",
  "Nationality *": "국적 *",
  "Điểm đến đã trải nghiệm *": "방문한 여행지 *",
  "Destination visited *": "방문한 여행지 *",
  "Chia sẻ chi tiết trải nghiệm, cảm nhận về cảnh quan, ẩm thực và con người... *": "풍경, 음식, 사람들에 대한 솔직한 경험과 소감을 자유롭게 작성해주세요... *",
  "Write your detailed review... *": "풍경, 음식, 사람들에 대한 솔직한 경험과 소감을 자유롭게 작성해주세요... *",
  "Gửi Đánh Giá": "후기 등록하기",
  "Submit Review": "후기 등록하기",
  "Cảm ơn bạn đã gửi đánh giá! Ý kiến của bạn đã được ghi nhận.": "후기를 남겨주셔서 대단히 감사합니다! 소중한 의견이 등록되었습니다.",
  "Thank you for your review! It has been submitted successfully.": "후기를 남겨주셔서 대단히 감사합니다! 소중한 의견이 등록되었습니다.",

  // Auth & Account
  "Cập nhật thông tin hồ sơ du khách thành công!": "여행자 프로필이 성공적으로 업데이트되었습니다!",
  "Profile updated successfully!": "여행자 프로필이 성공적으로 업데이트되었습니다!",
  "Điểm Sen Vàng": "골든 로터스 포인트",
  "Lotus Points": "골든 로터스 포인트",
  "Đăng xuất": "로그아웃",
  "Log Out": "로그아웃",
  "Thoát": "로그아웃",
  "Vé Máy Bay Điện Tử (E-Tickets)": "전자 항공권 (E-Tickets)",
  "Flight E-Tickets": "전자 항공권 (E-Tickets)",
  "Lưu trữ thẻ lên máy bay, mã QR và chi tiết chuyến bay": "탑승권, QR 코드 및 상세 항공 일정을 보관합니다",
  "Store your boarding passes, QR codes, and flight itineraries": "탑승권, QR 코드 및 상세 항공 일정을 보관합니다",
  "Đặt Thêm Vé": "항공권 추가 예약",
  "Book Flight": "항공권 추가 예약",
  "Bạn chưa có vé máy bay nào được đặt.": "아직 예약된 항공권이 없습니다.",
  "You do not have any flight bookings yet.": "아직 예약된 항공권이 없습니다.",
  "Mua vé máy bay ngay": "지금 항공권 예약하기",
  "Book a Flight Ticket": "지금 항공권 예약하기",
  "✓ Đã xác nhận": "✓ 예약 확정",
  "Confirmed": "예약 확정",
  "Bay thẳng (Direct)": "직항 (Direct)",
  "Direct Flight": "직항 (Direct)",
  "Hành khách: ": "탑승객: ",
  "Passengers: ": "탑승객: ",
  "Khách Sạn & Homestay Đã Đặt": "예약된 호텔 & 홈스테이",
  "Hotel Reservations": "예약된 호텔 & 홈스테이",
  "Phiếu xác nhận đặt phòng, ngày check-in và hỗ trợ dịch vụ lưu trú": "호텔 예약 확인서, 체크인 일정 및 숙소 지원 정보",
  "Hotel confirmation vouchers, check-in dates, and contact info": "호텔 예약 확인서, 체크인 일정 및 숙소 지원 정보",
  "Đặt Phòng Mới": "새 숙소 예약",
  "Book Stay": "새 숙소 예약",
  "Bạn chưa có đặt phòng khách sạn hay homestay nào.": "아직 예약된 호텔이나 숙소가 없습니다.",
  "You do not have any hotel reservations yet.": "아직 예약된 호텔이나 숙소가 없습니다.",
  "Đặt phòng ngay": "지금 숙소 예약하기",
  "Book a Hotel": "지금 숙소 예약하기",
  "Tour Du Lịch Đã Đặt": "예약된 베트남 투어",
  "Booked Travel Tours": "예약된 베트남 투어",
  "Lịch trình trọn gói, hướng dẫn viên và điểm hẹn xuất phát": "패키지 여행 일정, 가이드 정보 및 출발 집결지",
  "Curated tour itineraries, guides, and meeting points": "패키지 여행 일정, 가이드 정보 및 출발 집결지",
  "Book Tour Mới": "새 투어 예약",
  "Bạn chưa có tour du lịch nào được book.": "아직 예약된 투어가 없습니다.",
  "You do not have any booked tours yet.": "아직 예약된 투어가 없습니다.",
  "Khám phá & Book tour": "투어 둘러보고 예약하기",
  "Browse & Book Tours": "투어 둘러보고 예약하기",
  "Quyền Lợi Hội Viên Bông Sen Vàng": "골든 로터스 VIP 회원 특권",
  "Golden Lotus Member Privileges": "골든 로터스 VIP 회원 특권",
  "Thông Tin Cá Nhân Du Khách": "여행자 개인 정보",
  "Traveler Profile Info": "여행자 개인 정보",
  "Chỉnh Sửa": "수정하기",
  "Edit": "수정하기",
  "Chọn Ảnh Đại Diện (Avatar)": "프로필 사진 선택",
  "Choose Avatar": "프로필 사진 선택",
  "Họ và tên *": "성명 (영문/한글) *",
  "Full Name *": "성명 (영문/한글) *",
  "Số điện thoại *": "연락처 *",
  "Phone Number *": "연락처 *",
  "Số Hộ chiếu / CCCD": "여권 번호 / 신분증",
  "Passport / ID Number": "여권 번호 / 신분증",
  "Quốc tịch": "국적",
  "Nationality": "국적",
  "Lưu Thay Đổi": "변경사항 저장",
  "Save Changes": "변경사항 저장",
  "Hủy": "취소",
  "Cancel": "취소",
  "Vui lòng điền đầy đủ các thông tin bắt buộc (*).": "필수 입력 항목(*)을 모두 입력해 주세요.",
  "Please fill in all required fields (*).": "필수 입력 항목(*)을 모두 입력해 주세요.",
  "Mật khẩu phải có ít nhất 6 ký tự để bảo vệ tài khoản.": "비밀번호는 최소 6자 이상이어야 합니다.",
  "Password must be at least 6 characters.": "비밀번호는 최소 6자 이상이어야 합니다.",
  "Mật khẩu xác nhận không khớp.": "비밀번호 확인이 일치하지 않습니다.",
  "Passwords do not match.": "비밀번호 확인이 일치하지 않습니다.",
  "Vui lòng đồng ý với Điều khoản dịch vụ du khách.": "여행자 서비스 이용약관에 동의해 주세요.",
  "Please accept the Tourist Service Terms.": "여행자 서비스 이용약관에 동의해 주세요.",
  "Đăng ký tài khoản thành công! Tặng bạn 500 Điểm thưởng Sen Vàng chào mừng.": "회원가입이 완료되었습니다! 웰컴 보너스로 골든 로터스 500포인트를 증정합니다.",
  "Registration successful! You received 500 Golden Lotus welcome points.": "회원가입이 완료되었습니다! 웰컴 보너스로 골든 로터스 500포인트를 증정합니다.",
  "Đã xảy ra lỗi khi tạo tài khoản.": "계정 생성 중 오류가 발생했습니다.",
  "An error occurred during registration.": "계정 생성 중 오류가 발생했습니다.",
  "Vui lòng nhập Email / Số điện thoại và Mật khẩu.": "이메일 / 휴대폰 번호와 비밀번호를 입력해 주세요.",
  "Please enter Email / Phone and Password.": "이메일 / 휴대폰 번호와 비밀번호를 입력해 주세요.",
  "Lỗi đăng nhập. Vui lòng thử lại.": "로그인에 실패했습니다. 다시 시도해 주세요.",
  "Login failed. Please try again.": "로그인에 실패했습니다. 다시 시도해 주세요.",
  "Đã đăng nhập thành công với tài khoản mẫu (VIP Gold)!": "VIP 골드 데모 계정으로 성공적으로 로그인되었습니다!",
  "Logged in as Demo VIP Gold Traveler!": "VIP 골드 데모 계정으로 성공적으로 로그인되었습니다!",
  "Cổng Dịch Vụ Du Khách": "여행자 멤버십 포털",
  "Traveler Portal": "여행자 멤버십 포털",
  "Đăng Ký Tài Khoản Du Khách": "여행자 신규 회원가입",
  "Create Traveler Account": "여행자 신규 회원가입",
  "Đăng Nhập Tài Khoản Du Khách": "여행자 회원 로그인",
  "Log In to Traveler Account": "여행자 회원 로그인",
  "Đăng ký miễn phí để mua vé máy bay, đặt phòng khách sạn, book tour du lịch và nhận ưu đãi độc quyền 54 dân tộc.": "무료 회원가입으로 항공권 및 호텔 예약, 투어 신청 및 54개 민족 문화 독점 혜택을 누려보세요.",
  "Free registration to book flights, stays, tours and collect Golden Lotus loyalty rewards.": "무료 회원가입으로 항공권 및 호텔 예약, 투어 신청 및 54개 민족 문화 독점 혜택을 누려보세요.",

  // Service Booking Modal
  "Đặt Dịch Vụ Du Lịch Việt Nam": "베트남 여행 서비스 통합 예약",
  "Vietnam Travel Booking": "베트남 여행 서비스 통합 예약",
  "Vé Máy Bay Trực Tiếp": "항공권 직접 예약",
  "Direct Flights": "항공권 직접 예약",
  "Khách Sạn & Homestay": "호텔 & 홈스테이 예약",
  "Stays & Resorts": "호텔 & 홈스테이 예약",
  "Combo Vé + Khách Sạn": "항공 + 호텔 절약 콤보",
  "Flight + Hotel Bundle": "항공 + 호텔 절약 콤보",
  "Tour Trọn Gói 3 Miền": "3대 지역 패키지 투어",
  "Curated 3-Region Tours": "3대 지역 패키지 투어",
  "Họ và tên hành khách / người đặt *": "예약자 / 탑승객 성명 *",
  "Lead traveler name *": "예약자 / 탑승객 성명 *",
  "Số điện thoại liên hệ *": "연락처 (휴대폰 번호) *",
  "Contact phone *": "연락처 (휴대폰 번호) *",
  "Ngày khởi hành": "출발 일자",
  "Departure date": "출발 일자",
  "Ngày trả phòng": "체크아웃 일자",
  "Check-out date": "체크아웃 일자",
  "Số lượng khách": "총 인원수",
  "Number of guests": "총 인원수",
  "Hãng hàng không ưu tiên:": "선호 항공사 선택:",
  "Preferred airline:": "선호 항공사 선택:",
  "Hạng vé:": "좌석 등급:",
  "Seat tier:": "좌석 등급:",
  "Yêu cầu đặc biệt (suất ăn, vị trí ngồi, đón sân bay...):": "특별 요청사항 (기내식, 좌석 선호, 공항 픽업 등):",
  "Special requests:": "특별 요청사항 (기내식, 좌석 선호, 공항 픽업 등):",
  "Xác Nhận & Đặt Giữ Chỗ": "예약 확인 및 완료하기",
  "Confirm & Book": "예약 확인 및 완료하기",
  "Đặt Chỗ Thành Công!": "예약이 성공적으로 완료되었습니다!",
  "Booking Confirmed!": "예약이 성공적으로 완료되었습니다!",
  "Xem Trong Trung Tâm Tài Khoản": "내 계정 예약함에서 확인하기",
  "View in Account Hub": "내 계정 예약함에서 확인하기",
  "Đóng Cửa Sổ": "창 닫기",
  "Close Window": "창 닫기"
};

// Also add all extracted phrases to dict if not present
for (const [vi, en] of Object.entries(extracted)) {
  if (!coreDict[vi]) {
    // If not manually mapped, assign translated or English
    coreDict[vi] = coreDict[en] || en;
  }
  if (!coreDict[en]) {
    coreDict[en] = coreDict[vi];
  }
}

// Build the content of src/utils/i18n.ts
const fileHeader = `/**
 * Comprehensive i18n & Localization Engine for Vietnam's Travel
 * Full support for Vietnamese (vi), English (en), and Korean (ko)
 */

import { Language, Destination, CuisineItem, EthnicGroup, HistoricMonument, ItineraryPlan, ReviewItem } from '../types';
import { KO_STRINGS, KO_DESTINATIONS, KO_PHRASEBOOK_ITEMS } from '../data/koreanTranslations';

export const KO_DICTIONARY: Record<string, string> = ${JSON.stringify(coreDict, null, 2)};

/**
 * Universal text translation helper
 * Returns the exact translation based on currentLang:
 * - 'vi': returns Vietnamese string
 * - 'en': returns English string
 * - 'ko': returns authentic Korean string from dictionary or provided ko text
 */
export function t(currentLang: Language, vi: string, en?: string, ko?: string): string {
  if (currentLang === 'vi') return vi;
  if (currentLang === 'en') return en || vi;
  if (currentLang === 'ko') {
    if (ko) return ko;
    const directMatch = KO_DICTIONARY[vi] || (en ? KO_DICTIONARY[en] : undefined);
    if (directMatch) return directMatch;
    
    const trimmedVi = vi.trim();
    const trimmedEn = en ? en.trim() : '';
    const matchTrimmed = KO_DICTIONARY[trimmedVi] || (trimmedEn ? KO_DICTIONARY[trimmedEn] : undefined);
    if (matchTrimmed) return matchTrimmed;

    return smartTranslateKo(vi, en || vi);
  }
  return en || vi;
}

/**
 * Smart Korean fallback translator for composite phrases
 */
function smartTranslateKo(vi: string, en: string): string {
  // Common keyword substitutions
  let res = en || vi;
  if (res.includes('Traveloka')) return res.replace('Flights', '항공권').replace('Hotels', '호텔').replace('Book', '예약');
  if (res.includes('Flight')) return res.replace('Flight', '항공권');
  if (res.includes('Hotel')) return res.replace('Hotel', '호텔');
  if (res.includes('Combo')) return res.replace('Combo', '콤보 패키지');
  if (res.includes('Price')) return res.replace('Price', '가격');
  if (res.includes('Day')) return res.replace('Days', '일간').replace('Day', '일');
  return res;
}

/**
 * Destination translation helpers
 */
export function getDestName(dest: Destination, lang: Language): string {
  if (lang === 'vi') return dest.vietnameseName;
  if (lang === 'ko') {
    const matched = KO_DESTINATIONS[dest.id];
    if (matched) return matched.nameKo;
    if (dest.nameKo) return dest.nameKo;
  }
  return dest.name;
}

export function getDestDesc(dest: Destination, lang: Language): string {
  if (lang === 'ko') {
    const matched = KO_DESTINATIONS[dest.id];
    if (matched) return matched.descKo;
    if (dest.descriptionKo) return dest.descriptionKo;
  }
  return dest.description;
}

export function getDestVoice(dest: Destination, lang: Language): string {
  if (lang === 'vi') return dest.voiceGuideVi;
  if (lang === 'ko') {
    const matched = KO_DESTINATIONS[dest.id];
    if (matched) return matched.voiceKo;
    if (dest.voiceGuideKo) return dest.voiceGuideKo;
  }
  return dest.voiceGuideEn;
}

/**
 * Cuisine translation helpers
 */
export const KO_CUISINE_MAP: Record<string, { nameKo: string; descKo: string }> = {
  'pho-vietnam': {
    nameKo: '베트남 쌀국수 (Phở)',
    descKo: '사골과 양지, 향신료를 진하게 우려낸 맑고 깊은 육수에 부드러운 쌀국수 면과 쇠고기, 신선한 허브를 얹은 베트남의 영혼이 깃든 국민 요리입니다.'
  },
  'banh-mi-vietnam': {
    nameKo: '베트남 바게트 샌드위치 (Bánh Mì)',
    descKo: '겉은 바삭하고 속은 쫄깃한 바게트에 파테, 돼지고기 구이, 새콤달콤한 무·당근 절임과 고수, 매콤한 칠리소스를 듬뿍 채운 세계적인 길거리 음식입니다.'
  },
  'bun-cha-hanoi': {
    nameKo: '하노이 분짜 (Bún Chả)',
    descKo: '숯불 향이 그윽하게 밴 돼지고기 패티와 삼겹살을 새콤달콤한 늑맘 피시소스 육수에 담가 얇은 쌀국수 분(Bún), 신선한 쌈 채소와 함께 적셔 먹는 하노이 전통 요리입니다.'
  },
  'bun-bo-hue': {
    nameKo: '후에 매운 소고기 쌀국수 (Bún Bò Huế)',
    descKo: '레몬그라스와 새우젓(Mắm ruốc), 칠리 오일의 얼큰하고 풍부한 향미가 일품인 중부 황실 고도 후에의 대표적인 소고기 국수입니다.'
  },
  'com-tam-saigon': {
    nameKo: '사이공 깨진 쌀 덮밥 (Cơm Tấm)',
    descKo: '특제 양념에 재워 숯불에 구워낸 돼지갈비(Sườn)와 계란찜(Chả trứng), 껍질 무침(Bì)을 늑맘 소스와 함께 즐기는 남부 호치민시의 대표 소울푸드입니다.'
  },
  'mi-quang-danang': {
    nameKo: '다낭 미꽝 (Mì Quảng)',
    descKo: '강황을 넣어 노란빛을 띠는 쫄깃한 면에 새우, 돼지고기, 땅콩과 바삭한 라이스 크래커를 올리고 자작한 육수를 부어 비벼 먹는 중부 대표 비빔국수입니다.'
  },
  'banh-xeo-mientay': {
    nameKo: '서부 메콩식 반세오 (Bánh Xèo)',
    descKo: '코코넛 밀크와 강황가루로 반죽해 바삭하게 부쳐낸 황금빛 크레페 속에 새우, 삼겹살, 숙주를 듬뿍 넣고 신선한 잎채소에 싸서 늑맘 소스에 찍어 먹는 요리입니다.'
  },
  'egg-coffee-hanoi': {
    nameKo: '하노이 에그 커피 (Cà Phê Trứng)',
    descKo: '진하고 쌉싸름한 베트남 전통 드립 로부스타 커피 위에 신선한 달걀노른자와 연유를 크림처럼 부드럽게 휘핑해 얹은 하노이의 명물 디저트 커피입니다.'
  }
};

export function getCuisineName(item: CuisineItem, lang: Language): string {
  if (lang === 'vi') return item.vietnameseName;
  if (lang === 'ko' && KO_CUISINE_MAP[item.id]) return KO_CUISINE_MAP[item.id].nameKo;
  return item.name;
}

export function getCuisineDesc(item: CuisineItem, lang: Language): string {
  if (lang === 'ko' && KO_CUISINE_MAP[item.id]) return KO_CUISINE_MAP[item.id].descKo;
  return item.description;
}
`;

fs.writeFileSync('src/utils/i18n.ts', fileHeader);
console.log('Successfully wrote src/utils/i18n.ts');
