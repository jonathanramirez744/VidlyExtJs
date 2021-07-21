Ext.define('Vidly.store.MembershipTypeStore', {
    extend:'Ext.data.Store',      
    alias:'store.membershipTypeStore', 
    storeId: 'membershipTypeID', 
    model: 'Vidly.model.MembershipTypeModel',
    remoteFilter: true,
    autoLoad: true,
    proxy: {
        type: 'rest',
        url: 'http://localhost:44345/api/APIMembershipType',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    },
})