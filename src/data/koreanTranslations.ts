/**
 * Comprehensive Korean (한국어) Localization & Translation Data for Vietnam's Travel
 * 완벽한 한국어 현지화: 명소, 미식, 54개 민족 문화, 해양 주권, 일정 플래너, 여행 서비스, 회화집 및 전체 UI
 */
import { Language } from '../types';
import { KO_54_ETHNIC_GROUPS, KoEthnicDetail } from './koreanEthnic54';
export { KO_54_ETHNIC_GROUPS, type KoEthnicDetail };

export interface LocaleStrings {
  // Navigation & General
  appTitle: string;
  appSubtitle: string;
  gridMenu: string;
  account: string;
  login: string;
  signUp: string;
  logout: string;
  close: string;
  search: string;
  exploreNow: string;
  viewDetails: string;
  bookNow: string;
  flightTicket: string;
  hotel: string;
  comboDeal: string;
  tour: string;
  interactiveMap: string;
  saveUpTo30: string;

  // Sections
  heroBadge: string;
  heroHeadline: string;
  heroSubheadline: string;
  provincesCount: string;
  ethnicGroupsCount: string;
  coastlineLength: string;
  unescoHeritagesCount: string;

  // Grid Menu Items
  navIntro: string;
  navIntroDesc: string;
  navExplore: string;
  navExploreDesc: string;
  navMap: string;
  navMapDesc: string;
  navSovereignty: string;
  navSovereigntyDesc: string;
  navCulture: string;
  navCultureDesc: string;
  navServices: string;
  navServicesDesc: string;
  navItinerary: string;
  navItineraryDesc: string;
  navPhrasebook: string;
  navPhrasebookDesc: string;
  navReviews: string;
  navReviewsDesc: string;

  // Traveloka Integration
  travelokaFlightsHotels: string;
  travelokaComboTitle: string;
  travelokaComboDesc: string;
  departureFrom: string;
  destinationTo: string;
  vacationSpot: string;
  departureDate: string;
  returnDate: string;
  passengers: string;
  rooms: string;
  seatClass: string;
  bookRoundTripFlight: string;
  bookDestinationHotel: string;
  openBothTabs: string;
  reserveInApp: string;

  // Culture & Sovereignty
  sovereigntyTitle: string;
  sovereigntySubtitle: string;
  paracelSpratly: string;
  ethnicTitle: string;
  ethnicSubtitle: string;

  // Reviews
  reviewsTitle: string;
  reviewsSubtitle: string;

  // Footer
  footerRights: string;
  footerTagline: string;
}

export const KO_STRINGS: LocaleStrings = {
  appTitle: "VIETNAM'S TRAVEL",
  appSubtitle: '끝없는 매력 • 63개 성·시 및 54개 민족 문화',
  gridMenu: '그리드 메뉴',
  account: '내 계정',
  login: '로그인',
  signUp: '회원가입',
  logout: '로그아웃',
  close: '닫기',
  search: '검색...',
  exploreNow: '지금 탐험하기',
  viewDetails: '상세보기',
  bookNow: '예약하기',
  flightTicket: '항공권',
  hotel: '호텔 & 리조트',
  comboDeal: '절약 콤보 -30%',
  tour: '베트남 투어',
  interactiveMap: '인터랙티브 지도',
  saveUpTo30: '최대 30% 할인',

  heroBadge: '✨ 공식 베트남 종합 여행 플랫폼',
  heroHeadline: '베트남의 숨결과 문화를 한눈에',
  heroSubheadline:
    '북부 사파의 계단식 논부터 다낭, 나트랑의 에메랄드빛 해변, 푸꾸옥의 일몰과 54개 형제 민족의 유구한 역사까지 함께합니다.',
  provincesCount: '63개 성·시',
  ethnicGroupsCount: '54개 민족',
  coastlineLength: '3,260km 해안선',
  unescoHeritagesCount: '8대 유네스코 세계유산',

  navIntro: '앱 소개 및 개요',
  navIntroDesc: '베트남 63개 성·시, 자연 경관과 유구한 역사·문화적 가치를 잇는 여정',
  navExplore: '3대 지역 명소 & 미식',
  navExploreDesc: '북부·중부·남부 최고 여행지 및 전통 미식 요리 탐방',
  navMap: '음성 지원 인터랙티브 지도',
  navMapDesc: '베트남 S자 곡선 대화형 지도 및 지역별 전문 오디오 가이드',
  navSovereignty: '바다·섬 주권 및 해양 유산',
  navSovereigntyDesc: '호앙사(Hoang Sa)·쯔엉사(Truong Sa) 군도의 역사적 증거와 3,260km 청정 해안',
  navCulture: '54개 민족 문화 & 전통',
  navCultureDesc: '54개 민족의 고유한 전통 의상, 건축 양식, 민속 축제 및 문화 보물',
  navServices: '여행 서비스 & 스타일',
  navServicesDesc: '비행기, 기차, 호텔, 리조트 및 패키지 콤보 절약 팁',
  navItinerary: '추천 여행 일정 (1~14일)',
  navItineraryDesc: '단기 여행부터 베트남 종단 코스까지 전문 여행 플래너',
  navPhrasebook: 'AI 여행 번역기 & 회화집',
  navPhrasebookDesc: '실시간 여행 베트남어·한국어 회화집 및 AI 스마트 가이드',
  navReviews: '여행자 생생 후기 & 평점',
  navReviewsDesc: '베트남을 여행한 국내외 여행자들의 진솔한 평가와 팁',

  travelokaFlightsHotels: 'Traveloka 항공 & 호텔',
  travelokaComboTitle: 'Traveloka 항공권 + 호텔 절약 콤보',
  travelokaComboDesc: '왕복 항공권과 호텔을 한 번에 예약하여 1인당 25%~30%를 절약하세요.',
  departureFrom: '출발지 (출발 공항)',
  destinationTo: '도착지 (휴양지 / 호텔 위치)',
  vacationSpot: '인기 휴양지',
  departureDate: '가는 날',
  returnDate: '오는 날',
  passengers: '탑승객 수',
  rooms: '객실 수',
  seatClass: '좌석 등급',
  bookRoundTripFlight: '1. Traveloka에서 왕복 항공권 예약',
  bookDestinationHotel: '2. Traveloka에서 도착지 호텔 예약',
  openBothTabs: '⚡ 왕복 항공권 & 호텔 2개 탭 동시 열기',
  reserveInApp: '📝 앱에서 콤보 바로 예약 (포인트 적립)',

  sovereigntyTitle: '베트남의 신성한 바다와 섬',
  sovereigntySubtitle: '호앙사(Hoang Sa)와 쯔엉사(Truong Sa)는 영원히 베트남의 영토입니다',
  paracelSpratly: '호앙사 & 쯔엉사 군도',
  ethnicTitle: '54개 형제 민족의 찬란한 문화',
  ethnicSubtitle: '다채로운 전통 의상, 고유 언어, 건축 및 생활 양식',

  reviewsTitle: '여행자 평가 및 커뮤니티',
  reviewsSubtitle: '전 세계 여행자들의 실제 여행 경험담',

  footerRights: '모든 권리 보유. 베트남 문화유산 및 관광 진흥 프로젝트.',
  footerTagline: '베트남의 숨결과 아름다움을 세계로 전합니다.',
};

// Korean destination guide mappings with both official IDs and short aliases
export interface KoDestinationDetail {
  nameKo: string;
  vietnameseName?: string;
  travelTypeKo: string;
  descKo: string;
  culturalSignificanceKo: string;
  bestTimeKo: string;
  costKo: string;
  voiceKo: string;
}

