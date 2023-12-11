import React, { useState, useEffect } from 'react';
import { getAllThueSach, updateDocGia, updateSach } from '../utils/firebaseFunction';

const BookReturnForm = () => {
    const [thueSachData, setThueSachData] = useState([]);
    const [selectedThueSach, setSelectedThueSach] = useState('1701961496903');

    useEffect(() => {
        const fetchThueSachData = async () => {
            try {
                console.log('Selected Category:', selectedThueSach);
                if (selectedThueSach){
                    const allThueSachData = await getAllThueSach();
                    setThueSachData(allThueSachData );
                }else{
                    setThueSachData([])
                }
            } catch (error) {
                console.error('Lỗi khi lấy thông tin thuesach:', error);
            }
        };

        fetchThueSachData();
    }, [selectedThueSach]);

    const handleSelectThueSach = (event, thueSach) => {
        event.stopPropagation();

        // Nếu đã có cuốn sách nào đó được chọn và không phải cuốn sách đang được click, thì không thay đổi trạng thái
        if (selectedThueSach && selectedThueSach.id !== thueSach.id) {
            return;
        }

        // Nếu chưa có cuốn sách nào được chọn hoặc đang click vào cuốn sách đã được chọn, thì thực hiện thay đổi trạng thái
        setSelectedThueSach((prevSelected) => (prevSelected ? null : thueSach));
    };


    const handleReturnBook = async () => {
        try {
            if (selectedThueSach) {
                await updateDocGia(/* Thông tin độc giả từ selectedThueSach nếu cần */);
                await updateSach(/* Thông tin sách từ selectedThueSach nếu cần */);

                setThueSachData(thueSachData.filter((thueSach) => thueSach.id !== selectedThueSach.id));
                setSelectedThueSach(null);
                console.log('Trả sách thành công!');
            } else {
                console.warn('Vui lòng chọn một sách để trả.');
            }
        } catch (error) {
            console.error('Lỗi khi trả sách:', error);
        }
    };

    return (
        <div className="p-4 bg-gray-100">
            <h1 className="text-2xl font-bold mb-4">Trả Sách</h1>
            <div>
                {thueSachData.map((thueSach) => (
                    <div
                        key={thueSach.id}
                        onClick={(event) => handleSelectThueSach(event, thueSach)}
                        className={`cursor-pointer p-2 mb-2 bg-white rounded shadow ${selectedThueSach && selectedThueSach.id === thueSach.id ? 'bg-blue-200' : ''}`}
                    >
                        <p>
                            <span className="font-bold">Tên Sách:</span> {thueSach.maSach}
                        </p>
                        <p>
                            <span className="font-bold">Tên Độc Giả:</span> {thueSach.maDocGia}
                        </p>
                        <p>
                            <span className="font-bold">Ngày Mượn:</span> {thueSach.ngayThue}
                        </p>
                        {/* Thêm các thông tin khác của sách mà bạn muốn hiển thị */}
                    </div>
                ))}
            </div>
            {selectedThueSach && (
                <div className="mt-4 p-4 bg-white rounded shadow">
                    <h2 className="text-xl font-bold mb-2">Thông Tin Chi Tiết</h2>
                    <p>
                        <span className="font-bold">Ngày Mượn:</span> {selectedThueSach.ngayThue}
                    </p>
                    <p>
                        <span className="font-bold">Trường Khác:</span> {selectedThueSach.otherFields}
                    </p>
                    <button
                        onClick={handleReturnBook}
                        className="bg-green-500 text-white px-4 py-2 rounded mt-2 hover:bg-green-600 focus:outline-none focus:ring focus:border-blue-300"
                    >
                        Trả Sách
                    </button>
                </div>
            )}
        </div>
    );
};

export default BookReturnForm;
