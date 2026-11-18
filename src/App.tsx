import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AdminContentProvider, useAdminContent } from './context/AdminContentContext';
import { MemberSwitcher } from './components/MemberSwitcher';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Testimonials } from './components/Testimonials';
import { InteractiveChallenge } from './components/InteractiveChallenge';
import { PreviousWorkshop } from './components/PreviousWorkshop';
import { NextWorkshopRegistration } from './components/NextWorkshopRegistration';
import { ProgramIntroduction } from './components/ProgramIntroduction';
import { ProgramCurriculum } from './components/ProgramCurriculum';
import { IndustrialImplementation } from './components/IndustrialImplementation';
import { PackageApplication } from './components/PackageApplication';
import { Footer } from './components/Footer';
import { PolicyModal } from './components/PolicyModal';
import { AdminModal } from './components/admin/AdminModal';
import { StudentProjectsPage } from './pages/StudentProjectsPage';
import { ChatbotChallengePage } from './pages/ChatbotChallengePage';
import { CompanyHomePage } from './pages/CompanyHomePage';

const LandingPageContent: React.FC = () => {
  const [policyModalType, setPolicyModalType] = useState<'privacy' | 'terms' | 'contact' | null>(null);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-theme-bg text-theme-typo flex flex-col font-sans transition-colors duration-300">
      {/* SECTION 01 — NAVIGATION BAR */}
      <Navbar
        onBookSlotClick={() => scrollToSection('application-form')}
        onProgramClick={() => scrollToSection('program')}
      />

      <main className="flex-1">
        {/* SECTION 02 — HERO SECTION (PLAYS IN-PLACE) */}
        <Hero />

        {/* SECTION 03 — TESTIMONIALS */}
        <Testimonials />

        {/* SECTION 04 — INTERACTIVE CHALLENGE */}
        <InteractiveChallenge />

        {/* SECTION 05 — PREVIOUS WORKSHOP */}
        <PreviousWorkshop onWatchVideo={() => scrollToSection('application-form')} />

        {/* SECTION 06 — NEXT WORKSHOP REGISTRATION */}
        <NextWorkshopRegistration />

        {/* SECTION 07 — PROGRAM INTRODUCTION */}
        <ProgramIntroduction
          onCurriculumClick={() => scrollToSection('curriculum')}
          onProjectsClick={() => scrollToSection('projects')}
        />

        {/* SECTION 08 — PROGRAM CURRICULUM */}
        <ProgramCurriculum />

        {/* SECTION 09 — INDUSTRIAL AI IMPLEMENTATION */}
        <IndustrialImplementation onWatchCoachingVideo={() => scrollToSection('application-form')} />

        {/* SECTION 10 — PROGRAM PACKAGE SELECTION AND APPLICATION */}
        <PackageApplication />
      </main>

      {/* SECTION 11 — FOOTER */}
      <Footer onOpenPolicy={(type) => setPolicyModalType(type)} />

      {/* Policy Modal */}
      <PolicyModal
        type={policyModalType}
        onClose={() => setPolicyModalType(null)}
      />

      {/* Admin Panel Modal (Triggered by Logo Click in Navbar or Footer, or /admin) */}
      <AdminModal />

      {/* Floating Discrete Team Edition Switcher */}
      <MemberSwitcher />
    </div>
  );
};

const AdminRouteAutoOpen: React.FC = () => {
  const { setIsAdminModalOpen } = useAdminContent();
  useEffect(() => {
    setIsAdminModalOpen(true);
  }, [setIsAdminModalOpen]);

  return <LandingPageContent />;
};

export const App: React.FC = () => {
  return (
    <AdminContentProvider>
      <ThemeProvider>
        <Routes>
          {/* Default Route: Levlox Tech Company Page */}
          <Route path="/" element={<CompanyHomePage />} />

          {/* Abdul Kalam Azad (Founder & Lead Architect) Cohort Page */}
          <Route path="/abdul" element={<LandingPageContent />} />
          <Route path="/abdul-kalam" element={<LandingPageContent />} />
          <Route path="/mine" element={<LandingPageContent />} />

          {/* Trainer Cohort Dedicated Pages */}
          <Route path="/asmi" element={<LandingPageContent />} />
          <Route path="/sudhan" element={<LandingPageContent />} />
          <Route path="/sathik" element={<LandingPageContent />} />
          <Route path="/hari" element={<LandingPageContent />} />

          {/* Admin and Micro-Lab Routes */}
          <Route path="/admin" element={<AdminRouteAutoOpen />} />
          <Route path="/chatbot-challenge" element={<ChatbotChallengePage />} />
          <Route path="/challenge" element={<ChatbotChallengePage />} />
          <Route path="/student-projects" element={<StudentProjectsPage />} />
          <Route path="/students-projects" element={<StudentProjectsPage />} />
          <Route path="*" element={<LandingPageContent />} />
        </Routes>
      </ThemeProvider>
    </AdminContentProvider>
  );
};

export default App;
