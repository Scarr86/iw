import {
  State,
  Select,
  createSelector,
  Action,
  StateContext
} from "@ngxs/store";
import * as moment from "moment";
import { Param, SetHistory } from "../actions/history.action";

export interface HistorySatateModel {
  start: moment.Moment;
  end: moment.Moment;
  view: moment.unitOfTime.DurationConstructor;

  dialogPeriod: string[];
  selectPeriod: number;

  dialogView: string[];
  selectView: number;
}

@State<HistorySatateModel>({
  name: "History",
  defaults: {
    start: moment(),
    end: moment(),
    view: "day",
    dialogPeriod: [
      "За последнию неделю",
      "За последный месяц",
      "За последный год",
      "Другое"
    ],
    selectPeriod: 0,
    dialogView: ["День", "Месяц", "Год"],
    selectView: 0
  }
})
export class HistorySatate {
  @Select()
  static getValue(param: Param) {
    return createSelector(
      [HistorySatate],
      (state: HistorySatateModel) => state[param]
    );
  }

  @Action(SetHistory)
  setHistory(
    { patchState,  getState }: StateContext<HistorySatateModel>,
    { param, value }: SetHistory
  ) {
    const state = getState();
    const newState = { ...state };
    newState[param] = value;
    patchState(newState);
  }
}
