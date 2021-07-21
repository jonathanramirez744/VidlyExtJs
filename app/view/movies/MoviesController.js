Ext.define('Vidly.view.movies.MoviesController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.movies',
    count: 0,
    onClick: function (args1, args2) {
        var popWin = Ext.create('Vidly.view.movies.movieForm');
        popWin.getViewModel().set('formTitle', 'Add Movie');
        popWin.getViewModel().set('btnText', 'Add Movie');
        popWin.show();
    },

    onUpdate: function () {            
        var store = Ext.StoreManager.lookup('movieStoreId');
        var vm = this.getViewModel().data;

        if (vm.selectedMovie.movieId == undefined) {
            store.insert(0,vm.selectedMovie );
            store.sync();
            store.load({
                callback: function(){
                    store.load();
                }
            });
        } else {           
            store.sync({
                callback: function(){
                    store.load();
                }
            });
            
        }
        this.getView().destroy();
    }
})