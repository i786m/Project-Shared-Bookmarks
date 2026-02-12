# TESTING.md

# Rubric Points and how we tested them

- The website must contain a drop-down which lists five users  
  - Tested getUsers() in app.test.js
  - Tested by visually confirming dropdown contains 5 users
  - Tested by inspecting devtools and confirming Select has 5 user options

- Selecting a user must display the list of bookmarks for the relevant user  
  - Tested getSortedBookmarks function in app.test.js gets bookmarks for the user
  - Tested manually by submitting bookmark for user and visually confirming presence, and by cycling through users
  and confirming bookmarks still exist when returning to user

- If there are no bookmarks for the selected user, a message is displayed  
  - Tested in getSortedBookmarks returns empty array for no bookmarks in app.test.js
  - Tested manually by visually confirming no bookmark message is displayed for users with no bookmarks

- The list of bookmarks must be shown in reverse chronological order  
  - Tested getSortedBookmarks function in app.test.js
  - Confirm visually that displayed bookmarks are displayed newest at the top based on timestamp of the bookmarks

- Each bookmark has a title, description and created at timestamp displayed  
  - Tested in app.test.js
  - Tested by manually submitting a bookmark and visually confirming all the above are displayed in ui 
  - Tested in by inspecting in devtools to confirm bookmark holds all the above

- Each bookmark’s title is a link to the bookmark’s URL  
  - Tested in app.test.js
  - Tested manually by clicking on the link of a site with known url and was redirected to the website
  - Tested by inspecting in devtools to ensure title is anchor tag pointing to the url submitted

- Each bookmark's "Copy to clipboard" button must copy the URL
    - Tested by manually clicking the copy to clipboard button and pasting in the search bar to confirm url has been copied

- Each bookmark's like counter works independently, and persists data across sessions  
    - Tested in app.test.js
    - Tested by manually clicking on like button and visually confirming increment and persistence tby refreshing 
    and cycling through users

- The website must contain a form with inputs for a URL, a title, and a description  
    - Tested manually by confirming in dev tools that there is a form with dedicated inputs for url,description and title

- Submitting the form adds a new bookmark for the relevant user only  
    - Tested in app.test.js
    - confirmed visually by adding new boookmark and cycling through users to confirm bookmark is only added to selected user

- After creating a new bookmark, the list of bookmarks for the current user is shown  
    - Tested in app.test.js by checking for updated bookmarks
    - confirmed visually that on addition of bookmark ui is updated accordingly

- The website must score 100 for accessibility in Lighthouse
    - Tested manually by verifying 100 accessibility score using devtools across multiple views, no bookmarks, single bookmarks, multiple bookmarks 

- Unit tests must be written for at least one non-trivial function  
   - Tests written in ./__tests__/app.test.js for the following which were considered non-trivial:
        - there are 5 users
        - stored bookmark object contains correct properties and values
        - getSortedBookmarks returns only bookmarks for selected user
        - adding a bookmark for one user does not affect others
        - getSortedBookmarks returns updated list after adding bookmark
        - likes are correctly updated and persisted
        - liking one bookmark does not affect another 
        - bookmarks are sorted in reverse chronological order for display 

