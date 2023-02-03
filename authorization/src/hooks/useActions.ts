import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { authActions } from "../store/authSlice";

export function useActions() {
  const dispatch = useDispatch();
  const actions = {
    ...authActions,
  };

  return bindActionCreators(actions, dispatch);
}
