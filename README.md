# React + Vite

Functionalities of the Quiz App

1.User Registration and Login:

Users can register by providing an email and password.
Users can log in using their registered email and password.
The login form validates inputs and displays errors directly on the page if inputs are invalid.

2.User Authentication:

Logged-in users' data is stored in the local storage.
Logged-in users see additional menu options such as "Create Quiz", "My Results", and "Quizzes".
Users can log out, which clears their data from local storage.

3.Create Quiz:

Logged-in users can create new quizzes.
The quiz creation form includes fields for the quiz title and multiple questions.
Each question allows the user to specify a correct answer and multiple answer options.
Users can add or remove questions dynamically.
The created quiz is saved to the server and becomes available for all logged-in users to take.

4.Take Quiz:

Users can participate in any available quiz.
Quizzes consist of multiple questions with multiple-choice answers.
Users select their answers and proceed through the quiz.
Once the quiz is completed, the user's score is calculated and displayed as a pie chart.

5.View Available Quizzes:

The quiz list page lists all available quizzes that users can take.
Logged-in users can see a "Create New Quiz" button on the quiz list page.

6.View Quiz Results:

Logged-in users can view their quiz results.
The results page shows the title of the quiz and the user's score in percentage.
The scores are also saved on the server.

7.Navigation:

The website features a header with navigation links that change based on the user's authentication status.
For unauthenticated users, links to "Login" and "Register" are displayed.
For authenticated users, links to "Create Quiz", "My Results", and "Quizzes" are displayed, along with a "Logout" button.
The website features a footer with text and links to social media pages.

8.Responsive Design:

The website is designed to be responsive and adapts to different screen sizes.
Tailwind CSS is used for styling the website.
By implementing these functionalities, the website provides a comprehensive platform for creating, taking, and managing quizzes while ensuring a seamless user experience.
