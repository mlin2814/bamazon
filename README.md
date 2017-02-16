# bamazon
Here is my commandline based application using MySQL for the database storage. I'm using a well-known online retailer as the basis for this application. This application has two main parts: one for customers and the other for managers. The customer side is fully operational and the manager one is close to completion.

Here are screenshots of what is occuring on the client's side.
Here we're given the stock of what items are held along with an ID number.
![Bamazon Customer view](https://github.com/mlin2814/bamazon/blob/master/Bamazon%20Customer%20View.png)

The user makes their choice of what they want and stock is taken out of the database.
The database shown here:
![Bamazon Database original](https://github.com/mlin2814/bamazon/blob/master/Bamazon%20database%20-%20original.png)

You can see the stock being reduced in the database here:
![Bamazon Customer view](https://github.com/mlin2814/bamazon/blob/master/Bamazon%20database%20-%20reduced%20stock.png)

This image is the same as above, but the second time the command is run, we see that if an item amount is too great to meet the stock, it will display an 'Out of Stock' message.
![Bamazon Customer view](https://github.com/mlin2814/bamazon/blob/master/Bamazon%20Customer%20View.png)