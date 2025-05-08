import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';

export default function CartSummary({
  items,
  discount,
  baseTotal,
  finalTotal,
  onCheckout,
}) {
  // Calculate the discount amount if a discount is applied
  const discountAmount = discount
    ? Math.round((baseTotal * discount.discountPercent) / 100)
    : 0;

  return (
    <Card className='sticky top-20 mb-4 shadow-md border border-gray-200'>
      <CardContent className='p-6'>
        <h2 className='text-2xl font-bold mb-6 text-gray-800'>🧾 Summary</h2>

        <div className='flex justify-between mb-3 text-gray-700'>
          <span>Items</span>
          <span>{items.length}</span>
        </div>

        <div className='flex justify-between mb-3 font-medium text-gray-700'>
          <span>Subtotal</span>
          <span>₹{baseTotal.toLocaleString('en-IN')}</span>
        </div>

        {discount && (
          <div className='flex justify-between mb-3 text-green-700 font-medium'>
            <span>
              Discount (<span className='font-semibold'>{discount.code}</span>)
            </span>
            <span>- ₹{discountAmount.toLocaleString('en-IN')}</span>
          </div>
        )}

        <hr className='my-4' />

        <div className='flex justify-between text-lg font-bold text-gray-900 mb-6'>
          <span>Total</span>
          <span>₹{finalTotal.toLocaleString('en-IN')}</span>
        </div>

        {discount && (
          <div className='bg-green-100 text-green-800 p-4 rounded-lg mb-4 text-sm font-medium'>
            🎉 <span className='font-semibold'>You're lucky!</span> Use code{' '}
            <span className='font-bold'>{discount.code}</span> now!
          </div>
        )}

        {/* Display Checkout button */}
        <Button className='w-full text-base py-2' onClick={onCheckout}>
          Checkout
        </Button>
      </CardContent>
    </Card>
  );
}
