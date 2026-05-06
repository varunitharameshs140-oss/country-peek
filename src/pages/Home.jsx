import { useMemo, useState } from 'react'
import CountryCard from '../components/CountryCard'
import Loader from '../components/Loader'
import useCountries from '../hooks/useCountries'

function Home() {
  const [search, setSearch] = useState('')

  const {
    countries,
    loading,
    error,
  } = useCountries()

  const filteredCountries = useMemo(() => {
    return countries.filter((country) =>
      country.name.common
        .toLowerCase()
        .includes(search.toLowerCase()),
    )
  }, [countries, search])

  return (
    <section className="home">
      <input
        type="text"
        placeholder="Search for a country..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        className="search"
      />

      {loading && <Loader />}

      {error && (
        <p className="home__status home__status--error">
          {error}
        </p>
      )}

      {!loading &&
        !error &&
        filteredCountries.length === 0 && (
          <p className="home__status">
            No countries found.
          </p>
        )}

      <div className="card-grid">
        {filteredCountries.map((country) => (
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