export const KO_DESTINATIONS: Record<string, KoDestinationDetail> = {
  // 1. Ha Long Bay
  'ha-long-bay': {
    nameKo: '하롱베이',
    vietnameseName: 'Vịnh Hạ Long',
    travelTypeKo: '유네스코 세계자연유산 & 크루즈 해양 투어',
    descKo: '세계 7대 자연경관. 에메랄드빛 바다 위에 솟아오른 1,969개의 신비로운 석회암 섬들과 동굴, 럭셔리 하룻밤 크루즈 체험.',
    culturalSignificanceKo: '하늘에서 용의 어머니가 내려와 옥구슬을 뿜어 외적을 막아내었다는 전설이 깃든 베트남의 국가적 보물.',
    bestTimeKo: '10월 ~ 4월 (선선하고 맑은 하늘)',
    costKo: '약 75,000 ~ 230,000원 / 일 (크루즈 등급에 따름)',
    voiceKo: '하롱베이는 유네스코 세계자연유산으로, 잔잔한 에메랄드빛 바다 위로 수천 개의 기암괴석이 펼쳐진 천혜의 절경을 자랑합니다.',
  },
  'ha-long': {
    nameKo: '하롱베이',
    travelTypeKo: '유네스코 세계자연유산 & 크루즈 투어',
    descKo: '유네스코 세계자연유산. 에메랄드빛 바다 위에 솟아오른 1,969개의 신비로운 석회암 섬.',
    culturalSignificanceKo: '용의 전설과 수천 년 고대 해양 문화의 요람.',
    bestTimeKo: '10월 ~ 4월',
    costKo: '약 75,000 ~ 230,000원 / 일',
    voiceKo: '하롱베이는 유네스코 세계자연유산으로 지정된 곳으로, 바다 위에 수천 개의 기암괴석이 펼쳐진 장관을 자랑합니다.',
  },

  // 2. Hanoi Old Quarter
  'hanoi-old-quarter': {
    nameKo: '하노이 & 36 구시가지',
    vietnameseName: 'Thủ Đô Hà Nội - Hồ Gươm & 36 Phố Phường',
    travelTypeKo: '역사 문화 탐방 & 천년 고도 미식 기행',
    descKo: '천년의 역사를 품은 베트남의 수도. 호안끼엠 호수, 프랑스 식민지 건축, 에그 커피와 전통 쌀국수(퍼)의 본고장.',
    culturalSignificanceKo: '고대 탕롱(Thăng Long)의 중심지로 1010년부터 이어진 베트남의 정치, 학문, 예술의 심장부.',
    bestTimeKo: '9월 ~ 11월 (선선한 가을, 은은한 밀크플라워 향기)',
    costKo: '약 30,000 ~ 90,000원 / 일',
    voiceKo: '하노이는 베트남의 천년 고도로, 고즈넉한 호안끼엠 호수와 활기찬 36개 옛 상점 거리가 어우러진 매력적인 수도입니다.',
  },
  hanoi: {
    nameKo: '하노이',
    travelTypeKo: '역사 문화 수도 투어',
    descKo: '천년의 역사를 품은 베트남의 수도. 호안끼엠 호수와 유서 깊은 구시가지 36번가.',
    culturalSignificanceKo: '탕롱의 유서 깊은 지식과 문화가 응집된 평화의 수도.',
    bestTimeKo: '9월 ~ 11월',
    costKo: '약 30,000 ~ 90,000원 / 일',
    voiceKo: '하노이는 베트남의 천년 고도로, 고즈넉한 호안끼엠 호수와 활기찬 36개 옛 거리가 어우러진 매력적인 수도입니다.',
  },

  // 3. Sa Pa & Fansipan
  'sapa-terraces': {
    nameKo: '사파 & 판시판 산',
    vietnameseName: 'Sa Pa & Đỉnh Fansipan',
    travelTypeKo: '고산 소수민족 문화 & 황금빛 계단식 논 트레킹',
    descKo: '인도차이나 최고봉 판시판(3,143m)과 므엉호아 계곡의 장엄한 계단식 논. 흐몽족과 붉은 자오족의 삶을 만나는 힐링 명소.',
    culturalSignificanceKo: '고산 지대 소수민족 공동체가 수백 년간 자연과 조화를 이루며 빚어낸 독보적인 계단식 농경 문화.',
    bestTimeKo: '8월 ~ 10월 (황금빛 벼 익는 계절), 12월 ~ 2월 (운해와 눈꽃)',
    costKo: '약 40,000 ~ 110,000원 / 일',
    voiceKo: '사파는 해발 1,600미터 고산 지대에 위치해 시원한 기후와 웅장한 계단식 논, 소수민족의 따뜻한 정취를 느낄 수 있습니다.',
  },
  sapa: {
    nameKo: '사파',
    travelTypeKo: '고산 생태 문화 트레킹',
    descKo: '인도차이나의 지붕 판시판 산과 웅장한 계단식 논, 고산 소수민족의 문화.',
    culturalSignificanceKo: '흐몽, 자오, 자이 등 54개 민족의 고유한 전통 직물과 축제의 요람.',
    bestTimeKo: '8월 ~ 10월',
    costKo: '약 40,000 ~ 110,000원 / 일',
    voiceKo: '사파는 해발 1,600미터 고산 지대에 위치해 시원한 기후와 웅장한 계단식 논, 흐몽족과 자오족의 전통 문화를 만날 수 있습니다.',
  },

  // 4. Ninh Binh & Trang An
  'ninh-binh-trangan': {
    nameKo: '짱안 - 닌빈',
    vietnameseName: 'Quần Thể Danh Thắng Tràng An - Ninh Bình',
    travelTypeKo: '유네스코 복합문화자연유산 & 삼판 나룻배 유람',
    descKo: '육지의 하롱베이. 맑은 강물을 따라 쪽배를 타고 기암괴석 수중 동굴을 통과하며 호아루 고도와 바이딘 사원을 순례.',
    culturalSignificanceKo: '동남아시아 최초의 복합 세계유산. 10세기 베트남 최초의 통일 봉건 왕조인 딘 왕조의 옛 수도.',
    bestTimeKo: '1월 ~ 3월 (봄 축제), 5월 ~ 6월 (땀꼭 황금 들판)',
    costKo: '약 30,000 ~ 80,000원 / 일',
    voiceKo: '짱안 닌빈은 유네스코 복합유산으로, 쪽배를 타고 비취빛 강물을 유람하며 원시 석회암 동굴과 호아루 옛 왕궁을 마주할 수 있습니다.',
  },
  ninhbinh: {
    nameKo: '닌빈',
    travelTypeKo: '생태 & 역사 복합 유산',
    descKo: '육지의 하롱베이로 불리는 웅장한 카르스트 지형과 고대 왕조의 유적지.',
    culturalSignificanceKo: '동남아시아 유일의 복합 세계유산이자 호아루 천년 왕도.',
    bestTimeKo: '1월 ~ 5월',
    costKo: '약 30,000 ~ 80,000원 / 일',
    voiceKo: '닌빈 짱안은 맑은 물길을 따라 동굴을 지나는 나룻배 투어가 일품인 세계 복합문화자연유산입니다.',
  },

  // 5. Phong Nha - Ke Bang
  'phong-nha-ke-bang': {
    nameKo: '퐁냐께방 국립공원',
    vietnameseName: 'Vườn Quốc Gia Phong Nha - Kẻ Bàng',
    travelTypeKo: '세계 최대 동굴 어드벤처 & 지하강 탐험',
    descKo: '세계 최대의 동굴 손둥(Sơn Đoòng)과 파라다이스 동굴이 숨겨진 4억 년 역사의 고대 석회암 카르스트 지형.',
    culturalSignificanceKo: '지구의 지질학적 진화 과정을 고스란히 보여주는 지구상 가장 오래된 대규모 카르스트 지형.',
    bestTimeKo: '3월 ~ 8월 (건기, 동굴 트레킹 최적기)',
    costKo: '약 45,000 ~ 130,000원 / 일',
    voiceKo: '퐁냐께방은 세계에서 가장 장대한 지하 동굴 세계를 품고 있는 유네스코 세계자연유산입니다.',
  },

  // 6. Hue Ancient Capital
  'hue-ancient-capital': {
    nameKo: '후에 옛 황도',
    vietnameseName: 'Cố Đô Huế - Di Sản Triều Nguyễn',
    travelTypeKo: '궁중 문화유산 & 응우옌 왕조 유적 순례',
    descKo: '응우옌 왕조의 황궁, 천모사탑, 역대 황제들의 웅장한 능묘와 흐엉강(향강) 궁중 음악 유람선.',
    culturalSignificanceKo: '베트남 마지막 봉건 왕조의 정궁. 유네스코에 등재된 베트남 궁중 아악(Nhã nhạc)의 발상지.',
    bestTimeKo: '1월 ~ 4월 (온화하고 비가 적은 시기)',
    costKo: '약 35,000 ~ 85,000원 / 일',
    voiceKo: '후에는 베트남 마지막 왕조인 응우옌 왕조의 찬란한 황실 문화와 궁중 요리를 오롯이 간직한 고즈넉한 역사의 도시입니다.',
  },
  hue: {
    nameKo: '후에',
    travelTypeKo: '역사 왕조 유적 투어',
    descKo: '응우옌 왕조의 황궁과 왕릉, 향강(Perfume River)이 흐르는 역사의 고도.',
    culturalSignificanceKo: '응우옌 왕조의 황궁과 역대 왕릉이 고스란히 남아있는 유서 깊은 문화유산의 중심지.',
    bestTimeKo: '1월 ~ 4월',
    costKo: '약 35,000 ~ 85,000원 / 일',
    voiceKo: '후에는 베트남 마지막 왕조인 응우옌 왕조의 황궁과 역대 황제들의 왕릉이 고스란히 남아있는 유서 깊은 문화유산의 중심지입니다.',
  },

  // 7. Hoang Sa Islands
  'hoang-sa-islands': {
    nameKo: '호앙사 군도 (파라셀 제도)',
    vietnameseName: 'Quần Đảo Hoàng Sa - Biển Đảo Thiêng Liêng',
    travelTypeKo: '해양 주권 안보 & 역사적 영해 순례',
    descKo: '베트남 다낭시에 속한 신성한 바다와 섬. 수백 년 전 응우옌 왕조의 호앙사 파견대(Đội Hoàng Sa)가 영토를 개척하고 수호한 역사적 현장.',
    culturalSignificanceKo: '베트남 역대 왕조의 왕실 칙령, 목판, 고지도에 명시된 베트남의 신성하고 불가침인 영토.',
    bestTimeKo: '연중 (다낭 호앙사 전시관 관람 권장)',
    costKo: '전시관 무료 관람',
    voiceKo: '호앙사 군도는 베트남 조국의 신성한 주권이 깃든 바다로, 다낭의 호앙사 전시관에서 역사적 증거와 기록을 확인할 수 있습니다.',
  },

  // 8. Hoi An Ancient Town
  'hoi-an-ancient-town': {
    nameKo: '호이안 고대 도시',
    vietnameseName: 'Đô Thị Cổ Hội An',
    travelTypeKo: '유네스코 세계문화유산 & 등불 야경 투어',
    descKo: '밤마다 비단 등불이 강변을 수놓는 16~17세기 동서양 무역 항구 고도. 일본 다리, 고택, 맞춤 양복과 특색 있는 전통 국수 까오라우.',
    culturalSignificanceKo: '베트남, 중국, 일본, 유럽의 건축과 생활 방식이 완벽하게 융합된 살아있는 박물관.',
    bestTimeKo: '2월 ~ 7월 (건기, 화창한 날씨와 보름달 등불 축제)',
    costKo: '약 35,000 ~ 95,000원 / 일',
    voiceKo: '호이안 고도시는 백여 년의 세월을 간직한 노란 벽의 가옥들과 밤마다 은은하게 빛나는 비단 등불이 낭만을 더하는 유네스코 세계문화유산입니다.',
  },
  hoian: {
    nameKo: '호이안',
    travelTypeKo: '고대 항구 도시 낭만 투어',
    descKo: '유네스코 세계문화유산. 밤마다 알록달록한 등불이 빛나는 16세기 무역 항구 고도.',
    culturalSignificanceKo: '동서양 무역의 교차로이자 완벽히 보존된 아시아의 옛 항구.',
    bestTimeKo: '2월 ~ 7월',
    costKo: '약 35,000 ~ 95,000원 / 일',
    voiceKo: '호이안 고도시는 수백 년의 세월을 간직한 노란 벽의 가옥들과 밤마다 은은하게 빛나는 비단 등불이 낭만을 더하는 도시입니다.',
  },

  // 9. Da Nang City
  'da-nang-city': {
    nameKo: '다낭 해양 도시',
    vietnameseName: 'Thành Phố Đà Nẵng - Cầu Vàng Bà Nà Hills',
    travelTypeKo: '현대 해양 리조트 휴양 & 바나힐 골든 브릿지',
    descKo: '포브스가 선정한 세계 6대 해변 미케 비치, 불을 뿜는 용다리, 마블 마운틴, 바나힐의 거대한 손 골든 브릿지가 있는 중부의 중심 도시.',
    culturalSignificanceKo: '중부 3대 세계유산(후에, 호이안, 미선)을 연결하는 허브이자 베트남에서 가장 살기 좋은 친환경 스마트 도시.',
    bestTimeKo: '3월 ~ 8월 (푸른 하늘과 쾌청한 파도)',
    costKo: '약 45,000 ~ 130,000원 / 일',
    voiceKo: '다낭은 세계적인 미케 해변과 환상적인 바나힐 골든 브릿지, 친절한 시민들이 반겨주는 베트남 중부의 대표 휴양도시입니다.',
  },
  danang: {
    nameKo: '다낭',
    travelTypeKo: '대표 해양 휴양지',
    descKo: '미케 비치와 바나힐 골든 브릿지, 용다리가 있는 중부 최고의 해양 관광 도시.',
    culturalSignificanceKo: '중부 유산 관문이자 현대적 스마트 관광 메트로폴리스.',
    bestTimeKo: '3월 ~ 8월',
    costKo: '약 45,000 ~ 130,000원 / 일',
    voiceKo: '다낭은 세계적인 미케 해변과 환상적인 바나힐 골든 브릿지, 그리고 친절한 시민들이 반겨주는 베트남 중부의 대표 휴양도시입니다.',
  },

  // 10. Truong Sa Islands
  'truong-sa-islands': {
    nameKo: '쯔엉사 군도 (스프래틀리 제도)',
    vietnameseName: 'Quần Đảo Trường Sa & Nhà Giàn DK1',
    travelTypeKo: '신성한 영토 주권 & 해군 국방 순례',
    descKo: '베트남 카인호아성에 속한 군도와 대륙붕 DK1 해상 플랫폼. 조국의 바다와 하늘을 밤낮으로 지키는 해군 장병과 주민들의 생활 터전.',
    culturalSignificanceKo: '베트남의 국가 주권, 평화 애호 정신, 3,260km 해양 주권의 굳건한 방파제.',
    bestTimeKo: '4월 ~ 6월 (해상 날씨가 가장 잔잔한 시기)',
    costKo: '국가 주권 순례 탐방 프로그램',
    voiceKo: '쯔엉사 군도와 DK1 해상 플랫폼은 베트남 민족의 불굴의 기개와 평화를 사랑하는 신성한 해양 주권의 상징입니다.',
  },

  // 11. Da Lat Flower City
  'da-lat-flower-city': {
    nameKo: '달랏 꽃의 도시',
    vietnameseName: 'Thành Phố Ngàn Hoa Đà Lạt',
    travelTypeKo: '온대 고원 힐링 휴양 & 아라비카 커피 농원 투어',
    descKo: '해발 1,500m 고원에 자리한 영원한 봄의 도시. 쑤언흐엉 호수, 랑비앙 산, 프랑스풍 빌라, 딸기 농장과 감성 카페.',
    culturalSignificanceKo: '람비엔 고원의 코호(K’Ho) 소수민족 문화와 20세기 초 프랑스 휴양 건축이 어우러진 낭만의 고장.',
    bestTimeKo: '11월 ~ 4월 (맑고 쾌청하며 꽃 축제가 열리는 계절)',
    costKo: '약 35,000 ~ 90,000원 / 일',
    voiceKo: '달랏은 일 년 내내 서늘한 봄 날씨가 이어지는 고원 도시로, 로맨틱한 소나무 숲과 향긋한 아라비카 커피로 유명합니다.',
  },
  dalat: {
    nameKo: '달랏',
    travelTypeKo: '고원 낭만 힐링 투어',
    descKo: '해발 1,500m 영원한 봄의 도시. 시원한 고원 기후, 꽃과 소나무 숲, 호수와 카페.',
    culturalSignificanceKo: '코호족의 전통 문화와 유럽풍 고원 정취가 조화된 곳.',
    bestTimeKo: '11월 ~ 4월',
    costKo: '약 35,000 ~ 90,000원 / 일',
    voiceKo: '달랏은 일 년 내내 서늘한 봄 날씨가 이어지는 고원 도시로, 로맨틱한 소나무 숲과 향긋한 아라비카 커피로 유명합니다.',
  },

  // 12. Ho Chi Minh City
  'ho-chi-minh-city': {
    nameKo: '호치민시 (사이공)',
    vietnameseName: 'Thành Phố Hồ Chí Minh - Hòn Ngọc Viễn Đông',
    travelTypeKo: '경제 메가시티 & 역사적 건축 및 역동적 나이트라이프',
    descKo: '동양의 진주라 불렸던 베트남 최대의 경제·문화 메트로폴리스. 통일궁, 노트르담 대성당, 벤탄 시장, 부이비엔 거리.',
    culturalSignificanceKo: '300여 년의 개척 역사와 현대 베트남의 미래 혁신을 이끄는 젊고 역동적인 심장.',
    bestTimeKo: '12월 ~ 4월 (화창하고 비가 적은 건기)',
    costKo: '약 40,000 ~ 120,000원 / 일',
    voiceKo: '호치민시는 역동적인 에너지와 역사적 건축물이 어우러진 베트남 최고의 메가시티로, 풍부한 길거리 음식과 밤문화가 매력적입니다.',
  },
  saigon: {
    nameKo: '호치민시',
    travelTypeKo: '현대 메가시티 투어',
    descKo: '활력 넘치는 베트남 최대 경제 도시. 프랑스 식민지 시대 건축과 현대적 스카이라인.',
    culturalSignificanceKo: '남부 개척 정신과 역동적인 경제 발전의 요람.',
    bestTimeKo: '12월 ~ 4월',
    costKo: '약 40,000 ~ 120,000원 / 일',
    voiceKo: '호치민시는 역동적인 에너지와 노트르담 대성당, 중앙우체국 등 역사적 건축물이 어우러진 베트남 최고의 메트로폴리스입니다.',
  },

  // 13. Mekong Delta & Can Tho
  'mekong-delta-can-tho': {
    nameKo: '메콩 델타 - 껀터',
    vietnameseName: 'Miền Tây Sông Nước & Chợ Nổi Cái Răng',
    travelTypeKo: '수상 시장 생태 문화 & 풍요로운 열대 과일 정원',
    descKo: '남서부의 젖줄 메콩강. 새벽부터 활기를 띠는 까이랑 수상 시장, 과일 농장, 돈까따이뜨(Đờn ca tài tử) 민속 음악 감상.',
    culturalSignificanceKo: '킨족, 크메르족, 화족의 화합이 만들어낸 풍요로운 수향 문화와 유네스코 인류무형문화유산.',
    bestTimeKo: '9월 ~ 11월 (풍요로운 수해철), 5월 ~ 8월 (과일 수확기)',
    costKo: '약 30,000 ~ 75,000원 / 일',
    voiceKo: '껀터는 메콩 델타의 수도로, 이른 아침 활기 넘치는 까이랑 수상 시장과 울창한 열대 과일 정원을 만날 수 있습니다.',
  },
  cantho: {
    nameKo: '껀터',
    travelTypeKo: '메콩강 수상 생태 투어',
    descKo: '메콩 델타의 심장. 까이랑 수상시장과 풍요로운 과일 정원, 수상 가옥 풍경.',
    culturalSignificanceKo: '남부 삼각주의 독특한 수상 가옥 생활과 남부 전통 민속 음악.',
    bestTimeKo: '9월 ~ 11월',
    costKo: '약 30,000 ~ 75,000원 / 일',
    voiceKo: '껀터는 메콩강 삼각주의 수도로, 이른 아침 활기 넘치는 까이랑 수상시장과 울창한 열대 과일 정원을 만날 수 있습니다.',
  },

  // 14. Phu Quoc Pearl Island
  'phu-quoc-pearl-island': {
    nameKo: '푸꾸옥 진주 섬',
    vietnameseName: 'Đảo Ngọc Phú Quốc - Thiên Đường Nghỉ Dưỡng',
    travelTypeKo: '열대 해양 리조트 휴양 & 사오 비치 일몰',
    descKo: '베트남 최남단 에메랄드빛 진주 섬. 사오 비치의 고운 백사장, 빈원더스 테마파크, 야시장, 럭셔리 5성급 오션프론트 리조트.',
    culturalSignificanceKo: '전통 어업과 진주 양식, 세계 최고급 전통 어간장(느억맘)의 산지이자 청정 생태 보전 지역.',
    bestTimeKo: '11월 ~ 4월 (잔잔한 파도와 눈부신 햇살의 건기)',
    costKo: '약 60,000 ~ 180,000원 / 일',
    voiceKo: '푸꾸옥은 베트남 남단 청정 해역에 자리한 섬으로, 눈부신 백사장과 환상적인 일몰, 세계적 수준의 리조트들이 가득한 휴양 낙원입니다.',
  },
  phuquoc: {
    nameKo: '푸꾸옥',
    travelTypeKo: '열대 해양 리조트 휴양',
    descKo: '베트남 최대의 진주 섬. 사오 비치와 럭셔리 리조트, 아름다운 낙조와 야시장.',
    culturalSignificanceKo: '세계적으로 유명한 정통 느억맘과 흑후추의 원산지.',
    bestTimeKo: '11월 ~ 4월',
    costKo: '약 60,000 ~ 180,000원 / 일',
    voiceKo: '푸꾸옥은 베트남 남단 청정 해역에 자리한 섬으로, 눈부신 백사장과 환상적인 일몰, 세계 최고 수준의 리조트들이 가득합니다.',
  },

  // Extra popular places
  nhatrang: {
    nameKo: '나트랑 (냐짱)',
    travelTypeKo: '사계절 온화한 에메랄드빛 해양 휴양',
    descKo: '연중 300일 이상 맑은 날씨, 에메랄드빛 바다와 천연 머드 온천, 빈원더스 테마파크.',
    culturalSignificanceKo: '고대 참파 왕국의 포나가르 첨탑과 바다 사람들의 축제.',
    bestTimeKo: '1월 ~ 8월',
    costKo: '약 40,000 ~ 120,000원 / 일',
    voiceKo: '나트랑은 연중 온화하고 푸른 바다를 자랑하는 해양 휴양지로, 섬 투어와 머드 스파를 즐기기에 최적입니다.',
  },
  condao: {
    nameKo: '콘다오 섬',
    travelTypeKo: '원시 자연 & 바다거북 생태 보호구역',
    descKo: '원시 자연을 간직한 천혜의 섬. 청정 해변, 거북이 산란지, 바다거북 보호구역.',
    culturalSignificanceKo: '베트남 독립 투쟁의 역사와 자연 생태계가 공존하는 성지.',
    bestTimeKo: '3월 ~ 9월',
    costKo: '약 60,000 ~ 150,000원 / 일',
    voiceKo: '콘다오는 때묻지 않은 자연과 희귀한 바다거북 서식지로 유명한 고요하고 신비로운 남부의 섬입니다.',
  },
};

