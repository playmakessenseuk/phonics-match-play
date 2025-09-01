/**
 * PHONICS MATCHING GAME COMPONENT
 * 
 * Main game component that handles:
 * - Game state management (cards, matches, flips)
 * - Game logic (matching pairs, win conditions)
 * - Card grid layout and responsiveness
 * - Victory screen display
 * 
 * Game Rules:
 * 1. Player can flip up to 2 cards at a time
 * 2. If cards match, they stay face up and are marked as matched
 * 3. If cards don't match, they flip back after a short delay
 * 4. Game is won when all pairs are matched
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
  return <div className="min-h-screen bg-white p-4">
      {/* Game Header */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="text-center mb-6">
          <h1 className="text-4xl md:text-5xl font-bold font-chewy text-heading mb-2">Phonics Memory Game</h1>
          <p className="text-lg font-coming-soon text-paragraph">
            Tap cards to flip them over. Find the images and their matching initial sounds to win!
            <br />
            Complete the game to reveal your special discount code.
          </p>
        </div>

        {/* Game Stats */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
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

      {/* Game Grid */}
      <div className="max-w-4xl mx-auto">
        <div className={cn("grid gap-4 justify-center",
      // 3 rows of 2 cards on mobile, 2 rows of 3 cards on desktop
      "grid-cols-2 sm:grid-cols-3",
      // Maximum card sizes for different screens
      "max-w-sm sm:max-w-lg mx-auto")}>
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
      </div>

      {/* Victory Screen */}
      {gameComplete && <VictoryScreen onPlayAgain={resetGame} />}
    </div>;
};