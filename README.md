Deployment: https://se-4458-final-bfc5gzfhdhgkase5.italynorth-01.azurewebsites.net/

Assumptions:
> The prices for the medicine are randomly generated
> Prescriptions are divided into two models: Prescriptions which are assigned by the doctors and bills which are assigned by the pharmacists
> There is no proper account system (signups etc) There is only 2 accounts on the system, (email: doctor@a.com password: password, email: pharmacy@a.com password: password)

Design:
> The entire program is handled using microservices all controlled by a main api gateway, the gateway redirects all calls to the proper api and authorizes the users sending the requests
> The asynchronous queueing solution has been made using the queue package on npm and utilizing a microservice (dubbed dataHandler)
> The caching solution has been made using the indexing feature of Mongoose
> The scheduling solution has been made using the Azure Logic Apps

Issues:
> I chose to not implement storage features into this app, much less a redux for acocunts, so the website does require you to relog every time you refresh it
> The frontend, for the lack of a better word, looks horrendous. I am working on a really low quality laptop that makes it hell to work on anything GUI related since my build times are noticably bad.
> Figuring out how to import the xlsx file as a blob and then parse it properly was probably the hardest part of this project, but I am pretty happy with the code I've written in that regard.
> There is no easy way for pharmacists to see the id of a Prescription without waiting for the mail.
> There is also no actual emailing system. I doubt we were required to implement one since there is no free solution for this as far as I know but the "mails" are just sent in the server logs.

