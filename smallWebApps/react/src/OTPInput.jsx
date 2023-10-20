import { useRef, useState } from "react";

const OTP_FIELDS = [0, 1, 2, 3, 4, 5];
export default function OTPInput() {
    const otpFieldRefs = useRef([]);
    const [otp, setOtp] = useState(OTP_FIELDS.reduce((acc, i) => ({ ...acc, [i]: "" }), {}));

    function handleOtpChange(e, otpFieldIdx) {
        let val = (e.key)?.trim();
        val = filterInput(val, otpFieldIdx);

        setOtp(prev => ({ ...prev, [otpFieldIdx]: val }));
    }

    function filterInput(key, otpFieldIdx) {
        if (key && !isNaN(Number(key))) {
            focusField("next", otpFieldIdx);
            return key;
        } else if (key === "Backspace") {
            focusField("prev", otpFieldIdx);
            return "";
        } else if (key === "ArrowRight") {
            focusField("next", otpFieldIdx);
        } else if (key === "ArrowLeft") {
            focusField("prev", otpFieldIdx);
        }

        return otp[otpFieldIdx];
    }

    function focusField(direction, otpFieldIdx) {
        let newFocus = otpFieldIdx;

        if (direction === "prev") {
            newFocus = otpFieldIdx - 1 < 0 ? otpFieldIdx : otpFieldIdx - 1
        } else if (direction === "next") {
            newFocus = otpFieldIdx + 1 >= OTP_FIELDS.length ? otpFieldIdx : otpFieldIdx + 1
        }

        otpFieldRefs.current[newFocus].focus();
    }

    return (
        <div id="content">
            <div id="otp">
                {
                    OTP_FIELDS.map(i => (
                        <input
                            ref={el => { otpFieldRefs.current[i] = el }}
                            key={i} type="text" className="otpInput"
                            maxLength={1} value={otp[i]} onKeyUp={(e) => handleOtpChange(e, i)} onChange={() => { }}
                            autoFocus={i === 0}
                        />
                    ))
                }
            </div>
        </div>
    )
}