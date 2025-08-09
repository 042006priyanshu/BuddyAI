const API_KEY = 'AIzaSyCRSO0FtP1o0pq-0IDDWQkynkJrMJHLs8c';
const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

const chatMessages = document.getElementById('chat-messages');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');

async function generateResponse(prompt) {
    const response = await fetch(`${API_URL}?key=${API_KEY}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            contents: [
                {
                    parts: [
                        {
                            text: prompt
                        }
                    ]
                }
            ]
        })
    });

    if (!response.ok) {
        throw new Error('Failed to generate response');
    }

    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
}

function cleanMarkdown(text) {
    return text
        .replace(/^### (.*$)/gim, '<h3>$1</h3>')          // H3
        .replace(/^## (.*$)/gim, '<h2>$1</h2>')           // H2
        .replace(/^# (.*$)/gim, '<h1>$1</h1>')            // H1
        .replace(/^\> (.*$)/gim, '<blockquote>$1</blockquote>') // Blockquote
        .replace(/\*\*(.*?)\*\*/gim, '<b>$1</b>')         // Bold
        .replace(/\*(.*?)\*/gim, '<i>$1</i>')             // Italic
        .replace(/`([^`]+)`/gim, '<code>$1</code>')       // Inline code
        .replace(/^\d+\.\s(.*)/gim, '<li>$1</li>')        // Numbered list
        .replace(/^\-\s(.*)/gim, '<li>$1</li>')           // Bullet list
        .replace(/\n{2,}/g, '</ul><ul>')                  // New list block
        .replace(/\n/g, '<br>')                           // Line breaks
        .replace(/<ul><\/ul>/g, '')                       // Clean empty list
        .trim();
}


function addMessage(message, isUser) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.classList.add(isUser ? 'user-message' : 'bot-message');

    const profileImage = document.createElement('img');
    profileImage.classList.add('profile-image');
    profileImage.src = isUser ? 'user.jpg' : 'bot.jpg';
    profileImage.alt = isUser ? 'User' : 'Bot';

    const messageContent = document.createElement('div');
    messageContent.classList.add('message-content');
    messageContent.innerHTML = message;


    messageElement.appendChild(profileImage);
    messageElement.appendChild(messageContent);
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

async function handleUserInput() {  //handel user input
    const userMessage = userInput.value.trim();

    if (userMessage) {
        addMessage(userMessage, true);
        userInput.value = '';
        sendButton.disabled = true;
        userInput.disabled = true;

        try {
            if (userMessage.toLowerCase() === 'hi') {
                addMessage('Welcome to Priyanshu AI!', false);
            } else {
                const botMessage = await generateResponse(userMessage);
                addMessage(cleanMarkdown(botMessage), false);
            }
        } catch (error) {
            console.error('Error:', error);
            addMessage('Sorry, I encountered an error. Please try again.', false);
        } finally {
            sendButton.disabled = false;
            userInput.disabled = false;
            userInput.focus();
        }
    }
}

sendButton.addEventListener('click', handleUserInput);

userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleUserInput();
    }
});
async function loadHistory() {
    const response = await fetch(`get_history.php?session_id=${sessionId}`);
    const messages = await response.json();
    messages.forEach(msg => {
        addMessage(msg.message, msg.sender === 'user');
    });
}
window.onload = loadHistory;

function saveMessage(sender, message) {
    fetch('save_message.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            session_id: sessionId,
            sender: sender,
            message: message
        })
    });
}
