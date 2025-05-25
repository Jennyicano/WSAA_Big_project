# WSAA_Big_project

**Module: Web Service and Applications**

**Author:** Jennifer Ibanez Cano. Student of Higher Diploma in Science in Computing in Data Analytics at the [ATU Galway](https://www.atu.ie), 2025.

![image](https://darkwood.lv/image/catalog/categories/boardgames.jpg)

**About this repository**

This repository contains my final project for the Web Services and Applications (WSAA) module, 2025. The main goal is to develop a web application that allows for board game management, implementing concepts of web service architecture and modern applications.

## 🧩 Project Description

This projects follow the instructions provided in the Github of the lecture [Andrew Beatty](https://github.com/andrewbeattycourseware/WSAA-Courseware/blob/main/labs/WSAA%20Project%20Description.pdf)

The application allows users to:

* **View a list of available board games.**
* **Add new games to the catalog.**
* **Edit and delete existing games.**

The project is developed using **Python** for the backend and **JavaScript** for the frontend, following a **client-server architecture**.

## 📁 Project Structure

```
WSAA_Big_project/
├── static/                         # Static assets (CSS, JS)
│   ├── boardgamescript.js          # JavaScript for frontend interactions
│   └── style.css                   # Stylesheet for the frontend
├── templates/                      # HTML templates for rendering views
│   └── index.html                  # Main HTML page
├── .gitignore                      # Git ignore rules
├── README.md                       # Project documentation
├── app_server.py                   # Main application server script (Flask)
├── boardgamesDAO.py                # Data Access Object for board games
└── requirements.txt                # Python dependencies

```

---

## 📝 Project Overview

The goal of this project is to demonstrate an understanding of **creating and consuming RESTful APIs** in a real-world web application. It allows for flexibility, which makes it useful for real-world scenarios, as you can easily adapt it for different use cases.

### Project Features:

1. **REST API** to perform **CRUD operations** on data.
2. **One database table** (MySQL) to store board game data.
3. **Web interface** with **AJAX calls** to interact with the API and perform CRUD operations.

The application was built using **Flask**, with a focus on allowing users to interact with board game data by adding, updating, deleting, and retrieving information.

The app is **hosted on PythonAnywhere** for remote access.

---

## 🚀 Technologies & Environments Used

* **Flask** – Web framework for Python.
* **MySQL** – Database to store board game data.
* **JavaScript (AJAX)** – For interacting with the API.
* **HTML5 / CSS** – Web interface design.
* **Python 3.12** – For running the project locally.
* **PythonAnywhere** – Hosting platform for deploying the Flask app.

## 🚀 Setup Instructions

### 1. Clone the Repository

To get started, clone the repository to your local machine.

```bash
git clone https://github.com/Jennyicano/WSAA_Big_project.git
```

Navigate to the project folder:

```bash
cd WSAA_Big_project
```

### 2. Set Up Virtual Environment

For **macOS/Windows**, make sure you're using the correct Python version (e.g., Python 3.12).

Create a virtual environment:

```bash
python3.12 -m venv venv
```

Activate the virtual environment:

* **macOS/Linux**:

```bash
source venv/bin/activate
```

* **Windows**:

```bash
venv\Scripts\activate
```

### 3. Install Required Packages

With the virtual environment activated, install the necessary dependencies:

```bash
pip install --upgrade pip
pip install -r requirements.txt
```

### 4. Run the Application Locally to Check the Web Interface (Windows/macOS)

1. **On Windows**:

   * Open your terminal (Command Prompt or PowerShell) and navigate to the project directory.
   * Activate the virtual environment and run the application:

     ```bash
     python app_server.py
     ```
   * Open your browser and visit `http://127.0.0.1:5000/` to interact with the web app.

2. **On macOS**:

   * Open the terminal, activate the virtual environment, and run:

     ```bash
     python app_server.py
     ```
   * Visit the web app at `http://127.0.0.1:5000/`.

---
## 🌍 Deploying on PythonAnywhere

This project is hosted on **PythonAnywhere** for remote access. Here's how to check and interact with your deployed application.

1. **PythonAnywhere URL**:
   Once deployed, your application will be available through a URL provided by PythonAnywhere (e.g., `yourusername.pythonanywhere.com`). In my project the URL is this one 'https://jennyicano.pythonanywhere.com'

2. **Bash Console** in PythonAnywhere:

   You can access the Bash console to run commands on PythonAnywhere:

   * Clone the repository:

   ```bash
   git clone https://github.com/Jennyicano/WSAA_Big_project.git
   ```

   * Navigate to the project directory:

   ```bash
   cd WSAA_Big_project
   ```

   * Set up the virtual environment:

   ```bash
   python3.12 -m venv venv
   source venv/bin/activate
   ```

   * Install the necessary packages:

   ```bash
   pip install --upgrade pip
   pip install -r requirements.txt
   ```

3. **WSGI Configuration**: here we need to ensure that the WSGI file in PythonAnywhere points to the correct entry point of the app (`app_server.py`).

   For help with WSGI-related issues, refer to this PythonAnywhere guide:
   [Debugging ImportError](https://help.pythonanywhere.com/pages/DebuggingImportError)

---

## 📚 References & Resources

### 1. Deploy to PythonAnywhere

The guide for deploying a Flask app to PythonAnywhere was highly useful:
[Deploy to PythonAnywhere](https://github.com/andrewbeattycourseware/deploytopythonanywhere)

### 2. Fixing Static File Errors (e.g., "Error GET /static/cript.js")

The following resources helped resolve issues with static file serving:
[HTML `<meta>` charset Attribute](https://www.w3schools.com/tags/att_meta_charset.asp)
[W3Schools HTML](https://www.w3schools.com/html/default.asp)
[W3Schools JavaScript](https://www.w3schools.com/js/default.asp)

### 3. Virtual Environments in macOS

[Python Virtual Environments - Python Land](https://python.land/virtual-environments/virtualenv)

### 4. Troubleshooting Common Errors

* Issue: `AttributeError: module 'pkgutil' has no attribute 'ImpImporter'`
  Solution: Found helpful answers on Stack Overflow:
  [StackOverflow Help](https://stackoverflow.com/questions/77364550/attributeerror-module-pkgutil-has-no-attribute-impimporter-did-you-mean)

### 5. ChatGPT Assistance

ChatGPT helped polish the **HTML** and **JavaScript** code and helped structure the `README.md`.

---

## ⚙️ Future Enhancements

* Add user authentication for creating and managing board games.
* Expand the database to include additional attributes for board games.
* Improve the user interface with more advanced front-end frameworks like React or Vue.js.

---

Feel free to explore the project and contribute to future improvements. If you have any issues or questions, please open an issue on this repository.

---