import React, { useState } from 'react'
import { Comment, Avatar} from 'antd'
import { useSelector } from 'react-redux'
import Edit from './Edit'


function SingleComment(props) {

    const actions = [
        <Edit userId={props.comment.user_id} commentId={props.comment.id} refreshFunction={props.refreshFunction} />
    ]

    return (
        <div>
            <Comment 
                actions={actions}
                author={props.comment.user.name}
                avatar={<Avatar src={props.comment.user.image} />}
                content={ <p> {props.comment.content} </p>}
            />
        </div>
    )
}

export default SingleComment