Ext.define('Vidly.view.customers.CustomersController', {
    extend: 'Ext.app.ViewController',
    requires:[
        'Vidly.store.Customers',
    ],
    alias: 'controller.customers',
    init: function(){
        console.log('controller')
        this.control({
            '#deleteCustomer':{
                click:'CallOnClick'
            }
        })
    },
    CallOnClick: function(){
        alert('hello from controller')
    },


    onClick: function (args1, args2) {
        var popWin = Ext.create('Vidly.view.customers.custForm');
        popWin.getViewModel().set('formTitle', 'Add New Customer');
        popWin.getViewModel().set('btnText', 'Add Customer');
        popWin.show();
    },

    onUpdate: function () {     
          
        var store = Ext.StoreManager.lookup('customerStoreID');
        var vm = this.getViewModel().data;
        if (vm.selectedCust.custId == undefined) {
            store.insert(0,vm.selectedCust);         
            store.sync();
            store.load()
        } else {
            store.sync();
            store.load();
        }
        this.getView().destroy();
    }

});
