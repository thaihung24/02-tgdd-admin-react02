import { combineReducers } from "redux";
import authReducer from "../slices/authSlice";
import postReducer from "../slices/postSlice";
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";
import rootReducer from "../redux/reducers";
import userReducer from "../slices/userSlice"
import orderReducer from "../slices/orderSlice"

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth','order']
}
const reducers = combineReducers({
    auth: authReducer,
    post: postReducer,
    theme:rootReducer,
    user: userReducer,
    order:orderReducer
})

export default persistReducer(persistConfig, reducers)