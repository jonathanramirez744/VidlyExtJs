Ext.define('Vidly.view.customers.Customers',{
    extend:'Ext.grid.Panel',
    xtype:'customer',
    title:'Customer Table',
    
    store:{
        type:'customers'       
    },
    bbar:{
        xtype:'pagingtoolbar',
        displayInfo:true,
    },
    columns:[
        {text:'Name',dataIndex:'custName', flex: 1},
        {text:'Birthday',dataIndex:'birthDate', flex: 1},
        {text:'Subscribed to news letter',dataIndex:'isSubcribedToNewsLetter', flex: 1},       
        {text:'Delingquent',dataIndex:'isDelinquent', flex: 1},
        {text:'Discount',dataIndex:'custDiscount', flex: 1},
        {text:'Membership',dataIndex:'iMembershipType.membershipName',flex: 1},
        
    ],
    id:'testGrid',
    selModel:{
        injectCheckbox:'first',
        checkOnly:true,
        model:'SIMPLE',
        type:'checkboxmodel'
    },
    buttons:[
        {
            text:'Select All',
            handler:function(){
                Ext.getCmp('testGrid').getSelectionModel().selectAll();
            }
        },
        {
            text:'Remove All',
            handler:function(){
                Ext.getCmp('testGrid').getSelectionModel().deselectAll();
            }
        },
        {
            text:'Show Selected',
            handler:function(){
                var selected = Ext.getCmp('testGrid').getSelectionModel().getSelection();
                console.log(selected);
            }
        }
    ]
})