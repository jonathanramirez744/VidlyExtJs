Ext.define('Vidly.model.RentalsModel', {
    extend: 'Ext.data.Model',
    alias: 'model.rentals',
    fields: [
        { name: 'fldTranscationID' },
        { name: 'rentalID' },
        { name: 'custId' },
        { name: 'movieId' },
        { name: 'fldTranscationID' },
        { name: 'isReturned' },
        { name: 'dateRented' },
        { name: 'dateReturned' },
        { name: 'customer.custName', mapping: 'customer.custName' },
        { name: 'customer.isDelinquent', mapping: 'customer.isDelinquent' },
        { name: 'customer.custDiscount', mapping: 'customer.custDiscount' },
        { name: 'movies.movieName', mapping: 'movies.movieName' },
        { name: 'movies.moviePrice', mapping: 'movies.moviePrice' },
    ]
})