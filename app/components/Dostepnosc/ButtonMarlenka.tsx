"use client";
import React from "react";
import toast from "react-hot-toast";

const ButtonMarlenka = () => {
  const handleClick = () => {
    toast.success("Dziękujemy za przekazanie dostęponości");
  };
  return (
    <button className="btn btn-md btn-success " onClick={handleClick}>
      ZAKOŃCZ
    </button>
  );
};

export default ButtonMarlenka;
