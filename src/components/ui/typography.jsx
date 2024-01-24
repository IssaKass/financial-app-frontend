import { cva } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const typographyVariants = cva("", {
  variants: {
    variant: {
      h1: "text-[2.5rem]/[1.25] sm:text-[3rem]/[1.25] lg:text-[3.25rem]/[1.25] font-extrabold tracking-normal",
      h2: "text-[2rem]/[1.33] sm:text-[2.5rem]/[1.33] lg:text-[2.75rem]/[1.33] font-extrabold tracking-normal",
      h3: "text-[1.5rem]/[1.5] sm:text-[1.625rem]/[1.5] lg:text-[1.875rem]/[1.5] font-bold tracking-normal",
      h4: "text-[1.25rem]/[1.5] sm:text-[1.5rem]/[1.5] font-bold tracking-normal",
      h5: "text-[1.125rem]/[1.5] sm::text-[1.1875rem]/[1.5] lg:text-[1.25rem]/[1.5] font-bold tracking-normal",
      h6: "text-[1.0625rem]/[1.55] sm:text-[1.125rem]/[1.55] font-bold tracking-normal",
      subtitle1: "text-[1rem]/[1.5] font-semibold tracking-normal",
      subtitle2: "text-[0.875rem]/[1.57] font-semibold tracking-normal",
      body1: "text-[1rem]/[1.5] font-normal tracking-normal",
      body2: "text-[0.875rem]/[1.57] font-normal tracking-normal",
      caption: "text-[0.75rem]/[1.125] font-normal tracking-normal",
    },
  },
  defaultVariants: {
    variant: "body1",
  },
});

const Typography = React.forwardRef(
  ({ className, variant, component = "p", ...props }, ref) => {
    const Comp = component;
    return (
      <Comp
        className={cn(typographyVariants({ variant, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Typography.displayName = "Typography";

export { Typography, typographyVariants };
