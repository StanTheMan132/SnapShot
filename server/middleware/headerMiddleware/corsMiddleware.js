function corsMiddleware(){
  return (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); //  change * to domain name if neccesary
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
      res.status(200).end();
    } else {
      next();
    }
  };
}

module.exports = corsMiddleware;
