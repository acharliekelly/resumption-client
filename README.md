[![General Assembly Logo](https://camo.githubusercontent.com/1a91b05b8f4d44b5bbfb83abac2b0996d8e26c92/687474703a2f2f692e696d6775722e636f6d2f6b6538555354712e706e67)](https://generalassemb.ly/education/web-development-immersive)


# Resumption - Full-Stack Online Resume App (Modified for MVP Completion)

Links:
* [GitHub API](https://github.com/acharliekelly/resumption-api)
* [GitHub Client](https://github.com/acharliekelly/resumption-client)
* [Deployed API](https://boiling-hollows-87968.herokuapp.com/)
* [Deployed Client](https://acharliekelly.github.io/resumption-client)


This is the front-end of my Online Resume App.

A couple of things I'm happy about on the client:
* One nice feature of the modal forms (which I otherwise copied from Tic-Tac-Toe), is an added a keydown event handler. Since Bootstrap puts its modal submit buttons outside of its modal forms, pressing return doesn't automatically do anything. However, all my authentication forms respond to Enter (submit) and Escape (close)
* When you're viewing a resource, I put a copy into my `store` hash. That way, you can edit it any time without making a new request - it just loads the current values into the edit resource form
* This also means avoiding the problem a lot of students had, in which you have to fill in all the fields or else overwrite them with empty strings. All fields are filled (via jQuery) from the stored values. The only way you overwrite them is if you edit the fields and then submit the form.
* I got the layout to stop resizing the panel (and therefore pushing everything down) whenever user feedback appears. I really hate that.


## User Stories

As a user, I want to be able to:
1. Create a resume, in plain text
2. Save that resume
3. Come back later and edit my resume
4. Possibly delete that resume and start over
5. That's it. There is nothing else I want to be able to do with my resume at this time.

## Wireframes

Will create wireframes for the following views:
1. Initial/Logged-out screen [Default](p2-wireframes/wireframe_default.png)
2. Signup form [Sign Up](p2-wireframes/wireframe_signup.png)
3. Login form [Log In](p2-wireframes/wireframe_login2.png)
4. Logged-in Dashboard view: [Logged In](p2-wireframes/wireframe_logged_in.png)
  1. List your resumes [Resource List](p2-wireframes/wireframe_resources-list.png)
  2. Show an  existing resume [View Resource](p2-wireframes/wireframe_show.png)
  3. Create new resume [Create New](p2-wireframes/wireframe_new.png)

For more information about this app, please see the [README for the API](https://github.com/acharliekelly/resumption-api/blob/master/README.md).
