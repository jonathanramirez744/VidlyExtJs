
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
            handler: function (me, data) {
                var store = Ext.data.StoreManager.lookup('RentalTransactionId');
                store.filter('fldTranscationID', Ext.getCmp('searchfieldTransaction').getValue());
                store.filter('fldCustName', Ext.getCmp('searchfieldTransaction').getValue());
                store.load();
            }
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
        select: function (sender, record) {
            console.log(record)
            var store = Ext.data.StoreManager.lookup('MoviesByTransactionIdStore');;
            var returnPanelForm = Ext.getCmp('ReturnPanel');
            returnPanelForm.getViewModel().set('custName', record.data.fldCustName);
            returnPanelForm.getViewModel().set('fldTranscationID', record.data.fldTranscationID);
            store.filter('fldTranscationID', record.data.fldTranscationID);
            store.load();
        }
    }
});


//left Panel. Transaction Information
Ext.define('Vidly.view.rentals.moviesByTransactionsGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'moviesByTransactionsGrid',
    store: {
        type: 'rentals',
    },
    columns: [
        { text: 'Movie Name', dataIndex: 'movies.movieName', flex: 1 },
        { text: 'Date Rented', dataIndex: 'dateRented', flex: 1 },
        {
            text: 'Returned', dataIndex: 'isReturned', flex: 1,

        },

    ],
    listeners: {
        select: function (sender, record, index) {
            if (record.data.isReturned == true) {
                alert('Movie is already returned')
            } else {
                var selectedItem = sender.getStore().getAt(index)
                var popWin = Ext.create('Vidly.view.rentals.CheckoutMoviePopUp');

                //Payment computation
                var date1 = new Date()
                var date2 = new Date(record.data.dateRented);
                var diff = new Date(date1.getTime() - date2.getTime());
                var DiffinDays = diff.getUTCDate() - 1;

                var moviePrice = (DiffinDays == 0 ? 1 : DiffinDays) * record.data.movies.moviePrice
                var discountedPrice = moviePrice - (moviePrice * ((record.data.customer.custDiscount == 0 ? 1 : record.data.customer.custDiscount) / 100));


                Ext.getCmp('transaction-movieName-view-panel').setReadOnly(true);
                Ext.getCmp('transaction-moviePrice-view-panel').setReadOnly(true);
                Ext.getCmp('transaction-dateRented-view-panel').setReadOnly(true);
                Ext.getCmp('transaction-totalPrice-view-panel').setReadOnly(true);
                Ext.getCmp('transaction-custDiscount-view-panel').setReadOnly(true);
                Ext.getCmp('transaction-totalPrice-view-panel').setReadOnly(true);


                //popWin.getViewModel().set('totalPrice', discountedPrice);

                selectedItem.data.rentalPayment = discountedPrice;
                selectedItem.data.dateRented = new Date(selectedItem.data.dateRented);
                selectedItem.data.dateReturned = new Date();

                popWin.getViewModel().set('RentalRecord', selectedItem);
                popWin.show();
            }
        }
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
                    bind: {
                        value: '{RentalRecord.movies.movieName}'
                    },
                },
                {
                    fieldLabel: 'Movie Price',
                    name: 'moviePrice',
                    id: 'transaction-moviePrice-view-panel',
                    bind: {
                        value: '{RentalRecord.movies.moviePrice}'
                    },
                },
                {
                    fieldLabel: 'Discount',
                    name: 'custDiscount',
                    id: 'transaction-custDiscount-view-panel',
                    bind: {
                        value: '{RentalRecord.customer.custDiscount}'
                    },
                },
                {
                    xtype: 'datefield',
                    fieldLabel: 'Date Borrowed',
                    id: 'transaction-dateRented-view-panel',
                    name: 'dateRented',
                    bind: {
                        value: '{RentalRecord.dateRented}'
                    },
                },
                {
                    xtype: 'datefield',
                    fieldLabel: 'Date Returned',
                    name: 'dateReturned',
                    bind: {
                        value: '{RentalRecord.dateReturned}'
                    },
                },
                {
                    fieldLabel: 'Total Price',
                    name: 'totalPrice',
                    id: 'transaction-totalPrice-view-panel',
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
            handler: function (me, data) {
                var store = Ext.data.StoreManager.lookup('NewTransactionCustomerList');
                store.filter('custName', Ext.getCmp('searchfieldNewCust').getValue());
                store.load();
            }
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
        select: function (render, selected) {
            var NewTransactionId = Ext.getCmp('NewtransactionHeaderId')
            NewTransactionId.getViewModel().set('custId', selected.data.custId)
            NewTransactionId.getViewModel().set('custName', selected.data.custName)

        }
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
    requires:[
        'Vidly.view.rentals.RentalsController'
    ],
    store: {
        type:'moviesByTransaction'
    },     
    viewModel: {
        type: 'rentals'
    },
    controller:'transaction',
   
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
            handler: function () {

                var store = Ext.data.StoreManager.lookup('moviesByTransactionId');
                console.log(Ext.getCmp('newTransaction-searchfield').getValue())
                store.filter('movieName', Ext.getCmp('newTransaction-searchfield').getValue());
                store.load();
            }
        }
    ],
    height: 370,
    listeners: {
        select: 'addMoviesToCart'
    }
})

