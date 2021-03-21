import * as React from 'react'
import {useLocation} from 'react-router-dom'
import SecuredLs from '../../../../utils/securedLs'
import {Link} from 'react-router-dom'
import PhotoCard from '../../components/photoCard'
import { Photo } from '../../../../domain/photo'
import { LeftArrow } from '../../assets'

export default function UserDetail() {
  const location: any = useLocation()
  const albumData = SecuredLs.get('albumData')

  React.useEffect(() => {
    if (!albumData) {
      SecuredLs
        .set('albumData', location.state.albumData)
    }
  }, [])

  const renderFavoriteList = (list: Photo[]) => {
    if (!list || list.length <= 0) return null

    return (
      <>
        {
          list.map((photo, index) => {
            return (
              <PhotoCard
                data={photo}
                withComment={false}
                index={index}
              />
            )
          })
        }
      </>
    )
  }

  return (
    <div className="flex flex-col py-8">
      <div className="flex flex-start w-full px-16">
        <div className="w-8">
          <Link 
            to={{
              pathname: `/album/${albumData.id}`,
              state: {
                albumData
              }
            }}
          >
            <img src={LeftArrow} alt="back icon" />
          </Link>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center">
        {
          !albumData ? 
            location
              .state
              .albumData
              .user
              .name :
            albumData 
              .user 
              .name
        }
        <div className="mt-8 flex flex-row">
          {
            !albumData ? 
              renderFavoriteList(location.state.albumData.user.favorites)
                :
              renderFavoriteList(albumData.user.favorites)
          }
        </div>
      </div>
    </div>
  )
}
