import { useState } from "react";

const useAxo = (method = "get", apiUrl: any, ...rest: any) => {
  const [state, updateState] = useState<any>({
    error: null,
    loading: false,
    data: null,
  });

  const setState = (newState: any) =>
    updateState((prevState: any) => ({ ...prevState, ...newState }));

  const executeApiCall = async (...args: any) => {
    let payload: any = {
      method: method,
      body: JSON.stringify({ ...rest, ...args }[0]),
    };

    if (method === "get") {
      delete payload.body;
    }

    setState({ error: null, loading: true });

    try {
      const res = await fetch(apiUrl, payload);
      if (res.ok) {
        const data = await res.json();
        setState({ loading: false, data: data });

        return data ?? [];
      } else {
        throw await res.json();
      }
    } catch (error) {
      console.log("🚀 ~ error from axo", error);
      setState({ loading: false, error: error, data: null });
      throw error;
    }
  };

  return [state, executeApiCall];
};

export { useAxo };
