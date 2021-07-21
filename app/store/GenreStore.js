Ext.define('MyApp.store.GenreStore', {
    extend: 'Ext.data.Store',
    alias: 'store.genreStore',
    storeId: 'GenreListId',
    model: 'Vidly.model.GenreModel',
    proxy: {
        type: 'rest',
        url: 'http://localhost:44345/api/APIGenre',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    },
    autoLoad: true
})