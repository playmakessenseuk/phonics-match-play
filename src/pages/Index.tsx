/**
 * PHONICS MATCHING GAME - MAIN PAGE
 * 
 * This is the entry point for the kids' phonics matching game.
 * The game helps children learn letter-sound relationships through fun matching gameplay.
 * 
 * Features:
 * - 10 cards (5 matching pairs) with phonics content
 * - Responsive design for mobile, tablet, and desktop
 * - Kid-friendly animations and colorful design
 * - Victory screen with discount code for physical game
 * - Easy customization system for cards and content
 */

import { PhonicGame } from "@/components/PhonicGame";

const Index = () => {
  return (
    <>
      {/* SEO Meta Tags */}
      <title>Phonics Matching Game - Learn Letters & Sounds</title>
      <meta 
        name="description" 
        content="Fun phonics matching game for kids! Learn letters and sounds by finding matching pairs. Complete the game to unlock a special discount on our physical phonics cards." 
      />
      <meta 
        name="keywords" 
        content="phonics, kids games, learning, letters, sounds, memory game, educational, children" 
      />
      
      {/* Main Game Component */}
      <main>
        <PhonicGame />
      </main>
    </>
  );
};

export default Index;
