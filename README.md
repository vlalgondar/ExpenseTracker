# Expense Tracker Web Application

An advanced full-stack expense tracking application designed to help users manage their personal finances effectively. The application features a modern user interface, comprehensive expense management, recurring expenses, AI-powered personalized budget recommendations, and more.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Usage](#usage)
  - [Running the Backend Server](#running-the-backend-server)
  - [Running the Frontend Server](#running-the-frontend-server)
- [Features Detailed](#features-detailed)
  - [User Authentication](#user-authentication)
  - [Expense Management](#expense-management)
  - [Recurring Expenses](#recurring-expenses)
  - [Insights and Analytics](#insights-and-analytics)
  - [AI-Powered Budget Recommendations](#ai-powered-budget-recommendations)
- [AI Integration Details](#ai-integration-details)
- [Contributing](#contributing)
- [License](#license)

## Features

- **User Authentication**: Secure sign-up and login using JSON Web Tokens (JWT).
- **Expense Management**: Add, edit, delete, and view expenses.
- **Recurring Expenses**: Set up recurring expenses that automatically generate entries.
- **Insights and Analytics**:
  - Visualize expenses over time with interactive charts.
  - View expenses by category.
  - Switch between daily, monthly, and yearly views.
- **AI-Powered Budget Recommendations**:
  - Analyze spending patterns using machine learning.
  - Provide personalized budget suggestions.
  - Identify areas where users can save money.
- **Responsive Design**: Modern UI inspired by stripe.com, responsive across devices.
- **Secure API**: Backend API built with Django REST Framework.
- **Data Visualization**: Charts implemented using Chart.js and react-chartjs-2.

## Technologies Used

### Frontend

- **React.js**: JavaScript library for building user interfaces.
- **Material-UI (MUI)**: React components for faster and easier web development.
- **Chart.js & react-chartjs-2**: For data visualization.
- **Axios**: Promise-based HTTP client for making API requests.
- **React Router**: For client-side routing.
- **JWT Decode**: For decoding JWT tokens.
- **Font**: "Raleway" font for typography.

### Backend

- **Django**: High-level Python Web framework.
- **Django REST Framework**: Toolkit for building Web APIs.
- **Python**: Programming language.
- **SQLite/PostgreSQL**: Database for storing data.
- **Machine Learning Libraries**:
  - **scikit-learn**: For machine learning algorithms.
  - **pandas**: Data manipulation and analysis.

### Tools

- **Git**: Version control system.
- **npm**: Package manager for JavaScript.
- **pip**: Package installer for Python.
- **Virtualenv**: For creating isolated Python environments.

## Prerequisites

- **Node.js and npm**: To run the frontend.
- **Python 3.x**: To run the backend.
- **pip**: Python package installer.
- **Virtualenv**: Recommended for managing Python environments.

## Installation

### Backend Setup

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/yourusername/expense-tracker.git
   cd expense-tracker/backend

2. **Create a Virtual Environment**:
    
    ```bash
    python -m venv venv

3. **Activate the VE**

    ```bash
    source venv/bin/activate

4. **Install Backend Dependencies**:

    ```bash
    pip install -r requirements.txt

5. **Apply Migrations**:

    ```bash
    python manage.py makemigrations
    python manage.py migrate


### Frontend Setup

1. **Navigate to Frontend Directory**:

    ```bash
    cd frontend

2. **Install Frontend Dependencies**

    ```bash
    npm install


### Project Structure

    ```java
        expense-tracker/
    ├── backend/
    │   ├── expenses/
    │   │   ├── migrations/
    │   │   ├── management/
    │   │   │   └── commands/
    │   │   │       └── generate_recurring_expenses.py
    │   │   ├── __init__.py
    │   │   ├── admin.py
    │   │   ├── apps.py
    │   │   ├── models.py
    │   │   ├── serializers.py
    │   │   ├── urls.py
    │   │   └── views.py
    │   ├── expense_tracker/
    │   │   ├── __init__.py
    │   │   ├── settings.py
    │   │   ├── urls.py
    │   │   └── wsgi.py
    │   ├── db.sqlite3
    │   ├── manage.py
    │   └── requirements.txt
    ├── frontend/
    │   ├── public/
    │   │   └── index.html
    │   ├── src/
    │   │   ├── components/
    │   │   │   ├── AddExpense.js
    │   │   │   ├── AddRecurringExpense.js
    │   │   │   ├── Budget.js
    │   │   │   ├── BudgetRecommendations.js
    │   │   │   ├── ExpenseList.js
    │   │   │   ├── Insights.js
    │   │   │   ├── Login.js
    │   │   │   ├── RecurringExpenseList.js
    │   │   │   │── Register.js
    │   │   │   └── api.js  
    │   │   ├── App.js
    │   │   ├── index.js
    │   │   ├── theme.js
    │   │   └── ...
    │   ├── package.json
    │   └── package-lock.json
    └── README.md
    ```

## Using/Testing the Application

### Starting the backend

1. **After activating the virtual environment, navigate to backend directory**

2. **Run the backend server**

    ```bash
    python manage.py runserver

    The backend server will start at http://127.0.0.1:8000/

### Starting the frontend

1. **Start the React dev server**

    ```bash
    cd frontend
    npm start


    The frontend will be available at http://localhost:3000/.

## Features In App

### User Authentication
    Sign Up: New users can create an account by providing a username, email, and password.
    Login: Existing users can log in using their credentials.
    JWT Authentication: Secure authentication using access and refresh tokens.
    Token Refresh: Automatic refreshing of access tokens to maintain user sessions.
    Protected Routes: Only authenticated users can access certain pages.
### Expense Management
    Add Expense: Users can add new expenses by providing details like description, amount, date, and category.
    View Expenses: Users can view a list of their expenses.
    Filter and Sort: Expenses can be filtered by category and sorted by date.
    Edit and Delete: (Future enhancement) Users can edit or delete existing expenses.

### Insights and Analytics
    Expense History Chart: Interactive line chart showing expenses over time.
    Expenses by Category: Pie chart displaying expense distribution across categories.
    Timeframe Selection: Switch between daily, monthly, and yearly views on charts.
    Total Expenses: View total expenses for daily, weekly, and monthly periods.
    Budget Overview: Set and view budgets, with color-coded alerts when exceeding limits.

## In-Progress Features

### AI-Powered Budget Recommendations
    Personalized Analysis: Uses machine learning to analyze user's spending patterns.
    Clustering Algorithms: Segments expenses into categories and identifies spending habits.
    Recommendations:
    Suggests personalized budgets based on historical data.
    Highlights areas where the user can potentially save money.
    Interactive Interface: Recommendations are displayed in an easy-to-understand format.

## Recurring Expenses
    Add Recurring Expense: Set up expenses that recur on a regular basis (daily, weekly, biweekly, monthly, yearly).
    Automated Entry Creation: Recurring expenses automatically generate expense entries on their due dates.
    View Recurring Expenses: Users can view and manage their recurring expenses.
    Delete Recurring Expenses: Users can delete recurring expenses when they no longer apply.
