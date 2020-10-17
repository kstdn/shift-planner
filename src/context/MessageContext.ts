import React, { Dispatch, SetStateAction } from 'react';

export const MessageContext = React.createContext<{
  message: string | undefined;
  setMessage: Dispatch<SetStateAction<string | undefined>>;
}>({
  message: undefined,
  setMessage: () => {},
});
