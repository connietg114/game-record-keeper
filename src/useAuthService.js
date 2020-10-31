import { UserManager, WebStorageStateStore } from 'oidc-client';

class AuthService {

    _user = null;
    _isAuthenticated = false;

    initializeUserManager(config) {

        if (this.userManager !== undefined) {
            return;
        }

        var settings = {
            authority: config.apiURL,
            client_id: 'GameRecordKeeper',
            redirect_uri: `${config.appURL}login-callback`,
            response_type: 'code',
            scope: 'openid profile GameRecordKeeperAPI',
            post_logout_redirect_uri: `${config.appURL}logout-callback`,
            automaticSilentRenew: true,
            includeIdTokenInSilentRenew: true,
            userStore: new WebStorageStateStore({ prefix: "GameRecordKeeper"})
        };
    
        this.userManager = new UserManager(settings);
    }

    async isAuthenticated() {
        const user = await this.getUser();
        return !!user;
    }

    async getUser() {
        if (this._user && this._user.profile) {
            return this._user.profile;
        }

        const user = await this.userManager.getUser();
        return user && user.profile;
    }

    async getAccessToken() {
        const user = await this.userManager.getUser();
        return user && user.access_token;
    }

    async signIn(state) {

        try {

            const silentUser = await this.userManager.signinSilent(this.createArguments(state));
            this.updateState(silentUser);
            return { status: 'success', state };
        } catch (silentError) {
            console.log("Silent authentication error: ", silentError);

            try {
                await this.userManager.signinRedirect(this.createArguments(state));
                return { status: 'redirect' };
            } catch (redirectError) {
                console.log("Redirect authentication error: ", redirectError);
                return { status: 'fail', message: redirectError };
            }
        }

    }

    async completeSignIn(url) {
        try {
            const user = await this.userManager.signinCallback(url);
            this.updateState(user);
            return { status: 'success', state: user && user.state };
        } catch (error) {
            console.log(`There was an error signing in: ${error}`);
            return { status: 'fail', message: 'There was an error signing in'};
        }
    }

    async signOut(state) {
        try {
            await this.userManager.signoutRedirect(this.createArguments(state));
            return { status: 'redirect' };
        } catch (redirectSignOutError) {
            console.log(`Redirect signout error: ${redirectSignOutError}`);
            return { status: 'fail', message: redirectSignOutError };
        }
    }

    async completeSignOut(url) {
        try {
            const response = await this.userManager.signoutCallback(url);
            this.updateState(null);
            return { status: 'success', state: response && response.data};
        } catch (error) {
            console.log(`There was an error trying to log out '${error}`);
            return { status: 'fail', message: error };
        }
    }

    updateState(user) {
        this._user = user;
        this._isAuthenticated = !!this._user;
    }

    createArguments(state) {
        return { useReplaceToNavigate: true, data: state };
    }

    static get instance() { return authService }
}

const authService = new AuthService();

function useAuthService(config) {

    if (config)
        authService.initializeUserManager(config);

    return authService;
}

export { useAuthService }

