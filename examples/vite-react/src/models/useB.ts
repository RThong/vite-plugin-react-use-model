import { useState } from 'react';

export default function useB() {
  const [b, setB] = useState(1);
  return [b, setB] as const;
}
