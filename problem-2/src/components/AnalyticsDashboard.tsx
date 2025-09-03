import { useMemo } from 'react';
import { useEcommerce } from '../context/EcommerceContext';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { BarChart3, TrendingUp, ShoppingCart, Package, DollarSign, Users } from 'lucide-react';

export const AnalyticsDashboard = () => {
  const { orders, products } = useEcommerce();

  // Calculate analytics data
  const analytics = useMemo(() => {
    // Basic metrics
    const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
    const totalOrders = orders.length;
    const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;
    
    // Monthly revenue (simulated data for demo)
    const monthlyRevenue = [
      { month: 'Jan', revenue: 4200, orders: 12 },
      { month: 'Feb', revenue: 3800, orders: 9 },
      { month: 'Mar', revenue: 5200, orders: 15 },
      { month: 'Apr', revenue: 4600, orders: 13 },
      { month: 'May', revenue: 6100, orders: 18 },
      { month: 'Jun', revenue: 5800, orders: 16 },
    ];

    // Category distribution
    const categoryStats = products.reduce((acc, product) => {
      acc[product.category] = (acc[product.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const categoryData = Object.entries(categoryStats).map(([category, count]) => ({
      category,
      count,
      value: count,
    }));

    // Product performance (based on stock status and reviews)
    const productPerformance = products
      .map(product => ({
        name: product.name.length > 15 ? product.name.substring(0, 15) + '...' : product.name,
        rating: product.rating,
        reviews: product.reviews,
        price: product.price,
      }))
      .sort((a, b) => b.reviews - a.reviews)
      .slice(0, 6);

    return {
      totalRevenue,
      totalOrders,
      averageOrderValue,
      monthlyRevenue,
      categoryData,
      productPerformance,
    };
  }, [orders, products]);

  const COLORS = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#6b7280'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <BarChart3 className="h-6 w-6 text-primary" />
        <div>
          <h2 className="text-2xl font-bold">Analytics Dashboard</h2>
          <p className="text-muted-foreground">Insights into your e-commerce performance</p>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${analytics.totalRevenue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+12.5%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.totalOrders}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+8.2%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Order Value</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${analytics.averageOrderValue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+4.7%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{products.length}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-blue-600">{products.filter(p => p.inStock).length}</span> in stock
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Revenue Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={analytics.monthlyRevenue}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip 
                  formatter={(value, name) => [
                    name === 'revenue' ? `$${value}` : value,
                    name === 'revenue' ? 'Revenue' : 'Orders'
                  ]}
                />
                <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Category Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Product Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={analytics.categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ category, value }) => `${category}: ${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {analytics.categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Product Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Top Products by Reviews</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={analytics.productPerformance}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="reviews" fill="#8b5cf6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Order Status Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Order Status Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { status: 'Delivered', count: orders.filter(o => o.status === 'delivered').length, color: 'bg-green-500' },
                { status: 'Shipped', count: orders.filter(o => o.status === 'shipped').length, color: 'bg-blue-500' },
                { status: 'Processing', count: orders.filter(o => o.status === 'processing').length, color: 'bg-yellow-500' },
                { status: 'Pending', count: orders.filter(o => o.status === 'pending').length, color: 'bg-gray-500' },
              ].map(item => (
                <div key={item.status} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${item.color}`} />
                    <span className="text-sm font-medium">{item.status}</span>
                  </div>
                  <div className="text-sm text-muted-foreground">{item.count} orders</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Conversion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">3.2%</div>
            <p className="text-sm text-muted-foreground">From product views to purchases</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Customer Retention</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">68%</div>
            <p className="text-sm text-muted-foreground">Customers who make repeat purchases</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Cart Abandonment</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-600">24%</div>
            <p className="text-sm text-muted-foreground">Items added but not purchased</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};