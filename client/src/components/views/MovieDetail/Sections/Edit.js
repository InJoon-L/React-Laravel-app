import React, { useState, useEffect } from 'react'
import { Tooltip, Icon, Button } from 'antd'
import Axios from 'axios'


function Edit(props) {
    const [Flag, setFlag] = useState(false)
    const [CommentValue, setCommentValue] = useState("")
    const [UserCheck, setUserCheck] = useState(true)

    useEffect(() => {
        if (props.userId != localStorage.getItem('userId')) {
            setUserCheck(!UserCheck)
        }
    }, [])

    const handleClick = (event) => {
        setCommentValue(event.currentTarget.value)
    }

    const onClicked = () => {
        if (UserCheck) {
            setFlag(!Flag)
        } else {
            alert('작성자가 아닙니다.')
        } 
    }

    const onSubmit = (event) => {
        event.preventDefault()

        const variable = {
            commentId: props.commentId,
            content: CommentValue
        }

        Axios.post('http://127.0.0.1:8000/api/comment/updateComment', variable)
        .then(response => {
            if (response.data.success) {
                props.refreshFunction(response.data.result)
                setFlag(false)
                setCommentValue("")
            } else {
                console.log(response.data)
                alert('커맨트를 수정하지 못했습니다.')
            } 
        })
    }

    const formLayout =  <form style={{ display: 'flex' }} onSubmit={onSubmit}>
                            <textarea
                                style={{ width: '100%', borderRadius: '5px' }}
                                onChange={handleClick}
                                value={CommentValue}
                                placeholder="코멘트를 작성해 주세요"
                            />
                            <br />
                            <Button type="primary" style={{ width: '20%', height: '52px' }} onClick={onSubmit}>Submit</Button>
                        </form>

    return (
        <div>
            <span key="comment-basic-like">
                <Tooltip title="edit">
                    <Icon type="edit"
                        disabled={UserCheck}
                        onClick={onClicked}
                    />
                </Tooltip>
                <span style={{ paddingLeft: '8px', cursor: 'auto' }}> edit </span>
            </span>
            { Flag && formLayout }
        </div>
    )
}

export default Edit