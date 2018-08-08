function handleError() {
  return (error, req, res, next) => {
    //  for now just console log the error and return a server error
    //  needs more planning on what to do
    console.log(error);
    const status = error.status || 500;
    const resMessage = error.resMessage || 'Error proccessing the request';
    return res.status(status).json({
      status,
      message: resMessage,
    });
  };
}

module.exports = handleError;
