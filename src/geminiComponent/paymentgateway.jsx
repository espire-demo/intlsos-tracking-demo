import React, { useState, useCallback } from 'react';

// --- Icon Definitions (Inline SVGs for robustness) ---
const icons = {
  CreditCard: (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-credit-card"><rect width="22" height="16" x="1" y="4" rx="2" /><line x1="1" x2="23" y1="10" y2="10" /></svg>
  ),
  Wallet: (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-wallet"><path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h18a2 2 0 0 1 0 4h-5m-5 4v-4m5 0h-5" /><rect x="1" y="3" width="7" height="4" rx="1" /><circle cx="16" cy="13" r="2" /></svg>
  ),
  Banknote: (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-banknote"><rect width="20" height="12" x="2" y="6" rx="2" /><circle cx="12" cy="12" r="3" /><line x1="18" x2="18.01" y1="12" y2="12" /><line x1="6" x2="6.01" y1="12" y2="12" /></svg>
  ),
  CheckCircle: (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check-circle"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><path d="M9 11l3 3L22 4" /></svg>
  ),
  XCircle: (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x-circle"><circle cx="12" cy="12" r="10" /><path d="m15 9-6 6" /><path d="m9 9 6 6" /></svg>
  ),
  Loader2: (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-loader-2 animate-spin"><path d="M21 12a9 9 0 1 1-6.219-8.56" /></svg>
  ),
  Lock: (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-lock"><rect width="18" height="11" x="3" y="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
  )
};
// --- End Icon Definitions ---

const paymentMethods = [
  { id: 'card', name: 'Credit Card', icon: icons.CreditCard },
  { id: 'paypal', name: 'PayPal / Digital Wallet', icon: icons.Wallet },
  { id: 'bank', name: 'Bank Transfer (ACH)', icon: icons.Banknote },
];

const OrderSummary = ({ amount }) => (
  <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 mb-6">
    <h3 className="text-xl font-semibold text-gray-800 mb-4">Order Summary</h3>
    <div className="flex justify-between text-gray-600 border-b pb-2 mb-2">
      <span>Subscription Fee</span>
      <span>$49.99</span>
    </div>
    <div className="flex justify-between text-gray-600 border-b pb-2 mb-2">
      <span>Taxes (5%)</span>
      <span>$2.50</span>
    </div>
    <div className="flex justify-between text-lg font-bold text-gray-900 pt-2">
      <span>Total Amount Due</span>
      <span>${amount.toFixed(2)}</span>
    </div>
  </div>
);

// --- Payment Method Components ---

const CreditCardForm = ({ onSubmit, isProcessing }) => {
  const [cardDetails, setCardDetails] = useState({ number: '', name: '', expiry: '', cvv: '' });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    let processedValue = value;

    if (name === 'number') {
      const digits = value.replace(/\D/g, '').slice(0, 16);
      processedValue = digits.match(/.{1,4}/g)?.join(' ') || '';
    } else if (name === 'expiry') {
      const digits = value.replace(/\D/g, '').slice(0, 4);
      if (digits.length > 2) {
        processedValue = `${digits.substring(0, 2)}/${digits.substring(2, 4)}`;
      } else {
        processedValue = digits;
      }
    } else if (name === 'cvv') {
      processedValue = value.replace(/\D/g, '').slice(0, 4);
    }

    setCardDetails(prev => ({ ...prev, [name]: processedValue }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, perform validation here
    onSubmit(cardDetails);
  };

  const LockIcon = icons.Lock;

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 pt-0">
      <div className="text-sm text-gray-500 mb-4 flex items-center">
        <LockIcon className="w-4 h-4 mr-2" />
        Your card details are protected by 256-bit encryption.
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700">Card Number</label>
        <input
          type="text"
          name="number"
          value={cardDetails.number}
          onChange={handleChange}
          maxLength="19"
          placeholder="XXXX XXXX XXXX XXXX"
          inputMode="numeric"
          required
          className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-3"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700">Cardholder Name</label>
        <input
          type="text"
          name="name"
          value={cardDetails.name}
          onChange={handleChange}
          placeholder="JANE DOE"
          required
          className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-3"
        />
      </div>
      
      <div className="flex space-x-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700">Expiry (MM/YY)</label>
          <input
            type="text"
            name="expiry"
            value={cardDetails.expiry}
            onChange={handleChange}
            maxLength="5"
            placeholder="MM/YY"
            inputMode="numeric"
            required
            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-3"
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700">CVV</label>
          <input
            type="password"
            name="cvv"
            value={cardDetails.cvv}
            onChange={handleChange}
            maxLength="4"
            placeholder="***"
            inputMode="numeric"
            required
            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-3"
          />
        </div>
      </div>
      
      <SubmitButton isProcessing={isProcessing} text="Pay with Card" />
    </form>
  );
};

