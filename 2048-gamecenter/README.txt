James Bonish
Comp20 Homework 4

The only thing I can think of that wasn't implemented correctly is that
the time stamp is off, which seems to be a problem with new Date().

I got a lot of help from Emily Taintor.

I spent about 12 hours on the assignment I think.

The grid is stored as JSON in a single mongodatabase entry as well as the
score. The grid has to be stringified before passing to the web app, and the score has to be converted from a string to an int for proper sorting. They
each are entered with a corresponding username in the "score" database in
the mongodb addon of my heroku app.

The only file I needed to modify for sending the data to my app was
game_manager.js. I guess I also had to add the jquery script to index.html.
In game_manager.js, right after clearGameState() is called (~line 90), which
is when the game is finished, I added posting functionality. I first string-
ified the grid, then I called the jQuery function $.post and passed in the
username, score, and stringified grid, as well as the link to my web app.

