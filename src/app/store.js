import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import { authApi } from "../features/auth/authApi";
import registrationReducer from "../features/auth/registrationSlice";
import { registrationApi } from "../features/auth/registrationApi";
import profileReducer from "../features/profile/profileSlice";
import { profileApi } from "../features/profile/profileApi";
import dataAnalysisReducer from "../features/orders/dataAnalysisSlice";
import { dataAnalysisApi } from "../features/orders/dataAnalysisApi";
import quoteReducer from "../features/quotes/quoteSlice";
import { quoteApi } from "../features/quotes/quoteApi";
import ordersReducer from "../features/orders/orderSlice";
import { ordersApi } from "../features/orders/ordersApi";
import latexReducer from "../features/orders/latexOrderSlice";
import { latexOrdersApi } from "../features/orders/latexOrdersApi";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    registration: registrationReducer,
    profile: profileReducer,
    latexOrder: latexReducer,
    dataAnalysis: dataAnalysisReducer,
    quote: quoteReducer,
    orders: ordersReducer,
    [ordersApi.reducerPath]: ordersApi.reducer,
    [quoteApi.reducerPath]: quoteApi.reducer,
    [dataAnalysisApi.reducerPath]: dataAnalysisApi.reducer,
    [latexOrdersApi.reducerPath]: latexOrdersApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [registrationApi.reducerPath]: registrationApi.reducer,
    [profileApi.reducerPath]: profileApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(
      authApi.middleware,
      registrationApi.middleware,
      profileApi.middleware,
      dataAnalysisApi.middleware,
      latexOrdersApi.middleware,
      ordersApi.middleware,
      quoteApi.middleware
    );
  },
});
