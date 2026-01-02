
import { Brand, BrandType, Role, User } from './types';
import { 
  Sparkles, 
  Scissors, 
  Fish, 
  Wine, 
  Music, 
  Dumbbell, 
  Waves, 
  Utensils 
} from 'lucide-react';

export const BRANDS: Brand[] = [
  {
    id: 'b1',
    name: 'Nine Blue',
    type: BrandType.RESTAURANT,
    logo: 'https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?auto=format&fit=crop&w=200&q=80',
    topupBonusPercentage: 10,
    pointsEarningRate: 1,
    pointsExpiryMonths: 12,
    features: {
      wallet: true,
      points: true,
      subscriptions: true,
      vouchers: true,
    },
    theme: {
      primaryColor: 'emerald-600',
      fontFamily: 'Inter',
      borderRadius: '2xl'
    },
    landingPage: {
      heroTitle: "Dine Like Royalty",
      heroSubtitle: "Join our exclusive dining circle.",
      heroDescription: "Experience the finest farm-to-table cuisine with premium rewards on every visit.",
      heroImageUrl: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=800&q=80",
      heroSlideshowImages: [
        "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1473093226795-af9932fe5856?auto=format&fit=crop&w=800&q=80"
      ],
      menuGallery: [
        "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1473093226795-af9932fe5856?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1567620905732-2d1ec7bb7445?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1484723091739-30a097e8f929?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80",
      ],
      heroTransitionEffect: 'fade',
      ctaText: "Get Your First Reward",
      ctaBackgroundColor: '#059669',
      ctaTextColor: '#ffffff',
      ctaBorderRadius: '2xl',
      brandEmail: "contact@newbrand.com",
      brandPhone: "+91 8108114819",
      brandAddress: "123 Ocean Drive, Nine Blue Plaza, Mumbai",
      brandWorkingHours: "11:00 AM - 11:00 PM (Mon-Sun)",
      pageBackgroundColor: '#ffffff',
      accentColor: '#059669',
      heroImageOpacity: 100,
      heroOverlayColor: '#000000',
      heroOverlayOpacity: 40,
      featuredOffers: [
        { id: '1', title: "Chef's Special Tasting", description: "Get a complimentary 5-course tasting menu for two on your 5th visit this month.", ctaText: "Learn More", imageUrl: "https://images.unsplash.com/photo-1550966841-3ee7ad6d1b82?auto=format&fit=crop&w=800&q=80" },
        { id: '2', title: "Weekend Brunch 20% Off", description: "Exclusive discount for Platinum members every Sunday from 11 AM to 3 PM.", ctaText: "View Details", imageUrl: "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?auto=format&fit=crop&w=800&q=80" }
      ],
      showAuthButtons: true,
      banners: [
        { id: '1', imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80', title: 'Fresh Ingredients', subtitle: 'From local farms to your plate' },
        { id: '2', imageUrl: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=800&q=80', title: 'Elegant Ambiance', subtitle: 'Perfect for every occasion' }
      ],
      products: [
        { id: 'p1', name: 'Truffle Pasta', description: 'Homemade tagliatelle with black truffle', price: '₹850', imageUrl: 'https://images.unsplash.com/photo-1473093226795-af9932fe5856?auto=format&fit=crop&w=400&q=80' },
        { id: 'p2', name: 'Garden Salad', description: 'Fresh seasonal greens and nuts', price: '₹450', imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=400&q=80' },
        { id: 'p3', name: 'Gourmet Burger', description: 'Wagyu beef with caramelised onions', price: '₹1200', imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&q=80' },
        { id: 'p4', name: 'Seafood Platter', description: 'Fresh catch of the day with dip', price: '₹2400', imageUrl: 'https://images.unsplash.com/photo-1551248429-40975aa4de74?auto=format&fit=crop&w=400&q=80' }
      ],
      redemptionSteps: [
        { id: 'r1', title: 'Scan QR', description: 'Show your wallet QR at the billing counter' },
        { id: 'r2', title: 'Pick Offer', description: 'Select the available voucher from your list' },
        { id: 'r3', title: 'Get Discount', description: 'Amount is automatically deducted from bill' }
      ]
    }
  },
  {
    id: 'b2',
    name: 'Azure Spa & Salon',
    type: BrandType.SALON,
    logo: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=200&q=80',
    topupBonusPercentage: 15,
    pointsEarningRate: 1.5,
    pointsExpiryMonths: 6,
    features: {
      wallet: true,
      points: true,
      subscriptions: true,
      vouchers: true,
    },
    theme: {
      primaryColor: 'sky-600',
      fontFamily: 'Playfair Display',
      borderRadius: '2xl'
    },
    landingPage: {
      heroTitle: "Rejuvenate Your Senses",
      heroSubtitle: "Luxury wellness awaits you.",
      heroDescription: "Bespoke spa treatments and salon services tailored to your unique lifestyle.",
      heroImageUrl: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=800&q=80",
      heroSlideshowImages: [
        "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=800&q=80"
      ],
      menuGallery: [],
      heroTransitionEffect: 'slide',
      ctaText: "Book Your Experience",
      ctaBackgroundColor: '#0284c7',
      ctaTextColor: '#ffffff',
      ctaBorderRadius: 'full',
      brandEmail: "relax@azurespa.com",
      brandPhone: "+91 99887 76655",
      brandAddress: "45 Ocean Breeze Tower, Sky Lane, Bangalore",
      brandWorkingHours: "09:00 AM - 08:00 PM (Mon-Sat)",
      pageBackgroundColor: '#f8fafc',
      accentColor: '#0284c7',
      heroImageOpacity: 100,
      heroOverlayColor: '#000000',
      heroOverlayOpacity: 30,
      featuredOffers: [
        { id: '1', title: "Monsoon Glow Package", description: "Full body detox followed by a clarifying facial. Now at 30% off for Platinum members.", ctaText: "View Menu", imageUrl: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=800&q=80" }
      ],
      showAuthButtons: true,
      banners: [
        { id: '1', imageUrl: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=800&q=80', title: 'Pure Relaxation', subtitle: 'Indulge in our premium spa' },
        { id: '2', imageUrl: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80', title: 'Master Stylists', subtitle: 'Top tier salon services' }
      ],
      products: [
        { id: 'p1', name: 'Deep Tissue Massage', description: '60 mins of therapeutic pressure', price: '₹2,400', imageUrl: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=400&q=80' },
        { id: 'p2', name: 'Bridal Makeover', description: 'Complete aesthetic consultation', price: '₹12,000', imageUrl: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=400&q=80' }
      ],
      redemptionSteps: [
        { id: 'r1', title: 'Book Session', description: 'Schedule your appointment online' },
        { id: 'r2', title: 'Visit Outlet', description: 'Arrive 10 minutes before for consultation' },
        { id: 'r3', title: 'Show Member ID', description: 'Redeem points directly on your invoice' }
      ]
    }
  },
  {
    id: 'b3',
    name: 'Grand Royal Hotel',
    type: BrandType.HOTEL,
    logo: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=200&q=80',
    topupBonusPercentage: 5,
    pointsEarningRate: 0.5,
    pointsExpiryMonths: 24,
    features: {
      wallet: true,
      points: true,
      subscriptions: true,
      vouchers: true,
    },
    theme: {
      primaryColor: 'amber-600',
      fontFamily: 'Playfair Display',
      borderRadius: 'none'
    },
    landingPage: {
      heroTitle: "Elegant Stays",
      heroSubtitle: "Your home away from home.",
      heroDescription: "Unmatched hospitality in the heart of the city with rewards that matter.",
      heroImageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
      heroSlideshowImages: [
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=800&q=80"
      ],
      menuGallery: [],
      heroTransitionEffect: 'zoom',
      ctaText: "Claim Your Bonus Stay",
      ctaBackgroundColor: '#d97706',
      ctaTextColor: '#ffffff',
      ctaBorderRadius: 'none',
      brandEmail: "bookings@grandroyal.com",
      brandPhone: "+91 91234 56789",
      brandAddress: "The Royal Plaza, Heritage Road, Delhi",
      brandWorkingHours: "24/7 (365 Days)",
      pageBackgroundColor: '#fffdfa',
      accentColor: '#d97706',
      heroImageOpacity: 100,
      heroOverlayColor: '#000000',
      heroOverlayOpacity: 50,
      featuredOffers: [
        { id: '1', title: "Weekend Staycation", description: "Stay for 2 nights and get the 3rd night absolutely free. Breakfast included.", ctaText: "Check Availability", imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80" }
      ],
      showAuthButtons: true,
      banners: [
        { id: '1', imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80', title: 'Luxury Suites', subtitle: 'Elegance in every corner' },
        { id: '2', imageUrl: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80', title: 'World Class Dining', subtitle: 'Experience global cuisines' }
      ],
      products: [
        { id: 'p1', name: 'Presidential Suite', description: 'Panoramic views and private butler', price: '₹45,000', imageUrl: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=400&q=80' },
        { id: 'p2', name: 'Executive Room', description: 'Perfect for business travelers', price: '₹12,000', imageUrl: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=400&q=80' }
      ],
      redemptionSteps: [
        { id: 'r1', title: 'Check In', description: 'Provide your loyalty number at reception' },
        { id: 'r2', title: 'Accumulate', description: 'Spend on food/spa during your stay' },
        { id: 'r3', title: 'Settle', description: 'Use wallet balance for room upgrades' }
      ]
    }
  },
];

export const MOCK_USERS: User[] = [
  {
    id: 'u1',
    name: 'Super Admin',
    email: 'admin@system.com',
    mobile: '9999999999',
    role: Role.SUPER_ADMIN,
    tier: 'PLATINUM',
  },
  {
    id: 'u2',
    name: 'Nine Blue',
    email: 'admin@nineblue.com',
    mobile: '8888888888',
    role: Role.BRAND_ADMIN,
    brandId: 'b1',
    tier: 'GOLD',
  },
  {
    id: 'u3',
    name: 'Rustabh Chauhan',
    email: 'rustabh@example.com',
    mobile: '7777777777',
    role: Role.CUSTOMER,
    tier: 'SILVER',
    birthday: '1995-05-15',
    preferences: { dietary: 'VEG', interests: ['Spa', 'Fine Dining'] },
  },
];

export const TIER_BENEFITS = {
  SILVER: { bonus: 5, pointsRate: 1 },
  GOLD: { bonus: 10, pointsRate: 1.5 },
  PLATINUM: { bonus: 20, pointsRate: 2 },
};

export const THEME_COLORS = [
  { name: 'Indigo', class: 'indigo-600', hex: '#4f46e5' },
  { name: 'Emerald', class: 'emerald-600', hex: '#059669' },
  { name: 'Sky', class: 'sky-600', hex: '#0284c7' },
  { name: 'Amber', class: 'amber-600', hex: '#d97706' },
  { name: 'Rose', class: 'rose-600', hex: '#e11d48' },
  { name: 'Slate', class: 'slate-800', hex: '#1e293b' },
  { name: 'Violet', class: 'violet-600', hex: '#7c3aed' },
];

export const FONT_STYLES = [
  { name: 'Modern (Inter)', id: 'Inter' },
  { name: 'Classic (Serif)', id: 'Playfair Display' },
  { name: 'Tech (Mono)', id: 'Roboto Mono' },
];

export const AVAILABLE_INTERESTS = [
  { id: 'spa', label: 'Spa & Wellness', icon: Sparkles },
  { id: 'haircare', label: 'Haircare', icon: Scissors },
  { id: 'seafood', label: 'Seafood', icon: Fish },
  { id: 'wine', label: 'Wine & Spirits', icon: Wine },
  { id: 'music', label: 'Live Music', icon: Music },
  { id: 'gym', label: 'Fitness/Gym', icon: Dumbbell },
  { id: 'poolside', label: 'Poolside', icon: Waves },
  { id: 'fine-dining', label: 'Fine Dining', icon: Utensils },
];
