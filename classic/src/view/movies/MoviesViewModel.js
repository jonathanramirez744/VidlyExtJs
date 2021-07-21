Ext.define('Vidly.view.movies.MoviesViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.Movie',
    data: {
        movieId: '',
        movieName: '',
        numStocks: '',
        genreId: '',
        genreName: '',
        moviePrice: '',
        formTitle: '',
        btnText: '',
        internal_id: ''
    }
})