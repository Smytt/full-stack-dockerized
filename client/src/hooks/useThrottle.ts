import { useState, useEffect } from "react";

type Props = {
  value: string;
  delay: number;
};

function useThrottle({ value, delay }: Props) {
  const [finalValue, setFinalValue] = useState(value);
  const [throttledValue, setThrottledValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setFinalValue(throttledValue);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [throttledValue, delay]);

  return [finalValue, setThrottledValue] as const;
}

export default useThrottle;
