import React, { useRef, useState, useEffect } from "react";
import axios from "axios";

const Chatbot = () => {
  const animatedHiGif =
    "http://localhost:4000/media/hello-emoji-11573469-9477762.mp4"; // Replace this with the path to your animated GIF
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const clearMessages = () => {
    setMessages([]);
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    try {
      const response = await axios.post("/api/ai", { prompt: input });
      if (response.data && response.data.text) {
        const botMessage = {
          sender: "bot",
          text: response.data.text,
        };
        setMessages((prevMessages) => [...prevMessages, botMessage]);
      } else {
        console.error("Unexpected response structure:", response.data);
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }

    setInput("");
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevents form submission
      sendMessage(); // Call sendMessage function when Enter is pressed
      setInput("");
    }
  };

  const initialContainerStyle = {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    width: "50px",
    height: "50px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    backgroundColor: "#fff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    opacity: "0.7",
    transition: "all 0.3s ease",
    cursor: "pointer",
  };

  const expandedContainerStyle = {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    width: "300px",
    height: "400px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    backgroundColor: "#fff",
    display: "flex",
    flexDirection: "column",
    opacity: "1",
    transition: "all 0.3s ease",
  };

  const hoverContainerStyle = {
    ...initialContainerStyle,
    width: "100px",
    height: "100px",
    opacity: "1",
  };

  const emojiContainerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  };

  const textStyle = {
    margin: "0 10px",
    fontSize: "10px",
    fontWeight: "bold",
    cursor: "pointer",
  };

  const plusSignStyle = {
    fontSize: "24px",
    cursor: "pointer",
  };

  const chatbotHeaderStyle = {
    backgroundColor: "#007bff",
    color: "#fff",
    padding: "10px",
    borderTopLeftRadius: "8px",
    borderTopRightRadius: "8px",
    textAlign: "center",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };

  const closeButtonStyle = {
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
    marginLeft: "auto",
  };

  const chatbotMessagesStyle = {
    flex: 1,
    padding: "10px",
    overflowY: "auto",
  };

  const userMessageStyle = {
    textAlign: "right",
    margin: "5px 0",
    padding: "10px",
    backgroundColor: "#007bff",
    color: "#fff",
    borderRadius: "8px",
  };

  const botMessageStyle = {
    textAlign: "left",
    margin: "5px 0",
    padding: "10px",
    backgroundColor: "#f1f1f1",
    borderRadius: "8px",
  };

  const chatbotInputContainerStyle = {
    display: "flex",
    borderTop: "1px solid #ccc",
  };

  const chatbotInputStyle = {
    flex: 1,
    padding: "10px",
    border: "none",
    borderBottomLeftRadius: "8px",
  };

  const chatbotButtonStyle = {
    padding: "10px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderBottomRightRadius: "8px",
    cursor: "pointer",
  };

  return (
    <div
      style={
        isExpanded
          ? expandedContainerStyle
          : showEmoji
          ? hoverContainerStyle
          : initialContainerStyle
      }
      onMouseEnter={() => {
        setShowEmoji(true);
      }}
      onMouseLeave={() => {
        setShowEmoji(false);
      }}
    >
      {!isExpanded && showEmoji && (
        <div
          style={emojiContainerStyle}
          onClick={() => {
            setIsExpanded(true);
            clearMessages();
          }}
        >
          <video
            src={animatedHiGif}
            alt="😊"
            autoPlay
            loop
            muted
            style={{ width: "50px", height: "50px", cursor: "pointer" }}
          />
          <span style={textStyle}>Ask Anything</span>
          <span style={plusSignStyle}>+</span>
        </div>
      )}
      {isExpanded && (
        <>
          <div style={chatbotHeaderStyle}>
            Chatbot
            <span
              style={closeButtonStyle}
              onClick={() => {
                setIsExpanded(false);
                clearMessages();
              }}
            >
              ✕
            </span>
          </div>
          <div style={chatbotMessagesStyle} className="messages-container">
            {messages.map((msg, index) => (
              <div
                key={index}
                style={
                  msg.sender === "user" ? userMessageStyle : botMessageStyle
                }
              >
                {msg.text}
              </div>
            ))}
            <div ref={messagesEndRef} />{" "}
            {/* Invisible element at the end of the messages */}
          </div>
          <div style={chatbotInputContainerStyle}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              style={chatbotInputStyle}
              placeholder="Type a message..."
            />
            <button onClick={sendMessage} style={chatbotButtonStyle}>
              Send
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Chatbot;
