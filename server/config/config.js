module.exports = {
    port: '5432',
    db:{
        database: 'dcmfh2o15unikr',
        user: 'mmxcxsfnpnucsz',
        password: 'ccdba59bddd30de77136258f309ba0c3d19956125948112da4711491c6666471',
        options: {
            dialect: 'postgres',
            ssl: true,
            dialectOptions: {
                ssl: {
                    require: true,
                }
            },
        },
        host: 'ec2-54-197-254-189.compute-1.amazonaws.com',
        operatorsAliases: false,
    }
};