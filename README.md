# client

## Project setup
You need to install dependencies separately for the server and client side. To install, execute the following code snippets:
### Installation
#### Windows (Powershell)
```
cd server; npm install; cd ..\client; npm install; cd ..
```

#### Linux
```
cd server && npm install && cd ../client && npm install && cd ..
```

### Store API keys
All API Keys should be stored in `server/apiKeys.env` in the format 
```
API_KEY=1234
ACCOMODATION_KEY=1234
BOOKING_KEY=1234
MONGODB_USER='username'
MONGODB_PASSWORD='password'
```
whereas `1234` is your API key for the specified API.

### Start Server App
```
npm run server
```

### Start Client App
```
npm run client
```