// Korean Cuisines Detail mappings
export interface KoCuisineDetail {
  nameKo: string;
  vietnameseName: string;
  descKo: string;
  tasteKo: string;
  culturalStoryKo: string;
  spotsKo: string[];
}

export const KO_CUISINES: Record<string, KoCuisineDetail> = {
  'pho-vietnam': {
    nameKo: '베트남 전통 쌀국수 (퍼)',
    vietnameseName: 'Phở Bò Gia Truyền',
    descKo: '소 사골을 오랜 시간 우려낸 맑고 깊은 육수에 얇게 썬 양지머리와 쫄깃한 쌀국수 면, 신선한 파와 향채를 곁들인 베트남의 국민 요리.',
    tasteKo: '깊고 담백한 소고기 육수, 은은한 정향과 계피 향, 신선한 라임과 칠리의 깔끔한 매콤함',
    culturalStoryKo: '하노이와 남딘(Nam Định)에서 시작되어 유네스코 인류무형문화유산 추천 및 CNN 선정 세계 최고의 국물 요리.',
    spotsKo: ['하노이 포틴 (Phở Thìn 13 Lò Đúc)', '하노이 포자쭈옌 (Phở Gia Truyền 49 Bát Đàn)', '호치민 포호아 (Phở Hòa Pasteur)'],
  },
  'banh-mi-vietnam': {
    nameKo: '바삭한 베트남 샌드위치 (반미)',
    vietnameseName: 'Bánh Mì Thịt Nguội & Patê',
    descKo: '겉은 바삭하고 속은 부드러운 바게트 속에 수제 돼지고기 파테, 차슈, 아삭한 무·당근 피클, 고수, 칠리소스를 듬뿍 채운 세계적 길거리 음식.',
    tasteKo: '바삭바삭한 빵 식감, 고소하고 묵직한 파테, 새콤달콤한 수제 피클과 신선한 허브의 조화',
    culturalStoryKo: '프랑스 바게트 문화가 베트남 고유의 식재료와 만나 탄생한 동서양 미식 융합의 걸작.',
    spotsKo: ['호이안 반미프엉 (Bánh Mì Phượng)', '호이안 마담칸 (Madam Khánh - The Banh Mi Queen)', '호치민 반미후인호아 (Bánh Mì Huỳnh Hoa)'],
  },
  'bun-cha-hanoi': {
    nameKo: '하노이 숯불 돼지고기 국수 (분짜)',
    vietnameseName: 'Bún Chả Hà Nội',
    descKo: '숯불 향이 가득 밴 삼겹살과 완자를 새콤달콤한 따뜻한 느억맘 소스에 담가, 신선한 쌀국수 분(Bún)과 생채소를 적셔 먹는 하노이 대표 요리.',
    tasteKo: '진한 참숯 구이 불맛, 새콤달콤한 피시소스, 아삭한 파파야 절임과 허브의 환상적 밸런스',
    culturalStoryKo: '2016년 버락 오바마 미국 전 대통령과 셰프 앤서니 부르댕이 하노이 서민 식당에서 함께 맛보며 세계적 돌풍을 일으킨 음식.',
    spotsKo: ['하노이 분짜 흐엉리엔 (Bún Chả Hương Liên - 오바마 분짜)', '하노이 분짜 닥낌 (Bún Chả Đắc Kim - 항만)'],
  },
  'bun-bo-hue': {
    nameKo: '후에 매콤 소고기 쌀국수 (분보후에)',
    vietnameseName: 'Bún Bò Huế Cung Đình',
    descKo: '굵은 원형 쌀국수 면에 소 정강이 살, 돼지 족발, 선지를 넣고 레몬그라스와 새우 페이스트(맘루옥)로 칼칼하고 깊게 끓여낸 중부 후에의 황실 미식.',
    tasteKo: '칼칼하고 얼큰한 국물, 상큼한 레몬그라스 풍미, 깊고 진한 맘루옥(발효 새우장)의 감칠맛',
    culturalStoryKo: '응우옌 왕조의 궁중 요리 기법이 서민 문화와 융합된 음식으로, 강렬하고 화려한 중부 베트남의 맛을 상징.',
    spotsKo: ['후에 분보 무께오 (Bún Bò Mụ Kéo)', '후에 분보 바뚜엣 (Bún Bò Bà Tuyết 47 Nguyễn Công Trứ)'],
  },
  'com-tam-sai-gon': {
    nameKo: '사이공 숯불 갈비 덮밥 (껌땀)',
    vietnameseName: 'Cơm Tấm Sườn Bì Chả Sài Gòn',
    descKo: '도정 과정에서 깨진 쌀알(깨진 쌀)로 지은 고슬고슬한 밥 위에 숯불에 노릇하게 구운 돼지갈비(스언), 돼지껍질 채(비), 달걀찜(차)을 얹은 사이공 소울푸드.',
    tasteKo: '달콤 짭조름한 양념 갈비의 풍미, 고소한 파기름(모한), 새콤달콤한 마늘 칠리 느억맘',
    culturalStoryKo: '남부 농민과 서민 노동자들의 알뜰한 지혜에서 시작되어 지금은 사이공을 대표하는 최고 인기 식사 메뉴로 정착.',
    spotsKo: ['호치민 껌땀 바기엔 (Cơm Tấm Ba Ghiền)', '호치민 껌땀 목 (Cơm Tấm Mộc)'],
  },
  'mi-quang-da-nang': {
    nameKo: '다낭식 비빔 쌀국수 (미꽝)',
    vietnameseName: 'Mì Quảng Tôm Thịt Đà Nẵng',
    descKo: '노란 강황을 넣어 뽑은 넓적한 쌀국수 면에 새우, 돼지고기, 메추리알, 볶은 땅콩, 바삭한 라이스 크래커를 얹고 자작한 육수로 비벼 먹는 다낭 대표 별미.',
    tasteKo: '자작하고 진한 육수의 감칠맛, 바삭하게 씹히는 참깨 라이스페이퍼와 고소한 땅콩',
    culturalStoryKo: '베트남 중부 꽝남(Quảng Nam)과 다낭 사람들의 정감 어린 투박함과 넉넉한 인심이 담긴 향토 요리.',
    spotsKo: ['다낭 미꽝 바무아 (Mì Quảng Bà Mua)', '다낭 미꽝 1A (Mì Quảng 1A Hải Phòng)'],
  },
  'banh-xeo-mientay': {
    nameKo: '메콩 바삭 부침개 (반쎄오)',
    vietnameseName: 'Bánh Xèo Miền Tây Giòn Rụm',
    descKo: '쌀가루와 강황, 코코넛 밀크 반죽을 얇게 부쳐 새우, 돼지고기, 숙주나물을 채운 황금빛 크레페. 신선한 겨자잎과 허브에 싸서 느억맘에 찍어 먹는 요리.',
    tasteKo: '바삭하고 고소한 코코넛 풍미의 크러스트, 육즙 머금은 속 재료와 쌉싸름한 야채의 하모니',
    culturalStoryKo: '남서부 수향 메콩 델타의 풍요로운 농경과 풍성한 식재료를 오감으로 즐길 수 있는 축제 같은 음식.',
    spotsKo: ['호치민 반쎄오 46A (Bánh Xèo 46A Đinh Công Tráng)', '껀터 반쎄오 바이또이 (Bánh Xèo Bảy Tới)'],
  },
  'egg-coffee-hanoi': {
    nameKo: '하노이 에그 커피 (카페 쯩)',
    vietnameseName: 'Cà Phê Trứng Hà Nội',
    descKo: '신선한 계란 노른자와 연유를 곱게 거품 내어 진한 베트남 로부스타 드립 커피 위에 폭신하게 얹은 하노이만의 전설적인 시그니처 음료.',
    tasteKo: '달콤하고 부드러운 커스터드 크림 맛과 쌉싸름하고 묵직한 로부스타 원두의 절묘한 궁합',
    culturalStoryKo: '1946년 우유가 귀하던 시절, 소피텔 레전드 메트로폴 하노이의 바텐더였던 응우옌 반 장(Nguyễn Văn Giảng) 씨가 계란 노른자로 대체하며 창시.',
    spotsKo: ['하노이 카페 장 (Café Giảng - 39 Nguyễn Hữu Huân)', '하노이 카페 딘 (Café Đinh - 13 Đinh Tiên Hoàng)'],
  },
};

