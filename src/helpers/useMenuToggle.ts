import { useState, useEffect } from 'react';

export function useMenuToggle() {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const toggleMenuOpen = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 576) {
        setMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return { menuOpen, toggleMenuOpen };
}
