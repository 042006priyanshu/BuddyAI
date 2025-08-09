const sessionId = localStorage.getItem('chat-session') || Date.now().toString();
localStorage.setItem('chat-session', sessionId);
