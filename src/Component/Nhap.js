import React, { useEffect, useState } from 'react';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { firestore } from '../firebase';

export default function Nhap() {
    const [thueSachData, setThueSachData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [confirmTraSach, setConfirmTraSach] = useState(false);
    const [selectedThueSachId, setSelectedThueSachId] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const querySnapshot = await getDocs(collection(firestore, 'thuesach'), {
                    select: ['maSach', 'maDocGia', 'daTra'],
                });
                const data = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setThueSachData(data);
            } catch (error) {
                console.error('Error fetching data: ', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const openConfirmation = (thueSachId) => {
        setConfirmTraSach(true);
        setSelectedThueSachId(thueSachId);
    };

    const closeConfirmation = () => {
        setConfirmTraSach(false);
        setSelectedThueSachId(null);
    };

    const handleTraSach = async () => {
        try {
            setLoading(true);
            const thueSachRef = doc(firestore, 'thuesach', selectedThueSachId);
            await updateDoc(thueSachRef, { daTra: true });
            closeConfirmation();
        } catch (error) {
            console.error('Error updating data: ', error);
            // Xử lý lỗi, ví dụ: Hiển thị thông báo lỗi cho người dùng
        } finally {
            setLoading(false);
        }
    };

    const toggleTrangThai = async (thueSachId, currentDaTra) => {
        try {
            setLoading(true);
            const thueSachRef = doc(firestore, 'thuesach', thueSachId);
            await updateDoc(thueSachRef, { daTra: !currentDaTra });
        } catch (error) {
            console.error('Error updating data: ', error);
            // Xử lý lỗi, ví dụ: Hiển thị thông báo lỗi cho người dùng
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-md">
            <h2 className="text-2xl font-bold mb-4">Thông tin thuê sách từ Firebase:</h2>
            <ul>
                {thueSachData.map((thueSach) => (
                    <li key={thueSach.id} className="border-b py-2 flex items-center justify-between">
                        <div className="text-lg">
                            {thueSach.maSach} - {thueSach.maDocGia}
                        </div>
                        <div className="flex items-center">
                            <span className={`ml-4 text-sm ${thueSach.daTra ? 'text-gray-500' : 'text-green-500'}`}>
                                {thueSach.daTra ? 'Đã trả' : 'Chưa trả'}
                            </span>
                            {!thueSach.daTra && (
                                <>
                                    <button
                                        onClick={() => openConfirmation(thueSach.id)}
                                        className={`bg-blue-500 text-white px-3 py-1 rounded-md ml-2 hover:bg-blue-600 ${loading && 'opacity-50 cursor-not-allowed'}`}
                                        disabled={loading}
                                    >
                                        Trả sách
                                    </button>
                                    {/* Hộp thoại xác nhận */}
                                    {confirmTraSach && selectedThueSachId === thueSach.id && (
                                        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
                                            <div className="bg-white p-4 rounded-md">
                                                <p>Bạn có chắc muốn trả sách?</p>
                                                <div className="flex justify-end mt-4">
                                                    <button onClick={handleTraSach} className="bg-blue-500 text-white px-3 py-1 rounded-md ml-2 hover:bg-blue-600">
                                                        Đồng ý
                                                    </button>
                                                    <button onClick={closeConfirmation} className="text-gray-500 px-3 py-1 rounded-md ml-2 hover:text-gray-700">
                                                        Hủy
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
