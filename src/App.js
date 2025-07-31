import React, { Suspense } from 'react';
import './App.css';
import { AppProvider } from './context/AppContext';
import ErrorBoundary from './components/common/ErrorBoundary/ErrorBoundary';
import LoadingSpinner from './components/common/LoadingSpinner/LoadingSpinner';
import Navbar from './components/layout/Navbar/Navbar';
import Hero from './components/sections/Hero/Hero';
import Footer from './components/layout/Footer/Footer';
import ChatWidget from './components/common/ChatWidget/ChatWidget'; // Add this

// Lazy load components for better performance
const About = React.lazy(() => import('./components/sections/About/About'));
const Skills = React.lazy(() => import('./components/sections/Skills/Skills'));
const Projects = React.lazy(() => import('./components/sections/Projects/Projects'));
const Education = React.lazy(() => import('./components/sections/Education/Education'));
const Experience = React.lazy(() => import('./components/sections/Experience/Experience')); 
const Contact = React.lazy(() => import('./components/sections/Contact/Contact'));


function App() {
  return (
    <AppProvider>
      <ErrorBoundary>
        <div className="App">
          {/* Animated Background */}
          <div className="animated-bg">
            <div className="floating-particles">
              <div className="particle"></div>
              <div className="particle"></div>
              <div className="particle"></div>
              <div className="particle"></div>
              <div className="particle"></div>
            </div>
          </div>

          <Navbar />
          <main id="main-content">
            <Hero />
            <Suspense fallback={<LoadingSpinner />}>
              <About />
              <Skills />
              <Projects />
              <Education />
              <Experience />
              <Contact />
            </Suspense>
          </main>
          <Footer />
           <ChatWidget />
        </div>
      </ErrorBoundary>
    </AppProvider>
  );
}

export default App;
