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
import { Offline, Online } from "react-detect-offline";
import Skeleton from '@yisheng90/react-loading';

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

  const StyledContainer = nanostyled("div", {
    base: 'min-h-screen w-full py-20 items-center justify-center'
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
          className="mr-2 py-2 px-4 border-1 border-red-200 w-64"
        />
         <input 
          id="user-name" 
          key={Math.random()} 
          onChange={handleChangeUsernameQuery} 
          defaultValue={usernameQuery} 
          type="text" 
          placeholder="Search by user's names" 
          className="mr-2 py-2 px-4 border-1 border-red-200 w-64npm install @yisheng90/react-loading --save"
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
      <div>
        <Online>
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center',
            margin: '0 auto'
          }}>
            {
              albumStore.albums ? albumStore.albums.map((albumData: AlbumData) => {
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
              }) : (
              <>
                {
                  new Array(4).fill(0).map((_, index) => {
                    return (
                    <div key={index} className="flex flex-col justify-center items-centers mr-8">
                      <div style={{
                        width: '150px',
                        height: '150px'
                      }}>
                        <Skeleton width={150} />
                      </div>
                      <div className="mt-4">              
                        <div className="mb-4">
                          <Skeleton width={120} />
                        </div>
                        <div className="mb-4">
                          <Skeleton width={100} />
                        </div>
                      </div>
                    </div>
                    )
                  })
                }
              </>
              )
            }
          </div>
        </Online>
        <Offline>
          <div className="w-full justify-center" style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center'
          }}>
            It seems you are offline. Please check your internet connection and retry again
          </div>
        </Offline>
      </div>
    </StyledContainer>
  );
} 