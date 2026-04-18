import { ProductCategory, Size, StoreInfo } from "@/types";

export const STORE_INFO: StoreInfo = {
  whatsapp: "5511999999999",
  instagram: "@lumiteen",
  email: "contato@lumiteen.com",
};

export const CATEGORIES: { value: ProductCategory | ""; label: string }[] = [
  { value: "", label: "Todas" },
  { value: "camisetas", label: "Camisetas" },
  { value: "calcas", label: "Calças" },
  { value: "vestidos", label: "Vestidos" },
  { value: "shorts", label: "Shorts" },
  { value: "saias", label: "Saias" },
  { value: "blusas", label: "Blusas" },
  { value: "conjuntos", label: "Conjuntos" },
  { value: "acessorios", label: "Acessórios" },
];

export const SIZES: Size[] = ["PP", "P", "M", "G", "GG", "XG"];

export const PRICE_RANGE = {
  min: 0,
  max: 300,
};

export const WHATSAPP_MESSAGE = (productName: string) =>
  `Olá! Tenho interesse no produto: *${productName}*. Pode me ajudar?`;

export const WHATSAPP_LINK = (phone: string, message: string) =>
  `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
