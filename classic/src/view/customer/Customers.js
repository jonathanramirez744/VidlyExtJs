Ext.define('Vidly.view.customers.Customers',{
    extend:'Ext.grid.Panel',
    xtype:'customer',
    title:'Customer Table',
    id:'customerGridId',
    height: 600,
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
                handler: 'onEdit'
            }, {
                iconCls: 'x-fa fa-trash',
                tooltip: 'Delete',
                handler: 'onDelete'
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

Ext.define('Vidly.view.customers.PopUpCustForm', {
    extend:'Ext.window.Window',
    title: 'Customer Maintenance',
    height: 720,
    width: 1250,
    frame: true,
    padding: 10,
    items: [
        {
            xtype:'customer'
        },
        {
            html: '<br/>'
        },
        {
            xtype: 'button',
            text: 'close',
            
        }
    ]
});