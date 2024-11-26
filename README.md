# Dovetech commercetools Connector Demo

This site provides an example of how to use commercetools with the Dovetech connector.

See the [Dovetech Campaigns Connector](https://github.com/dove-technology/commercetools-campaigns-connector) for details on the connector.

**Note. This is not an example of how to build an ecommerce site with commercetools. It
provides an example of how to integrate commercetools and Dovetech using the Dovetech connector.**

Below is an example of the cart page:

![Example Cart Page](https://github.com/user-attachments/assets/16826571-4eba-4731-8766-23f1fd1a3633)

## Prerequisites

1. Dovetech [account](https://dovetech.com/starter-sign-up) and Processor API Key
2. commercetools composable commerce [account](https://commercetools.com/free-trial)
3. The Dovetech connector installed in a commercetools project
4. A commercetools API Client (admin is easiest for this demo)
5. Checkout app installed in commercetools (if you want to use the checkout)
6. Node and Yarn installed

## Running the Demo

1. Create an `.env` file based on the `.env.example` file. This requires details from your commercetools API client.
2. Run `yarn install` to install the dependencies and then `yarn dev` to start the site.

## Demo Details

### Coupon Codes

The main area of customisation is the coupon codes functionality. commercetools doesn't allow changing the provider of coupon codes so we need to store them in a custom field on the cart and update the UI to use this.

### Customers

You can simulate setting a customer on a cart by using the `/set-customer` page. Enter the email address of a customer in commercetools. This will then set the customer ID and email on the cart. You can then test out customer specific discounts (e.g. customer specific promo codes or loyalty schemes).

### Checkout

It includes the commercetools checkout.
