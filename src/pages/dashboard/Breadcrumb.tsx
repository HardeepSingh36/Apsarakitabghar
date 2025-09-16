import React from 'react';

const Breadcrumb: React.FC = () => (
  <section className='breadcrumb-section pt-0'>
    <div className='container-fluid-lg'>
      <div className='row'>
        <div className='col-12'>
          <div className='breadcrumb-contain'>
            <h2>User Dashboard</h2>
            <nav>
              <ol className='breadcrumb mb-0'>
                <li className='breadcrumb-item'>
                  <a href='/'>
                    <i className='fa-solid fa-house'></i>
                  </a>
                </li>
                <li className='breadcrumb-item active'>User Dashboard</li>
              </ol>
            </nav>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Breadcrumb;
