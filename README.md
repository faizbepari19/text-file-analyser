# Text File Analyser

This project contains REST APIs to analyse text files based on input params.

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


## API endpoints

POST - /api/file/upload
```
    Body
    'file'
    Response 
    Status Code: 201
    {
        "message": "File uploaded successfully.",
        "fileId": 14
    }
```

POST - /api/task/start
```
    Body
    {
        "file_id": 14,
        "operation_type": 3,
        "top_k": 3
    }
    Response 
    Status Code: 201
    {
        "message": "Analysis initiated",
        "taskId": 5
    }
```

GET - /api/task/retrieve/:task_id
```
    Response 
    Status Code: 200
    {
        "message": "Task details",
        "taskId": "5",
        "operationType": "Total unique words",
        "result": "850149",
        "status": 1
    }
```

 ### Note: 
I have added the DB configuration in the config.json file and committed it. I did it for the sake of simplicity for the evaluator to build the project and run it. [In ideal cases, we should not commit db configuration to the repo].

System can be used to deal with 1 GB files.

`status` in retrieve task API means `0 - pending`, `1 - completed`, `2 - error`
`operation_type` in start analysis API means `1 - countWords`, `2 - countUniqueWords`, `3 - findTopKWords`
