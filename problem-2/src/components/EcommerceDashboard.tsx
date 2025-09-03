import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ProductCatalog } from './ProductCatalog';
import { ShoppingCart } from './ShoppingCart';
import { CheckoutFlow } from './CheckoutFlow';
import { OrderHistory } from './OrderHistory';
import { AnalyticsDashboard } from './AnalyticsDashboard';
import { useEcommerce } from '../context/EcommerceContext';
import { ShoppingBag, BarChart3, Package, CreditCard, History } from 'lucide-react';

export const EcommerceDashboard = () => {
  const { cartItems } = useEcommerce();
  const [activeTab, setActiveTab] = useState('products');

  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ShoppingBag className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-2xl font-bold">E-commerce Dashboard</h1>
                <p className="text-sm text-muted-foreground">Complete shopping experience</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Cart Items</p>
                <p className="text-lg font-semibold">{cartItemCount}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="products" className="flex items-center gap-2">
              <Package size={16} />
              Products
            </TabsTrigger>
            <TabsTrigger value="cart" className="flex items-center gap-2">
              <ShoppingBag size={16} />
              Cart {cartItemCount > 0 && `(${cartItemCount})`}
            </TabsTrigger>
            <TabsTrigger value="checkout" className="flex items-center gap-2">
              <CreditCard size={16} />
              Checkout
            </TabsTrigger>
            <TabsTrigger value="orders" className="flex items-center gap-2">
              <History size={16} />
              Orders
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <BarChart3 size={16} />
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="products" className="space-y-6">
            <ProductCatalog />
          </TabsContent>

          <TabsContent value="cart" className="space-y-6">
            <ShoppingCart />
          </TabsContent>

          <TabsContent value="checkout" className="space-y-6">
            <CheckoutFlow />
          </TabsContent>

          <TabsContent value="orders" className="space-y-6">
            <OrderHistory />
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <AnalyticsDashboard />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};