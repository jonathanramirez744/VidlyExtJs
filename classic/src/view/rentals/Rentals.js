Ext.define('Vidly.view.rentals.Rentals',{
    extend:'Ext.grid.Panel',
    xtype:'rentals',
    title:'Transactions',
    store:{
        type:''
    },
    bbar:{
        xtype:'pagingtoolbar',
        displayInfo:true,
    },
    columns:[
        {text:'Transaction Number',dataIndex:'',flex:1},
        {text:'Transaction Date',dataIndex:'',flex:1},
        {text:'Customer Name',dataIndex:'',flex:1}
    ],
    id:'TransactionGrid',
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
                Ext.getCmp('TransactionGrid').getSelectionModel().selectAll();
            }
        },
        {
            text:'Remove All',
            handler:function(){
                Ext.getCmp('TransactionGrid').getSelectionModel().deselectAll();
            }
        },
        {
            text:'Show Selected',
            handler:function(){
                var selected = Ext.getCmp('TransactionGrid').getSelectionModel().getSelection();
                console.log(selected);
            }
        }
    ]
}) 