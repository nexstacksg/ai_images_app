import * as React from "react";

import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, disabled, ...props }, ref) => {
    const [isPasswordVisible, setPasswordVisible] = React.useState(false);

    const togglePasswordVisibility = () => {
      if (!disabled) {
        setPasswordVisible(!isPasswordVisible);
      }
    };

    return (
      <div className="relative w-full flex items-center">
        <input
          type={type}
          className={cn(
            "flex h-10 w-full input-field rounded-md border border-input bg-background px-3 py-2 text-[14px] ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground placeholder:font-thin focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          {...props}
        />
        {type === "password" && (
          <button
            type="button"
            className={cn(
              "absolute right-3 top-1/2 transform -translate-y-1/2",
              {
                "cursor-not-allowed opacity-50": disabled,
              }
            )}
            onClick={togglePasswordVisibility}
            disabled={disabled}
          >
            {!isPasswordVisible ? (
              <Eye className="w-4 h-4 text-text-primary" />
            ) : (
              <EyeOff className="w-4 h-4 text-text-primary" />
            )}
          </button>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
