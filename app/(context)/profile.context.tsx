"use client";

import React, { createContext, useEffect, useState } from 'react';
import { CaretStyleType, ThemeType } from '../(data)/types';
import { TypingResult } from '../types';

interface CustomizeBooleans {
  liveWpm: boolean;
  liveAccuracy: boolean;
  smoothCaret: boolean;
  soundOnClick: boolean;
}

export interface ICustomize extends CustomizeBooleans {
  inputWidth: number;
  fontSize: number;
  caretStyle: CaretStyleType;
  theme: ThemeType;
}

const customizeInitial: ICustomize = {
  liveWpm: false,
  liveAccuracy: false,
  inputWidth: 90,
  fontSize: 32,
  caretStyle: 'line',
  smoothCaret: true,
  soundOnClick: false,
  theme: "default ",
};

type StatsAverageType = { wpm: number; accuracy: number; raw: number };

export interface IProfile {
  username: string;
  customize: ICustomize;
  stats: {
    testsStarted?: number;
    testsCompleted?: number;
    average?: StatsAverageType;
    highest?: StatsAverageType;
  };
  history: { items: Record<number, TypingResult[]>; totalPages: number };
}

interface Context {
  profile: IProfile;
  onCustomizeUpdateState: (updatedProperties: Partial<ICustomize>) => void;
  onCustomizeToggleState: (property: keyof CustomizeBooleans) => void;
  onCustomizeResetState: () => void;
  onCustomizeUpdateServer: () => void;
  onTestsStartedUpdate: () => void;
  onTestsCompletedUpdate: (result: TypingResult) => void;
  onUpdateUsername: (username: string) => void;
  onClearHistory: () => void;
  onResetStats: () => void;
}

const initial: Context = {
  profile: {
    username: '',
    customize: customizeInitial,
    stats: { testsStarted: 0, testsCompleted: 0 },
    history: { items: {}, totalPages: 1 },
  },
  onCustomizeUpdateState: () => {},
  onCustomizeToggleState: () => {},
  onCustomizeResetState: () => {},
  onCustomizeUpdateServer: () => {},
  onTestsStartedUpdate: () => {},
  onTestsCompletedUpdate: () => {},
  onUpdateUsername: () => {},
  onClearHistory: () => {},
  onResetStats: () => {},
};

export const ProfileContext = createContext(initial);

let customizeServerLatest: ICustomize;

export function ProfileContextProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState(initial.profile);

  useEffect(() => {
    setProfile((state) => {
      const localStorageCustomize = localStorage.getItem('customize');
      if (!localStorageCustomize) return state;
      return { ...state, customize: JSON.parse(localStorageCustomize) };
    });
  }, []);

  useEffect(() => {
    localStorage.setItem('customize', JSON.stringify(profile.customize));
  }, [profile.customize]);

  const onCustomizeUpdateServer = () => {
    let update: Partial<ICustomize> = {};
    const keys = Object.keys(profile.customize) as (keyof ICustomize)[];

    if (!customizeServerLatest) {
      update = profile.customize;
    } else {
      keys.forEach((key) => {
        if (
          customizeServerLatest[key] === undefined ||
          profile.customize[key] !== customizeServerLatest[key]
        ) {
          Object.assign(update, { [key]: profile.customize[key] });
        }
      });
    }

    if (Object.keys(update).length !== 0) {
      customizeServerLatest = { ...profile.customize, ...update };
    }
  };

  const onCustomizeUpdateState: Context['onCustomizeUpdateState'] = (updatedProperties) => {
    setProfile((state) => ({
      ...state,
      customize: { ...state.customize, ...updatedProperties },
    }));
  };

  const onCustomizeToggleState: Context['onCustomizeToggleState'] = (property) => {
    setProfile((state) => ({
      ...state,
      customize: {
        ...state.customize,
        [property]: !state.customize[property],
      },
    }));
  };

  const onCustomizeResetState: Context['onCustomizeResetState'] = () => {
    setProfile((state) => ({
      ...state,
      customize: customizeInitial,
    }));
  };

  const onTestsStartedUpdate: Context['onTestsStartedUpdate'] = () => {
    setProfile((state) => ({
      ...state,
      stats: {
        ...state.stats,
        testsStarted: (state.stats.testsStarted || 0) + 1,
      },
    }));
  };

  const onTestsCompletedUpdate: Context['onTestsCompletedUpdate'] = (result) => {
    if (!profile.username) return;

    const timelineArray = Array.isArray(result.timeline)
      ? result.timeline
      : Object.values(result.timeline || {});
    const latest = timelineArray[timelineArray.length - 1];
    if (!latest) return;

    const resultLatest: StatsAverageType = {
      wpm: latest.wpm,
      accuracy: latest.accuracy,
      raw: latest.raw,
    };

    setProfile((state) => {
      const statsAverageKeys = ['wpm', 'accuracy', 'raw'] as (keyof StatsAverageType)[];
      const average = { ...state.stats.average } as StatsAverageType;
      const highest = { ...state.stats.highest } as StatsAverageType;
      const completed = state.stats.testsCompleted || 0;

      statsAverageKeys.forEach((key) => {
        const keyAverage = average[key] || 0;
        const newValue = resultLatest[key];

        average[key] = Number(((keyAverage * completed + newValue) / (completed + 1)).toFixed(2));
        highest[key] = Math.max(highest[key] || 0, newValue);
      });

      return {
        ...state,
        stats: {
          ...state.stats,
          testsCompleted: completed + 1,
          average,
          highest,
        },
        history: initial.profile.history, // adjust later for real history handling
      };
    });
  };

  const onUpdateUsername: Context['onUpdateUsername'] = (username) => {
    setProfile((state) => ({
      ...state,
      username,
    }));
  };

  const onClearHistory: Context['onClearHistory'] = () => {
    setProfile((state) => ({
      ...state,
      history: initial.profile.history,
    }));
  };

  const onResetStats: Context['onResetStats'] = () => {
    setProfile((state) => ({
      ...state,
      stats: initial.profile.stats,
    }));
  };

  useEffect(() => {
    const classList = document.body.classList;
    for (let i = 0; i < classList.length; i++) {
      if (classList[i].startsWith('theme--')) {
        classList.remove(classList[i]);
        break;
      }
    }

    document.body.classList.add(`theme--${profile.customize.theme || 'default'}`);
  }, [profile.customize.theme]);

  return (
    <ProfileContext.Provider
      value={{
        profile,
        onCustomizeUpdateState,
        onCustomizeToggleState,
        onCustomizeResetState,
        onCustomizeUpdateServer,
        onTestsStartedUpdate,
        onTestsCompletedUpdate,
        onUpdateUsername,
        onClearHistory,
        onResetStats,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
}
