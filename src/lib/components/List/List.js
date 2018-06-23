import React, { Component } from 'react'
import PropTypes from 'prop-types'

const LoadMoreButton = ({ isFetching, onClick }) => (
  <button style={{ fontSize: '150%' }} onClick={onClick} disabled={isFetching}>
    {isFetching ? 'Loading...' : 'Load More'}
  </button>
)

const Loading = ({ label }) => (
  <h2>
    <i>{label}</i>
  </h2>
)

const Empty = () => (
  <h1>
    <i>Nothing here!</i>
  </h1>
)

const List = props => {
  const {
    isFetching,
    nextPageUrl,
    lastPageUrl,
    items,
    renderItem,
    loadingLabel,
    onLoadMore,
  } = props

  const isEmpty = items.length === 0
  const isLastPage = !nextPageUrl
  const isSinglePage = nextPageUrl === lastPageUrl

  if (isEmpty && isFetching) {
    return <Loading label={loadingLabel} />
  }

  if (isEmpty && isLastPage) {
    return <Empty />
  }

  return (
    <div>
      {items.map(renderItem)}
      {!isSinglePage &&
        !isLastPage && (
          <LoadMoreButton isFetching={isFetching} onClick={onLoadMore} />
        )}
    </div>
  )
}

List.propTypes = {
  loadingLabel: PropTypes.string.isRequired,
  renderItem: PropTypes.func.isRequired,
  items: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  onLoadMore: PropTypes.func.isRequired,
  pageCount: PropTypes.number,
  nextPageUrl: PropTypes.string,
}

List.defaultProps = {
  isFetching: true,
  loadingLabel: 'Loading...',
  items: [],
}

export default List
