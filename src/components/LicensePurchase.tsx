'use client';

import { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { motion, AnimatePresence } from 'framer-motion';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const LicensePurchase = () => {
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showTooltip, setShowTooltip] = useState(false);

  const calculatePrice = (qty: number) => {
    if (qty >= 50) return qty * 6.5;
    if (qty >= 10) return qty * 8;
    return qty * 10;
  };

  const handleQuantityChange = (newQuantity: number) => {
    setQuantity(Math.max(1, newQuantity));
    setError(null);
  };

  const handlePurchase = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          quantity,
          price: calculatePrice(quantity),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create checkout session');
      }

      const { sessionId } = await response.json();
      const stripe = await stripePromise;
      if (stripe) {
        const { error } = await stripe.redirectToCheckout({
          sessionId,
        });
        if (error) {
          throw error;
        }
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to process payment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-lg p-8"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mb-8 p-4 bg-blue-50 border border-blue-200 rounded-lg"
      >
        <h4 className="text-lg font-semibold text-[#035183] mb-2">Volume Discounts Available</h4>
        <p className="text-gray-600">
          Save more when you buy in bulk: $10 per license (1-9), $8 per license (10-49), $6.50 per license (50+).
        </p>
      </motion.div>

      <div className="mb-8">
        <h3 className="text-2xl font-semibold mb-4 text-[#035183]">Select Number of Licenses</h3>
        <div className="flex items-center space-x-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleQuantityChange(quantity - 1)}
            className="w-10 h-10 rounded-full bg-[#035183] text-white flex items-center justify-center hover:bg-opacity-90 transition-colors"
          >
            -
          </motion.button>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
            className="w-20 text-center border-2 border-[#035183] rounded-lg p-2 focus:ring-2 focus:ring-[#035183] focus:border-transparent text-lg font-bold text-[#035183]"
          />
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleQuantityChange(quantity + 1)}
            className="w-10 h-10 rounded-full bg-[#035183] text-white flex items-center justify-center hover:bg-opacity-90 transition-colors"
          >
            +
          </motion.button>
        </div>
      </div>

      <div className="mb-8 bg-gray-50 p-6 rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-700 text-lg font-medium">Number of Licenses:</span>
          <span className="font-bold text-xl text-[#035183]">{quantity}</span>
        </div>
        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-700 text-lg font-medium">Price per license:</span>
          <span className="font-semibold text-lg text-[#035183]">
            {quantity >= 50 ? '$6.50' : quantity >= 10 ? '$8.00' : '$10.00'}
          </span>
        </div>
        <div className="border-t border-gray-200 pt-4 mt-4">
          <div className="flex justify-between items-center">
            <span className="text-xl font-semibold text-gray-800">Total Amount:</span>
            <motion.span
              key={quantity}
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              className="text-2xl font-bold text-[#035183]"
            >
              ${calculatePrice(quantity).toFixed(2)}
            </motion.span>
          </div>
        </div>
        {quantity >= 10 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 text-sm text-green-600 font-medium"
          >
            Bulk discount applied! 🎉
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-4 p-3 bg-red-100 text-red-600 rounded-lg"
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handlePurchase}
        disabled={loading}
        className="w-full bg-[#035183] text-white py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all disabled:opacity-50 relative"
      >
        {loading ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processing...
          </span>
        ) : (
          'Proceed to Payment'
        )}
      </motion.button>

      <div className="relative mt-4">
        <p 
          className="text-sm text-gray-500 text-center cursor-help"
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          Secure payment processed by Stripe
        </p>
        <AnimatePresence>
          {showTooltip && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-xs rounded-lg whitespace-nowrap"
            >
              Your payment information is encrypted and secure
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default LicensePurchase; 