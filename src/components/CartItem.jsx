import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';

export default function CartItem({ item, image, onIncrease, onRemove }) {
  return (
    <Card className='mb-4 transition-shadow hover:shadow-lg border border-gray-200'>
      <CardContent className='p-4 flex gap-4 items-center'>
        <img
          src={image}
          alt={item.product.name}
          className='w-28 h-20 object-cover rounded border'
        />
        <div className='flex-1'>
          <h2 className='text-lg font-semibold text-gray-800'>
            {item.product.name}
          </h2>
          <p className='text-gray-600 font-medium'>
            ₹{item.product.price.toLocaleString('en-IN')}
          </p>
          <div className='flex items-center gap-3 mt-3'>
            <Button size='sm' onClick={() => onIncrease(item.productId)}>
              +
            </Button>
            <span className='font-semibold text-gray-700'>{item.quantity}</span>
          </div>
        </div>
        <div>
          <Button
            variant='destructive'
            onClick={() => onRemove(item.productId)}
          >
            Remove
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
