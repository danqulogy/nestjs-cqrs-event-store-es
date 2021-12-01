export const SecretaryMenu: any[] = [
  {
    title: 'Home',
    key: 'home',
    icon: 'fe fe-home',
    url: '/dashboard',
  },
  {
    category: true,
    title: 'App Services',
  },
  {
    title: 'My Tasks',
    key: 'tasks',
    icon: 'fe fe-check-square',
    url: '/tasks/list',
  },

  {
    title: 'Employees',
    key: 'employees',
    icon: 'fe fe-users',
    url: '/employees/all',
  },
  //
  // {
  //   title: 'Attendance',
  //   key: 'attendance',
  //   icon: 'fe fe-calendar',
  //   url: '/members/all',
  // },

  {
    title: 'Products',
    key: 'products',
    icon: 'fe fe-box',
    url: '/support/products',
  },
  {
    category: true,
    title: 'Support Center',
  },
  {
    title: 'Report an Issue',
    key: 'create-issue',
    icon: 'fe fe-plus',
    url: '/support/create',
  },
  {
    title: 'Browse Issues',
    key: 'issues',
    icon: 'fe fe-alert-triangle',
    url: '/support/listing',
  },

];
