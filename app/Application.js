/**
 * The main application class. An instance of this class is created by app.js when it
 * calls Ext.application(). This is the ideal place to handle application launch and
 * initialization details.
 */
Ext.define('Vidly.Application', {
    extend: 'Ext.app.Application',

    name: 'Vidly',
    stores: ['selectedMoviesTransaction','RentalsStore'],
    quickTips: false,
    platformConfig: {
        desktop: {
            quickTips: true
        }
    },
    init:function(){
        //Load the stores 

        ///Rental stores
        
    },
    onAppUpdate: function () {
        Ext.Msg.confirm('Application Update', 'This application has an update, reload?',
            function (choice) {
                if (choice === 'yes') {
                    window.location.reload();
                }
            }
        );
    }
});
