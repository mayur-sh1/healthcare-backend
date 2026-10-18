const notFound = (req, res) => {
  res.status(404).json({ message: `Route ${req.originalUrl} not found` });
};

const errorHandler = (err, req, res, next) => {
  console.error(err);

  if (err.name === 'SequelizeUniqueConstraintError') {
    return res.status(409).json({ message: 'Record already exists' });
  }

  if (err.name === 'SequelizeDatabaseError') {
    return res.status(400).json({ message: 'Invalid input' });
  }

  res.status(500).json({ message: 'Something went wrong' });
};

module.exports = { notFound, errorHandler };