// Korean Historical Monuments Detail mappings
export interface KoMonumentDetail {
  nameKo: string;
  vietnameseName: string;
  periodKo: string;
  locationKo: string;
  highlightKo: string;
  historyKo: string;
}

export const KO_MONUMENTS: Record<string, KoMonumentDetail> = {
  'hoang-thanh-thang-long': {
    nameKo: '하노이 탕롱 황성',
    vietnameseName: 'Hoàng Thành Thăng Long',
    periodKo: '리, 쩐, 레, 응우옌 왕조 (1010년~현재)',
    locationKo: '하노이시 바딘구',
    highlightKo: '도안몬(Đoan Môn) 남문, 낀티엔(Kính Thiên) 전각의 용 조각 계단, 유네스코 세계문화유산',
    historyKo: '1010년 리 태조(Lý Thái Tổ) 황제가 수도를 옮긴 이래 13세기 이상 베트남 왕권과 정치의 최고 중심지 역할을 해 온 역사 유적입니다.',
  },
  'lung-cu-flag-tower': {
    nameKo: '하장 룽꾸 깃대 (최북단 영토 상징)',
    vietnameseName: 'Cột Cờ Lũng Cú',
    periodKo: '리 트엉 끼엣 장군 시대부터 현재까지',
    locationKo: '하장성 동반 고원 지질공원',
    highlightKo: '해발 1,470m 정상에 휘날리는 54m² 크기의 대형 베트남 국기 (54개 민족을 상징)',
    historyKo: '베트남 최북단 국경을 지키는 신성한 주권의 상징으로, 54m² 크기의 금성홍기는 54개 형제 민족의 굳건한 단결을 의미합니다.',
  },
  'hue-citadel-complex': {
    nameKo: '후에 황궁 복합 유적군',
    vietnameseName: 'Quần Thể Di Tích Cố Đô Huế',
    periodKo: '응우옌 왕조 (1802년~1945년)',
    locationKo: '트ua티엔후에성 후에시',
    highlightKo: '오문(Ngọ Môn), 태화전(Thái Hòa), 황실 사당 및 웅장한 역대 황제 왕릉군',
    historyKo: '베트남의 마지막 봉건 왕조인 응우옌 왕조의 황궁이자 동양의 전통 풍수지리와 프랑스 군사 요새 바우반 양식이 융합된 건축의 극치입니다.',
  },
  'my-son-sanctuary': {
    nameKo: '미선 참파 사원 유적지',
    vietnameseName: 'Thánh Địa Mỹ Sơn',
    periodKo: '참파 왕국 (4세기~14세기)',
    locationKo: '꽝남성 두이지엔현',
    highlightKo: '모르타르 없이 신비롭게 맞물린 붉은 벽돌 힌두 사원 탑군, 유네스코 세계문화유산',
    historyKo: '고대 참파 왕국 국왕들의 신성한 종교 성지이자 힌두교 시바 신을 모신 유서 깊은 유적으로, 인도의 앙코르와트나 바간에 비견되는 동남아의 보물입니다.',
  },
  'cu-chi-tunnels': {
    nameKo: '구찌 지하 요새 터널',
    vietnameseName: 'Địa Đạo Củ Chi',
    periodKo: '항불·항미 전쟁 (1946년~1975년)',
    locationKo: '호치민시 구찌현',
    highlightKo: '총연장 250km에 이르는 3개 층 지하 거주·전투 시설 (병원, 주방, 지휘소)',
    historyKo: '베트남 인민의 강철 같은 의지와 지혜로 손수 파낸 전설적인 지하 요새로, 연기 없는 주방(호앙껌 주방) 등 독창적인 전시 전술의 현장입니다.',
  },
  'reunification-palace': {
    nameKo: '호치민 독립궁 (통일궁)',
    vietnameseName: 'Dinh Độc Lập (Dinh Thống Nhất)',
    periodKo: '1966년 완공 (건축가 응오 비엣 투 설계)',
    locationKo: '호치민시 1군',
    highlightKo: '동양 철학(길, 구, 주)을 형상화한 현대 모더니즘 건축, 역사적인 지하 벙커',
    historyKo: '1975년 4월 30일 베트남 전역이 평화롭게 통일되는 역사적 순간의 무대였으며, 현재는 베트남의 특별 국가 사적지로 지정되어 있습니다.',
  },
};

// Korean Phrasebook Dictionary
export interface KoPhraseItem {
  korean: string;
  pronunciationKo: string;
  tipKo: string;
}

export const KO_PHRASEBOOK_ITEMS: Record<string, KoPhraseItem> = {
  // Greetings
  'g-1': {
    korean: '안녕하세요!',
    pronunciationKo: '씬 짜오 (Xin chào)',
    tipKo: '하루 중 언제든 사용할 수 있는 가장 기본적이고 정중한 베트남어 인사말입니다.',
  },
  g1: {
    korean: '안녕하세요!',
    pronunciationKo: '씬 짜오 (Xin chào)',
    tipKo: '하루 중 언제든 사용할 수 있는 가장 기본적이고 정중한 베트남어 인사말입니다.',
  },
  'g-2': {
    korean: '대단히 감사합니다!',
    pronunciationKo: '깜 ơn 반 젓 니에우 (Cảm ơn bạn rất nhiều)',
    tipKo: '식사 서빙을 받거나 길 안내, 호텔 서비스를 받을 때 두 손을 모으고 말해보세요.',
  },
  g2: {
    korean: '대단히 감사합니다!',
    pronunciationKo: '깜 ơn 반 젓 니에우 (Cảm ơn bạn rất nhiều)',
    tipKo: '식사 서빙을 받거나 길 안내, 호텔 서비스를 받을 때 두 손을 모으고 말해보세요.',
  },
  'g-3': {
    korean: '실례합니다 / 죄송합니다',
    pronunciationKo: '씬 로이 (Xin lỗi)',
    tipKo: '길을 비켜달라거나 가벼운 실수를 했을 때, 또는 직원의 주의를 환기할 때 씁니다.',
  },
  g3: {
    korean: '실례합니다 / 죄송합니다',
    pronunciationKo: '씬 로이 (Xin lỗi)',
    tipKo: '길을 비켜달라거나 가벼운 실수를 했을 때, 또는 직원의 주의를 환기할 때 씁니다.',
  },
  'g-4': {
    korean: '안녕히 계세요 / 다음에 또 봬요',
    pronunciationKo: '땀 비엣 (Tạm biệt)',
    tipKo: '식당이나 상점을 나설 때, 호텔 체크아웃 시 친근한 미소와 함께 전해보세요.',
  },
  g4: {
    korean: '안녕히 계세요 / 다음에 또 봬요',
    pronunciationKo: '땀 비엣 (Tạm biệt)',
    tipKo: '식당이나 상점을 나설 때, 호텔 체크아웃 시 친근한 미소와 함께 전해보세요.',
  },

  // Dining
  'd-1': {
    korean: '정말 맛있어요! (최고예요!)',
    pronunciationKo: '응온 꾸아! (Ngon quá!)',
    tipKo: '식사 후 요리사나 사장님께 엄지를 치켜세우며 말하면 서비스나 따뜻한 미소를 받습니다.',
  },
  d1: {
    korean: '정말 맛있어요! (최고예요!)',
    pronunciationKo: '응온 꾸아! (Ngon quá!)',
    tipKo: '식사 후 요리사나 사장님께 엄지를 치켜세우며 말하면 서비스나 따뜻한 미소를 받습니다.',
  },
  'd-2': {
    korean: '고추 넣지 마세요 / 안 맵게 해주세요',
    pronunciationKo: '람 ơn 등 쪼 엇 / 콤 까이 녜 (Làm ơn đừng cho ớt / Không cay nhé)',
    tipKo: '매운 칠리를 못 드시는 분이 쌀국수, 분짜, 볶음 요리를 주문할 때 필수 표현입니다.',
  },
  d2: {
    korean: '고추 넣지 마세요 / 안 맵게 해주세요',
    pronunciationKo: '람 ơn 등 쪼 엇 / 콤 까이 녜 (Làm ơn đừng cho ớt / Không cay nhé)',
    tipKo: '매운 칠리를 못 드시는 분이 쌀국수, 분짜, 볶음 요리를 주문할 때 필수 표현입니다.',
  },
  'd-3': {
    korean: '미원(MSG/화학조미료) 넣지 마세요',
    pronunciationKo: '씬 등 쪼 봇 응옷 / 미 찐 (Xin đừng cho bột ngọt / mì chính)',
    tipKo: 'MSG에 민감하거나 알레르기가 있는 분들이 국물 요리나 볶음 요리 주문 시 요청하세요.',
  },
  d3: {
    korean: '미원(MSG/화학조미료) 넣지 마세요',
    pronunciationKo: '씬 등 쪼 봇 응옷 / 미 찐 (Xin đừng cho bột ngọt / mì chính)',
    tipKo: 'MSG에 민감하거나 알레르기가 있는 분들이 국물 요리나 볶음 요리 주문 시 요청하세요.',
  },
  'd-4': {
    korean: '계산해 주세요! (영수증 부탁드립니다)',
    pronunciationKo: '띤 띠엔 줍 또이 / 쪼 또이 타인 또안 (Tính tiền giúp tôi / Cho tôi thanh toán)',
    tipKo: '식사 후 테이블에 앉아 가볍게 손을 들며 말하면 직원이 영수증을 자리로 가져다줍니다.',
  },
  d4: {
    korean: '계산해 주세요! (영수증 부탁드립니다)',
    pronunciationKo: '띤 띠엔 줍 또이 / 쪼 또이 타인 또안 (Tính tiền giúp tôi / Cho tôi thanh toán)',
    tipKo: '식사 후 테이블에 앉아 가볍게 손을 들며 말하면 직원이 영수증을 자리로 가져다줍니다.',
  },
  'd-5': {
    korean: '저는 채식주의자예요 (고기·생선 안 먹어요)',
    pronunciationKo: '또이 안 짜이 (Tôi ăn chay)',
    tipKo: '베트남은 불교 문화로 채식(Chay) 요리가 발달해 있어 육류와 생선이 없는 식사가 가능합니다.',
  },
  d5: {
    korean: '저는 채식주의자예요 (고기·생선 안 먹어요)',
    pronunciationKo: '또이 안 짜이 (Tôi ăn chay)',
    tipKo: '베트남은 불교 문화로 채식(Chay) 요리가 발달해 있어 육류와 생선이 없는 식사가 가능합니다.',
  },

  // Shopping & Bargaining
  's-1': {
    korean: '이거 얼마예요?',
    pronunciationKo: '까이 나이 바오 니에우 띠엔? (Cái này bao nhiêu tiền?)',
    tipKo: '원하는 기념품이나 과일을 손으로 가리키며 가격을 물어볼 때 사용합니다.',
  },
  s1: {
    korean: '이거 얼마예요?',
    pronunciationKo: '까이 나이 바오 니에우 띠엔? (Cái này bao nhiêu tiền?)',
    tipKo: '원하는 기념품이나 과일을 손으로 가리키며 가격을 물어볼 때 사용합니다.',
  },
  's-2': {
    korean: '조금 깎아주실 수 있나요? / 너무 비싸요',
    pronunciationKo: '꼬 벗 못 쭉 드억 콤? / 닷 꾸아 (Có bớt một chút được không? / Đắt quá)',
    tipKo: '전통 시장이나 야시장에서 웃는 얼굴로 유쾌하게 흥정할 때 가장 효과적인 표현입니다.',
  },
  s2: {
    korean: '조금 깎아주실 수 있나요? / 너무 비싸요',
    pronunciationKo: '꼬 벗 못 쭉 드억 콤? / 닷 꾸아 (Có bớt một chút được không? / Đắt quá)',
    tipKo: '전통 시장이나 야시장에서 웃는 얼굴로 유쾌하게 흥정할 때 가장 효과적인 표현입니다.',
  },
  's-3': {
    korean: '이걸로 살게요 (이거 주세요)',
    pronunciationKo: '또이 레이 까이 나이 (Tôi lấy cái này)',
    tipKo: '물건 구매를 최종 결정했을 때 상인에게 명확하게 전달할 수 있습니다.',
  },
  s3: {
    korean: '이걸로 살게요 (이거 주세요)',
    pronunciationKo: '또이 레이 까이 나이 (Tôi lấy cái này)',
    tipKo: '물건 구매를 최종 결정했을 때 상인에게 명확하게 전달할 수 있습니다.',
  },

  // Directions
  'dir-1': {
    korean: '화장실이 어디인가요?',
    pronunciationKo: '냐 베 신 ở 더우? (Nhà vệ sinh ở đâu?)',
    tipKo: '식당, 카페, 박물관, 기차역 등에서 가장 유용하고 긴급한 질문입니다.',
  },
  dir1: {
    korean: '화장실이 어디인가요?',
    pronunciationKo: '냐 베 신 ở 더우? (Nhà vệ sinh ở đâu?)',
    tipKo: '식당, 카페, 박물관, 기차역 등에서 가장 유용하고 긴급한 질문입니다.',
  },
  r1: {
    korean: '화장실이 어디인가요?',
    pronunciationKo: '냐 베 신 ở 더우? (Nhà vệ sinh ở đâu?)',
    tipKo: '식당, 카페, 박물관, 기차역 등에서 가장 유용하고 긴급한 질문입니다.',
  },
  'dir-2': {
    korean: '미터기 켜주세요 (미터기 요금으로 가주세요)',
    pronunciationKo: '람 ơn 밧 동 호 끄억 줍 또이 (Làm ơn bật đồng hồ cước giúp tôi)',
    tipKo: '일반 길거리 택시를 탈 때 바가지요금을 방지하기 위해 출발 전 기사에게 요청하세요.',
  },
  dir2: {
    korean: '미터기 켜주세요 (미터기 요금으로 가주세요)',
    pronunciationKo: '람 ơn 밧 동 호 끄억 줍 또이 (Làm ơn bật đồng hồ cước giúp tôi)',
    tipKo: '일반 길거리 택시를 탈 때 바가지요금을 방지하기 위해 출발 전 기사에게 요청하세요.',
  },
  r2: {
    korean: '미터기 켜주세요 (미터기 요금으로 가주세요)',
    pronunciationKo: '람 ơn 밧 동 호 끄억 줍 또이 (Làm ơn bật đồng hồ cước giúp tôi)',
    tipKo: '일반 길거리 택시를 탈 때 바가지요금을 방지하기 위해 출발 전 기사에게 요청하세요.',
  },
  'dir-3': {
    korean: '이 주소로 가고 싶어요',
    pronunciationKo: '또이 무온 덴 디아 치 나이 (Tôi muốn đến địa chỉ này)',
    tipKo: '스마트폰 화면의 호텔이나 관광지 주소를 보여주며 기사님이나 행인에게 말씀하세요.',
  },
  dir3: {
    korean: '이 주소로 가고 싶어요',
    pronunciationKo: '또이 무온 덴 디아 치 나이 (Tôi muốn đến địa chỉ này)',
    tipKo: '스마트폰 화면의 호텔이나 관광지 주소를 보여주며 기사님이나 행인에게 말씀하세요.',
  },

  // Emergency
  'e-1': {
    korean: '도와주세요! 살려주세요!',
    pronunciationKo: '끄우 또이 버이! / 줍 또이 버이! (Cứu tôi với! / Giúp tôi với!)',
    tipKo: '위급한 상황 발생 시 주변 사람들에게 즉각 도움을 청할 수 있는 긴급 구호 표현입니다.',
  },
  e1: {
    korean: '도와주세요! 살려주세요!',
    pronunciationKo: '끄우 또이 버이! / 줍 또이 버이! (Cứu tôi với! / Giúp tôi với!)',
    tipKo: '위급한 상황 발생 시 주변 사람들에게 즉각 도움을 청할 수 있는 긴급 구호 표현입니다.',
  },
  'e-2': {
    korean: '의사 / 병원이 필요해요',
    pronunciationKo: '또이 껀 박 시 / 벤 비엔 (Tôi cần bác sĩ / bệnh viện)',
    tipKo: '몸이 갑자기 아프거나 부상을 입었을 때 호텔 프런트나 주변에 알리며 도움을 청하세요.',
  },
  e2: {
    korean: '의사 / 병원이 필요해요',
    pronunciationKo: '또이 껀 박 시 / 벤 비엔 (Tôi cần bác sĩ / bệnh viện)',
    tipKo: '몸이 갑자기 아프거나 부상을 입었을 때 호텔 프런트나 주변에 알리며 도움을 청하세요.',
  },
  'e-3': {
    korean: '경찰(113)을 불러주세요',
    pronunciationKo: '람 ơn 고이 꽁 안 줍 또이 (Làm ơn gọi công an giúp tôi)',
    tipKo: '도난, 분실, 사고 등 긴급 치안 상황 시 주변에 요청하세요 (베트남 경찰 긴급전화: 113).',
  },
  e3: {
    korean: '경찰(113)을 불러주세요',
    pronunciationKo: '람 ơn 고이 꽁 안 줍 또이 (Làm ơn gọi công an giúp tôi)',
    tipKo: '도난, 분실, 사고 등 긴급 치안 상황 시 주변에 요청하세요 (베트남 경찰 긴급전화: 113).',
  },
};

