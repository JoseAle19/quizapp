
//UseNavigate
import { Route, Routes} from "react-router-dom";


// Componeneys
import { CreateQuestion } from "../../teacher/pages/CreateQuestion";
import { NavBar } from "../components/NavBar";
import { ViewTests } from "../components/ViewTests";
import { CreateTest, QuestionsPage } from "../../teacher/pages";
import { useSelector } from "react-redux";
export const AdminDashBoardPage = () => {
  const { user } = useSelector((state) => state.auth);


const WelcomeUser = () =>{
return(
  <>
 <div className="container">
  <div className="row mt-5">
    <div className="col-md-6 offset-md-3 text-center">
      <h1 className="display-4">Hola, bienvenido {user.name}</h1>
    </div>
  </div>
</div>
  </>
)
}
return (
  <>
    <div className= " z-3 position-fixed   w-100 bg-primary p-2">
      <NavBar />
    </div>
    <div className="pt-5  ">
      <Routes>
        <Route path="/" element={<WelcomeUser />} />
        <Route path="/create-question" element={<CreateQuestion />} />
        <Route path="/questions" element={<QuestionsPage />} />
        <Route path="/view-test" element={<ViewTests />} />
        <Route path="/create-test" element={<CreateTest />} />
      </Routes>
    </div>
  </>
);


};
