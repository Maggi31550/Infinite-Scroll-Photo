const PhotoComponent = ({alt_description,urls})=>{
    return (
        <>
            <div className="col-12">
                <div className="thumbnail">
                     <img src={urls.full} alt={alt_description} />
                </div>
            </div>
        </>
    )
}
export default PhotoComponent
