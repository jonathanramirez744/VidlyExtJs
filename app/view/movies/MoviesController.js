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
            store.insert(0, vm.selectedMovie);
            store.sync();
            store.load({
                callback: function () {
                    store.load();
                }
            });
        } else {
            store.sync({
                callback: function () {
                    store.load();
                }
            });

        }
        this.getView().destroy();
    },

    onEdit: function (grid, rowIndex, colIndex) {
        var selectedMovie = grid.getStore().getAt(rowIndex);
        var popWin = Ext.create('Vidly.view.movies.movieForm');
        selectedMovie.data.releaseDate = new Date(selectedMovie.data.releaseDate);
        popWin.getViewModel().set('selectedMovie', selectedMovie);
        popWin.getViewModel().set('formTitle', 'Update Movie');
        popWin.getViewModel().set('btnText', 'Update Movie');
        popWin.show();
    },
    onDelete: function (grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        var internal_id = rec.internalId;
        var store = Ext.data.StoreManager.lookup('movieStoreId');
        var record = store.getByInternalId(internal_id);
        Ext.MessageBox.confirm('Confirm', 'Are you sure you want to delete the Movie?', function (btn) {
            if (btn == 'yes') {
                store.remove(record);
                store.sync({
                    callback: function () {
                        store.load()
                    }
                });

            }
        });
    }
})