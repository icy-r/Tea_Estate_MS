import {Route, RouterProvider, Routes} from "react-router-dom";
import Header from "./components/navbar/Header.jsx";
import Test from "./components/test/test.jsx";
import './App.css'

function App() {

  return (
    <>
        <Header />
        <Test />
        <Routes>
            <Route path="/" element={<div>Home</div>} />
            <Route path="/about" element={<div>About</div>} />
        </Routes>
    </>
  )
}

export default App
