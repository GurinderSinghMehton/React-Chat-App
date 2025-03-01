import { useAppStore } from "@/store";
import EmojiPicker from "emoji-picker-react";
import React, { useEffect, useRef, useState } from "react";
import { GrAttachment } from "react-icons/gr";
import { IoSend } from "react-icons/io5";
import { RiEmojiStickerFill } from "react-icons/ri";
import { useSocket } from "@/context/SocketContext";
import { apiClient } from "@/lib/api-client";
import { UPLOAD_FILES_ROUTE } from "@/utils/constants";

function MessageBar() {
  const [message, setMessage] = useState("");
  const fileInputRef = useRef();
  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);
  const emojiRef = useRef();
  const socket = useSocket();
  const { selectedChatType, selectedChatData, userInfo } = useAppStore();

  useEffect(() => {
    function handleClickOutside() {
      if (emojiRef.current && !emojiRef.current.contains(event.target)) {
        setEmojiPickerOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [emojiRef]);

  const handleAddEmoji = (emoji) => {
    setMessage((msg) => msg + emoji.emoji);
  };

  const handleSendMessage = async () => {
    if (selectedChatType === "contact") {
      socket.emit("sendMessage", {
        sender: userInfo.id,
        content: message,
        recipient: selectedChatData._id,
        messageType: "text",
        fileUrl: undefined,
      });
    }
  };

  const handleAttachmentClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleAttachmentChange = async (event) => {
    try {
      const file = event.target.files[0];
      console.log({ file });

      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        const response = await apiClient.post(UPLOAD_FILES_ROUTE, formData, {
          withCredentials: true,
        });

        if (response.status === 200 && response.data) {
            if(selectedChatType === "contact"){
                socket.emit("sendMessage", {
                    sender: userInfo.id,
                    content: undefined,
                    recipient: selectedChatData._id,
                    messageType: "file",
                    fileUrl: response.data.filePath,
                });
            }
        }

      }
    console.log({file});
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <div className="h-[10vh] bg-[#1c1d25] flex justify-between items-center px-4 sm:px-6 md:px-8 mb-5 gap-3 sm:gap-5">
      <div className="flex-1 flex bg-[#2a2b33] rounded-md items-center gap-3 sm:gap-5 px-3 sm:px-5 py-2">
        <input
          type="text"
          className="flex-1 p-3 sm:p-4 bg-transparent rounded-md text-sm sm:text-base focus:border-none focus:outline-none"
          placeholder="Enter a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <button
          className="text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all"
          onClick={handleAttachmentClick}
        >
          <GrAttachment className="text-xl" />
        </button>
        <input
          type="file"
          className="hidden"
          ref={fileInputRef}
          onChange={handleAttachmentChange}
        />

        <div className="relative">
          <button
            className="text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all"
            onClick={() => setEmojiPickerOpen(true)}
          >
            <RiEmojiStickerFill className="text-2xl" />
          </button>

          <div
            className="absolute bottom-16 right-0 sm:bottom-16 sm:right-2 sm:left-auto sm:translate-x-0 w-[290px] px-4"
            ref={emojiRef}
          >
            <EmojiPicker
              theme="dark"
              open={emojiPickerOpen}
              onEmojiClick={handleAddEmoji}
              autoFocusSearch={false}
            />
          </div>
        </div>
      </div>

      <button
        className="bg-[#8417ff] rounded-xl flex items-center justify-center p-5 focus:border-none hover:bg-[#741bda] focus:bg-[#741bda] focus:outline-none focus:text-white duration-300 transition-all"
        onClick={handleSendMessage}
      >
        <IoSend className="text-xl" />
      </button>
    </div>
  );
}

export default MessageBar;
