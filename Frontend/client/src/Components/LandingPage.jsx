function LandingPage({ setPage }) {
  return (
    <div className="landing-hero d-flex align-items-center">
      <div className="container text-center text-white">
        <h1 className="display-3 fw-bold mb-3">Welcome to ShopSphere</h1>
        <p className="lead mb-4">
          Explore products, enjoy a clean shopping experience, and manage inventory securely.
        </p>

        <div className="d-flex justify-content-center gap-3 flex-wrap">
          <button className="btn btn-lg btn-warning px-4" onClick={() => setPage("products")}>
            View Products
          </button>
          <button className="btn btn-lg btn-light px-4" onClick={() => setPage("login")}>
            Login
          </button>
          <button className="btn btn-lg btn-outline-light px-4" onClick={() => setPage("register")}>
            Register
          </button>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;

// export default function LandingPage() {
//   return (
//     <div>
//       {/* Navbar */}
//       <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
//         <div className="container">
//           <a className="navbar-brand fw-bold" href="#">
//             Retail Project
//           </a>

//           <button
//             className="navbar-toggler"
//             type="button"
//             data-bs-toggle="collapse"
//             data-bs-target="#nav"
//           >
//             <span className="navbar-toggler-icon"></span>
//           </button>

//           <div className="collapse navbar-collapse" id="nav">
//             <ul className="navbar-nav ms-auto">
//               <li className="nav-item">
//                 <a className="nav-link" href="#features">
//                   Features
//                 </a>
//               </li>
//               <li className="nav-item">
//                 <a className="nav-link" href="#products">
//                   Products
//                 </a>
//               </li>
//               <li className="nav-item">
//                 <a className="btn btn-warning ms-lg-3" href="#start">
//                   Get Started
//                 </a>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </nav>

//       {/* Hero */}
//       <header className="bg-light py-5">
//         <div className="container py-4">
//           <div className="row align-items-center g-4">
//             <div className="col-lg-6">
//               <h1 className="display-5 fw-bold">
//                 Buy smarter with <span className="text-primary">Retail Project</span>
//               </h1>
//               <p className="lead text-muted mt-3">
//                 A simple e-commerce website for browsing products, adding to cart,
//                 and managing products as an admin.
//               </p>
//               <div className="d-flex gap-2 mt-4" id="start">
//                 <a className="btn btn-primary btn-lg" href="#products">
//                   Browse Products
//                 </a>
//                 <a className="btn btn-outline-dark btn-lg" href="#features">
//                   See Features
//                 </a>
//               </div>

//               <div className="mt-4 text-muted small">
//                 ✅ Fast • ✅ Secure • ✅ Student Project
//               </div>
//             </div>

//             <div className="col-lg-6">
//               <div className="card shadow-sm border-0">
//                 <div className="card-body p-4">
//                   <h5 className="fw-bold mb-3">Quick Test Panel</h5>
//                   <p className="text-muted mb-3">
//                     Use this page to test your UI quickly before building full pages.
//                   </p>

//                   <div className="row g-3">
//                     <div className="col-6">
//                       <div className="p-3 bg-light rounded">
//                         <div className="fw-bold">200+</div>
//                         <div className="text-muted small">Products</div>
//                       </div>
//                     </div>
//                     <div className="col-6">
//                       <div className="p-3 bg-light rounded">
//                         <div className="fw-bold">24/7</div>
//                         <div className="text-muted small">Access</div>
//                       </div>
//                     </div>
//                   </div>

//                   <hr className="my-4" />

//                   <button className="btn btn-success w-100">
//                     Test Action Button
//                   </button>
//                   <div className="text-muted small text-center mt-2">
//                     (Later: connect to real actions)
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Features */}
//       <section className="py-5" id="features">
//         <div className="container">
//           <h2 className="fw-bold text-center mb-4">Core Features</h2>

//           <div className="row g-4">
//             <div className="col-md-4">
//               <div className="card h-100 shadow-sm">
//                 <div className="card-body">
//                   <h5 className="fw-bold">Authentication</h5>
//                   <p className="text-muted">
//                     Sign up and log in securely to manage your account.
//                   </p>
//                 </div>
//               </div>
//             </div>

//             <div className="col-md-4">
//               <div className="card h-100 shadow-sm">
//                 <div className="card-body">
//                   <h5 className="fw-bold">Shopping Cart</h5>
//                   <p className="text-muted">
//                     Add products to cart and update quantities easily.
//                   </p>
//                 </div>
//               </div>
//             </div>

//             <div className="col-md-4">
//               <div className="card h-100 shadow-sm">
//                 <div className="card-body">
//                   <h5 className="fw-bold">Admin Management</h5>
//                   <p className="text-muted">
//                     Admin can add, edit, and delete products.
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Products (demo cards) */}
//       <section className="bg-light py-5" id="products">
//         <div className="container">
//           <div className="d-flex justify-content-between align-items-center mb-3">
//             <h2 className="fw-bold mb-0">Featured Products (Demo)</h2>
//             <button className="btn btn-outline-primary">View All</button>
//           </div>

//           <div className="row g-4">
//             {[
//               { id: 1, name: "Laptop", price: 25000 },
//               { id: 2, name: "Headphones", price: 1200 },
//               { id: 3, name: "Smart Watch", price: 3500 },
//             ].map((p) => (
//               <div className="col-md-4" key={p.id}>
//                 <div className="card h-100 shadow-sm">
//                   <div className="card-body">
//                     <div className="badge bg-primary mb-2">New</div>
//                     <h5 className="fw-bold">{p.name}</h5>
//                     <p className="text-muted">High quality product for testing UI.</p>
//                     <div className="d-flex justify-content-between align-items-center">
//                       <span className="fw-bold">{p.price} EGP</span>
//                       <button className="btn btn-sm btn-success">
//                         Add to Cart
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="bg-dark text-white py-4">
//         <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center gap-2">
//           <div className="fw-bold">Retail Project</div>
//           <div className="small text-white-50">
//             © {new Date().getFullYear()} - Demo Landing Page for Testing
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }