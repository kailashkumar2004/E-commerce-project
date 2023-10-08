const user = require("./src/app/module/user/user.router/user.router");
const product = require("./src/app/module/product/product.router/product.router");
const order = require("./src/app/module/order/order.router/order.router");
const wish = require("./src/app/module/wish/wish.router/wish.router");

module.exports = [
    {
        path: "/api/user",
        handler: user
  },
  {
    path: "/api/product",
    handler: product
  },
  {
    path: "/api/order",
    handler: order
  },
  {
    path: "/api/wish",
    handler: wish
  },
]