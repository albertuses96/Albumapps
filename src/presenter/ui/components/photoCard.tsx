import * as React from 'react'
import clsx from 'clsx'
import { Photo } from '../../../domain/photo'
import nanostyled from 'nanostyled'
import picostyle from 'picostyle-react'

const ps = picostyle(React.createElement)

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
  const StyledContainer = nanostyled("div", {
    base: 'flex flex-col w-64 mr-8 mb-8'
  })
  
  const StyledWrapper = nanostyled("div", {
    base: 'flex flex-row justify-between items-center'
  })

  const StyledCommentButton = nanostyled("div", {
    base: 'py-2 px-4 rounded bg-blue-600 text-white'
  })

  const StyledCommentInput = nanostyled("textarea", {
    base: 'w-64 rounded px-4 py-4 border border-blue-600 mb-4'
  })

  const StyledButtonWrapper = nanostyled("div", {
    base: 'flex flex-row justify-between'
  })

  const StyledCTAButton = nanostyled("div", {
    color: "border border-blue-600 text-blue-600",
    base: "px-4 py-2 border"
  })
  return (
  <StyledContainer key={index}>
    <img src={data.thumbnailUrl} alt="photo url" />
    <div>{data.title}</div>
    {
      withComment && (
      <React.Fragment>
        <StyledWrapper>
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
        </StyledWrapper>
        {
          !isEdit ? (
            <StyledCommentButton
              onClick={() => {
                if (setEdit) {
                  setEdit(true)
                }
              }} 
         
            >
              Comment
            </StyledCommentButton>
          ) : (
            <React.Fragment>
              <StyledCommentInput
                onChange={(e: any) => {
                  if (setComment) {
                    setComment(e.target.value)
                  }
                }}
                value={comment}
              >
              </StyledCommentInput>
              <StyledButtonWrapper>
                <StyledCTAButton
                  onClick={() => {
                    if (setEdit) {
                      setEdit(false)
                    }
                  }}
                >
                  Cancel
                </StyledCTAButton>
                <StyledCTAButton
                  onClick={() => {
                    if (handleSaveComment) {
                      handleSaveComment()
                    }
                  }} 
                  color="bg-blue-600 text-white">
                  Save
                </StyledCTAButton>
              </StyledButtonWrapper>
            </React.Fragment>
          )
        }
      </React.Fragment>
      )
    }
  </StyledContainer>
  )
}
