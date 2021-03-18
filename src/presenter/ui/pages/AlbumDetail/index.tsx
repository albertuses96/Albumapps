import * as React from 'react'
import {useLocation} from 'react-router-dom'
import { Photo } from '../../../../domain/photo'
import SecuredLs from '../../../../utils/securedLs'
import {Link} from 'react-router-dom'
import {List} from 'linqts'

const renderPhoto = (val: Photo, index: number, setNeedToRerender: Function, setPhotos: Function) => {
  const [isEdit, setEdit] = React.useState(false)
  const [comment, setComment] = React.useState(val.comment ? val.comment : '')
  const albumData = SecuredLs.get('albumData')


  const handleSaveComment = () =>  {
    const photos = albumData.photos
    const photoList = new List<Photo>(photos)
    const currentPhoto = photoList.Where((photo) => photo ? photo.id === val.id : false).ToArray()
    const updatedPhoto = {
      ...currentPhoto[0],
      comment
    }
    const currentPhotoIndex = photoList.ToArray().findIndex(photo => photo.id === val.id)
    const currentPhotos = photoList.ToArray()
    if (currentPhotoIndex >= 0) {
      currentPhotos.splice(currentPhotoIndex, 0, updatedPhoto)
    }
    const updatedAlbumData = {
      ...albumData,
      photos: currentPhotos
    }
    console.log(currentPhotoIndex, updatedAlbumData)
    SecuredLs.set('albumData', updatedAlbumData)
    setPhotos(currentPhotos)
    setNeedToRerender(true)
    setEdit(false)
  }

  React.useEffect(() => {
  }, [isEdit, comment])

  return (
    <div className="flex flex-col w-64 mr-8 mb-8" key={index}>
    <img src={val.thumbnailUrl} alt="photo url" />
    <div>{val.title}</div>
    <div>Comment: {comment ? comment : '' }</div>
    {
      !isEdit ? (
        <button onClick={() => {
          setEdit(true)
        }} className="py-2 px-4 rounded bg-blue-600 text-white">Comment</button>
      ) : (
        <>
        <textarea 
          onChange={(e: any) => {
            setComment(e.target.value)
          }} 
          value={comment}
          className="w-64 rounded px-4 py-4 border border-blue-600 mb-4"
        >
        </textarea>
        <div className="flex flex-row justify-between">
        <button  className="px-4 py-2 border border-blue-600 text-blue-600" onClick={() => setEdit(false)}>Cancel</button>
        <button onClick={() => handleSaveComment()} className="px-4 py-2 bg-blue-600 text-white">Save</button>
        </div>
        </>
      )
    }
  
  </div>
  )
}

export default function AlbumDetail() {
  const location: any = useLocation()
  const [photos, setPhotos] = React.useState(null)
  const [isNeedToRerender, setNeedToRerender] = React.useState(false)
  const albumData = SecuredLs.get('albumData')
  
  React.useEffect(() => {
    if (location.state) {
      SecuredLs
        .set(
          'albumData', 
          location.state.albumData
        )
      setPhotos(location.state.albumData.photos)
    } else {
      setPhotos(albumData.photos)
    }
  }, [])

  React.useEffect(() => {
    if (photos || isNeedToRerender ) {
      setTimeout(() => {
        SecuredLs.set(
          'albumData',
          {
            ...albumData,
            photos
          }
        )
      }, 500);
 
      setNeedToRerender(false)
    }
  }, [photos, isNeedToRerender])

 

  const renderAlbums = () => {
    return (
      <div className="flex flex-row px-4 flex-wrap justify-center">
        {
          location.state ? (
            location
              .state
              .albumData
              .photos
              .map((val: Photo, index: number) => {
            return renderPhoto(val, index, setNeedToRerender, setPhotos)
            })
          ) : (
            albumData
              .photos
              .map((val: Photo, index: number) => {
            return renderPhoto(val, index, setNeedToRerender, setPhotos)
            })
          )
        }
      </div>
    )
  }

  return (
    <div 
      className="py-8"
      style={{
        width: '100%'
      }}
    >
      <div className="w-full justify-center flex text-center mb-8">
        { 
          location.state ? 
            location.state.albumData.title :   
              SecuredLs
                .get('albumData')
                .albumData
                .title
        }
      </div>
      <div 
        className="w-full justify-center flex text-center mb-8 underline cursor-pointer"
      >
        <Link 
          to={{
            pathname: 
              `/user/${
                location.state ? 
                  location
                    .state
                    .albumData
                    .user
                    .id :   
                  SecuredLs
                    .get('albumData')
                    .albumData
                    .user
                    .id }`,
            state: {
              albumData: 
                location
                  .state ? 
                location
                  .state
                  .albumData :   
                SecuredLs
                  .get('albumData')
                  .albumData
            }
          }}
        >
          { 
            location.state ? 
              location.state.albumData.user.name :   
                SecuredLs
                  .get('albumData')
                  .albumData
                  .user
                  .name
          }
        </Link>
      </div>
      {renderAlbums()}
    </div>
  )
}
