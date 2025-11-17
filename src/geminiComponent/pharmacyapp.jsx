import React, { useState, useMemo, useCallback } from 'react';

// --- Icon Definitions (Simulating Lucide Icons with Inline SVGs) ---
const icons = {
    Pills: (props) => (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m20.65 9.35-4 4a2 2 0 0 1-2.83 0l-1.5-1.5a2 2 0 0 0-2.83 0l-4 4a2 2 0 0 0 0 2.83l.83.83" /><path d="M12.42 16.59l4.58-4.58" /><path d="M7 7h.01" /><path d="M10 10h.01" /><path d="M13 13h.01" /><path d="M16 16h.01" /><circle cx="12" cy="12" r="10" /></svg>
    ),
    ShoppingCart: (props) => (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="20" r="1" /><circle cx="19" cy="20" r="1" /><path d="m1 1h4l2.68 12.42a2 2 0 0 0 2 1.58h9.84a2 2 0 0 0 2-1.58L23 5H6" /></svg>
    ),
    FilePlus: (props) => (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" /><path d="M14 2v4a2 2 0 0 0 2 2h4" /><path d="M12 18v-6" /><path d="M9 15h6" /></svg>
    ),
    Plus: (props) => (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14" /><path d="M5 12h14" /></svg>
    ),
    Minus: (props) => (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /></svg>
    ),
    Trash: (props) => (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /></svg>
    ),
    CheckCircle: (props) => (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><path d="m9 11 3 3L22 4" /></svg>
    )
};

// --- Mock Data ---
const initialProducts = [
    { id: 1, name: 'Paracetamol 500mg', price: 5.99, description: 'Fever and pain relief. 20 tablets.', stock: 15, category: 'Pain Relief' },
    { id: 2, name: 'Vitamin C 1000mg', price: 12.50, description: 'High-potency immune support supplement.', stock: 22, category: 'Supplements' },
    { id: 3, name: 'Knee Support Band', price: 18.00, description: 'Adjustable athletic knee compression.', stock: 8, category: 'First Aid' },
    { id: 4, name: 'Digital Thermometer', price: 9.99, description: 'Fast, accurate oral/rectal readings.', stock: 40, category: 'Devices' },
    { id: 5, name: 'Cough Syrup', price: 7.45, description: 'Non-drowsy formula for dry cough.', stock: 30, category: 'Cold & Flu' },
    { id: 6, name: 'Multivitamin Gummies', price: 15.20, description: 'Daily vitamins for adults, fruit flavor.', stock: 12, category: 'Supplements' },
];

const TABS = {
    SHOP: 'shop',
    PRESCRIPTIONS: 'prescriptions',
    CART: 'cart',
};

// --- Sub-Components ---

const ProductCard = ({ product, onAddToCart }) => {
    return (
        <div className="bg-white p-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col justify-between border border-gray-100">
            <div>
                <div className="text-xs font-semibold uppercase text-teal-600 bg-teal-50 px-2 py-0.5 rounded-full inline-block mb-2">
                    {product.category}
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-1">{product.name}</h3>
                <p className="text-sm text-gray-500 mb-4 h-10 overflow-hidden">{product.description}</p>
            </div>
            <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                <span className="text-xl font-extrabold text-green-700">${product.price.toFixed(2)}</span>
                <button
                    onClick={() => onAddToCart(product)}
                    className="flex items-center bg-indigo-600 text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-200 shadow-md"
                >
                    <icons.ShoppingCart className="w-4 h-4 mr-1" />
                    Add
                </button>
            </div>
        </div>
    );
};

const ShopView = ({ products, onAddToCart }) => (
    <div className="p-4 sm:p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Health & Wellness Catalog</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map(product => (
                <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
            ))}
        </div>
    </div>
);

