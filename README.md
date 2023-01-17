# To do list server

This is a simple to do list server for learning HTTP method

Run the to do server with

```js
npm install
npm start
```

It's consist of

## GET

Return all of the to do list  
GET <http://localhost:9000>

example response

```json
[
    {
        "id": 1,
        "text": "buy milk",
        "isComplete": true
    },
    {
        "id": 2,
        "text": "rent the car",
        "isComplete": false
    },
    {
        "id": 3,
        "text": "feed a dog",
        "isComplete": false
    }
]
```

## POST

Create a new to do  
Post <http://localhost:9000>  
Body

```json
{
    "text": "watch football"
}
```

## PUT

Modify to do at id  
Put <http://localhost:9000/2>  
Body

```json
{
    "id": 2,
    "text": "rent the bicycle",
    "isComplete": true
}
```

## PATCH

Modify to do at id  
Patch <http://localhost:9000/4>  
Body

```json
{
    "isComplete": true
}
```

## DELETE

Delete to do at id  
<http://localhost:9000/3>
