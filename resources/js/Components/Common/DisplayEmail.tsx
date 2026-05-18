import { useMemo } from 'react'

interface Props {
  email?: string | null
}

/**
 * Replace @ in emails with [at]
 * @param email
 * @constructor
 */
const DisplayEmail = ({ email }: Props) => {
  const formattedEmail = useMemo(() => {
    if (email == null) {
      return ''
    }
    return email.replace('@', '[at]')
  }, [email])

  return <>{formattedEmail}</>
}

export default DisplayEmail