// Travel Services Korean localization dictionary
export interface KoServiceDetail {
  nameKo: string;
  descKo: string;
  priceRangeKo: string;
  advantagesKo: string[];
  tipsKo: string;
}

export const KO_SERVICES: Record<string, KoServiceDetail> = {
  airline: {
    nameKo: '국내선 항공편 (Domestic Flights)',
    descKo: '하노이, 다낭, 호치민, 나트랑, 푸꾸옥, 후에, 껀터 등 대도시 및 휴양지를 가장 빠르고 편리하게 연결하는 핵심 교통수단.',
    priceRangeKo: '편도 약 35,000 ~ 140,000원 (시즌 및 항공사에 따라 상이)',
    advantagesKo: ['이동 시간 대폭 절약 (비행 1~2시간 소요)', '매일 수십 편의 다양한 운항 스케줄', '글로벌 수준의 기내 서비스'],
    tipsKo: '성수기(6~8월 여름 휴가철 및 뗏 구정 연휴)에는 2~4주 전 사전 예약 필수. 추천 항공사: 베트남항공(Vietnam Airlines, 국책 4성 항공사), 밤부항공(Bamboo Airways), 비엣젯(Vietjet Air).',
  },
  train: {
    nameKo: '남북 통일 급행열차 (통일호 열차)',
    descKo: '베트남의 수려한 풍광을 감상할 수 있는 낭만 기차 여행. 특히 다낭과 후에 사이 하이반 고개 절벽을 따라 에메랄드빛 해안선을 달리는 구간이 압권입니다.',
    priceRangeKo: '약 22,000 ~ 78,000원 (에어컨 소프트 좌석 또는 4인실 고급 침대칸)',
    advantagesKo: ['베트남 시골 마을과 수려한 바다 풍경 파노라마 감상', '안전하고 아늑한 침대칸 이동', '향수와 정취가 가득한 문화 체험'],
    tipsKo: '4인 1실 고급 에어컨 침대칸(Lotus 또는 Violette VIP 침대칸 권장)을 추천합니다. 베트남 철도청(DSVN) 공식 시스템이나 앱에서 직접 예매할 수 있습니다.',
  },
  limousine: {
    nameKo: 'VIP 리무진 & 관광 버스',
    descKo: '안마 의자, USB 충전 포트, 무료 Wi-Fi가 완비된 9~11인승 고급 가죽 시트 리무진 버스. 하노이-사파, 하노이-닌빈, 호치민-무이네, 호치민-달랏 구간 운행.',
    priceRangeKo: '편도 약 8,500 ~ 25,000원',
    advantagesKo: ['호텔 앞 도어 투 도어(Door-to-door) 픽업 및 샌딩', '편안하게 젖혀지는 안락한 우등 리클라이닝 좌석', '정시 출발 및 안전 운행'],
    tipsKo: '복잡한 시외버스터미널에 갈 필요 없이 시내 호텔 로비에서 바로 탑승할 수 있어 해외 여행자들에게 가장 추천하는 교통수단입니다.',
  },
  'motorbike-rental': {
    nameKo: '오토바이 & 스쿠터 렌탈',
    descKo: '골목 구석구석, 마피렝 고개의 장엄한 협곡, 한적한 시골길을 나만의 속도로 자유롭게 탐험하는 여행자들의 인기 수단.',
    priceRangeKo: '일일 약 6,500 ~ 14,000원 (수동 또는 자동 스쿠터)',
    advantagesKo: ['자유로운 일정과 이동 편의성', '매우 저렴한 대여료와 연료비', '현지인의 삶을 가장 가까이서 체감'],
    tipsKo: '국제운전면허증 지참 필수. 헬멧 착용은 법적 의무이며, 하장 루프나 고산 지대를 달릴 때는 기어가 있는 세미오토나 클러치 차량이 안전합니다.',
  },
  'luxury-resort': {
    nameKo: '5성급 럭셔리 리조트 & 해변 호텔',
    descKo: '다낭, 나트랑, 푸꾸옥, 하롱베이 등 세계적인 해변 휴양지에 위치한 인터내셔널 5성급 럭셔리 휴양 시설.',
    priceRangeKo: '1박당 약 110,000 ~ 550,000원 이상',
    advantagesKo: ['인피니티 풀, 전용 프라이빗 비치 및 럭셔리 스파', '세계 각국 미식 뷔페 및 웰컴 서비스', '키즈 클럽과 패밀리 액티비티'],
    tipsKo: 'Traveloka 앱에서 항공권과 함께 콤보로 예약하면 최대 30% 추가 할인 혜택을 받을 수 있습니다.',
  },
  'boutique-hotel': {
    nameKo: '부티크 호텔 & 도심 헤리티지 숙소',
    descKo: '하노이 올드쿼터나 호치민 1군 등 주요 관광지 중심에 위치해 도보 관광에 최적화된 감각적인 디자인 호텔.',
    priceRangeKo: '1박당 약 35,000 ~ 110,000원',
    advantagesKo: ['관광 명소, 카페, 맛집 도보 5분 거리', '인도차이나 프렌치 풍의 개성 넘치는 인테리어', '친절한 맞춤형 컨시어지 서비스'],
    tipsKo: '도심 소음이 신경 쓰이신다면 예약 시 안쪽 조용한 방(Quiet room with window)을 요청하시는 것이 좋습니다.',
  },
  'community-homestay': {
    nameKo: '소수민족 전통 홈스테이 & 에코 롯지',
    descKo: '사파 므엉호아 계곡, 마이쩌우, 하장 등 소수민족 마을의 전통 고상가옥(목조 수상가옥)에서 현지인 가족과 함께 머무는 생태 문화 체험.',
    priceRangeKo: '1박당 약 12,000 ~ 45,000원 (가족 정식 식사 포함)',
    advantagesKo: ['소수민족의 고유한 생활 양식과 따뜻한 정을 체감', '현지 농가에서 직접 차린 유기농 집밥 식사', '때묻지 않은 자연 속의 힐링'],
    tipsKo: '현지 문화를 존중하여 가옥의 사당이나 제단에 함부로 손대지 않고, 현지 주민의 사진을 찍을 때는 먼저 정중하게 양해를 구하세요.',
  },
  'heritage-villa': {
    nameKo: '역사 헤리티지 빌라 & 전통 고택',
    descKo: '후에 왕실 정원 가옥(Nhà Rường)이나 달랏의 프랑스 고전풍 빌라에서 즐기는 유서 깊은 고품격 하룻밤.',
    priceRangeKo: '1박당 약 45,000 ~ 160,000원',
    advantagesKo: ['수백 년 역사가 숨 쉬는 고풍스러운 목조 건축', '고즈넉한 정원과 프라이빗한 힐링 분위기', '황실 스타일의 다도 및 조식 서비스'],
    tipsKo: '방 수가 적어 조기 마감되므로 특별한 기념일 여행이라면 1~2개월 전 사전 예약을 권장합니다.',
  },
};

// Travel Styles Korean localization dictionary
export interface KoStyleDetail {
  titleKo: string;
  descKo: string;
  suitableForKo: string;
  prosKo: string[];
  consKo: string[];
  adviceKo: string;
}

