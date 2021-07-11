Ext.define('Vidly.store.Customers',{
    extend:'Ext.data.Store',
    alias:'store.customers',
    model:'Vidly.model.Customers',
    pageSize:2,
    proxy:{
        type:'rest',
        url:'http://localhost:44324/api/APICustomers',   
        reader:{
            type:'json',
            rootProperty: 'data'
        }     
    },
    autoLoad:true
}) 