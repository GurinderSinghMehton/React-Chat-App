import React, { useEffect, useState } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

function VerifyOtp() {

  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [otp, setOtp] = useState('');

  useEffect(() => {
    if (timer > 0) {
      const countdown = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(countdown);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  const handleResend = () => {
    console.log('Resending OTP...');

    setTimer(30);
    setCanResend(false);
  };

  return (
    <div className="h-[100vh] w-[100vw] flex items-center justify-center">
      <div className="h-[95vh] bg-white border-2 border-white text-opacity-90 shadow-2xl w-[95vw] md:w-[90vw] md:h-[85vh] lg:w-[70vw] lg:h-[85vh] xl:w-[60-vw] xl:h-[80vh] rounded-3xl grid ">
        <div className="flex flex-col gap-5 items-center justify-center">
          <h1 className="text-4xl font-bold md:text-6xl">Verify Email</h1>
          <p className="font-medium text-center text-[14px] md:text-[18px]">
            ✅ Almost there!
          </p>
          <p className="font-medium text-center text-[14px] md:text-sm">
            We've sent a 6-digit verification code to your email. Please check
            your inbox (and spam folder) and enter the code below to verify your
            account.
          </p>
          <div className="flex flex-col text-right lg:flex-row lg:items-center lg:gap-6 ">
            <InputOTP maxLength={6} value={otp} onChange={(val) => setOtp(val)}>
              <InputOTPGroup>
                <InputOTPSlot
                  index={0}
                  className="lg:w-14 lg:h-14 lg:text-xl"
                />
                <InputOTPSlot
                  index={1}
                  className="lg:w-14 lg:h-14 lg:text-xl"
                />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot
                  index={2}
                  className="lg:w-14 lg:h-14 lg:text-xl"
                />
                <InputOTPSlot
                  index={3}
                  className="lg:w-14 lg:h-14 lg:text-xl"
                />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot
                  index={4}
                  className="lg:w-14 lg:h-14 lg:text-xl"
                />
                <InputOTPSlot
                  index={5}
                  className="lg:w-14 lg:h-14 lg:text-xl"
                />
              </InputOTPGroup>
            </InputOTP>

            {!canResend ? (
              <p className="text-sm text-muted-foreground mt-2">
                Resend available in{" "}
                <span className="font-medium">{timer}s</span>
              </p>
            ) : (
              <Button variant="outline" onClick={handleResend} className="mt-2">
                Resend OTP
              </Button>
            )}
          </div>

          <div className="flex items-center gap-5 mt-10 flex-col lg:flex-row">
            <Button className="rounded-full p-6 w-[200px]">Submit</Button>
            <Link
              to="/auth"
              className="underline underline-offset-2 text-blue-800"
              
            >
              Go Back
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VerifyOtp;
