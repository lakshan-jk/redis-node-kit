const express = require('express');
const router = express.Router();

router.post('/set-data', async (req, res) => {
  try {
    await req.originConnection.set('exampleKey', 'exampleValue');
    console.log('Data set on master');

    res.json({ message: 'Data set on master successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/get-data', async (req, res) => {
  try {
    const result = await req.replicaConnection.get('exampleKey');
    console.log('Data from replica:', result);
    res.json({ message: 'Data retrieved from replica successfully', result });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
