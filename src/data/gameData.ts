/**
 * PHONICS GAME CARD CONFIGURATION
 * 
 * This file contains all the card data for the phonics matching game.
 * To customize the game:
 * 
 * 1. REPLACING IMAGES: 
 *    - Add your own images to the src/assets/ folder
 *    - Update the import statements below to use your new images
 *    - Make sure images are square (512x512px recommended) for best results
 * 
 * 2. CHANGING CONTENT:
 *    - Update the 'front' and 'alt' properties for each card
 *    - The 'id' should remain unique for each card
 *    - Keep pairs with matching 'pairId' numbers
 * 
 * 3. ADDING MORE CARDS:
 *    - Add new card objects to the CARD_DATA array
 *    - Ensure each new pair has the same 'pairId'
 *    - Update TOTAL_PAIRS constant if adding more pairs
 */

// Import card images - REPLACE THESE WITH YOUR OWN IMAGES
import cardAppleA from "@/assets/card-apple-a.jpg";
import cardBearB from "@/assets/card-bear-b.jpg";
import cardCatC from "@/assets/card-cat-c.jpg";
import cardDogD from "@/assets/card-dog-d.jpg";
import cardElephantE from "@/assets/card-elephant-e.jpg";
import cardFishF from "@/assets/card-fish-f.jpg";
import cardBack from "@/assets/card-back.jpg";

// Card interface definition
export interface Card {
  id: number;
  pairId: number;
  front: string;
  alt: string;
}

// Game configuration constants
export const TOTAL_PAIRS = 3;
export const TOTAL_CARDS = TOTAL_PAIRS * 2;

// Card back image - REPLACE WITH YOUR OWN CARD BACK DESIGN
export const CARD_BACK_IMAGE = cardBack;

/**
 * CARD DATA CONFIGURATION
 * 
 * Each card object represents one game card:
 * - id: Unique identifier for the card
 * - pairId: Groups cards into matching pairs (1-6)
 * - front: The image shown when card is flipped
 * - alt: Accessible description of the card image
 * 
 * TO ADD MORE CARDS: Duplicate pairs and increment pairId
 * TO CHANGE IMAGES: Update the import statements above and the 'front' properties below
 */
export const CARD_DATA: Card[] = [
  // Pair 1: Apple A
  {
    id: 1,
    pairId: 1,
    front: cardAppleA,
    alt: "Red apple with letter A - phonics learning card"
  },
  {
    id: 2,
    pairId: 1,
    front: cardAppleA,
    alt: "Red apple with letter A - phonics learning card"
  },
  
  // Pair 2: Bear B
  {
    id: 3,
    pairId: 2,
    front: cardBearB,
    alt: "Brown teddy bear with letter B - phonics learning card"
  },
  {
    id: 4,
    pairId: 2,
    front: cardBearB,
    alt: "Brown teddy bear with letter B - phonics learning card"
  },
  
  // Pair 3: Cat C
  {
    id: 5,
    pairId: 3,
    front: cardCatC,
    alt: "Yellow cat with letter C - phonics learning card"
  },
  {
    id: 6,
    pairId: 3,
    front: cardCatC,
    alt: "Yellow cat with letter C - phonics learning card"
  }
];

/**
 * DISCOUNT CODE CONFIGURATION
 * 
 * This message is shown when the player completes the game.
 * Update this to change your promotional message or discount code.
 */
export const VICTORY_CONFIG = {
  title: "🎉 Congratulations! 🎉",
  message: "You've mastered our phonics matching game!",
  discountCode: "PHONICS20",
  discountText: "Use discount code PHONICS20 for 20% off our physical phonics card game!",
  callToAction: "Ready to continue learning with our complete phonics set?",
  website: "Visit our store to order your physical game today!"
};

/**
 * UTILITY FUNCTIONS
 */

// Shuffle array function for randomizing card positions
export const shuffleCards = (cards: Card[]): Card[] => {
  const shuffled = [...cards];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Check if two cards form a matching pair
export const isMatchingPair = (card1: Card, card2: Card): boolean => {
  return card1.pairId === card2.pairId && card1.id !== card2.id;
};