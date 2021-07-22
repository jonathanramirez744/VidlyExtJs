Ext.define('Vidly.view.customers.CustomersController', {
    extend: 'Ext.app.ViewController',
    requires: [
        'Vidly.store.Customers',
    ],
    alias: 'controller.customers',



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
            store.insert(0, vm.selectedCust);
            store.sync();
            store.load()
        } else {
            store.sync();
            store.load();
        }
        this.getView().destroy();
    },
    onEdit: function (grid, rowIndex, colIndex) {
        var selectedCust = grid.getStore().getAt(rowIndex);
        var popWin = Ext.create('Vidly.view.customers.custForm');
        selectedCust.data.birthDate = new Date(selectedCust.data.birthDate)
        popWin.getViewModel().set('selectedCust', selectedCust)
        popWin.getViewModel().set('formTitle', 'Update Customer');
        popWin.getViewModel().set('btnText', 'Update Customer');
        popWin.show();
    },
    onDelete: function (grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        var internal_id = rec.internalId;
        var store = Ext.StoreManager.lookup('customerStoreID');
        var record = store.getByInternalId(internal_id);
        console.log(record)
        Ext.MessageBox.confirm('Confirm', 'Are you sure you want to delete the customer?', function (btn) {
            if (btn == 'yes') {
                store.remove(record);
                store.sync({
                    callback:function(){
                        store.load();
                    }
                });
                
            }
        });
    }

});
