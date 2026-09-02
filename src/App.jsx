import Navbar from "./layout/navbar"
import Footer from "./layout/footer"
import FirstPage from "./pages/firstPage"
import SecondPage from "./pages/secondPage"
import Home from './pages/Home'
import ErrorPage from './pages/errorPage'
import Form from "./components/Form"
import { Routes, Route } from "react-router-dom"

const App = () => {
  return (
    <>
    <Navbar/>

    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="*" element={<ErrorPage/>} />
      <Route path="/firstPage" element={<FirstPage/>} />
      <Route path="/secondPage" element={<SecondPage/>}   />
      <Route path="/form" element={<Form/>} />
    </Routes>

    <Footer/>
    </>
  )
}

export default App