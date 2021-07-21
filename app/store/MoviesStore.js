Ext.define('MyApp.store.MoviesStore',{
    extend:'Ext.data.Store',   
    storeId: 'movieStoreId',
    alias:'store.movies',
    pageSize: 10,
    model: 'Vidly.model.MoviesModel',
    remoteFilter: true,
    proxy: {
        type: 'rest',
        url: 'http://localhost:44345/api/APIMovies',
        actionMethods: {
            create: 'POST',
            update: 'PUT',
            destroy: 'DELETE'
        },
        api:
        {
            read: 'http://localhost:44345/api/APIMovies/GetMovies',
            create: 'http://localhost:44345/api/APIMovies/CreateMovie?',
            update: 'http://localhost:44345/api/APIMovies/UpdateMovie?',
            destroy: 'http://localhost:44345/api/APIMovies/DeleteMovie?'
        },
        reader: {
            type: 'json',
            rootProperty: 'data'
        },
        writer: {
            type: 'json',
            writeAllFields: true,
        },
    },
    autoLoad:true
}) 