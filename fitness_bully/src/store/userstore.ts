import { create } from 'zustand'

interface User{
    email: string;
    firstName: string;
    lastName: string;
    id: BigInt;
}

interface UserStore{
    user: User | null;
    update: (user:User) => void;
}

const useUserStore = create<UserStore>((set) => ({
    user: null,
    update: (user) => set(() => ({user}))
    
}));