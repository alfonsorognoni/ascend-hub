"use client";
import { useState } from "react";

const InputMessage = ({
  handleSendMessage,
}: {
  handleSendMessage: Function;
}) => {
  const [message, setMessage] = useState("");
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };
  const handleSendClick = () => {
    handleSendMessage(message);
    setMessage("");
  };
  return (
    <div className="mt-auto mb-0">
      <input
        onChange={handleChange}
        type="text"
        placeholder="Type a message..."
        value={message}
      />
      <button onClick={handleSendClick}>Send</button>
    </div>
  );
};

export default InputMessage;
