import { useLocation, useNavigate } from 'react-router-dom';
import styles from './ProductCard.module.css';
import type { ProductCardProps } from '../../Main.interfaces';
import { formatPrice } from '../../../../helpers/formatPrice';
import { getPlanetFromLocation } from '../../../../helpers/locationHandlers';
import { getSubcategoryFromProductType } from '../../../../helpers/idsMapper';
import { cutSentence } from '../../../../helpers/cutSentence';
import emptyCartIcon from './../../../../assets/img/emptyBasket.png';
import cartIcon from './../../../../assets/img/basket.png';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { createCart, addItemToCart } from '../../../../api/cart/createCart';
import { setCart } from '../../../../store/slices/cart-slice';
import { MiniLoader } from '../../Loader/Loader';

export function ProductCard({ product }: ProductCardProps) {
  const navigate = useNavigate();
  const bgImageUrl = product.masterVariant?.images ? product.masterVariant?.images[0]?.url : null;
  const price = product.masterVariant?.prices ? product.masterVariant.prices[0]?.value.centAmount : null;
  const discountPrice = product.masterVariant?.prices
    ? product.masterVariant.prices[0]?.discounted?.value.centAmount
    : '';
  const location = useLocation();
  const planet = getPlanetFromLocation(location.pathname);
  const subcategory = getSubcategoryFromProductType(product.productType.id);
  const handleClick = (productKey: string): void => {
    navigate({ pathname: `/catalog/${planet}/${subcategory}/${productKey}` });
  };

  const [isInCart, setIsInCart] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart_slice.cart);

  useEffect(() => {
    if (cart) {
      const isProductInBasket = cart.lineItems.some((item) => item.productId === product.id);
      setIsInCart(isProductInBasket);
    }
  }, [cart, product.id]);

  const addToBasket = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    setIsLoading(true);

    try {
      if (!cart) {
        const newCart = await createCart();
        const updatedCart = await addItemToCart(newCart.id, product.id, newCart.version);
        dispatch(setCart(updatedCart));
      } else {
        const updatedCart = await addItemToCart(cart.id, product.id, cart.version);
        dispatch(setCart(updatedCart));
      }
      setIsInCart(true);
    } catch (error) {
      console.error('Error adding to basket:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={styles.product_card}
      onClick={() => {
        if (product.masterVariant.key) {
          handleClick(product.masterVariant.key);
        }
      }}
    >
      <div className={styles.product_image_wrapper}>
        <div className={styles.product_image} style={{ backgroundImage: `url(${bgImageUrl})` }} />
        <div className={styles.product_image_glow_wrapper}>
          <img src={bgImageUrl || ''} alt="glow" className={styles.product_image_glow} />
        </div>
      </div>
      <div className={styles.product_desc_wrapper}>
        <p className={styles.product_desc}>{cutSentence(product.description?.ru)}</p>
      </div>
      <div className={styles.product_info_wrapper}>
        <h3 className={styles.product_name}>{product.name.ru}</h3>
        <div className={styles.product_price_wrapper}>
          {price && (
            <span className={discountPrice ? styles.crossed_price : styles.product_price}>
              {formatPrice(price)}
            </span>
          )}
          {discountPrice && <span className={styles.discount_price}>{formatPrice(discountPrice)}</span>}
        </div>
      </div>
      <button className={styles.cart_button} disabled={isInCart || isLoading} onClick={addToBasket}>
        {isLoading ? (
          <MiniLoader />
        ) : (
          <img src={isInCart ? cartIcon : emptyCartIcon} alt="cart icon" className={styles.cart_icon} />
        )}
      </button>
    </div>
  );
}
