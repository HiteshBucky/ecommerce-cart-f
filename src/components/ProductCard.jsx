import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { useCart } from '../context/CartContext';

const productImages = Array.from(
  { length: 10 },
  (_, i) => `https://picsum.photos/300/200?random=${i + 1}`
);

export default function ProductCard({ product, index }) {
  const { getQty, getAddedQty, addItem, increaseQty, decreaseQty, removeItem } =
    useCart();

  const addedQty = getAddedQty(product.id);
  const localQty = getQty(product.id);
  const isInCart = addedQty > 0;

  return (
    <Card className={isInCart ? 'border-green-500 bg-green-50' : ''}>
      <CardContent className='p-4'>
        <img
          src={productImages[index % productImages.length]}
          alt={product.name}
          className='w-full h-40 object-cover rounded mb-2'
        />
        <h2 className='text-lg font-semibold'>{product.name}</h2>
        <p className='text-sm'>Price: ₹{product.price}</p>

        {isInCart ? (
          <>
            <div className='flex items-center gap-2 mt-2'>
              <span className='text-sm'>In Cart:</span>
              <span className='px-2 w-6 text-center'>{addedQty}</span>
              <Button size='sm' onClick={() => addItem(product.id, 1)}>
                +
              </Button>
            </div>
            <Button
              className='mt-3 w-full'
              variant='outline'
              color='red'
              onClick={() => removeItem(product.id)}
            >
              Remove from Cart
            </Button>
          </>
        ) : (
          <>
            <div className='flex items-center gap-2 mt-2'>
              <span className='text-sm'>Qty:</span>
              <Button size='sm' onClick={() => decreaseQty(product.id)}>
                −
              </Button>
              <span className='px-2 w-6 text-center'>{localQty}</span>
              <Button size='sm' onClick={() => increaseQty(product.id)}>
                +
              </Button>
            </div>
            <Button
              className='mt-3 w-full'
              onClick={() => addItem(product.id, localQty)}
            >
              Add to Cart
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
}
