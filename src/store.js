// redux/store.js
import { configureStore, createSlice } from '@reduxjs/toolkit';

// Load cart and orders from localStorage
const savedCart = localStorage.getItem("cart");
const savedOrders = localStorage.getItem("orders");

const localStorageCart = savedCart ? JSON.parse(savedCart) : [];
const localStorageOrders = savedOrders ? JSON.parse(savedOrders) : [];

// Products Slice
const productsSlice = createSlice({
  name: 'Products',
  initialState: {
    Veg: [
       { name: 'Tomato', price: 150.5, image: '/Images/Tomato.jpg' },
      { name: 'Bottleguard', price: 190.5, image: '/Images/Bottleguard.jpg' },
      { name: 'Capcicum', price: 250.5, image: '/Images/Capcicum.jpg' },
      { name: 'Brinjal', price: 200.5, image: '/Images/Brinjal.jpg' },
      { name: 'Cauliflower', price: 150.5, image: '/Images/Cauliflower.jpg' },
      { name: 'Beetroot', price: 100.5, image: '/Images/Beetroot.jpg' },
      { name: 'Beans', price: 150.5, image: '/Images/Beans.jpg' },
      { name: 'Bitterguard', price: 300.5, image: '/Images/Bitterguard.jpg' },
      { name: 'Ladiesfinger', price: 200.5, image: '/Images/Ladiesfinger.jpg' },
      { name: 'Pumpkin', price: 240.5, image: '/Images/Pumpkin.jpg' },
      { name: 'Carrot', price: 80.5, image: '/Images/Carrot.jpeg' },
      { name: 'Cucumber', price: 180.5, image: '/Images/Cucumber.jpeg' },
      { name: 'Fennel', price: 210.5, image: '/Images/Fennel.jpeg' },
      { name: 'Mushroom', price: 280.5, image: '/Images/Mushroom.jpeg' },
      { name: 'Peas', price: 190.5, image: '/Images/Peas.jpeg' },
      { name: 'BokChoy', price: 200.5, image: '/Images/BokChoy.jpeg' },
      { name: 'RidgedGourd', price: 220.5, image: '/Images/RidgedGourd.jpeg' },
      { name: 'SweetPotato', price: 170.5, image: '/Images/SweetPotato.jpeg' },
      { name: 'PointedGourd', price: 240.5, image: '/Images/PointedGourd.jpeg' },
      { name: 'Corn', price: 60.5, image: '/Images/Corn.jpeg' }
    ],
    NonVeg: [
      { name: 'Chicken-Burger', price: 250.5, image: '/Images/Chicken-Burger.jpeg' },
      { name: 'Mutton-Biryani', price: 600.5, image: '/Images/Mutton-Biryani.jpg' },
      { name: 'Prawns Curry', price: 380.5, image: '/Images/Prawns Curry.jpg' },
      { name: 'Chicken Shawarma', price: 180.5, image: '/Images/Chicken Shawarma.jpeg' },
      { name: 'Fish-Fry', price: 300.5, image: '/Images/Fish-Fry.jpg' },
      { name: 'Mutton-Fry', price: 450.5, image: '/Images/Mutton-Fry.jpg' },
      { name: 'Chicken-Lollipop', price: 250.5, image: '/Images/Chicken-Lollipop.jpg' },
      { name: 'Mutton-Kheema', price: 700.5, image: '/Images/Mutton-Kheema.jpeg' },
      { name: 'Chicken-Noodles', price: 300.5, image: '/Images/Chicken-Noodles.jpeg' },
      { name: 'Schezwan Cheese Omelette', price: 290.5, image: '/Images/Schezwan Cheese Omelette.jpeg' },
      { name: 'Prawns Biryani', price: 500.5, image: '/Images/Prawns Biryani.jpeg' },
      { name: 'Chicken-Sandwich', price: 270.5, image: '/Images/Chicken-Sandwich.jpeg' },
      { name: 'Guilt-Free Karwari Prawns', price: 400.5, image: '/Images/Guilt-Free Karwari Prawns.jpeg' },
      { name: 'Chicken Springrools', price: 300.5, image: '/Images/Chicken Springrolls.jpeg' },
      { name: 'Fish-Curry', price: 350.5, image: '/Images/Fish-Curry.jpeg' },
      { name: 'Chicken-Kebab', price: 360.5, image: '/Images/Chicken-Kebab.jpeg' },
      { name: 'Egg 65', price: 280.5, image: '/Images/Egg 65.jpeg' },
      { name: 'Chicken Manchurian', price: 180.5, image: '/Images/Chicken Manchurian.jpeg' },
      { name: 'Fish-Tandoori', price: 400.5, image: '/Images/Fish-Tandoori.jpeg' },
      { name: 'Chicken-Kebab', price: 360.5, image: '/Images/Chicken-Kebab.jpeg' }
    ],
    IceCreams: [
      { name: 'Candy Ice CreamHocco Hazelnut Mudslide', price: 280.5, image: '/Images/Hocco-Hazelnut-Mudslide.webp' },
      { name: 'Chocolate-Low Calorie Ice Cream Bar', price: 250.5, image: '/Images/Go-Zero-Madagascar-Chocolate-Low-Calorie-Guilt-Free-Ice-Cream-Bar.webp' },
      { name: 'Hocco-Choco Brownie-Tub', price: 180.5, image: '/Images/Hocco-Choco-Brownie-Tub.webp' },
      { name: 'Blueberry Cheesecake Ice Cream-Cup', price: 150.5, image: '/Images/Go-Zero-Blueberry-Cheesecake-Low-Calorie-Guilt-Free-Ice-Cream-Cup.webp' },
      { name: 'Raspberry-Duet Ice-Cream-Stick', price: 100.5, image: '/Images/Go-Zero-Raspberry-Duet-Low-Calorie-Guilt-Free-Ice-Cream-Stick.webp' },
      { name: 'Amul-Gold-Fruit-N-Nut', price: 240.5, image: '/Images/Amul-Gold-Fruit-N-Nut-Fantasy-Ice-Cream-Cup-125-ml-Combo.jpg' },
      { name: 'TLondon-Dairy Natural Strawberry-Ice Cream-Cup', price: 220.5, image: '/Images/London-Dairy-Natural-Strawberry-Ice-Cream-Cup.webp' },
      { name: 'Kwality-Wall-s Cornetto-Double Chocolate', price: 450.5, image: '/Images/Kwality-Wall-s-Cornetto-Double-Chocolate-105-ml-Combo.webp' },
      { name: 'TKwality-Wall-s Cornetto Butterscotch', price: 120.5, image: '/Images/Kwality-Wall-s-Cornetto-Butterscotch.webp' },
      { name: 'Arun-Icecreams Double-Chocolate', price: 160.5, image: '/Images/Arun-Icecreams-Double-Chocolate-Icone-Ice-Cream-Cone.webp' },
      { name: 'Sitaphal-Low Calorie Ice cream Tub', price: 180.5, image: '/Images/Go-Zero-Simply-Sitaphal-Low-Calorie-Guilt-Free-Icecream-Tub.webp' },
      { name: 'NIC-Alphonso Mango-Ice Cream-Tub', price: 230.5, image: '/Images/NIC-Alphonso-Mango-Ice-Cream-Tub.webp' },
      { name: 'Cream-Pot-Black Currant', price: 250.5, image: '/Images/Cream-Pot-Black-Currant.webp' },
       { name: 'Arun-Icecreams Pista', price: 140.5, image: '/Images/Arun-Icecreams-Pista-Ice-Cream-Tub.webp' },
      { name: 'Amul-Chocolate Brownie', price: 210.5, image: '/Images/Amul-Chocolate-Brownie-Ice-Cream-Tub.webp' },
      { name: 'Vanilla Ice Cream Tub', price: 190.5, image: '/Images/Dairy-Day-Vanilla-Ice-Cream-Tub.webp' },
      { name: 'Candy Ice Cream', price: 220.5, image: '/Images/Baskin-Robbins-Cotton-Candy-Ice-Cream-Tub.webp' },
      { name: 'Cream-Pot American-Nuts', price: 240.5, image: '/Images/Cream-Pot-American-Nuts.webp' },
      { name: 'Cream-Pot Butterscotch-Tub', price: 190.5, image: '/Images/Cream-Pot-Butterscotch-Tub.webp' },
      { name: 'Red-Velvet-Icone Ice Cream Cone', price: 270.5, image: '/Images/Arun-Red-Velvet-Icone-Ice-Cream-Cone-100-ml-Combo.webp' }
    ],
    Chocolates: [
      { name: 'Amul Dark Chocolate Bar', price: 150.5, image: '/Images/Amul-Dark-Chocolate-Bar.webp' },
      { name: 'Cadbury Bournville Rich Cocoa', price: 180.5, image: '/Images/Cadbury%20Bournville%20Rich%20Cocoa%2070%25%20Dark%20Chocolate%20Bar.jpg' },
      { name: 'Cadbury Dairy Milk Crispello', price: 100.5, image: '/Images/Cadbury-Dairy-Milk-Crispello-Chocolate-Bar.webp' },
      { name: 'Cadbury Dairy Milk Silk Oreo', price: 110.5, image: '/Images/Cadbury-Dairy-Milk-Silk-Oreo-Chocolate-Bar.webp' },
      { name: 'Cadbury Nutties Chocolate Pack', price: 200.5, image: '/Images/Cadbury-Nutties-Chocolate-Pack.webp' },
      { name: 'Dairy Milk Silk', price: 90.5, image: '/Images/Dairy%20Milk%20Silk.jpg' },
      { name: 'Dalmond Truffles Handmade Almond Date Chocolates', price: 120.5, image: '/Images/Dalmond%20Truffles%20Handmade%20Almond%20Date%20Chocolates%20Gift%20Box%20and%20Chocolates.jpg' },
      { name: "D'Lite Dark Rich Cocoa", price: 80.5, image: '/Images/D%27Lite%20Dark%20Rich%20Cocoa.jpg' },
      { name: 'FerrEro Rocher Fine Hazelnut Milk Chocolates', price: 160.5, image: '/Images/FerrEro%20Rocher%20Fine%20Hazelnut%20Milk%20Chocolates.jpg' },
      { name: 'Five Star', price: 60.5, image: '/Images/Five%20Star.jpg' },
      { name: "Hershey's Chocolate Milton Hershey", price: 90.5, image: '/Images/Hershey%27s%20Chocolate%20Milton%20Hershey.jpg' },
      { name: 'Hershey-s Cookies', price: 100.5, image: '/Images/Hershey-s-Cookies-N-Creme-Chocolate-Bar.webp' },
      { name: 'kit kat nestle chocolate bars', price: 80.5, image: '/Images/kit%20kat%20nestle%20chocolate%20bars.jpg' },
       { name: 'Nestle Classic Tablet Rich Creamy Milk Treat', price: 120.5, image: '/Images/Nestle-Classic-Tablet-Rich-Creamy-Milk-Treat.webp' },
      { name: 'Milkybar Tablet Made With Milk Yummy Creamy Treat', price: 100.5, image: '/Images/Nestle-Milkybar-Tablet-Made-With-Milk-Yummy-Creamy-Treat.webp' },
      { name: 'Munch Max Choco Coated Crunchy Wafer Bar', price: 80.5, image: '/Images/Nestle-Munch-Max-Choco-Coated-Crunchy-Wafer-Bar.webp' },
      { name: 'Perk', price: 60.5, image: '/Images/Perk.jpg' },
      { name: 'Snickers High Protein Bar', price: 70.5, image: '/Images/Snickers%20High%20Protein%20Bar.jpg' },
      { name: 'Toblerone chocolate cookie dough truffles', price: 900.5, image: '/Images/Toblerone%20chocolate%20cookie%20dough%20truffles.jpg' },
      { name: 'TWIX Milk Chocolate', price: 80.5, image: '/Images/TWIX%20Milk%20Chocolate%20Snack%20with%20Biscuit%20and%20Showbox%20Caramel.jpg' }
    ]
  },
  reducers: {}
});

