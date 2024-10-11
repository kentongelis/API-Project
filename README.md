![Static Badge]https://img.shields.io/badge/build%20status-complete-green
![Static Badge]https://img.shields.io/badge/monitoring%20status-running-green

<bg>How to run the Container</bg>

First, download the Docker Desktop application here: [text](https://www.docker.com/products/docker-desktop/)

Download this repo and in the terminal for the parent directory, execute the command 'docker compose up"

This api will then be avaiable at http://localhost:4000/

<bg>API DOCUMENTATION</bg>

Welcome to the Tom Clancy's Rainbow Six Siege API.

This is a free API that can be accessed by anybody but can only be updated by those who are authenticated.

To sign up and login, use /signup and /login while submitting the JSON below

{
"username" : "(username)",
"password" : "(password)"
}

Using the /logout route logs you out

The base route for the API without dockerization is "http://localhost:3000/"

There are 4 categories in the Rainbow API

/operator, /weapon, /utility, /faction

You can get json of each category with a GET request

With each category you use as POST request to look up by name and if

/name/(name) and /id/(id)

<bg>The following routes can only be accessed by those who are authenticated</bg>

A POST request can also be used to create an operator with a JSON

For the /operator/create route, here are the fields...

{
"name" : "(name)",
"image" : "(imageUrl)",
"gadget" : "(gadget)",
"primaryWeapons" : ["(Id of the weapon)","(Id of the weapon)"],
"secondaryWeapons" : ["(Id of the weapon)", "(Id of the weapon)"],
"utility" : ["(Id of the utility)","(Id of the utility)"],
"side" : ("Attack" or "Defense"),
"org" : "(organization)",
"faction" : "(faction id)"
}

For the /weapon/craete route, here are the fields...

{
"name" : "(name)",
"image" : "(imageUrl)",
"operators" : ["(Id of the operator)","(Id of the operator)"],
"sights" : "(weapon sights)",
"damage" : "(damage)",
"rof" : "(rate of fire)"
}

For the /utility/create route, here are the fields...

{
"name" : "(name)",
"image" : "(imageUrl)",
"operator : ["(Id of the operator)","(Id of the operator)"],
"side" : ("Attack" or "Defense"),
"purpose" : "(purpose)"
}

For the /faction/create route, here are the fields...

{
"name" : "(name)",
"image" : "(imageUrl)",
"operator : ["(Id of the operator)","(Id of the operator)"]
}

For the PUT requests, this is where you update the different routes.

To update certain elements of an operator, use the operator/update/(operatorId) with the json of...

{
"name" : "(name)",
"image" : "(imageUrl)",
"gadget" : "(gadget)",
"side" : ("Attack" or "Defense"),
"org" : "(organization)",
}

To update certain elements of a weapon, use the weapon/update/(weaponId) with the json...

{
"name" : "(name)",
"image" : "(imageUrl)",
"sights" : "(weapon sights)",
"damage" : "(damage)",
"rof" : "(rate of fire)"
}

To update certain elements of a utility, use the utility/update/(utilityId) with the json...

{
"name" : "(name)",
"image" : "(imageUrl)",
"side" : ("Attack" or "Defense"),
"purpose" : "(purpose)"
}

To update ceratin elements of a faction, use the faction/update/(factionId) with the json...

{
"name" : "(name)",
"image" : "(imageUrl)",
}

With /operator/update, you can do 4 more things with a PUT request

/primaryWeapon/(operatorID)
/secondaryWeapon/(operatorID)
/utility/(operatorId)
/faction/(operatorId)

All of these routes and the next few use the json...
{
"first" : "(The id of the thing you are trying to delete)",
"second" : "(The id of the thing you are trying to add)"
}

You are able to submit a json with just one of these if you would like

The routes for /utility/update, /weapon/update/, and /faction/update all have the similar /operator/(id of element you are tryring to update) using the same JSON above.

Finnaly, a DELETE request can be used for /operator, /weapon, /utility, and /faction with the route

/delete/(id of whatever you are trying to delete)
