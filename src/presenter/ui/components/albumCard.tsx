import * as React from 'react'
import {AlbumData} from '../../../domain/album'

type AlbumCardProps = {
  albumData: AlbumData,
  albumThumbnail: string
}

const AlbumCard: React.FC<AlbumCardProps> = ({albumData, albumThumbnail}) => {
  return (
    <div className="flex flex-col items-center text-center mr-8 mb-4" style={{
      maxWidth: "150px"
    }}>
      <img className="mb-4" src={albumThumbnail} alt="album thumbnail" style={{
        width: "150px",
        height: "150px"
      }} />
      <h4 className="font-bold mb-4 text-lg">{albumData.title}</h4>
      <p className="text-base">{albumData.user.name}</p>
    </div>
  )
}

export default AlbumCard