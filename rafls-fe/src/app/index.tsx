import Routing from "../pages"
import {withProviders} from "./providers"
import './index.scss'
import {CssBaseline} from "@mui/material"
import {useEffect} from "react"
import {initApi} from "shared/lib/axios.ts"

let isInitApi = false

const Providers = () => {

  useEffect(() => {
    if (isInitApi) return
    isInitApi = true

    initApi()
  }, [])

  return (
    <>
      <CssBaseline/>
      <Routing/>
    </>
  )
}

export const App = withProviders(Providers)