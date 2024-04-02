import { combineReducers } from "redux";
import _permisions from "./reducers/permissions/reducer"
import users from "./reducers/users/reducer";
import admins from './reducers/admins/reducer'
import portas from './reducers/portas/reducer'
import portasout from './reducers/portasout/reducer'
import portasoutdue from './reducers/portasoutdue/reducer'
import portasoutclosed from './reducers/portasoutclosed/reducer'
import topologias from './reducers/topologias/reducer'

export const rootReducer = combineReducers({
  _permissions: _permisions,
  users: users,
  admins: admins,
  portas: portas,
  portasout: portasout,
  portasoutdue: portasoutdue,
  portasoutclosed: portasoutclosed,
  topologias: topologias

});
