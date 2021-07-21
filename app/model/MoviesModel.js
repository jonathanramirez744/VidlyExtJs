Ext.define('Vidly.model.MoviesModel', {
    extend: 'Vidly.model.Base',
    alias: 'model.movies',
    fields: [
        { name: 'movieId' },
        { name: 'movieName' },
        { name: 'releaseDate' },
        { name: 'addedDate' },
        { name: 'numStocks' },
        { name: 'numAvailable' },
        { name: 'numBorrowed' },
        {
            name: 'iGenre.genreName',
            mapping: 'iGenre.genreName'
        },
        { name: 'genreId' },
        { name: 'isReturned' },
        { name: 'moviePrice' },
        
    ]
})