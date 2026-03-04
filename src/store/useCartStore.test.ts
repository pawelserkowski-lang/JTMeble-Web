import { describe, it, expect, beforeEach } from 'vitest';
import { useCartStore } from './useCartStore';

describe('useCartStore', () => {
  beforeEach(() => {
    // Reset stanu koszyka przed kazdym testem
    useCartStore.setState({ items: [], isOpen: false });
  });

  it('powinien dodac produkt do koszyka', () => {
    const state = useCartStore.getState();
    expect(state.items.length).toBe(0);

    const product = { id: 1, name: 'Biurko', price: 500, image: '/img.jpg' };
    state.addItem(product);

    const newState = useCartStore.getState();
    expect(newState.items.length).toBe(1);
    expect(newState.items[0]).toEqual(product);
  });

  it('powinien usunac produkt z koszyka', () => {
    const product = { id: 1, name: 'Biurko', price: 500, image: '/img.jpg' };
    useCartStore.getState().addItem(product);

    useCartStore.getState().removeItem(1);

    const newState = useCartStore.getState();
    expect(newState.items.length).toBe(0);
  });

  it('powinien wyczyscic koszyk', () => {
    useCartStore.getState().addItem({ id: 1, name: 'A', price: 10, image: '' });
    useCartStore.getState().addItem({ id: 2, name: 'B', price: 20, image: '' });

    useCartStore.getState().clearCart();

    expect(useCartStore.getState().items.length).toBe(0);
  });
});
