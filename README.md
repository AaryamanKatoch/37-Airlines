# cs-546-B_group-37
ReadMe

Github repo : https://github.com/AaryamanKatoch/cs-546-B_group-37
Pdf Reference : https://pspdfkit.com/blog/2019/generate-pdf-invoices-pdfkit-nodejs/

Parth Rajeshkumar Patel - 20010839
Ridham Patel - 20010932
Aaryaman Katoch - 20011367
Hem Urmeshkumar Patel - 20011907

First seed data to database using following steps :
● npm install
● npm run seed
● npm start

User Login Details
Email : test123@stevens.edu
password : Test@123

Admin Login Details
Email : abc@gmail.com
Password : Qwerty123!

Admin route : http://localhost:3000/admin

Local machine time zone must be in 24 hrs format.

Valid Password : The length of the password must be at least 6 and it should have atleast one
special character, one number, one uppercase letter and one lowercase letter.

Passport Number : Passport number must be of length 9 and should be only numeric values. All 9 values 0 are also not allowed.

Core Features Implemented :
● Landing Page
a. Explains the purpose and motivation of the airline
b. Offers ability to search for different available flights by choosing the Departure and Arrival locations.


● Flight List Page
a. Shows the results of the search made by the customer on the landing page and will
link to the full flight details and reservation page.
It shows the flights departing on the same day as inputted by the user or within the next
7 days of the selected date.

● Individual Flight Page
a. Displays the full flight details.
b. An option to book the flight - the customer needs to create an account to book a flight.
Customers can only view the available flights and flight details on guest login (without
creating an account with our airline’s website).


● User Profile
a. Created when user registers- displays their username and information.
b. Retains a list of all the bookings made by the customer.

● Airline Management Page(Admin functionality)
a. For the airline staff to keep the website updated with the latest details on all the flights.

● Implemented different Flight Classes (First Class, Business Class, Economy Class)
while booking.

● Review section - review can be given only after the customer has traveled with the
airline.

● Allowing the customers to choose food preferences while booking the flight from a
predefined menu.



Extra Features Implemented

● Allowing a user to book tickets for others, email confirmation will go to the person for
whom the ticket was booked.
● Allowing users to download a Pdf ticket when the user has successfully booked the
flight.




Even without logging in User will be able to search for the flights that the user wants to book.
But to book the flight the user must have an account and must be logged in. The user can book
at max 5 tickets at a time. If the flights and seats are available for a particular search, then the
user can book the flights for himself and for others as well. After entering the correct details, the
user has successfully booked the flights and now the user can view the details of the booked
ticket. The user can also download the ticket as a pdf and can send the email confirmation of
the booked flight for future reference. In the user details page, the user can view his booking
history and can update his personal details as well. All the flight details can be viewed, created,
updated and deleted by the admin page that is on http://localhost:3000/admin. Only the logged
in admin can have this access.
