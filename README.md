# A simple image resizing service

# Installation instructions

1) Install NodeJS for your platform.  This can be found at https://nodejs.org/
1) Install GIT for your platform.  Ensure that the environment variable is added for Windows installations.  This can be found at https://git-scm.com/
1) Open a command prompt
1) Clone this repository with the following command: `git clone https://github.com/pheonixblade9/node-image-resizer.git`
1) Navigate to the actual project directory: `cd node-image-resizer`
1) Run `npm install`
1) Run `node server.js`
1) "Server running on port 1234" should show up in your terminal
1) Navigate to http://localhost:1234/images/user/sample.jpeg/ to view the original image
1) Navigate to http://localhost:1234/images/user/sample.jpeg/300/200/jpg/contain to test the resizing functionality
1) Valid resize options can be found under `options.fit` in the Sharp library documentation here: http://sharp.pixelplumbing.com/en/stable/api-resize/#parameters
1) To add more images, just save the images to the `/images/` folder under whatever user is desired
1) Have fun!
