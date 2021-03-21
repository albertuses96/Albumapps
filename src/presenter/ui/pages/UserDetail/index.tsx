import * as React from 'react'
import {useLocation} from 'react-router-dom'
import SecuredLs from '../../../../utils/securedLs'
import {Link} from 'react-router-dom'
import PhotoCard from '../../components/photoCard'
import { Photo } from '../../../../domain/photo'
import { LeftArrow } from '../../assets'
import nanostyled from 'nanostyled'

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
      <React.Fragment>
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
      </React.Fragment>
    )
  }

  const StyledContainer = nanostyled("div", {
    base: 'flex flex-col py-8'
  })

  const StyledWrapper = nanostyled("div", {
    base: 'flex flex-start w-full px-16'
  })

  const StyledFavoriteList = nanostyled("div", {
    base: 'flex flex-col items-center justify-center'
  })

  const StyledFavoritePhoto = nanostyled("div", {
    base: 'mt-8 flex flex-row'
  })
  
  const StyledText = nanostyled('div', {
    base: 'mb-4 mt-4 justify-center w-full flex text-center'
  })
  return (
    <StyledContainer>
      <StyledWrapper>
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
      </StyledWrapper>
      <StyledFavoriteList>
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
        <StyledText>Your favorite photos;</StyledText>
        <StyledFavoritePhoto>
          {
            !albumData ? 
              renderFavoriteList(location.state.albumData.user.favorites)
                :
              renderFavoriteList(albumData.user.favorites)
          }
        </StyledFavoritePhoto>
      </StyledFavoriteList>
    </StyledContainer>
  )
}
