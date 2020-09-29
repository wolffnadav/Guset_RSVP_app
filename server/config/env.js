//todo insert your db name, user ans psw
const db = 'example_db_name'
    , db_port = '27017', db_user = 'example_user', db_password = 'example_psw' // localhost
    , db_host = '127.0.0.1'
    , process_port = '8080'
    , sub_domain = ''
    , domain = sub_domain + 'example.com'//todo insert your domain
    , host = 'http://' + domain + '/'
;

const config = module.exports = {};

function getOptionsWithName(dbName) {
    return {
        dbName: dbName,
        config: {autoIndex: false},
        socketTimeoutMS: 120000,
        connectTimeoutMS: 120000,
        reconnectTries: 30,
        authSource: 'admin',
        useNewUrlParser: true
    }
}

config.database = {
    user: db_user,
    password: db_password,
    db_host: db_host,
    db_port: db_port,
    url: `mongodb://${db_user}:${encodeURIComponent(db_password)}@${db_host}:${db_port}/`, // deafult prod
    name: db,
    options: getOptionsWithName(db)
};

config.process = {
    port: process_port
};

//todo create bitly account and insert your bitly Authorization
config.bitly = 'Bearer example123';

//todo create amazon sns account and insert your valid aws sns accessKeyId and secretAccessKey and choose correct region
config.accessKeyId = '123456';
config.secretAccessKey = '123456';
config.region = 'eu-west-1';

//todo create SENDGRID_API_KEY account and get SENDGRID_API_KEY for getting emails
config.SENDGRID_API_KEY = '123456';

//todo insert your email and name for getting emails when error or success
config.email = 'example@gmail.com';
config.name = 'example';


config.constants = {
    host: host,
    domain: domain,
    sub_domain: sub_domain,

    amazon_privacy: 'public-read',
    type: "fmcg",
    campaign: "home",
    data_set_id: "cspace",

};


//todo configure your aws account and insert your aww credentials
config.aws = {
    amazon_access_id: '123456',
    amazon_access_secret: '123456',
    region: 'eu-west-1',
    reko: {
        arnRole: '123',
        amazon_access_id: '123',
        amazon_access_secret: 'wT/123',
    }
};
