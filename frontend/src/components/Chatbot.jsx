import React, { useState } from 'react';
import axios from 'axios'; // Import axios

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  const toggleChatWindow = () => {
    setIsOpen(!isOpen);
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (message.trim() === '') return;

    // Add the user message to chat history
    setChatHistory([...chatHistory, { sender: 'user', text: message }]);

    try {
      // Make a POST request to the backend
      const response = await axios.post('http://localhost:8000/chatbot', {
        user_question: message,
      });

      // Add the response to chat history
      setChatHistory([...chatHistory, { sender: 'user', text: message }, { sender: 'bot', text: response.data.response }]);

      // Clear the input field
      setMessage('');
    } catch (error) {
      console.error('Error sending message to chatbot:', error);
      setChatHistory([...chatHistory, { sender: 'bot', text: 'Error: Could not get a response.' }]);
    }
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
            {/* Display chat history */}
            {chatHistory.map((entry, index) => (
              <div key={index} className={`mb-2 ${entry.sender === 'user' ? 'text-right' : 'text-left'}`}>
                <strong>{entry.sender === 'user' ? 'You: ' : 'Bot: '}</strong>
                {entry.text}
              </div>
            ))}
          </div>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded-lg"
            />
          </form>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
