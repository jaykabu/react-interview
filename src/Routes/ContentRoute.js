import { Route, Routes } from "react-router-dom";
import Home from "../modules/Home";

import EditUser from "../modules/Home/EditUser";

export default function ContentRoute() {
  return (
    <>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="edit-user/:id" element={<EditUser />} />
      </Routes>
    </>
  );
}
