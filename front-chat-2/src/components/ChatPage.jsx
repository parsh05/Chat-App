import React, { useRef, useState, useEffect } from "react";
import { MdAttachFile, MdSend } from "react-icons/md";

const ChatPage = () => {
    const [messages, setMessages] = useState([
        { content: "Hello!", sender: "Parshant Singh" },
        { content: "Hi, How are you?", sender: "Parshant Kumar" },
        { content: "I'm good, thanks!", sender: "Parshant" },
    ]);
    const [input, setInput] = useState("");
    const chatBoxRef = useRef(null);
    const [currentUser] = useState("Parshant Kumar");

    // Scroll to the latest message
    useEffect(() => {
        if (chatBoxRef.current) {
            chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSendMessage = () => {
        if (input.trim() === "") return; // Prevent empty messages
        setMessages([...messages, { content: input, sender: currentUser }]);
        setInput(""); // Clear input field
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-800 via-blue-900 to-gray-900 text-white flex flex-col">
            {/* Header */}
            <header className="w-full flex items-center justify-between bg-gray-800 px-6 py-4 shadow-lg">
                <div>
                    <h1 className="text-lg font-semibold">
                        Room: <span className="text-blue-400">Family Room</span>
                    </h1>
                </div>
                <div>
                    <h1 className="text-lg font-semibold">
                        <span className="text-white">User:</span>{" "}
                        <span className="text-green-400">{currentUser}</span>
                    </h1>
                </div>
                <button
                    className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-lg transition-all duration-200 shadow-lg">
                    Leave Room
                </button>
            </header>


            {/* Chat Messages */}
            <main
                ref={chatBoxRef}
                className="flex-grow py-6 px-4 overflow-auto bg-gray-800 shadow-inner rounded-lg"
            >
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`flex ${
                            message.sender === currentUser
                                ? "justify-end"
                                : "justify-start"
                        } mb-4`}
                    >
                        <div
                            className={`p-4 rounded-lg shadow-md ${
                                message.sender === currentUser
                                    ? "bg-blue-600 text-white"
                                    : "bg-gray-700 text-white"
                            } max-w-[70%]`}
                        >
                            <p className="font-medium text-sm text-blue-300">
                                {message.sender}
                            </p>
                            <p>{message.content}</p>
                        </div>
                    </div>
                ))}
            </main>

            {/* Message Input Container */}
            <div className="w-full flex justify-center bg-gray-800 px-4 py-4">
                <div
                    className="flex items-center w-4/5 max-w-3xl bg-gray-700 border border-gray-600 rounded-full px-4 py-2 shadow-lg">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type your message..."
                        className="flex-grow bg-transparent text-white placeholder-gray-400 px-4 py-2 focus:outline-none"
                    />
                    <button
                        className="flex items-center justify-center bg-gray-600 hover:bg-gray-500 text-white rounded-full w-10 h-10 shadow-md transition-all duration-200">
                        <MdAttachFile size={20}/>
                    </button>
                    <button
                        onClick={handleSendMessage}
                        className="flex items-center justify-center bg-green-500 hover:bg-green-600 text-white rounded-full w-10 h-10 shadow-md transition-all duration-200"
                    >
                        <MdSend size={20}/>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatPage;
