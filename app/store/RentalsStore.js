//Rentals Store
var RentalsStore = Ext.define('Vidly.store.RentalsStore', {
    extend:'Ext.data.Store',
    alias:'store.rentals',
    storeId: 'MoviesByTransactionIdStore', 
    pageSize: 10,
    model: 'Vidly.model.RentalsModel',
    remoteFilter: true,
    proxy: {
        type: 'rest',
        url: 'http://localhost:44345/api/APIMoviesInTransaction',
        actionMethods: {
            create: 'POST',
            update: 'PUT'
        },
        api: {
            read: 'http://localhost:44345/api/APIMoviesInTransaction/GetMoviesInTransactionByID',
            update: 'http://localhost:44345/api/APIMoviesInTransaction/UpdateTransactionByRental?',
            create: 'http://localhost:44345/api/APIMoviesInTransaction/InsertTransactionByRental?',
        },
        reader: {
            type: 'json',
            rootProperty: 'data'
        },
        writer: {
            type: 'json',
            writeAllFields: true,
        }
    }
})



//Transaction store
Ext.define('Vidly.store.TransactionStore', {
    extend:'Ext.data.Store',
    alias:'store.transactions',
    storeId: 'RentalTransactionId',
    pageSize: 10,
    model: 'Vidly.model.TransactionModel',
    remoteFilter: true,
    proxy: {
        type: 'rest',
        url: 'http://localhost:44345/api/APITransaction',
        reader: {
            type: 'json',
            rootProperty: 'data'
        },
    },
    autoLoad:true,
})



//Customer store by transaction
var CustomerByTransactionStore = Ext.define('Vidly.store.CustomerByTransactionStore',{
    extend:'Ext.data.Store',
    alias:'store.customerByTransactions',
    storeId: 'NewTransactionCustomerList',
    pageSize: 10,
    model: 'Vidly.model.Customers',
    remoteFilter: true,
    proxy: {
        type: 'rest',
        url: 'http://localhost:44345/api/APICustomers',

        reader: {
            type: 'json',
            rootProperty: 'data'
        },
    },
    autoLoad:true,
})

///////
var MoviesInTransaction = Ext.define('Vidly.store.MoviesByTansactionStore',{
    extend:'Ext.data.Store',
    alias:'store.moviesByTransaction',
    storeId: 'moviesByTransactionId',
    pageSize: 10,
    model: 'Vidly.model.MoviesModel',
    remoteFilter: true,
    proxy: {
        type: 'rest',
        url: 'http://localhost:44345/api/APIMovies',

        reader: {
            type: 'json',
            rootProperty: 'data'
        },
    },
    autoLoad:true,
})


