import { useCallback, useState } from 'react'
import { router } from '@inertiajs/react'
import { LaravelFlash } from '../ui/ui_interfaces'
import { showError } from '../ui/alerts'

export interface PostOptions {
  showErrorToast?: boolean
  forceFormData?: boolean
}

const useInertiaPost = <T,>(
  url: string,
  onComplete?: () => unknown | null,
  options?: PostOptions
) => {
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)
  const post = useCallback(
    (form: T) => {
      setLoading(true)
      router.post(
        url,
        {
          ...form,
        } as any,
        {
          forceFormData: options?.forceFormData ?? false,
          onFinish: () => {
            setLoading(false)
          },
          onSuccess: (data) => {
            const flash = data.props.flash as LaravelFlash
            if (flash.error == null && onComplete != null) {
              onComplete()
            }
          },
          onError: (errors) => {
            if (options?.showErrorToast) {
              const keys = Object.keys(errors)
              keys.forEach((key) => {
                showError(errors[key])
              })
            }
            setErrors(errors)
          },
        }
      )
    },
    [onComplete, url, options?.showErrorToast, options?.forceFormData]
  )

  return { post, loading, errors }
}

export default useInertiaPost
