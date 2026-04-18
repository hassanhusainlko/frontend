import { configureStore } from "@reduxjs/toolkit";

// Auth
import authReducer from "../features/auth/authSlice";
import { authApi } from "../features/auth/authApi";
import registrationReducer from "../features/auth/registrationSlice";
import { registrationApi } from "../features/auth/registrationApi";

// Profile
import profileReducer from "../features/profile/profileSlice";
import { profileApi } from "../features/profile/profileApi";

// Orders
import ordersReducer from "../features/orders/orderSlice";
import { ordersApi } from "../features/orders/ordersApi";
import latexReducer from "../features/orders/latexOrderSlice";
import { latexOrdersApi } from "../features/orders/latexOrdersApi";
import dataAnalysisReducer from "../features/orders/dataAnalysisSlice";
import { dataAnalysisApi } from "../features/orders/dataAnalysisApi";

// Quotes
import quoteReducer from "../features/quotes/quoteSlice";
import { quoteApi } from "../features/quotes/quoteApi";

// Coupons
import couponsReducer from "../features/coupons/couponsSlice";
import { couponsApi } from "../features/coupons/couponsApi";

// Payments
import { paymentsApi } from "../features/payments/paymentsApi";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    registration: registrationReducer,
    profile: profileReducer,
    latexOrder: latexReducer,
    dataAnalysis: dataAnalysisReducer,
    quote: quoteReducer,
    orders: ordersReducer,
    coupons: couponsReducer,
    [authApi.reducerPath]: authApi.reducer,
    [registrationApi.reducerPath]: registrationApi.reducer,
    [profileApi.reducerPath]: profileApi.reducer,
    [ordersApi.reducerPath]: ordersApi.reducer,
    [latexOrdersApi.reducerPath]: latexOrdersApi.reducer,
    [dataAnalysisApi.reducerPath]: dataAnalysisApi.reducer,
    [quoteApi.reducerPath]: quoteApi.reducer,
    [couponsApi.reducerPath]: couponsApi.reducer,
    [paymentsApi.reducerPath]: paymentsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      registrationApi.middleware,
      profileApi.middleware,
      ordersApi.middleware,
      latexOrdersApi.middleware,
      dataAnalysisApi.middleware,
      quoteApi.middleware,
      couponsApi.middleware,
      paymentsApi.middleware
    ),
});
