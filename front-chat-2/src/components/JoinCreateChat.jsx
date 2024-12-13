import chatIcon from "../assets/chat.png";
import {useState} from "react";
import toast from "react-hot-toast";
import {createRoom as createRoomAPI} from "../services/RoomService.js";

const JoinCreateChat = () => {

  const [detail, setDetail] = useState(
      {roomId:'',
                userName:'',
      });

  function handleFormInputChange(event) {
    setDetail({...detail, // sari value pehle hi store karne ke liye
      [event.target.name]:event.target.value});
  }
function validateForm(){
    if(detail.roomId ==="" || detail.username === "" ){
      toast.error("Invalid Input !!");
      return false;
    }
    return true;
}

 async function joinChat(){
    if(validateForm()){
      // join Chat

    }
  }
async  function createRoom(){
    if(validateForm()){
      // Create Room
        // call API to create room on backend
      try {
        const  response = await createRoomAPI(detail.roomId)
        console.log(response)
        toast.success("Room created successfully.!");
        joinChat();
      }catch (error ){
        console.log(error);
        console.log("Error in creating room");

      }
    }
  }

  return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-800 via-blue-900 to-gray-900 text-white">
        <div className="p-10 border w-full flex flex-col gap-5 max-w-md rounded-lg bg-gray-800 shadow-2xl">
          {/* Chat Icon */}
          <div className="flex justify-center">
            <img src={chatIcon} className="w-24" alt="Chat Icon" />
          </div>

          <h1 className="text-3xl font-semibold text-center">
            Join Room / Create Room
          </h1>

          {/* Name Input */}
          <div className="">
            <label htmlFor="name" className="block font-medium mb-2">
              Your Name
            </label>
            <input
                onChange={handleFormInputChange}
                value={detail.username}
                type="text"
                id="name"
                name="userName"
                placeholder="Enter your name"
                className="w-full bg-gray-700 px-4 py-2 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Room ID Input */}
          <div className="">
            <label htmlFor="roomId" className="block font-medium mb-2">
              Room ID / New Room ID
            </label>
            <input
                onChange={handleFormInputChange}
                value={detail.roomId}
                name="roomId"
                type="text"
                id="roomId"
                placeholder="Enter the room ID"
                className="w-full bg-gray-700 px-4 py-2 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-center gap-4 mt-4">
            <button onClick={joinChat} className="px-4 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-300 focus:outline-none">
              Join Room
            </button>
            <button onClick={createRoom} className="px-4 py-2 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 focus:ring-2 focus:ring-green-300 focus:outline-none">
              Create Room
            </button>
          </div>
        </div>
      </div>
  );
};

export default JoinCreateChat;
