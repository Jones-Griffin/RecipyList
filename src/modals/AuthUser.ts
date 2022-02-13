export class AuthUser {
    uid: string;
    email: string;

    constructor(props?: Partial<AuthUser>){
        props = props || {};
        Object.assign(this, props);
    }
}