export const ApiRoute = {
  Register: 'authentication/register',
  Login: 'authentication/login',
  RefreshToken: '/authentication/refresh-token',
  Logout: 'authentication/logout',
  
  UsersMe: 'users/me',
  ChangePassword: 'users/change-password',

  Workplaces: 'shift-planner/workplaces',
  ShiftTypes: (workplaceId: string) => `shift-planner/workplaces/${workplaceId}/shift-types`,
};
