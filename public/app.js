const chatMessages = document.getElementById("chat-messages");
const userInput = document.getElementById("user-input");
const sendButton = document.getElementById("send-button");

function addMessage(text, isBot = false) {
  const message = document.createElement("div");
  message.classList.add("chat-message");
  message.classList.add(isBot ? "bot-message" : "user-message");
  message.textContent = text;
  chatMessages.appendChild(message);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

async function handleSendMessage() {
  const userMessage = userInput.value.trim();
  if (!userMessage) return;

  addMessage(userMessage);

  userInput.value = "";

  try {
    const response = await fetch(
      "https://tour-api-04ar.onrender.com/api/chat/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: userMessage }),
      }
    );

    const data = await response.json();
    console.log(data);

    if (data.response) {
      addMessage(data.response, true);
    } else {
      addMessage("Sorry, I didn't understand that.", true);
    }
  } catch (error) {
    console.error("Error:", error);
    addMessage("Error connecting to chatbot backend.", true);
  }
}

sendButton.addEventListener("click", handleSendMessage);

userInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    handleSendMessage();
  }
});
