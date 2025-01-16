const User = require("../models/User");
const Order = require("../models/Order");
const Product = require("../models/Product");
const mongoose = require("mongoose");
const { sendEmail } = require("../utils/mailHelper");

exports.checkOut = async (req, res) => {
  try {
    const userId = req.params.id;
    const billingDetails = {
      ...req.body.billingDetails,
      phoneNumber: req.body.billingDetails.phone
    };
    for (const billing of Object.entries(billingDetails)) {
      if (billing[1].toString() === "") {
        return res.status(400).json({ message: "Missing billing details" });
      }
    }

    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(404).json({ message: "User does not exist" });
    }

    if (user.cart.length === 0) {
      return res.status(404).json({ message: "Cart not contain any item" });
    }
    const productObjectIds = [];
    const newOrder = new Order({
      user: user._id,
      products: user.cart.map(i => {
        productObjectIds.push(new mongoose.Types.ObjectId(i._id));
        return {
          _id: i._id,
          price: i.price,
          quantity: i.quantity
        };
      }),
      totalPrice: user.cart.reduce((acc, curr) => acc + curr.quantity * curr.price, 0),
      billingDetails: billingDetails
    });

    const products = await Product.find({
      _id: { $in: productObjectIds }
    }).select("_id img1 name price");

    for (const product of products) {
      const productInCart = user.cart.find(cartItem => cartItem._id.toString() === product._id.toString());
      if (productInCart) {
        await Product.updateOne(
          { _id: product._id },
          { $inc: { stock: -productInCart.quantity } }
        );
      }
    }

    const itemRowHtml = products.map(product => {
      const cartItem = user.cart.find(c => c._id.toString() === product._id.toString());
      return `<tr style="border-bottom: 1px solid #ddd;">
                <td style="padding: 8px; text-align: left;">${product.name}</td>
                <td style="padding: 8px; text-align: center;"><img src="${product.img1}" alt="${product.name}" style="width: 50px; height: auto;"/></td>
                <td style="padding: 8px; text-align: right;">${formatNumber(product.price)} VND</td>
                <td style="padding: 8px; text-align: center;">${cartItem.quantity || 0}</td>
                <td style="padding: 8px; text-align: right;">${formatNumber((cartItem.quantity || 0) * product.price)} VND</td>
              </tr>`;
    });

    const result = await newOrder.save();
    user.cart = [];
    await user.save();

    const html = `
                <h1 style="font-size: 24px; color: #333;">Hello ${user.fullName}</h1>
                <p style="font-size: 16px; color: #666;">Phone: ${newOrder.billingDetails.phoneNumber}</p>
                <p style="font-size: 16px; color: #666;">Address: ${newOrder.billingDetails.address}</p>
                <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
                  <thead>
                    <tr>
                      <th style="padding: 8px; text-align: left; border-bottom: 2px solid #000;">Product Name</th>
                      <th style="padding: 8px; text-align: center; border-bottom: 2px solid #000;">Image</th>
                      <th style="padding: 8px; text-align: right; border-bottom: 2px solid #000;">Price</th>
                      <th style="padding: 8px; text-align: center; border-bottom: 2px solid #000;">Quantity</th>
                      <th style="padding: 8px; text-align: right; border-bottom: 2px solid #000;">Subprice</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${itemRowHtml.join("")}
                  </tbody>
                </table>
               <h3 style="font-size: 24px; color: #666;">Total Price:<h3>
               <p style="font-size: 24px; color: #666;">Phone: ${formatNumber(newOrder.totalPrice)} VND</p>
               <br/>
               <p style="font-size: 24px; color: #666;">Thank you</p>
              `;

    await sendEmail(user.email, "Inform Order", "Something text", html);

    return res.status(200).json();
  } catch (error) {
    return res.status(500).json({ error });
  }
};

exports.getOrdersByUser = async (req, res) => {
  try {
    const id = req.params.id;
    const isExist = await User.exists({ _id: id });
    if (!isExist) {
      return res.status(404).json({ message: "User not exists" });
    }
    const orders = await Order.find({ user: id });
    return res.status(200).json(orders);
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.getOrder = async (req, res) => {
  try {
    const id = req.params.id;
    const order = await Order.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(id)
        }
      },
      {
        $lookup: {
          from: "products",
          let: { productIds: "$products" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $in: ["$_id", { $map: { input: "$$productIds", as: "p", in: "$$p._id" } }]
                }
              }
            },
            {
              $addFields: {
                quantity: {
                  $let: {
                    vars: {
                      matchedProduct: {
                        $arrayElemAt: [
                          {
                            $filter: {
                              input: "$$productIds",
                              as: "p",
                              cond: { $eq: ["$$p._id", "$_id"] }
                            }
                          },
                          0
                        ]
                      }
                    },
                    in: "$$matchedProduct.quantity"
                  }
                }
              }
            }
          ],
          as: "products"
        }
      },
      {
        $project: {
          "products.category": 0,
          "products.img2": 0,
          "products.img3": 0,
          "products.img4": 0,
          "products.long_desc": 0,
          "products.short_desc": 0
        }
      }
    ]);

    return res.status(200).json(order[0]);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

exports.getOrders = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 7;
  const skip = (page - 1) * limit;
  const totalCount = await Order.countDocuments();

  const orders = await Order.find().skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 }).populate("user");
  return res.status(200).json({
    result: orders,
    totalCount
  });
};

function formatNumber(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}