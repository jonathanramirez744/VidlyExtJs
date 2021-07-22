/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 */
Ext.define('Vidly.view.main.MainController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.main',

    

    onItemSelected: function (sender, record) {
        
        Ext.Msg.confirm('Confirm', 'Are you sure?', 'onConfirm', this);      
    },

    onConfirm: function (choice) {
        if (choice === 'yes') {
            //
            
        }
    },
    
    onItemSelect: function (sender, record) {
        
        Ext.Msg.confirm('Confirm', 'Are you sure?', 'onConfirm', this);      
    },


    onSelectTab:function(tabPanel,tab){
        switch(tab.tabId){
            case 'panel-movies':{
                var popUpWin = Ext.create('Vidly.view.movies.PopUpMovieForm');
                popUpWin.show();
                break;
            }
        }
        
    },
    onShowMovies:function(){
        var popUpWin = Ext.create('Vidly.view.movies.PopUpMovieForm');
        popUpWin.show();
    },
    onShowCustomers:function(){
        var popUpWin = Ext.create('Vidly.view.customers.PopUpCustForm');
        popUpWin.show();
    }

   


});
