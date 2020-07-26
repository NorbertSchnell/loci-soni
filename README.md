# Loci Soni
A sound installation for multiple mobile devices receiving live audio streams (e.g. from http://locusonus.org/) to create something like an acoustic observatory.

## Overview

The system is designed for a set-up of multiple mobile devices distributed in a room.
All mobile devices have to be connected to the Internet through a common Wi-Fi system and run a web browser.

On each device a `player` client is opened in a web browser.
The streams can be controlled (selected and started) via a dedicated web page, the `controller` client.

The available streams have to be listed in a configuration file.

## Running the System

To install the application (requires `node.js` and optionally `git`):
* check out the repository using `git` or download and unzip the code
* open a shell/terminal and change the current directory to the downloaded (unzipped) project directory
* run `npm install`

To run the application:
* run `npm run watch` in the project directory in an open a shell/terminal
* to start a `player` client, open the URL `localhost:8000` in your browser
* to start the `controller` client, open the URL `localhost:8000/controller` in your browser

To run the `player` client on your mobile device you have to connect to the same network as the server and open `<server address>:8000` in a browser on the mobile device.

The number of devices and the sound streams are configured in the setup-file `src/shared/setup.js`. Changing this configuration requires the transpilation of the source code.
