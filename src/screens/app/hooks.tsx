import {
  useEffect, useState,
} from 'react';
import { getLanguageValue } from '@utils';
import {
  darkTheme,
  lightTheme,
} from '@styles';
import { KeybaseProfile } from '@models';
import {
  i18n,
  useTranslation,
} from '../../../i18n';

export const useAppHook = () => {
  const { t } = useTranslation('common');
  // =========================
  // theme
  // =========================
  const [themeMode, setMode] = useState('light');
  const theme:any = themeMode === 'dark' ? darkTheme : lightTheme;

  useEffect(() => {
    const isClient = typeof window === 'object';
    if (isClient && window?.matchMedia('(prefers-color-scheme: dark)')?.matches) {
      setMode('dark');
    }
  }, []);

  const toggleThemeMode = () => {
    const value = themeMode === 'light' ? 'dark' : 'light';
    setMode(value);
  };

  const getThemeMode = () => {
    return ({
      value: t(themeMode),
      key: themeMode,
    });
  };

  // =========================
  // language
  // =========================
  const changeLanguage = ({
    key, value,
  }: any) => {
    console.log(`Click Value ${value} with key ${key}`);
    if (i18n.language !== key) {
      i18n.changeLanguage(key);
    }
  };

  const getCurrentLanguage = () => {
    const lang = i18n.language ?? 'en';
    return {
      key: lang,
      value: getLanguageValue(lang),
    };
  };

  return {
    themeMode,
    setMode,
    theme,
    toggleThemeMode,
    changeLanguage,
    getCurrentLanguage,
    getThemeMode,
  };
};

export const useKeybaseHook = () => {
  const [keybaseList, setKeybase] = useState({
  });

  const handleSetKeybase = (stateChange: {
    [key: string]: KeybaseProfile;
  }) => {
    setKeybase((prevState) => {
      return ({
        ...prevState, ...stateChange,
      });
    });
  };

  return {
    keybaseList,
    handleSetKeybase,
  };
};
