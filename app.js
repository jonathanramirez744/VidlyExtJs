/*
 * This file launches the application by asking Ext JS to create
 * and launch() the Application class.
 */
Ext.application({
    extend: 'Vidly.Application',

    name: 'Vidly',
    
    requires: [
        // This will automatically load all classes in the Vidly namespace
        // so that application classes do not need to require each other.
        'Vidly.*'
    ],

    // The name of the initial view to create.
    mainView: 'Vidly.view.main.Main'
});