export const KO_STYLES: Record<string, KoStyleDetail> = {
  'self-guided': {
    titleKo: '자유 배낭여행 (자율 탐방)',
    descKo: '정해진 틀 없이 스마트폰 지도와 현지 정보를 활용하여 본인이 원하는 속도와 동선대로 자유롭게 누비는 여행 방식.',
    suitableForKo: '젊은 배낭여행자, 혼행족(솔로 트래블러), 모험을 즐기는 청년층',
    prosKo: ['완벽한 일정 자유도 (머물고 싶은 만큼 머무름)', '예산에 맞춘 유연한 지출 관리', '현지인들과의 즉흥적인 교류와 발견의 기쁨'],
    consKo: ['사전 조사와 티켓/교통편 예약에 시간이 소요됨', '돌발 상황 발생 시 직접 해결해야 함'],
    adviceKo: 'VIETNAM’S TRAVEL 앱의 회화 사전과 오디오 지도를 함께 활용하시면 현지어 소통과 길 찾기가 훨씬 쉬워집니다.',
  },
  'package-tour': {
    titleKo: '올인클루시브 패키지 투어',
    descKo: '전용 차량, 전문 가이드, 식사, 호텔, 관광지 입장권이 모두 포함되어 편안하고 안전하게 즐기는 종합 단체 관광.',
    suitableForKo: '가족 여행객, 부모님 효도 관광, 언어 소통이 부담스러운 첫 방문자',
    prosKo: ['완벽한 안전과 일정 관리 (신경 쓸 필요 없음)', '한국어/영어 전문 가이드의 풍부한 역사 해설', '대형 버스로 무더위에도 쾌적한 이동'],
    consKo: ['단체 일정으로 인해 개인 자유 시간이 제한적임', '정해진 식당과 쇼핑 센터 방문 코스가 포함될 수 있음'],
    adviceKo: '하롱베이 1박 2일 크루즈나 후에-다낭-호이안 핵심 코스는 패키지 투어를 이용하시면 가성비와 편의성이 뛰어납니다.',
  },
  'private-custom': {
    titleKo: '단독 맞춤 프라이빗 투어',
    descKo: '우리 가족 또는 일행만을 위한 단독 차량과 맞춤 전담 가이드가 배정되어 취향에 맞춰 자유롭게 일정을 조정하는 프리미엄 여행.',
    suitableForKo: '프라이버시를 중시하는 가족, 소규모 지인 모임, 신혼여행 부부',
    prosKo: ['우리 일행만의 전용 프라이빗 차량 및 가이드', '원하는 곳에서 언제든 쉬어가고 시간 조율 가능', '고급 호텔 및 최고급 로컬 맛집 선택 가능'],
    consKo: ['일반 패키지 투어에 비해 1인당 비용이 다소 높음'],
    adviceKo: '아이를 동반하거나 연로하신 부모님과 함께하는 여행이라면 가장 만족도가 높은 추천 여행 방식입니다.',
  },
  'cultural-community': {
    titleKo: '생태 & 소수민족 커뮤니티 투어 (공정여행)',
    descKo: '고산 지대 소수민족 마을을 방문해 전통 직조, 천연 염색, 농사 체험을 하고 현지 공동체에 경제적 혜택을 환원하는 착한 문화 여행.',
    suitableForKo: '문화 인류학에 관심 있는 여행자, 생태 트레커, 교육 여행 가족',
    prosKo: ['54개 민족의 고유한 전통문화를 가장 깊이 있게 체감', '지속 가능한 생태 관광 및 현지 소수민족 공동체 후원', '잊지 못할 순수한 환대와 감동 체험'],
    consKo: ['고산 지대 트레킹으로 일정 수준의 체력이 요구됨', '현지 편의시설이 현대식 호텔보다 소박할 수 있음'],
    adviceKo: '사파 므엉호아 계곡 트레킹이나 하장 동반 고원 지질공원 투어에서 현지 소수민족 가이드와 함께 걸어보세요.',
  },
};

// Traveloka Hotels Korean localization dictionary
export interface KoHotelDetail {
  nameKo: string;
  cityNameKo: string;
  badgeKo: string;
  addressKo: string;
  featuresKo: string[];
}

export const KO_HOTELS: Record<string, KoHotelDetail> = {
  silk_sense_hoian: {
    nameKo: '실크 센스 호이안 리버 리조트 & 스파',
    cityNameKo: '호이안',
    badgeKo: '강변 친환경 5성급 리조트',
    addressKo: '꽝남성 호이안시 깜안 레탄똥 거리',
    featuresKo: [
      '꼬꼬강(Co Co River) 전망의 미네랄 인피니티 풀',
      '유기농 농장에서 직접 공수한 친환경 조식 뷔페',
      '호이안 구시가지(올드타운) 무료 자전거 & 셔틀버스 제공',
    ],
  },
  intercon_phuquoc: {
    nameKo: '인터컨티넨탈 푸꾸옥 롱비치 리조트',
    cityNameKo: '푸꾸옥',
    badgeKo: '럭셔리 5성급 국제 리조트',
    addressKo: '끼엔장성 푸꾸옥시 즈엉떠 롱비치',
    featuresKo: [
      '황홀한 일몰을 자랑하는 프라이빗 화이트 샌드 비치',
      '푸꾸옥에서 가장 높은 19층 루프탑 스카이 바 INK 360',
      '국제 표준 어린이 플래닛 트레커스 키즈클럽',
    ],
  },
  furama_danang: {
    nameKo: '푸라마 리조트 다낭',
    cityNameKo: '다낭',
    badgeKo: '미케 비치 오션프런트 5성급',
    addressKo: '다낭시 응우한선 보응우옌잡 105',
    featuresKo: [
      '미케 해변 바로 앞 베트남 최초의 미식 유산 럭셔리 리조트',
      '야자수 숲으로 둘러싸인 이국적인 열대 라군 수영장',
      '스쿠버 다이빙 및 수상 스포츠 전문 프로그램 운영',
    ],
  },
  topas_ecolodge_sapa: {
    nameKo: '토파스 에코로지 사파',
    cityNameKo: '사파',
    badgeKo: '구름 위 인피니티 온수풀',
    addressKo: '라오까이성 사파 타인빈 렛 마을',
    featuresKo: [
      '므엉호아 계곡과 계단식 논이 한눈에 내려다보이는 화강암 방갈로',
      '구름 바다 위에 떠 있는 사계절 온수 인피니티 풀',
      '레드 자오(Red Dao) 족 전통 허브 온수 목욕 스파 체험',
    ],
  },
  vinpearl_nhatrang: {
    nameKo: '빈펄 리조트 & 스파 나트랑 베이',
    cityNameKo: '나트랑',
    badgeKo: '혼트레섬 프리미엄 아일랜드 리조트',
    addressKo: '카인호아성 나트랑시 빈응우옌 혼트레섬',
    featuresKo: [
      '나트랑만을 한눈에 품은 우아한 곡선형 파노라마 객실',
      '24시간 무료 해상 케이블카 및 초고속 스피드보트 셔틀',
      '빈원더스(VinWonders) 테마파크 및 워터파크 직결',
    ],
  },
  la_siesta_hanoi: {
    nameKo: '라 시에스타 클래식 마마이 호텔 하노이',
    cityNameKo: '하노이',
    badgeKo: '호안끼엠 구시가지 심장부',
    addressKo: '하노이시 호안끼엠 항부옴 마마이 94',
    featuresKo: [
      '하노이 올드쿼터 중심의 감각적인 인도차이나 부티크 인테리어',
      '호안끼엠 호수 및 야시장까지 도보 3분 최고의 접근성',
      '트립어드바이저 선정 베트남 최고 평점의 친절한 호스피탈리티',
    ],
  },
  dalat_edensee: {
    nameKo: '달랏 에덴시 레이크 리조트 & 스파',
    cityNameKo: '달랏',
    badgeKo: '호숫가 소나무 숲 유럽풍 빌라',
    addressKo: '람동성 달랏시 뚜옌람 호수 VII.2 구역',
    featuresKo: [
      '청정 소나무 숲에 둘러싸인 정통 유럽 바이에른 양식 빌라 단지',
      '물안개 피어오르는 뚜옌람 호수의 로맨틱한 파노라마 뷰',
      '미니 골프, 카약 래프팅, 양궁 및 산림욕 트레킹 코스',
    ],
  },
  muong_thanh_halong: {
    nameKo: '무엉탄 럭셔리 하롱 센터 호텔',
    cityNameKo: '하롱 / 꽝닌',
    badgeKo: '하롱베이 유산 뷰 5성급 호텔',
    addressKo: '꽝닌성 하롱시 바이짜이 2구역',
    featuresKo: [
      '바이짜이 관광 중심지에 위치한 웅장한 5성급 랜드마크 호텔',
      '객실 창밖으로 펼쳐지는 세계자연유산 하롱베이 기암괴석 뷰',
      '야외 인피니티 풀, 피트니스 및 히말라야 암염 스파 완비',
    ],
  },
};

// Traveloka Promos Korean localization
export const KO_PROMOS: Record<string, { titleKo: string; discountKo: string }> = {
  BAYVIETNAM50K: {
    titleKo: '베트남 국내선 항공권 즉시 할인',
    discountKo: '베트남항공, 비엣젯, 뱀부항공 전 노선 50,000동 할인',
  },
  HOTELTRAVELOKA15: {
    titleKo: '전국 63개 성·시 호텔 & 리조트 할인',
    discountKo: '호텔, 리조트, 홈스테이 예약 시 최대 15% (300,000동) 할인',
  },
  COMBOTRAVEL30: {
    titleKo: '항공권 + 호텔 결합 콤보 특별 할인',
    discountKo: '항공과 숙소를 함께 예약 시 25% ~ 30% 추가 절약',
  },
  XPERIENCEFUN20: {
    titleKo: '테마파크 입장권 & 액티비티 할인',
    discountKo: '바나힐, 빈원더스, 판시판 케이블카 등 최대 100,000동 할인',
  },
};

// 54 Ethnic Groups Korean Signatures dictionary - All 54 ethnic groups
export const KO_ETHNIC_SIGNATURES: Record<string, { costumeKo: string; architectureKo: string; festivalKo: string }> = Object.fromEntries(
  Object.entries(KO_54_ETHNIC_GROUPS).map(([id, item]) => [
    id,
    {
      costumeKo: item.costumeKo,
      architectureKo: item.architectureKo,
      festivalKo: item.festivalKo,
    },
  ])
);

// Itinerary Plan Localization Dictionaries
export interface ItineraryDayTranslation {
  destination: string;
  highlights: string[];
  morning: string;
  afternoon: string;
  evening: string;
  transport: string;
  stay: string;
}

export interface ItineraryPlanTranslation {
  title: string;
  overview: string;
  budgetLevel: string;
  days: Record<number, ItineraryDayTranslation>;
}

