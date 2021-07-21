Ext.define('Vidly.store.Customers',{
    extend:'Ext.data.Store',
    alias:'store.customers',
    storeId: 'customerStoreID',
    model:'Vidly.model.Customers',
    remoteFilter: true,
    pageSize:10,
    proxy: {
        type: 'rest',
        url: 'http://localhost:44345/api/APICustomers',
        actionMethods: {
            create: 'POST',
            update: 'PUT',
            destroy: 'DELETE'
        },
        api:
        {
            read: 'http://localhost:44345/api/APICustomers/GetCustomers',
            create: 'http://localhost:44345/api/APICustomers/CreateCustomer?',
            update: 'http://localhost:44345/api/APICustomers/UpdateCustomer?',
            destroy: 'http://localhost:44345/api/APICustomers/DeleteCustomers?'
        },
        reader: {
            type: 'json',
            rootProperty: 'data'
        },
        writer: {
            type: 'json',
            writeAllFields: true,
        }
    },
    autoLoad:true
}) 