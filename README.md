# Project Title

### React BlackJack

# Project Description

This is a simple web application based on the popular game, BlackJack. The code involves extensive use of React Hooks

## Demo

You can check out the app hosted on Heroku at: https://react-b1ackjack.herokuapp.com/

## Tech Used

This application was built with:

- React
- HTML
- CSS
- JavaScript

## Installation

1. Clone the repository to your local environment
2. In the root folder, open a terminal and enter the command:
#### `npm install`
3. To run the app, enter the command:
#### `npm start`
4. The app should automatically open your browser. If not, open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## How to play the game
The rules are pretty simple: 
- The goal is to get the sum of your cards as close to 21 or equal to 21
- The dealer and you are dealt two cards each
- The values of the cards are as follows:
    - 2-10 : Their numeric values
    - J, K, Q: 10
    - Ace: 1 or 11 (only one ace can be made to be 11 if there are two aces in a hand)
- You can choose to "Hit" to draw a card or you can choose to "Stay" to stop drawing cards
- If you "Hit" and your score goes above 21, you lose
- If you "Stay", the dealer will keep drawing cards until their value is 17
- After this, if the dealer's score has gone above 21, you win
- If not, your scores are compared and whoever has the higher score wins 
