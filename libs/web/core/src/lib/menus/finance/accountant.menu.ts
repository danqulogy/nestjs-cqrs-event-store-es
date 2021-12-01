export const AccountantMenu: any[] = [
  {
    title: 'Dashboard',
    key: 'overview',
    url: '/dashboard',
    icon: 'fe fe-trending-up',
  },
  {
    title: 'My Approvals',
    key: 'approvals',
    icon: 'fe fe-inbox',
    children: [
      {
        title: 'Leaves',
        key: 'leave-approvals',
        url: '/my-approvals/leaves',
        icon: 'fe fe-calendar',
      },
    ],
  },
  // {
  //   title: 'My Requests',
  //   key: 'my-requests',
  //   icon: 'fe fe-bookmark',
  //   children: [],
  // },

  {
    title: 'Items',
    key: 'manage-food-items',
    icon: 'fa fa-cubes',
    children: [

      {
        title: 'All Items',
        key: 'items',
        url: '/inventory/items',
      },

      {
        title: 'Categories',
        key: 'item-product-product-categories',
        url: '/inventory/categories',
      }
    ],
  },


  {
    title: 'Inventory',
    key: 'inventory',
    icon: 'fe fe-box',
    children: [
      {
        title: 'Inventory Items',
        key: 'inventory-food-items',
        url: '/inventory/list',
      },
      {
        title: 'Stock Quantities',
        key: 'stock-quantities',
        url: '/inventory/stock-balances',
      },
      {
        title: 'Low Stock Items',
        key: 'low-stocks',
        url: '/inventory/low-stocks',
      },
      {
        title: 'Stock Movements',
        key: 'stock-movements',
        url: '/reports/stock-movements',
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
      {
        title: 'Items',
        key: 'sales-food-items',
        url: '/sales/items',
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
      {
        title: 'Items',
        key: 'purchases-food-items',
        url: '/purchases/items',
      },
    ],
  },
  {
    title: 'Accounting',
    key: 'accounting',
    icon: 'fa fa-balance-scale',
    children: [
      {
        title: 'Journal Entries',
        key: 'journals',
        url: '/accounting/transactions',
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

  {
    title: 'Employees',
    key: 'employees',
    icon: 'fe fe-users',
    url: '/employees/all',
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

      {
        title: 'Overdue Invoices',
        key: 'overdue-invoices',
        url: '/reports/overdue-invoices',
      },
      {
        title: 'Sales Report',
        key: 'sales-report',
        url: '/reports/sales-report',
      },
    ],
  },



  {
    title: 'Settings',
    key: 'configure-taxes',
    icon: 'fe fe-settings',
    children: [
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

    ],
  },
  {
    title: 'Account Centre',
    key: 'account-center',
    icon: 'fe fe-shield',
    url: '/user/account-center',
  },

];
