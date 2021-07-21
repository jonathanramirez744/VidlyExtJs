Ext.define('Vidly.view.movies.Movies',{
    extend:'Ext.grid.Panel',
    xtype:'movies',
    id: 'movieGridId',
    title:'Movies Table',
    requires:[
        'Vidly.view.movies.MoviesViewModel',
        'Vidly.view.movies.MoviesController'
    ],
    controller: 'movies',
    store:{
        type:'movies'
    },
    columns:[
        {
            text: 'Movie Name', dataIndex: 'movieName', flex: 1,
            filter: {
                type: 'string'
            }
        },
        {text:'Genre',dataIndex:'iGenre.genreName',flex:1},
        {text:'Available Stocks',dataIndex:'numAvailable',flex:1},
        {text:'Rented Stocks',dataIndex:'numBorrowed',flex:1},
        {text:'Total Stocks',dataIndex:'numStocks',flex:1},
        {text:'Price',dataIndex:'moviePrice',flex:1},
        {
            xtype: 'actioncolumn',
            width: 50,
            items: [{
                iconCls: 'x-fa fa-pencil blue',
                tooltip: 'Edit',
                handler: function (grid, rowIndex, colIndex) {
                    var selectedMovie = grid.getStore().getAt(rowIndex);
                    var popWin = Ext.create('Vidly.view.movies.movieForm');
                    selectedMovie.data.releaseDate = new Date(selectedMovie.data.releaseDate);
                    popWin.getViewModel().set('selectedMovie', selectedMovie);
                    popWin.getViewModel().set('formTitle', 'Update Movie');
                    popWin.getViewModel().set('btnText', 'Update Movie');
                    popWin.show();
                }
            }, {
                iconCls: 'x-fa fa-trash red',
                tooltip: 'Delete',
                handler: function (grid, rowIndex, colIndex) {
                    var rec = grid.getStore().getAt(rowIndex);
                    var internal_id = rec.internalId;
                    var store = Ext.data.StoreManager.lookup('movieStoreId');
                    var record = store.getByInternalId(internal_id);
                    Ext.MessageBox.confirm('Confirm', 'Are you sure you want to delete the Movie?', function (btn) {
                        if (btn == 'yes') {
                            store.remove(record);
                            store.sync();
                            store.load()
                        }
                    });
                }
            }]

        }
    ],
    plugins: 'gridfilters',
    height: 600,
    bbar: {
        xtype: 'pagingtoolbar',
        store: Ext.data.StoreManager.lookup('movieStoreId'),
        displayInfo: true,
        displayMsg: 'Display records {0} - {1} of {2}',
        emptyMsg: 'No Record to display'
    },
    buttons: [
        {
            xtype: 'button',
            text: 'Add New Movie',
            handler: 'onClick'
        }
    ]
});


Ext.define('Vidly.view.movies.movieForm', {
    extend: 'Ext.window.Window',
    height: 400,
    layout: 'fit',
    width: 500,
    id:'moviesMaintenanceWindowId',
    requires:[
        'Vidly.view.movies.MoviesController'
    ],
    controller: 'movies',
    bind: {
        title: '{formTitle}',
    },
    bodyPadding: 10,
    viewModel: {
        type: 'Movie'
    },
    items: [
        {
            xtype: 'form',
            id: 'form-id-movie',
            defaultType: 'textfield',
            items: [               
                {
                    xtype: 'hiddenfield',
                    name: 'movieId',
                    bind: {
                        value: '{selectedMovie.movieId}'
                    },
                },
                {
                    fieldLabel: 'Movie Name',
                    name: 'movieName',
                    bind: {
                        value: '{selectedMovie.movieName}'
                    },
                },
                {
                    xtype: 'datefield',
                    fieldLabel: 'Release Date',
                    name: 'releaseDate',
                    bind: {
                        value: '{selectedMovie.releaseDate}'
                    },
                },
                {
                    xtype: 'combobox',
                    fieldLabel: 'Genre',
                    valueField: 'genreId',
                    displayField: 'genreName',
                    store: {
                        type:'genreStore'
                    },
                    bind: {
                        value: '{selectedMovie.genreId}'
                    },
                },
                {
                    fieldLabel: 'Movie Price',
                    name: 'moviePrice',
                    bind: {
                        value: '{selectedMovie.moviePrice}'
                    },
                },
                {
                    fieldLabel: 'Number of Stocks',
                    name: 'numStocks',
                    bind: {
                        value: '{selectedMovie.numStocks}'
                    },
                },
            ]
        }
    ],
    buttons: [
        {
            xtype: 'button',
            bind: {
                text: '{btnText}',
            },
            handler: 'onUpdate'
        }
    ]
})