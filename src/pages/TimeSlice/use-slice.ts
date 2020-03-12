import {useState, useRef, useEffect} from 'react'

const defaultChunkSize = 1
const defaultChunkTime = 1000
export const useSlice = <T extends {}>(
  rawData: T[] = [],
  {chunkSize = defaultChunkSize, chunkTime = defaultChunkTime} = {},
) => {
  // 是否是第一次有数据
  const settled = useRef(false)
  // 是否在切片过程中传入了新数据被打断
  // 在切片的运行过程中 突然读取了新数据 那么此时要中断切片过程
  const breaked = useRef(false)
  const lastTimer = useRef<NodeJS.Timeout>()
  const [data, setData] = useState<T[]>([])

  const hasHandledRef = useRef(0)
  const handle = (fisrtScreenData: T[]) => {
    // 被中断了 就不要继续切片处理了
    if (breaked.current === true) {
      clearTimeout((lastTimer.current as any) as number)
      return
    }
    const hasHandled = hasHandledRef.current
    if (hasHandled < fisrtScreenData.length) {
      setData(prevData =>
        prevData.concat(
          fisrtScreenData.slice(hasHandled, hasHandled + chunkSize),
        ),
      )
      hasHandledRef.current += chunkSize
      lastTimer.current = setTimeout(() => handle(fisrtScreenData), chunkTime)
    }
  }

  useEffect(() => {
    // 有数据的情况下
    if (rawData.length) {
      // 第一次获取新数据 做切片
      if (!settled.current) {
        settled.current = true
        handle(rawData)
      } else {
        // 新数据覆盖的情况 中断上一次的切片
        breaked.current = true
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rawData])

  return breaked.current ? rawData : data
}
