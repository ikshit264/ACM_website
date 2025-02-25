"use client";
import { useState } from "react";
import Link from "next/link";

interface MenuItem {
  label: string;
  color: string;
  rotation: number; // Degree of rotation based on position
}

const CircularMenu = () => {
  const [activeMenu, setActiveMenu] = useState<string>("");
  const [arrowRotation, setArrowRotation] = useState<number>(0);
  const [circleRotation, setCircleRotation] = useState<number>(0);
  const [rotations, setRotations] = useState<number[]>([]);

  // Dynamically update this array to add/remove menu items
  const menuItems: Omit<MenuItem, "rotation">[] = [
    { label: "Teri", color: "#89c759" },
    { label: "Maa", color: "#3bb4e5" },
    { label: "Ko", color: "#823d97" },
    { label: "Mera", color: "#eb1777" },
    { label: "Salam", color: "#f39c12" },
    { label: "Madh**", color: "#e74c3c" },
    { label: "Ch***", color: "#9b59b6" },
    { label: "Sala", color: "#34495e" },
  ];

  // Dynamically generate rotation angles based on the length of the menu items
  const defaultRotations = menuItems.map((_, index) => {
    return (360 / menuItems.length) * index;
  });

  useState(() => {
    setRotations(defaultRotations);
  });

  const handleClick = (label: string, rotation: number, index: number) => {
    setActiveMenu(label);
    setArrowRotation(rotation + 90); // Rotate arrow first

    // After 1 second, rotate the circle
    setTimeout(() => {
      setCircleRotation(-rotation);
      setTimeout(() => {
        const newRotations = [
          ...rotations.slice(index),
          ...rotations.slice(0, index),
        ];
        setRotations(newRotations);
      }, 2000);
    }, 1000);
  };

  return (
    <div className="relative min-h-[500px] w-full bg-[#151515] flex items-center justify-center">
      {/* Rotating Circle */}
      <div
        className={`relative w-80 h-80 rounded-full p-2 transition-transform duration-1000 ease-in-out`}
        style={{
          transform: `rotate(${circleRotation}deg)`,
        }}
      >
        {/* Rotating Arrow */}
        <div
          className="absolute w-10 h-10 top-1/2 left-1/2 rounded-full flex items-center justify-center text-white text-2xl uppercase transition-transform duration-1000 ease-in-out bg-[#222]"
          style={{
            transform: `translate(-50%, -50%) rotate(${arrowRotation}deg)`,
          }}
        >
          {/* {Link dalni hai} */}
          <Link href="http://deineko.me" target="_blank">  
            <span className={`cursor-pointer`}>&uarr;</span>
          </Link>
        </div>

        {/* Dynamically generated Menu Items */}
        {menuItems.map((item, index) => {
          const angle = defaultRotations[index];
          const radian = (angle * Math.PI) / 180;
          const x = 110 * Math.cos(radian);
          const y = 110 * Math.sin(radian);

          return (
            <button
              key={item.label}
              onClick={() => handleClick(item.label, angle, index)}
              className="absolute w-20 h-20 bg-[#151515] border-4 rounded-full flex items-center justify-center text-xs font-bold uppercase cursor-pointer hover:text-white transition-all"
              style={{
                top: `calc(50% + ${y}px - 40px)`,
                left: `calc(50% + ${x}px - 40px)`,
                borderColor: item.color,
                transform: `rotate(${-circleRotation}deg)`, // Keep text upright
              }}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CircularMenu;
