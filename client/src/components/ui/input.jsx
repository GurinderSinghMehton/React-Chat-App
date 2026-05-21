import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef(({ className, type, id, ...props }, ref) => {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex flex-col gap-3">
      <input
        type={
          type === "password" ? (showPassword ? "text" : "password") : "text"
        }
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className,
        )}
        ref={ref}
        {...props}
      />

      {type === "password" && (
        <div className="w-full flex gap-2 justify-end px-4">
          <input type="checkbox" id={id} onClick={handleShowPassword} />
          <label className="text-xs font-medium" htmlFor={id}>
            Show Passoword
          </label>
        </div>
      )}
    </div>
  );
});
Input.displayName = "Input";

export { Input };
