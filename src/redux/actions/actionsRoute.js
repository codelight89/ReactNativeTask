/**
 * Created by user on 18.07.17.
 */
import { Actions } from 'react-native-router-flux';

export const resetToCards = () => {
  Actions.Cards({ type: 'reset' });
};

// export const replaceByCards = () => {
//   Actions.Cards({ type: 'replace' });
// };

export const resetToList = () => {
  Actions.List({ type: 'reset' });
};

export const replaceByJobs = () => {
  console.warn('replaceByJobs');
  Actions.JobsList({ type: 'replace' });
};

export const pushJobDetail = (data) => {
  console.warn('pushJobDetail');
  Actions.JobDetail({ data });
};

export const resetToLogin = () => {
  Actions.Login({ type: 'reset' });
};

export const pop = () => {
  Actions.pop();
};

export const toggleDrawer = () => {
  Actions.refresh({ key: 'root', open: value => !value });
};
