
//Rigth Panel. Transaction List
Ext.define('Vidly.view.rentals.TransactionGrid', {
    extend: 'Ext.grid.Panel',
    title: 'Transaction',
    requires: [
        'Vidly.view.rentals.RentalsController'
    ],
    store: {
        type: 'transactions'
    },
    xtype: 'TransactionGrid',
    id: 'TransactionId',
    controller: 'transaction',
    columns: [
        {
            text: 'Transaction ID', dataIndex: 'fldTranscationID', flex: 1,
            filter: {
                type: 'string'
            }
        },
        { text: 'fldtransactionDate', dataIndex: 'fldtransactionDate', flex: 1 },
        { text: 'fldCustName', dataIndex: 'fldCustName', flex: 1 },

    ],
    plugins: 'gridfilters',
    height: 607,
    width: 600,
    frame: true,
    border: true,
    bbar: {
        xtype: 'pagingtoolbar',
        store: Ext.data.StoreManager.lookup('RentalTransactionId'),
        displayInfo: true,
        displayMsg: 'Display records {0} - {1} of {2}',
        emptyMsg: 'No Record to display'
    },
    tbar: [

        {
            xtype: 'textfield',
            id: 'searchfieldTransaction',
            emptyText: 'Search...',
            width: 200
        },
        {
            xtype: 'button',
            text: 'Search Customer',
            iconCls: 'x-fa fa-search',
            handler:'TS_filterTransaction'
        }
    ],
    buttons: [
        {
            xtype: 'button',
            text: 'New Transaction',
            handler: 'onClick'
        },

    ],
    listeners: {
        select:'TS_showTransactionInfo'
    }
});


//left Panel. Transaction Information
Ext.define('Vidly.view.rentals.moviesByTransactionsGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'moviesByTransactionsGrid',
    requires:[
        'Vidly.view.rentals.RentalsController'
    ],
    store: {
        type: 'rentals',
    },
    controller:'transaction',
    columns: [
        { text: 'Movie Name', dataIndex: 'movies.movieName', flex: 1 },
        { text: 'Date Rented', dataIndex: 'dateRented', flex: 1 },
        {
            text: 'Returned', dataIndex: 'isReturned', flex: 1,

        },

    ],
    listeners: {
        select:'TS_checkOutMovies'
    },
    plugins: 'gridfilters',
    height: 450,
    width: 600,
    bbar: {
        xtype: 'pagingtoolbar',
        store: Ext.data.StoreManager.lookup('MoviesByTransactionIdStore'),
        displayInfo: true,
        displayMsg: 'Display records {0} - {1} of {2}',
        emptyMsg: 'No Record to display'
    },

})
//popup window for Return Movie
Ext.define('Vidly.view.rentals.CheckoutMoviePopUp', {
    extend: 'Ext.window.Window',
    height: 400,
    width: 500,
    layout: 'fit',
    controller: 'transaction',
    bind: 'Return Movie',
    bodyPadding: 10,
    viewModel: {
        type: 'rentals'
    },
    items: [
        {
            xtype: 'form',
            id: 'popup-form',
            defaultType: 'textfield',
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'custId',
                    bind: {
                        value: '{RentalRecord.custId}'
                    },
                },
                {
                    xtype: 'hiddenfield',
                    name: 'rentalID',
                    bind: {
                        value: '{RentalRecord.rentalID}'
                    },
                },
                {
                    xtype: 'hiddenfield',
                    name: 'fldTranscationID',
                    bind: {
                        value: '{RentalRecord.fldTranscationID}'
                    },
                },
                {
                    fieldLabel: 'Name',
                    name: 'movieName',
                    id: 'transaction-movieName-view-panel',
                    readOnly:true,
                    bind: {
                        value: '{RentalRecord.movies.movieName}'
                    },
                },
                {
                    fieldLabel: 'Movie Price',
                    name: 'moviePrice',
                    id: 'transaction-moviePrice-view-panel',
                    readOnly:true,
                    bind: {
                        value: '{RentalRecord.movies.moviePrice}'
                    },
                },
                {
                    fieldLabel: 'Discount',
                    name: 'custDiscount',
                    id: 'transaction-custDiscount-view-panel',
                    readOnly:true,
                    bind: {
                        value: '{RentalRecord.customer.custDiscount}'
                    },
                },
                {
                    xtype: 'datefield',
                    fieldLabel: 'Date Borrowed',
                    id: 'transaction-dateRented-view-panel',
                    readOnly:true,
                    name: 'dateRented',
                    bind: {
                        value: '{RentalRecord.dateRented}'
                    },
                },
                {
                    xtype: 'datefield',
                    fieldLabel: 'Date Returned',
                    name: 'dateReturned',
                    readOnly:true,
                    bind: {
                        value: '{RentalRecord.dateReturned}'
                    },
                },
                {
                    fieldLabel: 'Total Price',
                    name: 'totalPrice',
                    id: 'transaction-totalPrice-view-panel',
                    readOnly:true,
                    bind: {
                        value: '{RentalRecord.rentalPayment}'
                    },
                },

            ],
            buttons: [
                {
                    xtype: 'button',
                    text: 'Checkout',
                    handler: 'onUpdate'
                }
            ]
        }

    ]
})








