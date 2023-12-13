// src/components/AddEmployeeForm.js
import React, { useState } from 'react';
import { nguoiDung } from '../utils/firebaseFunction';
import { Link } from 'react-router-dom';

const ThemNhanVien = () => {
    const [tennv, setTenNV] = useState('');
    const [chucvu, setChucVu] = useState(null);
    const [sdt, setSDT] = useState('');
    const [CMND, setCMND] = useState('');
    const [email, setEmail] = useState('');
    const [diaChi, setDiaChi] = useState('');

    const themNguoiDung = () => {
        try {
            if (!tennv || !chucvu || !sdt || !CMND || !email || !diaChi) {
                alert('Bạn chưa điền đầy đủ thông tin');
            } else {
                const data = {
                    id: `${Date.now()}`,
                    nguoiDung: tennv,
                    chucVu: chucvu,
                    SDT: sdt,
                    CMND: CMND,
                    email: email,
                    diaChi: diaChi
                }
                nguoiDung(data);
                alert('Thêm người dùng thành công');
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <form className="bg-cover bg-center bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white p-8 rounded shadow-md max-w-md mx-auto">
            <h2 className="text-3xl font-semibold mb-6 text-center">Thêm nhân viên</h2>
            <div className="grid grid-cols-2 gap-4">
                <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
                        Tên nhân viên
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={tennv}
                        onChange={(e) => setTenNV(e.target.value)}
                        className="text-black mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="position" className="block text-sm font-medium text-white mb-2">
                        Chức vụ
                    </label>
                    <select

                        onChange={(e) => setChucVu(e.target.value)}
                        id="position"
                        name="position"
                        className="text-black mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
                    >
                        <option value="" disabled selected>
                            Chọn chức vụ
                        </option>
                        <option value={chucvu} className="text-black" >
                            Nhân viên
                        </option>
                        <option value={chucvu} className="text-black" >
                            Admin
                        </option>
                        {/* Thêm các chức vụ khác nếu cần */}
                    </select>
                </div>
                <div className="mb-4">
                    <label htmlFor="phoneNumber" className="block text-sm font-medium text-white mb-2">
                        Số điện thoại
                    </label>
                    <input
                        value={sdt}
                        onChange={(e) => setSDT(e.target.value)}
                        type="number"
                        id="phoneNumber"
                        name="phoneNumber"
                        className="text-black mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="idCard" className="block text-sm font-medium text-white mb-2">
                        Số CMND
                    </label>
                    <input
                        value={CMND}
                        onChange={(e) => setCMND(e.target.value)}
                        type="number"
                        id="idCard"
                        name="idCard"
                        className="text-black mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                        Email
                    </label>
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="text"
                        id="email"
                        name="email"
                        className="text-black mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="address" className="block text-sm font-medium text-white mb-2">
                        Địa chỉ
                    </label>
                    <input
                        value={diaChi}
                        onChange={(e) => setDiaChi(e.target.value)}
                        type="text"
                        id="address"
                        name="address"
                        className="text-black mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
                    />
                </div>
            </div>
            <div className='grid grid-cols-2 gap-3'>
                <Link to='/admin/nguoidung'
                    type="button"
                    className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition-all focus:outline-none"
                >
                    Quay lại
                </Link>
                <button
                    type="button"
                    onClick={() => themNguoiDung()}
                    className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-all focus:outline-none"
                >
                    Thêm nhân viên
                </button>
            </div>
        </form>
    );
};

export default ThemNhanVien;