// Cart Slice
const cartSlice = createSlice({
  name: 'Cart',
  initialState: localStorageCart,
  reducers: {
    Addtocart: (state, action) => {
      const item = state.find(i => i.name === action.payload.name);
      if (item) {
        item.quantity += 1;
      } else {
        state.push({ ...action.payload, quantity: 1 });
      }
    },
    incrementQuantity: (state, action) => {
      const item = state.find(i => i.name === action.payload.name);
      if (item) item.quantity += 1;
    },
    decrementQuantity: (state, action) => {
      const item = state.find(i => i.name === action.payload.name);
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          return state.filter(i => i.name !== action.payload.name);
        }
      }
    },
    removeItem: (state, action) => {
      return state.filter(i => i.name !== action.payload.name);
    },
    clearCart: () => []
  }
});

// Order Slice
const orderSlice = createSlice({
  name: 'Orders',
  initialState: localStorageOrders,
  reducers: {
    addOrder: (state, action) => {
      state.push(action.payload);
    }
  }
});

// User Slice
const userSlice = createSlice({
  name: 'User',
  initialState: {
    users: [],
    currentUser: null,
    isAuthenticated: false
  },
  reducers: {
    registerUser: (state, action) => {
      const exists = state.users.some(u => u.username === action.payload.username);
      if (!exists) {
        state.users.push(action.payload);
      } else {
        alert("User already exists.");
      }
    },
    loginUser: (state, action) => {
      const foundUser = state.users.find(
        user =>
          user.username === action.payload.username &&
          user.password === action.payload.password
      );
      if (foundUser) {
        state.isAuthenticated = true;
        state.currentUser = foundUser;
      } else {
        alert("Invalid credentials");
      }
    },
    logOut: (state) => {
      state.isAuthenticated = false;
      state.currentUser = null;
    }
  }
});

// Store
const store = configureStore({
  reducer: {
    Products: productsSlice.reducer,
    cart: cartSlice.reducer,
    orders: orderSlice.reducer,
    user: userSlice.reducer
  }
});

// Save cart and orders to localStorage on update
store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem("cart", JSON.stringify(state.cart));
  localStorage.setItem("orders", JSON.stringify(state.orders));
});

// Export Actions
export const {
  Addtocart,
  incrementQuantity,
  decrementQuantity,
  removeItem,
  clearCart
} = cartSlice.actions;

export const {
  addOrder
} = orderSlice.actions;

export const {
  registerUser,
  loginUser,
  logOut
} = userSlice.actions;

export default store;
