export const AccountClerkMenu: any[] = [
  {
    title: 'Dashboard',
    key: 'overview',
    url: '/dashboard',
    icon: 'fe fe-trending-up',
  },
  {
    title: 'Inventory',
    key: 'inventory',
    icon: 'fe fe-box',
    children: [
      {
        title: 'Stock Balances',
        key: 'stock-balances',
        url: '/inventory/stock-balances',
      },
      {
        title: 'Stock Items',
        key: 'items',
        url: '/inventory/items',
      },

      {
        title: 'Categories',
        key: 'item-product-product-categories',
        url: '/inventory/categories',
      },
      {
        title: 'Warehouses',
        key: 'warehouse',
        url: '/inventory/warehouses',
      },
    ],
  },

  {
    title: 'Sales',
    key: 'sales',
    icon: 'fe fe-dollar-sign',
    children: [
      {
        title: 'Quotations',
        key: 'quotes',
        url: '/sales/quotes',
      },
      {
        title: 'Invoices',
        key: 'invoices',
        url: '/sales/invoices',
      },
      {
        title: 'Customers',
        key: 'customers',
        url: '/sales/customers',
      },
      {
        title: 'Projects',
        key: 'projects',
        url: '/sales/projects',
      },
    ],
  },

  {
    title: 'Purchases',
    key: 'purchases',
    icon: 'fe fe-shopping-cart',
    children: [
      {
        title: 'Suppliers',
        key: 'suppliers',
        url: '/purchases/suppliers',
      },

      {
        title: 'Purchase Orders',
        key: 'purchase-orders',
        url: '/purchases/orders',
      },
      // {
      //   title: 'Bills',
      //   key: 'bills',
      //   url: '/purchases/bills',
      // },
      // {
      //   title: 'Receipts',
      //   key: 'receipts',
      //   url: '/purchases/receipts',
      // },
    ],
  },
  {
    title: 'Accounting',
    key: 'accounting',
    icon: 'fa fa-balance-scale',
    children: [
      {
        title: 'Transactions',
        key: 'transactions',
        url: '/accounting/transactions',
      },
      {
        title: 'Starting Balances',
        key: 'starting-balances',
        url: '/accounting/starting-balances',
      },
      {
        title: 'Charts of Accounts',
        key: 'charts-of-accounts',
        url: '/accounting/charts-of-accounts',
      },
    ],
  },
  {
    title: 'Fixed Asset Manager',
    key: 'asset-manager',
    icon: 'fa fa-building',
    url: '/fixed-assets/list'
  },

  // {
  //   title: 'Payroll',
  //   key: 'payroll',
  //   icon: 'fa fa-id-card',
  //   children: [],
  // },

  {
    title: 'Reports',
    key: 'reports',
    icon: 'fa fa-file-excel-o',
    children: [
      {
        title: 'Trial Balance',
        key: 'trial-balance',
        url: '/reports/trial-balance',
      },
    ],
  },

  // {
  //   title: 'My Approvals',
  //   key: 'approvals',
  //   icon: 'fe fe-inbox',
  //   children: [
  //     {
  //       title: 'Leaves',
  //       key: 'leave-approvals',
  //       url: '/my-approvals/leaves',
  //       icon: 'fe fe-calendar',
  //     },
  //   ],
  // },
  // {
  //   title: 'My Requests',
  //   key: 'my-requests',
  //   icon: 'fe fe-bookmark',
  //   children: [],
  // },

  {
    category: true,
    title: 'Settings',
  },
  {
    title: 'Default Accounts',
    key: 'default-accounts',
    icon: 'fe fe-check-circle',
    url: '/settings/default-accounts',
  },
  {
    title: 'Sales Taxes',
    key: 'sales-taxes',
    icon: 'fa fa-hashtag',
    url: '/settings/sales-taxes',
  },
  // {
  //   title: 'Configure Taxes',
  //   key: 'configure-taxes',
  //   icon: 'fa fa-hashtag',
  //   children: [
  //     {
  //       title: 'Sales Taxes',
  //       key: 'sales-taxes',
  //       url: '/settings/sales-taxes',
  //     },
  //     {
  //       title: 'Purchases Taxes',
  //       key: 'purchases-taxes',
  //       url: '/settings/purchase-taxes',
  //     },
  //   ],
  // },
  // {
  //   title: 'Product Account Set',
  //   key: 'product-account-sets',
  //   icon: 'fa fa-cubes',
  //   url: '/settings/product-account-sets',
  // },
  {
    title: 'Payment Terms',
    key: 'payment-terms',
    url: '/settings/payment-terms',
    icon: 'fa fa-legal',
  },

  {
    title: 'Currencies',
    key: 'currencies',
    url: '/settings/currencies',
    icon: 'fa fa-money',
  },
  {
    title: 'Exchange Rates',
    key: 'exchange-rates',
    icon: 'fa fa-usd',
    url: '/settings/exchange-rates',
  },
  {
    title: 'Fiscal Years',
    key: 'fiscal-years',
    icon: 'fa fa-calendar-check-o',
    url: '/settings/fiscal-years',
  },
  {
    title: 'Account Centre',
    key: 'account-center',
    icon: 'fe fe-shield',
    url: '/user/account-center',
  },
];
