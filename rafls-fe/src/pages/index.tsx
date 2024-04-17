import {Navigate, Route, Routes} from "react-router"
import {HomePage} from "./home"
import {AuthPage} from "./auth"
import {setUser, useIsAuthenticated} from "entities/user/model.tsx"
import {useDispatch} from "react-redux"
import {useEffect, useState} from "react"
import {getUserLs} from "entities/user/user"
import {Header} from "widgets/header"
import {Footer} from "widgets/footer"
import {ListPage} from "./list"
import {ItemPage} from "./item"
import {ProfilePage} from "./profile"

const Routing = () => {
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(true)
  const isAuthenticated = useIsAuthenticated()

  useEffect(() => {
    const user = getUserLs()
    if (user) dispatch(setUser(user))

    setIsLoading(false)
  }, [dispatch, setIsLoading])

  if (isLoading) return <></>

  return (
    <>
      <Header/>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/films" element={<ListPage/>}/>
        <Route path="/films/:id" element={<ItemPage/>}/>
        <Route path="/series" element={<ListPage/>}/>
        <Route path="/series/:id" element={<ItemPage/>}/>
        {isAuthenticated ? <Route path="/profile" element={<ProfilePage/>}/> : null}
        {!isAuthenticated ? <> <Route path="/login" element={<AuthPage/>}/>
          <Route path="/register" element={<AuthPage/>}/>
        </> : null}
        <Route path="*" element={<Navigate to="/"/>}/>
      </Routes>
      <Footer/>
    </>
  )
}

export default Routing