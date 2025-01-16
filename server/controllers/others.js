const Order = require("../models/Order");
const User = require("../models/User");

exports.getStatistic = async (req, res) => {
  try {
    const clientCount = await User.countDocuments({ role: "customer" });

    const earnings = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalOrdersPrice: { $sum: "$totalPrice" }
        }
      }
    ]);

    const orderCount = await Order.countDocuments({}) || 1;

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const newOrders = await Order.aggregate([
      {
        $match: {
          status: "PENDING",
          createdAt: {
            $gte: sevenDaysAgo
          }
        }
      },
      {
        $count: "newOrdersCount"
      }
    ]);

    return res.status(200).json({
      result: {
        clients: clientCount,
        earningsOfMonth: formatNumber(Math.round((earnings[0]?.totalOrdersPrice || 0) / orderCount)) + " VND",
        newOrders: newOrders.length > 0 ? newOrders[0].newOrdersCount : 0
      },
      message: "Get statistics successfully"
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

function formatNumber(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
