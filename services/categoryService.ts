import { collection, getDocs, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { Category } from "@/interfaces";

export async function getCategories(): Promise<Category[]> {
  try {
    const querySnapshot = await getDocs(collection(db, "categories"));
    const categories: Category[] = [];
    querySnapshot.forEach((doc) => {
      categories.push({
        id: doc.id,
        name: doc.data().name,
      });
        });
    return categories;
  } catch (error) {
    console.error("Error getting categories:", error);
    throw error;
  }
}

export async function addCategory(categoryName: string): Promise<Category> {
  try {
    const docRef = await addDoc(collection(db, "categories"), {
      name: categoryName,
      createdAt: serverTimestamp(),
    });
    return {
      id: docRef.id,
      name: categoryName,
    };
  } catch (error) {
    console.error("Error adding category:", error);
    throw error;
  }
}
