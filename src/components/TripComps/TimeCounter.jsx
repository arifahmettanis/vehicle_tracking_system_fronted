import { differenceInMinutes, min } from 'date-fns';
import { useState, useEffect, memo } from 'react';
function TimeCounter({ time }) {
  const [elapsedTotalMinutes, setElapsedTotalMinutes] = useState(0);
  console.log('Üstten gelen zaman : ', time);
  useEffect(() => {
    const updateTime = () => setElapsedTotalMinutes(differenceInMinutes(new Date(), time));

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [time]);

  const hours = Math.floor(elapsedTotalMinutes / 60);
  const minutes = elapsedTotalMinutes % 60;

  console.log(hours > 0 ? hours + ' saat ' + minutes + ' dakika' : minutes + ' dakika');
  return <>{hours > 0 ? hours + ' saat ' + minutes + ' dakika' : minutes + ' dakika'}</>;
}

export default memo(TimeCounter);
