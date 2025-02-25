const CommentFacebook = (props) => {
    const { dataHref } = props
    return (
        <>
            <div className="fb-comments" data-href={dataHref} data-width="100%" data-numposts="3"></div>
        </>
    )
}
export default CommentFacebook