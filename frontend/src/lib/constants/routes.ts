type Routes = {
  HOME: string;
  ABOUT: string;
  INSPIRATION: string;
  SHOP: string;
  PRODUCT: (id: string) => string;
  COLLECTION: (id: string) => string;
  CART: string;
};

export const ROUTES: Routes = {
  HOME: "/",
  ABOUT: "/about",
  INSPIRATION: "/inspiration",
  SHOP: "/shop",
  PRODUCT: (id: string) => `/product/${id}`,
  COLLECTION: (id: string) => `/collection/${id}`,
  CART: "/cart",
};
