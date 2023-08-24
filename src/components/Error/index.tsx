import './styles.scss'
import { Props } from "./types"

const Error = ({ error }: Props) => {
  return (
    <div className='error-container'>
      <h2 className='error-container__message'>
        {error}
      </h2>
    </div>
  )
}

export default Error