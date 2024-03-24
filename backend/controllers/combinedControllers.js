// Import required modules
import express from 'express';
import axios from 'axios';


const app = express();
const PORT = process.env.PORT || 3000;


app.get('/combined-data', async (req, res) => {
  try {
    
    const statisticsUrl = 'https://s3.amazonaws.com/roxiler.com/product_transaction.json'; 
    const barChartUrl = 'https://s3.amazonaws.com/roxiler.com/product_transaction.json'; 
    const pieChartUrl = 'https://s3.amazonaws.com/roxiler.com/product_transaction.json'; 

    
    const [statisticsResponse, barChartResponse, pieChartResponse] = await Promise.all([
      axios.get(statisticsUrl),
      axios.get(barChartUrl),
      axios.get(pieChartUrl)
    ]);

    
    const combinedData = {
      statistics: statisticsResponse.data,
      barChart: barChartResponse.data,
      pieChart: pieChartResponse.data
    };

    
    res.status(200).json(combinedData);
  } catch (error) {
    
    console.error('Error fetching combined data:', error.message);
    res.status(500).json({ error: 'Failed to fetch combined data' });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
