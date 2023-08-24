import './styles.scss'
import { Props } from './types'
import { useEffect, MouseEvent } from 'react'

const Modal = ({ children, open, onClose }: Props) => {

  useEffect(() => {
    if (open)
      disableBodyScroll()
    else
      enableBodyScroll()
  }, [open])

  const disableBodyScroll = () => {
    document.body.style.overflow = 'hidden'
  }

  const enableBodyScroll = () => {
    document.body.style.overflow = 'unset'
  }

  const handleOuterClick = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation()
  }

  const renderContent = () => {
    return (
      <div className='modal' onClick={onClose} id="outer-div">
        <div className='modal__content' onClick={handleOuterClick}>
          <button className='modal__button' onClick={onClose}>
            X
          </button>
          {children}
        </div>
      </div>
    )
  }

  return (
    <>
      {
        open ? renderContent() : null
      }
    </>
  )
}

export default Modal