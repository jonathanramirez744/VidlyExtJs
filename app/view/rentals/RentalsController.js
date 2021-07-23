

Ext.define('Vidly.view.rentals.RentalsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.transaction',
    init: function () {
        //initialize store

        //Load store for movies in new transaction page
        var TransactionMoviesStore = Ext.data.StoreManager.lookup('moviesByTransactionId');
        if (TransactionMoviesStore != undefined) {
            TransactionMoviesStore.load();
        }
    },
    onClick: function () {

        //Generate Transaction Id
        var mydate = new Date;
        var randNun = Math.floor((Math.random() * 99999) + 10000);
        var TransactionID = "TID" + randNun + mydate.getFullYear() + mydate.getDay() + mydate.getHours() + mydate.getSeconds() + mydate.getMilliseconds()

        var popWin1 = Ext.create('Vidly.view.rentals.TransactionPopForm');
        popWin1.show();
        var NewTransactionId = Ext.getCmp('NewtransactionHeaderId')
        NewTransactionId.getViewModel().set('fldTranscationID', TransactionID);


    },
    onUpdate: function () {
        this.getViewModel().set('RentalRecord.isReturned', true);
        var store = Ext.data.StoreManager.lookup('MoviesByTransactionIdStore');
        store.sync({
            callback: function () {
                store.load();
            }
        });
        this.getView().close();
    },

    addMoviesToCart: function (sender, reader) {
        var NewTransactionId = Ext.getCmp('NewtransactionHeaderId')
        var store = Ext.getStore('selectedMoviesTransaction')
        var CustId = NewTransactionId.getViewModel().data.custId
        if (CustId == '') {
            Ext.MessageBox.alert('Please select a customer first');
        } else {
            Ext.MessageBox.confirm('Confirm', 'Add ' + reader.data.movieName + ' to movie list?', function (btn) {
                if (btn == 'yes') {
                    var TransactionId = NewTransactionId.getViewModel().data.fldTranscationID
                    var CustId = NewTransactionId.getViewModel().data.custId
                    var newTransaction = {
                        fldTranscationID: TransactionId,
                        custId: CustId,
                        movieId: reader.data.movieId,
                        movieName: reader.data.movieName
                    }
                    //store.add({ fldTranscationID: TransactionId, custId: CustId, movieId: reader.data.movieId, movieName: reader.data.movieName })
                    store.add(newTransaction)
                    store.sync({
                        callback: function () {
                            store.load()
                        }
                    })
                }
            })
        }
    },


    //Filter transactions
    TS_filterTransaction: function () {
        var store = Ext.data.StoreManager.lookup('RentalTransactionId');
        store.filter('fldTranscationID', Ext.getCmp('searchfieldTransaction').getValue());
        store.filter('fldCustName', Ext.getCmp('searchfieldTransaction').getValue());
        store.load();
    },

    //Add the transaction information when transaction was clicked
    TS_showTransactionInfo: function (sender, record) {
        var store = Ext.data.StoreManager.lookup('MoviesByTransactionIdStore');;
        var returnPanelForm = Ext.getCmp('ReturnPanel');
        returnPanelForm.getViewModel().set('custName', record.data.fldCustName);
        returnPanelForm.getViewModel().set('fldTranscationID', record.data.fldTranscationID);
        store.filter('fldTranscationID', record.data.fldTranscationID);
        store.load();
    },

    //Display Checkout form for Movies in Rentals
    TS_checkOutMovies: function (sender, record, index) {
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

            selectedItem.data.rentalPayment = discountedPrice;
            selectedItem.data.dateRented = new Date(selectedItem.data.dateRented);
            selectedItem.data.dateReturned = new Date();

            popWin.getViewModel().set('RentalRecord', selectedItem);
            popWin.show();
        }
    },


    //filter customer name in New transaction
    TS_filterCustomer: function () {
        var store = Ext.data.StoreManager.lookup('NewTransactionCustomerList');
        store.filter('custName', Ext.getCmp('searchfieldNewCust').getValue());
        store.load();
    },

    //bind selected customer to the new transaction\
    TS_addNewCustomerinTransaction: function (render, selected) {
        var NewTransactionId = Ext.getCmp('NewtransactionHeaderId')
        NewTransactionId.getViewModel().set('custId', selected.data.custId)
        NewTransactionId.getViewModel().set('custName', selected.data.custName)
    },


    //filter Movies in new transaction page
    TS_filterMovies: function () {
        var store = Ext.data.StoreManager.lookup('moviesByTransactionId');
        store.filter('movieName', Ext.getCmp('newTransaction-searchfield').getValue());
        store.load();
    },

    //Delete selected movies in cart
    TS_deleteSelectedMovies: function (grid, rowIndex, colIndex) {
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
    },

    //CheckoutMovies from cart
    TS_checkoutMoviesInCart: function () {
        var store = Ext.getStore('selectedMoviesTransaction');
        var storeRecord = store.getData().getRange()
        for (var x = 0; x < store.data.length; x++) {
            var curRecord = storeRecord[x].data
            var transactionStore = Ext.StoreManager.lookup('MoviesByTransactionIdStore');
            transactionStore.insert(0, [{ fldTranscationID: curRecord.fldTranscationID, custId: curRecord.custId, movieId: curRecord.movieId }])
        }
        transactionStore.sync({
            callback: function () {
                transactionStore.load();
            }
        });

        store.load()
        store.getProxy().clear();
        this.getView().close();
    }
})