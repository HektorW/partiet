import React from 'react'
import PropTypes from 'prop-types'
import MainLayout from '../../components/MainLayout'
import Loader from '../../components/Loader'
import MatchList from '../../components/MatchList'
import useUILoadState from '../../hooks/useUILoadState'

const Component = ({ isFetching, upcomingMatches, playedMatches }) => {
  const shouldShowLoadState = useUILoadState(isFetching, 0)

  return (
    <MainLayout>
      {shouldShowLoadState ? (
        <Loader />
      ) : (
        <>
          <h2>Spelade matcher</h2>
          <MatchList matches={playedMatches} />

          <h2>Kommande matcher</h2>
          <MatchList matches={upcomingMatches} />
        </>
      )}
    </MainLayout>
  )
}

Component.propTypes = {}

export default Component
