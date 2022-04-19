import '../styles/General.scss'
import "../styles/App.scss"
import "../styles/Calculate.scss"
import "../styles/Cart.scss"
import "../styles/Gallery.scss"
import "../styles/Navbar.scss"
import "../styles/Order.scss"
import Layout from '../templates/Layout'

function MyApp({ Component, pageProps }) {
  return <Layout>
    <Component {...pageProps} />
  </Layout>
}

export default MyApp
