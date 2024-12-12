# Nearby

**Nearby** is a mobile application that uses the user's location to identify nearby places and provides discount coupons for those places. The app is built with React Native using Expo for the mobile frontend and a simple Node.js/Express backend.

---

## Features

- **Location-Based Recommendations**: Identifies nearby locations using the user's current position.
- **Discount Coupons**: Displays and manages discount coupons for nearby places.
- **Cross-Platform Support**: Developed with React Native for compatibility on both Android and iOS devices.

---

## Tech Stack

### Frontend
- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)

### Backend
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)

---

## Installation

### Prerequisites
- [Node.js](https://nodejs.org/) installed
- [Expo CLI](https://docs.expo.dev/get-started/installation/) installed
- A mobile device or emulator for testing

### Steps

#### Clone the Repository
```bash
$ git clone https://github.com/yourusername/Nearby.git
$ cd Nearby
```

#### Setting Up the Backend
1. Navigate to the server directory:
    ```bash
    $ cd server
    ```
2. Install dependencies:
    ```bash
    $ npm install
    ```
3. Start the server:
    ```bash
    $ npm start
    ```
    The backend server should now be running on `http://localhost:3000`.

#### Setting Up the Frontend
1. Navigate to the mobile app directory:
    ```bash
    $ cd mobile
    ```
2. Install dependencies:
    ```bash
    $ npm install
    ```
3. Start the Expo development server:
    ```bash
    $ npx expo start
    ```
4. Use the Expo app on your mobile device or an emulator to scan the QR code and launch the app.

---

## Configuration

### Backend
- Update `server/config.js` with any required configurations (e.g., API keys).

### Frontend
- Update `mobile/config.js` to point to the correct backend server URL.

---

## Folder Structure

```
Nearby/
├── mobile/       # React Native app
│   ├── src/      # Source code
│   └── App.js    # Entry point
├── server/       # Node.js server
│   ├── routes/   # API routes
│   └── index.js  # Entry point
└── README.md     # Project documentation
```

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Contact

For any inquiries or feedback, please reach out at [your-email@example.com](mailto:your-email@example.com).

