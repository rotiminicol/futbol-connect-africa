
import { UserRole } from '../contexts/AuthContext';

export interface Player {
  id: string;
  name: string;
  age: number;
  nationality: string;
  position: string;
  height: number; // in cm
  weight: number; // in kg
  preferredFoot: 'left' | 'right' | 'both';
  valueInEuros: number;
  currentClub?: string;
  image: string;
  video?: string;
  stats: {
    pace: number;
    shooting: number;
    passing: number;
    dribbling: number;
    defending: number;
    physical: number;
  };
  availableForTransfer: boolean;
  openToTrials: boolean;
  description: string;
}

export interface Club {
  id: string;
  name: string;
  logo: string;
  location: string;
  league: string;
  foundedYear: number;
  description: string;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  type: 'trial' | 'tournament' | 'showcase' | 'workshop';
  organizer: string;
  description: string;
  image?: string;
}

export interface NewsItem {
  id: string;
  title: string;
  content: string;
  date: string;
  source: string;
  image?: string;
  category: 'transfers' | 'local' | 'international' | 'academy';
}

export interface PricingPlan {
  id: string;
  role: UserRole;
  name: string;
  price: number;
  currency: string;
  period: 'month' | 'year';
  features: string[];
  recommended?: boolean;
}

// Mock Players
export const mockPlayers: Player[] = [
  {
    id: "p1",
    name: "Chidera Ejuke",
    age: 22,
    nationality: "Nigeria",
    position: "Winger",
    height: 179,
    weight: 75,
    preferredFoot: "left",
    valueInEuros: 250000,
    currentClub: "Rising Stars FC",
    image: "/placeholder.svg",
    video: "https://www.youtube.com/watch?v=example",
    stats: {
      pace: 89,
      shooting: 78,
      passing: 76,
      dribbling: 85,
      defending: 42,
      physical: 68
    },
    availableForTransfer: true,
    openToTrials: true,
    description: "Dynamic winger with excellent dribbling skills and pace. Can play on either flank and has an eye for goal."
  },
  {
    id: "p2",
    name: "Samuel Ibrahim",
    age: 19,
    nationality: "Nigeria",
    position: "Striker",
    height: 185,
    weight: 80,
    preferredFoot: "right",
    valueInEuros: 175000,
    currentClub: "Lagos City FC",
    image: "/placeholder.svg",
    stats: {
      pace: 82,
      shooting: 84,
      passing: 65,
      dribbling: 76,
      defending: 38,
      physical: 79
    },
    availableForTransfer: true,
    openToTrials: true,
    description: "Promising young striker with natural finishing ability. Strong in the air and clinical in front of goal."
  },
  {
    id: "p3",
    name: "Victoria Adeola",
    age: 20,
    nationality: "Nigeria",
    position: "Midfielder",
    height: 170,
    weight: 65,
    preferredFoot: "right",
    valueInEuros: 200000,
    currentClub: "Queen's Academy",
    image: "/placeholder.svg",
    stats: {
      pace: 75,
      shooting: 72,
      passing: 86,
      dribbling: 81,
      defending: 68,
      physical: 74
    },
    availableForTransfer: false,
    openToTrials: true,
    description: "Creative midfielder with excellent vision and passing range. Technical player who can dictate the pace of the game."
  },
  {
    id: "p4",
    name: "Emmanuel Okocha",
    age: 21,
    nationality: "Nigeria",
    position: "Defender",
    height: 188,
    weight: 82,
    preferredFoot: "right",
    valueInEuros: 225000,
    currentClub: "Eagle Stars",
    image: "/placeholder.svg",
    stats: {
      pace: 76,
      shooting: 45,
      passing: 70,
      dribbling: 65,
      defending: 84,
      physical: 86
    },
    availableForTransfer: true,
    openToTrials: false,
    description: "Commanding central defender with excellent aerial ability. Natural leader who organizes the defense well."
  },
  {
    id: "p5",
    name: "Fatima Bello",
    age: 18,
    nationality: "Nigeria",
    position: "Goalkeeper",
    height: 183,
    weight: 77,
    preferredFoot: "right",
    valueInEuros: 150000,
    currentClub: "Lagos Queens",
    image: "/placeholder.svg",
    stats: {
      pace: 65,
      shooting: 30,
      passing: 72,
      dribbling: 35,
      defending: 40,
      physical: 79
    },
    availableForTransfer: true,
    openToTrials: true,
    description: "Young goalkeeper with exceptional reflexes. Commanding presence in the box and good distribution."
  },
  {
    id: "p6",
    name: "Daniel Amokachi",
    age: 23,
    nationality: "Nigeria",
    position: "Midfielder",
    height: 178,
    weight: 74,
    preferredFoot: "both",
    valueInEuros: 300000,
    currentClub: "Delta Force FC",
    image: "/placeholder.svg",
    stats: {
      pace: 80,
      shooting: 79,
      passing: 85,
      dribbling: 83,
      defending: 75,
      physical: 77
    },
    availableForTransfer: false,
    openToTrials: false,
    description: "Box-to-box midfielder with great energy and technical ability. Contributes both defensively and in attack."
  }
];

