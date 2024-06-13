import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { updateCart } from '../api/cart/updateCart';
import { createCart } from '../api/cart/createCart';
import { formatForQuantityUpdate } from './formatForQuantityUpdate';

export function useCart() {
  const dispatch = useAppDispatch();
  const { cart } = useAppSelector((state) => state.cart_slice);
  const [isCartLoading, setIsCartLoading] = useState(false);

  const addToCart = async (productId: string) => {
    setIsCartLoading(true);
    try {
      // const actions = [{ action: 'addLineItem', quantity: 1, productId }];
      if (!cart) {
        const newCart = await createCart();
        await dispatch(
          updateCart({
            actions: [{ action: 'addLineItem', quantity: 1, productId }],
            version: newCart.version,
            ID: newCart.id
          })
        );
      } else {
        await dispatch(
          updateCart({
            actions: [{ action: 'addLineItem', quantity: 1, productId }],
            version: cart.version,
            ID: cart.id
          })
        );
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setIsCartLoading(false);
    }
  };

  const removeFromCart = async (lineItemId: string) => {
    setIsCartLoading(true);
    try {
      if (cart) {
        const itemData = cart.lineItems.find((item) => item.id === lineItemId);
        if (!itemData) throw new Error('Item not found in cart');

        const updateData = formatForQuantityUpdate({
          actionName: 'remove',
          cart,
          itemData
        });

        await dispatch(updateCart(updateData));
      }
    } catch (error) {
      console.error('Error removing from cart:', error);
    } finally {
      setIsCartLoading(false);
    }
  };

  return {
    cart,
    isCartLoading,
    addToCart,
    removeFromCart
  };
}
