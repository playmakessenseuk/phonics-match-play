/**
 * PHONICS MATCHING GAME COMPONENT
 * 
 * Main game component that handles:
 * - Game state management (cards, matches, flips)
 * - Game logic (matching pairs, win conditions)
 * - Mobile-first responsive card grid layout (3 columns on all devices)
 * - Victory screen display
 * 
 * Game Rules:
 * 1. Player can flip up to 2 cards at a time
 * 2. If cards match, they stay face up and are marked as matched
 * 3. If cards don't match, they flip back after a short delay
 * 4. Game is won when all pairs are matched
 * 
 * Layout Features:
 * - Mobile-optimized design with game tiles positioned at the very top
 * - Responsive 3-column grid that scales from mobile (280px) to desktop (500px)
 * - Game stats and controls moved to bottom for better mobile UX
 * - Consistent 2 rows of 3 tiles layout across all device sizes
 */

import { useState, useEffect, useCallback } from "react";
import { Card, CARD_DATA, TOTAL_PAIRS, shuffleCards, isMatchingPair, VICTORY_CONFIG } from "@/data/gameData";
import { GameCard } from "./GameCard";
import { VictoryScreen } from "./VictoryScreen";
import { Button } from "@/components/ui/button";
import { RotateCcw, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";

// Game state interface
interface GameState {
  cards: Card[];
  flippedCards: Card[];
  matchedPairs: number[];
  isProcessing: boolean;
  gameComplete: boolean;
  moves: number;
}

// Initial game state
const createInitialState = (): GameState => ({
  cards: shuffleCards(CARD_DATA),
  flippedCards: [],
  matchedPairs: [],
  isProcessing: false,
  gameComplete: false,
  moves: 0
});
export const PhonicGame = () => {
  const [gameState, setGameState] = useState<GameState>(createInitialState);
  const {
    cards,
    flippedCards,
    matchedPairs,
    isProcessing,
    gameComplete,
    moves
  } = gameState;

  /**
   * Handle card click - main game interaction
   */
  const handleCardClick = useCallback((clickedCard: Card) => {
    // Prevent actions during processing or if game is complete
    if (isProcessing || gameComplete) return;

    // Prevent clicking already flipped or matched cards
    if (flippedCards.some(card => card.id === clickedCard.id) || matchedPairs.includes(clickedCard.pairId)) return;
    setGameState(prevState => {
      const newFlippedCards = [...prevState.flippedCards, clickedCard];
      const newMoves = prevState.moves + 1;

      // If this is the second card flipped, check for match
      if (newFlippedCards.length === 2) {
        const [firstCard, secondCard] = newFlippedCards;
        if (isMatchingPair(firstCard, secondCard)) {
          // Match found! Add to matched pairs
          const newMatchedPairs = [...prevState.matchedPairs, clickedCard.pairId];
          const gameComplete = newMatchedPairs.length === TOTAL_PAIRS;
          return {
            ...prevState,
            flippedCards: [],
            matchedPairs: newMatchedPairs,
            gameComplete,
            moves: newMoves
          };
        } else {
          // No match - set processing state and prepare to flip back
          return {
            ...prevState,
            flippedCards: newFlippedCards,
            isProcessing: true,
            moves: newMoves
          };
        }
      }

      // First card flipped
      return {
        ...prevState,
        flippedCards: newFlippedCards,
        moves: newMoves
      };
    });
  }, [isProcessing, gameComplete, flippedCards, matchedPairs]);

  /**
   * Handle non-matching pairs - flip cards back after delay
   */
  useEffect(() => {
    if (flippedCards.length === 2 && isProcessing) {
      const timer = setTimeout(() => {
        setGameState(prevState => ({
          ...prevState,
          flippedCards: [],
          isProcessing: false
        }));
      }, 1000); // 1 second delay to let player see both cards

      return () => clearTimeout(timer);
    }
  }, [flippedCards.length, isProcessing]);

  /**
   * Reset game to initial state
   */
  const resetGame = useCallback(() => {
    setGameState(createInitialState());
  }, []);

  /**
   * Check if a card should be displayed as flipped
   */
  const isCardFlipped = (card: Card): boolean => {
    return flippedCards.some(flipped => flipped.id === card.id) || matchedPairs.includes(card.pairId);
  };

  /**
   * Check if a card is matched
   */
  const isCardMatched = (card: Card): boolean => {
    return matchedPairs.includes(card.pairId);
  };
  return <div className="min-h-screen bg-white pb-4">
      {/* Game Grid */}
      <div className="max-w-4xl mx-auto pt-4">
        <div className={cn("grid gap-3 sm:gap-6 justify-center",
      // 3 columns on all devices for consistent layout
      "grid-cols-3", 
      // Responsive sizing: very small on mobile, medium on tablet, larger on desktop
      "max-w-[280px] sm:max-w-[400px] lg:max-w-[500px] mx-auto",
      // Ensure proper spacing and centering
      "px-2 sm:px-4")}>
          {cards.map(card => <GameCard key={card.id} card={card} isFlipped={isCardFlipped(card)} isMatched={isCardMatched(card)} isDisabled={isProcessing} onClick={handleCardClick} />)}
        </div>

        {/* Progress Indicator */}
        <div className="mt-8 max-w-md mx-auto">
          <div className="flex justify-between text-sm font-coming-soon text-paragraph mb-2">
            <span>Progress</span>
            <span>{matchedPairs.length}/{TOTAL_PAIRS} pairs</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div className="bg-gradient-success h-2 rounded-full transition-all duration-500 ease-out" style={{
            width: `${matchedPairs.length / TOTAL_PAIRS * 100}%`
          }} />
          </div>
        </div>

        {/* Instructions */}
        <div className="text-center mt-8 text-sm font-coming-soon text-paragraph max-w-md mx-auto">
          
        </div>

        {/* Game Stats - Moved to Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
          <div className="flex items-center gap-6 text-sm font-coming-soon text-paragraph">
            <div className="flex items-center gap-2">
              <Trophy className="w-4 h-4 text-success" />
              <span>Matches: {matchedPairs.length}/{TOTAL_PAIRS}</span>
            </div>
            <div>
              Moves: {moves}
            </div>
          </div>

          <Button onClick={resetGame} variant="outline" size="sm" className="flex items-center gap-2 font-coming-soon text-paragraph">
            <RotateCcw className="w-4 h-4" />
            New Game
          </Button>
        </div>
      </div>

      {/* Victory Screen */}
      {gameComplete && <VictoryScreen onPlayAgain={resetGame} />}
    </div>;
};