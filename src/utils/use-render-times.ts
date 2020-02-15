import { useEffect, useRef } from 'react'

export function useRenderTimes() {
  const timesRef = useRef(1)

  useEffect(() => {
    timesRef.current += 1
  })

  return timesRef.current
}
