import { useMemo } from 'react'
import { colorSchemes } from './chart-colors'

const useChartColorScheme = (colorScheme: string) => {
  return useMemo(() => {
    const colorSchemeObj = colorSchemes.find((scheme) => scheme.scheme === colorScheme)
    if (colorSchemeObj == null) {
      return colorSchemes.length > 0 ? colorSchemes[0].colors : []
    }
    return colorSchemeObj.colors
  }, [colorScheme])
}

export default useChartColorScheme
