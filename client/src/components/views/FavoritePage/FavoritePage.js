import React, { useEffect, useState } from 'react'
import { Typography, Popover, Button } from 'antd';
import './favorite.css'
import Axios from 'axios'
import { IMAGE_BASE_URL, POSTER_SIZE } from '../../Config'

const { Title } = Typography;

function FavoritePage() {
    
    const [Favorites, setFavorites] = useState([])


    useEffect(() => {
        
        fetchFavoredMovie()

    }, [])
    
    const fetchFavoredMovie = () => {
        Axios.post('/api/favorite/getFavoredMovie', { userFrom: localStorage.getItem('userId')})
        .then(response => {
            if(response.data.success) {
                console.log(response.data)
                setFavorites(response.data.favorites)
            } else {
                alert('영화 정보를 가져오는데 실패 했습니다.')
            }
        })
    }
    const onClickDelete = (movieId, userFrom) => {

        const variables = {
            movieId,
            userFrom
        }

        Axios.post('/api/favorite/removeFromFavorite', variables)
        .then(response => {
            if(response.data.success) { 
                fetchFavoredMovie()
            } else {
                alert('리스트에서 지우는데 실패했습니다.')
            }
        })
    }

    const renderCards = Favorites.map((favorite, index) => {


        const content = (
            <div>
                {favorite.moviePost ?
                    <img src={`${IMAGE_BASE_URL}${POSTER_SIZE}${favorite.moviePost}`} />
                    : "no image"}
            </div>
        );

        return <tr key={index}>

            <Popover content={content} title={`${favorite.movieTitle}`}>
                <td>{favorite.movieTitle}</td>
            </Popover>

            <td>{favorite.movieRunTime} mins</td>
            <td><Button onClick={() => onClickDelete(favorite.movieId, favorite.userFrom)}> Remove </Button></td>
        </tr>
    })



    return (
        <div style={{ width: '85%', margin: '3rem auto' }}>
            <Title level={2} > Favorite Movies By Me </Title>
            <hr />
                <table>
                    <thead>
                        <tr>
                            <th>Movie Title</th>
                            <th>Movie RunTime</th>
                            <td>Remove from favorites</td>
                        </tr>
                    </thead>
                    <tbody>
                        {renderCards}
                    </tbody>
                </table>
        </div>
    )
}

export default FavoritePage
