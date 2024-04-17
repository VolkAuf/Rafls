import {FC} from "react"
import styles from './styles.module.scss'
import {Typography} from "@mui/material"
import {useNavigate} from "react-router"
import {Variant} from "@mui/material/styles/createTypography"

type LogoProps = {
  fullWhite?: boolean
  variant?: Variant
}

export const Logo: FC<LogoProps> = ({fullWhite, variant}) => {
  const navigate = useNavigate()
  return (
    <div onClick={() => navigate('/')}>
      <Typography
        sx={{
          fontSize: 42,
          lineHeight: '58px',
          fontWeight: 400,
          userSelect: 'none',
          cursor: 'pointer'
        }}
        variant={variant || 'h1'}
        className={styles.logo}
      >
        Ra<span style={{color: fullWhite ? 'white' : '#E13C52'}}>fls</span>
      </Typography>
    </div>
  )
}