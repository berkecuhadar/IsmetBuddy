# IsmetBuddy 🐾

**IsmetBuddy** is an interactive pixel-art desktop pet companion built with **Electron.js**.

The pet lives directly on your desktop, featuring animated behaviors, sound effects, transparent window rendering, and multi-monitor support. Designed as a lightweight desktop companion, it can walk, jump, react to screen edges, and stay seamlessly integrated into your workspace.

---

## 🚀 Features

### Dynamic Animation System
- State-driven behavior system
- Includes animations for:
  - `idle`
  - `walk`
  - `jump`
  - `turn`
  - `pet`
  - `look`

### Interactive Petting System
- Hover your mouse over IsmetBuddy to pet it
- Triggers dedicated pet interaction animations
- Creates a more interactive desktop companion experience

### Multi-Monitor Support
- Detects monitor boundaries dynamically
- Prevents clipping outside visible screen areas
- Smart edge handling and movement correction

### Interactive Audio System
- Context-based sound effects
- Walking, jumping, and interaction audio
- Automatic audio cleanup to prevent overlapping sounds

### Transparent Desktop Integration
- Transparent always-on-top window
- Click-through support (when enabled)
- Non-intrusive desktop experience

---

## 📋 Prerequisites

Before running the project, ensure you have:

- **Node.js v16+** *(LTS recommended)*
- **npm v8+**

Check installed versions:

```bash
node -v
npm -v
```

---

## ⚙️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/berkecuhadar/IsmetBuddy.git
cd IsmetBuddy
```

### 2. Install Dependencies

```bash
npm install
```

---

## ▶️ Running the Application

Start IsmetBuddy:

```bash
npm start
```

Once launched, the desktop pet will appear on your screen.

---

## 🎮 Interaction Guide

### Automatic Movement
IsmetBuddy moves across the lower section of your desktop workspace automatically.

### Pet Interaction
Hover your mouse cursor over **IsmetBuddy** to pet it.

The companion reacts with a dedicated animation, making interactions feel more alive and playful.

### Edge Detection
When the pet reaches a screen boundary or monitor edge, it intelligently reacts by:

- Turning around
- Jumping
- Correcting movement paths

### Exit the Application
Close the running process through:

**Terminal**

```bash
Ctrl + C
```

---

## 📄 License

This project is licensed under the **MIT License**.

Feel free to use, modify, and distribute it.