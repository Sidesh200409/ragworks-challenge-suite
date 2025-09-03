import { useEcommerce } from '../context/EcommerceContext';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { ShoppingBag, Minus, Plus, Trash2, ArrowRight } from 'lucide-react';

export const ShoppingCart = () => {
  const { cartItems, removeFromCart, updateCartQuantity, cartTotal, clearCart } = useEcommerce();

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(id);
    } else {
      updateCartQuantity(id, newQuantity);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="flex items-center gap-3 justify-center mb-6">
          <ShoppingBag className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold">Shopping Cart</h2>
        </div>
        <ShoppingBag className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">Your cart is empty</h3>
        <p className="text-muted-foreground mb-6">Add some products to get started</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <ShoppingBag className="h-6 w-6 text-primary" />
          <div>
            <h2 className="text-2xl font-bold">Shopping Cart</h2>
            <p className="text-muted-foreground">{cartItems.length} items in your cart</p>
          </div>
        </div>
        {cartItems.length > 0 && (
          <Button variant="outline" onClick={clearCart}>
            <Trash2 className="h-4 w-4 mr-2" />
            Clear Cart
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map(item => (
            <Card key={item.id}>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-20 h-20 rounded-lg overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-lg font-bold text-primary">${item.price}</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <Input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value) || 0)}
                      className="w-20 text-center"
                      min="0"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFromCart(item.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Tax</span>
                  <span>${(cartTotal * 0.08).toFixed(2)}</span>
                </div>
                <div className="border-t pt-2">
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>${(cartTotal * 1.08).toFixed(2)}</span>
                  </div>
                </div>
              </div>
              <Button className="w-full" size="lg">
                Proceed to Checkout
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};