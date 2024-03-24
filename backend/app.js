

import express from 'express';
import barChartRoutes from './routes/barChartRoutes.js';
import statisticsRoutes from './routes/statisticsRoutes.js';
import pieChartRoutes from './routes/pieChartRoutes.js';
import combinedDataRoutes from './routes/combinedDataRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());

// Routes
app.use('/statistics', statisticsRoutes);
app.use('/bar-chart', barChartRoutes);
app.use('/pie-chart', pieChartRoutes);
app.use('/combined-data', combinedDataRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
