import { useEffect, useState } from 'react'

function useCountries() {
  const [countries, setCountries] =
    useState([])

  const [loading, setLoading] =
    useState(true)

  const [error, setError] =
    useState('')

  useEffect(() => {
    async function fetchCountries() {
      try {
        setLoading(true)

        const response = await fetch(
          'https://restcountries.com/v3.1/all?fields=name,flags,population,region,capital,cca3',
        )

        if (!response.ok) {
          throw new Error(
            'Failed to fetch countries.',
          )
        }

        const data =
          await response.json()

        setCountries(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchCountries()
  }, [])

  return {
    countries,
    loading,
    error,
  }
}

export default useCountries
