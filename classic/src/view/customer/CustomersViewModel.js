Ext.define('Vidly.view.customers.CustomerViewModel', {
    extend: 'Ext.app.ViewModel',
    alias:'viewmodel.customers',
    data: {

        custId: '',
        custName: '',
        isSubcribedToNewsLetter: '',
        birthDate: '',
        isDelinquent: '',
        custDiscount: '',
        membershipTypeID: '',
        membershipName: '',
        formTitle: '',
        btnText: '',
        internal_id: ''
    },
});