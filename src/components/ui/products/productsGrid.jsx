import { ProductItem } from "./productItem";
import { LoadingSkeleton } from "../skeleton/LoadingSkeleton";
export const ProductGrid = ({ products, loadSkeleton , setAlertToCart}) => {
  return (
    <div className=" grid grid-cols-1 sm:grid-cols-4 gap-12 mb-10">
      {loadSkeleton ? (
        <>
          <LoadingSkeleton height={310} width={350}></LoadingSkeleton>
          <LoadingSkeleton height={310} width={350}></LoadingSkeleton>
          <LoadingSkeleton height={310} width={350}></LoadingSkeleton>
          <LoadingSkeleton height={310} width={350}></LoadingSkeleton>
          <LoadingSkeleton height={310} width={350}></LoadingSkeleton>
          <LoadingSkeleton height={310} width={350}></LoadingSkeleton>
          <LoadingSkeleton height={310} width={350}></LoadingSkeleton>
          <LoadingSkeleton height={310} width={350}></LoadingSkeleton>
          <LoadingSkeleton height={310} width={350}></LoadingSkeleton>
          <LoadingSkeleton height={310} width={350}></LoadingSkeleton>
          <LoadingSkeleton height={310} width={350}></LoadingSkeleton>
          <LoadingSkeleton height={310} width={350}></LoadingSkeleton>
        </>
      ) : (
        products.map((product) => (
          <ProductItem  setAlertToCart={ setAlertToCart} key={product.id} product={product}></ProductItem>
        ))
      )}
    </div>
  );
};
