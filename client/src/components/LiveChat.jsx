import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookMessenger } from "@fortawesome/free-brands-svg-icons/faFacebookMessenger";
import MessageItem from "./MessageItem.jsx";
import support from "../assets/customer-service-support-svgrepo-com.svg";
import { faPaperclip } from "@fortawesome/free-solid-svg-icons/faPaperclip";
import { faSmile } from "@fortawesome/free-solid-svg-icons/faSmile";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons/faPaperPlane";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";
import { server_url } from "../utils/config.js";

const generateObjectId = () => {
  return [...Array(24)].map(() => Math.floor(Math.random() * 16).toString(16)).join("");
};

function LiveChat(props) {
  const { currentUser } = useSelector(state => state.auth);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const socket = useRef(null);
  const roomId = useRef(localStorage.getItem("roomId") || generateObjectId());
  useEffect(() => {
    if (isPopupOpen) {
      socket.current = io(server_url);

      localStorage.setItem("roomId", roomId.current);
      socket.current.emit("joinRoom", roomId.current);

      socket.current.on("receiveMessage", (msg) => {
        const message = {
          message: msg.content,
          sender: {
            name: "Admin",
            role: "admin"
          }
        }
        setMessages((prev) => [...prev, message]);
      });

      socket.current.on("chatEnded", () => {
        setMessages([{ sender: "System", message: "Chat end by admin" }]);
      });
      return () => {
        socket.current.disconnect();
      };
    }
  }, [isPopupOpen]);

  const onTogglePopup = () => {
    setIsPopupOpen(!isPopupOpen)
  };

  const sendMessage = () => {
    if (message.trim()) {
      const sender = {
        _id: currentUser?._id || roomId.current,
        role: "customer"
      };
      socket.current.emit("sendMessage", { roomId: roomId.current, sender: sender, content: message });
      setMessages((prev) => [...prev, {
        sender: {
          name: "You",
          role: sender.role
        }, message
      }]);
      setMessage("");
    }
  };

  const endChat = () => {
    socket.current.emit("endChat", roomId.current);
    localStorage.removeItem("roomId");
    roomId.current =  generateObjectId()
    localStorage.setItem("roomId", roomId.current);
    setMessages([{ sender: "System", message: "Chat ended." }]);
    setTimeout(() => {
      setIsPopupOpen(false);
      setMessages([])
    }, 1000)
  };

  return (
    <>
      <div className={"fixed bottom-10 right-10"}>
        <div className={"hover:animate-shake scale-125"}>
          <button
            className={
              "flex aspect-square scale-150 items-center justify-center rounded-full bg-black p-1"
            }
            onClick={onTogglePopup}
          >
            <FontAwesomeIcon
              icon={faFacebookMessenger}
              className={"text-white"}
            />
          </button>
        </div>
      </div>
      {isPopupOpen && (
        <div>
          <div
            className={
              "animate-shakeHard fixed bottom-28 right-24 flex h-[30rem] w-96 scale-110 flex-col rounded-lg border-2 border-neutral-200 bg-neutral-100 shadow-2xl shadow-black"
            }
          >
            <div className={"flex h-[26rem] p-2"}>
              <div className={"w-full"}>
                <div className={"flex pb-4"}>
                  <div className={"w-3/4"}>
                    <h3 className={"ml-4 font-bold text-neutral-800"}>
                      Customer Support
                    </h3>
                  </div>
                  <div className={"w-1/4"}>
                    <div
                      className={
                        "scale-90 cursor-pointer bg-neutral-300 p-1 text-center text-xs italic text-neutral-500 hover:bg-neutral-700 hover:text-neutral-100"
                      }
                      onClick={endChat}
                    >
                      End Chat
                    </div>
                  </div>
                </div>
                <div className="h-[23rem] max-h-full w-full space-y-5 overflow-y-auto overscroll-y-auto text-sm italic">
                  {messages.map((msg, index) => (
                    <MessageItem text={msg.message} role={msg.sender.role} key={index} />
                  ))}
                </div>
              </div>
            </div>
            <div
              className={
                "flex flex-grow items-center border-t-2 border-neutral-200 p-2"
              }
            >
              <div className="mr-3 flex h-8 flex-shrink-0 justify-between w-full px-2">
                <div className={"flex items-center space-x-3"}>
                  <img
                    src={support}
                    alt="Support Icon"
                    className="h-full w-full object-contain"
                  />
                  <input
                    type="text"
                    placeholder={"Enter Message!"}
                    className={"flex outline-none bg-transparent"}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </div>
                <div className={"flex items-center space-x-3"}>
                  <FontAwesomeIcon
                    icon={faPaperclip}
                    className={"text-neutral-400"}
                  />
                  <FontAwesomeIcon
                    icon={faSmile}
                    className={"text-neutral-400"}
                  />
                  <FontAwesomeIcon
                    icon={faPaperPlane}
                    className={"text-cyan-500"}
                    onClick={sendMessage}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default LiveChat;
