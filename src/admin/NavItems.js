import React from 'react';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import DashboardIcon from '@material-ui/icons/Dashboard';
import CategoryIcon from '@material-ui/icons/Category';
export default [
  {
    title: 'Dashboard',
    href: '/admin/dashboard',
    icon: <DashboardIcon />,
    module_name: 'Dashboard',
    show: true,
    expanded: false,
  },
  {
    title: 'Users',
    icon: <PeopleAltIcon />,
    href: '/admin/users',
    module_name: 'Users',
    show: true
  },
  {
    title: 'Products',
    icon: <CategoryIcon />,
    href: '/admin/products',
    module_name: 'Users',
    show: true
  },
  {
    title: 'ProductsTypes',
    icon: <CategoryIcon />,
    href: '/admin/product-types',
    module_name: 'Users',
    show: true
  }
];
