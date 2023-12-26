import { Route, Routes } from "react-router-dom"
import Homepage from "./pages/Homepage"
import Chatpage from "./pages/Chatpage"
import './App.css';



function App() {

  return (
    
    <Routes>
      <Route path="/" element={<Homepage/>} />
      <Route path="/chats" element={<Chatpage/>} />
    </Routes>
    
  )
}

export default App;
