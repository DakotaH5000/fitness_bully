export const paths = {
    home:{
        getHref: () => '/'
    },
    app:{
        dashboard:{
            getHref: () => '/app/dashboard'
        }
    },
    auth:{    
        login: {
        getHref: () => 'auth/login'
    }}
} as const;