const PayPalComponent = ({ onSubmit, isProcessing }) => (
  <div className="p-6 text-center space-y-6">
    <p className="text-lg text-gray-700">
      You will be securely redirected to PayPal to complete your payment.
    </p>
    <button
      onClick={() => onSubmit({ method: 'PayPal' })}
      disabled={isProcessing}
      className={`w-full py-3 px-4 rounded-lg font-bold text-white transition-colors duration-300 shadow-lg flex items-center justify-center
        ${isProcessing ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800'}
      `}
    >
      {isProcessing ? (
        <>
          <icons.Loader2 className="w-5 h-5 mr-3" />
          Redirecting...
        </>
      ) : (
        "Continue to PayPal"
      )}
    </button>
    <div className="text-sm text-gray-500 mt-4">
      *Note: A PayPal account is required.
    </div>
  </div>
);

const BankTransferComponent = ({ onSubmit, isProcessing }) => {
  const [accountName, setAccountName] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ method: 'Bank Transfer', accountName });
  };
  
  return (
    <div className="p-4 pt-0">
        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 mb-6">
            <h4 className="font-semibold text-yellow-800 mb-2">Important Instructions</h4>
            <p className="text-sm text-yellow-700">
                You will receive an email with our ACH details after clicking "Confirm Transfer". This is not an instant payment method.
            </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">Your Bank Account Name</label>
                <input
                    type="text"
                    value={accountName}
                    onChange={(e) => setAccountName(e.target.value)}
                    placeholder="e.g., Jane D. Doe Checking"
                    required
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-3"
                />
            </div>
            
            <SubmitButton isProcessing={isProcessing} text="Confirm Transfer" />
        </form>
    </div>
  );
};

// --- Utility Components ---

const SubmitButton = ({ isProcessing, text }) => {
  return (
    <button
      type="submit"
      disabled={isProcessing}
      className={`w-full py-3 px-4 rounded-lg text-white font-bold text-lg transition-colors duration-300 shadow-lg mt-6 flex items-center justify-center
        ${isProcessing ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800'}
      `}
    >
      {isProcessing ? (
        <>
          <icons.Loader2 className="w-5 h-5 mr-3 text-white" />
          Processing...
        </>
      ) : (
        text
      )}
    </button>
  );
};


const StatusMessage = ({ status, onClose }) => {
  if (!status.message) return null;

  const isSuccess = status.success;
  const bgColor = isSuccess ? 'bg-green-50' : 'bg-red-50';
  const borderColor = isSuccess ? 'border-green-400' : 'border-red-400';
  const textColor = isSuccess ? 'text-green-800' : 'text-red-800';
  const Icon = isSuccess ? icons.CheckCircle : icons.XCircle;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4" onClick={onClose}>
        <div 
            className={`w-full max-w-sm ${bgColor} p-6 rounded-xl border-l-4 ${borderColor} shadow-2xl transform transition-all duration-300 scale-100`}
            onClick={(e) => e.stopPropagation()} 
        >
            <div className="flex items-start">
                <Icon className={`w-6 h-6 mr-3 ${isSuccess ? 'text-green-600' : 'text-red-600'} flex-shrink-0`} />
                <div className="flex-1">
                    <p className={`font-semibold text-lg ${textColor}`}>
                        {isSuccess ? 'Transaction Complete' : 'Transaction Alert'}
                    </p>
                    <p className={`mt-1 text-sm ${textColor}`}>
                        {status.message}
                    </p>
                </div>
            </div>
            <button 
                onClick={onClose}
                className={`mt-4 w-full py-2 rounded-lg font-medium text-sm ${isSuccess ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-red-600 hover:bg-red-700 text-white'}`}
            >
                Continue
            </button>
        </div>
    </div>
  );
};


