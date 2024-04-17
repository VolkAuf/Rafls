import {Link} from "react-router-dom"
import styles from './styles.module.scss'
import {Logo} from "shared/ui/logo"
import {useNavigate} from "react-router"

export const Footer = () => {
  const navigate = useNavigate()
  return (
    <footer className={styles.footer}>
      <div className={styles.wrapper}>
       <Logo fullWhite variant='h5'/>
        <div className={styles.column}>
          <h5 className={styles.column__header} onClick={()=> navigate('/films')}>
            Фильмы
          </h5>
        </div>
        <div className={styles.column}>
          <h5 className={styles.column__header} onClick={()=> navigate('/series')}>
            Сериалы
          </h5>
        </div>
      </div>
      <div className={styles.links}>
        <Link to="/">Условия использования</Link>
        <Link to="/">Политика конфиденциальности</Link>
        <Link to="/">SiteMap</Link>
      </div>
    </footer>
  )
}