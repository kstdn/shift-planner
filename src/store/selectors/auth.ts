import { RootState } from '..';

export const getAuthStatus = (state: RootState) => state.auth.status;
