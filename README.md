# Leet-Analysis-Metric

# LeetMetric

LeetMetric is a web-based application that allows users to visualize their coding progress with intuitive graphical representations like progress circles for Easy, Medium, and Hard levels. The project also supports user authentication and provides statistics about their performance in coding challenges.

## Features

- **Login System**: Allows users to securely log in with their credentials.
- **Progress Circles**: Displays the user's coding progress for Easy, Medium, and Hard levels.
- **Statistics Cards**: Shows detailed stats such as solved problems, streaks, and overall ranking.
- **Responsive Design**: The app is fully responsive and works seamlessly across different screen sizes.
- **Floating Background Animations**: Animated background for an engaging user experience.
- **Wave Effect**: Adds a wave-like effect at the bottom of the screen for visual enhancement.

## Technologies Used

- **Frontend**: 
  - HTML5, CSS3, JavaScript (Vanilla)
  - Animation with CSS Keyframes
  - Responsive Design using CSS Flexbox and Media Queries
- **Backend**: 
  - Node.js with Express
  - User Authentication API (Sample Code Provided)
- **Database**: Mock database (can be extended to use a real database like MongoDB)
  
## Getting Started

### Prerequisites

Ensure you have the following installed:

- **Node.js** (version 14 or higher)
- **NPM** (Node Package Manager)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/LeetMetric.git
   ```

2. Navigate to the project directory:
   ```bash
   cd LeetMetric
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the back-end server:
   ```bash
   node server.js
   ```

5. Open `index.html` in your browser to view the app.

### Usage

1. Start the Node.js server for handling login:
   ```bash
   node server.js
   ```
   
2. Go to your browser and open the `index.html` file.

3. Use the login form to enter your credentials.

4. Once logged in, you can view your coding stats, progress circles, and other features.

### Project Structure

```bash
├── public
│   ├── css
│   │   └── style.css          # Main styles
│   ├── js
│   │   └── app.js             # Frontend logic for login and progress
│   └── index.html             # Main HTML file
├── server.js                  # Node.js server handling login
├── README.md                  # Project documentation
└── package.json               # Node.js dependencies
```

### API Endpoints

#### POST `/login`

Authenticates the user based on the provided credentials.

- **Request Body**:
  ```json
  {
    "username": "user1",
    "password": "password123"
  }
  ```

- **Response**:
  - Success:
    ```json
    {
      "success": true,
      "message": "Login successful"
    }
    ```
  - Failure:
    ```json
    {
      "success": false,
      "message": "Invalid credentials"
    }
    ```

## Future Enhancements

- **Integrate Real Authentication**: Use JWT or OAuth for secure authentication.
- **Real Database Integration**: Replace mock data with a real database like MongoDB or MySQL.
- **Progress Calculation**: Fetch and display actual progress data from competitive coding platforms like LeetCode, Codeforces, etc.
- **User Profile**: Allow users to edit their profiles and track personal achievements.

## Contributing

Feel free to submit pull requests for new features or bug fixes. If you'd like to contribute:

1. Fork the repository.
2. Create your feature branch: `git checkout -b feature/new-feature`
3. Commit your changes: `git commit -m 'Add new feature'`
4. Push to the branch: `git push origin feature/new-feature`
5. Submit a pull request.

