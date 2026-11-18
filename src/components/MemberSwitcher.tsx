import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { MEMBERS_DATA } from '../data/membersData';
import { Sun, Moon, Check, Users, ChevronUp, ChevronDown } from 'lucide-react';

export const MemberSwitcher: React.FC = () => {
  const { currentMember, switchMember, isDarkMode, toggleDarkMode } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const membersList = Object.values(MEMBERS_DATA);

  return (
    <aside aria-label="Team editions switcher" className="fixed bottom-5 right-5 z-50">
      {/* Expanded Popover */}
      {isOpen && (
        <div className="mb-2 bg-[#141522]/95 text-white backdrop-blur-xl border border-white/15 rounded-2xl p-3 shadow-2xl w-72 animate-fade-in text-xs font-sans">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10">
            <span className="font-bold text-[11px] uppercase tracking-wider text-slate-400">
              Select Team Edition
            </span>
            <button
              onClick={toggleDarkMode}
              className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-white/10 hover:bg-white/20 transition-colors text-[11px]"
              title="Toggle theme mode"
            >
              {isDarkMode ? (
                <>
                  <Sun className="w-3 h-3 text-amber-300" />
                  <span>Soft Palette</span>
                </>
              ) : (
                <>
                  <Moon className="w-3 h-3 text-indigo-300" />
                  <span>Dark Mode</span>
                </>
              )}
            </button>
          </div>

          <div className="space-y-1.5">
            {membersList.map((member) => {
              const isActive = currentMember.id === member.id;
              return (
                <button
                  key={member.id}
                  onClick={() => {
                    switchMember(member.id);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl transition-all ${
                    isActive
                      ? 'bg-white/15 text-white font-semibold border border-white/30'
                      : 'hover:bg-white/10 text-slate-300 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className="w-3 h-3 rounded-full flex-shrink-0 border border-white/40 shadow-sm"
                      style={{ backgroundColor: member.colors.dominant }}
                    />
                    <div className="text-left">
                      <div className="text-xs font-medium">
                        {member.id === 'mine' ? 'Mine (Default)' : member.memberName}
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono">
                        {member.route}
                      </div>
                    </div>
                  </div>
                  {isActive && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Collapsed Pill Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 px-3.5 py-2 rounded-full bg-[#141522]/90 text-white backdrop-blur-md border border-white/15 shadow-xl hover:bg-[#1a1c2e] hover:border-white/30 transition-all text-xs font-semibold group"
      >
        <span
          className="w-2.5 h-2.5 rounded-full flex-shrink-0 border border-white/40"
          style={{ backgroundColor: currentMember.colors.dominant }}
        />
        <div className="flex items-center gap-1.5">
          <Users className="w-3.5 h-3.5 text-slate-400 group-hover:text-white transition-colors" />
          <span>
            {currentMember.id === 'mine' ? 'Mine Edition' : `${currentMember.memberName} Edition`}
          </span>
        </div>
        {isOpen ? (
          <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
        ) : (
          <ChevronUp className="w-3.5 h-3.5 text-slate-400" />
        )}
      </button>
    </aside>
  );
};
