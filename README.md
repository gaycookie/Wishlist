# Wishlist

## Product object with types
If you want to see a full example of a list of products, you can check out [example.json](example.json).

```coffee
{
  "name": String,
  "price": String,
  "store": String,
  "timestamp": Date,
  "image": String,
  "link": String,
  "manufacturer": String
}
```
> `timestamp` is a Date object that is automatically created when the product is added to the list.  
> For more information please visit the [Javascript Date object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) documentation.

> `price` is kept as a string to allow for different currencies (wip) and decimal places