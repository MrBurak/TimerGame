import { useState, useRef, useEffect } from 'react';
import ResultModal from './ResultModal';

export default function TimerChallenge({ title, targetTime }) {
  const timerRef = useRef(null);
  const dialog = useRef(null);

  const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000);

  const timerIsActive = timeRemaining > 0 && timeRemaining < targetTime * 1000;

  useEffect(() => {
    if (timeRemaining <= 0 && timerRef.current) {
      clearInterval(timerRef.current);
      dialog.current.open();
    }
  }, [timeRemaining, targetTime]);

  function handleStartChallenge() {
    if (timerRef.current) return; // Prevent multiple intervals
    timerRef.current = setInterval(() => {
      setTimeRemaining(prev => prev - 10);
    }, 10);
  }

  function handleResetChallange()
  {
    setTimeRemaining(targetTime * 1000);
  }

  function handleStopChallenge() {
    dialog.current.open();
    clearInterval(timerRef.current);
    timerRef.current = null;
    
  }

  return (
    <>
      <ResultModal ref={dialog} targetTime={targetTime} remainingTime={timeRemaining} onReset={handleResetChallange} />
      <section className="challenge">
        <h2>{title}</h2>
        <p className="challange-time">
          {targetTime} second{targetTime > 1 ? 's' : ''}
        </p>
        <p className="challange-instructions">
          <button onClick={timerIsActive ? handleStopChallenge : handleStartChallenge}>
            {timerIsActive ? 'Stop' : 'Start'} Challenge
          </button>
        </p>
        <p className={timerIsActive ? 'active' : undefined}>
          {timerIsActive ? 'Time is running' : 'Time inactive'}
        </p>
      </section>
    </>
  );
}
