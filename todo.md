# Bug Fix

1. Unit Combat Type not being factored into calculations


# TO-DO List

1. Chart Representation of Combat Results
  *Put main result prominently at top of results section
  *Have 2 charts below, breakdown odds of each unit finishing with XX hp remaining
  *Create custom tooltip for charts
2. Give UI notification for data loading on page loading
3. Grey/Hide Terrain, HP, and Promotions until after Unit is entered
4. Remove Calculate Button / automatically update odds upon each change after 2 valid units are entered
5. Improve UI Layout of Attacking Unit & Defending Unit sections
6. Refactor
  *Create Results object that contains all information needed to display odds information
    *array of odds to win X rounds in total
    *total odds to win for attacker
    *total odds to win for defender