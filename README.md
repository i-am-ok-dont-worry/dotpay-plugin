# Dotpay payment plugin
This plugin provides additional handling for dotpay payments.
Plugin exposes REST endpoints:
- GET /form/:orderId - get a dotpay form by orderId
- GET /status/:orderId - get a payment status by orderId

## Entry point
Entry point for plugin is a /src/index.js file. It contains a template function
for api plugin.

## Usage
- Get form
```shell script
curl -X GET "http://localhost:8080/api/vendor/dotpay/form/{{orderId}}"
```

- Get status
```shell script
curl -X GET "http://localhost:8080/api/vendor/dotpay/status/{{orderId}}"
```
