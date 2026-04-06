import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { Home } from './pages/Home';
import { Life } from './pages/Life';
import { Me } from './pages/Me';
import { ArticleDetail } from './pages/ArticleDetail';
import { MerchantDetail } from './pages/MerchantDetail';
import { AddBusiness } from './pages/AddBusiness';
import { SubmissionSuccess } from './pages/SubmissionSuccess';

function AnimatedRoutes() {
  const location = useLocation();
  
  // Hide shell components on focused pages
  const isFocusedPage = ['/submission-success', '/add-business'].includes(location.pathname);

  return (
    <>
      {!isFocusedPage && <Header />}
      <AnimatePresence mode="wait">
        <Routes location={location}>
          <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
          <Route path="/life" element={<PageWrapper><Life /></PageWrapper>} />
          <Route path="/me" element={<PageWrapper><Me /></PageWrapper>} />
          <Route path="/article/:id" element={<PageWrapper><ArticleDetail /></PageWrapper>} />
          <Route path="/merchant/:id" element={<PageWrapper><MerchantDetail /></PageWrapper>} />
          <Route path="/add-business" element={<PageWrapper><AddBusiness /></PageWrapper>} />
          <Route path="/submission-success" element={<PageWrapper><SubmissionSuccess /></PageWrapper>} />
        </Routes>
      </AnimatePresence>
      {!isFocusedPage && <BottomNav />}
    </>
  );
}

function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-surface">
        <AnimatedRoutes />
      </div>
    </Router>
  );
}
