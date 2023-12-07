import "../App.css";
import { Data } from "../Context";
import Header from "./Header";
import Header2 from "./Header2";
import tailieu from "../data/datatailieumoi.json";
import { useState } from "react";
import { xemnhieu } from "../data/dataXemNhieu";
import { initalState } from "../context/initialState";
import reducer from "../context/reducer";
import { Route, Routes } from "react-router-dom";
import Create from "./Create";
import Demo from './Demo'
import DemoDangNhap from "../DangNhap/DemoDangNhap";
import DocGia from '../DocGia/DocGia'
import SuaDocGia from "../DocGia/SuaDocGia";
import SuaSach from "./SuaSach";

function App() {
  const [taiLieu, setTaiLieu] = useState(tailieu[0]);
  const [xemNhieu, setXemNhieu] = useState(xemnhieu[0]);
  return (
    <div className="w-full h-auto flex flex-col ">
      <Data.Provider
        initialState={initalState}
        reducer={reducer}
        value={{ xemnhieu, xemNhieu, tailieu, taiLieu, setTaiLieu }}
      >
        <Header />
        <main className="mt-16 md:mt-24  w-full">
          <Routes>
            <Route path="/trangchu" element={<Header2 />} />
            <Route path="/createItem" element={<Create />} />
            <Route path="/kho" element={<Demo />} />
            <Route path="/" element={<DemoDangNhap />} />
            <Route path="/docgia" element={<DocGia />} />
            <Route path="/suadocgia/:id" element={<SuaDocGia />} />
            <Route path="/suasach/:id" element={<SuaSach />} />
          </Routes>
        </main>
      </Data.Provider>
    </div>
  );
}

export default App;
