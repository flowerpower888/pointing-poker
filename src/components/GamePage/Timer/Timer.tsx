import React, { useEffect, useState } from 'react';
import './timer.scss';

type TimerPropsType = {
  limit: number;
  status: string;
  setStatus: React.Dispatch<React.SetStateAction<string>>;
};

const Timer: React.FunctionComponent<TimerPropsType> = ({
  limit,
  status,
  setStatus,
}) => {
  const [seconds, setSeconds] = useState(limit);
  const [timerInterval, setTimerInterval] = useState<number | null>(null);

  useEffect(() => {
    const start = () => {
      setTimerInterval(
        window.setInterval(() => {
          setSeconds(prev => prev - 1);
        }, 1000),
      );
    };

    if (status === 'started') start();
  }, [status]);

  useEffect(() => {
    const stop = () => {
      if (timerInterval) {
        clearInterval(timerInterval);
      }
      setTimerInterval(null);
      setSeconds(limit);
      setStatus('stopped');
    };
    if (seconds === 0) {
      stop();
    }
  }, [seconds, limit, timerInterval, setStatus]);

  const format = (timeInSeconds: number): string => {
    const isSingleDigit = (number: number): boolean => number % 10 === number;

    const secondsInAMinute = 60;
    const minutesInAnHour = 60;
    const minutesInTime = Math.floor(timeInSeconds / secondsInAMinute);
    const minutesInTimeMinusHours = minutesInTime % minutesInAnHour;
    const secondsInTimeMinusMinutes = timeInSeconds % secondsInAMinute;
    return [minutesInTimeMinusHours, secondsInTimeMinusMinutes]
      .map(int => (isSingleDigit(int) ? 0 + String(int) : int))
      .join(':');
  };

  return (
    <>
      <div className="timer">
        <div className="time">{format(seconds)}</div>
      </div>
    </>
  );
};

export default Timer;
