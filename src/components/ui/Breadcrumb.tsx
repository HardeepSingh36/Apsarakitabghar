import React from 'react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  iconClass?: string;
}

interface BreadcrumbProps {
  title: string;
  items: BreadcrumbItem[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ title, items }) => (
  <section className='breadcrumb-section pt-0'>
    <div className='container-fluid-lg'>
      <div className='row'>
        <div className='col-12'>
          <div className='breadcrumb-contain'>
            <h2>{title}</h2>
            <nav>
              <ol className='breadcrumb mb-0'>
                {items.map((item, idx) => (
                  <li
                    key={idx}
                    className={`breadcrumb-item${idx === items.length - 1 ? ' active' : ''}`}
                  >
                    {item.href && idx !== items.length - 1 ? (
                      <a href={item.href}>
                        {item.iconClass && <i className={item.iconClass}></i>}
                        {item.label}
                      </a>
                    ) : (
                      <>
                        {item.iconClass && <i className={item.iconClass}></i>}
                        {item.label}
                      </>
                    )}
                  </li>
                ))}
              </ol>
            </nav>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Breadcrumb;
