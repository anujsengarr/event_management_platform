const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const registrations = [];
const logPath = path.join(__dirname, 'log.txt');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'frontend')));

app.post('/register', (req, res) => {
  const { name, email, eventName } = req.body;
  if (!name || !email) {
    return res.status(400).json({ success: false, message: 'Name and email are required.' });
  }

  const registration = {
    id: Date.now(),
    name: name.trim(),
    email: email.trim(),
    eventName: eventName ? eventName.trim() : 'Unknown Event',
    registeredAt: new Date().toISOString(),
  };

  registrations.push(registration);
  console.log('New registration:', registration);

  const logLine = `${registration.registeredAt} | ${registration.name} | ${registration.email} | ${registration.eventName}\n`;
  fs.appendFile(logPath, logLine, (err) => {
    if (err) {
      console.error('Failed to write registration log:', err);
    }
  });

  return res.json({
    success: true,
    message: 'Registration done',
    name: registration.name,
    eventName: registration.eventName,
  });
});

const pages = ['homepage', 'dashboard', 'clubs', 'calendar', 'venues'];
pages.forEach((page) => {
  app.get(`/${page}`, (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', `${page}.html`));
  });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'homepage.html'));
});

app.get('/api/registrations', (req, res) => {
  res.json({ success: true, registrations });
});

app.use((req, res) => {
  res.redirect('/');
});

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
