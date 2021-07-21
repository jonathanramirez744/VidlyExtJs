Ext.define('Vidly.model.Customers', {
    extend: 'Vidly.model.Base',
    storeId:'customerStoreId',
    alias: 'model.customers',
    fields: [
        { name: 'custId' },
        { name: 'custName' },
        { name: 'isSubcribedToNewsLetter' },
        { name: 'birthDate' },
        { name: 'isDelinquent' },
        { name: 'custDiscount' },
        { name: 'membershipTypeID' },
        {
            name: 'iMembershipType.membershipName',
            mapping: 'iMembershipType.membershipName'
        },
    ]
})


