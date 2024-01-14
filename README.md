# Text File Analyser

This project contains REST APIs with to analyse text files based on input params.

## Build

Clone the repository.

Use the package manager [npm] to build.

```bash
npm i
```

## .env

Add a .env file in the root directory with following content.

```
PORT=8080
NODE_ENV=dev
```

## To start the server


Run the following command to run the server and let the db get synced.

```
npm start
```

## Requirements

Make sure node is installed.

 ### Note: 
I have added the DB configuration in the config.json file and committed it. I did it for the sake of simplicity for the evaluator to build the project and run it. [In ideal cases, we should not commit db configuration to the repo].


Limitations: Encountered string length range issue when dealing with files with size 1 GB
