
import Transaction from '../models/Transaction.js';


export const getPieChartData = async (req, res) => {
  try {
    const { month } = req.query;

    
    const pieChartData = await Transaction.aggregate([
      {
        $match: {
          dateOfSale: { $regex: new RegExp(month, 'i') }
        }
      },
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 }
        }
      }
    ]);

    res.status(200).json(pieChartData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch pie chart data' });
  }
};
