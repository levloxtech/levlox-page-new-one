import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MEMBERS_DATA, type MemberTheme } from '../data/membersData';

interface ThemeContextType {
  currentMember: MemberTheme;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  switchMember: (memberId: 'mine' | 'asmi' | 'sudhan' | 'sathik' | 'hari') => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  // Resolve member from path
  const getMemberFromPath = (path: string): MemberTheme => {
    const cleanPath = path.toLowerCase().replace(/\/$/, '') || '/';
    if (cleanPath === '/asmi') return MEMBERS_DATA.asmi;
    if (cleanPath === '/sudhan') return MEMBERS_DATA.sudhan;
    if (cleanPath === '/sathik') return MEMBERS_DATA.sathik;
    if (cleanPath === '/hari') return MEMBERS_DATA.hari;
    if (cleanPath === '/abdul' || cleanPath === '/abdul-kalam' || cleanPath === '/mine') return MEMBERS_DATA.mine;
    return MEMBERS_DATA.mine;
  };

  const currentMember = useMemo(
    () => getMemberFromPath(location.pathname),
    [location.pathname]
  );

  const switchMember = (memberId: 'mine' | 'asmi' | 'sudhan' | 'sathik' | 'hari') => {
    const target = MEMBERS_DATA[memberId];
    if (target) {
      navigate(target.route);
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  // Apply CSS custom properties dynamically
  useEffect(() => {
    const root = document.documentElement;
    const c = currentMember.colors;

    if (isDarkMode) {
      // Cyber Dark Edition
      root.style.setProperty('--c-dominant', c.dominant);
      root.style.setProperty('--c-dominant-hover', c.dominantHover);
      root.style.setProperty('--c-bg', '#08080C');
      root.style.setProperty('--c-surface', '#0F1017');
      root.style.setProperty('--c-surface-muted', '#141622');
      root.style.setProperty('--c-typo', '#F3F4F6');
      root.style.setProperty('--c-text-muted', '#9CA3AF');
      root.style.setProperty('--c-supporting', 'rgba(255, 255, 255, 0.12)');
      root.style.setProperty('--c-border', 'rgba(255, 255, 255, 0.08)');
      root.style.setProperty('--c-glow', c.glow);
      root.style.setProperty('--c-contrast-bg', '#131420');
      root.style.setProperty('--c-contrast-surface', '#181926');
      root.style.setProperty('--c-contrast-text', '#FFFFFF');
      root.style.setProperty('--c-contrast-text-muted', '#9CA3AF');
      root.style.setProperty('--c-contrast-border', 'rgba(255, 255, 255, 0.12)');
    } else {
      // User-Specified Editorial Soft Luxury Palette with in-between contrast sections
      root.style.setProperty('--c-dominant', c.dominant);
      root.style.setProperty('--c-dominant-hover', c.dominantHover);
      root.style.setProperty('--c-bg', c.background);
      root.style.setProperty('--c-surface', c.surface);
      root.style.setProperty('--c-surface-muted', c.surfaceMuted);
      root.style.setProperty('--c-typo', c.typography);
      root.style.setProperty('--c-text-muted', c.textMuted);
      root.style.setProperty('--c-supporting', c.supporting);
      root.style.setProperty('--c-border', c.supporting);
      root.style.setProperty('--c-glow', c.glow);
      root.style.setProperty('--c-contrast-bg', c.contrastBg); // e.g. #393044 Deep Plum!
      root.style.setProperty('--c-contrast-surface', c.contrastSurface);
      root.style.setProperty('--c-contrast-text', c.contrastText);
      root.style.setProperty('--c-contrast-text-muted', c.contrastTextMuted);
      root.style.setProperty('--c-contrast-border', c.contrastBorder);
    }
  }, [currentMember, isDarkMode]);

  return (
    <ThemeContext.Provider value={{ currentMember, isDarkMode, toggleDarkMode, switchMember }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
