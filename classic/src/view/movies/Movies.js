Ext.define('Vidly.view.movies.Movies',{
    extend:'Ext.grid.Panel',
    xtype:'moviesGrid',
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
                iconCls: 'x-fa fa-trash blue',
                tooltip: 'Edit',
                handler: 'onEdit',
            }, {
                iconCls: 'x-fa fa-trash red',
                tooltip: 'Delete',
                handler: 'onDelete'              
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


//popUp Window for Movies
Ext.define('Vidly.view.movies.PopUpMovieForm', {
    extend:'Ext.window.Window',
    title: 'Movie Maintenance',
    height: 720,
    width: 1250,
    frame: true,
    padding: 10,
    items: [
        {
            xtype:'moviesGrid'
        },
        {
            html: '<br/>'
        },
        {
            xtype: 'button',
            text: 'close',
            
        }]
});

// var popUp = Ext.create('Vidly.view.movies.PopUpMovieForm')
// popUp.show();