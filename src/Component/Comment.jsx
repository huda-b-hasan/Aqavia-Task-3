export default function Comment({ commentData, DeleteComment, editComment }) {
    const commentId = commentData.id
    return <>
        <div className="comment">
            <h1>{commentData.name}</h1>
            <h2>{commentData.email}</h2>
            <p>{commentData.body}</p>
            <div>
                <button className='delete' onClick={() => { DeleteComment(commentId) }} >Delete</button>
                <button className='edit' id="edit" onClick={() => { editComment(event, commentData) }}>Edit</button>
            </div>
        </div>
    </>
}