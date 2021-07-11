Ext.define('MyApp.store.Rentals',{
    extend:'Ext.data.Store',
    alias:'store.rentals',
    model:'Vidly.model.Rentals',
    pageSize:10,
    proxy:{
        type:'rest',
        url:'http://localhost:44324/api/APITransaction',   
        reader:{
            type:'json',
            rootProperty: 'data'
        }     
    },
    autoLoad:true
}) 