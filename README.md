# 🎯 Phonics Matching Game

A beautiful, responsive browser-based memory matching game designed to help children learn phonics. Built with React, TypeScript, and Tailwind CSS for optimal performance across mobile, tablet, and desktop devices.

## 🎮 Game Features

- **12 Interactive Cards**: 6 matching pairs with phonics content
- **Responsive Design**: Optimized for all device sizes
- **Kid-Friendly Animations**: Smooth card flips, bounce effects, and celebration animations
- **Victory Screen**: Shows discount code and promotional message upon completion
- **Progress Tracking**: Visual progress bar and move counter
- **Accessibility**: Full keyboard navigation and screen reader support

## 🖼️ Customizing Card Images

### Quick Image Replacement

1. **Prepare Your Images**:
   - Create square images (512x512px recommended)
   - Use JPG or PNG format
   - Name them descriptively (e.g., `card-apple-a.jpg`)

2. **Add Images to Project**:
   ```bash
   # Place your images in the src/assets/ folder
   src/assets/
   ├── card-apple-a.jpg      # Your custom image 1
   ├── card-bear-b.jpg       # Your custom image 2
   ├── card-cat-c.jpg        # Your custom image 3
   ├── card-dog-d.jpg        # Your custom image 4
   ├── card-elephant-e.jpg   # Your custom image 5
   ├── card-fish-f.jpg       # Your custom image 6
   └── card-back.jpg         # Card back design
   ```

3. **Update the Configuration**:
   Edit `src/data/gameData.ts`:
   ```typescript
   // Update import statements
   import cardAppleA from "@/assets/your-new-image-1.jpg";
   import cardBearB from "@/assets/your-new-image-2.jpg";
   // ... continue for all images

   // Update card data descriptions
   export const CARD_DATA: Card[] = [
     {
       id: 1,
       pairId: 1,
       front: cardAppleA,
       alt: "Your custom description for screen readers"
     },
     // ... continue for all cards
   ];
   ```

### Adding More Card Pairs

To expand the game beyond 6 pairs:

1. **Add New Images**: Place additional images in `src/assets/`

2. **Update Constants**:
   ```typescript
   // In src/data/gameData.ts
   export const TOTAL_PAIRS = 8; // Increase number
   ```

3. **Add Card Data**:
   ```typescript
   // Add new pairs to CARD_DATA array
   {
     id: 13,
     pairId: 7,
     front: cardNewImage1,
     alt: "Description of new card"
   },
   {
     id: 14,
     pairId: 7,
     front: cardNewImage1,
     alt: "Description of new card"
   },
   // Continue pattern for additional pairs...
   ```

## 💰 Updating Discount Code & Promotional Message

Edit the victory configuration in `src/data/gameData.ts`:

```typescript
export const VICTORY_CONFIG = {
  title: "🎉 Congratulations! 🎉",           // Victory title
  message: "You've mastered our phonics matching game!", // Success message
  discountCode: "PHONICS20",                 // Your discount code
  discountText: "Use discount code PHONICS20 for 20% off our physical phonics card game!", // Offer description
  callToAction: "Ready to continue learning with our complete phonics set?", // Call to action
  website: "Visit our store to order your physical game today!" // Store link text
};
```

### Connecting to Your Store

To link the "Shop Now" button to your actual store:

1. Open `src/components/VictoryScreen.tsx`
2. Find the "Shop Now" button (around line 95)
3. Replace the alert with your store URL:
   ```typescript
   onClick={() => {
     window.open("https://your-store-url.com", "_blank");
   }}
   ```

## 🎨 Customizing Colors & Design

The game uses a design system defined in `src/index.css` and `src/tailwind.config.ts`. 

### Changing Color Scheme

Edit the CSS variables in `src/index.css`:

```css
:root {
  /* Primary game color (buttons, highlights) */
  --primary: 220 100% 60%;        /* Bright Blue */
  
  /* Secondary color (accents, success states) */
  --secondary: 45 100% 55%;       /* Sunny Yellow */
  
  /* Success color (matches, completion) */
  --success: 145 70% 50%;         /* Fresh Green */
  
  /* Accent color (special elements) */
  --accent: 25 100% 60%;          /* Playful Orange */
  
  /* Background gradient */
  --gradient-game-bg: linear-gradient(145deg, hsl(var(--background)), hsl(220 50% 99%));
}
```

### Customizing Animations

Animation timing can be adjusted by modifying these CSS variables:

```css
:root {
  --flip-duration: 0.6s;    /* Card flip speed */
  --match-duration: 0.8s;   /* Match celebration duration */
  --bounce-duration: 0.4s;  /* Button bounce timing */
}
```

## 🧪 Testing the Game

### Manual Testing Checklist

- [ ] Cards flip when clicked/tapped
- [ ] Matching pairs stay face up
- [ ] Non-matching pairs flip back after delay
- [ ] Victory screen appears after all matches
- [ ] Discount code displays correctly
- [ ] "Play Again" button resets the game
- [ ] Game works on mobile devices
- [ ] Game works on tablets
- [ ] Game works on desktop
- [ ] Keyboard navigation works (Tab, Enter, Space)

### Automated Testing Setup

Basic test examples are included. To expand testing:

```bash
# Install testing dependencies
npm install --save-dev @testing-library/react @testing-library/jest-dom vitest

# Run tests
npm test
```

Example test structure in `src/components/__tests__/`:

