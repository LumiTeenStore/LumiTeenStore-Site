"use client";

import { useState, useEffect } from "react";
import { Product, ProductCategory } from "@/types";
import {
  getProducts,
  getFeaturedProducts,
  getNewProducts,
  getBestSellers,
  getProductsByCategory,
  getProductById,
} from "@/services/products";

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    getProducts()
      .then(setProducts)
      .catch(() => setError("Erro ao carregar produtos"))
      .finally(() => setLoading(false));
  }, []);

  return { products, loading, error };
}

export function useFeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getFeaturedProducts()
      .then(setProducts)
      .finally(() => setLoading(false));
  }, []);

  return { products, loading };
}

export function useNewProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getNewProducts()
      .then(setProducts)
      .finally(() => setLoading(false));
  }, []);

  return { products, loading };
}

export function useBestSellers() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBestSellers()
      .then(setProducts)
      .finally(() => setLoading(false));
  }, []);

  return { products, loading };
}

export function useProductsByCategory(category: ProductCategory) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProductsByCategory(category)
      .then(setProducts)
      .finally(() => setLoading(false));
  }, [category]);

  return { products, loading };
}

export function useProduct(id: string) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    getProductById(id)
      .then(setProduct)
      .catch(() => setError("Produto não encontrado"))
      .finally(() => setLoading(false));
  }, [id]);

  return { product, loading, error };
}
