import { useState, useEffect, Suspense } from "react";
import LoadingInfo from "../../components/LoadingInfo";

const CustomSuspense = ({
  delayMs = 100,
  fallback,
  children,
}: {
  delayMs?: number;
  fallback: any;
  children: any;
}) => {
  const [showFallback, setShowFallback] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => setShowFallback(true), delayMs);
    return () => clearTimeout(timeoutId);
  }, [delayMs]);

  return showFallback ? (
    <Suspense fallback={fallback}>{children}</Suspense>
  ) : (
    <LoadingInfo />
  );
};

export default CustomSuspense;
