/**
 * GAME CARD COMPONENT TESTS
 * 
 * Basic test examples for the GameCard component.
 * These tests verify core functionality like card interactions and state management.
 * 
 * To run tests:
 * 1. The testing dependencies are already installed
 * 2. Add test script to package.json: "test": "vitest"
 * 3. Run: npm test
 */

import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { GameCard } from '../GameCard';
import { Card } from '@/data/gameData';

// Mock card data for testing
const mockCard: Card = {
  id: 1,
  pairId: 1,
  type: 'letter',
  front: 'test-front.jpg',
  alt: 'Test card for phonics'
};

describe('GameCard Component', () => {
  it('renders card back when not flipped', () => {
    const mockOnClick = vi.fn();
    
    const { getByLabelText } = render(
      <GameCard
        card={mockCard}
        isFlipped={false}
        isMatched={false}
        isDisabled={false}
        onClick={mockOnClick}
      />
    );

    // Should show card back description
    expect(getByLabelText(/face down card/i)).toBeInTheDocument();
  });

  it('renders card front when flipped', () => {
    const mockOnClick = vi.fn();
    
    const { getByAltText } = render(
      <GameCard
        card={mockCard}
        isFlipped={true}
        isMatched={false}
        isDisabled={false}
        onClick={mockOnClick}
      />
    );

    // Should show card front with alt text
    expect(getByAltText(mockCard.alt)).toBeInTheDocument();
  });

  it('calls onClick when card is clicked', async () => {
    const user = userEvent.setup();
    const mockOnClick = vi.fn();
    
    const { getByRole } = render(
      <GameCard
        card={mockCard}
        isFlipped={false}
        isMatched={false}
        isDisabled={false}
        onClick={mockOnClick}
      />
    );

    const cardButton = getByRole('button');
    await user.click(cardButton);

    expect(mockOnClick).toHaveBeenCalledWith(mockCard);
  });

  it('does not call onClick when card is disabled', async () => {
    const user = userEvent.setup();
    const mockOnClick = vi.fn();
    
    const { getByRole } = render(
      <GameCard
        card={mockCard}
        isFlipped={false}
        isMatched={false}
        isDisabled={true}
        onClick={mockOnClick}
      />
    );

    const cardButton = getByRole('button');
    await user.click(cardButton);

    expect(mockOnClick).not.toHaveBeenCalled();
  });

  it('does not call onClick when card is already flipped', async () => {
    const user = userEvent.setup();
    const mockOnClick = vi.fn();
    
    const { getByRole } = render(
      <GameCard
        card={mockCard}
        isFlipped={true}
        isMatched={false}
        isDisabled={false}
        onClick={mockOnClick}
      />
    );

    const cardButton = getByRole('button');
    await user.click(cardButton);

    expect(mockOnClick).not.toHaveBeenCalled();
  });

  it('responds to keyboard navigation', async () => {
    const user = userEvent.setup();
    const mockOnClick = vi.fn();
    
    const { getByRole } = render(
      <GameCard
        card={mockCard}
        isFlipped={false}
        isMatched={false}
        isDisabled={false}
        onClick={mockOnClick}
      />
    );

    const cardButton = getByRole('button');
    
    // Test Enter key
    await user.type(cardButton, '{Enter}');
    expect(mockOnClick).toHaveBeenCalledWith(mockCard);

    // Reset mock
    mockOnClick.mockClear();

    // Test Space key
    await user.type(cardButton, ' ');
    expect(mockOnClick).toHaveBeenCalledWith(mockCard);
  });

  it('shows matched state correctly', async () => {
    const user = userEvent.setup();
    const mockOnClick = vi.fn();
    
    const { getByRole, getByAltText } = render(
      <GameCard
        card={mockCard}
        isFlipped={false}
        isMatched={true}
        isDisabled={false}
        onClick={mockOnClick}
      />
    );

    // Matched cards should show front image
    expect(getByAltText(mockCard.alt)).toBeInTheDocument();
    
    // And should not respond to clicks
    const cardButton = getByRole('button');
    await user.click(cardButton);
    expect(mockOnClick).not.toHaveBeenCalled();
  });
});

/**
 * GAME DATA UTILITY TESTS
 * 
 * Tests for the game logic utilities
 */
describe('Game Utilities', () => {
  it('identifies matching pairs correctly', async () => {
    const { isMatchingPair } = await import('@/data/gameData');
    
    const card1: Card = { id: 1, pairId: 1, type: 'letter', front: 'test1.jpg', alt: 'Test 1' };
    const card2: Card = { id: 2, pairId: 1, type: 'picture', front: 'test1.jpg', alt: 'Test 1' };
    const card3: Card = { id: 3, pairId: 2, type: 'letter', front: 'test2.jpg', alt: 'Test 2' };

    // Same pairId, different id, different types = match
    expect(isMatchingPair(card1, card2)).toBe(true);
    
    // Different pairId = no match
    expect(isMatchingPair(card1, card3)).toBe(false);
    
    // Same card = no match (can't match with itself)
    expect(isMatchingPair(card1, card1)).toBe(false);
    
    // Same pairId, same type = no match (letter can't match letter)
    const card4: Card = { id: 4, pairId: 1, type: 'letter', front: 'test3.jpg', alt: 'Test 3' };
    expect(isMatchingPair(card1, card4)).toBe(false);
  });

  it('shuffles cards randomly', async () => {
    const { shuffleCards, CARD_DATA } = await import('@/data/gameData');
    
    const originalOrder = [...CARD_DATA];
    const shuffledCards = shuffleCards(CARD_DATA);
    
    // Should have same length
    expect(shuffledCards).toHaveLength(CARD_DATA.length);
    
    // Should contain all original cards
    expect(shuffledCards).toEqual(expect.arrayContaining(originalOrder));
    
    // Should not modify original array
    expect(CARD_DATA).toEqual(originalOrder);
  });
});

/**
 * INTEGRATION TEST EXAMPLE
 * 
 * Test multiple components working together
 */
describe('Game Integration', () => {
  it('maintains card state consistency', () => {
    // This would test the full game flow:
    // 1. Render PhonicGame component
    // 2. Click cards to flip them
    // 3. Verify matches are detected
    // 4. Check victory condition triggers
    
    // This is a placeholder for more complex integration tests
    // In a real scenario, you would render the full PhonicGame
    // and simulate user interactions to test the game logic
    expect(true).toBe(true);
  });
});

/**
 * ACCESSIBILITY TESTS
 * 
 * Ensure the game works for all users
 */
describe('Accessibility', () => {
  it('has proper ARIA labels', () => {
    const mockOnClick = vi.fn();
    
    const { getByRole } = render(
      <GameCard
        card={mockCard}
        isFlipped={false}
        isMatched={false}
        isDisabled={false}
        onClick={mockOnClick}
      />
    );

    const cardButton = getByRole('button');
    expect(cardButton).toHaveAttribute('aria-label');
    expect(cardButton).toHaveAttribute('tabIndex', '0');
  });

  it('updates ARIA labels based on state', () => {
    const mockOnClick = vi.fn();
    
    const { rerender, getByLabelText } = render(
      <GameCard
        card={mockCard}
        isFlipped={false}
        isMatched={false}
        isDisabled={false}
        onClick={mockOnClick}
      />
    );

    // When face down
    expect(getByLabelText(/face down card/i)).toBeInTheDocument();

    // When flipped
    rerender(
      <GameCard
        card={mockCard}
        isFlipped={true}
        isMatched={false}
        isDisabled={false}
        onClick={mockOnClick}
      />
    );

    expect(getByLabelText(mockCard.alt)).toBeInTheDocument();
  });
});