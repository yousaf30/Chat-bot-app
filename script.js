
const chatBox = document.getElementById("chatBox");

const chatForm = document.getElementById("chatForm");

const messageInput = document.getElementById("messageInput");

const clearChat = document.getElementById("clearChat");




let messages =
    JSON.parse(localStorage.getItem("chatMessages")) || [];




messages.forEach(function (message) {

    displayMessage(
        message.text,
        message.sender,
        message.time
    );

});



chatForm.addEventListener("submit", function (event) {

    event.preventDefault();


    const text = messageInput.value.trim();


    
    if (text === "") {

        return;
    }


    
    addMessage(text, "sent");
    messageInput.value = "";

    messageInput.focus();


    

    setTimeout(function () {

        const botReply = getBotResponse(text);

        addMessage(botReply, "received");

    }, 700);

});




function addMessage(text, sender) {

    const time = getCurrentTime();


    const message = {

        text: text,

        sender: sender,

        time: time

    };


    

    messages.push(message);


    

    localStorage.setItem(
        "chatMessages",
        JSON.stringify(messages)
    );


  

    displayMessage(
        text,
        sender,
        time
    );
}




function displayMessage(text, sender, time) {

    const messageDiv =
        document.createElement("div");


    messageDiv.classList.add(
        "message",
        sender
    );


    messageDiv.innerHTML = `

        <div class="message-content">

            <div class="message-text">
                ${escapeHTML(text)}
            </div>

            <span class="timestamp">
                ${time}
            </span>

        </div>

    `;


    chatBox.appendChild(messageDiv);


   

    chatBox.scrollTo({

        top: chatBox.scrollHeight,

        behavior: "smooth"

    });
}




function getBotResponse(userMessage) {

    const message =
        userMessage.toLowerCase().trim();


   

    if (
        message === "hello" ||
        message.includes("hello")
    ) {

        return "Hello! 👋 How can I help you?";

    }


  

    if (
        message === "hi" ||
        message === "hey" ||
        message.includes("hi there")
    ) {

        return "Hi there! 😊 Nice to chat with you.";

    }

    if (
        message.includes("how are you") ||
        message.includes("how r u")
    ) {

        return "I'm doing great! 😊 Thanks for asking.";

    }


    

    if (
        message.includes("your name") ||
        message.includes("who are you")
    ) {

        return "I'm your Chat Assistant 🤖.";

    }



    if (
        message.includes("help") ||
        message.includes("can you help")
    ) {

        return "Sure! 😊 Send me a question and I'll try to help.";

    }


   

    if (
        message.includes("thank") ||
        message.includes("thanks")
    ) {

        return "You're welcome! 😊";

    }


    

    if (
        message === "bye" ||
        message.includes("goodbye")
    ) {

        return "Goodbye! 👋 Have a great day!";

    }


   

    if (
        message.includes("javascript")
    ) {

        return "JavaScript is a programming language used to make websites interactive and dynamic. 💻";

    }

    if (
        message.includes("html")
    ) {

        return "HTML is used to create the structure of a webpage. 🌐";

    }


    

    if (
        message.includes("css")
    ) {

        return "CSS is used to style and design webpages. 🎨";

    }


    

    if (
        message.includes("python")
    ) {

        return "Python is a popular programming language used for web development, automation, AI, data science and more. 🐍";

    }


    

    if (
        message.includes("study") ||
        message.includes("learning")
    ) {

        return "Keep learning step by step! 📚 Consistency is more important than trying to learn everything at once.";

    }




    if (
        message.includes("joke")
    ) {

        return "Why do programmers prefer dark mode? Because light attracts bugs! 😂";

    }


    

    const defaultResponses = [

        "That's interesting! 🤔 Tell me more.",

        "I understand! 👍",

        "Thanks for your message! 😊",

        "Interesting! I'm still learning, but I'm here to chat. 🤖",

        "Could you tell me a little more about that?"

    ];


    const randomIndex =
        Math.floor(
            Math.random() *
            defaultResponses.length
        );


    return defaultResponses[randomIndex];
}




function getCurrentTime() {

    const now = new Date();


    return now.toLocaleTimeString([], {

        hour: "2-digit",

        minute: "2-digit"

    });
}




clearChat.addEventListener("click", function () {

    const confirmClear =
        confirm(
            "Are you sure you want to clear the entire chat?"
        );


    if (!confirmClear) {

        return;
    }



    localStorage.removeItem("chatMessages");


    

    messages = [];


   

    chatBox.innerHTML = "";


    messageInput.focus();

});




function escapeHTML(text) {

    const div =
        document.createElement("div");


    div.textContent = text;


    return div.innerHTML;
}
