
# REST API user manule:

The Project is a fully functional RestAPI that has a total of 7 endpoints.This project is built on Node.Js and Express.Js.The database used is Unstructured(NoSQL) MongoDB. There are 4 models used to store and retrive the data.


## Deployment

To deploy this project run

```bash
  npm start
```


# API Reference

## Auth APIs

* ``The following APIs are followed by the local host address: http://localhost:4444``

#### Register New User:

```http
  POST /api/auth/register
```

To validate a proper request the body should have data of this format.

The user can either choose "Seller" or "Buyer" as userType.

```
{
	"username":"sathya",
    "password":"admin123",
    "type":"seller"
}
```


#### User Login:

```http
  POST /api/auth/login
```

Data format for the body field.

```
{
    "username":"sathya",
    "password":"admin123"
}
```
As a responce a AuthToken will be given for further operations.

## APIs for buyers

#### Get list of all the seller:

```
  GET /api/buyer/list-of-sellers
```
Requires AuthToken in the header for successful request.

The responce may look like this.

```
  [
    {
        "_id": "6532abe37f490356b15657cf",
        "username": "seller_1"
    },
    {
        "_id": "6532abf57f490356b15657d2",
        "username": "seller_2"
    },
    {
        "_id": "6532abfc7f490356b15657d5",
        "username": "seller_3"
    }
  ]
```
#### Get the catalog of a seller by seller_id:

```
  GET /api/buyer/seller-catalog/:seller_id
```
This endpoit requires a seller_id in the form of params path_variable.

The result may look like this.

```
  [
    {
        "_id": "6532b29460582617e2e90b9a",
        "name": "Product 1",
        "price": 50
    },
    {
        "_id": "6532b29560582617e2e90b9c",
        "name": "Product 2",
        "price": 75
    },
    {
        "_id": "6532b29560582617e2e90b9e",
        "name": "Product 3",
        "price": 60
    }
]
```
#### Send a list of items to create an order for seller with "seller_id":

This API requires a seller_id and a AuthToken for a successful request.

The data format in the body for the request look like this.

```
{
    "items": [
        {"name": "Product 1"},
        {"name": "Product 2"},
        {"name": "Product 2"}
    ]
}

```

The responce for this request is of the format.

```
{
    "message": "Order created successfully",
    "order": {
        "buyer": "6532ac157f490356b15657db",
        "seller": "6532abe37f490356b15657cf",
        "products": [
            "Product 1",
            "Product 2",
            "Product 3"
        ],
        "_id": "6532d548c9f733714153ebd5",
        "createdAt": "2023-10-20T19:30:16.083Z",
        "__v": 0
    }
}
```

## APIs for sellers

#### Send a list of items to create a catalog for a seller:

As usual this method also requires the AuthToker.The seller_user may use the following format in the body to create an unique Catalog.

```
{
    "products": [
        {
            "name": "Product 4",
            "price": 50
        },
        {
            "name": "Product 5",
            "price": 75
        },
        {
            "name": "Product 6",
            "price": 60
        }
    ]
}
```
If the seller_id is already present in the database it simply updates the data base with the given product details.

The responce for the request may look like,

```
{
    "message": "Catalog updated successfully",
    "catalog": {
        "_id": "6532b29660582617e2e90ba0",
        "seller": "6532abe37f490356b15657cf",
        "products": [
            "6532d67ec9f733714153ebd8",
            "6532d67ec9f733714153ebda",
            "6532d67ec9f733714153ebdc",
            "6532d8ae6a174feade3a732b",
            "6532d8ae6a174feade3a732d",
            "6532d8ae6a174feade3a732f"
        ],
        "__v": 2
    }
}
```
#### Retrieve the list of orders received by a seller

```
  GET /api/seller/orders
```
The User need to give AuthToken as usual.The responce may look like this.

```
{
    "availableOrders": [
        {
            "buyerId": "6532ac157f490356b15657db",
            "products": [
                "Product 1",
                "Product 2",
                "Product 3"
            ]
        },
        {
            "buyerId": "6532ac157f490356b15657db",
            "products": [
                "Product 4",
                "Product 5",
                "Product 6"
            ]
        }
    ]
}
```


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`MONGO_PASSWORD`

`JWT_SECRET`

