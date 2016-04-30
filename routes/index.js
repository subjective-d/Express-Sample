module.exports = configRouters

function configRouters(app, container) {
  app.use('/', require('./home')(container));
  //posts
  app.use('/posts', require('./posts/index')(container));
  app.use('/posts/edit', require('./posts/edit')(container));
  //rest
  app.use('/rest/post', require('./rest/post')(container));
  app.use('/rest/posts', require('./rest/posts')(container));
}