const PrescriptionView = () => {
    const [file, setFile] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadMessage, setUploadMessage] = useState('');

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setUploadMessage('');
        }
    };

    const handleUpload = () => {
        if (!file) {
            setUploadMessage('Please select a prescription file first.');
            return;
        }

        setIsUploading(true);
        setUploadMessage('');

        // Simulate API upload
        setTimeout(() => {
            setIsUploading(false);
            setUploadMessage(`File "${file.name}" uploaded successfully! We will contact you shortly.`);
            setFile(null);
        }, 2000);
    };

    return (
        <div className="p-4 sm:p-8 max-w-xl mx-auto text-center">
            <icons.FilePlus className="w-12 h-12 mx-auto text-indigo-500 mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Upload Digital Prescription</h2>
            <p className="text-gray-500 mb-6">Securely upload your doctor's prescription for quick verification and fulfillment.</p>

            <div className="bg-white border-2 border-dashed border-indigo-300 rounded-xl p-8 hover:border-indigo-500 transition-colors duration-200 cursor-pointer">
                <input
                    type="file"
                    id="prescription-upload"
                    className="hidden"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleFileChange}
                />
                <label htmlFor="prescription-upload" className="block text-indigo-600 font-semibold cursor-pointer">
                    {file ? file.name : 'Click to select file (PDF, JPG, PNG)'}
                </label>
                <p className="text-xs text-gray-400 mt-1">Max file size: 5MB</p>
            </div>

            <button
                onClick={handleUpload}
                disabled={!file || isUploading}
                className={`mt-6 w-full py-3 rounded-lg font-semibold text-white transition-colors duration-300 flex items-center justify-center
          ${!file || isUploading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700 shadow-md'}
        `}
            >
                {isUploading ? (
                    <>
                        <icons.Pills className="w-5 h-5 mr-2 animate-spin" />
                        Uploading...
                    </>
                ) : (
                    'Submit Prescription'
                )}
            </button>

            {uploadMessage && (
                <div className={`mt-4 p-3 rounded-lg text-sm font-medium ${uploadMessage.includes('successfully') ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {uploadMessage}
                </div>
            )}
        </div>
    );
};


const CartItem = ({ item, onUpdateQuantity, onRemoveItem }) => {
    return (
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg shadow-sm mb-3">
            <div className="flex-1 min-w-0 pr-4">
                <h4 className="text-base font-semibold text-gray-800 truncate">{item.name}</h4>
                <p className="text-sm text-gray-500">${item.price.toFixed(2)} / unit</p>
            </div>

            <div className="flex items-center space-x-3">
                <div className="flex items-center border border-gray-300 rounded-lg">
                    <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        className="p-2 text-gray-600 hover:bg-gray-200 rounded-l-lg disabled:text-gray-400 disabled:cursor-not-allowed"
                    >
                        <icons.Minus className="w-4 h-4" />
                    </button>
                    <span className="px-3 font-medium text-gray-700 text-sm w-8 text-center">{item.quantity}</span>
                    <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="p-2 text-gray-600 hover:bg-gray-200 rounded-r-lg"
                    >
                        <icons.Plus className="w-4 h-4" />
                    </button>
                </div>

                <span className="text-lg font-bold text-green-700 w-16 text-right">${(item.price * item.quantity).toFixed(2)}</span>

                <button
                    onClick={() => onRemoveItem(item.id)}
                    className="p-2 text-red-500 hover:bg-red-100 rounded-lg transition-colors duration-200"
                    aria-label={`Remove ${item.name}`}
                >
                    <icons.Trash className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
};

const CartView = ({ cart, onUpdateQuantity, onRemoveItem }) => {
    const [isCheckingOut, setIsCheckingOut] = useState(false);
    const [checkoutMessage, setCheckoutMessage] = useState('');

    const subtotal = useMemo(() =>
        cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
        , [cart]);

    const taxRate = 0.08;
    const shipping = 5.00;
    const tax = subtotal * taxRate;
    const total = subtotal + tax + (subtotal > 0 ? shipping : 0);

    const handleCheckout = () => {
        if (cart.length === 0) {
            setCheckoutMessage('Your cart is empty. Please add items to proceed.');
            return;
        }

        setIsCheckingOut(true);
        setCheckoutMessage('');

        // Simulate checkout process
        setTimeout(() => {
            setIsCheckingOut(false);
            setCheckoutMessage('Checkout successful! Your order has been placed for delivery.');
            // In a real app, you would clear the cart here.
        }, 2500);
    };

    return (
        <div className="p-4 sm:p-6 flex flex-col lg:flex-row gap-6">
            <div className="lg:w-2/3">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">Your Shopping Cart ({cart.length} items)</h2>
                {cart.length === 0 ? (
                    <div className="text-center p-10 bg-white rounded-xl border border-dashed border-gray-300">
                        <icons.ShoppingCart className="w-10 h-10 mx-auto text-gray-400 mb-3" />
                        <p className="text-gray-500">Your cart is empty. Start shopping now!</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {cart.map(item => (
                            <CartItem
                                key={item.id}
                                item={item}
                                onUpdateQuantity={onUpdateQuantity}
                                onRemoveItem={onRemoveItem}
                            />
                        ))}
                    </div>
                )}
            </div>

            <div className="lg:w-1/3 pt-6 lg:pt-0">
                <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 sticky top-4">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h3>

                    <div className="space-y-2 text-gray-600">
                        <div className="flex justify-between"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
                        <div className="flex justify-between"><span>Shipping</span><span>{subtotal > 0 ? `$${shipping.toFixed(2)}` : 'Free'}</span></div>
                        <div className="flex justify-between border-b pb-2"><span>Tax (8%)</span><span>${tax.toFixed(2)}</span></div>
                    </div>

                    <div className="flex justify-between text-2xl font-extrabold text-indigo-700 pt-4 mt-4 border-t border-gray-200">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                    </div>

                    <button
                        onClick={handleCheckout}
                        disabled={cart.length === 0 || isCheckingOut}
                        className={`mt-6 w-full py-3 rounded-lg text-lg font-bold text-white transition-colors duration-300 flex items-center justify-center
                        ${cart.length === 0 || isCheckingOut ? 'bg-indigo-300 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 shadow-xl'}
                    `}
                    >
                        {isCheckingOut ? (
                            <>
                                <icons.Pills className="w-5 h-5 mr-2 animate-pulse" />
                                Processing Order...
                            </>
                        ) : (
                            'Proceed to Checkout'
                        )}
                    </button>

                    {checkoutMessage && (
                        <div className={`mt-4 p-3 rounded-lg text-sm font-medium ${checkoutMessage.includes('successful') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            {checkoutMessage.includes('successful') && <icons.CheckCircle className="inline w-4 h-4 mr-1" />}
                            {checkoutMessage}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

// --- Main App Component ---

const PharmacyApp = () => {
    const [activeTab, setActiveTab] = useState(TABS.SHOP);
    const [products] = useState(initialProducts);
    const [cart, setCart] = useState([]);

    const cartItemCount = useMemo(() =>
        cart.reduce((sum, item) => sum + item.quantity, 0)
        , [cart]);

    const addToCart = useCallback((product) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.id === product.id);
            if (existingItem) {
                return prevCart.map(item =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prevCart, { ...product, quantity: 1 }];
        });
    }, []);

    const updateQuantity = useCallback((id, newQuantity) => {
        if (newQuantity < 1) return;
        setCart(prevCart =>
            prevCart.map(item =>
                item.id === id ? { ...item, quantity: newQuantity } : item
            )
        );
    }, []);

    const removeItem = useCallback((id) => {
        setCart(prevCart => prevCart.filter(item => item.id !== id));
    }, []);

    const renderContent = () => {
        switch (activeTab) {
            case TABS.SHOP:
                return <ShopView products={products} onAddToCart={addToCart} />;
            case TABS.PRESCRIPTIONS:
                return <PrescriptionView />;
            case TABS.CART:
                return <CartView
                    cart={cart}
                    onUpdateQuantity={updateQuantity}
                    onRemoveItem={removeItem}
                />;
            default:
                return <ShopView products={products} onAddToCart={addToCart} />;
        }
    };

    const TabButton = ({ tab, label, Icon, count }) => {
        const isActive = activeTab === tab;
        return (
            <button
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-3 px-2 flex flex-col sm:flex-row items-center justify-center transition-all duration-200 rounded-lg sm:rounded-full font-semibold
          ${isActive
                        ? 'text-indigo-700 bg-indigo-100 shadow-inner'
                        : 'text-gray-600 hover:text-indigo-600 hover:bg-gray-50'
                    }
        `}
            >
                <Icon className="w-6 h-6 sm:w-5 sm:h-5 sm:mr-2" />
                <span className="text-xs sm:text-sm mt-1 sm:mt-0">{label}</span>
                {count > 0 && tab === TABS.CART && (
                    <span className="ml-1 px-2 py-0.5 bg-red-500 text-white text-xs font-bold rounded-full">{count}</span>
                )}
            </button>
        );
    };

    return (
        <div className="min-h-screen bg-gray-50 font-inter">
            {/* Header/Nav Bar */}
            <header className="sticky top-0 z-10 bg-white shadow-md">
                <div className="max-w-4xl mx-auto p-4 flex justify-between items-center border-b sm:border-b-0">
                    <h1 className="text-2xl font-extrabold text-green-700">
                        Medi<span className="text-indigo-600">Care</span>
                    </h1>
                </div>

                {/* Mobile-Friendly Tabs */}
                <nav className="max-w-4xl mx-auto p-2">
                    <div className="flex space-x-2 bg-gray-100 rounded-xl p-1 shadow-inner">
                        <TabButton tab={TABS.SHOP} label="Shop" Icon={icons.Pills} />
                        <TabButton tab={TABS.PRESCRIPTIONS} label="Prescriptions" Icon={icons.FilePlus} />
                        <TabButton tab={TABS.CART} label="Cart" Icon={icons.ShoppingCart} count={cartItemCount} />
                    </div>
                </nav>
            </header>

            {/* Main Content Area */}
            <main className="max-w-4xl mx-auto py-6">
                <div className="bg-white rounded-xl shadow-xl overflow-hidden">
                    {renderContent()}
                </div>
            </main>

            {/* Footer (Simple Placeholder) */}
            <footer className="py-4 text-center text-xs text-gray-400 border-t mt-8">
                © 2025 MediCare Pharmacy App. All rights reserved.
            </footer>
        </div>
    );
};

export default PharmacyApp;