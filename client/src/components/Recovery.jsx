import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/Username.module.css";
import toast, { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import { generateOTP, verifyOTP } from "../helper/helper";

function Recovery() {
  const username = useSelector((state) => state.auth.auth.username);
  const [OTP, setOTP] = useState("");
  const [resendDisabled, setResendDisabled] = useState(false);
  const [timer, setTimer] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (username) {
      sendOTP();
    }
  }, [username]);

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      setResendDisabled(false);
    }

    return () => clearInterval(interval);
  }, [timer]);

  const sendOTP = async () => {
    const OTP = await generateOTP(username);
    if (OTP) {
      toast.success("OTP has been sent to your email");
    } else {
      toast.error("Problem while generating OTP!");
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const { status } = await verifyOTP({ username, code: OTP });
      if (status === 201) {
        toast.success("Verified Successfully");
        navigate("/reset", { replace: true });
      }
    } catch (error) {
      toast.error("Wrong OTP! Check email again!");
    }
  };

  const resendOTP = () => {
    if (!resendDisabled) {
      sendOTP();
      setResendDisabled(true);
      setTimer(10);
    }
  };

  return (
    <div className="container mx-auto">
      <Toaster position="top-center" reverseOrder={false} />

      <div className="flex justify-center items-center h-screen">
        <div className={styles.glass} >
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">Recovery</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">
              Enter OTP to recover password.
            </span>
          </div>

          <form className="pt-20" onSubmit={onSubmit}>
            <div className="textbox flex flex-col items-center gap-6">
              <div className="input text-center">
                <span className="py-4 text-sm text-left text-gray-500">
                  Enter the 6-digit OTP sent to your email address.
                </span>
                <input
                  onChange={(e) => setOTP(e.target.value)}
                  type="text"
                  className={styles.textbox}
                  placeholder="OTP"
                  value={OTP}
                />
              </div>

              <button className={styles.btn} type="submit">
                Recover
              </button>
            </div>

            <div className="text-center py-4">
              <span className="text-gray-500">
                Can't get OTP?{" "}
                <button
                  onClick={resendOTP}
                  className="text-red-500"
                  disabled={resendDisabled}
                >
                  Resend {resendDisabled && `(${timer}s)`}
                </button>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Recovery;
