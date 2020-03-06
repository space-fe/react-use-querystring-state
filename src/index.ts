import { useRef, useMemo, useCallback } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import queryString from 'query-string'

export const stringifyParams = (params: any) => {
  try {
    return JSON.stringify(params)
  } catch (error) {
    return ''
  }
}

const parseQueryString = (qs: string) => {
  try {
    return JSON.parse(qs)
  } catch (error) {
    return null
  }
}

const getSearch = (preSearch: string, key: string, qs: string) => {
  const preSearchObj = queryString.parse(preSearch)
  const curSearchObj = {
    ...preSearchObj,
    [key]: qs
  }
  const curSearchStr = queryString.stringify(curSearchObj)
  return `?${curSearchStr}`
}

const getLocation = () => window.location

function useQueryStringState<T> (key: string, defaultParams: T): [T, (qs: T | ((preQS: T) => T)) => void] {
  // this state `location` will update automatically.
  const { search } = useLocation()
  const history = useHistory()

  const query = useMemo(() => queryString.parse(search)[key], [key, search])
  const defaultQueryString = stringifyParams(defaultParams)

  const queryStringState: T = useMemo(() => query ? parseQueryString(query as string) : parseQueryString(defaultQueryString), [defaultQueryString, query])

  const queryStringStateRef = useRef<T>(queryStringState)
  queryStringStateRef.current = queryStringState

  const updateQueryString = useCallback(
    (params: T | ((preQS: T) => T)) => {
      let nextParams = params
      if (typeof params === 'function') {
        nextParams = (params as (preQS: T) => T)(queryStringStateRef.current)
      }

      const { search, pathname } = getLocation()
      const curSearchStr = getSearch(search, key, stringifyParams(nextParams))
      const newPath = `${pathname}${curSearchStr}`
      history.push(newPath)
    },
    [key, history]
  )

  return [queryStringState, updateQueryString]
}

export default useQueryStringState
