import { useEffect, useState } from "react";


const calculateScreen = (width: number): string => {
  if (width < 640) {
    return ''
  }
  if (width < 768) {
    return 'sm'
  }
  if (width < 1024) {
    return 'md'
  }
  if (width < 1280) {
    return 'lg'
  }
  if (width < 1536) {
    return 'xl'
  }
  return '2xl'
}

const useScreen = () => {

  const [screen, setScreen] = useState('')

  useEffect(() => {
    setScreen(calculateScreen(window.innerWidth));
    const handleResize = () => setScreen(calculateScreen(window.innerWidth))
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return screen
}


export default useScreen
