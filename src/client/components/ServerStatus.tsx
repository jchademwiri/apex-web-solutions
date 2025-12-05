import { useEffect, useState } from "react";

export const ServerStatus = () => {
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/health")
      .then((response) => response.json())
      .then((data) => {
        console.log("Server Status:", data);
        setStatus(data);
      })
      .catch((error) => console.error("Error fetching server status:", error));
  }, []);

  return (
    <div>
      <h2>
        Server Status:{" "}
        <span className="text-green-500">{status ? status : "Loading..."}</span>
      </h2>
    </div>
  );
};
