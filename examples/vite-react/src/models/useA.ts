import { useState } from 'react'

export default function useA() {
  const [a, setA] = useState(1)

  return { a, setA }
}
