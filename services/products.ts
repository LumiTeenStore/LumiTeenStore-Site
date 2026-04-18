import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  Timestamp,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Product, ProductCategory, FilterState } from "@/types";

const COLLECTION = "products";

function toProduct(id: string, data: Record<string, unknown>): Product {
  return {
    id,
    name: data.name as string,
    price: data.price as number,
    originalPrice: data.originalPrice as number | undefined,
    description: data.description as string,
    images: (data.images as string[]) || [],
    category: data.category as ProductCategory,
    sizes: (data.sizes as Product["sizes"]) || [],
    colors: (data.colors as Product["colors"]) || [],
    tags: (data.tags as string[]) || [],
    isNew: (data.isNew as boolean) || false,
    isFeatured: (data.isFeatured as boolean) || false,
    isBestSeller: (data.isBestSeller as boolean) || false,
    stock: (data.stock as number) || 0,
    createdAt:
      data.createdAt instanceof Timestamp
        ? data.createdAt.toDate().toISOString()
        : (data.createdAt as string),
    updatedAt:
      data.updatedAt instanceof Timestamp
        ? data.updatedAt.toDate().toISOString()
        : (data.updatedAt as string | undefined),
  };
}

export async function getProducts(): Promise<Product[]> {
  const q = query(
    collection(db, COLLECTION),
    orderBy("createdAt", "desc")
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => toProduct(d.id, d.data() as Record<string, unknown>));
}

export async function getProductById(id: string): Promise<Product | null> {
  const ref = doc(db, COLLECTION, id);
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;
  return toProduct(snap.id, snap.data() as Record<string, unknown>);
}

export async function getFeaturedProducts(count = 8): Promise<Product[]> {
  const q = query(
    collection(db, COLLECTION),
    where("isFeatured", "==", true),
    orderBy("createdAt", "desc"),
    limit(count)
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => toProduct(d.id, d.data() as Record<string, unknown>));
}

export async function getNewProducts(count = 8): Promise<Product[]> {
  const q = query(
    collection(db, COLLECTION),
    where("isNew", "==", true),
    orderBy("createdAt", "desc"),
    limit(count)
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => toProduct(d.id, d.data() as Record<string, unknown>));
}

export async function getBestSellers(count = 8): Promise<Product[]> {
  const q = query(
    collection(db, COLLECTION),
    where("isBestSeller", "==", true),
    orderBy("createdAt", "desc"),
    limit(count)
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => toProduct(d.id, d.data() as Record<string, unknown>));
}

export async function getProductsByCategory(
  category: ProductCategory
): Promise<Product[]> {
  const q = query(
    collection(db, COLLECTION),
    where("category", "==", category),
    orderBy("createdAt", "desc")
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => toProduct(d.id, d.data() as Record<string, unknown>));
}

export async function createProduct(
  data: Omit<Product, "id" | "createdAt" | "updatedAt">
): Promise<string> {
  const ref = await addDoc(collection(db, COLLECTION), {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return ref.id;
}

export async function updateProduct(
  id: string,
  data: Partial<Omit<Product, "id" | "createdAt">>
): Promise<void> {
  const ref = doc(db, COLLECTION, id);
  await updateDoc(ref, {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

export async function deleteProduct(id: string): Promise<void> {
  const ref = doc(db, COLLECTION, id);
  await deleteDoc(ref);
}

export function filterProducts(products: Product[], filters: FilterState): Product[] {
  return products.filter((p) => {
    if (filters.category && p.category !== filters.category) return false;
    if (filters.sizes.length > 0 && !filters.sizes.some((s) => p.sizes.includes(s)))
      return false;
    if (p.price < filters.minPrice || p.price > filters.maxPrice) return false;
    if (
      filters.search &&
      !p.name.toLowerCase().includes(filters.search.toLowerCase()) &&
      !p.description.toLowerCase().includes(filters.search.toLowerCase())
    )
      return false;
    return true;
  });
}
