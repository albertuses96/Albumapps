import * as React from "react";
import { AlbumViewModel } from "../viewModel/album";
import AlbumUseCase from '../../useCase/albumUseCase'
import {useAlbumStore} from '../../store/album'
import {useUserStore} from '../../store/user'
import {usePhotoStore} from '../../store/photo'
import AlbumRepository from '../../repository/albumRepository'
import AlbumDriver from '../../driver/albumDriver'
import { UserViewModel } from "../viewModel/user";
import UserUseCase from '../../useCase/userUseCase'
import UserRepository from '../../repository/userRepository'
import UserDriver from '../../driver/userDriver'
import { PhotoViewModel } from "../viewModel/photo";
import PhotoUseCase from '../../useCase/photoUseCase'
import PhotoRepository from '../../repository/photoRepository'
import PhotoDriver from '../../driver/photoDriver'
import nanostyled from 'nanostyled'
import picostyle from 'picostyle-react'
import AlbumCard from "./components/albumCard";
import { AlbumData } from "../../domain/album";
import {Link} from 'react-router-dom'

const ps = picostyle(React.createElement)

export const App = () => {
  const albumViewModel: AlbumViewModel = new AlbumViewModel(new AlbumUseCase(new AlbumRepository(new AlbumDriver())), useAlbumStore)
  const userViewModel: UserViewModel = new UserViewModel(new UserUseCase(new UserRepository(new UserDriver())), useUserStore)
  const photoViewModel: PhotoViewModel = new PhotoViewModel(new PhotoUseCase(new PhotoRepository(new PhotoDriver())), usePhotoStore)
  const [albumStore, actions] = albumViewModel.useAlbumStore()
  const [userStore, userStoreActions] = userViewModel.useUserStore()
  const [albumNameQuery, setAlbumNameQuery] = React.useState('')
  const [usernameQuery, setUsernameQuery] = React.useState('')

  React.useEffect(() => {
    const getUsers = async () => {
      const users = await userViewModel.getAll()
      userStoreActions.store(users)
      return users
    }

    const getPhotos = async () => {
      return await photoViewModel.getAll()
    }
    const getAllAlbum = async () => {
      const users = await getUsers()
      const photos = await getPhotos()
      const albums = await albumViewModel.getAll(users, photos)

      // const filteredAlbumsByUserName = albumViewModal.searchByUserName(users, albums)
      actions.store(albums)
    }

    getAllAlbum()
  }, [])

  const handleSearch = () => {
    if (usernameQuery && albumNameQuery) {
      const filteredAlbumsByAlbumsName = albumViewModel.searchByAlbumsName(albumNameQuery, albumStore.albums)
      const filteredUsers = userViewModel.searchByUsername(usernameQuery, userStore.users)
      const filteredAlbumsByUserName = albumViewModel.searchByUserName(filteredUsers, filteredAlbumsByAlbumsName)
      actions.store(filteredAlbumsByUserName)
    } else if(usernameQuery) {
      const filteredUsers = userViewModel.searchByUsername(usernameQuery, userStore.users)
      const filteredAlbumsByUserName = albumViewModel.searchByUserName(filteredUsers, albumStore.albums)
      actions.store(filteredAlbumsByUserName)
    } else {
      const filteredAlbumsByAlbumsName = albumViewModel.searchByAlbumsName(albumNameQuery, albumStore.albums)
      actions.store(filteredAlbumsByAlbumsName)
    }
  }

  const handleChangeAlbumsNameQuery = (e: any) => {
    e.preventDefault()
    setAlbumNameQuery(e.target.value)
  } 

  const handleChangeUsernameQuery = (e: any) => {
    e.preventDefault()
    setUsernameQuery(e.target.value)
  }

  const StyledBaseContainer = nanostyled("div", {
    base: 'min-h-screen w-full py-20 items-center justify-center'
  })

  const StyledContainer = ps(StyledBaseContainer)({
  })


  return (
    <StyledContainer>
      <div className="flex flex-row w-full justify-center mb-4"> 
        <input 
          id="album-name" 
          key={Math.random()} 
          onChange={handleChangeAlbumsNameQuery} 
          defaultValue={albumNameQuery} 
          type="text" 
          placeholder="Search by album's name" 
          className="mr-2 py-2 px-4 border-1 border-red-200"
        />
         <input 
          id="user-name" 
          key={Math.random()} 
          onChange={handleChangeUsernameQuery} 
          defaultValue={usernameQuery} 
          type="text" 
          placeholder="Search by user's names" 
          className="mr-2 py-2 px-4 border-1 border-red-200"
        />
        <button 
          className="bg-red-600 py-2 text-white px-4" 
          onClick={() => {
          handleSearch()
          }}
        >
          Submit
        </button>
      </div>
      <div className="flex flex-row flex-wrap justify-center" style={{
        margin: '0 auto'
      }}>
      {
        albumStore.albums && albumStore.albums.map((albumData: AlbumData) => {
          return (
            <Link 
              to={{
              pathname: `/album/${albumData.id}`,
              state: {
                albumData
               }
              }} 
              key={albumData.id} 
            >
              <AlbumCard 
                albumData={albumData} 
                albumThumbnail={albumData.photos[0].thumbnailUrl}
              />
            </Link>
          )
        })
      }
      </div>
    </StyledContainer>
  );
} 