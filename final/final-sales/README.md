# SALESUP

SALESUP is a simple sales recording platform that allows users to create their accounts, check daily sales records, add records, and add reminders to sales records. This platform has three types of records: Sales Record - General, Sales Record - Limited Edition, and Stock Record. Users can also add Reminders to the records they create. To test this platform, users can directly create a new account on the signup page.

The application includes a calendar and pie chart that shows users their records, as well as the ability to add reminders to records and create new records. Users can also update their personal information in profile page. The application's backend includes APIs for user and records management, including creating, viewing, updating, and deleting users and records. Users must be logged in to access these APIs, and their session is authenticated to ensure its validity.


## Some of the Screenshots of the Application

### View the Calendar & Pie chart of a Record

![View the Calendar & Pie chart of a Record](app-screenshots/calendar-and-piechart.png)

### Add a Log for the Record

![Add a Log for the Record](app-screenshots/add-record-log.png)

### Create a new Record

![Create a new Record](app-screenshots/add-new-record.png)

### Update the User Profile

![Update the User Profile](app-screenshots/user-profile.png)

## Backend

### User Related APIs:

1. /v1/user :

   - `GET` : Retrieves information about the user from the file in which it is stored.

   - `POST` : If a user does not already exist, this API creates a new user account with the specified email, password, first name, and last name. When the account is created, a JSON file is created on the server to store the user's credentials.

   - `PUT` : If a user wants to edit their first name, last name, or password, they can use this API to update their information, which will be reflected in the user file.

   - `DELETE` : When a user deletes their account, the file that was created for them is also deleted, and their session is removed. As a result, the user is redirected to the login page.

2. `/v1/user/login`:

   - `POST` : If a user has already created an account, they must log in with their credentials to access the application. A session or cookie is created for the user each time they log in, and the session ID is authenticated to ensure its validity before the user can make any backend calls. If the session ID is expired or corrupted, the user is redirected to the login page.

3. `/v1/user/logout`:
   - `POST` :Once a user is logged in, they can use this API to log out, which will delete their session ID.

### Records Related APIs

1. `/v1/user/records` :

   - `POST` : This API allows users to create a record. There are three types of records, and the user must provide certain details depending on the type of record they want to create. When a record is created, the date is stored in a JSON file for the user.

      - **CREATE A SALES RECORD GENERAL** : To create a general sales record, the user must provide a record name, goal, unit, duration, and start date. These are the required fields for this type of record.
      - **CREATE A SALES RECORD LIMITED**:T o create a limited sales record, the user must provide a record name, goal, unit, duration, and start date. These are the required fields for this type of record.
      - **STOCK RECORD** : If the user wants to create a stock record, they must provide a record name and start date. These are the required fields for this type of record.

   - `GET` : When a user logs in and navigates to the home page, they will see all of the records they previously created.

   - `DELETE` : Using this API, a user can delete all of their records at once, which resets the data. All of the files related to the user's records will also be deleted.

2. `/v1/user/records/:recordId` :

   - `GET` : When a user clicks on a specific record, they can use this API to view details about the record, such as its type, name, and start date.
   - `DELETE` : Using this API, a user can delete a single record, which will also delete the file that was created for that record in the backend.

3. `/v1/user/records/:recordId/log`:

   - `POST` : The process of logging data for each record depends on the type of record. A separate log file is created for the user, and new log entries are added to the file each time they are made.

      - **CREATE A SALES RECORD GENERAL** : To create a log for a general sales record, the user must provide a duration and date. These are the required fields for this type of log.
      - **CREATE A SALES RECORD LIMITED EDITION**: To create a log for a limited sales record, the user must provide a duration and date. These are the required fields for this type of log.
      - **STOCK RECORD** : To create a log for a stock record, the user must indicate whether the record was successful and provide a date. These are the required fields for this type of log.

   - `GET` : A user can use this API to view the logs they have made for individual records, and track their progress by viewing a pie chart representation of the logs in the frontend.

## Frontend

1. **Login and SignUp pages** : If a user is new, they must first sign up and enter their details. After that, they can log in using their username and password.

1. **HomePage** : The user interface has a navigation bar that allows the user to navigate to the homepage (by default), the page for adding records, the about page, and the user profile page.

   On the homepage, the user can see all of the record entries they previously made. The page includes two accordions: one for viewing record details, and the other for adding logs to a record.

1. **ViewRecordAccordion** : The first accordion on the homepage allows the user to see the type of record, its start date, and other related data. This accordion also includes a calendar view that shows which days the user logged record details, as well as a pie chart that shows how many days the user missed logging details, how many days they achieved their partial goal, and so on.

1. **LogRecordDetailsAccordion**: This accordion allows the user to add logs to a specific record.

1. **AddRecordPage**: The page for adding records includes a toggle tab feature that makes it easy for the user to choose the type of record and create a new one.

1. **Modals**: Modal components are used to alert the user when a dangerous operation is performed, such as deleting an account or all record data.