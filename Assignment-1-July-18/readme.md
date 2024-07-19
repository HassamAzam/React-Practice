-----------------------------------------------Overview-------------------------------------------------

The JSON Identifier web app is a simple single-page application that provides two main functionalities:

    Search for an employee by ID and return the corresponding response.
    Validate user input to check if it's a JSON string and then submit it to an external API.

Technologies Used

    HTML
    CSS
    JavaScript

Features

    Search by ID: Enter an employee ID to search and retrieve the employee's name and ID.
    JSON Validator and Submitter: Input a JSON string, validate it, and submit it to an external API if valid.

File Structure

    index.html: Main HTML file containing the structure and JavaScript for the web app.
    style.css: CSS file for styling the web app.

Usage


Functionalities
Search by ID

    Enter the employee ID in the input field labeled "Please enter the id to be searched below".
    Click the "Search" button.
    The app will display the employee's name and ID if found, or an error message if the ID is invalid or not found.

JSON Validator and Submitter

    Enter your JSON string in the input field labeled "Enter your JSON response".
    Click the "Submit" button.
    The app will:
        Validate if the input is a valid JSON string.
        If valid, send the JSON to the external API and display a success message with the unique ID.
        If invalid, display an error message indicating the JSON is not valid.