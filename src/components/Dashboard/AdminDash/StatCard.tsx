import React from 'react';
const StatCard = ({ title, value }: { title: string; value: number }) => (
  <div className="border-[#0896EF] bg-blue-50 border p-6 rounded-lg shadow-md flex flex-col justify-center items-center">
    <h3 className="text-sm uppercase tracking-wide">{title}</h3>
    <p className="text-3xl font-bold mt-2">{value}</p>
  </div>
);
 


export default StatCard;
