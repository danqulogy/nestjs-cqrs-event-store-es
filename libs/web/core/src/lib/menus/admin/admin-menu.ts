export const AdminMenu: any[] = [
  {
    title: 'Dashboards',
    key: 'dashboards',
    icon: 'fe fe-trending-up',
    url: '/dashboard'
  },
  {
    title: 'Activities',
    key: 'activities',
    icon: 'fe fe-activity',
    url: '/activities/timeline',
  },
  {
    category: true,
    title: 'Self Service',
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
  {
    title: 'Job Tickets',
    key: 'job-tickets',
    icon: 'fe fe-layers',
    children: [
      {
        title: 'My Tasks',
        key: 'my-tasks',
        icon: 'fe fe-check-square',
        url: '/tasks/list',
      },
      {
        title: 'Delegated Tasks',
        key: 'delegated-tasks',
        icon: 'fe fe-arrow-right-circle',
        url: '/tasks/delegated',
      },
    ],
  },

  {
    title: 'Support Center',
    key: 'support',
    icon: 'fe fe-alert-triangle',
    children: [
      {
        title: 'Report an Issue',
        key: 'create-issue',
        icon: 'fe fe-plus',
        url: '/support/create',
      },
      {
        title: 'Inbox',
        key: 'support-inbox',
        icon: 'fe fe-inbox',
        url: '/support/inbox',
      },
      {
        title: 'Sent',
        key: 'support-outbox',
        icon: 'fa fa-external-link',
        url: '/support/outbox',
      },
    ],
  },


  {
    category: true,
    title: 'Human Resource',
  },

  {
    title: 'Employees',
    key: 'all-members',
    icon: 'fe fe fe-users',
    children: [
      {
        title: 'All members',
        key: 'all-members',
        url: '/employees/all',
        icon: 'fe fe fe-list',
      },
      {
        title: 'Departments',
        key: 'departments',
        url: '/departments',
        icon: 'fe fe-grid',
      },
      {
        title: 'Resignations',
        key: 'resignations',
        icon: 'fe fe-user-x',
        url: '/resignations',
      },
    ]
  },
  {
    title: 'Leaves Tracker',
    key: 'leaves',
    icon: 'fe fe-eye-off',
    children: [
      {
        title: 'Leave Requests',
        key: 'Leave Requests',
        url: '/leaves/requests',
        icon: 'fe fe-inbox',
      },
      {
        title: 'Entitlements',
        key: 'Annual Entitlements',
        url: '/leaves/entitlements',
        icon: 'fe fe-tag',
      },
    ],
  },


  {
    title: 'Job Analysis',
    key: 'job-analysis',
    icon: 'fe fe-pocket',
    children: [
      {
        title: 'Reporting Hierarchy',
        key: 'reporting-lines',
        icon: 'fa fa-sitemap',
        url: '/reporting-hierarchy/charts',
      },
      {
        title: 'Job Positions',
        key: 'job-positions',
        icon: 'fe fe-award',
        url: '/job-analyses/listing',
      },
      {
        title: 'Job Classifications',
        key: 'job-classifications',
        icon: 'fe fe-list',
        url: '/job-analyses/job-classifications',
      },
    ]
  },

  {
    category: true,
    title: 'Sales & Marketing',
  },


  {
    title: 'Leads',
    key: 'leads',
    icon: 'fe fe-user-plus',
    url: '/leads/listing',
  },
  {
    title: 'Customers',
    icon: 'fe fe-user-check',
    key: 'customers',
    url: '/sales/customers',
  },
  {
    title: 'Contacts',
    key: 'contacts',
    url: '/contacts/list',
    icon: 'fa fa-address-card-o',
  },
  {
    title: 'Deals',
    key: 'deals',
    icon: 'fe fe-bookmark',
    url: '/deals/listing',
  },

  {
    category: true,
    title: 'Engineering',
  },

  {
    title: 'Projects',
    key: 'projects',
    icon: 'fe fe-cpu',
    url: '/projects/list',
  },
  {
    title: 'Requisitions',
    key: 'project-requisitions-list',
    url: '/project-requisitions/list',
    icon: 'fe fe-aperture',
  },
  {
    category: true,
    title: 'Stores & Finance',
  },
  {
    title: 'Inventory',
    key: 'inventory',
    icon: 'fe fe-box',
    children: [

      {
        title: 'Stock Items',
        key: 'items',
        url: '/inventory/items',
      },

      {
        title: 'Stcok Categories',
        key: 'item-product-product-categories',
        url: '/inventory/categories',
      },
      {
        title: 'Stock Balances',
        key: 'stock-balances',
        url: '/inventory/stock-balances',
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
      }
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

  {
    category: true,
    title: 'Reports',
  },
  {
    title: 'Stores & Finance',
    key: 'finance-reports',
    icon: 'fa fa-balance-scale',
    children: [
      {
        title: 'Stock Movements',
        key: 'stock-movements',
        url: '/reports/finance/stock-movements',
      },
      {
        title: 'Overdue Invoices',
        key: 'overdue-invoices',
        url: '/reports/finance/overdue-invoices',
      },
      // {
      //   title: 'Sales Report',
      //   key: 'sales-report',
      //   url: '/reports/sales-report',
      // },
    ],
  },

  {
    category: true,
    title: 'Settings',
  },
  {
    title: 'Settings',
    key: 'settings',
    icon: 'fe fe-settings',
    children: [


      // {
      //   title: 'Approvals',
      //   key: 'workflow-approvers',
      //   icon: 'fe fe-check-circle',
      //   url: '/approval-workflows',
      // },
      {
        title: 'Users',
        key: 'users',
        icon: 'fe fe-user-check',
        url: '/users/manage',
      },
      {
        title: 'Company Profile',
        icon: 'fe fe-globe',
        key: 'company',
        url: '/settings/company-profile',
      },
      // {
      //   title: 'Control Panel',
      //   icon: 'fe fe-tool',
      //   key: 'control-panel',
      //   url: '/settings/control-panel'
      // }
    ]
  },


  {
    title: 'Account Centre',
    key: 'account-center',
    icon: 'fe fe-shield',
    url: '/user/account-center',
  },
];
