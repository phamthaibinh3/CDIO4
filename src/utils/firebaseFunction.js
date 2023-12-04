import { collection, doc, getDocs, orderBy, query, setDoc } from 'firebase/firestore';
import { firestore } from '../firebase';
//xử lui dong bo / sử dụng forebtore xử lý đưa hình ảnh vô
export const saveItem = async data => {
    await setDoc(
        doc(firestore, 'books', `${Date.now()}`), data, { merge: true, }
    );
};

//   getall food items 
export const getAllFoodItems = async () => {
    const items = await getDocs(
        query(collection(firestore, 'books'), orderBy('id', 'desc')),
    );

    return items.docs.map(doc => doc.data());
};