import React, { useRef, useState, useEffect } from "react";
import { MdAttachFile, MdSend } from "react-icons/md";
import useChatContext from "../context/chatContext.jsx";
import {useNavigate} from "react-router";
import {baseURL} from "../config/AxiosHelper.js";
import {Stomp} from "@stomp/stompjs";
import toast from "react-hot-toast";
import SockJS from "sockjs-client";
import { timeAgo } from "../config/helper";
import {getMessagess} from "../services/RoomService.js";

const ChatPage = () => {

    const {roomId, currentUser, connected, setConnected, setRoomId, setCurrentUser} = useChatContext();
    // console.log(roomId);
    // console.log(currentUser);
    // console.log(connected)

    const navigate = useNavigate();
    useEffect(() => {
        if (!connected) {
            navigate("/");
        }
    }, [connected, roomId, currentUser]);

    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const inputRef = useRef(null);
    const chatBoxRef = useRef(null);
    const [stompClient, setStompClient] = useState(null);


    // page init:
    // message ko load karna hoga

    useEffect(() => {
        async function loadMessages() {
            try {
                const messages = await getMessagess(roomId);
                // console.log(messages);
                setMessages(messages);
            } catch (error) {}
        }
        if (connected) {
            loadMessages();
        }
    }, []);

    //scroll down

    useEffect(() => {
        if (chatBoxRef.current) {
            chatBoxRef.current.scroll({
                top: chatBoxRef.current.scrollHeight,
                behavior: "smooth",
            });
        }
    }, [messages]);


    useEffect(() => {
        console.log("Updated messages:", messages);
    }, [messages]);

    // Stomp Client ko init karna hoga
    useEffect(() => {
        const connectWebSocket = () => {
            ///SockJS
            const sock = new SockJS(`${baseURL}/chat`);
            const client = Stomp.over(sock);

            client.connect({}, () => {
                setStompClient(client);

                toast.success("connected");

                client.subscribe(`/topic/room/${roomId}`, (message) => {
                    console.log(message);

                    const newMessage = JSON.parse(message.body);

                    setMessages((prev) => [...prev, newMessage]);

                    //rest of the work after success receiving the message
                });
            });
        };

        if(connected) connectWebSocket();
    }, [roomId]);
    //Stomp Client ko subscribe
    // Scroll to the latest message


  /*  const handleSendMessage = () => {
        if (input.trim() === "") return; // Prevent empty messages
        setMessages([...messages, { content: input, sender: currentUser }]);
        setInput(""); // Clear input field
    };
*/
    const sendMessage = async () => {
        if (stompClient && connected && input.trim()) {
            console.log(input);

            const message = {
                sender: currentUser,
                content: input,
                roomId: roomId,
            };



            stompClient.send(
                `/app/sendMessage/${roomId}`,
                {},
                JSON.stringify(message)
            );
            setInput("");
        }

        //
    };

    function handleLogout() {
        stompClient.disconnect();
        setConnected(false);
        setRoomId("");
        setCurrentUser("");
        navigate("/");
    }


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
                <button onClick={handleLogout}
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

                            <div className="flex flex-row gap-2">
                                <img
                                    className="h-10 w-10"
                                    src={"https://avatar.iran.liara.run/public/43"}
                                    alt=""
                                />
                                <div className="flex flex-col gap-1">
                                    <p className="text-sm font-bold">{message.sender}</p>
                                    <p>{message.content}</p>
                                    <p className="text-xs text-gray-400">
                                        {timeAgo(message.timeStamp)}
                                    </p>
                                </div>
                            </div>
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
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                sendMessage();
                            }
                        }}
                        placeholder="Type your message..."
                        className="flex-grow bg-transparent text-white placeholder-gray-400 px-4 py-2 focus:outline-none"
                    />
                    <button

                        className="flex items-center justify-center bg-gray-600 hover:bg-gray-500 text-white rounded-full w-10 h-10 shadow-md transition-all duration-200">
                        <MdAttachFile size={20}/>
                    </button>
                    <button
                        onClick={sendMessage}
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
