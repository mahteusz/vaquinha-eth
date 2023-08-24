import './styles.scss'
import { useNavigate } from 'react-router-dom'

const Header = () => {

  const navigate = useNavigate()

  return (
    <header className='header'>
      <div className='header__logo-container' onClick={() => navigate("/")}>
        <div className='header__logo primary'>
          Vaquinha
        </div>
        <div className='header__logo secondary'>
          ETH
        </div>
      </div>
      <button className='header__action' onClick={() => navigate("/create")}>
        Criar vaquinha
      </button>
    </header>
  )
}

export default Header