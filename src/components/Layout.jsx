import Navbar from "./Navbar"
import classes from "../styles/Layout.module.css"

const Layout = ({children}) => {
  return (
    <>
      <Navbar />
      <main className={classes.main}>
        <div className={classes.container}>
          {children}
        </div>
      </main>
    </>
  )
}

export default Layout