export const KO_ITINERARIES: Record<string, ItineraryPlanTranslation> = {
  'itinerary-3days-hanoi-ninhbinh': {
    title: '3일 추천 코스: 고풍스러운 하노이 & 신비로운 짱안·하롱베이',
    overview: '천년의 역사를 간직한 수도 하노이의 문화와 유네스코 세계유산 짱안, 하롱베이의 수려한 비경을 만끽하는 알찬 단기 여행 코스입니다.',
    budgetLevel: '스탠다드',
    days: {
      1: {
        destination: '천년 고도 하노이 수도',
        highlights: ['호안끼엠 호수', '응옥선 사당', '36개 구시가지 골목', '하노이 오페라 하우스'],
        morning: '따끈한 정통 밧단 쌀국수(Pho Bat Dan)를 맛보고, 붉은 테훅 다리와 고즈넉한 거북탑이 있는 호안끼엠 호수를 산책합니다.',
        afternoon: '베트남 최초의 국립대학인 문묘-국자감을 참배하고, 부드럽고 달콤한 전통 에그 커피(Ca Phe Trung)를 음미합니다.',
        evening: '구시가지 야시장을 구경하고 숯불 향이 가득한 분짜(Bun Cha)를 즐기며 하노이의 낭만적인 밤거리를 거닙니다.',
        transport: '도보, 2층 시티투어 버스(Hop-on Hop-off) 또는 Grab 택시',
        stay: '하노이 구시가지 부티크 호텔 (1박 약 60만 VND)',
      },
      2: {
        destination: '하노이 - 하롱베이 크루즈',
        highlights: ['하롱베이 럭셔리 크루즈', '승솟(Sung Sot) 동굴', '에메랄드빛 카약 체험'],
        morning: 'VIP 리무진을 타고 하롱베이로 이동(약 2.5시간). 럭셔리 크루즈에 탑승하여 체크인 후 신선한 해산물 뷔페를 즐깁니다.',
        afternoon: '수천 개의 신비로운 종유석이 빛나는 승솟 동굴을 탐험하고, 잔잔한 석호에서 카약을 타며 기암괴석을 가까이서 감상합니다.',
        evening: '갑판에서 즐기는 선셋 칵테일 파티와 밤 오징어 낚시 체험 후 유네스코 세계유산 한가운데서 평화로운 밤을 보냅니다.',
        transport: 'VIP 리무진 버스 + 4성급 하롱베이 크루즈',
        stay: '크루즈 프라이빗 발코니 오션뷰 선실 (1인 1박 약 160만 VND)',
      },
      3: {
        destination: '하롱베이 - 닌빈 짱안 - 귀국',
        highlights: ['짱안 바이딘 사원', '항무아(Hang Mua) 전망대', '땀꼭 연꽃 연못'],
        morning: '갑판 위에서 태극권을 하며 일출을 맞이하고, 조식 후 육지의 하롱베이라 불리는 닌빈으로 이동합니다.',
        afternoon: '나룻배를 타고 9개 석회암 동굴을 지나는 짱안 뱃놀이를 즐긴 뒤, 항무아 486개 계단을 올라 황금빛 논밭 파노라마를 감상합니다.',
        evening: '닌빈 전통 염소 고기와 바삭한 껌짜이(누룽지) 특식을 맛보고 노이바이 공항으로 이동하여 여정을 마무리합니다.',
        transport: '닌빈-공항 전용 리무진',
        stay: '일정 종료 / 밤 비행기 귀국',
      },
    },
  },
  'itinerary-5days-central-heritage': {
    title: '5일 추천 코스: 베트남 중부 유네스코 세계유산 길 (후에 - 다낭 - 호이안)',
    overview: '응우옌 왕조의 숨결이 깃든 고도 후에, 화려한 해양 휴양도시 다낭, 등불이 낭만적인 천년 무역항 호이안을 잇는 베트남 최고의 인기 유산 루트입니다.',
    budgetLevel: '스탠다드',
    days: {
      1: {
        destination: '천년 역사의 고도 후에 (Hue)',
        highlights: ['후에 황궁(대내)', '티엔무 사원', '정통 분보후에'],
        morning: '푸바이 공항 도착 후 레몬그라스 향이 은은하고 칼칼한 후에식 쌀국수 분보후에(Bun Bo Hue)를 즐깁니다.',
        afternoon: '베트남 마지막 왕조의 위엄이 서린 후에 황성(대내)과 자금성을 거닐고, 시적인 뜨득 황제릉을 방문합니다.',
        evening: '향강(흐엉강)에서 전통 용선을 타고 소원 연등을 띄우며 감미로운 후에 전통 궁중 음악을 감상합니다.',
        transport: '택시 / 공항 픽업 샌딩 차량',
        stay: '후에 시내 흐엉강변 호텔',
      },
      2: {
        destination: '후에 - 하이반 고개 - 다낭 해변',
        highlights: ['천하제일 웅관 하이반 패스', '미케 비치', '용다리 야경 불쇼'],
        morning: '세계적인 드라이브 코스인 하이반 고개를 넘어 에메랄드빛 랑꼬만을 파노라마로 조망합니다.',
        afternoon: '세계 6대 해변으로 꼽히는 다낭 미케 비치의 고운 백사장에서 해수욕과 신선한 중부 해산물을 맛봅니다.',
        evening: '주말 21시에 펼쳐지는 다낭 용다리(Cau Rong)의 웅장한 불·물 쇼를 감상하고 사랑의 다리를 산책합니다.',
        transport: '프라이빗 렌터카 / 관광 리무진',
        stay: '다낭 미케 해변가 4성급 오션뷰 호텔',
      },
      3: {
        destination: '바나힐 테마파크 - 거인의 골든브릿지',
        highlights: ['바나힐 케이블카', '신의 손 골든브릿지', '프랑스 마을'],
        morning: '세계 최장 케이블카를 타고 해발 1,487m 바나힐에 올라 안개 낀 거인의 손 골든브릿지에서 인생 사진을 남깁니다.',
        afternoon: '고풍스러운 프랑스 마을과 100년 역사의 디베 와인 창고, 판타지 파크 실내 놀이시설을 즐깁니다.',
        evening: '케이블카를 타고 하산하여 다낭에서 30km 떨어진 천년의 유네스코 고도 호이안으로 이동합니다.',
        transport: '바나힐 전용 셔틀버스',
        stay: '호이안 올드타운 근교 가든 홈스테이',
      },
      4: {
        destination: '유네스코 세계문화유산 호이안 고도시',
        highlights: ['내원교(일본다리)', '떤끼 고택', '투본강 소원배 연등 띄우기', '반미 프엉'],
        morning: '노란 벽과 부겐빌레아 꽃이 드리운 호이안 골목길을 자전거로 달리며 여유롭게 베트남식 연유 커피를 마십니다.',
        afternoon: '전통 비단 등불 만들기 체험을 하고, 바삭한 반미와 쫄깃한 로컬 면 요리 까오러우(Cao Lau)를 즐깁니다.',
        evening: '수천 개의 오색 등불이 반짝이는 야시장을 구경하고 투본강에서 나룻배를 타고 소원등을 띄웁니다.',
        transport: '자전거 / 도보 산책',
        stay: '호이안 투본강변 부티크 리조트',
      },
      5: {
        destination: '호이안 코코넛 숲 - 다낭 공항 귀국',
        highlights: ['바구니배(투옌퉁) 스핀 쇼', '호이안 실크·기념품 쇼핑', '다낭 국제공항'],
        morning: '바이마우(Bay Mau) 워터 코코넛 숲에서 베트남 전통 둥근 바구니배를 타고 사공들의 신나는 회전 묘기를 관람합니다.',
        afternoon: '호이안 특산 녹두과자와 수제 비단 스카프를 구입한 뒤, 다낭 국제공항으로 이동합니다.',
        evening: '따뜻한 추억을 가득 안고 밤 비행기로 귀국길에 오릅니다.',
        transport: '공항 샌딩 전용 차량',
        stay: '귀국 항공편',
      },
    },
  },
  'itinerary-10days-grand-vietnam': {
    title: '10~14일 추천 코스: 베트남 종단 그랜드 투어 (북부 - 중부 - 남부 - 푸꾸옥)',
    overview: '웅장한 북부 고산 지대와 수도 하노이, 세계유산 중부 유적지, 활기찬 남부 메콩 델타와 에메랄드빛 낙원 푸꾸옥 섬까지 베트남 전역을 총망라하는 대서사 여정입니다.',
    budgetLevel: '프리미엄 럭셔리',
    days: {
      1: {
        destination: '하노이 - 베트남의 따뜻한 환영',
        highlights: ['호안끼엠 호수', '구시가지 36골목', '문묘-국자감'],
        morning: '하노이 노이바이 국제공항 도착 후 시내 중심 고급 프랑스 식민지풍 호텔로 이동 및 체크인.',
        afternoon: '탕롱 황성과 한기둥 사원을 산책하며 천년 역사의 수도 정취를 느낍니다.',
        evening: '미슐랭 빕구르망 쌀국수와 전통 가물치 구이 짜까라봉(Cha Ca La Vong)으로 환영 만찬을 즐깁니다.',
        transport: '전용 프리미엄 리무진',
        stay: '하노이 5성급 럭셔리 호텔',
      },
      2: {
        destination: '하노이 - 사파(Sa Pa) 안개 고원',
        highlights: ['깟깟(Cat Cat) 마을', '블랙 흐몽족 문화', '므엉호아 계곡'],
        morning: '사파행 럭셔리 특급 관광열차 또는 리무진을 타고 안개 낀 고원 산악 마을로 이동합니다.',
        afternoon: '흐몽족의 터전인 깟깟 마을을 트레킹하며 천연 쪽빛 염색과 삼베 전통 직조를 체험합니다.',
        evening: '사파 특산 연어 전골과 말린 물소고기 구이를 맛보며 고산족 전통 민속 춤 공연을 감상합니다.',
        transport: '특급 관광 열차 / VIP 리무진',
        stay: '계단식 논이 내려다보이는 친환경 생태 리조트',
      },
      3: {
        destination: '인도차이나의 지붕 판시판 정복',
        highlights: ['판시판 케이블카', '해발 3,143m 정상 국기대', '김선보승사'],
        morning: '세계 최고 수준의 판시판 케이블카를 타고 3,143m 정상에 올라 웅장한 운해(구름 바다)를 조망합니다.',
        afternoon: '은폭포(Thac Bac)와 베트남 4대 고개 중 하나인 오꾸이호(O Quy Ho) 하늘문에서 붉은 노을을 감상합니다.',
        evening: '하노이로 복귀하여 다음 날 해양 크루즈 여정을 준비합니다.',
        transport: '케이블카 + 전용 차량',
        stay: '하노이 인터내셔널 호텔',
      },
      4: {
        destination: '세계자연유산 하롱베이 럭셔리 1박',
        highlights: ['5성급 크루즈 숙박', '승솟 종유석 동굴', '티톱섬 전망대'],
        morning: '전용 차량으로 투안차우 선착장으로 이동해 5성급 럭셔리 크루즈에 승선합니다.',
        afternoon: '기암괴석 사이로 카약을 즐기고, 티톱섬 정상에 올라 하롱베이 360도 파노라마를 감상합니다.',
        evening: '선상 해산물 만찬과 재즈 라이브 음악을 즐기며 별빛 아래 유네스코 바다에서 휴식합니다.',
        transport: '5성급 럭셔리 크루즈선',
        stay: '하롱베이 크루즈 스위트룸',
      },
      5: {
        destination: '하롱베이 - 중부 고도 후에로 국내선 이동',
        highlights: ['바이뜨롱만 일출', '국내선 항공 이동', '후에 향강'],
        morning: '갑판 위에서 바다 일출을 맞이하며 브런치를 즐긴 뒤 깟비 공항에서 후에행 국내선에 탑승합니다.',
        afternoon: '후에 리조트에 체크인하고 석양이 아름다운 티엔무 사원을 참배합니다.',
        evening: '궁중 요리의 진수를 보여주는 봉황과 공작 장식의 정통 후에 궁중 만찬을 체험합니다.',
        transport: '국내선 항공편 + 전용차량',
        stay: '후에 흐엉강변 헤리티지 리조트',
      },
      6: {
        destination: '후에 황궁 - 하이반 고개 - 호이안',
        highlights: ['후에 황궁', '하이반 패스', '호이안 올드타운'],
        morning: '응우옌 왕조 13대 황제의 역사가 서린 웅장한 후에 대내(황궁)를 전문 가이드와 탐방합니다.',
        afternoon: '하이반 고개를 넘어 동화 같은 노란 벽의 고도시 호이안으로 이동합니다.',
        evening: '투본강 소원배를 타고 등불을 띄운 뒤, 대규모 야외 실경 공연 "호이안 메모리즈"를 관람합니다.',
        transport: '전용 관광 리무진',
        stay: '호이안 부티크 리조트',
      },
      7: {
        destination: '호이안 - 활력의 경제수도 호치민(사이공)',
        highlights: ['다낭 국제공항', '통일궁', '사이공 노트르담 대성당'],
        morning: '호이안의 여유로운 아침을 즐긴 뒤 다낭 공항에서 호치민시로 비행합니다.',
        afternoon: '통일궁(독립궁), 중앙우체국, 사이공 오페라 하우스 등 프랑스 식민지풍 건축물을 둘러봅니다.',
        evening: '화려한 사이공 스카이라인을 360도로 조망할 수 있는 루프탑 바에서 칵테일을 즐깁니다.',
        transport: '베트남항공 국내선 + 전용차량',
        stay: '호치민 1군 5성급 랜드마크 호텔',
      },
      8: {
        destination: '구찌 터널 & 풍요로운 메콩 델타',
        highlights: ['구찌 지하 터널', '메콩 삼각주 나룻배', '남부 민속 음악 던까따이뜨'],
        morning: '지하 3층 구조의 놀라운 역사 유적인 구찌 터널을 방문해 역사적 회복력을 체감합니다.',
        afternoon: '과일이 풍성한 메콩강 띠엔장성으로 이동해 삼판(나룻배)을 타고 야자수 수로를 탐험합니다.',
        evening: '메콩의 중심 껀터(Can Tho)로 이동해 낭만적인 닌끼에우(Ninh Kieu) 부두 야경을 산책합니다.',
        transport: '전용 투어 차량',
        stay: '껀터 닌끼에우 4성급 호텔',
      },
      9: {
        destination: '까이랑 수상시장 - 낙원의 섬 푸꾸옥',
        highlights: ['까이랑 수상시장', '열대 과일 농장', '에메랄드빛 푸꾸옥 섬'],
        morning: '수백 척의 목선이 과일과 채소를 거래하는 활기찬 까이랑 수상시장을 이른 아침 방문합니다.',
        afternoon: '껀터 공항에서 진주빛 바다 푸꾸옥 섬으로 비행하여 비치프런트 리조트에 체크인합니다.',
        evening: '바닷바람을 맞으며 함닌(Ham Ninh) 어촌의 신선한 꽃게와 해산물 바비큐 파티를 즐깁니다.',
        transport: '수상시장 전용선 + 국내선 비행기',
        stay: '푸꾸옥 프라이빗 비치프런트 리조트',
      },
      10: {
        destination: '푸꾸옥 해양 힐링 & 베트남 작별',
        highlights: ['사오 비치(Sao Beach)', '혼똔섬 해상 케이블카', '전통 후추 & 피시소스 기념품'],
        morning: '눈처럼 흰 백사장과 잔잔한 투명 바다 사오 비치에서 스노클링과 휴식을 만끽합니다.',
        afternoon: '유명한 푸꾸옥 전통 피시소스(느억맘) 공장과 알싸한 후추 농장을 방문해 선물을 쇼핑합니다.',
        evening: '푸꾸옥 국제공항으로 이동하여 베트남 전역을 아우른 잊지 못할 대장정을 마무리합니다.',
        transport: '리조트 공항 샌딩 차량',
        stay: '귀국 국제선 항공편',
      },
    },
  },
};

