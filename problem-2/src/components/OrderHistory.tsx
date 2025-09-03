import { useEcommerce } from '../context/EcommerceContext';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { History, Package, Truck, CheckCircle, Clock } from 'lucide-react';

export const OrderHistory = () => {
  const { orders } = useEcommerce();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4" />;
      case 'processing':
        return <Package className="h-4 w-4" />;
      case 'shipped':
        return <Truck className="h-4 w-4" />;
      case 'delivered':
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'processing':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'shipped':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'delivered':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (orders.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="flex items-center gap-3 justify-center mb-6">
          <History className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold">Order History</h2>
        </div>
        <History className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">No orders yet</h3>
        <p className="text-muted-foreground">Your order history will appear here</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <History className="h-6 w-6 text-primary" />
        <div>
          <h2 className="text-2xl font-bold">Order History</h2>
          <p className="text-muted-foreground">{orders.length} orders placed</p>
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {orders.map(order => (
          <Card key={order.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <CardTitle className="text-lg">Order #{order.id}</CardTitle>
                  <Badge className={`border ${getStatusColor(order.status)}`}>
                    <span className="flex items-center gap-1">
                      {getStatusIcon(order.status)}
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </Badge>
                </div>
                <div className="text-right">
                  <div className="text-sm text-muted-foreground">Order Date</div>
                  <div className="font-medium">{new Date(order.date).toLocaleDateString()}</div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Order Items */}
                <div className="lg:col-span-2 space-y-3">
                  <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Items Ordered</h4>
                  <div className="space-y-3">
                    {order.items.map(item => (
                      <div key={`${order.id}-${item.id}`} className="flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-lg overflow-hidden">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="font-medium">{item.name}</div>
                          <div className="text-sm text-muted-foreground">Quantity: {item.quantity}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">${(item.price * item.quantity).toFixed(2)}</div>
                          <div className="text-sm text-muted-foreground">${item.price} each</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Order Details */}
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide mb-3">Order Total</h4>
                    <div className="text-2xl font-bold">${order.total.toFixed(2)}</div>
                  </div>

                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide mb-3">Shipping Address</h4>
                    <div className="text-sm space-y-1">
                      <div className="font-medium">{order.shippingAddress.name}</div>
                      <div>{order.shippingAddress.street}</div>
                      <div>
                        {order.shippingAddress.city}, {order.shippingAddress.zipCode}
                      </div>
                      <div>{order.shippingAddress.country}</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Button variant="outline" size="sm" className="w-full">
                      View Details
                    </Button>
                    {order.status === 'delivered' && (
                      <Button variant="outline" size="sm" className="w-full">
                        Reorder Items
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};