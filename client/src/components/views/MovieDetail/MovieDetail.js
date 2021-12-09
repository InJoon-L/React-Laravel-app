import React, { useEffect, useState } from 'react'
import { API_URL, API_KEY, IMAGE_BASE_URL} from '../../Config'
import MainImage from '../LandingPage/Sections/MainImage'
import MovieInfo from './Sections/MovieInfo';
import GridCards from '../commons/GridCards'
import { Row } from 'antd'
import Favorite from './Sections/Favorite'
import Comment from './Sections/Comment'
import axios from 'axios';

function MovieDetail(props) {

    let movieId = props.match.params.movieId
    const [Movie, setMovie] = useState([])
    const [Casts, setCasts] = useState([])
    const [ActorToggle, setActorToggle] = useState(false)
    const [Comments, setComments] = useState([])

    useEffect(() => {

        let endpointCrew = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`
        let endpointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}`
        
        fetch(endpointInfo)
        .then(response => response.json())
        .then(response => {
            console.log(response)
            setMovie(response)
        })

        fetch(endpointCrew)
        .then(response => response.json())
        .then(response => {
            console.log(response)
            setCasts(response.cast)
        })

        axios.get('http://127.0.0.1:8000/api/comment/getComments/' + movieId)
        .then(res => {
            if (res.data.success) {
                setComments(res.data.comments)
                console.log(res.data)
            } else {
                alert('코멘트 정보를 가져오는 것을 실패하였습니다.')
            }
        })
    }, [])

    const refreshFunction = (newCommnet, updated) => {
        // setComments(Comments.concat(newCommnet))

        // if (updated) {
            axios.get('http://127.0.0.1:8000/api/comment/getComments/' + movieId)
            .then(res => {
                if (res.data.success) {
                    setComments(res.data.comments)
                    console.log(res.data)
                } else {
                    alert('코멘트 정보를 가져오는 것을 실패하였습니다.')
                }
            })
        // }
    }

    const toggleActorView = () => {
        setActorToggle(!ActorToggle)
    }

    return (
        <div>
            
            {/* Header */}
            <MainImage 
                image={`${IMAGE_BASE_URL}w1280${Movie.backdrop_path}`} 
                title={Movie.original_title}
                text={Movie.overview}
            />

            {/* Body */}
            <div style={{ width: '85%', margin: '1rem auto' }}>

                <div style={{ display: 'flex', justifyContent: 'flex-end'}}>
                    <Favorite movieInfo={ Movie } movieId={ movieId } userFrom={ localStorage.getItem('userId') }/>
                </div>

                {/* Movie Info */}
                <MovieInfo 
                    movie={ Movie }
                />
                <br />

                {/* Comment */}
                <Comment refreshFunction={refreshFunction} commentLists={Comments} movieId={movieId} />

                {/* Actors Grid */}
                {/* <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem' }}>
                    <button onClick={toggleActorView}> Toggle Actor View</button>
                </div>
                {ActorToggle &&
                    <Row gutter={[16, 16]}>
                        {Casts && Casts.map((cast, index) => (
                            <React.Fragment key={index}>
                                <GridCards 
                                    image={cast.profile_path ? 
                                        `${IMAGE_BASE_URL}w500${cast.profile_path}` : null}
                                    characterName={cast.name}
                                />
                            </React.Fragment>
                        ))}
                    </Row>
                } */}
            </div>
            
        </div>
    )
}

export default MovieDetail
