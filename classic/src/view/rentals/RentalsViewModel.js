Ext.define('Vidly.view.rentals.RentalsViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.rentals',
    data: {
        fldTranscationID: '',
        rentalID: '',
        custId: '',
        movieId: '',
        isReturned: '',
        dateRented: '',
        dateReturned: '',
        custName: '',
        isDelinquent: '',
        custDiscount: '',
        movieName: '',
        moviePrice: '',
        totalPrice: '',
        movieList: {}
    }
})