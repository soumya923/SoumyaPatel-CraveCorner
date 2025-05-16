import "./CartStyles.css";
import React, { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addOrder,
  clearCart,
  decrementQuantity,
  incrementQuantity,
  removeItem,
} from './Store';
import { useNavigate } from "react-router-dom";
import QRCode from 'react-qr-code';
import emailjs from '@emailjs/browser';
import confetti from 'canvas-confetti';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Move all useSelector calls to the top level
  const cartItems = useSelector(state => state.cart);
  const isAuthenticated = useSelector(state => state.user.isAuthenticated);
  const username = useSelector(state => state.user.currentUser?.username); // Added username here

  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [couponCodeDiscountPer, setCouponDiscountPer] = useState(0);
  const [couponName, setCouponName] = useState("");
  const [userEmail, setUserEmail] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [orderId, setOrderId] = useState('');
  const [cardDetails, setCardDetails] = useState({ cardNumber: '', expiryDate: '', cvv: '' });
  const [countdown, setCountdown] = useState(null);
  const [purchaseCompleted, setPurchaseCompleted] = useState(false);
  const [finalPurchaseInfo, setFinalPurchaseInfo] = useState(null);
  const hasCelebrated = useRef(false);

  const couponCodeRef = useRef();
  const taxPercentage = 5;
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const handleIncrement = (item) => {
    dispatch(incrementQuantity(item));
    toast.success(`Increased quantity of ${item.name}`);
  };

  const handleDecrement = (item) => {
    if (item.quantity === 1) {
      dispatch(removeItem(item));
      toast.warn(`${item.name} removed from cart`);
    } else {
      dispatch(decrementQuantity(item));
      toast.info(`Decreased quantity of ${item.name}`);
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item));
    toast.error(`${item.name} removed from cart`);
  };

  const handleDiscountClick = (percentage) => {
    setDiscountPercentage(percentage);
    setCouponDiscountPer(0);
    setCouponName("");
  };

  const handleCouponPer = () => {
    const code = couponCodeRef.current.value.trim().toUpperCase();
    switch (code) {
      case 'SAVE10': setCouponDiscountPer(10); setCouponName('SAVE10'); break;
      case 'SAVE40': setCouponDiscountPer(40); setCouponName('SAVE40'); break;
      case 'SAVE50': setCouponDiscountPer(50); setCouponName('SAVE50'); break;
      default: alert('Invalid coupon code'); setCouponDiscountPer(0); setCouponName("");
    }
  };

  const calculateAmounts = (items = cartItems) => {
    const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0);
    const appliedDiscount = discountPercentage || couponCodeDiscountPer;
    const discountAmount = (totalPrice * appliedDiscount) / 100;
    const afterDiscount = totalPrice - discountAmount;
    const tax = (afterDiscount * taxPercentage) / 100;
    const finalAmount = afterDiscount + tax;

    return {
      totalPrice: totalPrice.toFixed(2),
      discountAmount: discountAmount.toFixed(2),
      afterDiscount: afterDiscount.toFixed(2),
      tax: tax.toFixed(2),
      finalAmount: finalAmount.toFixed(2),
      appliedDiscount
    };
  };

  const {
    totalPrice,
    discountAmount,
    afterDiscount,
    tax,
    finalAmount,
    appliedDiscount
  } = calculateAmounts();

  const handleCompletePurchase = () => {
    if (!isAuthenticated) {
      navigate('/sign-in');
      toast.warn("Please sign in to complete your purchase.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userEmail)) {
      alert("Please enter a valid email address.");
      return;
    }

    const newOrderId = 'ORD_' + new Date().getTime();
    const purchaseDateTime = new Date().toLocaleString();

    // Preserve values before clearing
    const currentAmounts = calculateAmounts(cartItems);

    const orderListDetails = {
      orderId: newOrderId,
      date: purchaseDateTime,
      items: [...cartItems],
      finalprice: parseFloat(currentAmounts.finalAmount),
      username // Use the username from top-level useSelector
    };

    const templateParams = {
      order_id: newOrderId,
      email: userEmail,
      orders: orderListDetails.items.map(item => ({
        name: item.name,
        price: item.price.toFixed(2),
        units: item.quantity,
        image_url: item.image
      })),
      cost: {
        shipping: "0.00",
        tax: currentAmounts.tax,
        total: currentAmounts.finalAmount
      }
    };

    emailjs.send(
      'service_3hvp894',
      'template_h9k6c4l',
      templateParams,
      'ndZi5w-8vrj8MOYiV'
    ).then(
      () => {
        dispatch(addOrder(orderListDetails));
        dispatch(clearCart());
        setFinalPurchaseInfo(currentAmounts); // preserve amount info
        setCardDetails({ cardNumber: '', expiryDate: '', cvv: '' });
        setPaymentMethod('');
        setCountdown(6);
        setOrderId(newOrderId);
        setPurchaseCompleted(true);
      },
      (error) => {
        console.log('❌ Failed to send email:', error);
      }
    );
  };

  const handleCardPayment = () => {
    if (!isAuthenticated) {
      navigate('/sign-in');
      toast.warn("Please sign in to complete your purchase.");
      return;
    }
    alert("Card payment completed! ✅");
    setPaymentMethod('card');
    handleCompletePurchase();
  };

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(prev => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0 && orderId) {
      navigate("/myorder");
    }
  }, [countdown, orderId, navigate]);

  if (purchaseCompleted && finalPurchaseInfo) {
    if (!hasCelebrated.current) {
      hasCelebrated.current = true;
      confetti({ particleCount: 100, angle: 60, spread: 45, origin: { x: 0 } });
      confetti({ particleCount: 100, angle: 120, spread: 45, origin: { x: 1 } });
      confetti({ particleCount: 150, spread: 60, origin: { y: 0.6 } });
    }
    
    return (
      <div className="container text-center my-5">
        <h2 className="text-success">🎉 Thank you for your purchase!🎁</h2>
        <p className="fs-5">Your order <strong>{orderId}</strong> has been placed successfully.👍</p>
        <p>Redirecting to your <strong>Orders</strong> page in {countdown} seconds⏳...</p>
        <ToastContainer position="top-right" autoClose={1900} />
      </div>
    );
  }

  const renderedCartItems = cartItems.length === 0 && countdown === null ? (
    <h3>Your cart is empty🛒</h3>
  ) : (
    <div>
      {cartItems.map((item) => (
        <div key={item.id || item.name}>
          <img src={item.image} width={100} alt={item.name} />
          <span style={{ color: "darkblue", fontWeight: "bold" }}>NAME:</span>{" "}
          <span style={{ color: "blue" }}>{item.name}</span>{" "}
          <span style={{ color: "darkgreen", fontWeight: "bold" }}>PRICE:</span>{" "}
          <span style={{ color: "green" }}>₹{item.price}</span>{" "}
          <span style={{ color: "darkred", fontWeight: "bold" }}>QUANTITY:</span>{" "}
          <strong style={{ color: "black" }}>{item.quantity}</strong>
          <button onClick={() => handleIncrement(item)} style={{ marginLeft: "10px", backgroundColor: "blue", color: "white" }}>+</button>
          <button onClick={() => handleDecrement(item)} style={{ marginLeft: "10px", backgroundColor: "green", color: "white" }}>-</button>
          <button onClick={() => handleRemove(item)} style={{ marginLeft: "10px", backgroundColor: "purple", color: "white" }}>Remove</button>
        </div>
      ))}
    </div>
  );

  return (
    <div className="cart-page-wrapper container mt-4">
      <div className="cart-container">
        <h1>Your Cart</h1>
        <ToastContainer position="top-right" autoClose={1500} />

        <div className="cart-items">{renderedCartItems}</div>

        <div className="discount-buttons my-3">
          <button onClick={() => handleDiscountClick(10)} className="btn btn-outline-secondary me-2">10% Discount</button>
          <button onClick={() => handleDiscountClick(20)} className="btn btn-outline-secondary me-2">20% Discount</button>
          <button onClick={() => handleDiscountClick(30)} className="btn btn-outline-secondary">30% Discount</button>

          <div className="coupon-section mt-3">
            <input type="text" ref={couponCodeRef} placeholder="Enter Coupon Code" className="form-control mb-2" />
            <button onClick={handleCouponPer} className="btn btn-info w-100">Apply Coupon</button>
          </div>
        </div>

        <div className="email-input-section mb-3">
          <label htmlFor="userEmail" className="form-label">Enter your Email for Receipt:</label>
          <input type="email" id="userEmail" placeholder="example@mail.com" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} className="form-control" required />
        </div>

        <div className="cart-summary border-top pt-3">
          <h5>Total Items: {cartCount}</h5>
          <p style={{ color: "purple" }}>💰Total Amount: ₹{totalPrice}</p>
          <p style={{ color: "green" }}>💸Discount ({discountPercentage}%): ₹{discountAmount}</p>
          <p style={{ color: "red" }}>🎟Coupon ({couponCodeDiscountPer}%): ₹{((totalPrice * couponCodeDiscountPer) / 100).toFixed(2)}</p>
          <p style={{ color: "darkslateblue" }}>🧾Tax: ₹{tax}</p>
          <p style={{ color: "brown" }}>🏷 Final Amount: ₹{finalAmount}</p>

          {paymentMethod === 'upi' && (
            <div className="qr-payment-box text-center my-4">
              <h3>Scan this QR to Pay</h3>
              <QRCode value={`upi://pay?pa=7675835038@axl&pn=YourBusinessName&am=${finalAmount}&cu=INR&tn=CartPurchase`} size={200} />
              <p className="mt-2">Amount: ₹{finalAmount}</p>
              <p>UPI ID: 9989267540@ibl</p>
              <button onClick={handleCompletePurchase} className="btn btn-success mt-2">✅ I have completed payment</button>
              {countdown !== null && countdown > 0 && (
                <p className="mt-3 text-primary fs-5">
                  🎉 Purchase successful! Redirecting in {countdown} seconds...
                </p>
              )}
            </div>
          )}

          {paymentMethod === 'card' && (
            <div className="card-payment-box my-4">
              <h3>Enter Card Details</h3>
              <form>
                <div className="mb-3">
                  <label htmlFor="cardNumber" className="form-label">Card Number</label>
                  <input type="text" className="form-control" id="cardNumber" placeholder="Card Number" value={cardDetails.cardNumber} onChange={(e) => setCardDetails({ ...cardDetails, cardNumber: e.target.value })} />
                </div>
                <div className="mb-3">
                  <label htmlFor="expiryDate" className="form-label">Expiry Date (MM/YY)</label>
                  <input type="text" className="form-control" id="expiryDate" placeholder="MM/YY" value={cardDetails.expiryDate} onChange={(e) => setCardDetails({ ...cardDetails, expiryDate: e.target.value })} />
                </div>
                <div className="mb-3">
                  <label htmlFor="cvv" className="form-label">CVV</label>
                  <input type="text" className="form-control" id="cvv" placeholder="CVV" value={cardDetails.cvv} onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })} />
                </div>
                <button type="button" onClick={handleCardPayment} className="btn btn-primary w-100">
                  ✅ Pay with Card
                </button>
              </form>
              {countdown !== null && countdown > 0 && (
                <p className="mt-3 text-primary fs-5">
                  🎉 Purchase successful! Redirecting in {countdown} seconds...
                </p>
              )}
            </div>
          )}
        </div>

        <div className="payment-options mt-4">
          <h3>Select Payment Method📱💳</h3>
          <button onClick={() => setPaymentMethod('upi')} className="btn btn-outline-success me-3">
            📱 Pay with UPI Scanner
          </button>
          <button onClick={() => setPaymentMethod('card')} className="btn btn-outline-primary">
            💳 Pay with Card
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;