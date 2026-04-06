export interface Article {
  id: string;
  title: string;
  category: string;
  author: string;
  authorImage: string;
  date: string;
  readTime: string;
  image: string;
  excerpt: string;
  content?: string;
  language?: 'EN' | 'FR' | 'CN';
}

export interface Business {
  id: string;
  name: string;
  category: string;
  rating: number;
  reviews: number;
  priceRange: string;
  distance: string;
  hours: string;
  description: string;
  address: string;
  website: string;
  menuLink: string;
  image: string;
  gallery: string[];
  featuredDishes: {
    name: string;
    price: string;
    image: string;
  }[];
}

export const ARTICLES: Article[] = [
  {
    id: '1',
    title: 'Digital Cedi: The Future of West African Commerce',
    category: 'Economics',
    author: 'Ama Boateng',
    authorImage: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=100&h=100&fit=crop',
    date: '2h ago',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1582650625119-3a31f8fa2699?w=800&q=80',
    excerpt: 'Across the skyline of Accra, a new architectural silhouette is emerging—not one of steel and glass alone, but of digital infrastructure that promises to leapfrog traditional economic barriers.',
    content: 'Across the skyline of Accra, a new architectural silhouette is emerging—not one of steel and glass alone, but of digital infrastructure that promises to leapfrog traditional economic barriers. Silicon Accra is no longer a distant dream; it is a vibrating reality where local founders are training neural networks on continental datasets.\n\nAs the sun sets over the Gulf of Guinea, the labs in East Legon are just warming up. Here, engineers are tackling everything from agricultural yields to logistics bottlenecks using custom-built AI models.\n\n"Ghana is becoming the digital gateway to West Africa, proving that innovation isn\'t geographic, it\'s systemic."\n\nThe government\'s recent Digital Ghana Agenda has paved the way for tax incentives that attract venture capital from London, New York, and Shanghai. Yet, the heart of this movement remains intensely local.'
  },
  {
    id: '2',
    title: 'Reclaiming the Loom: Modern Interpretations of Kente',
    category: 'Heritage & Culture',
    author: 'Daily Graphic',
    authorImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    date: '5h ago',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800&q=80',
    excerpt: 'A deep dive into how contemporary designers are reimagining traditional weaving techniques for the global stage.'
  },
  {
    id: '3',
    title: 'Silicon Accra: The Rise of Pan-African AI Startups',
    category: 'Innovation',
    author: 'TechFocus Ghana',
    authorImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
    date: '8h ago',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&q=80',
    excerpt: 'How local tech hubs are becoming the engine of growth for the continent\'s digital economy.'
  },
  {
    id: '4',
    title: '保护自然：加纳野生动物保护的新篇章',
    category: 'Eco-Tourism',
    author: 'China-Africa Post',
    authorImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
    date: '12h ago',
    readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80',
    excerpt: 'Protecting Nature: A New Chapter for Ghana\'s Wildlife Conservation'
  }
];

export const BUSINESSES: Business[] = [
  {
    id: '1',
    name: 'Buka Restaurant',
    category: 'Restaurant',
    rating: 4.8,
    reviews: 690,
    priceRange: 'GH₵500+',
    distance: '0.8 km',
    hours: 'Open until 10 PM',
    description: 'Renowned for authentic Ghanaian and Nigerian cuisine. Located in the heart of Osu, offering a lush garden setting.',
    address: 'Ring Rd E, Accra, Ghana',
    website: 'bolt.eu / lepetitoiseau.com',
    menuLink: 'bit.ly/lpo-accra-menu',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=400&q=80',
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&q=80',
      'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400&q=80'
    ],
    featuredDishes: [
      {
        name: 'Sticky Toffee Pudding',
        price: 'GH₵120.00',
        image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&q=80'
      },
      {
        name: 'Angus Ribeye Steak',
        price: 'GH₵450.00',
        image: 'https://images.unsplash.com/photo-1546241072-48010ad28c2c?w=400&q=80'
      }
    ]
  },
  {
    id: '2',
    name: 'Nyaho Medical Centre',
    category: 'Hospital',
    rating: 4.6,
    reviews: 320,
    priceRange: 'Premium',
    distance: '2.4 km',
    hours: '24/7 Emergency',
    description: 'Leading private healthcare provider in Ghana known for excellence and 24/7 specialist care services.',
    address: '35 Airport Residential Area, Accra',
    website: 'nyahomedical.com',
    menuLink: '',
    image: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&q=80',
    gallery: [],
    featuredDishes: []
  },
  {
    id: '3',
    name: 'Shoprite Accra Mall',
    category: 'Market',
    rating: 4.4,
    reviews: 1200,
    priceRange: 'Standard',
    distance: '4.1 km',
    hours: 'Open until 9 PM',
    description: 'Large variety of groceries and household items at competitive prices. Conveniently located in Accra Mall.',
    address: 'Accra Mall, Tetteh Quarshie Interchange',
    website: 'shoprite.com.gh',
    menuLink: '',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&q=80',
    gallery: [],
    featuredDishes: []
  }
];
