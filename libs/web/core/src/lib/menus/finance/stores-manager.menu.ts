export const StoresManagerMenu: any[] = [
  {
    title: 'Dashboard',
    key: 'overview',
    url: '/dashboard',
    icon: 'fe fe-trending-up',
  },
  {
    icon: 'fe fe-package',
    title: 'Stocks',
    key: 'items',
    url: '/inventory/items',
  },
  {
    title: 'Stock Categories',
    icon: 'fa fa-sitemap',
    key: 'item-product-product-categories',
    url: '/inventory/categories',
  },
  {
    title: 'Stock Balances',
    icon: 'fe fe-file',
    key: 'stock-balances',
    url: '/inventory/stock-balances',
  },
  {
    title: 'Stock Movements',
    key: 'stock-movement',
    icon: 'fe fe-bar-chart-2',
    url: '/reports/stock-movements',
  },
  {
    title: 'Units',
    key: 'units',
    icon: 'fe fe-scissors',
    url: 'inventory/units'
  },

  {
    title: 'Warehouses',
    key: 'warehouse',
    icon: 'fa fa-cubes',
    url: 'inventory/warehouses'
  },



  {
    title: 'Account Centre',
    key: 'account-center',
    icon: 'fe fe-shield',
    url: '/user/account-center',
  }
];