// --- Main Application Component ---

const PaymentGateway = () => {
  const [activeTab, setActiveTab] = useState(paymentMethods[0].id);
  const [isProcessing, setIsProcessing] = useState(false);
  const [status, setStatus] = useState({ message: '', success: null });
  const totalAmount = 52.49; // $49.99 + $2.50 tax

  // Centralized submission handler for all payment methods
  const handlePaymentSubmission = useCallback((details) => {
    setStatus({ message: '', success: null });
    setIsProcessing(true);

    // Simulate API call delay and result
    setTimeout(() => {
      setIsProcessing(false);
      
      const success = Math.random() > 0.1; // 90% chance of success

      if (success) {
        let message = `Payment of $${totalAmount.toFixed(2)} completed!`;
        if (details.method === 'Bank Transfer') {
             message = `Bank transfer confirmation received. Awaiting fund clearance. Details sent to your email.`;
        } else if (details.method === 'PayPal') {
             message = `Redirect success. Payment completed via PayPal.`;
        } else {
             message = `Credit Card payment processed successfully. Thank you!`;
        }

        setStatus({ message, success: true });
        
      } else {
        const errorMsg = "Payment failed. Please check details or try another method.";
        setStatus({ message: errorMsg, success: false });
      }
    }, 1500);
  }, [totalAmount]);

  const renderPaymentComponent = () => {
    switch (activeTab) {
      case 'card':
        return <CreditCardForm onSubmit={handlePaymentSubmission} isProcessing={isProcessing} />;
      case 'paypal':
        return <PayPalComponent onSubmit={handlePaymentSubmission} isProcessing={isProcessing} />;
      case 'bank':
        return <BankTransferComponent onSubmit={handlePaymentSubmission} isProcessing={isProcessing} />;
      default:
        return null;
    }
  };
  
  const handleCloseStatus = () => {
    setStatus({ message: '', success: null });
  };

  return (
    <div className="min-h-screen flex items-start sm:items-center justify-center p-4 sm:p-8 bg-gray-50 font-inter">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-2xl transition-all duration-300 mt-8 sm:mt-0">
        
        {/* Header */}
        <div className="p-6 border-b">
          <h1 className="text-3xl font-extrabold text-gray-900">
            Payment Gateway
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Choose your preferred method to complete the secure checkout.
          </p>
        </div>

        <div className="p-6">
            <OrderSummary amount={totalAmount} />

            {/* Tabs Navigation */}
            <div className="flex border-b border-gray-200 mb-6">
                {paymentMethods.map((method) => {
                const isActive = activeTab === method.id;
                const Icon = method.icon;
                
                return (
                    <button
                    key={method.id}
                    onClick={() => setActiveTab(method.id)}
                    className={`
                        flex items-center justify-center flex-1 py-3 px-2 text-center text-sm sm:text-base font-medium transition-all duration-200 rounded-t-lg
                        ${isActive 
                        ? 'text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50/50' 
                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50 border-b-2 border-transparent'
                        }
                    `}
                    >
                    <Icon className="w-5 h-5 mr-2 hidden sm:inline-block" />
                    {method.name}
                    </button>
                );
                })}
            </div>

            {/* Payment Method Content */}
            <div className="min-h-[250px] relative">
                {renderPaymentComponent()}
            </div>
            
            <div className="mt-8 text-center text-xs text-gray-400">
                <p>Protected by the highest level of security.</p>
            </div>
        </div>

      </div>
      
      {/* Status Message Modal */}
      <StatusMessage status={status} onClose={handleCloseStatus} />
    </div>
  );
};

export default PaymentGateway;