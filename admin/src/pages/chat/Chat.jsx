import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons/faUserCircle";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons/faPaperPlane";
import { api } from "../../apis/index.js";
import { io } from "socket.io-client";
import { server_url } from "../../utils/config.js";

function Chat(props) {
  const currentUser = JSON.parse(sessionStorage.getItem("auth"));
  const socket = useRef(null);

  const [selectedRoom, setSelectedRoom] = useState(null);
  const [chatRooms, setChatRooms] = useState([]);
  const [messageContent, setMessageContent] = useState("");
  const messageContainerRef = useRef(null);
  useEffect(() => {
    socket.current = io(server_url);

    const fetchChatRooms = async () => {
      try {
        const response = await api.other.getChatRooms();
        setChatRooms(response.result || []);
      } catch (error) {
        console.error("Error fetching chat rooms:", error);
      }
    };
    fetchChatRooms();

    return () => {
      socket.current?.disconnect();
    };
  }, []);

  useEffect(() => {
    if (chatRooms && selectedRoom) {
      for (const room of chatRooms) {
        if (room.roomId === selectedRoom.roomId) {
          setSelectedRoom(room);
        }
      }
    }
  }, [chatRooms]);

  useEffect(() => {
    if (socket.current) {
      socket.current.on("roomUpdate", (updatedRooms) => {
        setChatRooms(updatedRooms);
      });
    }
    return () => {
      socket.current?.off("roomUpdate");
    };
  }, []);
  useEffect(() => {
    if (socket.current) {
      socket.current.on("receiveMessage", (message) => {
        setSelectedRoom((prevRoom) => {
          if (prevRoom?.roomId === message.roomId) {
            return {
              ...prevRoom,
              messages: [...prevRoom.messages, message]
            };
          }
          return prevRoom;
        });
      });
    }
    return () => {
      socket.current?.off("receiveMessage");
    };
  }, [selectedRoom]);

  useEffect(() => {
    if (selectedRoom) {
      socket.current.emit("joinRoom", selectedRoom.roomId);
    }
  }, [selectedRoom]);

  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  }, [selectedRoom?.messages]);

  const handleSendMessage = () => {
    if (!messageContent.trim() || !selectedRoom) return;

    const message = {
      roomId: selectedRoom.roomId,
      sender: {
        _id: currentUser?.id,
        role: currentUser?.role || "admin"
      },
      content: messageContent
    };

    socket.current.emit("sendMessage", message);

    setSelectedRoom((prevRoom) => ({
      ...prevRoom,
      messages: [...prevRoom.messages, message]
    }));

    setMessageContent("");
  };

  return (
    <div className="w-full flex flex-1 relative">
      <div className="w-1/5 flex flex-col h-full">
        {/*<div className="p-4 border-r border-b border-gray-200">*/}
        {/*  <input*/}
        {/*    type="text"*/}
        {/*    placeholder="Search Contact"*/}
        {/*    className="border border-neutral-200 py-2 px-4 w-full"*/}
        {/*  />*/}
        {/*</div>*/}
        <div className="border-r border-gray-200 flex flex-col flex-1">
          {chatRooms.length > 0 &&
            chatRooms.map((chatRoom, index) => (
              <div
                className="p-4 border-b border-gray-200 flex items-center gap-4 hover:bg-neutral-200 cursor-pointer"
                key={index}
                onClick={() => setSelectedRoom(chatRoom)}
              >
                <FontAwesomeIcon icon={faUserCircle} className="fa-3x text-blue-700" />
                <div className="max-h-12 text-ellipsis overflow-hidden whitespace-nowrap">
                  {chatRoom.roomId}
                  <p
                    className={
                      "capitalize font-semibold " +
                      (chatRoom.status === "active" ? "text-green-600" : "text-red-600")
                    }
                  >
                    {chatRoom.status}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>

      {selectedRoom ? (
        <div className="w-4/5 flex flex-col max-h-screen-minus-65">
          <div className="flex-1 p-8 overflow-y-auto" ref={messageContainerRef}>
            <div className="gap-8 flex flex-col">
              {selectedRoom.messages.map((message, index) => (
                <div key={index}>
                  <div
                    className={
                      "flex items-center gap-4 " +
                      (message.senderRole !== "customer" && "flex-row-reverse")
                    }
                  >
                    {message.senderRole === "customer" && (
                      <FontAwesomeIcon icon={faUserCircle} className="fa-3x text-blue-700" />
                    )}
                    <div className="bg-blue-200 text-neutral-800 py-2 px-4 rounded-lg text-lg">
                      {message.senderRole === "customer" && "Client: "} {message.content}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {selectedRoom.status === "active" ? (
            <div className="flex gap-2 items-center border-t py-4 px-10">
              <div className="flex flex-1">
                <input
                  type="text"
                  className="bg-transparent p-4 w-full outline-none text-lg"
                  placeholder="Type and enter"
                  value={messageContent}
                  onChange={(e) => setMessageContent(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                />
              </div>
              <div
                className="rounded-full border w-14 aspect-square flex justify-center items-center bg-cyan-300 cursor-pointer"
                onClick={handleSendMessage}
              >
                <FontAwesomeIcon icon={faPaperPlane} className="text-white fa-xl" />
              </div>
            </div>
          ) : (
            <div className="flex gap-2 items-center border-t py-4 px-10 justify-center">
              <p className="text-xl py-4 font-semibold">This chatroom is inactive</p>
            </div>
          )}
        </div>
      ) : (
        <div className="w-4/5 flex justify-center items-center">
          <p className="text-3xl -translate-y-10">Choose a chatroom</p>
        </div>
      )}
    </div>

  );
}

export default Chat;