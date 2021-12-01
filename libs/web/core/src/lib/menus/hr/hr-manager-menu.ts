export const HrManagerMenu: any[] = [
  {
    title: 'Dashboard',
    key: 'overview',
    url: '/dashboard',
    icon: 'fe fe-trending-up',
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
      {
        title: 'Payroll',
        key: 'payroll-approvals',
        url: '/my-approvals/payroll',
        icon: 'fe fe-dollar-sign',
      },
    ],
  },

  {
    title: 'My Requests',
    key: 'my-requests',
    icon: 'fe fe-bookmark',
    children: [
      {
        title: 'Employee Salaries',
        key: 'employee-salary-upgrades-requests',
        url: '/my-requests/employee-salary-upgrades',
        icon: 'fe fe-users',
      },
      {
        title: 'Payband Upgrades',
        key: 'payband-upgrades-requests',
        url: '/my-requests/payband-salary-upgrades',
        icon: 'fe fe-sliders',
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
    title: 'Employees',
  },
  {
    title: 'All members',
    key: 'all-members',
    url: '/employees/all',
    icon: 'fe fe fe-users',
  },
  {
    title: 'Pay Upgrade',
    key: 'employee-pay-grades',
    url: '/employees/pay-grades',
    icon: 'fe fe-sliders',
  },
  {
    title: 'Departments',
    key: 'departments',
    url: '/departments',
    icon: 'fe fe-grid',
  },

  {
    category: true,
    title: 'Leaves Tracker',
  },
  {
    title: 'Leave Requests',
    key: 'Leave Requests',
    url: '/leaves/requests',
    icon: 'fe fe-inbox',
  },
  {
    title: 'Annual Entitlements',
    key: 'Annual Entitlements',
    url: '/leaves/entitlements',
    icon: 'fe fe-tag',
  },
  {
    title: 'Holiday Calendar',
    key: 'holidays',
    icon: 'fe fe-calendar',
    url: '/holidays',
  },
  // {
  //   title: 'Leaves Tracker',
  //   key: 'leaves',
  //   icon: 'fe fe-eye-off',
  //   children: [
  //
  //   ],
  // },

  {
    category: true,
    title: 'Others',
  },
  {
    title: 'Job Analyses',
    key: 'job-analysis',
    icon: 'fe fe-pocket',
    children: [
      {
        title: 'Job Positions',
        key: 'job-analysis-list',
        icon: 'fe fe-award',
        url: '/job-analyses/listing',
      },
      {
        title: 'Reporting Hierarchy',
        key: 'reporting-lines',
        icon: 'fa fa-sitemap',
        url: '/reporting-hierarchy/charts',
      },
      {
        title: 'Salary Upgrades',
        key: 'manage-requests',
        icon: 'fe fe-copy',
        url: '/job-analyses/requests',
      },
      {
        title: 'Job Classifications',
        key: 'job-classifications',
        icon: 'fe fe-list',
        url: '/job-analyses/job-classifications',
      },
    ],
  },



  // {
  //   category: true,
  //   title: 'Performance',
  // },
  // {
  //   title: 'Training',
  //   key: 'training',
  //   icon: 'fe fe-edit',
  //   children: [
  //     {
  //       title: 'Participants',
  //       key: 'participants',
  //       url: '/training/participants',
  //     },
  //     {
  //       title: 'Courses',
  //       key: 'courses',
  //       url: '/training/courses',
  //     },
  //     {
  //       title: 'Trainers',
  //       key: 'Trainers',
  //       url: '/training/trainers',
  //     },
  //   ],
  // },
  // {
  //   title: 'Resignation',
  //   key: 'resignations',
  //   icon: 'fe fe-arrow-up-circle',
  //   url: '/performance/resignations',
  // },
  // {
  //   category: true,
  //   title: 'Administration',
  // },

  // {
  //   title: 'Settings',
  //   key: 'settings',
  //   icon: 'fe fe-settings',
  //   children: [
  // {
  //   title: 'Organization',
  //   key: 'organization',
  //   icon: 'fa fa-building-o',
  //   path: '/settings/company-profile',
  // },
  // {
  //   title: 'Holidays',
  //   key: 'holidays',
  //   icon: 'fe fe-eye-off',
  //   url: '/members/holidays',
  // },
  //
  // {
  //   title: 'Religions',
  //   key: 'religions',
  //   url: '/religions/manage',
  // },
  //   ],
  // },
  // {
  //   title: 'Account Centre',
  //   key: 'account-center',
  //   icon: 'fe fe-shield',
  //   url: '/user/account-center',
  // },
  // {
  //   title: 'Developer Mode',
  //   key: 'developer',
  //   icon: 'fe fe-code',
  //   children: [
  //     {
  //       title: 'Modules',
  //       key: 'modules',
  //       url: '/developer/modules',
  //     },
  //     {
  //       title: 'Roles & Permissions',
  //       key: 'roles',
  //       url: '/developer/user-roles',
  //     },
  //   ],
  // },
];
