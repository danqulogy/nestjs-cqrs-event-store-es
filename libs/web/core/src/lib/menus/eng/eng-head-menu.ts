export const EngHeadMenu: any[] = [
  {
    title: 'Dashboards',
    key: 'dashboards',
    icon: 'fe fe-trending-up',
    url: '/dashboard',
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
    title: 'My Requests',
    key: 'my-requests',
    icon: 'fe fe-bookmark',
    children: [
      {
        title: 'Requisitions',
        key: 'project-requisitions',
        url: '/my-requests/project-requisitions',
        icon: 'fe fe-aperture',
      },
      // {
      //   title: 'General Requisition',
      //   key: 'general-requisitions',
      //   url: '/my-requests/general-requisitions',
      //   icon: 'fe fe-shopping-bag',
      // },
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
    title: 'Manage',
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
    title: 'Customers',
    key: 'customers',
    icon: 'fe fe-user-check',
    url: 'sales/customers',
  },
  {
    title: 'Quotes',
    key: 'all-project-quotes',
    url: '/sales/quotes',
    icon: 'fe fe-copy',
  },
  {
    title: 'Employees',
    key: 'employees',
    icon: 'fe fe-users',
    url: '/employees/all',
  },

  {
    category: true,
    title: 'Settings',
  },

  {
    title: 'Account Centre',
    key: 'account-center',
    icon: 'fe fe-shield',
    url: '/user/account-center',
  },
];
