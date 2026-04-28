import { useEffect } from 'react';
import { Routes, Route } from 'react-router'
import Home from './pages/Home'

export default function App() {
  // Force scroll to top on initial load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  )
}
