import React from 'react';
 
function Home() {
  return (
    <>
      {/* Hero Section */}
      <div className="container-fluid hero-section">
        <div className="row">
          <div className="col-12 text-center">
            <img
              src="https://picsum.photos/seed/hero/400/300"
              alt="Hero"
              className="img-fluid mt-5 mb-4"
            />
            <h1 className="display-4">Welcome to My Passion Project</h1>
            <p className="lead">Discover amazing content about technology, creativity, and innovation</p>
          </div>
        </div>
      </div>
 
      {/* Cards Section */}
      <div className="container my-5">
        <div className="row">
          <div className="col-md-4 mb-4">
            <div className="card">
              <img src="https://picsum.photos/seed/tech/350/200" className="card-img-top" alt="Feature One" />
              <div className="card-body">
                <h5 className="card-title">Feature One</h5>
                <p className="card-text">Explore the latest trends and innovations in technology and design.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card">
              <img src="https://picsum.photos/seed/creative/350/200" className="card-img-top" alt="Feature Two" />
              <div className="card-body">
                <h5 className="card-title">Feature Two</h5>
                <p className="card-text">Learn about creative projects and inspiring ideas from around the world.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card">
              <img src="https://picsum.photos/seed/community/350/200" className="card-img-top" alt="Feature Three" />
              <div className="card-body">
                <h5 className="card-title">Feature Three</h5>
                <p className="card-text">Connect with a community of passionate individuals and share your ideas.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
 
export default Home;