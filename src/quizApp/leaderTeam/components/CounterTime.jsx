
export const CountdownTimer = ({ minutes, seconds, onTimerEnd }) => {
    const [timeLeft, setTimeLeft] = useState(minutes * 60 + seconds);

    useEffect(() => {
      const timer =
        timeLeft > 0 &&
        setInterval(() => {
          setTimeLeft(timeLeft - 1);
        }, 1000);

      return () => clearInterval(timer);
    }, [timeLeft]);

    useEffect(() => {
      if (timeLeft === 0) {
        // Cuando se acabe el tiempo
        // hacer un dispatch ala api y donde se guarde el id del examen y del usuario
        onTimerEnd();
      }
    }, [timeLeft, onTimerEnd]);

    const formattedMinutes = Math.floor(timeLeft / 60)
      .toString()
      .padStart(2, "0");
    const formattedSeconds = (timeLeft % 60).toString().padStart(2, "0");

    return (
      <div>
        <h1>
          {formattedMinutes}:{formattedSeconds}
        </h1>
      </div>
    );
  };