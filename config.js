var config = {};
config.port = process.env.OPENSHIFT_NODEJS_PORT || '3000';
config.ip = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
config.mongodb = process.env.OPENSHIFT_MONGODB_DB_HOST || '';
config.mongodbPort = process.env.OPENSHIFT_MONGODB_DB_PORT || '';
config.mongoUser = process.env.OPENSHIFT_MONGODB_DB_USERNAME || '';
config.mongoPassword = process.env.OPENSHIFT_MONGODB_DB_PASSWORD || '';
config.mongoConnectionUrl = process.env.OPENSHIFT_MONGODB_DB_URL || 'mongodb://127.0.0.1:27017/'
config.pageDatabase = process.env.OPENSHIFT_PAGE_DATABASE || '';
config.stage = 'dev';

module.exports = config;
