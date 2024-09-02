const menuItems = [
    { name: 'Home', link: '/home' },
    { 
        name: 'Vehicle management', 
        subItems: [
            { name: 'Add vehicle', link: '/add-vehicle' },
            { name: 'Manage vehicle', link: '/manage-vehicle' },
        ] 
    },
    { 
        name: 'Route management', 
        subItems: [
            { name: 'Add Route', link: '/add-route', active: true },
            { name: 'Manage Routes', link: '/manage-routes' },
        ] 
    },
    { 
        name: 'Transport management', 
        subItems: [
            { name: 'Schedule a routine', link: '/schedule-routine' },
            { name: 'Manage Routines', link: '/manage-routines' },
            { name: 'Generate Report', link: '/generate-report' },
        ] 
    },
    { 
        name: 'Distribution Management', 
        subItems: [
            { name: 'Manage Distributions', link: '/manage-distributions' },
            { name: 'Delivery Complains', link: '/delivery-complains' },
        ] 
    },
];

export default menuItems;
