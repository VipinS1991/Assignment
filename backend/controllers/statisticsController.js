

import Transaction from '../models/Transaction.js';


export const getStatistics = async (req, res) => {
  try {
    const { month } = req.query;

    
    const totalSaleAmount = await Transaction.aggregate([
      {
        $match: {
          dateOfSale: { $regex: new RegExp(month, 'i') }
        }
      },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$price" }
        }
      }
    ]);

    
    const totalSoldItems = await Transaction.countDocuments({
      dateOfSale: { $regex: new RegExp(month, 'i') }
    });

    
    const totalNotSoldItems = await Transaction.countDocuments({
      dateOfSale: { $regex: new RegExp(month, 'i') },
      price: { $exists: true, $ne: null, $ne: 0 }
    });

    res.status(200).json({
      totalSaleAmount: totalSaleAmount.length ? totalSaleAmount[0].totalAmount : 0,
      totalSoldItems,
      totalNotSoldItems
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch statistics' });
  }
};
