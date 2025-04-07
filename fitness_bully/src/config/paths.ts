export const paths = {
    home:{
        getHref: () => '/'
    },
    app:{
        dashboard:{
            getHref: () => '/app/dashboard'
        },
        calendar:{
            getHref: () => 'calendar'
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