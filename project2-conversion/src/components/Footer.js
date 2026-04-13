import React from 'react';

function Footer() {
  return (
    <footer className="bg-dark text-white text-center py-4 mt-auto">
      <div className="container">
        <p className="mb-2">Visit our partner sites:</p>
        <div className="footer-links">
          <a href="https://www.youtube.com" target="_blank" rel="noreferrer" className="text-white me-3">YouTube</a>
          <a href="https://www.github.com" target="_blank" rel="noreferrer" className="text-white me-3">GitHub</a>
          <a href="https://www.stackoverflow.com" target="_blank" rel="noreferrer" className="text-white me-3">Stack Overflow</a>
          <a href="https://www.medium.com" target="_blank" rel="noreferrer" className="text-white">Medium</a>
        </div>
        <p className="mt-3 mb-0">&copy; 2026 My Passion Project. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