// Mock Events
export const mockEvents: Event[] = [
  {
    id: "e1",
    title: "Lagos Youth Talent Trial",
    date: "2023-06-15",
    location: "National Stadium, Lagos",
    type: "trial",
    organizer: "Lagos State FA",
    description: "Open trials for youth players between 16-20 years. Scouts from local and international clubs will be present.",
    image: "/placeholder.svg"
  },
  {
    id: "e2",
    title: "Abuja Cup Tournament",
    date: "2023-07-10",
    location: "Abuja Stadium",
    type: "tournament",
    organizer: "Nigeria Football Federation",
    description: "Annual youth tournament featuring academy teams from across Nigeria and neighboring countries.",
    image: "/placeholder.svg"
  },
  {
    id: "e3",
    title: "Coaching Workshop with Finidi George",
    date: "2023-06-25",
    location: "Lagos Football College",
    type: "workshop",
    organizer: "Nigerian Coaches Association",
    description: "Former Super Eagles star Finidi George hosts a workshop on modern coaching techniques.",
    image: "/placeholder.svg"
  },
  {
    id: "e4",
    title: "Women's Football Showcase",
    date: "2023-08-05",
    location: "Benin City Stadium",
    type: "showcase",
    organizer: "Nigerian Women's Football League",
    description: "Showcase event for top female talents with opportunities to be scouted for local and international clubs.",
    image: "/placeholder.svg"
  }
];

// Mock News
export const mockNews: NewsItem[] = [
  {
    id: "n1",
    title: "Rising Star Chidera Ejuke Attracting European Interest",
    content: "Young Nigerian winger Chidera Ejuke has been scouted by several European clubs after impressive performances in local competitions.",
    date: "2023-05-28",
    source: "Football Nigeria",
    image: "/placeholder.svg",
    category: "transfers"
  },
  {
    id: "n2",
    title: "Lagos Football Academy Launches New Training Facility",
    content: "State-of-the-art training complex unveiled in Lagos to support youth development in Nigerian football.",
    date: "2023-05-25",
    source: "Lagos Sports News",
    image: "/placeholder.svg",
    category: "local"
  },
  {
    id: "n3",
    title: "Nigerian Players Making Waves in European Leagues",
    content: "A look at the Nigerian players who are currently performing well in top European football leagues.",
    date: "2023-05-22",
    source: "Global Football Today",
    image: "/placeholder.svg",
    category: "international"
  },
  {
    id: "n4",
    title: "Youth Development Program Expanded Across Nigeria",
    content: "Nigerian Football Federation announces expansion of grassroots development programs to more states.",
    date: "2023-05-20",
    source: "Academy Scout",
    image: "/placeholder.svg",
    category: "academy"
  }
];

// Pricing Plans
export const pricingPlans: PricingPlan[] = [
  {
    id: "plan1",
    role: "player",
    name: "Player Basic",
    price: 1000, // In Naira
    currency: "NGN",
    period: "month",
    features: [
      "Basic profile listing",
      "Upload 1 highlight video",
      "Connect with 3 clubs or agents monthly",
      "View basic market opportunities"
    ]
  },
  {
    id: "plan2",
    role: "player",
    name: "Player Premium",
    price: 2500,
    currency: "NGN",
    period: "month",
    features: [
      "Featured profile listing",
      "Upload unlimited highlight videos",
      "Connect with unlimited clubs or agents",
      "Priority in search results",
      "Performance statistics",
      "Career progression tools"
    ],
    recommended: true
  },
  {
    id: "plan3",
    role: "coach",
    name: "Coach Standard",
    price: 2000,
    currency: "NGN",
    period: "month",
    features: [
      "Coach profile listing",
      "Advanced player search",
      "Connect with up to 10 players monthly",
      "Post coaching opportunities"
    ]
  },
  {
    id: "plan4",
    role: "agent",
    name: "Agent Basic",
    price: 3000,
    currency: "NGN",
    period: "month",
    features: [
      "Agent profile listing",
      "Represent up to 5 players",
      "Basic search filters",
      "Connect with clubs and players"
    ]
  },
  {
    id: "plan5",
    role: "agent",
    name: "Agent Pro",
    price: 5000,
    currency: "NGN",
    period: "month",
    features: [
      "Featured agent listing",
      "Represent unlimited players",
      "Advanced search filters",
      "Priority connections with clubs",
      "Transfer market alerts",
      "Negotiation tools"
    ],
    recommended: true
  },
  {
    id: "plan6",
    role: "club_staff",
    name: "Club Basic",
    price: 7500,
    currency: "NGN",
    period: "month",
    features: [
      "Club profile listing",
      "Access to player database",
      "Post up to 3 opportunities monthly",
      "Connect with agents and players"
    ]
  },
  {
    id: "plan7",
    role: "club_staff",
    name: "Club Elite",
    price: 15000,
    currency: "NGN",
    period: "month",
    features: [
      "Premium club profile",
      "Advanced talent search tools",
      "Post unlimited opportunities",
      "Player comparison tools",
      "Scout reports and analytics",
      "Exclusive event invitations"
    ],
    recommended: true
  },
  {
    id: "plan8",
    role: "manager",
    name: "Manager Standard",
    price: 3000,
    currency: "NGN",
    period: "month",
    features: [
      "Manager profile",
      "Player search tools",
      "Connect with up to 10 players",
      "Basic analytics"
    ]
  }
];
