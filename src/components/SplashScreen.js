// src/components/SplashScreen.js
import React, { useEffect, useState } from 'react';
import { Container, Spinner } from 'react-bootstrap';
import { FaBaby, FaHeartbeat, FaHospital } from 'react-icons/fa';

function SplashScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Animate progress bar
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + 2;
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            if (onComplete) onComplete();
          }, 500);
          return 100;
        }
        return newProgress;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div 
      className="splash-screen"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#0d6efd',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        transition: 'opacity 0.8s ease-out',
      }}
    >
      <div className="splash-content text-center text-white">
        {/* Logo/Icon */}
        <div className="splash-icons mb-4">
          <FaBaby size={60} className="me-3" />
          <FaHeartbeat size={60} className="me-3" />
          <FaHospital size={60} />
        </div>

        {/* Title */}
        <h1 className="display-3 fw-bold mb-3">
          Maternity-HIS
        </h1>
        <p className="lead mb-4">
          Birth Records Integration System
        </p>

        {/* Loading Bar */}
        <div className="splash-progress" style={{ width: '300px', maxWidth: '80%' }}>
          <div className="progress" style={{ height: '4px', backgroundColor: 'rgba(255,255,255,0.3)' }}>
            <div 
              className="progress-bar bg-white"
              style={{ 
                width: `${progress}%`,
                transition: 'width 0.3s ease'
              }}
            />
          </div>
          <p className="mt-2 small text-white-50">
            Loading system... {progress}%
          </p>
        </div>

        {/* Version */}
        <div className="mt-5 text-white-50" style={{ fontSize: '0.8rem' }}>
          <p>Version 1.0.0</p>
          <p className="mb-0">© 2024 Ministry of Health</p>
        </div>
      </div>

      {/* Animated Background Circles */}
      <div className="splash-circles" style={{ position: 'absolute', width: '100%', height: '100%', overflow: 'hidden' }}>
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              borderRadius: '50%',
              backgroundColor: 'rgba(255,255,255,0.05)',
              animation: `float ${6 + i * 2}s ease-in-out infinite`,
              width: `${200 + i * 150}px`,
              height: `${200 + i * 150}px`,
              top: `${20 + i * 15}%`,
              left: `${10 + i * 25}%`,
              animationDelay: `${i * 0.5}s`,
            }}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(30px, -30px) scale(1.1); }
        }
      `}</style>
    </div>
  );
}

export default SplashScreen;