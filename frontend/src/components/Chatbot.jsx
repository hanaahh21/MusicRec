import React, { useState } from 'react';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChatWindow = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chatbot Icon */}
      <button
        onClick={toggleChatWindow}
        className="bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 focus:outline-none"
      >
        <span role="img" aria-label="chat">💬</span>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-16 right-4 bg-white shadow-lg rounded-lg p-4 w-80 max-w-xs z-50">
          <div className="text-lg font-bold mb-2">Chat with us</div>
          <div className="h-60 overflow-auto border border-gray-300 p-2 mb-2">
            {/* Chat messages go here */}
          </div>
          <input
            type="text"
            placeholder="Type your message..."
            className="w-full border border-gray-300 p-2 rounded-lg"
          />
        </div>
      )}
    </div>
  );
};

export default Chatbot;