export const EN_ITINERARIES: Record<string, ItineraryPlanTranslation> = {
  'itinerary-3days-hanoi-ninhbinh': {
    title: '3-Day Classic: Timeless Hanoi, Scenic Trang An & Ha Long Bay',
    overview: 'The ideal short escape uncovering the millennial culture of Hanoi capital and the breathtaking limestone karst scenery of Trang An and Ha Long Bay.',
    budgetLevel: 'Standard',
    days: {
      1: {
        destination: 'Hanoi Capital City',
        highlights: ['Hoan Kiem Lake', 'Ngoc Son Temple', 'Old Quarter 36 Streets', 'Opera House'],
        morning: 'Savor hot Bat Dan Pho, stroll around Hoan Kiem Lake, admire the red The Huc bridge and ancient Turtle Tower.',
        afternoon: 'Visit the Temple of Literature - Vietnam’s first university, and enjoy a rich, creamy egg coffee.',
        evening: 'Browse the bustling night market, enjoy char-grilled Bun Cha, and immerse in vibrant colonial street life.',
        transport: 'Walking, 2-deck Hop-on Hop-off bus or Grab taxi',
        stay: 'Old Quarter boutique hotel (~VND 600,000/night)',
      },
      2: {
        destination: 'Hanoi - Ha Long Bay Cruise',
        highlights: ['Ha Long Bay Cruise', 'Sung Sot Cave', 'Sea Kayaking'],
        morning: 'Board a luxury VIP limousine to Ha Long (2.5 hrs). Check into your cruise and relish fresh seafood lunch.',
        afternoon: 'Explore marvelous Sung Sot Cave with thousands of sparkling stalactites, and kayak across tranquil lagoons.',
        evening: 'Sunset cocktail party on sundeck, night squid fishing with crew, and rest peacefully amid the UNESCO heritage.',
        transport: 'VIP Limousine + 4-star Overnight Cruise',
        stay: 'Balcony oceanview cruise cabin (~VND 1,600,000/person/night)',
      },
      3: {
        destination: 'Ha Long - Ninh Binh - Departure',
        highlights: ['Trang An Grottos', 'Hang Mua Peak', 'Tam Coc Lotus'],
        morning: 'Join dawn Tai Chi on deck, enjoy breakfast, then transfer across the countryside to Ninh Binh.',
        afternoon: 'Take a traditional sampan through 9 karst grottos in Trang An, climb 486 steps of Hang Mua for panoramic valley vistas.',
        evening: 'Taste crispy rice crackers and mountain goat delicacies before limousine transfer to Noi Bai Airport.',
        transport: 'Private tourism limousine',
        stay: 'Tour conclusion / Evening flight',
      },
    },
  },
  'itinerary-5days-central-heritage': {
    title: '5-Day Central Heritage Trail: Hue, Da Nang & Hoi An Ancient Town',
    overview: 'Connect Vietnam’s most acclaimed UNESCO World Heritage destinations: the imperial serenity of Hue, the vibrant beaches of Da Nang, and lantern-lit Hoi An.',
    budgetLevel: 'Standard',
    days: {
      1: {
        destination: 'Imperial Citadel of Hue',
        highlights: ['Imperial Citadel', 'Thien Mu Pagoda', 'Authentic Bun Bo Hue'],
        morning: 'Land at Phu Bai Airport, savor fragrant lemongrass Bun Bo Hue beef noodle soup.',
        afternoon: 'Explore the majestic Imperial Citadel and Forbidden Purple City, followed by romantic Tu Duc Tomb.',
        evening: 'Take a royal dragon boat on the Perfume River, float prayer lanterns, and listen to sweet Hue folk singing.',
        transport: 'Airport taxi / private transfer',
        stay: 'Perfume River riverfront hotel in Hue',
      },
      2: {
        destination: 'Hue - Hai Van Pass - Da Nang Beach',
        highlights: ['Hai Van Pass Panorama', 'My Khe Beach', 'Dragon Bridge Fire Show'],
        morning: 'Conquer the legendary Hai Van Pass, admiring azure Lang Co Bay from soaring mountain peaks.',
        afternoon: 'Swim in the powdery white sands of My Khe Beach, indulging in fresh Central Vietnam seafood.',
        evening: 'Watch the iconic Dragon Bridge breathe fire and water at 9 PM on weekends, then walk Love Lock Bridge.',
        transport: 'Private vehicle / scenic limousine',
        stay: '4-star beachfront hotel on My Khe Beach Da Nang',
      },
      3: {
        destination: 'Ba Na Hills - Golden Bridge Hands',
        highlights: ['Ba Na Cable Car', 'Giant Golden Bridge', 'French Village'],
        morning: 'Ride the world-record cable car up to Ba Na Hills and photograph the iconic Golden Bridge held by stone hands.',
        afternoon: 'Wander the Gothic French Village, explore Debay wine cellars and indoor fantasy amusements.',
        evening: 'Descend the mountain and transfer 30 km to the charming ancient town of Hoi An.',
        transport: 'Dedicated Ba Na shuttle bus',
        stay: 'Garden homestay in Hoi An old quarter',
      },
      4: {
        destination: 'Hoi An UNESCO Ancient Town',
        highlights: ['Japanese Covered Bridge', 'Tan Ky Ancient House', 'Lantern Boat Ride', 'Banh Mi Phuong'],
        morning: 'Cycle peaceful bougainvillea-lined alleys at dawn, savoring condensed milk iced coffee by golden walls.',
        afternoon: 'Craft traditional silk lanterns, tasting crispy banh mi and Hoi An’s famous Cao Lau noodles.',
        evening: 'Board a wooden boat on Hoai River to release candlelit lanterns, gazing upon thousands of glowing silks.',
        transport: 'Bicycle / walking',
        stay: 'Boutique riverside resort in Hoi An',
      },
      5: {
        destination: 'Coconut Forest - Farewell Da Nang Airport',
        highlights: ['Bay Mau Basket Boat', 'Souvenir Shopping', 'Da Nang Airport'],
        morning: 'Glide through Bay Mau water coconut palm forest in circular bamboo basket boats and watch thrilling boat spins.',
        afternoon: 'Pick up mung bean cakes and Hoi An handmade silks as souvenirs, followed by private transfer to Da Nang Airport.',
        evening: 'Board your evening flight with cherished memories of Central Vietnam.',
        transport: 'Airport shuttle car',
        stay: 'Departure flight',
      },
    },
  },
  'itinerary-10days-grand-vietnam': {
    title: '10 to 14-Day Grand Vietnam Odyssey: North, Central, South & Phu Quoc',
    overview: 'The definitive journey from the misty peaks of the North, through central imperial palaces, down to the lush Mekong Delta and tropical Phu Quoc Island.',
    budgetLevel: 'Premium Luxury',
    days: {
      1: {
        destination: 'Hanoi - Warm Welcome',
        highlights: ['Hoan Kiem Lake', 'Old Quarter', 'Temple of Literature'],
        morning: 'Arrival at Noi Bai Airport, private check-in at a classic French colonial hotel in downtown Hanoi.',
        afternoon: 'Stroll around Thang Long Imperial Citadel and One Pillar Pagoda.',
        evening: 'Welcome gourmet banquet featuring Michelin-awarded Pho and Cha Ca La Vong grilled fish.',
        transport: 'Premium private transfer',
        stay: '5-star luxury Hanoi hotel',
      },
      2: {
        destination: 'Hanoi - Sa Pa Mountain Realm',
        highlights: ['Cat Cat Village', 'Black H’Mong Culture', 'Muong Hoa Valley'],
        morning: 'Take a luxury express train or limousine to misty Sa Pa mountain highlands.',
        afternoon: 'Trek Cat Cat village to experience traditional indigo dyeing and hemp weaving with H’Mong villagers.',
        evening: 'Enjoy salmon hotpot, smoked mountain buffalo, and live ethnic minority musical performances.',
        transport: 'Express tourism train / VIP limousine',
        stay: 'Eco-resort overlooking terraced rice valleys',
      },
      3: {
        destination: 'Conquering Fansipan Peak',
        highlights: ['Fansipan Cable Car', 'Indochina Summit 3,143m', 'Bao Thang Pagoda'],
        morning: 'Ascend to the Roof of Indochina at 3,143m via world-record cable car, gazing upon oceans of clouds.',
        afternoon: 'Visit Silver Waterfall (Thac Bac) and O Quy Ho Heaven Gate to catch a fiery highland sunset.',
        evening: 'Return to Hanoi to prepare for your maritime cruise adventure.',
        transport: 'Cable car + private car',
        stay: 'Hanoi luxury hotel',
      },
      4: {
        destination: 'Wonder of Ha Long Bay',
        highlights: ['5-Star Overnight Cruise', 'Sung Sot Cave', 'Ti Top Island'],
        morning: 'Transfer to Tuan Chau marina and embark on a magnificent 5-star cruise vessel.',
        afternoon: 'Kayak through limestone arches and climb Ti Top island for 360-degree bay panoramas.',
        evening: 'Gourmet seafood buffet, acoustic deck melodies, and stargazing in the heart of UNESCO waters.',
        transport: '5-star luxury cruise',
        stay: 'Ha Long Bay 5-star cruise suite',
      },
      5: {
        destination: 'Ha Long - Domestic Flight to Imperial Hue',
        highlights: ['Bai Tu Long Bay Dawn', 'Domestic Flight', 'Perfume River'],
        morning: 'Greet the bay dawn with Tai Chi, brunch on deck, then direct transfer to Cat Bi Airport for flight to Hue.',
        afternoon: 'Check in at your Hue riverfront resort and watch sunset at Thien Mu Pagoda.',
        evening: 'Experience exquisite Nguyen Dynasty royal imperial cuisine with carved phoenix delicacies.',
        transport: 'Domestic flight + private car',
        stay: 'Riverfront heritage resort in Hue',
      },
      6: {
        destination: 'Hue Citadel - Hai Van Pass - Hoi An',
        highlights: ['Imperial Citadel', 'Hai Van Pass', 'Glowing Hoi An'],
        morning: 'Explore the grand Hue Citadel, uncovering stories of 13 Nguyen Dynasty emperors.',
        afternoon: 'Drive over scenic Hai Van Pass to enchanting Hoi An ancient town.',
        evening: 'Float lanterns on Hoai River and watch the grand outdoor spectacle "Hoi An Memories".',
        transport: 'Private vehicle',
        stay: 'Hoi An boutique resort',
      },
      7: {
        destination: 'Hoi An - Dynamic Ho Chi Minh City',
        highlights: ['Da Nang Airport', 'Independence Palace', 'Notre Dame Cathedral'],
        morning: 'Enjoy a peaceful Hoi An sunrise, then transfer to Da Nang Airport for your flight to Ho Chi Minh City.',
        afternoon: 'Tour Independence Palace, Central Post Office, and colonial heritage boulevards.',
        evening: 'Savor cocktails at a high-floor rooftop lounge overlooking the neon skyline of Saigon.',
        transport: 'Vietnam Airlines flight + private car',
        stay: 'District 1 5-star landmark hotel',
      },
      8: {
        destination: 'Cu Chi Tunnels - Mekong Delta Waterways',
        highlights: ['Cu Chi Tunnels', 'Mekong River Orchard', 'Don Ca Tai Tu Folk Music'],
        morning: 'Explore the miraculous subterranean defense network of Cu Chi Tunnels.',
        afternoon: 'Travel to the lush Mekong Delta, gliding on wooden sampans along coconut canals.',
        evening: 'Arrive in Can Tho, checking in and strolling illuminated Ninh Kieu wharf.',
        transport: 'Private tour car',
        stay: 'Can Tho 4-star riverside hotel',
      },
      9: {
        destination: 'Cai Rang Floating Market - Flight to Phu Quoc',
        highlights: ['Cai Rang Floating Market', 'Tropical Orchards', 'Phu Quoc Island Paradise'],
        morning: 'Experience dawn at Cai Rang floating market as hundreds of boats trade tropical produce.',
        afternoon: 'Fly from Can Tho to Phu Quoc Island, checking into your beachfront sunset resort.',
        evening: 'Savor grilled Ham Ninh blue crabs and fresh seafood barbecue by the breaking waves.',
        transport: 'Market boat + domestic flight to Phu Quoc',
        stay: 'Phu Quoc beachfront luxury resort',
      },
      10: {
        destination: 'Phu Quoc Coastal Haven & Farewell Vietnam',
        highlights: ['Sao Beach', 'Hon Thom Cable Car', 'Black Pepper & Pearls'],
        morning: 'Swim at powdery white Sao Beach and snorkel among vibrant coral reefs.',
        afternoon: 'Visit traditional fish sauce barrels and aromatic pepper farms for authentic culinary gifts.',
        evening: 'Transfer to Phu Quoc International Airport, concluding your comprehensive Vietnam expedition.',
        transport: 'Airport shuttle transfer',
        stay: 'Homeward international flight',
      },
    },
  },
};

/**
 * Universal language helper function
 */
export function tr(lang: Language, vi: string, en: string, ko: string): string {
  if (lang === 'vi') return vi;
  if (lang === 'ko') return ko;
  return en;
}


