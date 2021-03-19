import * as React from 'react'
import {useLocation} from 'react-router-dom'
import { Photo } from '../../../../domain/photo'
import SecuredLs from '../../../../utils/securedLs'
import {Link} from 'react-router-dom'
import {List} from 'linqts'
import clsx from 'clsx'

const PhotoItem: React.FC<{data: Photo, index: number}> = (props) => {
  const {data, index} = props
  const [isEdit, setEdit] = React.useState(false)
  const [comment, setComment] = React.useState(data.comment ? data.comment : '')
  const albumData = SecuredLs.get('albumData')
  const isHasFavorites = albumData.user.favorites ? new List<Photo>(albumData.user.favorties).Where(photo => photo ? photo.id === data.id : false).ToArray().length : false
  const [isFavorite, setFavorite] = React.useState(isHasFavorites)


  const handleSaveComment = () =>  {
    const photos = albumData.photos
    const photoList = new List<Photo>(photos)
    const currentPhoto = photoList.Where((photo) => photo ? photo.id === data.id : false).ToArray()
    const updatedPhoto = {
      ...currentPhoto[0],
      comment
    }
    const currentPhotoIndex = photoList.ToArray().findIndex(photo => photo.id === data.id)
    const currentPhotos = photoList.ToArray()
    if (currentPhotoIndex >= 0) {
      currentPhotos.splice(currentPhotoIndex, 0, updatedPhoto)
    }
    const updatedAlbumData = {
      ...albumData,
      photos: currentPhotos
    }
    SecuredLs.set('albumData', updatedAlbumData)
    setEdit(false)
  }

  const handleLikePhoto = () => {
    const isHasFavorites = albumData.user.favorites 
    const favoriteList = new List<Photo>(albumData.user.favorites)
    if (isHasFavorites) {
      const currentFavoritePhotoQuery = favoriteList.Where(photo => photo ? photo.id === data.id : false)
      const remainsFavoritePhotoQuery = favoriteList.Where(photo => photo ? photo.id !== data.id : false)
      const isFavorited = currentFavoritePhotoQuery.ToArray().length > 0
      if (isFavorited) {
        const updatedAlbumData = {
          ...albumData,
          user: {
            ...albumData.user,
            favorites: remainsFavoritePhotoQuery 
          }
        }
        SecuredLs.set('albumData', updatedAlbumData)
      } else {
        const updatedAlbumData = {
          ...albumData,
          user: {
            ...albumData.user,
            favorites: [...remainsFavoritePhotoQuery.ToArray(), data]
          }
        }
        SecuredLs.set('albumData', updatedAlbumData)
      }
    } else {
      const updatedAlbumData = {
        ...albumData,
        user: {
          ...albumData.user,
          favortites: [data]
        }
      }
      SecuredLs.set('albumData', updatedAlbumData)
    }
    setFavorite(!isFavorite)
  }

  return (
    <div className="flex flex-col w-64 mr-8 mb-8" key={index}>
      <img src={data.thumbnailUrl} alt="photo url" />
      <div>{data.title}</div>
      <div className="flex flex-row justify-between items-center">
        <div className="mr-4">Comment: {comment ? comment : '' }</div>
        <div>
          <div 
            className={clsx(isFavorite && "is_animating", "heart")} 
            style={{
              backgroundPosition: isFavorite ? 'right' : ''
            }}
            onClick={() => {
              handleLikePhoto()
            }}
          >
          </div>
        </div>
      </div>
      {
        !isEdit ? (
          <button 
            onClick={() => {
              setEdit(true)
            }} 
            className="py-2 px-4 rounded bg-blue-600 text-white"
          >
            Comment
          </button>
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
  const albumData = SecuredLs.get('albumData')
  
  React.useEffect(() => {
    if (!albumData) {
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


  const renderAlbums = () => {
    return (
      <div className="flex flex-row px-4 flex-wrap justify-center">
        {
          !albumData   ? (
            location
              .state
              .albumData
              .photos
              .map((val: Photo, index: number) => {
            return (
              <PhotoItem
                data={val}
                index={index}
                />
              ) 
            })
          ) : (
            albumData
              .photos
              .map((val: Photo, index: number) => {
            return (
              <PhotoItem
                data={val}
                index={index}
                />
              ) 
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
      <div className="w-full justify-center flex flex-row px-8">
      
          {renderAlbums()}
      </div>
    </div>
  )
}
