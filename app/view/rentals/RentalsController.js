

Ext.define('Vidly.view.rentals.RentalsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.transaction',
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
        this.getView().destroy();
    },

    addMoviesToCart: function (sender, reader) {
        var NewTransactionId = Ext.getCmp('NewtransactionHeaderId')
        //var store =  Ext.getStore('selectedMoviesTransaction');
        var store = Ext.getStore('selectedMoviesTransaction')
        var CustId = NewTransactionId.getViewModel().data.custId
        if (CustId == '') {
            Ext.MessageBox.alert('Please select a customer first');
        } else {
            Ext.MessageBox.confirm('Confirm', 'Add ' + reader.data.movieName + ' to movie list?', function (btn) {
                if (btn == 'yes') {
                    
                    console.log(store)
                    var TransactionId = NewTransactionId.getViewModel().data.fldTranscationID
                    var CustId = NewTransactionId.getViewModel().data.custId
                    store.add({ fldTranscationID: TransactionId, custId: CustId, movieId: reader.data.movieId, movieName: reader.data.movieName })
                    console.log(store)
                    store.sync()
                    store.load()
                    console.log(store)
                }
            })
        }
    }

})