import React from 'react'

function Footer() {
  return (
    <div className="text-center text-gray-500 text-sm p-4">
      Copyright {new Date().getFullYear()}
    </div>
  );
}

export default Footer