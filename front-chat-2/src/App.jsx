import { useState } from "react";
// import reactLogo from "./assets/react.svg";
import "./App.css";
import toast from "react-hot-toast";
import JoinCreateChat from "./components/JoinCreateChat";
import ChatPage from "./components/ChatPage.jsx";

function App() {
    const [count, setCount] = useState(0);

    return (
        <div>
            <JoinCreateChat />
            {/*<ChatPage />*/}
        </div>
    );
}

export default App;