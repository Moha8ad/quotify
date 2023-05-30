import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import quoteReducer from "./quote/quote.reducer";
import userReducer from "./user/user.reducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["quote"],
};

const rootReducer = combineReducers({
  quote: quoteReducer,
  user: userReducer,
});

export default persistReducer(persistConfig, rootReducer);