//This is for containter for transaction Information
Ext.define('Vidly.view.rentals.RentalForm', {
    extend: 'Ext.panel.Panel',
    xtype: 'ReturnPanel',
    id: 'ReturnPanel',
    layout: 'vbox',
    bodyPadding: 10,
    viewModel: {
        type: 'rentals'
    },
    style: 'margin-bottom: 5px;',
    items: [
        {
            xtype: 'form',
            id: 'form-id-return',
            defaultType: 'textfield',
            items: [
                {
                    fieldLabel: 'Transaction ID',
                    name: 'custName',
                    id: 'transaction-id-view-panel',
                    readOnly: true,
                    bind: {
                        value: '{fldTranscationID}'
                    },
                },
                {
                    fieldLabel: 'Customer Name',
                    id: 'customer-name-view-panel',
                    name: 'custName',
                    readOnly: true,
                    bind: {
                        value: '{custName}'
                    },
                },

            ],

        },

    ]
})

//Left Panel 
Ext.define('Vidly.view.rentals.ReturnPanelRigthForm', {
    extend: 'Ext.panel.Panel',
    title: 'Transaction Information',
    border: true,
    frame: true,
    xtype: 'ReturnPanelRigthForm',
    style: 'margin-left: 10px;',
    items: [
        {
            xtype: 'ReturnPanel'
        },
        {
            xtype: 'moviesByTransactionsGrid'
        }
    ]
})

Ext.define('Vidly.view.rentals.ReturnPanelMainForm', {
    extend: 'Ext.panel.Panel',
    xtype: 'ReturnPanelMainForm',
    layout: {
        type: 'hbox',
        align: 'center'
    },
    items: [
        {
            xtype: 'TransactionGrid'
        },
        {
            xtype: 'ReturnPanelRigthForm'
        }
    ]
})



////////////////////////////////New Transaction
//Select CustomerFor Transaction
//Left Panel
Ext.define('Vidly.view.rentals.NewTransactionCustomerlist', {
    extend: 'Ext.grid.Panel',
    id: 'NewTransactionCustomerlistId',
    xtype: 'NewTransactionCustomerlist',
    requires: ['*'],
    controller:'transaction',
    store: {
        type: 'customerByTransactions'
    },
    viewModel: {
        type: 'rentals'
    },
    columns: [
        { text: 'Customer Id', dataIndex: 'custId', flex: 1 },
        {
            text: 'Name', dataIndex: 'custName', flex: 1,
            filter: {
                type: 'string'
            }
        },
        { text: 'Dilingquent', dataIndex: 'isDelinquent', flex: 1 },
        { text: 'MembeshipType', dataIndex: 'iMembershipType.membershipName', flex: 1 },
    ],
    height: 450,
    width: 600,
    plugins: 'gridfilters',
    tbar: [

        {
            xtype: 'textfield',
            id: 'searchfieldNewCust',
            emptyText: 'Search...',
            width: 200
        },
        {
            xtype: 'button',
            text: 'Search Customer',
            iconCls: 'x-fa fa-search',
            handler:'TS_filterCustomer'
        }
    ],
    bbar: {
        xtype: 'pagingtoolbar',
        store: Ext.data.StoreManager.lookup('customerStore'),
        displayInfo: true,
        displayMsg: 'Display records {0} - {1} of {2}',
        emptyMsg: 'No Record to display'
    },
    listeners: {
        select:'TS_addNewCustomerinTransaction'
    }

})


