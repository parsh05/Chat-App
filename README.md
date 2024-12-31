# Real-Time Chat Application 🚀

Welcome to the **Real-Time Chat Application**, a full-stack project enabling seamless communication with live message updates, room management, and a polished user interface. This README provides everything you need to get started and understand how the application works.

---

## 🌟 Features

- **Real-Time Messaging**: Send and receive messages instantly using WebSocket (StompJS & SockJS).
- **Room Management**: Create, join, and manage chat rooms effortlessly.
- **Pagination for Messages**: View messages in pages for a clean experience.
- **Interactive UI**: A sleek, responsive design using Tailwind CSS.
- **Backend**: Built with Spring Boot, connected to MongoDB for storing chat data.
- **Frontend**: Developed using React.js with dynamic updates and user-friendly components.

---

## 📂 Project Structure

### Backend (`/chat-app-backend`)

#### Key Files:

- **`application.properties`**: Contains Spring Boot configurations for MongoDB.
- **`ChatController.java`**: Handles WebSocket messaging.
- **`RoomController.java`**: Manages room creation and retrieval.
- **`MessageRequest.java`**: DTO for sending messages.
- **`RoomRepository.java`**: MongoDB repository interface for Room entity.
- **`Room.java`**\*\* & \*\*\*\*`Message.java`\*\*: Entity classes for storing room and message details.

#### Maven Wrapper Configuration (`.mvn/wrapper/maven-wrapper.properties`):

```properties
wrapperVersion=3.3.2
distributionType=only-script
distributionUrl=https://repo.maven.apache.org/maven2/org/apache/maven/apache-maven/3.9.9/apache-maven-3.9.9-bin.zip
```

#### Run the Backend:

```bash
cd chat-app-backend
mvn spring-boot:run
```

### Frontend (`/front-chat-2`)

#### Key Files:

- **`ChatPage.jsx`**: Main chat interface with messaging logic.
- **`routes.jsx`**: Handles routing for the application.
- **`chatContext.jsx`**: Provides global state for user and room management.
- **`main.jsx`**: Root file for React application.

#### Run the Frontend:

```bash
cd front-chat-2
npm install
npm run dev
```

---

## 🚀 Getting Started

### Prerequisites

1. **Node.js**: [Download](https://nodejs.org/)
2. **Java**: [Download](https://www.oracle.com/java/technologies/javase-downloads.html)
3. **MongoDB**: Ensure MongoDB is running locally on port `27017`.

### Setup Steps:

1. Clone the repository:
   ```bash
   git clone <repository_url>
   ```
2. Run the backend and frontend as mentioned above.
3. Open your browser and navigate to `http://localhost:5173` to access the app.

---

## 📸 Sneak Peek

### Chat Interface:

🎉 Live message updates with a sleek design.

### Room Management:

🏠 Easy-to-use room creation and joining.

---

## 🤝 Contributors

- **Parshant Kumar Singh**
- **Praveen Kumar**

---

## 📬 Feedback

Have suggestions or issues? Feel free to open a [GitHub Issue](https://github.com/your-repo/issues) or reach out to us.

---

**Happy Chatting!** 💬✨

