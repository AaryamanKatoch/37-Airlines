# cs-546-B_group-37
ReadMe

Github repo : https://github.com/AaryamanKatoch/cs-546-B_group-37 <br>
Pdf Reference : https://pspdfkit.com/blog/2019/generate-pdf-invoices-pdfkit-nodejs/

<b>Group Members</b><br>
Parth Rajeshkumar Patel - 20010839<br>
Ridham Patel - 20010932<br>
Aaryaman Katoch - 20011367<br>
Hem Urmeshkumar Patel - 20011907

<b>Project Overview</b><br>
37 Airlines - A Flight Booking System<br>
One can search flights based on departure, arrival and date. One can look for every information about flight and book the tickets after logging in to the system.<br>
On the other hand, admin can perform CRUD operations on the flights.<br>
User can add reviews once they complete a flight.

<b>What you need to do to run this project..</b><br>
First seed data to database using following steps :<br>
● npm install<br>
● npm run seed<br>
● npm start

<b>User Login Details</b><br>
Email : test123@stevens.edu<br>
password : Test@123

<b>Admin Login Details</b><br>
Email : abc@gmail.com<br>
Password : Qwerty123!

Admin route : http://localhost:3000/admin

Local machine time zone must be in 24 hrs format.

Valid Password : The length of the password must be at least 6 and it should have atleast one
special character, one number, one uppercase letter and one lowercase letter.

Passport Number : Passport number must be of length 9 and should be only numeric values. All 9 values 0 are also not allowed.

Every other input attributes follow normal validations.

<b>*Core Features Implemented :</b><br>
● Landing Page - Offers ability to search for different available flights by choosing the Departure and Arrival locations.

● Flight List Page<br>
Shows the results of the search made by the customer on the landing page and will
link to the full flight details and reservation page.
It shows the flights departing on the same day as inputted by the user or within the next
7 days of the selected date.

● Individual Flight Page<br>
a. Displays the full flight details.<br>
b. An option to book the flight - the customer needs to create an account to book a flight.
Customers can only view the available flights and flight details on guest login (without
creating an account with our airline’s website).

● User Profile<br>
a. Created when user registers- displays their username and information.<br>
b. Retains a list of all the bookings made by the customer.

● Airline Management Page(Admin functionality)<br>
For the airline staff to keep the website updated with the latest details on all the flights.

● Implemented different Flight Classes (First Class, Business Class, Economy Class)
while booking.

● Review section - review can be given only after the customer has traveled with the
airline.

● Allowing the customers to choose food preferences while booking the flight from a
predefined menu.



Extra Features Implemented<br>
● Allowing a user to book tickets for others<br>
● Booking confirmation on email<br>
● Allowing users to download a Pdf ticket when the user has successfully booked the tickets



<b>Guest Users</b><br>
Even without logging in User will be able to search for the flights that the user wants to book.
But to book the flight the user must have an account and must be logged in. <br>
<br>
The user can book at max 5 tickets at a time.<br>
If the flights and seats are available for a particular search, then the
user can book the flights for himself and for others as well. After entering the correct details, the
user has successfully booked the flights and now the user can view the details of the booked
ticket. <br>
User can also download the ticket as a pdf and can send the email confirmation of
the booked flight for future reference. <br>
In the user details page, the user can view his booking
history and can update his personal details. <br><br>
All the flight details can be viewed, created,
updated and deleted by the admin page that is on http://localhost:3000/admin. Only the logged
in admin can have this access.
