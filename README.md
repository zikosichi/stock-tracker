![logo](https://s3-eu-central-1.amazonaws.com/payconig-prod-website/wp-content/uploads/sites/5/2017/11/27203505/payconiq_logo.png)
# Payconiq Assessment - Market Tracker
## The mission
People struggle to keep track of their investments these days. Can you be the savior?
You will be crafting a front-end application that consumes a live stocks market API to create a Market Tracker application.

To achieve that, you will consume the [Alpha Vantage API](https://www.alphavantage.co/). You can easily set up an account and [retrieve an API key](https://www.alphavantage.co/support/#api-key).

## Required features
#### Stocks overview
The ability to view all stocks that are being tracked. That includes each individual stock's **symbol, price and volume**. How the stocks will be displayed is completely up to you.
Upon re-entering this view (for example, after creating a new stock), the data of all tracked stocks will be retrieved and displayed (so the most recent values are always displayed).

#### Add a new stock
The ability to add a single stock to the tracker.
The [Batch Stock Quotes documentation](https://www.alphavantage.co/documentation/#batchquotes) will help you find out how to get stock(s) data.

#### Remove a stock
The ability to remove a stock from the tracker. That means, the stock will not be tracked or displayed anymore.

#### Persistence
The user should be able to persist the tracked stocks. Find a way to save the stocks after every session (or in other words, ofter closing the browser window).


## Bonus features
These are not mandatory, but they will certainly impress us.

#### Live price update
Right now, in order to get the new price of the stocks - the user has to refresh the page. Add support for live updates every X minutes.
The user should be able to choose between 1 minute, 2 minutes, 5 minutes, 10 mintes, 15 minutes, 30 minutes and 60 minutes.

#### Stock daily history view
The ability to click a stock in the overview, and view its entire price history over the past day, within 15 minutes intervals.
Hint: Look into the [TIME_SERIES_INTRADAY documentation](https://www.alphavantage.co/documentation/#intraday).

## Mock-ups
We have provided you with very minimal mock-ups. That is, to leave you some room for innovation and design. However, try to make sure that the skeleton of your application remains the same as in the mock-up.

* [Stocks overview mockup](mockups/stocks-overview.png)
* [Add new stock mockup](mockups/add-new-stock.png)
* [Stock daily history mockup (bonus)](mockups/stock-daily-history.png)


## The assignment
#### Technology stack
Please use the following technologies:
* Angular (latest)
* SCSS/SASS/CSS/HTML
* Git version control (descriptive commit messages)
* BONUS - Angular Material (otherwise, any other UI framework that you feel comfortrable working with)
* BONUS - Follow the [Angular Styleguide](https://angular.io/guide/styleguide)
* BONUS - Follow the [BEM](http://getbem.com/) methodology for CSS

#### Getting started and submission
You can start by cloning this repository. Then, start a new Angular project using the Angluar CLI:
```
ng new client --style scss --skip-git --directory client
```
Good luck! Once you are done with the assignment, you can submit it by creating a pull request to the *master* branch of this repository. We will evaluate your assignment as soon as possible.

#### Evaluation of your assignment
Your assessment will be evaluated based on your proficiency and usage of the above technologies or any other technologies you chose to use. We expect you to treat this assignment as you would treat any other application you develop (with all its implications).

*Payconiq is in no way affiliated with Alpha Vantage. We use the API provided by Alpha Vantage for candidate evaluation purposes only.*
