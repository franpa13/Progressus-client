import React, { useState, useEffect } from "react";
import QRCode from "react-qr-code";
import { MainLayout } from "../../layout/MainLayout";

export const CodeWriter = () => {
  const strings = ["Hello, World!", "React is awesome!", "Keep coding!", "Stay positive!", "Never stop learning!", "Embrace the journey!", "You got this!", "Think big, start small!"];
  const getRandomString = () => strings[Math.floor(Math.random() * strings.length)];

  const [randomString, setRandomString] = useState(getRandomString());

  useEffect(() => {
    const interval = setInterval(() => {
      setRandomString(getRandomString());
    }, 2000); // 20 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <MainLayout>
      <div className="w-full flex justify-center items-center">
        <div className="w-2/3 lg:w-1/4">
          <h2 className="text-sm md:text-4xl font-semibold py-4 w-full text-center">QR CODE</h2>
          <QRCode

            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
            value={randomString}
            viewBox={`0 0 256 256`}
          />
        </div>
      </div>
    </MainLayout>
  );
};
