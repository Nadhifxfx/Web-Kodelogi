import { AnimatePresence, motion } from "framer-motion";
import type { ReactNode } from "react";
import { useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import IntroOverlay from "./components/IntroOverlay";
import Home from "./pages/Home";
import Content from "./pages/Content";
import About from "./pages/About";
import Contact from "./pages/Contact";
import LearningPath from "./pages/LearningPath";

function PageTransition({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

export default function App() {
  const location = useLocation();
  const [appRevealed, setAppRevealed] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <IntroOverlay onWipeStart={() => setAppRevealed(true)} onComplete={() => setAppRevealed(true)} />

      <div className={appRevealed ? "contents" : "opacity-0 pointer-events-none select-none"}>
        <Navbar />
        <div className="flex-1">
          <AnimatePresence mode="wait" initial={false}>
            <Routes location={location} key={location.pathname}>
              <Route
                path="/"
                element={
                  <PageTransition>
                    <Home />
                  </PageTransition>
                }
              />
              <Route
                path="/courses"
                element={
                  <PageTransition>
                    <Content />
                  </PageTransition>
                }
              />
              <Route path="/content" element={<Navigate to="/courses" replace />} />
              <Route
                path="/learning-path"
                element={
                  <PageTransition>
                    <LearningPath />
                  </PageTransition>
                }
              />
              <Route
                path="/about"
                element={
                  <PageTransition>
                    <About />
                  </PageTransition>
                }
              />
              <Route
                path="/contact"
                element={
                  <PageTransition>
                    <Contact />
                  </PageTransition>
                }
              />
            </Routes>
          </AnimatePresence>
        </div>
        <Footer />
      </div>
    </div>
  );
}
