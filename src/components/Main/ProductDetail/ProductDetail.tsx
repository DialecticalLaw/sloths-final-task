import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProduct } from '../../../api/products/getProducts';
import type { Product } from '@commercetools/platform-sdk';
import { Loader } from '../Loader/Loader';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import styles from './ProductDetail.module.css';
import { BgPlanets } from '../../Sidebar/Bg-planets';
import { useAppSelector } from '../../../store/hooks';
import { ImageModal } from './ImageModal/ImageModal';
import { Price } from '../../univComponents/Price/Price';

export function ProductDetail() {
  const { productKey } = useParams<{ productKey: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [modalActive, setModalActive] = useState(true);
  const [modalImageIndex, setModalImageIndex] = useState<number | null>(null);
  const planet = useAppSelector((state) => state.planet_slice.planet);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (!productKey) {
        setProduct(null);
        setIsLoading(false);
        return;
      }
      setIsLoading(true);
      try {
        const fetchedProduct = await getProduct(productKey);
        setProduct(fetchedProduct || null);
      } catch (error) {
        console.error(error);
        setProduct(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [productKey]);

  const openModal = (index: number) => {
    setModalImageIndex(index);
    setModalActive(true);
  };

  if (isLoading) {
    return <Loader />;
  }

  if (!product) {
    return <div>Товар не найден</div>;
  }

  const { name, description, masterVariant } = product.masterData.current;
  const images = masterVariant?.images || [];
  const price = masterVariant?.prices ? masterVariant.prices[0]?.value.centAmount : null;
  const discountPrice = masterVariant?.prices ? masterVariant.prices[0]?.discounted?.value.centAmount : null;

  return (
    <div className={styles.product_wrapper}>
      <button
        className={styles.link_back}
        onClick={() => {
          navigate(-1);
        }}
      >
        НАЗАД
      </button>
      <div className={styles.product_detail}>
        {planet && <BgPlanets />}
        <h1 className={styles.product_name}>{name?.ru}</h1>
        <div className={styles.images_gallery}>
          <Carousel
            className={styles.images_carousel}
            centerMode={true}
            centerSlidePercentage={100}
            showArrows
            showIndicators={false}
            showStatus={false}
            autoPlay={true}
            infiniteLoop={true}
            interval={5000}
            stopOnHover
            swipeable
            useKeyboardArrows
            thumbWidth={65}
          >
            {images.map((image, index) => (
              <div key={image.url} className={styles.image_container} onClick={() => openModal(index)}>
                <img src={image.url} alt={image.label} className={styles.product_image} />
              </div>
            ))}
          </Carousel>
        </div>
        <p className={styles.product_desc}>{description?.ru}</p>
        <Price classes={[styles.product_price_wrapper]} price={price} discountPrice={discountPrice || ''} />
        {modalActive && modalImageIndex !== null && (
          <ImageModal
            images={images}
            startIndex={modalImageIndex}
            active={modalActive}
            setActive={setModalActive}
          />
        )}
      </div>
    </div>
  );
}
