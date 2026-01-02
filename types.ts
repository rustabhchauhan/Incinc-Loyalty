
export enum Role {
  SUPER_ADMIN = 'SUPER_ADMIN',
  BRAND_ADMIN = 'BRAND_ADMIN',
  CUSTOMER = 'CUSTOMER'
}

export enum BrandType {
  RESTAURANT = 'RESTAURANT',
  SALON = 'SALON',
  HOTEL = 'HOTEL'
}

export interface BrandTheme {
  primaryColor: string; // Tailwind class name or hex
  fontFamily: 'Inter' | 'Playfair Display' | 'Roboto Mono';
  borderRadius: 'none' | 'md' | '2xl' | 'full';
}

export interface FeaturedOffer {
  id: string;
  title: string;
  description: string;
  ctaText: string;
  imageUrl?: string;
}

export interface LandingPageConfig {
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  heroImageUrl: string; // Fallback image
  heroSlideshowImages: string[];
  heroTransitionEffect: 'fade' | 'slide' | 'zoom';
  ctaText: string;
  ctaBackgroundColor?: string;
  ctaTextColor?: string;
  ctaBorderRadius?: 'none' | 'md' | '2xl' | 'full';
  // Contact Fields
  brandEmail: string;
  brandPhone: string;
  brandAddress: string;
  brandWorkingHours: string;
  // Extra Styling
  pageBackgroundColor?: string;
  accentColor?: string;
  // Hero Visual Customization
  heroImageOpacity: number; // 0 to 100
  heroOverlayColor: string; // Hex
  heroOverlayOpacity: number; // 0 to 100
  // Featured Offers Section
  featuredOffers: FeaturedOffer[];
  // New Sections
  banners: { id: string; imageUrl: string; title: string; subtitle: string }[];
  products: { id: string; name: string; description: string; price: string; imageUrl: string }[];
  redemptionSteps: { id: string; title: string; description: string }[];
  menuGallery: string[]; // Added gallery support
  showAuthButtons: boolean;
}

export interface Brand {
  id: string;
  name: string;
  type: BrandType;
  logo: string;
  theme: BrandTheme;
  topupBonusPercentage: number;
  pointsEarningRate: number; // Added for deeper management
  pointsExpiryMonths: number; // Added for deeper management
  features: {
    wallet: boolean;
    points: boolean;
    subscriptions: boolean;
    vouchers: boolean;
  };
  landingPage: LandingPageConfig;
}

export interface User {
  id: string;
  name: string;
  username?: string;
  email: string;
  mobile: string;
  role: Role;
  brandId?: string; // For Brand Admins
  birthday?: string;
  anniversary?: string;
  maritalStatus?: 'SINGLE' | 'MARRIED';
  spouseBirthday?: string;
  children?: { id: string; dob: string }[];
  preferences?: {
    dietary: 'VEG' | 'NON_VEG';
    interests: string[];
  };
  tier: 'SILVER' | 'GOLD' | 'PLATINUM';
  profileImage?: string;
  profileComplete?: boolean;
}

export interface Wallet {
  balance: number;
  bonusBalance: number;
  points: number;
}

export interface Subscription {
  id: string;
  name: string;
  brandId: string;
  totalUnits: number;
  remainingUnits: number;
  expiryDate: string;
  price: number;
}

export interface Voucher {
  id: string;
  code: string;
  name: string;
  brandId: string;
  type: 'BUY_X_GET_Y' | 'FLAT_DISCOUNT' | 'TIER_BASED' | 'PAID_VOUCHER' | 'PROMOTIONAL';
  value: number;
  expiryDate: string;
  isRedeemed: boolean;
}

export interface Transaction {
  id: string;
  userId: string;
  brandId: string;
  amount: number;
  pointsEarned: number;
  type: 'TOPUP' | 'PURCHASE' | 'REDEMPTION' | 'SUBSCRIPTION_BUY' | 'VOUCHER_BUY';
  description: string;
  timestamp: string;
}
