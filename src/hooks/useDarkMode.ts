import { useAppContext } from '../context/AppContext';

const useDarkMode = () => {
  const { darkMode, toggleDarkMode } = useAppContext();
  return { darkMode, toggleDarkMode };
};

export default useDarkMode;
