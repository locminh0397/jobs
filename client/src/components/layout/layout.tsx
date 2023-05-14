import Footer from "./footer"
import { HeaderMegaMenu } from "./header"

type Props = {
  children: React.ReactNode
}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div>
      <HeaderMegaMenu />
      <div className=" overflow-x-hidden">
        {children}
      </div>
      <Footer />
    </div>
  )
}

export default Layout