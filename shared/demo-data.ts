export interface DemoQuery {
  id: string;
  category: string;
  question: string;
  answer: string;
}

export const demoQueries: DemoQuery[] = [
  {
    id: "1",
    category: "Crop Selection",
    question: "Which crop should I grow in Maharashtra during the Kharif season?",
    answer: "In Kharif, you can grow soybean, cotton, tur, or paddy depending on soil type. For black cotton soil, soybean and cotton give high yield."
  },
  {
    id: "2",
    category: "Fertilizer Usage",
    question: "How much urea should I use for 1 acre of wheat?",
    answer: "For 1 acre, apply 50 kg urea in two splits: half at sowing and half at tillering stage for better yield."
  },
  {
    id: "3",
    category: "Pest Control",
    question: "My brinjal crop has holes in leaves. What should I do?",
    answer: "This is likely due to fruit & shoot borer. Spray neem oil (5 ml per liter water) or Bacillus thuringiensis for eco-friendly control."
  },
  {
    id: "4",
    category: "Irrigation",
    question: "How often should I water my tomato crop?",
    answer: "Water every 7–10 days in cool season and every 5–6 days in summer. Use drip irrigation to save water and prevent fungal diseases."
  },
  {
    id: "5",
    category: "Soil Health",
    question: "How can I improve soil fertility naturally?",
    answer: "Use green manures (like sunhemp), apply compost/FYM, and rotate with legumes (pulses) to increase nitrogen naturally."
  },
  {
    id: "6",
    category: "Government Scheme",
    question: "Are there any subsidies for drip irrigation?",
    answer: "Yes, under the Pradhan Mantri Krishi Sinchai Yojana (PMKSY), farmers get 55–75% subsidy for drip and sprinkler systems."
  },
  {
    id: "7",
    category: "Crop Disease",
    question: "My wheat crop is turning yellow. What is the reason?",
    answer: "Yellowing may be due to nitrogen deficiency or yellow rust disease. Apply 20 kg urea per acre or consult a local Krishi officer if rust is seen."
  },
  {
    id: "8",
    category: "Weather Advisory",
    question: "It is raining continuously, should I sow cotton now?",
    answer: "Avoid sowing during heavy rain. Wait until the soil has proper moisture but not waterlogging for better germination."
  },
  {
    id: "9",
    category: "Storage",
    question: "How to store harvested paddy safely?",
    answer: "Dry the grains to 12% moisture, store in gunny bags, and keep in a ventilated godown with neem leaves to avoid insect attack."
  },
  {
    id: "10",
    category: "Crop Yield",
    question: "What is the average yield of sugarcane per acre?",
    answer: "With proper care, sugarcane gives 35–40 tons per acre in India. Improved varieties may yield up to 50 tons."
  },
  {
    id: "11",
    category: "Animal Care",
    question: "What to feed cows in summer to increase milk?",
    answer: "Provide green fodder (maize, jowar), clean water, and mineral mixture. Avoid excess dry fodder as it reduces milk yield."
  },
  {
    id: "12",
    category: "Seed Selection",
    question: "Which hybrid paddy seeds are best for high yield?",
    answer: "Varieties like MTU-1010, IR-64, and hybrid PHB-71 are popular with high yield potential. Choose based on local recommendation."
  },
  {
    id: "13",
    category: "Organic Farming",
    question: "How can I manage pests without chemicals?",
    answer: "Use neem oil, pheromone traps, cow urine-based sprays, and intercropping with marigold to reduce pest population naturally."
  },
  {
    id: "14",
    category: "Crop Insurance",
    question: "How do I apply for PM Fasal Bima Yojana?",
    answer: "You can apply through Common Service Centers (CSC), banks, or the PMFBY website. Premium is subsidized up to 98% by government."
  },
  {
    id: "15",
    category: "Market Prices",
    question: "What is the price of onions in the nearest mandi?",
    answer: "Please check Agmarknet portal or e-NAM for real-time mandi rates. Nearby Nashik mandi currently gives higher onion prices."
  },
  {
    id: "16",
    category: "Water-Saving Tips",
    question: "How can I save water in paddy farming?",
    answer: "Use System of Rice Intensification (SRI) method and alternate wetting & drying (AWD). These reduce water use by 30–40%."
  },
  {
    id: "17",
    category: "Fertilizer Subsidy",
    question: "Are fertilizers available at subsidized rates?",
    answer: "Yes, urea, DAP, MOP, and NPK are available at subsidized rates through government-approved dealers. Check with your local cooperative society."
  },
  {
    id: "18",
    category: "Crop Rotation",
    question: "After harvesting wheat, which crop should I grow?",
    answer: "Grow pulses like moong or urad after wheat. It improves soil nitrogen and reduces pest cycles."
  },
  {
    id: "19",
    category: "Weed Control",
    question: "My groundnut crop has too many weeds. What can I do?",
    answer: "Do manual weeding at 20 and 40 days after sowing. If needed, apply Pendimethalin herbicide as pre-emergence."
  },
  {
    id: "20",
    category: "Future Farming",
    question: "Is mushroom cultivation profitable?",
    answer: "Yes, mushroom farming has high demand and low land requirement. With proper training, you can earn ₹1–1.5 lakh per 100 sq.ft in one season."
  }
];

export const getCategorizedQueries = () => {
  const categories: Record<string, DemoQuery[]> = {};
  
  demoQueries.forEach(query => {
    if (!categories[query.category]) {
      categories[query.category] = [];
    }
    categories[query.category].push(query);
  });
  
  return categories;
};

export const getRandomQuery = (): DemoQuery => {
  const randomIndex = Math.floor(Math.random() * demoQueries.length);
  return demoQueries[randomIndex];
};

export const searchQueries = (searchTerm: string): DemoQuery[] => {
  const lowercaseSearch = searchTerm.toLowerCase();
  return demoQueries.filter(query => 
    query.question.toLowerCase().includes(lowercaseSearch) ||
    query.answer.toLowerCase().includes(lowercaseSearch) ||
    query.category.toLowerCase().includes(lowercaseSearch)
  );
};