import { useEffect, useState } from 'react'

const useClick = (
  reference?: React.MutableRefObject<HTMLElement | null>,
  onOutsideClick?: () => void
): [target: Node | null] => {
  const [target, setTarget] = useState<Node | null>(null)

  useEffect(() => {
    const handler = (event: MouseEvent) => {
      setTarget(event.target as Node)
    }
    document.body.addEventListener('click', handler)
    return () => {
      document.body.removeEventListener('click', handler)
    }
  }, [])

  useEffect(() => {
    if (target == null) return
    if (reference?.current?.contains(target) !== true) {
      onOutsideClick?.()
    }
  }, [target, onOutsideClick, reference])

  return [target]
}

export default useClick
