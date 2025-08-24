/**
 * GAME CARD COMPONENT
 * 
 * Handles individual card display, flipping animations, and user interactions.
 * Each card can be in one of several states: face down, flipped, matched, or disabled.
 */

import { Card, CARD_BACK_IMAGE } from "@/data/gameData";
import { cn } from "@/lib/utils";

interface GameCardProps {
  card: Card;
  isFlipped: boolean;
  isMatched: boolean;
  isDisabled: boolean;
  onClick: (card: Card) => void;
}

export const GameCard = ({ 
  card, 
  isFlipped, 
  isMatched, 
  isDisabled, 
  onClick 
}: GameCardProps) => {
  const handleClick = () => {
    // Prevent clicks when card is already flipped, matched, or game is disabled
    if (isFlipped || isMatched || isDisabled) return;
    onClick(card);
  };

  return (
    <div
      className={cn(
        // Base card styling using design system
        "relative w-full aspect-square cursor-pointer rounded-lg overflow-hidden",
        "bg-card shadow-card hover:shadow-card-hover",
        "transition-all duration-300 ease-out",
        "transform-gpu perspective-1000",
        
        // Animation states
        "animate-card-entrance",
        
        // Interactive states
        isDisabled && "cursor-not-allowed opacity-75",
        isMatched && "shadow-match animate-match-bounce",
        !isFlipped && !isMatched && "hover:scale-105 hover:-translate-y-1",
        
        // Flip animation
        isFlipped && "animate-card-flip"
      )}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      aria-label={isFlipped ? card.alt : "Face down card - click to reveal"}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
    >
      {/* Card Front (shown when flipped or matched) */}
      <div
        className={cn(
          "absolute inset-0 w-full h-full",
          "transition-opacity duration-300",
          isFlipped || isMatched ? "opacity-100" : "opacity-0"
        )}
      >
        <img
          src={card.front}
          alt={card.alt}
          className="w-full h-full object-cover rounded-lg"
          loading="lazy"
        />
        
        {/* Matched card overlay effect */}
        {isMatched && (
          <div className="absolute inset-0 bg-gradient-success opacity-20 rounded-lg" />
        )}
      </div>

      {/* Card Back (shown when face down) */}
      <div
        className={cn(
          "absolute inset-0 w-full h-full",
          "transition-opacity duration-300",
          !isFlipped && !isMatched ? "opacity-100" : "opacity-0"
        )}
      >
        <img
          src={CARD_BACK_IMAGE}
          alt="Card back - click to reveal"
          className="w-full h-full object-cover rounded-lg"
          loading="lazy"
        />
        
        {/* Hover glow effect for unflipped cards */}
        {!isDisabled && !isFlipped && !isMatched && (
          <div className="absolute inset-0 bg-gradient-primary opacity-0 hover:opacity-10 rounded-lg transition-opacity duration-300" />
        )}
      </div>

      {/* Touch feedback for mobile */}
      <div className="absolute inset-0 bg-primary opacity-0 active:opacity-10 transition-opacity duration-150 rounded-lg" />
    </div>
  );
};