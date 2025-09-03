import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useEcommerce } from '../context/EcommerceContext';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { CreditCard, Truck, CheckCircle, User, MapPin } from 'lucide-react';

const checkoutSchema = z.object({
  // Personal Information
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 characters'),
  
  // Shipping Address
  street: z.string().min(5, 'Street address is required'),
  city: z.string().min(2, 'City is required'),
  zipCode: z.string().min(5, 'Valid ZIP code is required'),
  country: z.string().min(2, 'Country is required'),
  
  // Payment Information
  cardNumber: z.string().min(16, 'Card number must be 16 digits'),
  expiryDate: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Invalid expiry date (MM/YY)'),
  cvv: z.string().length(3, 'CVV must be 3 digits'),
  cardholderName: z.string().min(2, 'Cardholder name is required'),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

export const CheckoutFlow = () => {
  const { cartItems, cartTotal, addOrder } = useEcommerce();
  const [currentStep, setCurrentStep] = useState(1);
  const [orderComplete, setOrderComplete] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
  });

  const steps = [
    { id: 1, title: 'Personal Info', icon: User },
    { id: 2, title: 'Shipping', icon: MapPin },
    { id: 3, title: 'Payment', icon: CreditCard },
    { id: 4, title: 'Review', icon: CheckCircle },
  ];

  const handleNext = async () => {
    let fieldsToValidate: (keyof CheckoutFormData)[] = [];
    
    switch (currentStep) {
      case 1:
        fieldsToValidate = ['firstName', 'lastName', 'email', 'phone'];
        break;
      case 2:
        fieldsToValidate = ['street', 'city', 'zipCode', 'country'];
        break;
      case 3:
        fieldsToValidate = ['cardNumber', 'expiryDate', 'cvv', 'cardholderName'];
        break;
    }

    const isValid = await trigger(fieldsToValidate);
    if (isValid) {
      setCurrentStep(prev => Math.min(prev + 1, 4));
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const onSubmit = (data: CheckoutFormData) => {
    const newOrder = {
      id: `ORD-${Date.now()}`,
      items: cartItems,
      total: cartTotal * 1.08, // Including tax
      status: 'pending' as const,
      date: new Date().toISOString().split('T')[0],
      shippingAddress: {
        name: `${data.firstName} ${data.lastName}`,
        street: data.street,
        city: data.city,
        zipCode: data.zipCode,
        country: data.country,
      },
    };

    addOrder(newOrder);
    setOrderComplete(true);
  };

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-12">
        <CreditCard className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">No items to checkout</h3>
        <p className="text-muted-foreground">Add some products to your cart first</p>
      </div>
    );
  }

  if (orderComplete) {
    return (
      <div className="text-center py-12">
        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2">Order Placed Successfully!</h2>
        <p className="text-muted-foreground mb-6">
          Thank you for your purchase. You'll receive a confirmation email shortly.
        </p>
        <Button onClick={() => {
          setOrderComplete(false);
          setCurrentStep(1);
        }}>
          Continue Shopping
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <CreditCard className="h-6 w-6 text-primary" />
        <div>
          <h2 className="text-2xl font-bold">Checkout</h2>
          <p className="text-muted-foreground">Complete your purchase</p>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-between mb-8">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isActive = currentStep === step.id;
          const isCompleted = currentStep > step.id;
          
          return (
            <div key={step.id} className="flex items-center">
              <div className={`
                flex items-center justify-center w-10 h-10 rounded-full border-2 
                ${isActive ? 'border-primary bg-primary text-primary-foreground' : 
                  isCompleted ? 'border-green-500 bg-green-500 text-white' : 
                  'border-muted-foreground bg-background text-muted-foreground'}
              `}>
                <Icon className="h-5 w-5" />
              </div>
              <div className="ml-3">
                <div className={`text-sm font-medium ${isActive ? 'text-primary' : isCompleted ? 'text-green-500' : 'text-muted-foreground'}`}>
                  {step.title}
                </div>
              </div>
              {index < steps.length - 1 && (
                <div className={`mx-4 h-0.5 w-12 ${isCompleted ? 'bg-green-500' : 'bg-muted'}`} />
              )}
            </div>
          )
        })}
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Form Steps */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>{steps[currentStep - 1].title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Step 1: Personal Information */}
                {currentStep === 1 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input {...register('firstName')} />
                      {errors.firstName && <p className="text-sm text-destructive">{errors.firstName.message}</p>}
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input {...register('lastName')} />
                      {errors.lastName && <p className="text-sm text-destructive">{errors.lastName.message}</p>}
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input type="email" {...register('email')} />
                      {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input {...register('phone')} />
                      {errors.phone && <p className="text-sm text-destructive">{errors.phone.message}</p>}
                    </div>
                  </div>
                )}

                {/* Step 2: Shipping Address */}
                {currentStep === 2 && (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="street">Street Address</Label>
                      <Input {...register('street')} />
                      {errors.street && <p className="text-sm text-destructive">{errors.street.message}</p>}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="city">City</Label>
                        <Input {...register('city')} />
                        {errors.city && <p className="text-sm text-destructive">{errors.city.message}</p>}
                      </div>
                      <div>
                        <Label htmlFor="zipCode">ZIP Code</Label>
                        <Input {...register('zipCode')} />
                        {errors.zipCode && <p className="text-sm text-destructive">{errors.zipCode.message}</p>}
                      </div>
                      <div>
                        <Label htmlFor="country">Country</Label>
                        <Input {...register('country')} defaultValue="United States" />
                        {errors.country && <p className="text-sm text-destructive">{errors.country.message}</p>}
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: Payment Information */}
                {currentStep === 3 && (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="cardholderName">Cardholder Name</Label>
                      <Input {...register('cardholderName')} />
                      {errors.cardholderName && <p className="text-sm text-destructive">{errors.cardholderName.message}</p>}
                    </div>
                    <div>
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input {...register('cardNumber')} placeholder="1234 5678 9012 3456" />
                      {errors.cardNumber && <p className="text-sm text-destructive">{errors.cardNumber.message}</p>}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiryDate">Expiry Date</Label>
                        <Input {...register('expiryDate')} placeholder="MM/YY" />
                        {errors.expiryDate && <p className="text-sm text-destructive">{errors.expiryDate.message}</p>}
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV</Label>
                        <Input {...register('cvv')} placeholder="123" />
                        {errors.cvv && <p className="text-sm text-destructive">{errors.cvv.message}</p>}
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 4: Review */}
                {currentStep === 4 && (
                  <div className="space-y-4">
                    <h3 className="font-semibold">Order Review</h3>
                    <div className="space-y-2">
                      {cartItems.map(item => (
                        <div key={item.id} className="flex justify-between text-sm">
                          <span>{item.name} × {item.quantity}</span>
                          <span>${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                    <div className="border-t pt-2">
                      <div className="flex justify-between font-semibold">
                        <span>Total (including tax)</span>
                        <span>${(cartTotal * 1.08).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between pt-6">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handlePrevious}
                    disabled={currentStep === 1}
                  >
                    Previous
                  </Button>
                  
                  {currentStep < 4 ? (
                    <Button type="button" onClick={handleNext}>
                      Next
                    </Button>
                  ) : (
                    <Button type="submit">
                      Place Order
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {cartItems.map(item => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span>{item.name} × {item.quantity}</span>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <div className="space-y-2 pt-2 border-t">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Tax</span>
                    <span>${(cartTotal * 0.08).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>${(cartTotal * 1.08).toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
};