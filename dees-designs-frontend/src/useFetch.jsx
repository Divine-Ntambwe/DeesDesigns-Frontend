import React, { useContext, useState } from "react";
import { Authentication } from "./App";
import { appContext } from "./Context/AppContext";
function useFetch(endpoint) {
  const [error, setError] = useState(""),
    [data, setData] = useState(""),
    [loading, setLoading] = useState(false);
  const { authCred } = useContext(Authentication);
  const { url } = useContext(appContext);

  async function get(toDo = () => {}) {
    setLoading(true);
    try {
      const res = await fetch(url + endpoint, {
        method: "GET",
        headers: {
          authentication: "application/json",
          Authorization: `Basic ${authCred}`,
        },
      });

      const result = await res.json();
      setData(result);
      setLoading(false);

      if (res.status === 200) {
        toDo(result);
      }
    } catch (e) {
      setError(e);
      console.error("error getting", e);
    }
  }

  async function deleteApi(toDo = () => {}) {
    try {
      const res = await fetch(url + endpoint, {
        method: "DELETE",
        headers: {
          authentication: "application/json",
          Authorization: `Basic ${authCred}`,
        },
      });

      const result = await res.json();
      setData(result);

      if (res.status === 200) {
        toDo(result);
      }
    } catch (e) {
      setError(e);
      console.error("error getting", e);
    }
  }

  async function postAuth(body = {}, toDo = () => {}) {
    setLoading(true);
    try {
      const res = await fetch(url + endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${authCred}`,
        },
        body: JSON.stringify(body),
      });

      const result = await res.json();
      setData(result);
      setLoading(false);

      if (res.status === 200) {
        toDo(result);
      } else {
        setError(result.error);
        console.error("error posting", result.error);
      }
    } catch (e) {
      console.error("error posting", e);
      setError(e);
    }
  }

  async function post(body = {}, toDo = () => {}) {
    setLoading(true);
    try {
      const res = await fetch(url + endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const result = await res.json();
      setData(result);
      setLoading(false);

      if (res.status === 200) {
        toDo(result);
      }
    } catch (e) {
      console.error(e);
      setError(e);
    }
  }

  async function postMedia(body = {}, toDo = () => {}) {
    try {
      setLoading(true);

      const res = await fetch(url + endpoint, {
        method: "POST",
        body: body,
      });

      const result = await res.json();
      setData(result);
      setLoading(false);
      if (result.message) {
        toDo(result);
      }
    } catch (e) {
      console.error(e);
      setError(e);
    }
  }

  async function postMediaAuth(body = {}, toDo = () => {}) {
    try {
      setLoading(true);

      const res = await fetch(url + endpoint, {
        method: "POST",
        headers: { Authorization: `Basic ${authCred}` },
        body: body,
      });

      const result = await res.json();
      setData(result);
      setLoading(false);
      if (res.status === 200) {
        toDo(result);

      }
    } catch (e) {
      setError(e);
    }
  }

  async function putMedia(body = {}, toDo = () => {}) {
    try {
      setLoading(true);

      const res = await fetch(url + endpoint, {
        method: "PUT",
        headers: { Authorization: `Basic ${authCred}` },
        body: body,
      });

      const result = await res.json();
      setData(result);
      setLoading(false);
      if (res.status === 200) {
        toDo(result);
      }
    } catch (e) {
      console.error(e);
      setError(e);
    }
  }

  return {
    post,
    get,
    setError,
    deleteApi,
    postMedia,
    postMediaAuth,
    putMedia,
    data,
    loading,
    error,
    postAuth,
  };
}

export default useFetch;
