const express = require('express');
const fs = require('fs');
const cors = require('cors');

const readLastLines = require('read-last-lines');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors())
let temperatureValue = { temperature: 25, humidity: 25 };

const getDate = () => {
  const date = new Date();
  return '[' + date.toLocaleString() + ']' + ' ';
};

app.get('/', (_, res) => {
  console.log('Server was hit');
  res.json({ msg: 'Hello World!' });
});


app.put('/api/motionSensor', async (_, res) => {
  try {
    fs.appendFile(
      './logs/motion.log',
      '\n' + getDate() + 'Motion detected!',
      (err) => {
        if (err) throw err;
      }
    );

    res.status(200).send(getDate())
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error!' });
  }
});

app.put('/api/flameSensor', async (_, res) => {
  try {
    fs.appendFile(
      './logs/flame.log',
      '\n' + getDate() + 'Flame detected!',
      (err) => {
        if (err) throw err;
      }
    );
    res.status(200).send(getDate());
  } catch (err) {
    res.status(500).json({ error: 'Server error!' });
  }
});

app.put('/api/temperature', async (req, res) => {
  try {
    const { temperature, humidity } = req.body;
    if (!temperature || !humidity) throw 'Error'
    temperatureValue = { temperature, humidity };
    res.status(200).json(temperatureValue);
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }

});

app.get('/api/all', async (_, res) => {
  try {
    const flameLog = await readLastLines.read('./logs/flame.log', 50);
    const motionLog = await readLastLines.read('./logs/motion.log', 50);
    res
      .status(200)
      .send({
        flameLog: flameLog.split('\n').reverse().join('\n'),// Send back a reversed log
        motionLog: motionLog.split('\n').reverse().join('\n'),// Send back a reversed log
        temperature: temperatureValue.temperature,
        humidity: temperatureValue.humidity
      })
  } catch (err) {
    console.error(err)
    res.status(500).json({ erorr: 'Server error' })
  }

});

app.listen(PORT, () => {
  console.log(`Server is listening at port ${PORT}`);
});
