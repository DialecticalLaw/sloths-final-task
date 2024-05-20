import { useEffect, useState } from 'react';

export function useToken() {
  const [isToken, setToken] = useState(false);

  useEffect(() => {
    const refreshToken = localStorage.getItem('sloth-refreshToken');
    if (refreshToken) {
      setToken(true);
    } else {
      setToken(false);
    }
  }, []);
  return { isToken, setToken };
}
