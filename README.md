# A simple image resizing service

# Installation instructions

1) Install NodeJS for your platform.  This can be found at https://nodejs.org/
1) Install GIT for your platform.  Ensure that the environment variable is added for Windows installations.  This can be found at https://git-scm.com/
1) Open a command prompt
1) Clone this repository with the following command: `git clone https://github.com/pheonixblade9/node-image-resizer.git`
1) Navigate to the actual project directory: `cd node-image-resizer`
1) Run `npm install`
1) Run `node starter.js`
1) "Server running on port 1234" should show up in your terminal
1) Create an "images" folder with a subfolder for a given user e.g. `\node-image-resizer\images\user\
1) Add an image to this folder
1) Navigate to http://localhost:1234/images/user/image.jpeg/ to view the original image
1) Navigate to http://localhost:1234/images/user/image.jpeg/300/200/jpg/contain to test the resizing functionality
1) Valid resize options can be found under `options.fit` in the Sharp library documentation here: http://sharp.pixelplumbing.com/en/stable/api-resize/#parameters
1) Have fun!