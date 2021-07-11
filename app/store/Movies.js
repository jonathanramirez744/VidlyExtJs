Ext.define('MyApp.store.Movies',{
    extend:'Ext.data.Store',
    alias:'store.movies',
    //model:'MyApp.model.Movies',
    pageSize:10,
    proxy:{
        type:'rest',
        url:'http://localhost:44324/api/APImovies',   
        reader:{
            type:'json',
            rootProperty: 'data'
        }     
    },
    autoLoad:true
}) 