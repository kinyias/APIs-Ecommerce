# APIs E-Commerce ![License Badge](https://img.shields.io/badge/license-MIT-blue.svg)

## Table of Contents

-   [Introduction](#introduction)
-   [Features](#features)
-   [Technologies Used](#technologies-used)
-   [Server configuration](#server-configuration)
-   [Installation](#installation)
-   [Usage](#usage)
-   [Contributing](#contributing)
-   [License](#license)

## Introduction

APIs E-Commerce is an open-source API that allows users to browse, search, and purchase products online. This project aims to provide a fully functional e-commerce platform with essential features like product listings, shopping cart, user authentication, and secure payment processing.

## Features

-   Browse and search products by categories.
-   View product details, including price, description, and images.
-   Add products to the shopping cart.
-   View and modify the shopping cart contents.
-   Checkout and securely process payments.
-   User authentication and registration system.
-   Admin panel to manage products, categories, and orders.
-   Continue update...

## Technologies Used

-   **Back-end:**
    -   Node.js and Express.js for the server
    -   MongoDB for the database
    -   Mongoose for object modeling
    -   JSON Web Tokens (JWT) for user authentication

## Server configuration

you need :

-   [`node.js 18.17.0+`](https://nodejs.org/) (tested in v18.17.0)
-   [`mongoDB 6.0.8+`](https://www.mongodb.com/try/download) (tested in v6.0.8)

## Installation

`1. Clone the repository:`

```sh
git clone https://github.com/thaitinkhang23/APIs-Ecommerce.git
```

`2. Install dependencies:`

```sh
cd APIs-Ecommerce
npm install --force
```

`3. Create a .env file in the root directory and set the environment variables:`

-   `SECRET_KEY_JWT` = YOUR_SECRET_KEY
-   `MONGODB_URI`= MONGODB URI

## Usage

`1. Start the development server:`

```sh
npm run dev
```

`2. Open your web browser and navigate to http://localhost:3000 to access the web application.`

`3.Enjoy`

## Contributing

Contributions are welcome! If you find any bugs or want to add new features, please feel free to open an issue or submit a pull request.

1. Fork the repository.
2. Create your feature branch: git checkout -b feature/new-feature
3. Commit your changes: git commit -m 'Add some new feature'
4. Push to the branch: git push origin feature/new-feature
5. Open a pull request.

# License

This project is licensed under the [MIT License](./LICENSE). Feel free to use and modify the code as per the terms of the license.
