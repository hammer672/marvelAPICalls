import React from 'react'
import { DataWrapper } from '../models/marvel'

const useQuery = <T>(url: string) => {
    const [results, setResults] = React.useState<T[]>([])
    const [isLoading, setLoading] = React.useState(false)
    const [error, setError] = React.useState<Error>()

    const fetchData = async (offset?: number) => {
        try {
            setError(undefined)
            setLoading(true)
            const newURL = offset ? `${url}&offset=${offset}` : url
            const response = await fetch(newURL)
            setLoading(false)
            const content: DataWrapper<T> = await response.json()
            if (content?.data?.results) {
                console.log('has results')
                setResults(content.data.results)
            }
        } catch (error) {
            setError(error as Error)
            setLoading(false)
        }
    }

    return [results, isLoading, error, fetchData] as const
}

export default useQuery
