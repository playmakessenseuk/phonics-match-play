/**
 * VICTORY SCREEN COMPONENT
 * 
 * Displays congratulations message and discount code when player completes the game.
 * Includes confetti animation and call-to-action for purchasing the physical game.
 */

import { VICTORY_CONFIG } from "@/data/gameData";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Trophy, Gift, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
interface VictoryScreenProps {
  onPlayAgain: () => void;
}
export const VictoryScreen = ({
  onPlayAgain
}: VictoryScreenProps) => {
  const [showConfetti, setShowConfetti] = useState(true);

  // Hide confetti after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 3000);
    return () => clearTimeout(timer);
  }, []);
  return <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-sm">
      {/* Confetti Animation */}
      {showConfetti && <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(20)].map((_, i) => <div key={i} className={cn("absolute w-2 h-2 rounded-full animate-confetti-fall", i % 4 === 0 && "bg-primary", i % 4 === 1 && "bg-secondary", i % 4 === 2 && "bg-success", i % 4 === 3 && "bg-accent")} style={{
        left: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 2}s`,
        animationDuration: `${2 + Math.random() * 2}s`
      }} />)}
        </div>}

      {/* Victory Card */}
      <Card className="w-full max-w-md mx-4 animate-victory-celebration shadow-card-hover">
        <CardContent className="p-8 text-center space-y-6">
          {/* Trophy Icon */}
          <div className="flex justify-center">
            <div className="relative">
              <Trophy className="w-16 h-16 text-secondary animate-bounce" />
              <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-accent animate-pulse" />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold text-foreground">
            {VICTORY_CONFIG.title}
          </h1>

          {/* Success Message */}
          

          {/* Discount Code Section */}
          <div className="bg-game-victory rounded-lg p-4 border-2 border-secondary">
            
            
            {/* Discount Code */}
            <div className="bg-background rounded p-3 mb-3">
              <div className="text-sm text-muted-foreground mb-1">Discount Code:</div>
              <div className="text-2xl font-bold text-primary tracking-wider">
                {VICTORY_CONFIG.discountCode}
              </div>
            </div>
            
            <p className="text-sm text-foreground">
              {VICTORY_CONFIG.discountText}
            </p>
          </div>

          {/* Call to Action */}
          <div className="space-y-3">
            
            
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button onClick={onPlayAgain} variant="outline" className="flex-1">
              Play Again
            </Button>
            <Button onClick={() => {
            // In a real implementation, this could open a store link
            alert("This would redirect to your online store!");
          }} className="flex-1 bg-gradient-secondary text-secondary-foreground hover:opacity-90">
              Shop Now
            </Button>
          </div>

          {/* Game Stats */}
          <div className="text-xs text-muted-foreground pt-4 border-t border-border">
            Game completed! You found all 6 matching pairs.
          </div>
        </CardContent>
      </Card>
    </div>;
};