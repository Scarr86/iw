import { State, Selector, Action, StateContext } from '@ngxs/store';
import { ToggleDarkTheme, SetTheme, } from '../actions/config.action';

export enum THEME {
    dark = 'dark-theme',
    light = "",
    indigo = "",
    green = "green-theme"

}

interface ConfigStateModel {
    darkOrLight: string;
    theme: string;
}

@State<ConfigStateModel>({
    name: "config",
    defaults: {
        darkOrLight: "",
        theme: THEME.indigo
    }
})
export class ConfigState {


    @Action(ToggleDarkTheme)
    toggleDarkTheme({ getState, patchState }: StateContext<ConfigStateModel>) {
        patchState({ darkOrLight: getState().darkOrLight === THEME.dark ? THEME.light : THEME.dark })
    }
    @Action(SetTheme)
    setIndigoTheme({ patchState }: StateContext<ConfigStateModel>, { theme }: SetTheme) {
        patchState({ theme })
    }

    @Selector()
    static theme(state: ConfigStateModel) {
        return state.darkOrLight + " " + state.theme;
    }
}
