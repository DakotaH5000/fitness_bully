export const paths = {
    home:{
        getHref: () => '/'
    },
    app:{
        dashboard:{
            getHref: () => '/app/dashboard'
        },
        calendar:{
            getHref: () => '/app/calendar'
        },
        preferences:{
            getHref: () =>'/app/preferences'
        }
    },
    auth:{    
        login: {
        getHref: () => 'auth/login'
    }, register: {
        getHref: () => 'auth/register'
    }
}
} as const;