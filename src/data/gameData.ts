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

// Import letter card images
import cardLetterA from "@/assets/card-letter-a.jpg";
import cardLetterB from "@/assets/card-letter-b.jpg";
import cardLetterC from "@/assets/card-letter-c.jpg";

// Import picture card images - REPLACE THESE WITH YOUR OWN IMAGES
import cardAntA from "@/assets/card-ant-a.jpg";
import cardBedB from "@/assets/card-bed-b.jpg";
import cardCatC from "@/assets/card-cat-c.jpg";
import cardBack from "@/assets/card-back.jpg";

// Card interface definition
export interface Card {
  id: number;
  pairId: number;
  type: 'letter' | 'picture';
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
 * - pairId: Groups cards into matching pairs (1-3)
 * - type: Either 'letter' or 'picture' to distinguish card types
 * - front: The image shown when card is flipped
 * - alt: Accessible description of the card image
 * 
 * MATCHING PAIRS:
 * - Letter cards match with their corresponding picture cards
 * - Each pair has the same pairId but different types
 * 
 * TO ADD MORE CARDS: 
 * 1. Add new letter and picture images to src/assets/
 * 2. Import them above
 * 3. Add letter and picture card entries with same pairId
 * 4. Update TOTAL_PAIRS constant
 */
export const CARD_DATA: Card[] = [
  // Pair 1: Letter A ↔ Ant
  {
    id: 1,
    pairId: 1,
    type: 'letter',
    front: cardLetterA,
    alt: "Letter A - matches with ant"
  },
  {
    id: 2,
    pairId: 1,
    type: 'picture',
    front: cardAntA,
    alt: "Ant picture - matches with letter A"
  },
  
  // Pair 2: Letter B ↔ Bed
  {
    id: 3,
    pairId: 2,
    type: 'letter',
    front: cardLetterB,
    alt: "Letter B - matches with bed"
  },
  {
    id: 4,
    pairId: 2,
    type: 'picture',
    front: cardBedB,
    alt: "Bed picture - matches with letter B"
  },
  
  // Pair 3: Letter C ↔ Cat
  {
    id: 5,
    pairId: 3,
    type: 'letter',
    front: cardLetterC,
    alt: "Letter C - matches with cat"
  },
  {
    id: 6,
    pairId: 3,
    type: 'picture',
    front: cardCatC,
    alt: "Cat picture - matches with letter C"
  }
];

/**
 * DISCOUNT CODE CONFIGURATION
 * 
 * This message is shown when the player completes the game.
 * Update this to change your promotional message or discount code.
 */
export const VICTORY_CONFIG = {
  title: "Congratulations!",
  message: "You've mastered our phonics matching game!",
  discountCode: "PHONICS20",
  discountText: "Use this discount code to order the full physical game!",
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
// Cards match if they have the same pairId but different types (letter matches picture)
export const isMatchingPair = (card1: Card, card2: Card): boolean => {
  return card1.pairId === card2.pairId && 
         card1.id !== card2.id && 
         card1.type !== card2.type;
};
