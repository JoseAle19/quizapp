import { getTeamForAdviser } from "./service";
import { isLoading, setTeam } from "./teamSlice";

export const getTeamForAdviserById = (id) => {
  return async (dispatch) => {
    dispatch(isLoading(true));

    const { data } = await getTeamForAdviser(id);
    dispatch(isLoading(false));
    dispatch(setTeam(data.team));
  };
};
