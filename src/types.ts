export type Language = 'vi' | 'en' | 'ko';

export type Region = 'North' | 'Central' | 'South';

export interface Destination {
  id: string;
  name: string;
  vietnameseName: string;
  region: Region;
  province: string;
  category: 'heritage' | 'nature' | 'cultural' | 'beach' | 'history';
  travelType: string;
  description: string;
  culturalSignificance: string;
  imageUrl: string;
  videoUrl?: string;
  bestTime: string;
  estimatedCostVND: string;
  estimatedCostUSD: string;
  // Map positioning for Vietnam S-curve stylized map (percentage from top-left: 0-100)
  mapCoord: { x: number; y: number };
  voiceGuideVi: string;
  voiceGuideEn: string;
  voiceGuideKo?: string;
  nameKo?: string;
  descriptionKo?: string;
  tags: string[];
}

export interface CuisineItem {
  id: string;
  name: string;
  vietnameseName: string;
  region: Region;
  description: string;
  travelType: string;
  culturalStory: string;
  imageUrl: string;
  videoUrl?: string;
  averagePriceVND: string;
  recommendedPlaces: string[];
  tasteProfile: string;
}

export interface EthnicGroup {
  id: string;
  name: string;
  otherNames?: string;
  populationEstimate: string;
  residence: string;
  traditionalCostume: string;
  culturalHighlight: string;
  architecture: string;
  festivals: string;
  imageUrl: string;
  featureImageUrl?: string;
  architectureImageUrl?: string;
  festivalImageUrl?: string;
  characteristicTags?: string[];
  visualHighlights?: {
    costume: string;
    architecture: string;
    festivalInstrument: string;
  };
}

export interface HistoricMonument {
  id: string;
  name: string;
  location: string;
  period: string;
  historicalValue: string;
  architecturalStyle: string;
  ticketPrice: string;
  imageUrl: string;
}

export interface ItineraryPlan {
  id: string;
  title: string;
  duration: '1-3' | '4-7' | '10-14';
  style: 'heritage' | 'nature' | 'budget' | 'luxury' | 'family';
  budgetLevel: 'Tiết kiệm' | 'Tiêu chuẩn' | 'Cao cấp';
  estimatedCostTotal: string;
  overview: string;
  days: {
    dayNumber: number;
    destination: string;
    highlights: string[];
    morning: string;
    afternoon: string;
    evening: string;
    transport: string;
    stay: string;
    budgetEstimate: string;
  }[];
}

export interface TravelService {
  id: string;
  category: 'transport' | 'accommodation';
  name: string;
  vietnameseName: string;
  description: string;
  priceRange: string;
  advantages: string[];
  tipsForTourists: string;
  iconName: string;
}

export interface TravelStyleGuide {
  id: string;
  title: string;
  suitableFor: string;
  description: string;
  pros: string[];
  cons: string[];
  recommendations: string;
}

export interface ReviewItem {
  id: string;
  author: string;
  country: string;
  rating: number; // 1 to 5
  date: string;
  destination: string;
  comment: string;
  userType: 'Quốc tế' | 'Trong nước';
}

export interface PhraseBookItem {
  id: string;
  category: 'greeting' | 'dining' | 'shopping' | 'direction' | 'emergency';
  english: string;
  vietnamese: string;
  korean?: string;
  pronunciation: string;
  koreanPronunciation?: string;
  contextNote: string;
  contextNoteKo?: string;
}

export interface MaritimeSovereignty {
  id: string;
  name: string;
  titleVi: string;
  titleEn: string;
  location: string;
  historicalEvidence: string[];
  significance: string;
  sovereigntyStatementVi: string;
  sovereigntyStatementEn: string;
  imageUrl: string;
  coordinates: string;
  keyIslands: string[];
}

