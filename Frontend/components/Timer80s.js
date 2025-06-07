import { useState, useEffect } from 'react';

export default function Timer80s({ onTimeUp }) {
  const [seconds, setSeconds] = useState(80);

  useEffect(() => {
    if (seconds <= 0) {
      onTimeUp();
      return;
    }
    const id = setInterval(() => setSeconds(prev => prev - 1), 1000);
    return () => clearInterval(id);
  }, [seconds]);

  return (
    <div className="text-lg font-semibold">
      Tempo restante: {seconds} s
    </div>
  );
}
