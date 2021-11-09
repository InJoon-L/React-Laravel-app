import React, { useEffect, useState, useRef } from 'react'
import { API_URL, API_KEY, IMAGE_BASE_URL } from '../../Config';
import MainImage from './Sections/MainImage'
import GridCards from '../commons/GridCards';
import { Row, Typography } from 'antd';
import axios from 'axios';

const { Title } = Typography;

function LandingPage() {

    const  buttonRef = useRef(null);

    const [Movies, setMovies] = useState([])
    const [MainMovieImage, setMainMovieImage] = useState(null)
    const [CurrentPage, setCurrentPage] = useState(0)
    const [Loading, setLoading] = useState(true)

    useEffect(() => {
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
        fetchMovies(endpoint)
    }, [])

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
    }, [])

    const fetchMovies = (endpoint) => {
        fetch(endpoint)
        .then(response => response.json())
        .then(response => {
            console.log(response)
            setMovies([...Movies, ...response.results])
            setMainMovieImage(response.results[0])
            setCurrentPage(response.page)
        }, setLoading(false))
        .catch(error => console.log('Error:', error))
    }

    const loadMoreItems = () => {
        setLoading(true);
        console.log('CurrentPage', CurrentPage);
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${CurrentPage+1}`;
        fetchMovies(endpoint);
        movieVideo(580489);

    }

    const handleScroll = () => {
        const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
        
        const body = document.body;
        const html = document.documentElement;
        const docHeight = Math.max(body.scrollHeight, body.offsetHeight, 
            html.clientHeight, html.scrollHeight, html.offsetHeight);
        const windowBottom = windowHeight + window.pageYOffset;

        if (windowBottom >= docHeight - 1) {
            console.log('clicked')

            buttonRef.current.click();
        }
    }
    // 노마드코더 영상 참조해서 만들 것
    const movieVideo = (movieId) => {
        const endpoint = `${API_URL}movie/${movieId}/videos?api_key=${API_KEY}`;
        axios.get(endpoint)
        .then(response => {
            console.log(response)
        })
        .catch(error => console.log(error))
    }

    return (
        <div style={{ width: '100%', margin: '0'}}>
            {/* Main Image */}
            {MainMovieImage &&
                <MainImage 
                    image={`${IMAGE_BASE_URL}w1280${MainMovieImage.backdrop_path}`} 
                    title={MainMovieImage.original_title}
                    text={MainMovieImage.overview}
                />
            }
            <div style= {{ width:'85%', margin:'1rem auto' }}>
                <Title level={2}> Movies by latest </Title>
                <hr />
                {/* Moive Grid Cards */}
                <Row gutter={[16, 16]}>
                    {Movies && Movies.map((movie, index) => (
                        <React.Fragment key={index}>
                            <div onMouseOver={() => console.log('hover')}>
                            <GridCards 
                                landingPage
                                image={movie.poster_path ? 
                                    `${IMAGE_BASE_URL}w500${movie.poster_path}` : null}
                                movieId={movie.id}
                                movieName={movie.original_title}
                            />
                            </div>
                        </React.Fragment>
                    ))}
                </Row>

                {Loading &&
                    <div>Loading...</div>}
                
                <br />

                <div style={{ display: 'flex', justifyContent: 'center'}}>
                    <button ref={buttonRef} className="loadMore" onClick={loadMoreItems}>Load More</button>
                </div>
            </div>

        </div>

        
    )
}

export default LandingPage
