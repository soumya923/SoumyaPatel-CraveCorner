import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import "./Orders.css";

function Orders() {
  const currentUser = useSelector(state => state.user.currentUser);
  const orderDetailsList = useSelector(state => state.orders);

  const [expandedOrderId, setExpandedOrderId] = useState(null);

  // Filter orders for current user, with fallback for null/undefined
  const userOrders = currentUser && orderDetailsList
    ? orderDetailsList.filter(order => order.username === currentUser.username)
    : orderDetailsList || []; // Show all orders if no user is logged in (e.g., after purchase)

  const handleToggle = (orderId) => {
    setExpandedOrderId(prevOrderId => (prevOrderId === orderId ? null : orderId));
  };

  const orderListItems = userOrders.length > 0 ? userOrders.map((purchase, index) => (
    <div key={purchase.orderId || `order-${index}`} className="order-entry">
      <p>
        <strong>🆔 Order ID:</strong>{' '}
        <span
          className="order-id-link"
          onClick={() => handleToggle(purchase.orderId || `order-${index}`)}
          style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}
        >
          {purchase.orderId || 'N/A'}
        </span>
      </p>
      <p><strong>🗓️ Date:</strong> {purchase.date || 'Unknown'}</p>
      <p><strong>📦 Items:</strong> {(purchase.items || []).length} item{(purchase.items || []).length > 1 ? 's' : ''}</p>
      <p><strong>💰 Total Amount:</strong> ₹{parseFloat(purchase.finalprice || 0).toFixed(2)}</p>

      <div className="order-thumbnails" style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
        {(purchase.items || []).slice(0, 4).map((item, idx) => (
          <img
            key={idx}
            src={item.image || 'https://via.placeholder.com/60'}
            alt={item.name || 'Item'}
            title={item.name || 'Item'}
            className="thumbnail-image"
            style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '5px' }}
          />
        ))}
        {(purchase.items || []).length > 4 && (
          <span className="more-items" style={{ fontWeight: 'bold', alignSelf: 'center' }}>
            +{(purchase.items || []).length - 4}
          </span>
        )}
      </div>

      {expandedOrderId === (purchase.orderId || `order-${index}`) && (
        <div className="order-details" style={{ borderTop: '1px solid #ccc', paddingTop: '10px' }}>
          <h4>📋 Order Details</h4>
          <div class privilassName="order-items" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {(purchase.items || []).map((item, itemIndex) => (
              <div key={itemIndex} className="order-item" style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                <img
                  src={item.image || 'https://via.placeholder.com/80'}
                  alt={item.name || 'Item'}
                  className="order-item-image"
                  style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px' }}
                />
                <div>
                  <p><strong>📦 Item:</strong> {item.name || 'Unknown'}</p>
                  <p><strong>🔢 Quantity:</strong> {item.quantity || 1}</p>
                  <p><strong>💵 Price:</strong> ₹{parseFloat(item.price || 0).toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )) : (
    <p>📭 No orders have been placed yet.</p>
  );

  return (
    <div className="orders-container" style={{ maxWidth: '800px', margin: 'auto', padding: '20px', display: 'block' }}>
      <h2>🧾 Order History</h2>
      <div>{orderListItems}</div>
    </div>
  );
}

export default Orders;