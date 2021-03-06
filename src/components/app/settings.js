export const DEFAULT_TASKS = [
  {
    id: 1,
    className: 'completed',
    description: 'Completed task',
    created: new Date('June 21, 2020 10:24:18'),
    timer: { active: false, min: '0', sec: '0' },
  },
  {
    id: 2,
    className: 'active-before-edit editing',
    description: 'Editing task',
    created: new Date('June 21, 2020 10:48:43'),
    timer: { active: true, min: '10', sec: '0' },
  },
  {
    id: 3,
    className: 'active',
    description: 'Active task',
    created: new Date('June 21, 2020 11:17:21'),
    timer: { active: true, min: '10', sec: '0' },
  },
];

export const DEFAULT_MAX_ID = 4;
