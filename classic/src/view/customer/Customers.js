Ext.define('Vidly.view.customers.Customers',{
    extend:'Ext.grid.Panel',
    xtype:'customer',
    title:'Customer Table',
    id:'customerGridId',
    requires:[
        'Vidly.view.customers.CustomersController',
        'Vidly.view.customers.CustomerViewModel'
    ],
    controller: 'customers',
    viewModel: {
        type:'customers'
    },
    store:{
        type:'customers'       
    },
    
    columns:[
        {text:'Name',dataIndex:'custName', flex: 1},
        {text:'Birthday',dataIndex:'birthDate', flex: 1},
        {text:'Subscribed to news letter',dataIndex:'isSubcribedToNewsLetter', flex: 1},       
        {text:'Delingquent',dataIndex:'isDelinquent', flex: 1},
        {text:'Discount',dataIndex:'custDiscount', flex: 1},
        {text:'Membership',dataIndex:'iMembershipType.membershipName',flex: 1},
        {
            xtype: 'actioncolumn',
            width: 50,
            items: [{
                iconCls: 'x-fa fa-pencil',
                tooltip: 'Edit',
                handler: function (grid, rowIndex, colIndex) {
                    var selectedCust = grid.getStore().getAt(rowIndex);                   
                    var popWin = Ext.create('Vidly.view.customers.custForm');
                    //var mydate = new Date(selectedCust.data.birthDate);
                    selectedCust.data.birthDate = new Date(selectedCust.data.birthDate)
                    popWin.getViewModel().set('selectedCust',selectedCust)

                    // popWin.getViewModel().set('custId', selectedCust.data.custId);
                    // popWin.getViewModel().set('custName', selectedCust.data.custName);
                    // popWin.getViewModel().set('isSubcribedToNewsLetter', selectedCust.data.isSubcribedToNewsLetter);
                    // popWin.getViewModel().set('birthDate', mydate);
                    // popWin.getViewModel().set('isDelinquent', selectedCust.data.isDelinquent);
                    // popWin.getViewModel().set('custDiscount', selectedCust.data.custDiscount);
                    // popWin.getViewModel().set('membershipTypeID', selectedCust.data.membershipTypeID);
                    // popWin.getViewModel().set('membershipName', selectedCust.data.iMembershipType.membershipName);
                    popWin.getViewModel().set('formTitle', 'Update Customer');
                    popWin.getViewModel().set('btnText', 'Update Customer');
                    //popWin.getViewModel().set('internal_id', selectedCust.internalId);
                    popWin.show();
                }
            }, {
                iconCls: 'x-fa fa-trash',
                tooltip: 'Delete',
                handler: function (grid, rowIndex, colIndex) {
                    var rec = grid.getStore().getAt(rowIndex);
                    var internal_id = rec.internalId;

                    var store = Ext.getStore('Vidly.store.Customers');
                    var record = store.getByInternalId(internal_id);
                    console.log(record)
                    Ext.MessageBox.confirm('Confirm', 'Are you sure you want to delete the customer?', function (btn) {
                        if (btn == 'yes') {
                            store.remove(record);
                            store.sync();
                        }
                    });

                }
            }]

        }
    ],
    bbar: {
        xtype: 'pagingtoolbar',
        store: Ext.data.StoreManager.lookup('customerStoreID'),
        displayInfo: true,
        displayMsg: 'Display records {0} - {1} of {2}',
        emptyMsg: 'No Record to display'
    },
    buttons: [
        {
            xtype: 'button',
            text: 'Add New Customer',
            handler: 'onClick'
        }
    ]
    
})


//Popup Window to edit the customer
Ext.define('Vidly.view.customers.custForm', {
    extend: 'Ext.window.Window',
    height: 400,
    width: 500,
    layout: 'fit',
    id:'customerMaintenanceWindowId',
    requires:[
        'Vidly.view.customers.CustomersController',
    ],
    controller: 'customers',
    bind: {
        title: '{formTitle}',
    },
    bodyPadding: 10,
    viewModel: {
        type: 'customers'
    },
    items: [
        {
            xtype: 'form',
            id: 'form-id-customer',
            defaultType: 'textfield',
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'internal_id',
                    bind: {
                        value: '{selectedCust.internal_id}'
                    },
                },
                {
                    xtype: 'hiddenfield',
                    name: 'custId',
                    bind: {
                        value: '{selectedCust.custId}'
                    },
                },
                {
                    fieldLabel: 'Name',
                    name: 'custName1',
                    bind: {
                        value: '{selectedCust.custName}'
                    },
                },
                {
                    xtype: 'combobox',
                    fieldLabel: 'Membership Type',
                    valueField: 'membershipTypeID',
                    displayField: 'membershipName',
                    store:{
                        type:'membershipTypeStore'
                    },
                    bind: {
                        value: '{selectedCust.membershipTypeID}'
                    },
                },
                {
                    xtype: 'datefield',
                    fieldLabel: 'Date of Birth',
                    name: 'birthDate',
                    bind: {
                        value: '{selectedCust.birthDate}'
                    },
                },
                {
                    fieldLabel: 'Customer Discount',
                    name: 'custDiscount',
                    bind: {
                        value: '{selectedCust.custDiscount}'
                    },
                },
                {
                    xtype: 'checkbox',
                    defaultType: 'checkboxfield',
                    boxLabel: 'Subscribed to News Letter?',
                    name: 'isSubcribedToNewsLetter',
                    inputvalue: 'isSubcribedToNewsLetter',
                    bind: {
                        value: '{selectedCust.isSubcribedToNewsLetter}'
                    }

                },
                {
                    xtype: 'checkbox',
                    defaultType: 'checkboxfield',
                    boxLabel: 'Customer is Delingquent?',
                    name: 'isDelinquent',
                    inputvalue: 'isDelinquent',
                    bind: {
                        value: '{selectedCust.isDelinquent}'
                    }
                }
            ]
        },

    ],
    buttons: [
        {
            xtype: 'button',
            bind: {
                text: '{btnText}',
            },
            handler: 'onUpdate'
        }
    ]
})