//for Rigth Panel
Ext.define('Vidly.view.rentals.NewtransactionHeader', {
    extend: 'Ext.panel.Panel',
    layout: 'vbox',
    xtype: 'NewtransactionHeader',
    id: 'NewtransactionHeaderId',
    bodyPadding: 10,
    viewModel: {
        type: 'rentals'
    },
    style: 'margin-bottom: 5px;',
    items: [
        {
            xtype: 'form',
            id: 'newTransaction-form-id',
            defaultType: 'textfield',
            items: [
                {
                    fieldLabel: 'Transaction ID',
                    name: 'custName',
                    id: 'NewTransaction-id-view-panel',
                    readOnly: true,
                    bind: {
                        value: '{fldTranscationID}'
                    },
                },
                {
                    fieldLabel: 'Customer Name',
                    name: 'custName',
                    id: 'NewTransaction-custName-view-panel',
                    readOnly: true,
                    bind: {
                        value: '{custName}'
                    },
                }

            ],

        },

    ]
})

//for Rigth Panel
Ext.define('Vidly.view.rentals.NewTransactionMoviesGrid', {
    extend: 'Ext.grid.Panel',
    id: 'NewTransactionMoviesGridId',
    xtype: 'NewTransactionMoviesGridId',
    requires: [
        'Vidly.view.rentals.RentalsController'
    ],
    store: {
        type: 'moviesByTransaction'
    },
    viewModel: {
        type: 'rentals'
    },
    controller: 'transaction',

    columns: [
        { text: 'Movie Name', dataIndex: 'movieName', flex: 1 },
        { text: 'Available Stocks', dataIndex: 'numAvailable', flex: 1 },
        { text: 'Rented Stocks', dataIndex: 'numBorrowed', flex: 1 },
        { text: 'Total Stocks', dataIndex: 'numStocks', flex: 1 },
        { text: 'Price', dataIndex: 'moviePrice', flex: 1 },
    ],
    bbar: {
        xtype: 'pagingtoolbar',
        store: Ext.data.StoreManager.lookup('moviesByTransactionId'),
        displayInfo: true,
        displayMsg: 'Display records {0} - {1} of {2}',
        emptyMsg: 'No Record to display'
    },
    tbar: [
        {
            xtype: 'textfield',
            id: 'newTransaction-searchfield',
            emptyText: 'Search...',
            width: 200
        },
        {
            xtype: 'button',
            text: 'Search Movie',
            iconCls: 'x-fa fa-search',
            handler:'TS_filterMovies'
        }
    ],
    height: 370,
    listeners: {
        select: 'addMoviesToCart'
    }
})

Ext.define('Vidly.view.rentals.sample', {
    extend: 'Ext.grid.Panel',
    xtype: 'sample',
    store: {
        type: 'selectedMoviesTransaction'
    },
    columns: [
        { text: 'Movie Name', dataIndex: 'fldTranscationID', flex: 1 },
        { text: 'Available Stocks', dataIndex: 'custId', flex: 1 },
        { text: 'Rented Stocks', dataIndex: 'movieId', flex: 1 },
        { text: 'Total Stocks', dataIndex: 'movieName', flex: 1 }
    ],
    layout: 'fit'
})




