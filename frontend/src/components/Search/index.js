import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useLocation } from "react-router-dom"
import { getSearchedTracks } from "../../store/search"
import SearchResults from "./SearchResults"
import './Search.css'

const Search = () => {
    const history = useHistory()
    const dispatch = useDispatch()

    // useLocation will grab the path after search (?q=someKeyword)
    const search = useLocation().search

    // URLSearchParams will then parse search term after 'q' (someKeyword)
    const keyword = new URLSearchParams(search).get('q')

    const trackQueries = useSelector(state => state?.search?.entries)
    const tracksArr = Object.values(trackQueries)

    useEffect(() => {
        dispatch(getSearchedTracks({keyword}))
    }, [dispatch, search])

    return (
        <div id='search-results'>
            <div className="search-title-ctn">
                <div className="search-title">
                    <h1 className="search-string">Search results for "{keyword}</h1><h1>"</h1>
                </div>
            </div>
            <div className='search-ctn'>
                {tracksArr && tracksArr.map(track => (
                    <div key={track.id} className='search-content'>
                        <SearchResults track={track} />
                    </div>
                ))}
            </div>
        </div>
    )

}

export default Search
