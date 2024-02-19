import { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext'

const useSignup = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState<undefined | boolean>(undefined)
  const { dispatch } = useContext(AuthContext)

  const signup = async (email: any, password: any) => {
    setIsLoading(true)
    setError(null)

    const response = await fetch('http://localhost:4000/api/user/sign-up', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ email, password })
    })
    const json = await response.json()

    if (!response.ok) {
      setIsLoading(false)
      setError(json.error)
    }
    if (response.ok) {
      // save the user to local storage
      localStorage.setItem('user', JSON.stringify(json))

      // update the auth context
      dispatch({type: 'LOGIN', payload: json})

      // update loading state
      setIsLoading(false)
    }
  }

  return { signup, isLoading, error }
}

export default useSignup