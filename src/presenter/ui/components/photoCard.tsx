import * as React from 'react'
import clsx from 'clsx'
import { Photo } from '../../../domain/photo'

interface PhotoCardProps {
  data: Photo,
  index: number,
  comment?: string,
  isFavorite?: boolean,
  handleLikePhoto?: Function,
  isEdit?: boolean,
  setEdit?: Function,
  setComment?: Function,
  handleSaveComment?: Function
  withComment: boolean
}

export default function PhotoCard({
  data, 
  index, 
  comment, 
  isFavorite, 
  handleLikePhoto, 
  isEdit, 
  setEdit, 
  setComment, 
  handleSaveComment,
  withComment
}: PhotoCardProps) {
  return (
    <div className="flex flex-col w-64 mr-8 mb-8" key={index}>
    <img src={data.thumbnailUrl} alt="photo url" />
    <div>{data.title}</div>
    {
      withComment && (
        <>
        <div className="flex flex-row justify-between items-center">
        <div className="mr-4">Comment: {comment ? comment : '' }</div>
        <div>
            <div 
              className={clsx(isFavorite && "is_animating", "heart")} 
              style={{
                backgroundPosition: isFavorite ? 'right' : ''
              }}
              onClick={() => {
                if (handleLikePhoto) {
                  handleLikePhoto()
                }
              }}
            >
            </div>
          </div>
        </div>
        {
          !isEdit ? (
            <button 
              onClick={() => {
                if (setEdit) {
                  setEdit(true)
                }
              }} 
              className="py-2 px-4 rounded bg-blue-600 text-white"
            >
              Comment
            </button>
          ) : (
            <>
              <textarea 
                onChange={(e: any) => {
                  if (setComment) {
                    setComment(e.target.value)
                  }
                }}
                value={comment}
                className="w-64 rounded px-4 py-4 border border-blue-600 mb-4"
              >
              </textarea>
              <div className="flex flex-row justify-between">
              <button  
                className="px-4 py-2 border border-blue-600 text-blue-600" 
                onClick={() => {
                  if (setEdit) {
                    setEdit(false)
                  }
                }}
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  if (handleSaveComment) {
                    handleSaveComment()
                  }
                }} 
                className="px-4 py-2 bg-blue-600 text-white">
                Save
              </button>
              </div>
            </>
          )
        }
        </>
      )
    }
  </div>
  )
}
