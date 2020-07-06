import styles from './header.module.scss'
import content from '../config/content'

const Header = () => (
    <div className={styles.frame}>
        <h1>{content.title}</h1>
        <p>{content.summary}</p>
    </div>
)

export default Header