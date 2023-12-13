import { collection, doc, getDocs, orderBy, query, setDoc, updateDoc, where } from 'firebase/firestore';
import { firestore } from '../firebase';
//xử lui dong bo / sử dụng forebtore xử lý đưa hình ảnh vô
export const saveItem = async data => {
    await setDoc(
        doc(firestore, 'books', `${Date.now()}`), data, { merge: true, }
    );
};
//xử lui dong bo / sử dụng forebtore xử lý đưa hình ảnh vô
export const nguoiDung = async data => {
    await setDoc(
        doc(firestore, 'NguoiDung', `${Date.now()}`), data, { merge: true, }
    );
};
//độc giả
export const docgia = async data => {
    await setDoc(
        doc(firestore, 'docgia', `${Date.now()}`), data, { merge: true, }
    );
};
export const phieuThue = async data => {
    await setDoc(
        doc(firestore, 'thueSach', `${Date.now()}`), data, { merge: true, }
    );
};
export const updateDocGiaa = async (id, data) => {
    const docRef = doc(firestore, 'docgia', id);
    await setDoc(docRef, data, { merge: true });
};

//   getall food items 
export const getAllFoodItems = async (loaiSach) => {
    const items = await getDocs(
        
        query(collection(firestore, 'books'),
            where('loaiSach', '==', loaiSach),
            orderBy('id', 'desc')),
    );
    // console.log('loaiSach:', loaiSach);
    return items.docs.map(doc => doc.data());
};

export const docthuesach = async (maDocGia,maSach) => {
    const items = await getDocs(
        
        query(collection(firestore, 'thuesach'),
            where('maDocGia', '==', maDocGia && 'maSach', '==', maSach),
            orderBy('id', 'desc')),
    );
    // console.log('loaiSach:', loaiSach);
    return items.docs.map(doc => doc.data());
};

export const getAllDocGia = async () => {
    const docGiaCollection = collection(firestore, 'thuesach');
    const docGiaSnapshot = await getDocs(docGiaCollection);

    const maDocGiaList = [];
    docGiaSnapshot.forEach((doc) => {
        const maDocGia = doc.data().maDocGia;
        maDocGiaList.push(maDocGia);
    });

    return maDocGiaList;
};

// Hàm lấy danh sách mã sách từ Firestore
export const getAllSach = async () => {
    const sachCollection = collection(firestore, 'thuesach');
    const sachSnapshot = await getDocs(sachCollection);

    const maSachList = [];
    sachSnapshot.forEach((doc) => {
        const maSach = doc.data().maSach;
        maSachList.push(maSach);
    });

    return maSachList;
};

export const updateSach = async (maSach, newData) => {
    const sachDocRef = doc(firestore, 'books', maSach);
    await updateDoc(sachDocRef, newData);
};

// Hàm cập nhật thông tin độc giả trong Firestore
export const updateDocGia = async (maDocGia, newData) => {
    const docGiaDocRef = doc(firestore, 'docgia', maDocGia);
    await updateDoc(docGiaDocRef, newData);
};

export const getAllThueSach = async () => {
    try {
        const thueSachCollection = collection(firestore, 'thuesach');
        const thueSachSnapshot = await getDocs(thueSachCollection);

        const allThueSachData = thueSachSnapshot.docs.map((doc) => doc.data());
        return allThueSachData;
    } catch (error) {
        console.error('Lỗi khi lấy tất cả thông tin thuesach:', error);
        throw error;
    }
};
