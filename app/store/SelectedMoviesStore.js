Ext.define('Vidly.store.selectedMoviesTransaction',{  
    extend:'Ext.data.Store',
    alias:'store.selectedMoviesTransaction',
    storeId: 'selectedMoviesTransaction',
    model:'Vidly.model.SelectedMoviesModel',
    pageSize: undefined,         
    proxy: {
        type: 'localstorage',
        id:'items'
    }
})