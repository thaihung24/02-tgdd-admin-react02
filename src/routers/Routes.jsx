import React from 'react'
import { Route, Switch } from 'react-router-dom';

import Dashboard from '../page/Dashboard'
import Customers from '../page/Customer'
import Products from '../page/Products'
import Analytics from '../page/Analytics';
import Orders from '../page/Orders';
import LoginPage from '../page/LoginPage';
import Profile from '../page/profile/Profile';
import OrderDetail from '../page/orderDetail/OrderDetail';
import { useSelector } from 'react-redux'
const Routes = () => {
  const { user } = useSelector((state) => state.auth)
  return (
    <Switch>

      {/* Admin */}
      {/* <Route path='/'  element={<Redirect to = "/home"/>} /> */}
      <Route path='/' exact component={Dashboard} />
      {
        user && user.role === 'ROLE_ADMIN' && (
          <Route path='/customers' exact component={Customers} />

        )
      }
      {
        user && user.role === 'ROLE_ADMIN' && (
          <Route path={'/analytics'} exact component={Analytics} />

        )
      }
      {
        user && user.role === 'ROLE_ADMIN' && (
          <Route path='/customers' exact component={Customers} />

        )
      }
       {
        user && user.role === 'ROLE_ADMIN' && (
          <Route path='/products' exact component={Products} />

        )
      }
      {
        user && user.role === 'ROLE_ADMIN' && (
          <Route path={'/orders'} exact component={Orders} />

        )
      }
      {
        user && user.role === 'ROLE_ADMIN' && (
          <Route path={'/profile'} exact component={Profile} />

        )
      }
      {
          user && user.role === 'ROLE_ADMIN' && (
            <Route path={'/orderDetail'} exact component={OrderDetail} />
  
          )
      }



      <Route path={'/login'} exact component={LoginPage} />
    </Switch>
  )
}
export default Routes