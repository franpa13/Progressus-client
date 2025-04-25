import React, { useState } from "react";
import { Scanner } from "@yudiel/react-qr-scanner";
import { MainLayout } from "../../layout/MainLayout";

export const CodeScanner = () => {
  const [result, setResult] = useState("awdwad");

  return (
    <MainLayout>
      <div className="flex flex-col items-center justify-start min-h-screen p-4 bg-gray-100">
        <h1 className="text-2xl font-bold mb-4">QR Code Scanner</h1>
        <div className="w-[400px] h-[400px] md:w-[800px] md:h-[800px] border border-gray-300 rounded-lg overflow-hidden">
          <Scanner
            onScan={(result) => alert(result)}
          />
        </div>
        {result && (
          <div className="mt-4 p-2 bg-white shadow rounded">
            <p className="text-lg font-semibold">Scanned Result:</p>
            <p className="text-blue-500">{result}</p>
          </div>
        )}
      </div>
    </MainLayout>
  );
};
