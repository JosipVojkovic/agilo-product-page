type Routes = {
  HOME: string;
  ABOUT: string;
  INSPIRATION: string;
  SHOP: string;
  PRODUCT: (handle: string) => string;
  COLLECTION: (handle: string) => string;
  CART: string;
};

export const ROUTES: Routes = {
  HOME: "/",
  ABOUT: "/about",
  INSPIRATION: "/inspiration",
  SHOP: "/shop",
  PRODUCT: (handle: string) => `/product/${handle}`,
  COLLECTION: (handle: string) => `/collection/${handle}`,
  CART: "/cart",
};
