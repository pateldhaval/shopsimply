import { store } from './store';

// [RootState types]
export type RootState = ReturnType<typeof store.getState>;
