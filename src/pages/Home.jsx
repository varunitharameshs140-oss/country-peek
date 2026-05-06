import { useEffect, useState } from 'react'
import CountryCard from '../components/CountryCard'
import Loader from '../components/Loader'

function Home() {
  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!search) {
        setCountries([])
        return
      }

      async function fetchCountries() {
        try {
          setLoading(true)
          setError('')

          // temporary delay for loading demo
          await new Promise((resolve) =>
            setTimeout(resolve, 1000)
          )

          const response = await fetch(
            `https://restcountries.com/v3.1/name/${search}`,
          )

          if (!response.ok) {
            throw new Error('No countries found.')
          }

          const data = await response.json()
          setCountries(data)
        } catch (err) {
          setError(err.message)
          setCountries([])
        } finally {
          setLoading(false)
        }
      }

      fetchCountries()
    }, 400)

    return () => clearTimeout(timer)
  }, [search])

  return (
    <section className="home">
      <input
        type="text"
        placeholder="Search for a country..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
      />

      {loading && <Loader />}

      {error && <p>{error}</p>}

      <div className="card-grid">
        {countries.map((country) => (
          <CountryCard
            key={country.cca3}
            country={country}
          />
        ))}
      </div>
    </section>
  )
}

export default Home