```typescript
// GameCard.test.tsx
import { render, fireEvent } from '@testing-library/react';
import { GameCard } from '../GameCard';

test('card flips when clicked', () => {
  const mockCard = { id: 1, pairId: 1, front: 'test.jpg', alt: 'Test card' };
  const mockOnClick = jest.fn();
  
  const { getByRole } = render(
    <GameCard 
      card={mockCard}
      isFlipped={false}
      isMatched={false}
      isDisabled={false}
      onClick={mockOnClick}
    />
  );
  
  fireEvent.click(getByRole('button'));
  expect(mockOnClick).toHaveBeenCalledWith(mockCard);
});
```

## 🚀 Deployment

### Static Hosting Options

The game is built as a static web application and can be hosted on:

- **Netlify**: Drag and drop the `dist` folder
- **Vercel**: Connect your GitHub repository
- **GitHub Pages**: Use the `gh-pages` branch
- **AWS S3**: Upload to S3 bucket with static hosting
- **Any web server**: Upload the built files

### Build Process

```bash
# Install dependencies
npm install

# Build for production
npm run build

# Preview production build locally
npm run preview
```

The built files will be in the `dist/` folder.

### Custom Domain Setup

After deploying, you can connect a custom domain:

1. **Purchase Domain**: Buy from registrar (GoDaddy, Namecheap, etc.)
2. **DNS Configuration**: Point your domain to hosting provider
3. **SSL Certificate**: Enable HTTPS (usually automatic with modern hosts)

## 📁 Project Structure

```
src/
├── assets/                 # Game images
│   ├── card-apple-a.jpg   # Card front images
│   ├── card-bear-b.jpg
│   ├── ...
│   └── card-back.jpg      # Card back design
├── components/            # React components
│   ├── GameCard.tsx       # Individual card component
│   ├── VictoryScreen.tsx  # Win screen with discount
│   └── PhonicGame.tsx     # Main game logic
├── data/                  # Game configuration
│   └── gameData.ts        # Cards, images, messages
├── pages/                 # App pages
│   └── Index.tsx          # Main page
└── lib/                   # Utilities
    └── utils.ts           # Helper functions
```

## 🔧 Version Control with Git

### Initial Setup

```bash
# Initialize repository (if not done)
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial phonics matching game"

# Add remote repository
git remote add origin https://github.com/yourusername/phonics-game.git

# Push to GitHub
git push -u origin main
```

### Making Changes

```bash
# Create feature branch
git checkout -b update-card-images

# Make your changes...
# Update images, modify gameData.ts, etc.

# Stage and commit changes
git add .
git commit -m "Update card images with new phonics content"

# Push branch
git push origin update-card-images

# Merge back to main (via pull request or directly)
git checkout main
git merge update-card-images
git push origin main
```

### Tracking Changes

```bash
# View recent changes
git log --oneline

# See what files changed
git status

# View specific changes
git diff filename.tsx

# Revert specific file
git checkout -- filename.tsx
```

## 🌟 Future Improvements

### Suggested Enhancements

1. **Sound Effects**:
   - Card flip sounds
   - Match celebration sounds
   - Background music toggle

2. **Difficulty Levels**:
   - Easy: 4 pairs
   - Medium: 6 pairs (current)
   - Hard: 8 pairs

3. **Progress Tracking**:
   - Best time records
   - Completion statistics
   - Achievement badges

4. **Multiplayer Mode**:
   - Turn-based gameplay
   - Score competition
   - Online multiplayer

5. **Accessibility Improvements**:
   - High contrast mode
   - Larger text options
   - Voice instructions

6. **Analytics**:
   - Track game completion rates
   - Monitor popular features
   - A/B test different designs

### Implementation Ideas

```typescript
// Example: Adding sound effects
const playSound = (soundType: 'flip' | 'match' | 'victory') => {
  const audio = new Audio(`/sounds/${soundType}.mp3`);
  audio.play().catch(console.warn);
};

// Example: Difficulty settings
export const DIFFICULTY_LEVELS = {
  easy: { pairs: 4, timeLimit: null },
  medium: { pairs: 6, timeLimit: 120 },
  hard: { pairs: 8, timeLimit: 180 }
};
```

## ❓ Troubleshooting

### Common Issues

**Cards not displaying images**:
- Check image file paths in `gameData.ts`
- Ensure images are in `src/assets/` folder
- Verify image format (JPG/PNG)

**Game not responsive on mobile**:
- Check viewport meta tag in `index.html`
- Verify Tailwind responsive classes
- Test on actual devices, not just browser dev tools

**Victory screen not showing**:
- Check `TOTAL_PAIRS` constant matches actual pair count
- Verify all cards have correct `pairId` values
- Check browser console for JavaScript errors

**Build errors**:
- Run `npm install` to ensure dependencies
- Check for TypeScript errors: `npm run type-check`
- Verify all imports are correct

### Getting Help

1. **Check Browser Console**: Look for error messages
2. **Review Documentation**: Reread relevant sections
3. **Test Incrementally**: Make small changes and test
4. **Community Support**: React and TypeScript communities

## 📞 Support & Contact

This game was built with modern web technologies:
- **React 18**: Component framework
- **TypeScript**: Type safety
- **Tailwind CSS**: Styling system
- **Vite**: Build tool

For technical questions or customization help, consider:
- React documentation: https://react.dev
- Tailwind CSS docs: https://tailwindcss.com
- TypeScript handbook: https://typescriptlang.org

---

**Happy Gaming! 🎮✨**

*Built with ❤️ for kids learning phonics*