Ext.define('Vidly.view.rentals.sample',{
    extend: 'Ext.grid.Panel',
    xtype: 'sample',
    store: {
        type:'selectedMoviesTransaction'
    },
    columns: [
        { text: 'Movie Name', dataIndex: 'fldTranscationID', flex: 1 },
        { text: 'Available Stocks', dataIndex: 'custId', flex: 1 },
        { text: 'Rented Stocks', dataIndex: 'movieId', flex: 1 },
        { text: 'Total Stocks', dataIndex: 'movieName', flex: 1 }
    ],
    layout : 'fit'
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
                //display selected Movies
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
                    handler: function (grid, rowIndex, colIndex) {
                        //Delete selected list
                        var rec = grid.getStore().getAt(rowIndex);
                        Ext.MessageBox.confirm('Confirm', 'Are you sure to delete this item?', function (btn) {
                            if (btn == 'yes') {
                                var store = grid.getStore();
                                var internal_id = rec.internalId;
                                var record = store.getByInternalId(internal_id);
                                store.remove(record);
                                store.sync();
                            }
                        })
                    }
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
            handler: function () {
                //saves the selected movies
                var store = Ext.getStore('selectedMoviesTransaction');
                var storeRecord = store.getData().getRange()
                for (var x = 0; x < store.data.length; x++) {
                    var curRecord = storeRecord[x].data
                    var transactionStore = Ext.StoreManager.lookup('MoviesByTransactionIdStore');
                    transactionStore.insert(0, [{ fldTranscationID: curRecord.fldTranscationID, custId: curRecord.custId, movieId: curRecord.movieId }])

                    console.log(curRecord);
                }
                transactionStore.sync();
                transactionStore.load();

                store.load()
                //popSelectedMovies.hide();

                // NewTransactionCustomerListStore.load();
                // NewTransactionMoviesStore.load();

                //clear local Storage
                store.getProxy().clear();
                console.log(store)
            }
        },
        {
            xtype: 'button',
            text: 'Close',
            handler: function () { this.up('window').hide(); }
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
    //closable: false,
    width: 1350,
    frame: true,
    viewModel: {
        type: 'rentals'
    },
    padding: 10,
    layout: {
        type: 'hbox',
        align: 'left'
    },
    //items: ['TransactionLeftPanel', 'AddMoviesPanel'],
    items: [
         { xtype: 'TransactionLeftPanel' },
          { xtype: 'AddMoviesPanel'},
        //{ xtype:'sample'}
    ],
    bbar: [
        {
            text: 'Close',
            handler: function () { this.up('window').hide(); }
        }
    ],
});





