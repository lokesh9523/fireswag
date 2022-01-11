import React from 'react';
import { Switch, Redirect } from 'react-router-dom';
import { PublicRouteWithLayout, PrivateRouteWithLayout } from './../shared/components/RouteWithLayout';
import { Main as MainLayout, Minimal as MinimalLayout } from './../shared/components/layouts';

import
Logon from './components/Logon';
import Dashboard from './components/Dashboard';
import ProductTypes from './components/Product-types';
import Product from './components/product';
import Users from './components/users';
const Routes = () => {
  return (
    <Switch>
      <Redirect
        exact
        from="/"
        to="/admin/logon"
      />


      <PublicRouteWithLayout
        component={Logon}
        exact
        layout={MinimalLayout}
        path="/admin/logon"
      />

      <PrivateRouteWithLayout
        component={Dashboard}
        exact
        layout={MainLayout}
        path="/admin/dashboard"
      />
      <PrivateRouteWithLayout
        component={ProductTypes}
        exact
        layout={MainLayout}
        path="/admin/product-types"
      />
      <PrivateRouteWithLayout
        component={Product}
        exact
        layout={MainLayout}
        path="/admin/products"

      />
       <PrivateRouteWithLayout
        component={Users}
        exact
        layout={MainLayout}
        path="/admin/users"

      />
    </Switch>
  );
};

export default Routes;