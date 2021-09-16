import { Button } from 'antd';
import React, { useEffect, useState } from 'react';
import './timer.scss';

type TimerPropsType = {
  limit: number;
  status: string;
  setStatus: React.Dispatch<React.SetStateAction<string>>;
  currentIssue: string;
  onRoundEnd: () => void;
  onRoundStart: () => void;
};

const Timer: React.FunctionComponent<TimerPropsType> = ({
  limit,
  status,
  setStatus,
  currentIssue,
  onRoundEnd,
  onRoundStart,
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

  const format = (s: number): string => {
    const ss = s % 60;
    const mm = Math.floor(s / 60) % 60;
    return [mm, ss].map(int => (int < 10 ? 0 + String(int) : int)).join(':');
  };

  return (
    <>
      <div className="timer">
        <div className="time">{format(seconds)}</div>

        <Button
          type="primary"
          size="large"
          disabled={status === 'started'}
          onClick={start}
        >
          {btnText}
        </Button>
      </div>
    </>
  );
};

export default Timer;
