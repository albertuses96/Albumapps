import * as React from 'react'
import {AlbumData} from '../../../domain/album'
import nanostyled from 'nanostyled'
import picostyle from 'picostyle-react'

const ps = picostyle(React.createElement)

type AlbumCardProps = {
  albumData: AlbumData,
  albumThumbnail: string
}

const AlbumCard: React.FC<AlbumCardProps> = ({albumData, albumThumbnail}) => {
  const StyledBaseAlbumCardContainer = nanostyled("div", {
    base: 'flex flex-col items-center text-center mr-8 mb-4'
  })

  const StyledAlbumCardContainer = ps(StyledBaseAlbumCardContainer)({
    maxWidth: '150px'
  })

  const StyledBaseAlbumThumbnail = nanostyled('img', {
    base: 'mb-4'
  })

  const StyledAlbumThumbnail =  ps(StyledBaseAlbumThumbnail)({
    width: "150px",
    height: "150px"
  })

  const StyledAlbumTitle = nanostyled("h4", {
    base: 'font-bold mb-4 text-lg'
  })

  const StyledUserName = nanostyled("p", {
    base: 'text-base'
  })

  return (
    <StyledAlbumCardContainer>
      <StyledAlbumThumbnail  src={albumThumbnail} alt="album thumbnail"  />
      <StyledAlbumTitle>{albumData.title}</StyledAlbumTitle>
      <StyledUserName>{albumData.user.name}</StyledUserName>
    </StyledAlbumCardContainer>
  )
}

export default AlbumCard