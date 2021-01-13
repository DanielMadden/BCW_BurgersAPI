# Boise Codeworks: Burgers API

Today we learned how to create an API that handles .get .post .put and .delete requests.

I finished it fairly quickly, so I challenged myself to develop a system in the get function that filters through the data and creates a new object off of accepted data. Then I decided to improve upon the system to make certain properties "required."

I did so with the following two objects:

```javascript
let checkData = {
        "name": [" ", true],
        "description": [" ", true],
        "ingredients": [[], false],
        "notes": [" ", false]
      }
let acceptedData = {}
```
Each property in the `checkData` object is an array. The zero index of the array is the expected type of data, and the first index sets it's requirement. I then use the new `Object.entries()` method to convert the received request body into an array of arrays of keys and values and cycle through each one:
```javascript
for (const [key, value] of Object.entries(req.body)) {
    if (checkData[key] && typeof checkData[key][0] == typeof value) {
        acceptedData[key] = value
        if (checkData[key][1]) checkData[key][1] = false
    }
}
```
If the received data contained the same key AND the value was the right type of value, then I set that property within the `acceptedData` object. This object will be what I will push to the database. Also, if the property of `checkData` was required and fulfilled, I set that true value to false.

After the for loop runs, I create an array based off of the required properties in `checkData` that were not fulfilled:
```javascript
let missesArr = Object.entries(checkData).filter(([key, [type, needed]]) => needed == true)
```
If this `missesArr` has a length that is less than one, I know that everything passed. I then send that accepted object to the database:
```javascript
if (missesArr.length < 1) {
    res.send(burgersService.create(acceptedData))
}
```
Otherwise, I'm going to tell the client what went wrong:
```javascript
let missesObj = {
        "message": "You either didn't pass a required key or passed it with improper data. The following properties show the required keys and their required form of data."
}
    missesArr.forEach(([key, [type, needed]]) => missesObj[key] = typeof type)
    res.send(missesObj)
```
And that's it! Challenging myself was my favorite part of the project. I love programming.

<br/>

| Project:  | Burgers API                     |
|-----------|-----------------------------------|
| Course:   | Boise Codeworks Fullstack Program |
| Date:     | January 11, 2021                  |
| Position: | W5_D1                     |
