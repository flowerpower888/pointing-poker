import { Button } from 'antd';
import React, { useEffect, useState } from 'react';
import { Issue } from '../../../models/GameInfoAggregate/GameInfoModel';
import './timer.scss';

type TimerPropsType = {
  limit: number;
  status: string;
  setStatus: React.Dispatch<React.SetStateAction<string>>;
  currentIssue: Issue;
  onRoundEnd: () => void;
  onRoundStart: () => void;
  showTimerBtn?: boolean;
};

const Timer: React.FunctionComponent<TimerPropsType> = ({
  limit,
  status,
  setStatus,
  currentIssue,
  onRoundEnd,
  onRoundStart,
  showTimerBtn = true,
}) => {
  const [btnText, setBtnText] = useState('Run round');
  const [seconds, setSeconds] = useState(limit);
  const [timerInterval, setTimerInterval] = useState<number | null>(null);

  useEffect(() => {
    setBtnText('Run round');
  }, [currentIssue]);

  useEffect(() => {
    const stop = () => {
      if (timerInterval) {
        clearInterval(timerInterval);
      }
      setTimerInterval(null);
      setSeconds(limit);
      setStatus('stopped');
      setBtnText('Restart round');
    };

    if (seconds === 0) {
      stop();
      onRoundEnd();
    }
  }, [seconds, limit, timerInterval, status, setStatus, onRoundEnd]);

  const start = () => {
    if (status === 'stopped') {
      setStatus('started');
      onRoundStart();
      setTimerInterval(
        window.setInterval(() => {
          setSeconds(prev => prev - 1);
        }, 1000),
      );
    }
  };

  const isSingleDigit = (number: number): boolean => number % 10 === number;

  const format = (timeInSeconds: number): string => {
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
        {showTimerBtn && (
          <Button
            type="primary"
            size="large"
            disabled={status === 'started'}
            onClick={start}
          >
            {btnText}
          </Button>
        )}
      </div>
    </>
  );
};

export default Timer;
