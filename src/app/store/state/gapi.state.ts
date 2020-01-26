import { State, NgxsAfterBootstrap, StateContext, Action, NgxsOnInit, Selector, Store } from '@ngxs/store';
import { Auth2Service } from 'src/app/service/google-gapi/auth2.service';
import { from } from 'rxjs';
import { tap } from 'rxjs/operators';
import { SignIn, SignOut, UpdateSigninStatus, InitSession } from '../actions/auth2.actions';
import { Router } from '@angular/router';

export interface GapiStateMosel {
    // googleAuth: gapi.auth2.GoogleAuth | null;
    googleUser: gapi.auth2.GoogleUser | null;
    isSignedIn: boolean
}
@State<GapiStateMosel>({
    name: 'gapi',
    defaults: {
        // googleAuth: null,
        googleUser: null,
        isSignedIn: false
    }
})
export class GapiState implements NgxsAfterBootstrap, NgxsOnInit {
    constructor(private auth2Service: Auth2Service, private store: Store, private router:Router) { }

    ngxsAfterBootstrap(ctx: StateContext<GapiStateMosel>) {

    }
    ngxsOnInit(ctx: StateContext<GapiStateMosel>) { }

    @Action(InitSession)
    initSession(ctx: StateContext<GapiStateMosel>) {
        let googleAuth = gapi.auth2.getAuthInstance();
        googleAuth.isSignedIn.listen((isSignedIn) => {
            ctx.dispatch(new UpdateSigninStatus(isSignedIn))
        });
        ctx.patchState({
            // googleAuth,
            isSignedIn: googleAuth.isSignedIn.get()
        });
    }

    @Action(SignIn)
    signIn(ctx: StateContext<GapiStateMosel>) {
        let googleAuth = gapi.auth2.getAuthInstance();
        //const googleAuth = ctx.getState().googleAuth;
        try {
            googleAuth.signIn({ prompt: "select_account" });
        }
        catch{
            throw new Error("googleAuth is unset")
        }
    }

    @Action(SignOut)
    signOut(ctx: StateContext<GapiStateMosel>) {
        let googleAuth = gapi.auth2.getAuthInstance();
        //const googleAuth = ctx.getState().googleAuth;
        try {
            googleAuth.signOut();
        }
        catch{
            throw new Error("googleAuth is unset")
        }
    }
    @Action(UpdateSigninStatus)
    updateSigninStatus(ctx: StateContext<GapiStateMosel>, { isSignedIn }) {
        ctx.patchState({ isSignedIn });
    }



    @Selector()
    static isSignedIn(state: GapiStateMosel) {
        return state.isSignedIn;
    }
}