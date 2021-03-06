import Axios from 'axios'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import SingleComment from './SingleComment'
import { Button, Typography } from 'antd'

const { Title } = Typography

function Comment(props) {

    const movieId = props.movieId

    const user = useSelector(state => state.user)
    const [CommentValue, setCommentValue] = useState("")

    const handleClick = (event) => {
        setCommentValue(event.currentTarget.value)
    }

    const onSubmit = (event) => {
        event.preventDefault()

        const variable = {
            content: CommentValue,
            writer: user.userData._id,
            movieId: movieId
        }

        Axios.post('http://127.0.0.1:8000/api/comment/saveComment', variable)
        .then(response => {
            if (response.data.success) {
                console.log(response.data.result)
                props.refreshFunction(response.data.result)
                setCommentValue("")
            } else {
                alert('커맨트를 저장하지 못했습니다.')
            }
        })
    }

    return (
        <div>
            <br />
            <Title level={3}> Replies </Title>
            <hr />

            {/* Comment Lists */}
            {props.commentLists && props.commentLists.map((comment, index) => (
                (!comment.responseTo && 
                    <React.Fragment key={index}>
                        <SingleComment refreshFunction={props.refreshFunction} comment={comment} movieId={movieId} />
                    </React.Fragment>
                ) 
            ))}
            
            {/* Root Comment Form */}

            <form style={{ display: 'flex' }} onSubmit={onSubmit}>
                <textarea
                    style={{ width: '100%', borderRadius: '5px' }}
                    onChange={handleClick}
                    value={CommentValue}
                    placeholder="코멘트를 작성해 주세요"
                />
                <br />
                <Button type="primary" style={{ width: '20%', height: '52px' }} onClick={onSubmit}>Submit</Button>
            </form>
        </div>
    )
}

export default Comment