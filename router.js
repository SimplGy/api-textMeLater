var routes = {
  status: require('./routes/status'),
  send: require('./routes/send'),
  syncWithSheets: require('./routes/syncWithSheets')
};



module.exports = function(router) {
  router.get('/status', routes.status);
  router.get('/send', routes.send);
  router.get('/syncWithSheets', routes.syncWithSheets);
};


