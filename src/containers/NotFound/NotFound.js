import React from 'react';

export default function NotFound() {
  console.log('Hitting not found route');
  return (
    <div className="container">
      <h1>Doh! 404!</h1>
      <p>These are <em>not</em> the droids you are looking for!</p>
    </div>
  );
}
