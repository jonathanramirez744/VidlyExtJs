Ext.define('Vidly.view.movies.Movies',{
    extend:'Ext.grid.Panel',
    xtype:'movies',
    title:'Movies Table',
    store:{
        type:'movies'
    },
    bbar:{
        xtype:'pagingtoolbar',
        displayInfo:true,
    },
    columns:[
        {text:'Movie Name',dataIndex:'movieName',flex:1},
        {text:'Genre',dataIndex:'',flex:1},
        {text:'Available Stocks',dataIndex:'',flex:1},
        {text:'Rented Stocks',dataIndex:'',flex:1},
        {text:'Total Stocks',dataIndex:'',flex:1},
        {text:'Price',dataIndex:'',flex:1}
    ],
    id:'MovieGrid',
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
                Ext.getCmp('MovieGrid').getSelectionModel().selectAll();
            }
        },
        {
            text:'Remove All',
            handler:function(){
                Ext.getCmp('MovieGrid').getSelectionModel().deselectAll();
            }
        },
        {
            text:'Show Selected',
            handler:function(){
                var selected = Ext.getCmp('MovieGrid').getSelectionModel().getSelection();
                console.log(selected);
            }
        }
    ]
});