Ext.define('Vidly.view.rentals.AddMoviesPanel', {
    extend: 'Ext.panel.Panel',
    id: 'AddMoviesPanelId',
    xtype: 'AddMoviesPanel',
    title: 'Add Movies',
    viewModel: {
        type: 'rentals'
    },
    width: 600,
    height: 590,
    frame: true,
    style: 'margin-left: 5px;',
    items: [
        {
            xtype: 'NewtransactionHeader'
        },
        {
            xtype: 'NewTransactionMoviesGridId'
        }
    ],
    bbar: [
        {
            xtype: 'button',
            text: 'Review Selected Movies',
            handler: function () {
                var popWin = Ext.create('Vidly.view.rentals.NewTransactionPopUp')
                popWin.show();
            }
        }
    ]
})

Ext.define('Vidly.view.rentals.SelectedMoviesList', {
    extend: 'Ext.grid.Panel',
    xtype: 'SelectedMoviesList',
    id: 'SelectedMoviesListId',
    store: 'selectedMoviesTransaction',
    controller:'transaction',
    closable: false,
    page: 10,
    viewModel: {
        type: 'rentals'
    },
    columns: [
        { text: 'Movie Name', dataIndex: 'movieName', flex: 1 },
        {
            xtype: 'actioncolumn',
            width: 50,
            items: [
                {
                    iconCls: 'x-fa fa-trash',
                    tooltip: 'Delete',
                    handler:'TS_deleteSelectedMovies'
                }
            ]
        }
    ],
    height: 300,
    width: '100%'


})

Ext.define('Vidly.view.rentals.NewTransactionPopUp', {
    extend: 'Ext.window.Window',
    title: 'Review Selected Movies',
    xtype: 'NewTransactionPopUp',
    id: 'NewTransactionPopUp',
    controller:'transaction',
    height: 400,
    width: 500,
    border: true,
    frame: true,
    padding: 10,
    layout: {
        type: 'vbox',
        align: 'left'
    },
    items: [{
        xtype: 'SelectedMoviesList'
    }],
    bbar: [
        {
            xtype: 'button',
            text: 'Checkout',
            handler:'TS_checkoutMoviesInCart'           
        },
        {
            xtype: 'button',
            text: 'Close',
            handler: function () { this.up('window').close(); }
        }
    ],

})


Ext.define('Vidly.view.rentals.TransactionLeftPanel', {
    extend: 'Ext.panel.Panel',
    title: 'Transaction Information',
    xtype: 'TransactionLeftPanel',
    border: true,
    frame: true,
    layout: 'vbox',
    items: [{
        xtype: 'NewTransactionCustomerlist'
    }],
    height: 590
})

Ext.define('Vidly.view.rentals.TransactionPopForm', {
    extend: 'Ext.window.Window',
    title: 'Movie Transaction',
    id: 'TransactionPopForm',
    height: 700,
    closable: false,
    width: 1250,
    frame: true,
    viewModel: {
        type: 'rentals'
    },
    padding: 10,
    layout: {
        type: 'hbox',
        align: 'left'
    },
    items: [
        { xtype: 'TransactionLeftPanel' },
        { xtype: 'AddMoviesPanel' },
    ],
    bbar: [
        {
            text: 'Close',
            handler: function () {
                var store = Ext.getStore('selectedMoviesTransaction');
                store.getProxy().clear();
                this.up('window').close();

            }
        }
    ],
});


//Main Window Form for Movie Rentals
Ext.define('Vidly.view.rentals.mainRentalView', {
    extend:'Ext.window.Window',
    title: 'Movie Rentals',
    xtype: 'mainRentalView',

    height: 720,
    width: 1250,
    padding: 10,
    frame: true,
    items: [
        {
            xtype:'ReturnPanelMainForm'
        },
        {
            html:'<br/>'
        },
        {
            xtype: 'button',
            text: 'close',
            handler: function () {
                this.up('window').close();
            }
        }
    ]
});


