import { Route, Routes } from "react-router-dom";
import Home from "../modules/Home";

import EditUser from "../modules/Home/EditUser";
import Quiz from "../modules/Quiz";

export default function ContentRoute() {
  return (
    <>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="edit-user/:id" element={<EditUser />} />
        <Route path='/quiz' element={<Quiz />} />
      </Routes>
    </>
  );
}
