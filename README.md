# 🎯 Phonics Letter-Picture Matching Game

A beautiful, educational memory matching game where children match letters with their corresponding pictures (A↔Ant, B↔Bed, C↔Cat). Built with React, TypeScript, and Tailwind CSS for a responsive, accessible learning experience. Completing the game gives the user a discount code to buy the full physical version! 

## 🎮 Game Features

- **Letter-Picture Matching**: 3 pairs where letters match corresponding pictures (A↔Ant, B↔Bed, C↔Cat)
- **6 Interactive Cards**: Arranged in 2 rows of 3 (desktop) or 3 rows of 2 (mobile)
- **Educational Design**: Clean white background with professional card styling (#649494 card backs)
- **Kid-Friendly Animations**: Smooth card flips, bounce effects, and celebration animations
- **Victory Screen**: Shows discount code and promotional message (no trophy icon)
- **Progress Tracking**: Visual progress bar and move counter
- **Accessibility**: Full keyboard navigation and screen reader support

## 🔧 Setting Up Your Letter-Picture Pairs

### Understanding the Game Structure

The game uses a **letter-picture matching system**:
- **Letter Cards**: Display individual letters (A, B, C) 
- **Picture Cards**: Display corresponding images (Ant, Bed, Cat)
- **Matching**: Players match letter cards with their corresponding picture cards

### 1. Prepare Your Images

**For Letter Cards**:
- Large, bold letters on clean white backgrounds using Sassoon Primary font
- Black letters on white background for high contrast and readability
- Square aspect ratio (512x512px recommended)  
- Letters should be centered and consistently sized

**For Picture Cards**: 
- Clear, recognizable images representing the letter sound
- Child-friendly illustrations
- Clean white or simple backgrounds
- Objects that clearly represent the corresponding letter

### 2. Add Images to Project

```bash
# Place your images in the src/assets/ folder
src/assets/
├── card-letter-a.jpg     # Letter A card
├── card-letter-b.jpg     # Letter B card  
├── card-letter-c.jpg     # Letter C card
├── card-ant-a.jpg        # Ant picture (matches A)
├── card-bed-b.jpg        # Bed picture (matches B)
├── card-cat-c.jpg        # Cat picture (matches C)
└── card-back.jpg         # Card back design (or solid color)
```

### 3. Update the Configuration

Edit `src/data/gameData.ts`:

```typescript
// Import letter and picture images
import cardLetterA from "@/assets/card-letter-a.jpg";
import cardAntA from "@/assets/card-ant-a.jpg";
// ... continue for all images

// Update card data with letter-picture pairs
export const CARD_DATA: Card[] = [
  // Each pair needs one letter and one picture card
  {
    id: 1,
    pairId: 1,
    type: 'letter',        // Letter card type
    front: cardLetterA,
    alt: "Letter A - matches with ant"
  },
  {
    id: 2,
    pairId: 1, 
    type: 'picture',       // Picture card type
    front: cardAntA,
    alt: "Ant picture - matches with letter A"
  }
  // ... continue for all pairs
];
```

### 4. Add Sassoon Primary Font (Required for Letter Cards)

The game uses Sassoon Primary font for educational letter cards. This font is already included in `index.html`:

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Sassoon+Primary:wght@400;700&display=swap">
```

If you need to add additional fonts for customization, add them to the `<head>` section of `index.html` before the title tag.

### Adding More Letter-Picture Pairs

To expand the game beyond 3 pairs:

1. **Add New Images**: 
   - Create or find letter images (e.g., card-letter-d.jpg)
   - Create or find corresponding picture images (e.g., card-dog-d.jpg)
   - Place both in `src/assets/`

2. **Update Constants**:
   ```typescript
   // In src/data/gameData.ts
   export const TOTAL_PAIRS = 4; // Increase number
   ```

3. **Add Card Data Pairs**:
   ```typescript
    // Add new pairs to CARD_DATA array
    // Each pair needs one letter card and one picture card
    {
      id: 7,
      pairId: 4,
      type: 'letter',
      front: cardLetterD,
      alt: "Letter D - matches with dog"
    },
    {
      id: 8,
      pairId: 4,
      type: 'picture',
      front: cardDogD,
      alt: "Dog picture - matches with letter D"
    },
   // Continue pattern for additional pairs...
   ```

**Important**: Each letter-picture pair must have:
- Same `pairId` number
- Different `type` values ('letter' and 'picture')  
- Unique `id` numbers

## 💰 Updating Discount Code & Promotional Message

Edit the victory configuration in `src/data/gameData.ts`:

```typescript
export const VICTORY_CONFIG = {
  title: "🎉 Congratulations! 🎉",           // Victory title
  message: "You've mastered our phonics matching game!", // Success message
  discountCode: "PHONICS20",                 // Your discount code
  discountText: "Use this discount code to order the full physical game!", // Offer description
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

### Customizing Card Back Design

The card backs can be customized in two ways:

1. **Image-based**: Replace `src/assets/card-back.jpg` with your own design
2. **Solid Color**: Set a solid color in `src/components/GameCard.tsx` by updating the card back style

Current card back uses solid color `#649494` for a clean, professional look.

### Creating Letter Cards

Letter cards should have:
- Black letters on clean white backgrounds using Sassoon Primary font
- High contrast for readability and accessibility
- Consistent styling and centering across all letters
- Square aspect ratio (512x512px recommended)

### Creating Picture Cards

Picture cards should have:
- Clear, recognizable images 
- Simple, child-friendly illustrations
- Clean backgrounds
- Objects that clearly represent the corresponding letter sound

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

## 🔧 Development

This is a streamlined phonics game focused on core functionality. The project has been simplified to include only essential game features without additional testing or deployment complexity.

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

## 🚀 Deployment

### Dual Environment Setup (Lovable + GitHub Pages)

This project is configured to work seamlessly in both Lovable editor and GitHub Pages:

**Lovable Environment**: 
- Preview works with base path `/` for local development
- Allows live editing and real-time preview

**GitHub Pages Environment**:
- Uses base path `/phonics-match-play/` for production deployment
- Automatically deploys via GitHub Actions on push to main branch

### Configuration Files

**`vite.config.ts`**: Handles conditional base path
```typescript
export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? "/phonics-match-play/" : "/",
  // ... other config
}));
```

**`src/App.tsx`**: Handles conditional basename for React Router
```typescript
<BrowserRouter basename={import.meta.env.PROD ? "/phonics-match-play" : undefined}>
```

**`.github/workflows/deploy.yml`**: Automated GitHub Pages deployment
- Builds project on push to main branch
- Deploys to GitHub Pages using GitHub Actions
- Includes debugging output for troubleshooting

### GitHub Pages Setup

1. **Repository Settings**: Go to Settings → Pages
2. **Source**: Select "Deploy from a branch" → "GitHub Actions"
3. **Custom Domain** (optional): Add your domain in the "Custom domain" field

### Static Hosting Options

The game can also be hosted on:

- **Netlify**: Drag and drop the `dist` folder
- **Vercel**: Connect your GitHub repository  
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
│   ├── card-letter-a.jpg   # Letter A card
│   ├── card-letter-b.jpg   # Letter B card
│   ├── card-letter-c.jpg   # Letter C card
│   ├── card-ant-a.jpg      # Ant picture (matches A)
│   ├── card-bed-b.jpg      # Bed picture (matches B)
│   ├── card-cat-c.jpg      # Cat picture (matches C)
│   └── card-back.jpg       # Card back design (or solid color #649494)
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
   - Easy: 2 pairs (4 cards total)
   - Medium: 3 pairs (6 cards total - current)
   - Hard: 4+ pairs (8+ cards total)

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
  easy: { pairs: 2, timeLimit: null },
  medium: { pairs: 3, timeLimit: 120 },    // current setting
  hard: { pairs: 4, timeLimit: 180 }
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
- Check `TOTAL_PAIRS` constant matches actual pair count (should be 3 for current setup)
- Verify all cards have correct `pairId` values
- Ensure each pair has one 'letter' and one 'picture' card
- Check browser console for JavaScript errors

**Cards not matching when they should**:
- Verify matching cards have same `pairId` but different `type` values
- Check the `isMatchingPair` function logic
- Ensure card data structure includes `type` field

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
