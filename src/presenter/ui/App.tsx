import * as React from "react";
import { PhotoViewModel } from "../viewModal/jobs";
import PhotoUseCase from '../../useCase/photoUseCase'
import {usePhotoStore, IState} from '../../store/photo'
import PhotoRepository from '../../repository/photoRepository'
import PhotoDriver from '../../driver/photoDriver'
import nanostyled from 'nanostyled'
import picostyle from 'picostyle-react'
import {useGlobalStyles} from './components/theme'

const ps = picostyle(React.createElement)

declare const window: {reverseGeocode: any};

export const App = () => {
  const photoViewModal: PhotoViewModel = new PhotoViewModel(new PhotoUseCase(new PhotoRepository(new PhotoDriver())), usePhotoStore)
  const [state, actions] = photoViewModal.usePhotoStore()
  const [styles, setStyles] = useGlobalStyles()

  React.useEffect(() => {
    const getAllPhoto = async () => {
      const photos = await photoViewModal.getAll()
      actions.store(photos)
    }

    getAllPhoto()
  }, [])

  const StyledBaseContainer = nanostyled("div", {
    base: 'h-screen w-full py-20 items-center justify-center'
  })

  const StyledContainer = ps(StyledBaseContainer)({
    background: styles.color.indigo
  })
  
  return (
    <StyledContainer>
      <div className="flex flex-row"> 
        <input type="text" placeholder="Search jobs" className="mr-2"/>
        <input type="text" placeholder="Job Classifications" className="mr-2"/>
        <input type="text" placeholder="Location" className="mr-2"/>
      </div>
    </StyledContainer>
  );
} 