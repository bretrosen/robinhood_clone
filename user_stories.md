# User Stories

## Users

### Sign Up
* As an unregistered and unauthorized user, I can sign up for the website via a sign-up form.
    * When I'm on the `/signup` page:
        * I can enter my email, first name, last, and preferred password on a clearly laid out form.
        * The website should log me in upon successful completion of the sign-up form, so that I can seamlessly access the site's functionality.
        * On successful sign-up, I would like to recieve one free, randomly chosen stock.
    * When I enter invalid data on the sign-up form:
        * I would like the website to inform me of the validations I failed to pass, and repopulate the form with my valid entries (except my password), so that I can try again without needing to refill forms I entered valid data into.

### Log in

* As a registered and unauthorized user, I want to be able to log in to the website via a log-in form.
  * When I'm on the `/login` page:
    * I would like to be able to enter my email and password on a clearly laid out form.
    * I would like the website to log me in upon successful completion of the log-in form, so that I can seamlessly access the site's functionality.
  * When I enter invalid data on the log-up form:
    * I would like the website to inform me of the validations I failed to pass, and repopulate the form with my valid entries (except my password), so that I can try again without needing to refill forms I entered valid data into.

### Demo User

* As an unregistered and unauthorized user, I would like an easy to find and clear button on both the `/signup` and `/login` pages to allow me to visit the site as a guest without signing up or logging in.
  * When I'm on either the `/signup` or `/login` pages:
    * I can click on a Demo User button to log me in and allow me access as a normal user, so that I can test the site's features and functionality without needing to stop and enter credentials.

### Log Out

* As a logged in user, I want to log out via an easy to find log out button on the navigation bar.
  * While on any page of the site:
    * I can log out of my account and be redirected to the log-in page, so that I can easily log out to keep my information secure.

## Dashboard/Portfolio

* As a logged in user, I want to see the value of my portfolio over time, and be able to adjust the time span.

* As a logged in user, I want to see an abbreviated view of all of my watchlists.
    * Clicking on a watchlist navigates me to the watchlist page.
    * Clicking on a stock in the watchlist navigates me to the details page for that stock.

* As a logged in user, I want to be able to use the stock search bar.

### Transactions

* As a logged in user, I am able to buy a fractional or integer quantity of a new stock or more of a stock I already own, provided the purchase price does not exceed my buying power.
    * The purchase price should be based on the most recent value of the stock.
    * The purchase price should be subtracted from my buying power.

* As a logged in user, I am able to sell any amount of my stocks.
    * The sale price should be based on the most recent value of the stock.
    * The sale price should be added to my buying power.

* As a logged in user, I want to be able to add more funds to my account.

## Stock Detail

* As a logged in user, I can see the value of a stock over time and am able to adjust the time span.

* As a logged in user, I want to be able to buy any quantity of a new stock, or a stock I already own, from that stock's details page.

* As a logged in user, I want to be able to add a stock to my watchlist from the details page.

* As a logged in user, I want to be able to use the stock search bar.

## Watchlist
* As a logged in user, if I click on a stock in a watchlist, it takes me to that stock's details page.

* As a logged in user, the page for an individual watchlist shows a view of all my watchlists, and I can update or delete them.

* As a logged in user, I am able to create a new watchlist from my portfolio page or from an individual list's page.

* As a logged in user, I am able to update and delete the current watchlist.

* As a logged in user, I want to be able to use the stock search bar.

## Stock Search
* As a logged in user, I want to be able to use the stock search bar from any page.

* As a logged in user, I want the stock search bar to show a dropdown list of suggested stocks that adjusts as I type in the search bar.
  * If I click on one of the suggestions in the dropdown list, it takes me to that stock's details page.
  * The dropdown list highlights the characters I've typed in the search bar in a different color.
