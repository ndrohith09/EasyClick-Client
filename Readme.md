## Magic Subscribe 
![img](https://firebasestorage.googleapis.com/v0/b/react-firechat-ae4bf.appspot.com/o/magic%20subscribe.jpg?alt=media&token=ac84e2a2-c650-4e46-bef5-bda2ef3c78ac)

### Magic Subscribe Server 

Clone this [server repo](https://github.com/Revanth2002/Square-Server) and run the following commands 
````bash
git clone https://github.com/Revanth2002/Square-Server.git
cd Square-Server
````
Change the secrets in the [settings.py](https://github.com/Revanth2002/Square-Server/blob/main/squarebackend/settings.py) file
```python 
BASE_URL =  "http://localhost:8000" # your server url
SQUARE_APP_ID= "sandbox-****-***" # your square app id
SQUARE_APP_SECRET = "***" # your square app secret
SQUARE_API_URL = "https://connect.squareupsandbox.com"
SQUARE_SANDBOX_TOKEN = "*****" # your square sandbox token

```

To run the server you need to install the requirements and run the following command
```bash
pip install -r requirements.txt
python3 manage.py runserver 0.0.0.0:8000
```

<hr />
<br />

### Magic Subscribe Client

Clone this [client repo](https://github.com/ndrohith09/MagicSubscribe-Client) and run the following commands 

````bash
git clone https://github.com/ndrohith09/MagicSubscribe-Client.git
cd MagicSubscribe-Client
````

Install the dependencies and run the following command
```bash
yarn install
 (or)
npm install
```

Change the api **baseURL** according to your server url in the [api.jsx](https://github.com/ndrohith09/MagicSubscribe-Client/blob/master/src/api/api.jsx) file
```javascript  
 baseURL : 'https://0.0.0.0:8000/api/v1/',
```
Start the client
```bash 
yarn dev
 (or)
npm run dev
```