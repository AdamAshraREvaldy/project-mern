const notFound = (req, res) => {
    res.status(404).send({ msg: 'Route does not exists' });
};

module.exports = notFound;