import { AppRouter } from "./router/";
import "./app.css";
// redux
import { Provider } from "react-redux";
import { store } from "./store/store";
export const QuizApp = () => {
  return (
    <>
      <Provider store={store}>
        <AppRouter />
      </Provider>
    </>
  );
};
