import * as React from 'react'
import {useLocation} from 'react-router-dom'
import { Photo } from '../../../../domain/photo'
import SecuredLs from '../../../../utils/securedLs'
import {Link} from 'react-router-dom'
import {List} from 'linqts'
import PhotoCard from '../../components/photoCard'
import { AlbumData } from '../../../../domain/album'
import { LeftArrow } from '../../assets'

const PhotoItem: React.FC<{data: Photo, index: number, albumData: AlbumData, setAlbumData: Function}> = (props) => {
  const {data, index, albumData, setAlbumData} = props
  const [isEdit, setEdit] = React.useState(false)
  const [comment, setComment] = React.useState(data.comment ? data.comment : '')
  const isHasFavorites = albumData ? albumData.user.favorites ? new List<Photo>(albumData.user.favorites).Where(photo => photo ? photo.id === data.id : false).ToArray().length > 0 : false : false
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
    setAlbumData(updatedAlbumData)
    setEdit(false)
  }

  const handleLikePhoto = () => {
    const favoriteList = new List<Photo>(albumData.user.favorites ? albumData.user.favorites : undefined)
    if (isHasFavorites) {
      const currentFavoritePhotoQuery = favoriteList.Where(photo => photo ? photo.id === data.id : false)
      const remainsFavoritePhotoQuery = favoriteList.Where(photo => photo ? photo.id !== data.id : false)
      const isFavorited = currentFavoritePhotoQuery.ToArray().length > 0
      if (isFavorited) {
        const updatedAlbumData = {
          ...albumData,
          user: {
            ...albumData.user,
            favorites: remainsFavoritePhotoQuery.ToArray()
          }
        }
        setAlbumData(updatedAlbumData)
        SecuredLs.set('albumData', updatedAlbumData)
      } else {
        const updatedAlbumData = {
          ...albumData,
          user: {
            ...albumData.user,
            favorites: [...remainsFavoritePhotoQuery.ToArray(), data]
          }
        }
        setAlbumData(updatedAlbumData)
        SecuredLs.set('albumData', updatedAlbumData)
      }
    } else {
      const updatedAlbumData = {
        ...albumData,
        user: {
          ...albumData.user,
          favorites: [data]
        }
      }
      setAlbumData(updatedAlbumData)
      SecuredLs.set('albumData', updatedAlbumData)
    }
    setFavorite(!isFavorite)
  }

  return (
    <div key={index}>
      <PhotoCard 
        data={data}
        index={index}
        comment={comment}
        isFavorite={isFavorite}
        handleLikePhoto={handleLikePhoto}
        isEdit={isEdit}
        setComment={setComment}
        handleSaveComment={handleSaveComment}
        withComment={true}
      />
    </div>
  )
}

export default function AlbumDetail() {
  const location: any = useLocation()
  const [albumData, setAlbumData] = React.useState<AlbumData | null>(null)
  
  React.useEffect(() => {
    const persistedAlbumData = SecuredLs.get('albumData')
    if (!persistedAlbumData) {
      SecuredLs
        .set(
          'albumData', 
          location.state.albumData
        )
      setAlbumData(location.state.albumData)
    } else {
      setAlbumData(persistedAlbumData)
    }
  }, [])


  const renderAlbums = () => {
    return (
      <div className="flex flex-row px-4 flex-wrap justify-center">
        {
          albumData && (
            <>
              {
                albumData
                    .photos
                    .map((val: Photo, index: number) => {
                    return (
                    <PhotoItem
                      data={val}
                      index={index}
                      key={index}
                      albumData={albumData}
                      setAlbumData={setAlbumData}
                      />
                    )
                    })
              }
            </>
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
      <div className="flex flex-start w-full px-16">
        <div className="w-8">
          <Link 
            to={{
              pathname: '/'
            }}
          >
            <img src={LeftArrow} alt="back icon" />
          </Link>
        </div>
      </div>
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
